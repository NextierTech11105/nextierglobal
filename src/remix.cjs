// nextierglobal.ai, the developer + Build Pack half. Called from build.cjs.
// Two remixes, 2026-11-19 (Thomas): Exa's site (docs index, quickstart, best practices, plans, llms.txt with
// agent instructions, an OpenAPI spec, an agent skill) and PushButton's Build Pack page (spec sheet by dimension,
// what you get, what it runs on, what you need, how it goes live, two ways to own it, FAQ).
// Rules kept: every spec line was read from the code on main (paths in the comment above each pack).
// ⛔ No price anywhere (Thomas 10-18). No vendor names, no client names. Never the word "free".
module.exports = function remix(h) {
  const { page, code, tabs, esc, json, BASE, SITE, BOOK, EP, REG, MCP_TOOLS, SDK_METHODS } = h;
  const ep = (id) => EP.find((e) => e.id === id);
  const book = (label, cls = "btn primary") => `<a class="${cls}" href="${BOOK}" target="_blank" rel="noopener">${esc(label)}</a>`;

  // ───────────────────────────── the two ways to own a pack (Thomas, 10-08, his words) ─────────────────────────────
  const WITH_YOU = [
    "Accounts and keys opened in your name",
    "We guide every step, on a call or in the workspace",
    "Your playbook and execution map, written with you",
    "Best for a team with an operator ready to run it",
  ];
  const FOR_YOU = [
    "You open the accounts in your name and add your card",
    "We install it end to end",
    "We run it every week and report what moved",
    "Best for a team that wants it running, not built",
  ];
  const OWN = [
    ["Accounts", "In your name"],
    ["Keys", "Yours, in your workspace"],
    ["Data", "Pinned to your workspace"],
    ["Customers", "Yours. No middleman"],
  ];
  const twoWays = (extraForYou = []) => `<section class="sec" id="own">
<h2>Two ways to own it</h2>
<p class="sub">Same system either way. It runs on your accounts, and you keep them.</p>
<div class="grid g2">
  <div class="card plan"><div class="k">Done with you</div><h3>You set it up. We guide every step.</h3><ul class="checks">${WITH_YOU.map((l) => `<li>${esc(l)}</li>`).join("")}</ul><div class="btns">${book("Book a call")}</div></div>
  <div class="card plan hot"><div class="k">Done for you, then managed</div><h3>We build it. Then we run it.</h3><ul class="checks">${[...FOR_YOU.slice(0, 3), ...extraForYou, FOR_YOU[3]].map((l) => `<li>${esc(l)}</li>`).join("")}</ul><div class="btns">${book("Book a call")}</div></div>
</div>
<h3 style="margin-top:30px">What you own</h3>
<div class="own">${OWN.map(([k, v]) => `<div class="card"><div class="k">${esc(k)}</div><p>${esc(v)}</p></div>`).join("")}</div>
</section>`;

  // ───────────────────────────── the three packs ─────────────────────────────
  const fieldLine = REG
    ? `Field registry: ${REG.total} fields, ${REG.static} static, ${REG.dynamic} dynamic, ${REG.triggerReady} trigger-ready`
    : "Field registry: every field marked static or dynamic, and trigger-ready or not";

  const PACKS = [
    // lib/data-engine/{hunt-book,book-trace,field-registry,field-watch,auto-tagging,pursuit-labeling,push,api-key-auth}.ts,
    // lib/signals/changing-fields.ts, lib/eligibility/mobile-contactability.ts, api/data-engine/v1/*, api/voice/quick-call
    {
      file: "data-engine.html",
      n: "01",
      name: "Data Engine",
      line: "From a territory to an owner you can call.",
      about: "Every parcel in your territory, the signal that says why now, the owner behind it, and their phones and emails, ranked. It ends at click to call.",
      who: "Real estate teams, brokerages and B2B sellers who work a set territory and need to know who to call today, and why.",
      problem: "Lists get bought, traced and texted with no reason to call now. Nobody sees which owner just had a filing, and the same address gets paid for twice.",
      spec: [
        ["Foundational database", [
          "Every parcel in your territory, from public records and your own MLS login",
          "Owner names from government records first, then traced",
          fieldLine,
          "Watched fields: only fields that change are re-checked, as often as their source updates",
          "One territory per workspace. Pulls read from your own book, never outside it",
        ]],
        ["Event signals", [
          "Net-new signals: a first detection, or a step up the distress ladder",
          "Pre-foreclosure, lis pendens, auction, estate, tax delinquent, vacant",
          "Expired and cancelled listings",
          "Standing segments: absentee, high equity, adjustable rate",
          "Newest first, by family, in the app or over the API",
        ]],
        ["Classification + priority", [
          "Born tagged: segment, geography and source stamped at origin",
          "Pursuit: high, medium, low. Plus convergence and contactability",
          "EXECUTION_READY marks who to work. SUPPRESS marks who to leave alone",
          "Dynamic labels re-stamp on demand. Origin labels stay put",
        ]],
        ["Contact", [
          "Skip trace on your own account. An address already traced is written back at no cost",
          "Company-owned records are counted, not traced",
          "Phones ranked. The texting number is the first mobile not flagged do-not-call",
          "A landline is never the texting number",
          "Click to call from the record, on your own lines",
        ]],
        ["Property Book", [
          "List view, then a detail view for every owner",
          "Pull by rank → trace → check results → push",
          "County access per operator",
        ]],
        ["API + automation", [
          `Data Engine API v1: ${EP.length} endpoints, a JavaScript SDK and an OpenAPI spec`,
          "Keys per workspace, stored as a SHA-256 hash, revocable",
          "Push a block to Initial SMS, the Contact Center queue or the dialer",
          "MCP tools for AI assistants (Nextier operators today)",
        ]],
        ["Safety + tenancy", [
          "Every query pinned to your workspace by your key",
          "Nothing sends from the Data Engine",
          "Your keys only. A key that isn't yours is refused",
        ]],
      ],
      get: [
        "Your territory loaded: every parcel, owner and listing history",
        "Signals switched on for the families you work",
        "Owners traced on your own account, phones ranked",
        "Your Property Book: list, detail, pull, trace, push",
        "Click to call on your own lines",
        "An API key, the SDK and the OpenAPI spec",
        "Data recipe and execution map: where records come from, what to work today",
      ],
      runs: [
        ["Skip trace account", "Phones and emails for each owner", "Per owner found. Misses cost nothing"],
        ["Voice lines", "Click to call", "Usage, on your account"],
        ["MLS login", "Listing history: expired, live, sold", "Your membership"],
        ["Property data plan", "Notices and records where open data stops", "Monthly, on your plan"],
      ],
      need: [
        "Your territory: counties or neighborhoods",
        "A skip trace account in your name",
        "Voice lines in your name. No texting campaign needed",
        "Your MLS login, if you have one",
        "A property data plan, for areas without open records",
      ],
      live: [
        ["Open the accounts", "In your name, with your card."],
        ["Add your keys", "In your workspace on nxtier.ai."],
        ["We load your territory", "And switch on your signals."],
        ["Your Property Book opens", "Pull, trace, call."],
      ],
      faq: [
        ["Do I need to code?", "No. The Property Book, signals and calling live in your workspace on nxtier.ai. The API is there when you want your own systems on it."],
        ["Whose data is it?", "Yours. Your accounts, your keys, your book. Every query is pinned to your workspace."],
        ["Does it send texts?", "No. The Data Engine ends at click to call. Bulk first texts are the Campaign Engine."],
        ["Which markets?", "New York loads from open records today. Other states run on a property data plan in your name."],
        ["Real estate only?", "No. Same layers for B2B and B2C. Only the sources inside each layer change."],
        ["What does a skip trace cost?", "Your account's rate. A normal trace bills per owner found, misses cost nothing, and an address already traced is not paid for twice."],
      ],
    },
    // lib/initial-sms/{sender-rail-pool,standing-authorization}.ts, api/blocks/initial-sms/launch, api/initial-sms/senders,
    // lib/signalhouse/thread-continuity.ts, lib/cadence/cadence-executor.ts, lib/alerts, components/focus/bulk-text-button.tsx,
    // lib/voice/auto-sms-on-inbound-call.ts, lib/inbound/{ai-booking,meeting-confirm,ai-training}.ts, t/[team]/email-out
    {
      file: "campaign-engine.html",
      n: "02",
      name: "Campaign Engine",
      line: "Initial SMS sent and delivered. Then the replies.",
      about: "One approved first text to a whole block, sent across your own lines through every carrier and compliance check. Replies come back on the same number, get answered, and become booked calls.",
      who: "Teams with a traced list and a registered texting brand who need first texts delivered at volume without burning their numbers.",
      problem: "Blasting from one number gets it filtered. Replies come back on a different line than the opener, threads split, and nobody can say who was really reached.",
      spec: [
        ["Initial SMS", [
          "One approved opener to a whole block",
          "One press drains block after block, then stops at today's capacity",
          "Capacity is on screen before you press Send",
          "Leads left over stay eligible for the next send",
          "A receipt after every send night",
        ]],
        ["Sender rotation", [
          "Rotates across your own lines. Warmed lines fill first",
          "New lines ramp 250 → 400 → 500 a day",
          "500 a day per number: a quarter of the carrier's limit, on purpose",
          "A line failing over 25% in a day is benched",
        ]],
        ["Checks on every text", [
          "Opt-out, do-not-call and wrong number checked before every send",
          "Mobile numbers only",
          "Duplicate check before every send",
          "Fails closed: if a check can't run, nothing sends",
          "Written to the ledger before the send. Delivery receipts update it",
        ]],
        ["Replies", [
          "Replies leave from the number the first text came from",
          "A positive reply texts and emails your own people",
          "Text a whole reply bucket at once, each from its own thread's line",
          "Follow-ups scheduled per lead",
          "Email from your own address",
        ]],
        ["Calls in", [
          "Someone who calls in gets an approved reply, once a day at most",
          "Voicemails transcribed onto the lead",
        ]],
        ["Booking", [
          "Your own booking page",
          "AI booking behind an on/off switch: answers their text, books only a time they named, says it's an AI. Live in one workspace today",
          "With it on, one confirm text about three hours before the call",
          "Training sandbox: mark a draft GOOD or FIX IT, and the next reply learns from it",
        ]],
        ["Authorization", [
          "A person confirms every launch. An API key can't launch a send",
          "Away? One signed go covers up to 30 days, and you can revoke it any time",
          "No auto-text after an unanswered call. It's switched off in code",
        ]],
      ],
      get: [
        "Your texting brand, campaign and numbers set up in your name",
        "An opener library written for your market",
        "Your lines rotated and warmed",
        "A reply playbook: what happens after someone answers",
        "A booking page, and alerts to your own people",
        "A receipt after every send night",
      ],
      runs: [
        ["Texting + voice account", "Your brand, numbers, texts and calls", "Per message and per number"],
        ["Email sending account", "Email from your own address", "Your plan"],
      ],
      need: [
        "A registered business: legal name, EIN, address",
        "A texting + voice account in your name",
        "A traced list: the Data Engine, or your own",
        "An email sending account, for email",
      ],
      live: [
        ["Register your brand", "And your texting campaign, in your name."],
        ["Connect your numbers", "They warm up over four days."],
        ["Approve your first opener", "Nothing sends without it."],
        ["Press Send", "It stops at capacity and writes the receipt."],
      ],
      faq: [
        ["Why not send everything from one number?", "Carriers filter concentration. On our own book, one number at 100 a day failed 12% of the time. At 1,943 a day it failed 20%."],
        ["Can it send while I'm away?", "Yes, under one signed go: your approved openers, your send window, up to 30 days, and you can revoke it any time."],
        ["Who answers the replies?", "Your people, from each thread's own number. AI booking is a switch you control, and a deal always goes to a person."],
        ["Do you write the copy?", "We write the opener library with you. You approve it before anything sends."],
        ["Is texting part of the Data Engine?", "No. The Data Engine ends at click to call. Texts and email are this pack."],
      ],
      extraForYou: ["Weekly read: positive replies per 1,000 delivered, by opener"],
    },
    // lib/pipeline/{disposition-router,disposition-listeners,kanban-lane}.ts, lib/services/{state-machine,lead-attempt}.ts,
    // api/inbound/priority-callbacks, api/leads/[id]/mark-worked, lib/voice/voicemail-substance.ts, t/[team]/calendar,
    // lib/robots/{robot-registry,robot-board,workforce,workforce-board}.ts, api/ops/rail-health, lib/crm/unified-crm-service.ts
    {
      file: "pipeline-engine.html",
      n: "03",
      name: "Pipeline Engine",
      tag: "Pipeline management and optimization",
      line: "Every reply worked, in order. One record of truth.",
      about: "Every outcome goes through one router, every attempt sits in one ledger, and the people who raised a hand are on top. The machine does the clerical work and stops where judgment starts.",
      who: "Teams whose replies, callbacks and follow-ups have outgrown a spreadsheet and a CRM's default views.",
      problem: "Replies sit unworked, voicemails get missed, and the pipeline board says one thing while the message history says another.",
      spec: [
        ["One source of truth", [
          "One disposition router: every outcome in one transaction, the lead row locked",
          "A 60-second duplicate guard",
          "Stage changes fire events after commit. Listeners log the touch, enroll nurture, queue the call, suppress",
          "Opt-out blocks future sends and cancels queued ones",
          "Attempt ledger: every text, call and email, append-only",
        ]],
        ["Inbound", [
          "Every reply classified: positive, negative, neutral, opt-out, question, booking",
          "Any reply counts as engaged",
          "Callbacks first: anyone who called or left a voicemail sits above every cold row",
          "A repeat caller is one person to call back. Hangups are filtered out",
          "Voicemail text in full, never cut off",
        ]],
        ["Operator controls", [
          "Being Worked: one click bookmarks what you're pursuing. It isn't an outcome, and un-clicking changes nothing",
          "An opportunity is a person's press, never a machine's",
          "Focus Calendar: booked calls and what you're working, on one screen",
        ]],
        ["Robots", [
          "Every repeatable job is registered: what it does, what it never decides, who it hands off to",
          "Before, during and after on one screen, with a Stop switch",
          "None ships without a repeatability test",
          "Workforce map: FIND → REACH → HANDLE → ADVANCE → COMPOUND, read from the scheduler's own run log",
        ]],
        ["Optimization", [
          "Line health and today's capacity before every send",
          "One check says whether your texting keys are live",
          "Machine facts run on their own: no answer, busy, failed, delivered",
          "What a person meant stays with a person",
        ]],
        ["CRM", [
          "Writes to your CRM through one connector: find the record, update fields, add a note",
          "Court updates into your CRM every 15 minutes (New York courts)",
        ]],
      ],
      get: [
        "Your stages, outcomes and suppression rules set up",
        "Inbound sorted and on screen, callbacks on top",
        "Robots switched on, each with its own Stop switch",
        "Your CRM connected",
        "An execution map: what to work today",
      ],
      runs: [
        ["CRM", "Where your team's records live", "Your plan"],
        ["Court-updates inbox", "Court emails read into the CRM", "Your mailbox"],
        ["Texting + voice account", "The lines replies and callbacks run on", "Shared with the Campaign Engine"],
      ],
      need: [
        "The Campaign Engine, or your own texting lines",
        "Your CRM key, if you use a CRM",
        "Who works replies, and who books",
      ],
      live: [
        ["Map your stages", "And who presses what."],
        ["Connect your CRM", "One key."],
        ["Switch on the robots", "Only the ones you need."],
        ["Work the top of the list", "The next one is already there."],
      ],
      faq: [
        ["Does the AI decide who's a deal?", "No. A machine reads facts: a carrier receipt, a filing, a count. What a person meant, and whether to send, stays with a person."],
        ["Which CRM?", "Any CRM that fits one connector shape: find, update, note, tag. One is live today. Others plug into the same shape."],
        ["What does Being Worked do?", "It marks what you're looking at. It writes no outcome and moves no stage."],
        ["Where do I see the robots?", "Mission Control → Robots: what each one will do, is doing and did, and what's waiting for you."],
      ],
      extraForYou: ["Weekly read of what moved: replies, callbacks, booked calls"],
    },
  ];

  const packPage = (p, i) => {
    const next = PACKS[(i + 1) % PACKS.length];
    const lines = p.spec.reduce((n, [, l]) => n + l.length, 0);
    return page({
      file: p.file,
      title: `${p.name} · Build Pack · Nextier Global`,
      description: `${p.name} Build Pack. ${p.line} ${p.about}`,
      cta: "Book a call",
      body: `<section class="hero">
<a class="back" href="build-packs.html">← Build Packs</a>
<div class="kicker">Build Pack ${p.n}${p.tag ? ` · ${esc(p.tag)}` : ""}</div>
<h1>${esc(p.name)}</h1>
<p class="lede">${esc(p.line)}</p>
<p class="about">${esc(p.about)}</p>
<div class="btns">${book("Done with you")}${book("Done for you", "btn")}</div>
</section>

<section class="sec" id="spec">
<h2>What it does</h2>
<p class="sub">${lines} lines, read from the code that runs in Nextier today.</p>
<div class="spec">${p.spec.map(([d, l]) => `<div class="card"><h3><span>${esc(d)}</span><span class="n">${String(l.length).padStart(2, "0")}</span></h3><ul>${l.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>
</section>

<section class="sec">
<div class="grid g2">
  <div class="card"><div class="k">Who it's for</div><p>${esc(p.who)}</p></div>
  <div class="card"><div class="k">The problem</div><p>${esc(p.problem)}</p></div>
</div>
</section>

<section class="sec" id="get">
<h2>What you get</h2>
<ul class="checks">${p.get.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
</section>

<section class="sec" id="runs">
<h2>What it runs on</h2>
<p class="sub">Your own accounts, in your name. You pay each one directly.</p>
<div class="tbl"><table><thead><tr><th>Account</th><th>Does</th><th>Bills</th></tr></thead><tbody>${p.runs.map(([a, d, b]) => `<tr><td><b>${esc(a)}</b></td><td>${esc(d)}</td><td>${esc(b)}</td></tr>`).join("")}</tbody></table></div>
<h3 style="margin-top:26px">What you'll need</h3>
<ul class="checks">${p.need.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
</section>

<section class="sec" id="live">
<h2>How it goes live</h2>
<ol class="steps">${p.live.map(([t, d]) => `<li><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("")}</ol>
</section>

${twoWays(p.extraForYou || [])}

<section class="sec faq" id="faq">
<h2>Questions</h2>
${p.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}
</section>

<section class="sec last">
<a class="card nextpack" href="${next.file}"><div class="k">Next · Build Pack ${next.n}</div><h3>${esc(next.name)} →</h3><p>${esc(next.line)}</p></a>
</section>`,
    });
  };

  // ───────────────────────────── Build Packs, the catalog ─────────────────────────────
  const IN_EVERY_PACK = [
    ["Data recipe", "Where the records come from, tagged at origin."],
    ["Opener library", "The first messages, written for your market."],
    ["Playbook", "What happens after someone replies."],
    ["Execution map", "What to work today."],
  ];
  const catalog = page({
    file: "build-packs.html",
    title: "Build Packs · Nextier Global",
    description: "A working execution system, set up in your own workspace: Data Engine, Campaign Engine, Pipeline Engine.",
    cta: "Book a call",
    body: `<section class="hero">
<h1>Build Packs</h1>
<p class="lede">A working execution system, set up in your own workspace.</p>
<div class="flow" aria-label="Order">${PACKS.map((p) => `<span>${esc(p.name)}</span>`).join("<i>→</i>")}</div>
</section>
<section class="sec">
<div class="grid g3 packs">${PACKS.map((p) => `<a class="card pack" href="${p.file}"><div class="k">Pack ${p.n}</div><h3>${esc(p.name)}</h3>${p.tag ? `<p class="tag">${esc(p.tag)}</p>` : ""}<p>${esc(p.line)}</p><span class="more">See the spec →</span></a>`).join("")}</div>
</section>
<section class="sec">
<h2>Works for</h2>
<p class="sub">The same layers in every vertical. Only the sources inside them change.</p>
<div class="flow"><span>Real Estate</span><span>B2B</span><span class="soon">B2C · soon</span></div>
</section>
<section class="sec">
<h2>In every pack</h2>
<ul class="checks">${IN_EVERY_PACK.map(([b, d]) => `<li><b>${esc(b)}.</b> ${esc(d)}</li>`).join("")}</ul>
</section>
${twoWays()}
<section class="sec last"><div class="btns">${book("Book a call")}<a class="btn" href="plans.html">See the plans</a></div></section>`,
  });

  // ───────────────────────────── Plans (Exa's pricing page, without the numbers) ─────────────────────────────
  const LIMITS = [
    ["GET /leads", "200 leads per page"],
    ["GET /signals/net-new", "5,000 signals per call"],
    ["POST /leads/autotag", "50,000 leads per run without leadIds (default 5,000)"],
    ["POST /push/dialer", "500 rows per call"],
    ["Every call", "Metered on your key"],
  ];
  const plans = page({
    file: "plans.html",
    title: "Plans · Nextier Global",
    description: "Three ways in: an API key, a Build Pack done with you, or done for you and managed. Every plan runs on your own accounts.",
    body: `<section class="hero">
<h1>Plans</h1>
<p class="lede">Three ways in. Every one runs on your own accounts.</p>
</section>
<section class="sec">
<div class="grid g3 plans">
  <div class="card plan"><div class="k">API</div><h3>For your own systems</h3><ul class="checks">
    <li>One key, one workspace</li><li>Read signals, leads and the field registry</li><li>Label, tag and stage work</li><li>${EP.length} endpoints, the SDK and the OpenAPI spec</li><li>Metered per call on your key</li>
  </ul><div class="btns">${book("Request a key")}</div></div>
  <div class="card plan"><div class="k">Done with you</div><h3>A Build Pack, set up with us</h3><ul class="checks">${WITH_YOU.map((l) => `<li>${esc(l)}</li>`).join("")}<li>API key included</li></ul><div class="btns">${book("Book a call")}</div></div>
  <div class="card plan hot"><div class="k">Done for you, then managed</div><h3>We build it, then run it</h3><ul class="checks">${FOR_YOU.map((l) => `<li>${esc(l)}</li>`).join("")}<li>API key included</li></ul><div class="btns">${book("Book a call")}</div></div>
</div>
</section>
<section class="sec">
<h2>Build Packs</h2>
<div class="tbl"><table><thead><tr><th>Pack</th><th>Does</th><th>Ends at</th></tr></thead><tbody>
<tr><td><a href="data-engine.html"><b>Data Engine</b></a></td><td>Territory, signals, owners, phones and emails</td><td>Click to call</td></tr>
<tr><td><a href="campaign-engine.html"><b>Campaign Engine</b></a></td><td>Initial SMS, replies, email, booking</td><td>A booked call</td></tr>
<tr><td><a href="pipeline-engine.html"><b>Pipeline Engine</b></a></td><td>Outcomes, callbacks, robots, CRM</td><td>A person's next call</td></tr>
</tbody></table></div>
</section>
<section class="sec">
<h2>API limits</h2>
<div class="tbl"><table><thead><tr><th>Endpoint</th><th>Per call</th></tr></thead><tbody>${LIMITS.map(([e, l]) => `<tr><td><code>${esc(e)}</code></td><td>${esc(l)}</td></tr>`).join("")}</tbody></table></div>
</section>
<section class="sec last">
<h2>Your accounts</h2>
<p class="sub">Texting and voice lines, skip trace, property data, email and your CRM are opened in your name. You pay each provider directly.</p>
<div class="btns">${book("Book a call")}</div>
</section>`,
  });

  // ───────────────────────────── Docs index (Exa's docs nav) ─────────────────────────────
  const AGENT = [
    `The Data Engine API is served at <code>${esc(BASE)}</code>. Send <code>x-api-key: $NEXTIER_API_KEY</code> or <code>Authorization: Bearer $NEXTIER_API_KEY</code>. One key = one workspace.`,
    `Use the SDK: <a href="sdk/nextier.mjs">nextier.mjs</a> + <a href="sdk/nextier.d.ts">nextier.d.ts</a>. No dependencies.`,
    `Coding agents: load <a href="skill.md">skill.md</a>.`,
    `<a href="openapi.json">openapi.json</a> is the source of truth for request and response schemas.`,
    `Pushes stage work. Nothing texts, calls or emails anyone until a person approves it in nxtier.ai.`,
  ];
  const DOCS = [
    ["Get started", [["quickstart.html", "Quickstart", "Key → signals → labels → a staged block, in five calls."], ["skill.md", "Agent skill", "Drop-in instructions for Claude Code and other coding agents."], ["llms.txt", "llms.txt", "This index, for agents."]]],
    ["API", [["api.html", "API reference", `All ${EP.length} endpoints, with curl and SDK.`], ["best-practices.html", "Best practices", "Smallest useful request, reading responses, common mistakes."], ["openapi.json", "OpenAPI spec", "Every request and response schema."], ["api.html#errors", "Errors and limits", "Status codes and per-call caps."]]],
    ["SDK + MCP", [["sdk.html", "SDK", "Zero-dependency JavaScript client with TypeScript types."], ["mcp.html", "MCP", "Tools for AI assistants (Nextier operators today)."]]],
    ["Build Packs", PACKS.map((p) => [p.file, p.name, p.line])],
    ["Admin", [["plans.html", "Plans", "API, done with you, done for you."]]],
  ];
  const docs = page({
    file: "docs.html",
    title: "Docs · Nextier Global",
    description: "Every Nextier Global page: quickstart, API reference, best practices, OpenAPI spec, SDK, MCP, agent skill, Build Packs.",
    body: `<div class="wrap single">
<article class="doc">
<h1>Docs</h1>
<div class="note b agent"><b>Agent instructions</b><ul>${AGENT.map((l) => `<li>${l}</li>`).join("")}</ul></div>
${DOCS.map(([g, list]) => `<h2>${esc(g)}</h2><div class="grid g2 idx">${list.map(([f, t, d]) => `<a class="card" href="${f}"><h3>${esc(t)}</h3><p>${esc(d)}</p></a>`).join("")}</div>`).join("\n")}
</article></div>`,
  });

  // ───────────────────────────── Quickstart ─────────────────────────────
  const qs = (e) => tabs(e.curl, e.sdk);
  const quickstart = page({
    file: "quickstart.html",
    title: "Quickstart · Nextier Global",
    description: "Get a key, check it, pull net-new signals, label them and stage the first outreach for a person to approve.",
    body: `<div class="wrap docs">
<aside class="toc" aria-label="On this page"><b>Quickstart</b><a href="#key">1 · Get a key</a><a href="#check">2 · Check it</a><a href="#signals">3 · Pull signals</a><a href="#label">4 · Label</a><a href="#stage">5 · Stage</a><a href="#next">Next</a></aside>
<article class="doc">
<span class="status live">v1 · live</span>
<h1>Quickstart</h1>
<p>Five calls, from a key to a staged block a person approves.</p>
<h2 id="key">1 · Get a key</h2>
<p>Keys look like <code>de_live_…</code>. Each one opens one workspace and is shown once. <a href="${BOOK}" target="_blank" rel="noopener">Request a key</a>.</p>
${code(`export NEXTIER_API_KEY="de_live_…"`)}
<h2 id="check">2 · Check it</h2>
${qs(ep("discovery"))}
<h2 id="signals">3 · Pull net-new signals</h2>
<p>What changed in your territory, newest first.</p>
${qs(ep("signals"))}
<h2 id="label">4 · Label them</h2>
<p>Stamp origin and dynamic labels so the next list sorts itself into pursuit levels.</p>
${qs(ep("autotag"))}
<h2 id="stage">5 · Stage the first outreach</h2>
<p>This stages a held block. It sends nothing. A person opens <code>launchUrl</code> and presses Send.</p>
${qs(ep("push-initial-sms"))}
<h2 id="next">Next</h2>
<div class="grid g2 idx"><a class="card" href="best-practices.html"><h3>Best practices</h3><p>Tune requests and avoid the common mistakes.</p></a><a class="card" href="api.html"><h3>API reference</h3><p>Every parameter and response field.</p></a><a class="card" href="skill.md"><h3>Agent skill</h3><p>Hand this to your coding agent.</p></a><a class="card" href="build-packs.html"><h3>Build Packs</h3><p>The whole system, set up for you.</p></a></div>
</article></div>`,
  });

  // ───────────────────────────── Best practices (Exa's Search Best Practices, remixed) ─────────────────────────────
  const MISTAKES = [
    ["POST /leads/score in new code", "POST /leads/autotag. Same rule, same body."],
    ["Setting status, stage or journey through /leads/update", "The disposition flow in nxtier.ai. The API rejects those fields."],
    ["Removing journey or compliance tags with /leads/tag", "Nothing. That endpoint only touches your own tags."],
    ["Retrying a push after a timeout", "Read the launch page or GET /leads first. The SDK never retries a push."],
    ["Expecting /push/initial-sms to send", "It stages a held block. A person presses Send."],
    ["One lead per call", "Batches: 200 leads per page, 500 rows per dialer push."],
    ["A header to switch workspace", "That workspace's own key."],
    ["The key in a browser or a mobile app", "Your server. The key is a secret."],
  ];
  const best = page({
    file: "best-practices.html",
    title: "Best Practices · Nextier Global",
    description: "Start with the smallest useful request, read the response in layers, keep labels aligned, stage instead of send, and avoid the common mistakes.",
    body: `<div class="wrap docs">
<aside class="toc" aria-label="On this page"><b>Best practices</b><a href="#small">Smallest useful request</a><a href="#which">Signals or leads?</a><a href="#layers">Read in layers</a><a href="#labels">Keep labels aligned</a><a href="#stage">Stage, never send</a><a href="#budget">Budget your calls</a><a href="#mistakes">Common mistakes</a><a href="#other">Another endpoint</a></aside>
<article class="doc">
<h1>Best practices</h1>
<p>This assumes you already have a working request. It covers how to make it better.</p>

<h2 id="small">Start with the smallest useful request</h2>
<p>Net-new signals for your workspace, last 30 days by default:</p>
${tabs(`curl "${BASE}/signals/net-new" \\\n  -H "x-api-key: $NEXTIER_API_KEY"`, `const { signals } = await nx.signals.netNew();`)}
<p>Add a parameter only when you need it:</p>
<div class="tbl"><table><thead><tr><th>Parameter</th><th>Add it when</th></tr></thead><tbody>
<tr><td><code>since</code></td><td>You want a window other than the last 30 days</td></tr>
<tr><td><code>family</code></td><td>You work one signal family, such as <code>distress</code></td></tr>
<tr><td><code>limit</code></td><td>You want fewer rows. Up to 5,000</td></tr>
</tbody></table></div>

<h2 id="which">Signals or leads?</h2>
<div class="tbl"><table><thead><tr><th>Need</th><th>Start with</th></tr></thead><tbody>
<tr><td>What changed, and why now</td><td><code>GET /signals/net-new</code></td></tr>
<tr><td>Who to work today</td><td><code>GET /leads?tag=EXECUTION_READY</code></td></tr>
<tr><td>Every lead with a tag, every page</td><td><code>nx.leads.listAll({ tag })</code></td></tr>
<tr><td>What a field means and how often it's re-checked</td><td><code>GET /fields</code></td></tr>
</tbody></table></div>

<h2 id="layers">Read the response in layers</h2>
${code(json({ event_type: "NET_NEW_PRE_FORECLOSURE", field_name: "pre_foreclosure", lead_id: "lead_01J…", detected_at: "2026-10-24T11:02:51.000Z", signal_family: "distress", truth_class: "verified_net_new" }))}
<ul>
<li><b>event_type</b> says what happened. <b>detected_at</b> says when it was found.</li>
<li><b>truth_class</b> <code>verified_net_new</code> means a first detection or a step up the ladder, not an old record seen again.</li>
<li><b>lead_id</b> can be null. Only leads can be labeled or staged, so check it first.</li>
</ul>

<h2 id="labels">Label at origin, then keep labels aligned</h2>
<p>Run <code>mode: "origin"</code> once when leads arrive. After every enrichment, scrub or signal update, run <code>mode: "dynamic"</code>. It re-stamps current-state labels and leaves origin labels alone.</p>
${code(`await nx.leads.autotag({ leadIds: newIds });   // born tagged\nawait nx.leads.autotag({ mode: "dynamic" });   // after every change`)}

<h2 id="stage">Stage, never send</h2>
<p>Push endpoints hand work to people. Each one returns a <code>launchUrl</code> or <code>dialerUrl</code> and counts the leads it skipped. Ineligible leads are skipped, never queued. Show the person the link. Don't report a push as sent.</p>

<h2 id="budget">Budget your calls</h2>
<ul>
<li>Every call is metered on your key. Batch bulk work.</li>
<li><code>listAll</code> pages at 200, the maximum.</li>
<li>Reads are safe to retry with backoff on 429 and 5xx. Pushes are not.</li>
<li>Record the request and the count it returned, so a regression can be reproduced.</li>
</ul>

<h2 id="mistakes">Common mistakes</h2>
<div class="tbl"><table><thead><tr><th>Instead of</th><th>Use</th></tr></thead><tbody>${MISTAKES.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join("")}</tbody></table></div>

<h2 id="other">When to use another endpoint</h2>
<div class="tbl"><table><thead><tr><th>Task</th><th>Use</th></tr></thead><tbody>
<tr><td>Bulk first texts for a block</td><td><code>POST /push/initial-sms</code></td></tr>
<tr><td>Calls worked by your team, by signal</td><td><code>POST /push/contact-center</code></td></tr>
<tr><td>Your own rows onto the power dialer</td><td><code>POST /push/dialer</code></td></tr>
<tr><td>Your own tags on many leads</td><td><code>POST /leads/tag</code></td></tr>
<tr><td>Priority, score, notes or campaign name</td><td><code>POST /leads/update</code></td></tr>
<tr><td>A person asking questions through an AI assistant</td><td><a href="mcp.html">MCP</a></td></tr>
</tbody></table></div>
</article></div>`,
  });

  // ───────────────────────────── OpenAPI 3.1, from the same endpoint list as the API page ─────────────────────────────
  const OPS = { discovery: "info", fields: "fields", signals: "signalsNetNew", leads: "leadsList", autotag: "leadsAutotag", score: "leadsScore", tag: "leadsTag", update: "leadsUpdate", "push-initial-sms": "pushInitialSms", "push-contact-center": "pushContactCenter", "push-dialer": "pushDialer" };
  const schemaOf = (t) => {
    if (t === "integer") return { type: "integer" };
    if (t === "date") return { type: "string", format: "date" };
    if (t === "string[]") return { type: "array", items: { type: "string" } };
    if (t === "object") return { type: "object" };
    if (t.includes("|")) return { type: "string", enum: t.split("|").map((s) => s.trim().replace(/"/g, "")) };
    if (t.endsWith("[]")) return { type: "array", items: { type: "object" } };
    return { type: "string" };
  };
  const paths = {};
  for (const e of EP) {
    const p = e.path || "/";
    const op = {
      operationId: OPS[e.id] || e.id,
      summary: e.title,
      description: e.summary,
      tags: [e.stage || "Start"],
      responses: {
        200: { description: "OK", content: { "application/json": { example: e.res } } },
        401: { description: "Missing, unknown or revoked key", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        ...(e.method === "POST" ? { 400: { description: "Invalid request", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } } } : {}),
      },
    };
    if (e.id === "score") op.deprecated = true;
    if (e.params && e.method === "GET") {
      op.parameters = e.params.map(([n, t, r, d, x]) => ({ name: n, in: "query", required: r === "yes", description: x + (d && d !== "—" ? ` Default: ${d}.` : ""), schema: schemaOf(t) }));
    }
    if (e.method === "POST") {
      const props = {};
      const req = [];
      for (const [n, t, r, d, x] of e.params || []) {
        props[n] = { ...schemaOf(t), description: x + (r === "one of" ? " One of the alternatives is required." : "") + (d && d !== "—" ? ` Default: ${d}.` : "") };
        if (r === "yes") req.push(n);
      }
      op.requestBody = { required: true, content: { "application/json": { schema: { type: "object", properties: props, ...(req.length ? { required: req } : {}) } } } };
    }
    paths[p] = { [e.method.toLowerCase()]: op };
  }
  const openapi = {
    openapi: "3.1.0",
    info: {
      title: "Nextier Data Engine API",
      version: "v1",
      description: "Read-first. Reads are scoped to the key's workspace, writes touch descriptive data only, and pushes stage work for a person to approve in nxtier.ai. Nothing texts, calls or emails anyone from this API.",
    },
    servers: [{ url: BASE }],
    security: [{ apiKey: [] }, { bearer: [] }],
    components: {
      securitySchemes: {
        apiKey: { type: "apiKey", in: "header", name: "x-api-key", description: "Data Engine key, de_live_…. One key = one workspace." },
        bearer: { type: "http", scheme: "bearer", description: "The same key as a Bearer token." },
      },
      schemas: { Error: { type: "object", properties: { error: { type: "string" }, hint: { type: "string" } }, required: ["error"] } },
    },
    paths,
  };

  // ───────────────────────────── skill.md (an agent skill, Exa-style) ─────────────────────────────
  const skill = `---
name: nextier
description: Build with the Nextier Data Engine API. Pull net-new signals, read and label leads, and stage outreach for a person to approve. Use when code or an agent needs Nextier signals, leads, tags or pushes.
---

# Nextier Data Engine

Save this file as \`.claude/skills/nextier/SKILL.md\` in your project, or paste it into your agent's instructions.

## Setup

- Base URL: \`${BASE}\`
- Auth: \`x-api-key: $NEXTIER_API_KEY\` or \`Authorization: Bearer $NEXTIER_API_KEY\`. Keys look like \`de_live_…\`.
- One key = one workspace. No header switches workspaces.
- SDK, no dependencies: \`curl -O ${SITE}/sdk/nextier.mjs\` and \`nextier.d.ts\`.
- Schemas: \`openapi.json\` on this site is the source of truth.

\`\`\`js
import { Nextier } from "./nextier.mjs";
const nx = new Nextier({ apiKey: process.env.NEXTIER_API_KEY });
\`\`\`

## The loop

1. **Detect**: \`nx.signals.netNew({ since })\`. What changed, newest first.
2. **Classify + prioritize**: \`nx.leads.autotag({ leadIds })\` when leads arrive, \`nx.leads.autotag({ mode: "dynamic" })\` after every change.
3. **Pick**: \`nx.leads.listAll({ tag: "EXECUTION_READY" })\`.
4. **Stage**: \`nx.push.initialSms\`, \`nx.push.contactCenter\` or \`nx.push.dialer\`. Show the person the returned URL.

## Rules

- Keep the key on the server. Never in a browser or an app.
- A push stages work. Never tell the user something was sent, texted or called.
- Never retry a push automatically. Read state first.
- Don't set status, stage, journey or compliance fields. The API rejects them.
- \`lead_id\` on a signal can be null. Only leads can be labeled or staged.
- Batch: 200 leads per page, 5,000 signals per call, 500 rows per dialer push.

## Endpoints

| Method | Path | SDK | Does |
|---|---|---|---|
${SDK_METHODS.map(([m, e, d]) => `| ${e.split(" ")[0]} | \`${e.split(" ")[1]}\` | \`${m.split("(")[0]}\` | ${d} |`).join("\n")}

## Errors

Every failure throws \`NextierError\` with \`status\` and \`body\`. 401 = missing, unknown or revoked key (read \`body.hint\`). 400 = invalid request. Reads retry with backoff on 429, 5xx and network errors. Pushes never do.
`;

  // ───────────────────────────── llms.txt (Exa's format, Nextier's pages) ─────────────────────────────
  const L = (f, t, d) => `- [${t}](${f}): ${d}`;
  const llms = `# Nextier Global

> Enterprise Execution Platform. Intelligence, judgment, execution. API, SDK, MCP, Build Packs.

> ## Agent Instructions
> The Nextier Data Engine API is served at ${BASE}. Authenticate with \`x-api-key: $NEXTIER_API_KEY\` (or \`Authorization: Bearer $NEXTIER_API_KEY\`). One key = one workspace; no header switches workspaces. Request a key at ${BOOK}.
> Prefer the SDK: sdk/nextier.mjs with types in sdk/nextier.d.ts. No dependencies; pass \`apiKey\` to \`new Nextier({ apiKey })\`.
> Coding agents can load the Nextier agent skill: skill.md.
> openapi.json is the source of truth for request and response schemas.
> Push endpoints stage work. Nothing texts, calls or emails anyone until a person approves it in nxtier.ai. Never retry a push automatically.

## Get started
${L("docs.html", "Docs", "Every page on this site, grouped.")}
${L("quickstart.html", "Quickstart", "Key → signals → labels → a staged block, in five calls.")}
${L("skill.md", "Agent skill", "Drop-in instructions for Claude Code and other coding agents.")}

## API
${L("api.html", "API reference", `Authentication, errors, limits and all ${EP.length} endpoints with curl and SDK examples.`)}
${L("best-practices.html", "Best practices", "Smallest useful request, reading responses in layers, keeping labels aligned, common mistakes.")}
${EP.map((e) => L(`api.html#${e.id}`, `${e.method} /api/data-engine/v1${e.path || ""}`, e.title + "."))
  .join("\n")}

## SDK and MCP
${L("sdk.html", "SDK", "Zero-dependency JavaScript client with TypeScript types. Node 18+, Deno, Bun, edge.")}
${L("mcp.html", "MCP", `${MCP_TOOLS.flatMap(([, l]) => l).length} tools for AI assistants. Nextier operators today; client access is the next build.`)}

## Build Packs
${L("build-packs.html", "Build Packs", "A working execution system, set up in your own workspace.")}
${PACKS.map((p) => L(p.file, p.name, `${p.line} ${p.about}`)).join("\n")}

## Admin
${L("plans.html", "Plans", "API, done with you, done for you and managed. Every plan runs on your own accounts.")}

## OpenAPI Spec
- [openapi](openapi.json)
`;

  const files = {
    "build-packs.html": catalog,
    "plans.html": plans,
    "docs.html": docs,
    "quickstart.html": quickstart,
    "best-practices.html": best,
  };
  PACKS.forEach((p, i) => (files[p.file] = packPage(p, i)));
  return { files, text: { "llms.txt": llms, "skill.md": skill, "openapi.json": JSON.stringify(openapi, null, 2) + "\n" } };
};
