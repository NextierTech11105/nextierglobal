// nextierglobal.ai — Nextier Global, the Enterprise Execution Platform. `node src/build.cjs` writes every page.
// Home = the Nextier Global poster (2026-11-12), copied word for word: NEXTIER GLOBAL · INTELLIGENCE • JUDGMENT • EXECUTION ·
// Enterprise Execution Platform · API • SDK • MCP • Build Packs. Nothing is added to it.
// API / SDK / MCP are read from the code on main: apps/front/src/app/api/data-engine/v1, lib/data-engine/*,
// packages/mcp-server/src/tools. Example values are marked as examples.
const fs = require("fs");
const path = require("path");
const OUT = path.join(__dirname, "..");

const SITE = "https://www.nextierglobal.ai";
const BASE = "https://www.nxtier.ai/api/data-engine/v1";
const BOOK = "https://www.nxtier.ai/book/nextier";
const YEAR = 2026;
const FOOT = `© ${YEAR} Nextier Technologies`;

// The monorepo, read at build time so counts come from the code, never typed in. Not found → the counts are left out.
const REPO = process.env.NEXTIER_REPO || path.join(__dirname, "..", "..", "OutreachGlobal-");
function registryCounts() {
  try {
    const src = fs.readFileSync(path.join(REPO, "apps/front/src/lib/data-engine/field-registry.ts"), "utf8");
    const a = src.indexOf("FIELD_REGISTRY: FieldDescriptor[] = [");
    const b = src.indexOf("export const TRIGGER_READY_FIELDS");
    if (a < 0 || b < 0) return null;
    const body = src.slice(a, b);
    const st = (body.match(/kind:\s*"static"/g) || []).length;
    const dy = (body.match(/kind:\s*"dynamic"/g) || []).length;
    const tr = (body.match(/triggerReady:\s*true/g) || []).length;
    return st + dy ? { total: st + dy, static: st, dynamic: dy, triggerReady: tr } : null;
  } catch {
    return null;
  }
}
const REG = registryCounts();

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const json = (o) => JSON.stringify(o, null, 2);

// The pill on the poster, in its order. Each word is a page.
const NAV = [
  ["api.html", "API"],
  ["sdk.html", "SDK"],
  ["mcp.html", "MCP"],
  ["build-packs.html", "Build Packs"],
];

// ───────────────────────────── the mark, the cards, the stand ─────────────────────────────
function mark(cls, k) {
  return `<svg class="${cls}" viewBox="0 0 200 200" role="img" aria-label="Nextier Global">
<defs>
<linearGradient id="mb1${k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5fcbff"/><stop offset="1" stop-color="#1f5bff"/></linearGradient>
<linearGradient id="mb2${k}" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#2f74ff"/><stop offset="1" stop-color="#1846d8"/></linearGradient>
<linearGradient id="mo1${k}" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb23d"/><stop offset="1" stop-color="#ff6a1f"/></linearGradient>
<linearGradient id="mo2${k}" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff3b4e"/><stop offset="1" stop-color="#ff7424"/></linearGradient>
<linearGradient id="mh${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#72d3ff"/><stop offset="1" stop-color="#1d5cff"/></linearGradient>
</defs>
<path fill="url(#mb1${k})" d="M14 14H72L128 100H72Z"/>
<path fill="url(#mb2${k})" d="M14 186H72L128 100H72Z"/>
<path fill="url(#mo1${k})" d="M186 14H128L72 100H128Z"/>
<path fill="url(#mo2${k})" d="M186 186H128L72 100H128Z"/>
<path fill="url(#mh${k})" stroke="#060d26" stroke-width="9" stroke-linejoin="round" d="M100 61L134 80.5V119.5L100 139L66 119.5V80.5Z"/>
<path fill="none" stroke="#b5ecff" stroke-opacity=".6" stroke-width="2.4" d="M100 74L122.5 87V113L100 126L77.5 113V87Z"/>
</svg>`;
}

const ICON = {
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 7-5 5 5 5"/><path d="m16 7 5 5-5 5"/><path d="m13.6 4-3.2 16"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.4 22 7.5 12 12.6 2 7.5Z"/><path opacity=".8" d="M4.5 10.8 12 14.6l7.5-3.8L22 12.1 12 17.2 2 12.1Z"/><path opacity=".6" d="M4.5 15.4 12 19.2l7.5-3.8L22 16.7 12 21.8 2 16.7Z"/></svg>`,
  people: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle opacity=".8" cx="4.9" cy="9.4" r="2.4"/><path opacity=".8" d="M.6 18.6c0-2.8 1.9-4.8 4.3-4.8 1 0 1.9.3 2.6.9-1.3 1.1-2.2 2.5-2.5 3.9Z"/><circle opacity=".8" cx="19.1" cy="9.4" r="2.4"/><path opacity=".8" d="M23.4 18.6c0-2.8-1.9-4.8-4.3-4.8-1 0-1.9.3-2.6.9 1.3 1.1 2.2 2.5 2.5 3.9Z"/><circle cx="12" cy="7.4" r="3.5"/><path d="M5.5 20.6c0-4 2.9-6.7 6.5-6.7s6.5 2.7 6.5 6.7Z"/></svg>`,
  megaphone: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2.4 9.6h3.4v4.8H2.4a1 1 0 0 1-1-1v-2.8a1 1 0 0 1 1-1Z"/><path d="M6.6 9.5 16.4 4.6v14.8L6.6 14.5Z"/><path d="M7.3 15.1l1.5 4.7h2.7l-1.2-3.9Z"/><path fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" d="M19.1 9.1l2.4-1.6M19.5 12h2.9M19.1 14.9l2.4 1.6"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="2.4" y="14.4" width="3.7" height="7.2" rx=".9"/><rect x="7.6" y="10.4" width="3.7" height="11.2" rx=".9"/><rect x="12.8" y="6.4" width="3.7" height="15.2" rx=".9"/><rect x="18" y="2.4" width="3.7" height="19.2" rx=".9"/></svg>`,
};

const STAND = `<svg class="stand" viewBox="0 0 640 210" aria-hidden="true">
<defs>
<linearGradient id="se" x1="0" x2="1"><stop offset="0" stop-color="#36a0ff"/><stop offset=".5" stop-color="#8f74ff"/><stop offset="1" stop-color="#ff7a1a"/></linearGradient>
<linearGradient id="st" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a63c8" stop-opacity=".55"/><stop offset="1" stop-color="#0b1840" stop-opacity=".9"/></linearGradient>
<linearGradient id="sf" x1="0" x2="1"><stop offset="0" stop-color="#2f8bff"/><stop offset=".5" stop-color="#6f5cff" stop-opacity=".6"/><stop offset="1" stop-color="#ff7a1a"/></linearGradient>
<radialGradient id="sg" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#5a86ff" stop-opacity=".55"/><stop offset=".6" stop-color="#7a5cff" stop-opacity=".18"/><stop offset="1" stop-color="#7a5cff" stop-opacity="0"/></radialGradient>
<filter id="sb" x="-10%" y="-60%" width="120%" height="220%"><feGaussianBlur stdDeviation="5"/></filter>
</defs>
<ellipse cx="320" cy="160" rx="318" ry="44" fill="url(#sg)"/>
<path fill="url(#sf)" opacity=".7" d="M24 149H616Q622 150 620 156L618 160Q616 165 606 165H34Q24 165 22 160L20 156Q18 150 24 149Z"/>
<path fill="none" stroke="url(#se)" stroke-width="9" opacity=".5" filter="url(#sb)" d="M104 118H536Q550 118 561 125L610 143Q624 150 608 150H32Q16 150 30 143L79 125Q90 118 104 118Z"/>
<path fill="url(#st)" stroke="url(#se)" stroke-width="2.6" d="M104 118H536Q550 118 561 125L610 143Q624 150 608 150H32Q16 150 30 143L79 125Q90 118 104 118Z"/>
<path fill="url(#sf)" opacity=".75" d="M128 105H512Q518 106 516 111L514 113Q512 117 503 117H137Q128 117 126 113L124 111Q122 106 128 105Z"/>
<path fill="none" stroke="url(#se)" stroke-width="8" opacity=".55" filter="url(#sb)" d="M186 84H454Q466 84 475 89L508 101Q520 106 506 106H134Q120 106 132 101L165 89Q174 84 186 84Z"/>
<path fill="url(#st)" stroke="url(#se)" stroke-width="2.4" d="M186 84H454Q466 84 475 89L508 101Q520 106 506 106H134Q120 106 132 101L165 89Q174 84 186 84Z"/>
</svg>`;

const STREAKS = `<svg class="streak blue" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
<defs><linearGradient id="kb" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#1e6bff" stop-opacity="0"/><stop offset=".35" stop-color="#2f8bff"/><stop offset=".7" stop-color="#8fd8ff"/><stop offset="1" stop-color="#8fd8ff" stop-opacity="0"/></linearGradient></defs>
<path d="M-4 33Q9 9 46-4" fill="none" stroke="url(#kb)" stroke-width="18" opacity=".22" vector-effect="non-scaling-stroke"/>
<path d="M-4 33Q9 9 46-4" fill="none" stroke="url(#kb)" stroke-width="3" vector-effect="non-scaling-stroke"/>
</svg>
<svg class="streak warm" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
<defs><linearGradient id="ko" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7a1a" stop-opacity="0"/><stop offset=".35" stop-color="#ff7a1a"/><stop offset=".7" stop-color="#ffb35c"/><stop offset="1" stop-color="#ffb35c" stop-opacity="0"/></linearGradient></defs>
<path d="M104 70Q95 94 58 104" fill="none" stroke="url(#ko)" stroke-width="18" opacity=".22" vector-effect="non-scaling-stroke"/>
<path d="M104 70Q95 94 58 104" fill="none" stroke="url(#ko)" stroke-width="3" vector-effect="non-scaling-stroke"/>
</svg>`;

// ───────────────────────────── page shell ─────────────────────────────
function head({ file, title, description }) {
  const canonical = `${SITE}/${file === "index.html" ? "" : file}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Nextier Global">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE}/assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#040a1f">
<link rel="icon" href="assets/mark.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;700&family=Montserrat:wght@600;700;800&display=swap">
<link rel="stylesheet" href="assets/site.css">
</head>`;
}

function page({ file, title, description, body, cta = "Request a key" }) {
  const nav = NAV.map(([f, l]) => `<a href="${f}"${f === file ? ' aria-current="page"' : ""}>${l}</a>`).join("");
  return `${head({ file, title, description })}
<body class="doc-page">
<header class="top"><div class="in">
  <a class="brand" href="./" aria-label="Nextier Global home">${mark("mk-s", "h")}<span>NEX<b>TIER</b> GLOBAL</span></a>
  <nav class="nav" aria-label="Main">${nav}${cta ? `<a class="cta" href="${BOOK}" target="_blank" rel="noopener">${esc(cta)}</a>` : ""}</nav>
</div></header>
<main>
${body}
</main>
<footer><div class="wrap in"><span>${FOOT}</span><span>${NAV.map(([f, l]) => `<a href="${f}">${l}</a>`).join(" · ")}</span></div></footer>
<script src="assets/site.js"></script>
</body>
</html>
`;
}

// curl / SDK tab pair
function tabs(curl, sdk) {
  return `<div class="tabs" role="tablist"><button type="button" role="tab" aria-selected="true">curl</button><button type="button" role="tab" aria-selected="false">SDK</button></div>
<div class="tabpanes"><pre><code>${esc(curl)}</code></pre><pre hidden><code>${esc(sdk)}</code></pre></div>`;
}
const code = (s) => `<pre><code>${esc(s)}</code></pre>`;

// ───────────────────────────── home = the poster ─────────────────────────────
const card = (cls, icon) => `<div class="glass ${cls}">${ICON[icon]}</div>`;
const home = `${head({
  file: "index.html",
  title: "Nextier Global · Enterprise Execution Platform",
  description: "Nextier Global. Intelligence, judgment, execution. Enterprise Execution Platform: API, SDK, MCP, Build Packs.",
})}
<body class="home">
<main class="poster">
${STREAKS}
<div class="poster-in">
  ${mark("mk", "p")}
  <p class="wordmark">NEX<span class="t">TIER</span> GLOBAL</p>
  <p class="tagline"><span>INTELLIGENCE</span><span>JUDGMENT</span><span>EXECUTION</span></p>
  <div class="stage" aria-hidden="true">
    <div class="cards">
      ${card("out l", "code")}
      ${card("in l", "layers")}
      ${card("mid", "people")}
      ${card("in r warm", "megaphone")}
      ${card("out r warm", "chart")}
    </div>
    ${STAND}
  </div>
  <h1 class="headline">Enterprise<br>Execution Platform</h1>
  <nav class="pill" aria-label="Platform">${NAV.map(([f, l]) => `<a href="${f}">${l}</a>`).join('<i aria-hidden="true">•</i>')}</nav>
</div>
<p class="poster-foot">${FOOT}</p>
</main>
</body>
</html>
`;

// ───────────────────────────── endpoints (Data Engine v1, as on main) ─────────────────────────────
const EX_LEAD = {
  id: "lead_01J…",
  first_name: "Jordan",
  last_name: "Example",
  phone: "+15165550142",
  phone_type: "mobile",
  email: null,
  city: "Riverhead",
  state: "NY",
  zip: "11901",
  county: "Suffolk",
  source_tag: "data_engine",
  tags: ["SEG_PRE_FORECLOSURE", "GEO_SUFFOLK", "HIGH_PURSUIT", "EXECUTION_READY"],
  created_at: "2026-10-20T14:02:11.000Z",
  updated_at: "2026-10-24T09:15:40.000Z",
};
const EX_SIGNALS = [
  { id: "sig_…1", event_type: "NET_NEW_PRE_FORECLOSURE", field_name: "pre_foreclosure", property_id: "…", lead_id: "lead_01J…", detected_at: "2026-10-24T11:02:51.000Z", signal_family: "distress", cadence: "daily", truth_class: "verified_net_new" },
  { id: "sig_…2", event_type: "NET_NEW_AUCTION", field_name: "auction", property_id: "…", lead_id: null, detected_at: "2026-10-23T11:01:07.000Z", signal_family: "distress", cadence: "daily", truth_class: "verified_net_new" },
];
const fieldsCount = REG ? ` ${REG.total} fields today: ${REG.static} static, ${REG.dynamic} dynamic, ${REG.triggerReady} trigger-ready.` : "";

const EP = [
  {
    id: "discovery", method: "GET", path: "", title: "Check your key",
    summary: "Confirms the key is valid and lists the endpoints it can call. Start here.",
    curl: `curl ${BASE} \\\n  -H "x-api-key: $NEXTIER_API_KEY"`,
    sdk: `const info = await nx.info();\nconsole.log(info.teamId, Object.keys(info.endpoints));`,
    res: { ok: true, product: "Nextier Data Engine", version: "v1", teamId: "team_…", endpoints: { fields: "GET /api/data-engine/v1/fields — …", leads: "GET /api/data-engine/v1/leads?… — read/pull leads", "…": "…" }, note: "Read-first data portal, complementary to nxtier.ai. Push endpoints STAGE for execution; the operator approves & sends in nxtier.ai. Every call is pinned to this key's team_id.", auth: "x-api-key: <key>  (or Authorization: Bearer <key>)" },
  },
  {
    id: "fields", method: "GET", path: "/fields", title: "Read the field registry", stage: "Read",
    summary: `Every field the engine watches: static or dynamic, whether a change fires a net-new event (trigger-ready), how often it is re-checked, and where it comes from.${fieldsCount}`,
    curl: `curl ${BASE}/fields \\\n  -H "x-api-key: $NEXTIER_API_KEY"`,
    sdk: `const { fields } = await nx.fields();\nconst triggers = fields.filter((f) => f.triggerReady);`,
    res: { ok: true, teamId: "team_…", total: REG ? REG.total : "…", static: REG ? REG.static : "…", dynamic: REG ? REG.dynamic : "…", triggerReady: REG ? REG.triggerReady : "…", fields: [{ field: "county", kind: "static", triggerReady: false, cadence: "none", source: "PLUTO", label: "County" }, { field: "vacant", kind: "dynamic", triggerReady: true, cadence: "monthly", triggerEvent: "NET_NEW_VACANT", source: "…", label: "Vacant" }, "…"] },
  },
  {
    id: "signals", method: "GET", path: "/signals/net-new", title: "Pull net-new signals", stage: "Detect",
    summary: "The engine's flagship output: signals detected for your workspace, newest first. A net-new signal is a new reason to act: a first detection, or a step up the distress ladder.",
    params: [["since", "date", "no", "30 days ago", "ISO date, YYYY-MM-DD. Signals detected on or after it."], ["limit", "integer", "no", "500", "Max rows. Capped at 5000."], ["family", "string", "no", "—", "Only this signal family, e.g. distress."]],
    curl: `curl "${BASE}/signals/net-new?since=2026-10-01&family=distress&limit=500" \\\n  -H "x-api-key: $NEXTIER_API_KEY"`,
    sdk: `const { signals } = await nx.signals.netNew({ since: "2026-10-01", family: "distress" });`,
    res: { ok: true, teamId: "team_…", since: "2026-10-01", count: 2, signals: EX_SIGNALS },
  },
  {
    id: "leads", method: "GET", path: "/leads", title: "Read leads", stage: "Read",
    summary: "Your workspace's leads, most recently updated first. Filter by text, tag or source; page with limit and offset.",
    params: [["search", "string", "no", "—", "Partial, case-insensitive match on first name, last name, phone or email."], ["tag", "string", "no", "—", "Only leads carrying this tag, e.g. EXECUTION_READY."], ["sourceTag", "string", "no", "—", "Exact source tag."], ["limit", "integer", "no", "50", "Page size. Capped at 200."], ["offset", "integer", "no", "0", "Rows to skip."]],
    curl: `curl "${BASE}/leads?tag=EXECUTION_READY&limit=200" \\\n  -H "x-api-key: $NEXTIER_API_KEY"`,
    sdk: `// one page\nconst { leads } = await nx.leads.list({ tag: "EXECUTION_READY", limit: 200 });\n\n// every page\nfor await (const lead of nx.leads.listAll({ tag: "EXECUTION_READY" })) {\n  console.log(lead.id, lead.tags);\n}`,
    res: { ok: true, teamId: "team_…", count: 1, limit: 200, offset: 0, leads: [EX_LEAD] },
  },
  {
    id: "autotag", method: "POST", path: "/leads/autotag", title: "Label at origin (auto-tagging)", stage: "Classify + Prioritize",
    summary: "The auto-tagging rule. mode \"origin\" (default) stamps static origin facts plus dynamic labels, so a lead is born tagged. mode \"dynamic\" re-stamps only the dynamic labels and preserves the static ones: run it on every change (enrichment, scrub, signal update) so alignment never drifts. Omit leadIds to tag the whole workspace up to limit.",
    params: [["leadIds", "string[]", "no", "whole workspace", "Leads to tag. Omit to run across the workspace."], ["limit", "integer", "no", "5000", "When leadIds is omitted: how many leads. Capped at 50,000."], ["mode", "\"origin\" | \"dynamic\"", "no", "\"origin\"", "origin = static + dynamic. dynamic = re-stamp dynamic only."]],
    curl: `curl -X POST ${BASE}/leads/autotag \\\n  -H "x-api-key: $NEXTIER_API_KEY" \\\n  -H "content-type: application/json" \\\n  -d '{"mode":"dynamic","limit":5000}'`,
    sdk: `// born tagged\nawait nx.leads.autotag({ leadIds: newIds });\n\n// after every change: re-stamp dynamic labels only\nawait nx.leads.autotag({ mode: "dynamic" });`,
    res: { ok: true, tagged: 4820, mode: "dynamic", breakdown: { HIGH_PURSUIT: 312, MEDIUM_PURSUIT: 1104, HIGH_CONVERGENCE: 87, HIGH_CONTACTABILITY: 2210, EXECUTION_READY: 296, SUPPRESS: 41 } },
    note: "Example counts.",
  },
  {
    id: "score", method: "POST", path: "/leads/score", title: "Score (same rule as autotag)", stage: "Classify + Prioritize",
    summary: "Runs the same auto-tagging rule with the same body and response as /leads/autotag. Kept for integrations built against it; new code should call /leads/autotag.",
    curl: `curl -X POST ${BASE}/leads/score \\\n  -H "x-api-key: $NEXTIER_API_KEY" \\\n  -H "content-type: application/json" \\\n  -d '{"leadIds":["lead_01J…"]}'`,
    sdk: `await nx.leads.score({ leadIds: ["lead_01J…"] });`,
    res: { ok: true, tagged: 1, mode: "origin", breakdown: { SEG_PRE_FORECLOSURE: 1, HIGH_PURSUIT: 1, EXECUTION_READY: 1 } },
  },
  {
    id: "tag", method: "POST", path: "/leads/tag", title: "Tag leads in bulk", stage: "Classify",
    summary: "Add or remove your own tags on many leads at once. Idempotent. Journey and compliance tags are not touched.",
    params: [["leadIds", "string[]", "yes", "—", "Leads to change."], ["addTags", "string[]", "one of", "—", "Tags to add."], ["removeTags", "string[]", "one of", "—", "Tags to remove."]],
    curl: `curl -X POST ${BASE}/leads/tag \\\n  -H "x-api-key: $NEXTIER_API_KEY" \\\n  -H "content-type: application/json" \\\n  -d '{"leadIds":["lead_01J…"],"addTags":["Q4_RIVERHEAD"]}'`,
    sdk: `await nx.leads.tag({ leadIds, addTags: ["Q4_RIVERHEAD"] });`,
    res: { ok: true, updated: 1 },
  },
  {
    id: "update", method: "POST", path: "/leads/update", title: "Update leads in bulk", stage: "Classify",
    summary: "Set a safe list of fields on many leads: priority, score, notes, campaign_name. Anything else is rejected. Journey, compliance and state fields belong to the disposition router and cannot be set from the API.",
    params: [["leadIds", "string[]", "yes", "—", "Leads to change."], ["set", "object", "yes", "—", "{ priority?: string, score?: integer, notes?: string, campaign_name?: string }"]],
    curl: `curl -X POST ${BASE}/leads/update \\\n  -H "x-api-key: $NEXTIER_API_KEY" \\\n  -H "content-type: application/json" \\\n  -d '{"leadIds":["lead_01J…"],"set":{"priority":"high","notes":"Owner asked for a call after 5"}}'`,
    sdk: `const r = await nx.leads.update({ leadIds, set: { priority: "high" } });\nif (r.rejectedColumns) console.warn("not allowed:", r.rejectedColumns);`,
    res: { ok: true, updated: 1, appliedColumns: ["priority", "notes"] },
  },
  {
    id: "push-initial-sms", method: "POST", path: "/push/initial-sms", title: "Stage an Initial SMS block", stage: "Execute",
    summary: "Stages a held Initial SMS block from your leads. Nothing sends: an operator reviews the opener and presses Send in nxtier.ai. Ineligible leads are skipped and counted.",
    params: [["leadIds", "string[]", "yes", "—", "Leads to stage."], ["name", "string", "no", "Data Engine Push — N leads — date", "Block name shown on the launch page."], ["signalType", "string", "no", "—", "The signal behind the block, e.g. pre_foreclosure."]],
    curl: `curl -X POST ${BASE}/push/initial-sms \\\n  -H "x-api-key: $NEXTIER_API_KEY" \\\n  -H "content-type: application/json" \\\n  -d '{"leadIds":["lead_01J…"],"name":"Riverhead · pre-foreclosure","signalType":"pre_foreclosure"}'`,
    sdk: `const block = await nx.push.initialSms({ leadIds, name: "Riverhead · pre-foreclosure" });\nconsole.log(block.blockId, block.launchUrl); // a person approves it there`,
    res: { ok: true, blockId: "cb_de_…", leadCount: 296, requestedLeadCount: 300, ineligibleCount: 4, launchUrl: "https://www.nxtier.ai/t/…" },
  },
  {
    id: "push-contact-center", method: "POST", path: "/push/contact-center", title: "Queue for the Contact Center", stage: "Execute",
    summary: "Puts your leads on the workspace's call queue in nxtier.ai. Signal buckets place themselves by tag. Suppressed leads are never queued.",
    params: [["leadIds", "string[]", "yes", "—", "Leads to queue."]],
    curl: `curl -X POST ${BASE}/push/contact-center \\\n  -H "x-api-key: $NEXTIER_API_KEY" \\\n  -H "content-type: application/json" \\\n  -d '{"leadIds":["lead_01J…"]}'`,
    sdk: `const q = await nx.push.contactCenter({ leadIds });\nconsole.log(q.pushedCount, "queued,", q.ineligibleCount, "skipped");`,
    res: { ok: true, pushedCount: 118, requestedLeadCount: 120, ineligibleCount: 2, dialerUrl: "https://www.nxtier.ai/t/…" },
  },
  {
    id: "push-dialer", method: "POST", path: "/push/dialer", title: "Push leads to the dialer", stage: "Execute",
    summary: "Bring your own rows or route existing leads onto the operator's power dialer. Raw rows are upserted into your workspace first, de-duplicated by phone. Opted-out, suppressed and do-not-call leads are never queued. Nothing is dialed until an operator starts the dialer.",
    params: [["leads", "DialerLeadRow[]", "one of", "—", "Up to 500 rows per call: firstName, lastName or name, phone, email, address, city, state, zip, notes, phoneType, dnc, tcpa."], ["leadIds", "string[]", "one of", "—", "Leads that already exist in your workspace."]],
    curl: `curl -X POST ${BASE}/push/dialer \\\n  -H "x-api-key: $NEXTIER_API_KEY" \\\n  -H "content-type: application/json" \\\n  -d '{"leads":[{"name":"Jordan Example","phone":"+15165550142","city":"Riverhead","state":"NY"}]}'`,
    sdk: `const d = await nx.push.dialer({ leads: rows });\nconsole.log(d.createdCount, "new,", d.matchedCount, "matched,", d.invalidCount, "invalid");`,
    res: { ok: true, pushedCount: 1, requestedLeadCount: 1, createdCount: 1, matchedCount: 0, invalidCount: 0, ineligibleCount: 0, leadIds: ["lead_01J…"], dialerUrl: "https://www.nxtier.ai/t/…" },
  },
];

function endpointBlock(e) {
  const params = e.params
    ? `<h3>${e.method === "GET" ? "Query parameters" : "Body"}</h3><div class="tbl"><table><thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Default</th><th>Notes</th></tr></thead><tbody>${e.params.map(([n, t, r, d, x]) => `<tr><td><code>${esc(n)}</code></td><td>${esc(t)}</td><td>${esc(r)}</td><td>${esc(d)}</td><td>${esc(x)}</td></tr>`).join("")}</tbody></table></div>`
    : "";
  return `<div class="endpoint" id="${e.id}">
<div class="ep-h"><span class="method${e.method === "POST" ? " post" : ""}">${e.method}</span><span class="path">/api/data-engine/v1${esc(e.path)}</span>${e.stage ? `<span class="chip o">${esc(e.stage)}</span>` : ""}</div>
<h3 style="margin-top:14px">${esc(e.title)}</h3>
<p>${esc(e.summary)}</p>
${params}
<h3>Request</h3>
${tabs(e.curl, e.sdk)}
<h3>Response</h3>
${code(json(e.res))}
${e.note ? `<p class="note b">${esc(e.note)}</p>` : ""}
</div>`;
}

const api = page({
  file: "api.html",
  title: "API · Nextier Global",
  description: `The Nextier Data Engine API v1: authentication, errors, limits and all ${EP.length} endpoints with curl and SDK examples.`,
  body: `<div class="wrap docs">
<aside class="toc" aria-label="On this page">
  <b>Basics</b><a href="#base">Base URL</a><a href="#auth">Authentication</a><a href="#errors">Errors</a><a href="#limits">Limits</a>
  <b>Endpoints</b>${EP.map((e) => `<a href="#${e.id}"><span class="m${e.method === "POST" ? " p" : ""}">${e.method}</span>${esc(e.path || "/")}</a>`).join("")}
</aside>
<article class="doc">
<span class="status live">v1 · live</span>
<h1>API</h1>
<p>The Data Engine API is JSON over HTTPS. It is read-first: reads are scoped to your workspace, writes only touch descriptive data, and pushes stage work for a person to approve in nxtier.ai.</p>

<h2 id="base">Base URL</h2>
${code(BASE)}

<h2 id="auth">Authentication</h2>
<p>Send your Data Engine key on every request, in either header. Keys look like <code>de_live_…</code>, are issued per workspace and shown once. Only a SHA-256 hash is stored. Every call is metered on the key, and a revoked key stops working immediately. <a href="${BOOK}" target="_blank" rel="noopener">Request a key</a>.</p>
${code(`x-api-key: de_live_…\n# or\nAuthorization: Bearer de_live_…`)}
<p class="note">The key decides the workspace. Every query and write is pinned to it, and there is no header that switches workspaces. Keep the key server-side; never ship it to a browser or a mobile app.</p>

<h2 id="errors">Errors</h2>
<div class="tbl"><table><thead><tr><th>Status</th><th>Meaning</th><th>Body</th></tr></thead><tbody>
<tr><td><code>401</code></td><td>Missing, unknown or revoked key</td><td><code>{"error":"Invalid or missing API key.","hint":"…"}</code></td></tr>
<tr><td><code>400</code></td><td>Invalid request, e.g. leadIds missing or no allowed field to set</td><td><code>{"error":"leadIds is required"}</code></td></tr>
<tr><td><code>4xx</code></td><td>A push refused for a stated reason</td><td><code>{"error":"…"}</code></td></tr>
<tr><td><code>500</code></td><td>Server error. Safe to retry reads with backoff</td><td><code>{"error":"…"}</code></td></tr>
</tbody></table></div>

<h2 id="limits">Limits</h2>
<ul>
  <li><b>GET /leads</b>: up to 200 per page. Use <code>offset</code> to page.</li>
  <li><b>GET /signals/net-new</b>: up to 5,000 per call.</li>
  <li><b>POST /leads/autotag</b> without <code>leadIds</code>: up to 50,000 leads per run (default 5,000).</li>
  <li><b>POST /push/dialer</b>: up to 500 rows per call.</li>
  <li>Every call is metered on your key. Batch bulk work rather than sending one lead per call.</li>
</ul>

<h2 id="endpoints">Endpoints</h2>
${EP.map(endpointBlock).join("\n")}
</article>
</div>`,
});

// packages/mcp-server/src/tools — each tool's own "Tier:" line.
const MCP_TOOLS = [
  ["Leads", [["leads_search", "read", "Search leads with filters. Paged."], ["leads_get", "read", "One lead, in full."], ["leads_count", "read", "Lead counts, grouped by status or pipeline."], ["leads_attempt_log", "read", "Every text, call and email on a lead."]]],
  ["Campaigns", [["campaigns_list", "read", "Every campaign in the workspace."], ["campaigns_get", "read", "One campaign, in full."]]],
  ["Pipeline", [["pipeline_queue_stats", "read", "Leads by pipeline status, send readiness and suppression counts."], ["pipeline_call_queue", "read", "Leads waiting on the call queue."]]],
  ["Enrichment", [["enrich_property", "write · billed", "Property detail and value for an address."], ["enrich_company", "write · billed", "Fills in what a business record left blank."], ["enrich_skip_trace", "write · billed", "Owner phones and emails, written back to the lead. Counts first by default and spends nothing until you run it."], ["enrich_validate_phone", "write · billed", "Line type: mobile, landline or VoIP. Only mobiles get texts."]]],
  ["Workspace", [["workspace_info", "read", "Your workspace and its settings."], ["health_check", "read", "Status of the systems behind your workspace."]]],
];
const readCount = MCP_TOOLS.flatMap(([, l]) => l).filter(([, t]) => t === "read").length;
const writeCount = MCP_TOOLS.flatMap(([, l]) => l).length - readCount;

const mcp = page({
  file: "mcp.html",
  title: "MCP · Nextier Global",
  description: "The Nextier MCP server lets Claude, Cursor or any MCP client work your Nextier data in plain English. Reads first; enrichment is billed and says so.",
  body: `<div class="wrap docs">
<aside class="toc" aria-label="On this page"><b>MCP</b><a href="#what">What it is</a><a href="#status">Status</a><a href="#tools">Tools</a><a href="#ask">What to ask</a><a href="#api">MCP or API?</a></aside>
<article class="doc">
<span class="status">Private beta</span>
<h1>MCP</h1>
<p id="what">Plug the Data Engine straight into Claude, Cursor, Windsurf or any client that speaks the Model Context Protocol. Your AI can count, search, enrich and check your queues in plain English, against the same workspace as the app.</p>
<ul class="checks">
  <li><b>Reads first.</b> ${readCount} of the ${readCount + writeCount} tools only read.</li>
  <li><b>Enrichment is billed, and says so.</b> The ${writeCount} enrichment tools write results back to your leads and are metered per use.</li>
  <li><b>Nothing sends.</b> No tool texts, calls or emails anyone.</li>
  <li><b>Same truth as the app.</b> Counts come from the same tables the operators work from.</li>
</ul>

<h2 id="status">Status</h2>
<p>The server runs today for Nextier operators. Client access, signing in with your own Data Engine key and pinned to your workspace, is rolling out to private-beta partners. <a href="${BOOK}" target="_blank" rel="noopener">Request access</a>.</p>

<h2 id="tools">Tools</h2>
${MCP_TOOLS.map(([g, list]) => `<h3>${g}</h3><div class="tbl"><table><tbody>${list.map(([n, t, d]) => `<tr><td><code>${n}</code></td><td><span class="tier${t === "read" ? "" : " w"}">${esc(t)}</span></td><td>${esc(d)}</td></tr>`).join("")}</tbody></table></div>`).join("")}

<h2 id="ask">What to ask</h2>
${code(`"How many contactable pre-foreclosure leads do we have in Suffolk?"\n"Show me every attempt on this lead and whether it was delivered."\n"Which campaigns are paused, and how many leads are left in each?"\n"How many leads are waiting on the call queue right now?"`)}

<h2 id="api">MCP or API?</h2>
<div class="grid g2">
  <div class="card"><div class="k">Use the API</div><p>When a system does the work: pipelines, schedulers, your CRM, a data warehouse. It reads, tags and stages.</p></div>
  <div class="card"><div class="k">Use the MCP</div><p>When a person asks the questions through an AI assistant.</p></div>
</div>
</article></div>`,
});

const SDK_METHODS = [
  ["nx.info()", "GET /", "Confirm the key, list endpoints"],
  ["nx.fields()", "GET /fields", "Field registry"],
  ["nx.signals.netNew({ since, limit, family })", "GET /signals/net-new", "Net-new signals"],
  ["nx.leads.list({ search, tag, sourceTag, limit, offset })", "GET /leads", "One page of leads"],
  ["nx.leads.listAll({ search, tag, sourceTag })", "GET /leads", "Async iterator over every page"],
  ["nx.leads.autotag({ leadIds, limit, mode })", "POST /leads/autotag", "Labels at origin / dynamic re-stamp"],
  ["nx.leads.tag({ leadIds, addTags, removeTags })", "POST /leads/tag", "Bulk tags"],
  ["nx.leads.update({ leadIds, set })", "POST /leads/update", "Bulk safe fields"],
  ["nx.push.initialSms({ leadIds, name, signalType })", "POST /push/initial-sms", "Stage a held block"],
  ["nx.push.contactCenter({ leadIds })", "POST /push/contact-center", "Queue for calls"],
  ["nx.push.dialer({ leads, leadIds })", "POST /push/dialer", "Rows or leads onto the dialer"],
];

const sdk = page({
  file: "sdk.html",
  title: "SDK · Nextier Global",
  description: "A zero-dependency JavaScript SDK with TypeScript types for the Nextier Data Engine API. Node 18+, Deno, Bun and edge runtimes.",
  body: `<div class="wrap docs">
<aside class="toc" aria-label="On this page"><b>SDK</b><a href="#install">Install</a><a href="#use">Use</a><a href="#methods">Methods</a><a href="#paging">Paging</a><a href="#errors">Errors and retries</a></aside>
<article class="doc">
<span class="status live">v0.1.0</span>
<h1>SDK</h1>
<p>One file, no dependencies, full TypeScript types. Runs anywhere <code>fetch</code> does: Node 18+, Deno, Bun and edge runtimes. Server-side only, because your key is a secret.</p>

<h2 id="install">Install</h2>
<p>Download the two files into your project. An npm package is next.</p>
${code(`curl -O ${SITE}/sdk/nextier.mjs\ncurl -O ${SITE}/sdk/nextier.d.ts`)}
<p><a href="sdk/nextier.mjs">nextier.mjs</a> · <a href="sdk/nextier.d.ts">nextier.d.ts</a></p>

<h2 id="use">Use</h2>
${code(`import { Nextier } from "./nextier.mjs";\n\nconst nx = new Nextier({ apiKey: process.env.NEXTIER_API_KEY });\n\n// Detect\nconst { signals } = await nx.signals.netNew({ since: "2026-10-01", family: "distress" });\n\n// Classify + prioritize: born tagged, then keep it aligned\nawait nx.leads.autotag({ leadIds: signals.map((s) => s.lead_id).filter(Boolean) });\n\n// Execute: stage the initial outreach for a person to approve\nconst ready = [];\nfor await (const lead of nx.leads.listAll({ tag: "EXECUTION_READY" })) ready.push(lead.id);\nconst block = await nx.push.initialSms({ leadIds: ready, name: "Net-new distress" });\nconsole.log("Approve it here:", block.launchUrl);`)}

<h3>Options</h3>
<div class="tbl"><table><thead><tr><th>Option</th><th>Default</th><th>Notes</th></tr></thead><tbody>
<tr><td><code>apiKey</code></td><td>required</td><td>Your <code>de_live_…</code> key.</td></tr>
<tr><td><code>baseUrl</code></td><td><code>${BASE}</code></td><td>Override for testing.</td></tr>
<tr><td><code>retries</code></td><td><code>2</code></td><td>Retries for reads on 429, 5xx and network errors.</td></tr>
<tr><td><code>timeoutMs</code></td><td><code>30000</code></td><td>Per request.</td></tr>
<tr><td><code>fetch</code></td><td>global <code>fetch</code></td><td>Bring your own implementation.</td></tr>
</tbody></table></div>

<h2 id="methods">Methods</h2>
<div class="tbl"><table><thead><tr><th>Method</th><th>Endpoint</th><th>Does</th></tr></thead><tbody>${SDK_METHODS.map(([m, e, d]) => `<tr><td><code>${esc(m)}</code></td><td><code>${esc(e)}</code></td><td>${esc(d)}</td></tr>`).join("")}</tbody></table></div>

<h2 id="paging">Paging</h2>
<p><code>listAll</code> walks every page at the API’s 200-per-page maximum and yields one lead at a time.</p>
${code(`let n = 0;\nfor await (const lead of nx.leads.listAll({ tag: "HIGH_PURSUIT" })) n++;\nconsole.log(n, "high-pursuit leads");`)}

<h2 id="errors">Errors and retries</h2>
<p>Every failure throws a <code>NextierError</code> with <code>status</code> and the API’s error <code>body</code>. Reads are retried with exponential backoff on 429, 5xx and network errors. <b>Pushes are never retried automatically</b>, so nothing is ever staged twice.</p>
${code(`import { Nextier, NextierError } from "./nextier.mjs";\n\ntry {\n  await nx.leads.update({ leadIds, set: { priority: "high" } });\n} catch (e) {\n  if (e instanceof NextierError && e.status === 401) console.error(e.body.hint);\n  else throw e;\n}`)}
</article></div>`,
});

// Build Packs — one pack per macro segment (Thomas's three: REAL ESTATE · B2B · B2C).
const PACKS = [
  ["Real Estate", "Signals → first text → replies → appointments", ""],
  ["B2B", "Click to call → follow-up → calendar", ""],
  ["B2C", "Coming soon", "soon"],
];
const IN_EVERY_PACK = [
  ["Data recipe", "Where the records come from, tagged at origin."],
  ["Opener library", "The first messages, written for your market."],
  ["Playbook", "What happens after someone replies."],
  ["Execution map", "What to work today."],
];
const packs = page({
  file: "build-packs.html",
  title: "Build Packs · Nextier Global",
  description: "A working execution system, set up in your own workspace. Real Estate, B2B, and B2C soon.",
  cta: "",
  body: `<div class="wrap single">
<article class="doc">
<h1>Build Packs</h1>
<p class="lede">A working execution system, set up in your own workspace.</p>
<div class="grid g3 packs">${PACKS.map(([t, l, k]) => `<div class="card pack${k ? " " + k : ""}"><div class="k">${k ? "Soon" : "Pack"}</div><h3>${esc(t)}</h3><p>${esc(l)}</p></div>`).join("")}</div>
<h2>In every pack</h2>
<ul class="checks">${IN_EVERY_PACK.map(([b, d]) => `<li><b>${esc(b)}.</b> ${esc(d)}</li>`).join("")}</ul>
<div class="btns"><a class="btn primary" href="${BOOK}" target="_blank" rel="noopener">Request a pack</a></div>
</article></div>`,
});

// Not found → home. Every old Notion link (/Data-Engine-…, /Partners-…) lands here.
const notFound = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Nextier Global</title><meta name="robots" content="noindex">
<script>(function(){var b=/github\\.io$/.test(location.hostname)?"/nextierglobal/":"/";location.replace(b);})();</script>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#040a1f;color:#fff;font:600 18px system-ui,sans-serif}a{color:#ffb27a}</style>
</head><body><p><a href="/">Go to Nextier Global</a></p></body></html>
`;

const files = { "index.html": home, "api.html": api, "sdk.html": sdk, "mcp.html": mcp, "build-packs.html": packs, "404.html": notFound };
for (const [f, html] of Object.entries(files)) fs.writeFileSync(path.join(OUT, f), html);
// pages the old portal wrote that are no longer part of the site
for (const f of ["byok.html", "glossary.html"]) fs.rmSync(path.join(OUT, f), { force: true });

fs.writeFileSync(path.join(OUT, "assets", "mark.svg"), mark("", "f").replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" '));
fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
fs.writeFileSync(
  path.join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[["index.html"], ...NAV].map(([f]) => `  <url><loc>${SITE}/${f === "index.html" ? "" : f}</loc></url>`).join("\n")}\n</urlset>\n`,
);
fs.writeFileSync(
  path.join(OUT, "llms.txt"),
  `# Nextier Global\n\n> Enterprise Execution Platform. Intelligence, judgment, execution. API, SDK, MCP, Build Packs.\n\n- Base URL: ${BASE}\n- Auth: x-api-key: de_live_… (or Authorization: Bearer). One key = one workspace.\n- Push endpoints stage work; nothing sends until a person approves it in nxtier.ai.\n\n## Pages\n- [API](${SITE}/api.html): all ${EP.length} endpoints\n- [SDK](${SITE}/sdk.html): zero-dependency JavaScript client\n- [MCP](${SITE}/mcp.html): tools for AI assistants (private beta)\n- [Build Packs](${SITE}/build-packs.html): a working execution system, set up in your own workspace\n`,
);
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
console.log("built", Object.keys(files).length, "pages + mark.svg, robots, sitemap, llms.txt", REG ? `· registry ${REG.total}/${REG.static}/${REG.dynamic}/${REG.triggerReady}` : "· registry not found, counts left out");
