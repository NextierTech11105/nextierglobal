// Nextier Data Engine SDK · v0.1.0
// Zero dependencies. Runs anywhere `fetch` exists: Node 18+, Deno, Bun, edge runtimes.
// Server-side only — your Data Engine key is a secret. Never ship it to a browser.
//
//   import { Nextier } from "./nextier.mjs";
//   const nx = new Nextier({ apiKey: process.env.NEXTIER_API_KEY });
//   const { signals } = await nx.signals.netNew({ since: "2026-10-01" });

export const VERSION = "0.1.0";
export const DEFAULT_BASE_URL = "https://www.nxtier.ai/api/data-engine/v1";

/** Every non-2xx response, timeout or network failure surfaces as a NextierError. */
export class NextierError extends Error {
  constructor(message, { status = null, body = null, method = null, path = null } = {}) {
    super(message);
    this.name = "NextierError";
    this.status = status; // HTTP status, or null for timeouts / network failures
    this.body = body; // parsed JSON error body from the API, when there is one
    this.method = method;
    this.path = path;
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const retryable = (status) => status === 429 || status >= 500;

export class Nextier {
  /**
   * @param {object} opts
   * @param {string} opts.apiKey      Your Data Engine key (de_live_…).
   * @param {string} [opts.baseUrl]   Defaults to the production API.
   * @param {number} [opts.retries]   Retries for GET requests on 429 / 5xx / network errors. Default 2.
   * @param {number} [opts.timeoutMs] Per-request timeout. Default 30000.
   * @param {typeof fetch} [opts.fetch] Custom fetch implementation.
   */
  constructor({ apiKey, baseUrl = DEFAULT_BASE_URL, retries = 2, timeoutMs = 30000, fetch: fetchImpl } = {}) {
    if (!apiKey) throw new Error("Nextier: apiKey is required (your de_live_ Data Engine key).");
    this.apiKey = apiKey;
    this.baseUrl = String(baseUrl).replace(/\/+$/, "");
    this.retries = Math.max(0, retries | 0);
    this.timeoutMs = timeoutMs;
    this._fetch = fetchImpl || globalThis.fetch;
    if (!this._fetch) throw new Error("Nextier: no fetch available. Use Node 18+ or pass { fetch }.");

    /** Detect: net-new signals for your workspace. */
    this.signals = {
      netNew: ({ since, limit, family } = {}) => this._get("/signals/net-new", { since, limit, family }),
    };

    /** Read, classify and prioritize leads. */
    this.leads = {
      list: ({ search, tag, sourceTag, limit, offset } = {}) =>
        this._get("/leads", { search, tag, sourceTag, limit, offset }),
      /** Async iterator over every matching lead, 200 per page. */
      listAll: (filters = {}) => this._paginate(filters),
      tag: ({ leadIds, addTags, removeTags }) => this._post("/leads/tag", { leadIds, addTags, removeTags }),
      update: ({ leadIds, set }) => this._post("/leads/update", { leadIds, set }),
      /** Labels at origin. mode "origin" (default) stamps static + dynamic; "dynamic" re-stamps only dynamic. */
      autotag: ({ leadIds, limit, mode } = {}) => this._post("/leads/autotag", { leadIds, limit, mode }),
      /** Same rule as autotag, kept for older integrations. */
      score: ({ leadIds, limit, mode } = {}) => this._post("/leads/score", { leadIds, limit, mode }),
    };

    /** Stage execution in nxtier.ai. Nothing sends until a person approves it there. */
    this.push = {
      initialSms: ({ leadIds, name, signalType }) => this._post("/push/initial-sms", { leadIds, name, signalType }),
      contactCenter: ({ leadIds }) => this._post("/push/contact-center", { leadIds }),
      dialer: ({ leads, leadIds } = {}) => this._post("/push/dialer", { leads, leadIds }),
    };
  }

  /** Confirm the key and list the endpoints available to it. */
  info() {
    return this._get("");
  }

  /** The field registry: static vs dynamic fields, trigger-ready fields, cadence and source. */
  fields() {
    return this._get("/fields");
  }

  async *_paginate({ limit, offset, ...filters } = {}) {
    const page = 200; // the API's maximum page size
    let at = offset || 0;
    for (;;) {
      const res = await this.leads.list({ ...filters, limit: page, offset: at });
      for (const lead of res.leads) yield lead;
      if (res.leads.length < page) return;
      at += page;
    }
  }

  _get(path, query) {
    return this._request("GET", path, query);
  }

  _post(path, body) {
    return this._request("POST", path, undefined, body);
  }

  async _request(method, path, query, body) {
    const url = new URL(this.baseUrl + path);
    for (const [k, v] of Object.entries(query || {})) {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
    }
    const payload = body === undefined ? undefined : JSON.stringify(stripUndefined(body));
    // Only reads are retried. A push is never repeated automatically, so nothing is staged twice.
    const attempts = method === "GET" ? this.retries + 1 : 1;
    let lastError = null;

    for (let attempt = 0; attempt < attempts; attempt++) {
      if (attempt > 0) await sleep(Math.min(8000, 500 * 2 ** (attempt - 1)) + Math.floor(Math.random() * 250));
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), this.timeoutMs);
      try {
        const res = await this._fetch(url, {
          method,
          headers: {
            "x-api-key": this.apiKey,
            accept: "application/json",
            ...(payload ? { "content-type": "application/json" } : {}),
            "user-agent": `nextier-sdk-js/${VERSION}`,
          },
          body: payload,
          signal: ctl.signal,
        });
        const text = await res.text();
        let data;
        try {
          data = text ? JSON.parse(text) : {};
        } catch {
          data = { raw: text };
        }
        if (res.ok) return data;
        const err = new NextierError(data.error || `HTTP ${res.status}`, { status: res.status, body: data, method, path });
        if (!retryable(res.status)) throw err;
        lastError = err;
      } catch (e) {
        if (e instanceof NextierError && !retryable(e.status)) throw e;
        lastError =
          e instanceof NextierError
            ? e
            : new NextierError(e && e.name === "AbortError" ? `Timed out after ${this.timeoutMs} ms` : String((e && e.message) || e), { method, path });
      } finally {
        clearTimeout(timer);
      }
    }
    throw lastError;
  }
}

function stripUndefined(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) if (v !== undefined) out[k] = v;
  return out;
}

export default Nextier;
