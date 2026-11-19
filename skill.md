---
name: nextier
description: Build with the Nextier Data Engine API. Pull net-new signals, read and label leads, and stage outreach for a person to approve. Use when code or an agent needs Nextier signals, leads, tags or pushes.
---

# Nextier Data Engine

Save this file as `.claude/skills/nextier/SKILL.md` in your project, or paste it into your agent's instructions.

## Setup

- Base URL: `https://www.nxtier.ai/api/data-engine/v1`
- Auth: `x-api-key: $NEXTIER_API_KEY` or `Authorization: Bearer $NEXTIER_API_KEY`. Keys look like `de_live_…`.
- One key = one workspace. No header switches workspaces.
- SDK, no dependencies: `curl -O https://www.nextierglobal.ai/sdk/nextier.mjs` and `nextier.d.ts`.
- Schemas: `openapi.json` on this site is the source of truth.

```js
import { Nextier } from "./nextier.mjs";
const nx = new Nextier({ apiKey: process.env.NEXTIER_API_KEY });
```

## The loop

1. **Detect**: `nx.signals.netNew({ since })`. What changed, newest first.
2. **Classify + prioritize**: `nx.leads.autotag({ leadIds })` when leads arrive, `nx.leads.autotag({ mode: "dynamic" })` after every change.
3. **Pick**: `nx.leads.listAll({ tag: "EXECUTION_READY" })`.
4. **Stage**: `nx.push.initialSms`, `nx.push.contactCenter` or `nx.push.dialer`. Show the person the returned URL.

## Rules

- Keep the key on the server. Never in a browser or an app.
- A push stages work. Never tell the user something was sent, texted or called.
- Never retry a push automatically. Read state first.
- Don't set status, stage, journey or compliance fields. The API rejects them.
- `lead_id` on a signal can be null. Only leads can be labeled or staged.
- Batch: 200 leads per page, 5,000 signals per call, 500 rows per dialer push.

## Endpoints

| Method | Path | SDK | Does |
|---|---|---|---|
| GET | `/` | `nx.info` | Confirm the key, list endpoints |
| GET | `/fields` | `nx.fields` | Field registry |
| GET | `/signals/net-new` | `nx.signals.netNew` | Net-new signals |
| GET | `/leads` | `nx.leads.list` | One page of leads |
| GET | `/leads` | `nx.leads.listAll` | Async iterator over every page |
| POST | `/leads/autotag` | `nx.leads.autotag` | Labels at origin / dynamic re-stamp |
| POST | `/leads/tag` | `nx.leads.tag` | Bulk tags |
| POST | `/leads/update` | `nx.leads.update` | Bulk safe fields |
| POST | `/push/initial-sms` | `nx.push.initialSms` | Stage a held block |
| POST | `/push/contact-center` | `nx.push.contactCenter` | Queue for calls |
| POST | `/push/dialer` | `nx.push.dialer` | Rows or leads onto the dialer |

## Errors

Every failure throws `NextierError` with `status` and `body`. 401 = missing, unknown or revoked key (read `body.hint`). 400 = invalid request. Reads retry with backoff on 429, 5xx and network errors. Pushes never do.
