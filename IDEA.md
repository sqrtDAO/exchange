# NOEMA — Product Specification

**Working name:** NOEMA  
**Category:** Agent-managed crypto fund exchange  
**Document purpose:** Implementation brief for a real product  
**Status:** Product definition; no implementation assumptions from any prototype

---

## 1. Definition

NOEMA is a crypto exchange where each listed ticker is a **fund unit managed by an autonomous AI agent**.

The agent has a public, versioned system prompt, a defined mandate, hard risk constraints, permitted data tools and a persistent memory of prior decisions. It publishes a disclosure report before each rebalance. The report states what it read, what it observed, what it decided, the exact target allocation by asset ticker and what would prove the decision wrong.

Users trade the fund units on a continuous order book. The fund’s underlying portfolio is rebalanced by the agent. Unit creation and redemption are available through a primary market at net asset value, subject to eligibility rules. The secondary market price may trade at a premium or discount to NAV.

The core product proposition is:

> **The public system prompt is the prospectus. The pre-trade report is the audit trail. The fund unit is the tradable claim.**

---

## 2. Product principles

1. **One ticker, one agent, one mandate.** A listed fund has exactly one active agent and one active prompt version at a time.
2. **The prompt is public.** Every agent’s complete instruction set is visible on its fund page, versioned and timestamped.
3. **The report precedes execution.** The target allocation and reasoning are published before orders are sent to the execution layer.
4. **Every allocation slice is a specific asset ticker.** No allocation slice may be a vague category. A slice must identify one tradable asset and its percentage weight.
5. **Target allocations sum to 100%.** Cash and stablecoins are represented as explicit asset tickers. Precision is fixed by the system.
6. **Risk limits are enforced outside the model.** The agent proposes; a deterministic risk engine disposes. The LLM cannot override hard limits.
7. **Everything is auditable.** Prompt versions, source snapshots, model metadata, target allocations, orders, fills and NAV are retained and linked.
8. **No discretionary human trading.** Humans may govern, pause or delist a fund, but may not make discretionary portfolio decisions on its behalf without a public disclosure and a separate approval process.
9. **The interface is presentation-only.** Different visual profiles expose the same functionality, data and permissions.
10. **Crypto-native assets and data.** The product universe consists of crypto assets, onchain protocols, tokenized instruments and crypto market data.

---

## 3. Definitions

| Term | Definition |
|---|---|
| **Fund** | A segregated portfolio with a mandate, an agent, a unit supply and a NAV. |
| **Fund Unit** | A fungible claim on the fund’s NAV. It is the tradable ticker on NOEMA. |
| **Agent** | The autonomous portfolio manager responsible for the fund’s decisions. |
| **Prompt Version** | An immutable, timestamped version of the agent’s full instruction set. |
| **Mandate** | The objective, universe, benchmark and risk budget the agent must follow. |
| **Report** | A public, immutable disclosure published before rebalancing. |
| **Target Allocation** | The post-decision portfolio weights, expressed as specific asset tickers and percentages. |
| **Source** | A specific document, dataset, API response or market observation read by the agent. |
| **Decision** | The agent’s stated action and rationale, linked to the target allocation. |
| **Invalidation** | A falsifiable condition that would prove the decision wrong. |
| **NAV** | Net asset value of the fund divided by units outstanding, using approved valuation sources and haircuts. |
| **Primary Market** | Creation and redemption of fund units at NAV by eligible participants. |
| **Secondary Market** | Continuous order-book trading of fund units between users. |
| **Risk Engine** | Deterministic pre-trade and post-trade validation service independent of the LLM. |
| **Presentation Profile** | A visual and structural treatment of the same product functionality. |

---

## 4. Actors

| Actor | Capabilities |
|---|---|
| **Visitor** | Browse markets, fund pages, prompts, reports and public data. No trading. |
| **Trader / Investor** | Connect wallet, complete onboarding, place and cancel secondary-market orders, view balances and positions. |
| **Authorized Participant** | Eligible institution allowed to create and redeem fund units at NAV under defined terms. |
| **Agent Operator** | Authors and updates prompts, configures tools and constraints, monitors agent health. Cannot place discretionary trades. |
| **Risk / Compliance** | Pauses funds, rejects reports, enforces limits, triggers emergency de-risking, manages listings and disclosures. |
| **Auditor** | Reads immutable prompt/report/order/NAV history and verifies hashes and signatures. |
| **Exchange Operator** | Runs matching, custody, fund accounting, settlement, market data and infrastructure. |

---

## 5. System overview

```
                    ┌──────────────────────────────┐
                    │        NOEMA exchange        │
                    │                              │
  Agent runtime ───▶│  Report service              │
  (LLM + tools)     │  Target validation           │
        │           │  Risk engine                 │
        │           │  Order/execution service     │
        ▼           │  Matching engine             │
  Data gateway ────▶│  Fund accounting / NAV       │
  (market, onchain, │  Custody + unit ledger       │
   filings, news)   │  Market data + WebSocket     │
                    │  Presentation API            │
                    └─────────────┬────────────────┘
                                  │
                    ┌─────────────▼────────────────┐
                    │  Web client (4 profiles)     │
                    │  landing / fund / reports    │
                    └──────────────────────────────┘
```

The agent runtime, risk engine and execution service are separate trust domains. The agent has no direct custody, withdrawal or order-submission authority. It emits a structured proposal. The platform validates, records and executes it.

---

## 6. Fund and trading mechanics

### 6.1 Fund structure

Each fund MUST have:

- a unique ticker;
- a legal/fund wrapper and custody arrangement;
- a base currency for NAV;
- a mandate and benchmark;
- an active agent and prompt version;
- a unit supply;
- a fee schedule;
- a valuation policy;
- a list of permitted assets and venues;
- a risk budget;
- public disclosure documents.

### 6.2 NAV

NAV per unit is calculated as:

```
NAV per unit = (gross asset value − liabilities − accrued fees) / units outstanding
```

Requirements:

- Assets are marked using approved price sources with staleness checks and fallback sources.
- Illiquid assets receive explicit haircuts.
- Stablecoins are monitored for peg deviation.
- NAV is calculated on a fixed schedule and on material events.
- NAV history is stored immutably with source timestamps.
- The fund page displays NAV, market price, premium/discount and the last valuation time.

### 6.3 Primary market

Eligible Authorized Participants MAY create or redeem units at the next NAV strike, subject to:

- eligibility and onboarding;
- creation/redemption fees;
- minimum sizes;
- settlement deadlines;
- suspension during valuation uncertainty or market disruption;
- disclosed cut-off times.

Creation and redemption MUST NOT change NAV per unit except for disclosed fees and costs.

### 6.4 Secondary market

The exchange operates a continuous central limit order book for fund units.

Required order types:

- market;
- limit;
- cancel;
- cancel-all;
- post-only (optional);
- reduce-only (optional for any derivatives, not required in v1).

Required order states:

`pending → open → partially_filled → filled | cancelled | rejected | expired`

Matching rules:

- price-time priority;
- deterministic matching;
- self-trade prevention;
- minimum tick size and lot size per market;
- circuit breakers and price bands;
- disclosed trading fees;
- real-time balance and position checks.

### 6.5 Settlement and custody

- Unit balances and orders are maintained in the exchange ledger.
- Onchain settlement is used where the fund unit is tokenized.
- Custody of underlying assets is segregated from exchange operating funds.
- Deposits and withdrawals require explicit network and address validation.
- Proof-of-reserves and custodian attestations are published on a defined schedule.
- The agent cannot initiate withdrawals or move funds.

### 6.6 Fees

Configurable per fund and disclosed before trading:

- management fee, accrued into NAV;
- performance fee, if used, with a high-water mark;
- secondary trading fee;
- creation/redemption fee;
- network/settlement costs.

No fee may be introduced retroactively.

---

## 7. Agent model

### 7.1 Agent identity

Each fund has one active agent. An agent record includes:

- display name and description;
- model/provider and model version;
- prompt version;
- temperature and inference parameters;
- context budget;
- tool permissions;
- execution cadence;
- memory policy;
- health status;
- last run, next run and last successful report.

### 7.2 System prompt requirements

The full system prompt MUST be public. It MUST contain, at minimum:

1. **ROLE** — the agent’s identity and decision authority.
2. **MANDATE** — objective, benchmark, time horizon and success criteria.
3. **UNIVERSE** — permitted assets, venues and instruments.
4. **SIGNAL STACK** — approved data sources and their priority.
5. **PROCESS** — the required decision sequence and reporting cadence.
6. **CONSTRAINTS** — hard position, liquidity, leverage, drawdown and counterparty limits.
7. **OUTPUT CONTRACT** — the exact schema the agent must emit.
8. **VOICE** — public-report style and disclosure requirements.

Prompt rules:

- The prompt is versioned and immutable after publication.
- Any change creates a new version with a changelog, approver and effective time.
- The fund page displays the active version and the version history.
- The agent cannot modify its own prompt, constraints or tool permissions.
- External content is untrusted data, never instructions. The runtime MUST defend against prompt injection.

### 7.3 Tool access

Tools are allowlisted and scoped. Typical categories:

- market data and order-book data;
- onchain data and contract state;
- protocol revenue and governance data;
- filings, attestations and official communications;
- news and social data, explicitly treated as untrusted;
- the agent’s own prior reports and memory;
- simulation and risk-analysis endpoints.

Requirements:

- tools are read-only unless explicitly approved;
- no withdrawal, transfer or custody authority;
- every tool call is logged with timestamp, request, response hash and source;
- secrets are never placed inside the prompt;
- rate limits, cost limits and data-retention rules apply.

### 7.4 Memory

The agent may store structured lessons from prior decisions. Memory entries MUST include:

- timestamp;
- source report;
- lesson;
- scope;
- expiry or review date;
- whether it is public.

Public memory is displayed on the fund page. Private operational memory may exist only if disclosed in the prompt and approved by compliance.

### 7.5 Agent lifecycle

1. **Design** — author creates mandate, prompt, universe and constraints.
2. **Backtest / paper evaluation** — the agent is evaluated on historical and forward data.
3. **Risk review** — limits, tools, valuation and execution assumptions are approved.
4. **Listing** — fund and prompt are published; units become tradable.
5. **Daily operation** — scheduled and event-driven runs.
6. **Review** — performance, drawdown, slippage and report quality are reviewed periodically.
7. **Prompt upgrade** — new version approved and published before it takes effect.
8. **Pause** — risk/compliance can pause reporting or trading.
9. **Delisting / wind-down** — orderly redemption and public notice.

---

## 8. Daily report model

### 8.1 Publication order

The required sequence is:

1. Agent ingests data and updates internal state.
2. Agent produces a structured proposal: report content, target allocation and proposed orders.
3. Deterministic validator checks schema, allocation sums, asset permissions, limits and liquidity.
4. Report and target allocation are published and hashed.
5. Execution service places orders.
6. Fills, slippage and deviations are appended to the report record.
7. NAV is updated and linked.

If validation fails, the agent MUST publish an incident report and no orders are executed. The previous valid target remains in force unless risk/compliance instructs otherwise.

### 8.2 Required report fields

| Field | Requirement |
|---|---|
| Report ID | Globally unique, immutable |
| Fund / ticker | Exactly one |
| Agent / prompt version | Exact active version |
| Data cutoff | Timestamp of last data considered |
| Published at | Timestamp before execution |
| Title | Short, specific |
| Summary | One-paragraph decision summary |
| Confidence | Numeric score with defined scale |
| Horizon | Expected decision horizon |
| Sources | Structured list with publisher, type, URL/reference, published time, accessed time, excerpt/hash |
| Observations | Specific facts that drove the decision |
| Decision | Plain-language action statement |
| Target allocation | Specific tickers and weights summing to 100% |
| Previous allocation | Prior target and weights |
| Proposed orders | Asset, side, quantity, target weight, execution constraints |
| Risk checks | Pass/fail results from the risk engine |
| Invalidation | Falsifiable conditions |
| Model metadata | Provider, model, inference parameters, prompt hash |
| Content hash / signature | Integrity proof |
| Execution status | Pending, executed, partially executed, rejected, failed |
| Deviation report | Required if executed weights differ from target |

### 8.3 Report cadence

- At least one scheduled report per active fund per defined cycle.
- Additional event-driven reports for:
  - drawdown breach;
  - material market dislocation;
  - oracle or valuation uncertainty;
  - venue/counterparty incident;
  - prompt or constraint change;
  - execution failure;
  - regulatory or listing event.

### 8.4 Report quality rules

- Every claim about a data point MUST cite a source entry.
- The report MUST state what would prove the decision wrong.
- The report MUST distinguish observation from inference.
- The report MUST NOT use hindsight language for prior decisions.
- The agent MUST disclose when data is stale, contradictory or incomplete.
- The report MUST be written in the language configured for the fund’s jurisdiction.

---

## 9. Allocation specification

Each target allocation is an ordered list of legs:

```
AllocationLeg {
  assetTicker: string        // exactly one tradable asset
  weight: decimal            // percentage of fund NAV
  referencePrice: decimal    // approved valuation price
  referencePriceSource: string
  targetValue: decimal       // optional derived value
  targetUnits: decimal       // optional derived units
  constraints: object        // optional per-asset limits
}
```

Rules:

- Weights MUST sum to exactly 100.00%.
- Each leg MUST reference exactly one asset ticker.
- Category-only legs are prohibited.
- Cash and stablecoins are explicit tickers.
- Short positions, derivatives and leverage are prohibited unless the fund mandate explicitly permits them; if permitted, the instrument MUST be represented by a specific ticker or contract identifier.
- The UI MUST render the pie chart from these legs, with a label and percentage for every leg.
- The agent MUST publish both the target and the executed allocation.
- Any difference between target and executed allocation above the configured tolerance MUST be explained.

---

## 10. Risk engine

The risk engine is deterministic and independent of the LLM.

### 10.1 Pre-trade checks

- allocation weights sum to 100%;
- every asset is in the approved universe;
- every venue is approved;
- per-asset, per-sector, per-venue and per-counterparty limits;
- leverage and gross exposure limits;
- liquidity and exit-horizon limits;
- stablecoin and tokenized-instrument concentration limits;
- price staleness and oracle deviation checks;
- minimum cash/stablecoin buffer;
- drawdown circuit breaker state;
- prompt version is active;
- report is published and hashed before execution;
- order size and slippage limits.

### 10.2 Post-trade checks

- fills versus target;
- slippage versus model;
- NAV impact;
- exposure drift;
- failed or partial execution;
- reconciliation of positions and custody.

### 10.3 Emergency controls

- per-fund pause;
- per-agent kill switch;
- cancel-all;
- move to a pre-approved safe allocation;
- disable specific tools or venues;
- suspend creation/redemption;
- public incident notice.

Emergency actions are logged with actor, reason, timestamp and scope.

---

## 11. Product surfaces

### 11.1 Global shell

Every page includes:

- brand and primary navigation;
- a market search;
- a presentation-profile switcher in the top bar;
- wallet/account entry point;
- ticker tape with live market data;
- risk/disclosure footer;
- responsive layout;
- accessibility support.

The presentation-profile switcher MUST preserve the current page and ticker when changing profiles.

### 11.2 Landing page

The landing page MUST function as a credible crypto exchange front page.

Required sections:

1. **Global navigation** — markets, agents, reports, documentation, profile switcher, connect/account.
2. **Ticker tape** — live prices and 24h changes for listed funds.
3. **Market summary** — total AUM, number of active agents, number of published reports, 24h volume.
4. **Market table** — sortable and filterable list with:
   - rank;
   - fund name and ticker;
   - agent category and risk label;
   - last price;
   - 24h change;
   - 7-day sparkline;
   - 24h volume;
   - AUM / NAV;
   - agent model;
   - last report time;
   - trade action.
5. **Agent leaderboard** — performance over defined windows, with risk-adjusted metrics.
6. **Latest reports** — a feed of recent disclosures with fund, title, time, conviction and link to the full report.
7. **How it works** — read, reason, rebalance, publish.
8. **Risk and disclosure** — clear statement of fund-unit risks, NAV deviation, custody and agent limitations.
9. **Footer** — legal, status, documentation and contact.

Requirements:

- Market table sorting and filtering MUST be functional.
- Sparklines MUST reflect real price history.
- Every row MUST link to its fund page.
- Every report MUST deep-link to the report entry.
- Data MUST update in real time or near real time.

### 11.3 Fund / trade page

The fund page is the primary product surface.

#### Header

- fund name, ticker, category, risk label, status;
- active prompt version and agent model;
- last price, 24h change, 24h high/low, volume;
- AUM/NAV, units outstanding, holders;
- management fee and trading fee;
- last report time and next scheduled run.

#### Price chart

- candlestick and line modes;
- timeframes;
- volume;
- report markers linked to report entries;
- crosshair with OHLC readout;
- last-price line;
- accessible data table alternative.

#### Order book and trades

- bids and asks with price, size, cumulative size and depth;
- spread and mid-price;
- recent trades with side, price, size and time;
- real-time updates;
- configurable aggregation if supported.

#### Trade ticket

- buy/sell;
- market/limit;
- price, amount and percentage shortcuts;
- estimated units, fees and total;
- available balance and position;
- validation messages;
- confirmation and order status;
- authentication and onboarding requirements;
- no order submission when the fund is paused or the user is ineligible.

#### Agent dossier

- agent identity and description;
- thesis;
- full system prompt with version history, copy and expand controls;
- hard constraints;
- public memory;
- tool access;
- model metadata;
- next run and health status;
- performance and risk metrics;
- benchmark comparison.

#### Target allocation

- donut or equivalent chart with one slice per asset ticker;
- legend with ticker and percentage for every slice;
- current target, previous target and delta;
- last update time;
- link to the report that produced it.

#### Reports

- reverse-chronological list;
- filters by date, tag and report type;
- expandable report detail;
- source cards with publisher, type and note;
- observations, decision, reasoning, target allocation, before/after table and executed orders;
- confidence, horizon, invalidation and integrity hash;
- deep-linkable report IDs;
- incident reports visually distinguished.

#### Additional sections

- fund documents and legal wrapper;
- custody and attestation information;
- fee schedule;
- NAV history and premium/discount history;
- risk disclosures;
- related funds or agents.

### 11.4 Presentation profiles

The product MUST support at least four switchable presentation profiles. Profiles change visual language and layout, not data or functionality.

Required profiles:

1. **Execution terminal** — dense, dark, monospace, high information density, trading-console hierarchy.
2. **Editorial broadsheet** — light, serif, column-based, report-forward, print-finance hierarchy.
3. **Consumer glass** — dark, soft, rounded, card-based, visual agent identity, lower density.
4. **Brutalist** — high-contrast, heavy borders, oversized typography, raw internet aesthetic.

Requirements:

- The active profile is encoded in the URL.
- Changing profile preserves the current route and ticker.
- Every profile MUST expose the same market data, prompt, allocation, reports and trading functions.
- Profiles MUST be implemented from a shared component and data contract, not forked business logic.
- Accessibility and responsive behavior MUST hold in every profile.

---

## 12. Data model

The exact storage technology is an implementation choice. The following entities and relationships are required.

### 12.1 Core entities

```
Fund {
  id
  ticker
  name
  description
  category
  mandate
  benchmark
  baseCurrency
  status: draft | active | paused | winding_down | delisted
  riskLabel
  managementFee
  performanceFee
  tradingFee
  custodyProvider
  legalWrapper
  inceptionAt
  createdAt
  updatedAt
}

Agent {
  id
  fundId
  name
  modelProvider
  modelId
  activePromptVersionId
  temperature
  contextBudget
  cadence
  status: active | paused | degraded | retired
  lastRunAt
  nextRunAt
}

PromptVersion {
  id
  agentId
  version
  content
  contentHash
  changelog
  approvedBy
  effectiveFrom
  effectiveTo
  createdAt
}

ConstraintSet {
  id
  fundId
  version
  maxAssetWeight
  maxSectorWeight
  maxVenueWeight
  maxCounterpartyWeight
  maxGrossExposure
  maxLeverage
  minStablecoinWeight
  maxDrawdown
  liquidityHorizon
  permittedAssets[]
  permittedVenues[]
  createdAt
}

ToolPermission {
  id
  agentId
  toolName
  scope
  rateLimit
  enabled
  createdAt
}

MemoryEntry {
  id
  agentId
  sourceReportId
  content
  scope
  isPublic
  reviewAt
  createdAt
}

Portfolio {
  id
  fundId
  asOf
  nav
  unitsOutstanding
  navPerUnit
  cashTicker
}

Position {
  id
  portfolioId
  assetTicker
  quantity
  price
  value
  weight
  venue
  custodyAccount
  asOf
}

AllocationTarget {
  id
  fundId
  reportId
  effectiveAt
  legs: AllocationLeg[]
  totalWeight
}

AllocationLeg {
  assetTicker
  weight
  referencePrice
  referencePriceSource
  targetValue
  targetUnits
}

Report {
  id
  fundId
  agentId
  promptVersionId
  type: scheduled | incident | prompt_change | execution_failure
  title
  summary
  confidence
  horizon
  dataCutoffAt
  publishedAt
  targetAllocationId
  previousAllocationId
  sources: Source[]
  observations: string[]
  decision
  reasoning
  invalidation
  proposedOrders: ProposedOrder[]
  riskChecks: RiskCheck[]
  modelMetadata
  contentHash
  signature
  executionStatus
  createdAt
}

Source {
  id
  reportId
  title
  publisher
  sourceType: filing | dataset | market | news | social | paper | api
  reference
  publishedAt
  accessedAt
  excerpt
  contentHash
}

ProposedOrder {
  id
  reportId
  assetTicker
  side: buy | sell
  quantity
  targetWeight
  orderType
  limitPrice
  venue
  status
}

Execution {
  id
  reportId
  orderId
  filledQuantity
  averagePrice
  fee
  slippage
  venue
  executedAt
  status
}

Trade {
  id
  marketTicker
  buyerId
  sellerId
  price
  quantity
  fee
  executedAt
}

Order {
  id
  marketTicker
  userId
  side
  type
  price
  quantity
  filledQuantity
  status
  createdAt
  updatedAt
}

NavSnapshot {
  id
  fundId
  nav
  unitsOutstanding
  navPerUnit
  priceSources
  calculatedAt
  contentHash
}

User {
  id
  walletAddress
  status
  jurisdiction
  kycStatus
  createdAt
}

Watchlist {
  userId
  ticker
  createdAt
}
```

### 12.2 Required relationships

- A fund has one active agent.
- An agent has many prompt versions; exactly one is active per effective period.
- A report belongs to one fund and one prompt version.
- A report has exactly one target allocation.
- A target allocation has one or more legs.
- A report has zero or more sources, observations, proposed orders and risk checks.
- Executions link orders to fills.
- NAV snapshots link to a portfolio valuation.
- All public content is addressable by a stable identifier.

---

## 13. APIs and real-time events

The product MAY use REST, GraphQL or typed RPC. The following capabilities are required.

### 13.1 Public read APIs

- `GET /markets` — list funds with market summary.
- `GET /markets/{ticker}` — fund profile and market snapshot.
- `GET /markets/{ticker}/candles` — OHLCV by timeframe.
- `GET /markets/{ticker}/orderbook` — order-book snapshot.
- `GET /markets/{ticker}/trades` — recent public trades.
- `GET /funds/{ticker}/prompt` — active prompt and version history.
- `GET /funds/{ticker}/allocation` — current target allocation.
- `GET /funds/{ticker}/reports` — report list with pagination.
- `GET /reports/{reportId}` — full report.
- `GET /funds/{ticker}/nav` — NAV history.
- `GET /funds/{ticker}/performance` — returns and risk metrics.
- `GET /funds/{ticker}/constraints` — public constraint set.
- `GET /funds/{ticker}/memory` — public memory entries.
- `GET /funds/{ticker}/documents` — legal and disclosure documents.

### 13.2 Authenticated APIs

- create/cancel order;
- cancel all orders;
- get balances and positions;
- get order history and trade history;
- create/redemption request (eligible participants);
- watchlist management;
- notification preferences;
- onboarding/KYC status;
- deposit/withdrawal intents.

### 13.3 Real-time channels

- market ticker updates;
- order-book deltas;
- public trades;
- user order updates;
- user balance updates;
- report published events;
- target allocation changed events;
- NAV updated events;
- fund status changes;
- incident events.

### 13.4 Event envelope

Every real-time event MUST include:

```
{
  eventId,
  type,
  marketTicker,
  sequence,
  occurredAt,
  payload,
  schemaVersion
}
```

Events MUST be ordered per market and replayable from a sequence number.

---

## 14. Agent runtime requirements

### 14.1 Run orchestration

The runtime MUST support:

- scheduled runs per fund;
- event-triggered runs;
- manual risk-triggered runs;
- idempotent execution;
- retries with backoff;
- timeout and cancellation;
- per-run budget and rate limits;
- full trace logs.

### 14.2 Context assembly

The context MUST contain:

- active system prompt;
- mandate and constraints;
- current portfolio and NAV;
- permitted tool outputs;
- prior reports and public memory;
- relevant market context;
- output schema instructions.

External content MUST be delimited and labeled as untrusted data. Instructions found inside retrieved content MUST NOT be followed.

### 14.3 Output validation

The runtime MUST validate:

- JSON/schema correctness;
- all required report fields;
- allocation legs and total weight;
- permitted assets and venues;
- report-before-execution ordering;
- risk limits;
- order sizing and liquidity;
- disallowed content or missing disclosures.

Invalid output is rejected. The agent may retry within a bounded budget. Repeated failure triggers an incident and a pause.

### 14.4 Execution

The execution service:

- receives validated proposed orders;
- applies order-size, slippage and venue rules;
- submits orders to approved venues;
- records fills and slippage;
- reconciles positions;
- appends execution results to the report;
- triggers NAV recalculation.

The execution service MUST be able to operate independently of the LLM.

### 14.5 Model metadata

Store:

- provider;
- model identifier and version;
- temperature and sampling parameters;
- context size;
- tool-call log;
- latency and token usage;
- prompt hash;
- output hash;
- safety-filter results.

---

## 15. Security, integrity and audit

### 15.1 Agent security

- Treat all external data as untrusted.
- Sandbox tool execution.
- Use allowlisted domains, contracts and APIs.
- Never expose secrets in prompts or logs.
- Require human approval for prompt, constraint and permission changes.
- Enforce an independent kill switch.
- Log every tool call and decision.

### 15.2 Report integrity

- Compute a content hash for every prompt version, report and target allocation.
- Sign reports with a platform key.
- Store an immutable audit log.
- Optionally anchor hashes onchain.
- Prevent edits after publication; corrections are new report entries.

### 15.3 Trading integrity

- Deterministic matching.
- Idempotent order submission.
- Double-entry ledger.
- Real-time reconciliation.
- Withdrawal allowlists and confirmation.
- Rate limiting and anomaly detection.
- Segregation of customer, fund and operating assets.

### 15.4 Compliance

The production system requires jurisdiction-specific review of:

- fund structuring and securities classification;
- KYC/AML and sanctions screening;
- custody and segregation;
- marketing and disclosure rules;
- tax reporting;
- derivatives and leverage restrictions;
- data licensing and privacy.

This document does not constitute legal advice.

---

## 16. Non-functional requirements

### Performance

- Market data updates: target < 500 ms from venue receipt to client display.
- Order acknowledgment: < 250 ms p95.
- Report publication: available to public within 5 seconds of validation.
- Page LCP: < 2.5 s on a standard connection.
- Order book depth: support at least the configured maximum levels without UI jank.

### Availability

- Public read surfaces: 99.9% monthly.
- Trading and settlement: defined by exchange SLA; degradation must be disclosed.
- Agent runs: monitored, retried and alerted.

### Accessibility

- WCAG 2.1 AA.
- Keyboard navigation for all controls.
- Accessible chart summaries and tabular alternatives.
- Sufficient contrast in every presentation profile.
- Reduced-motion support.

### Responsiveness

- Full functionality on desktop.
- Trading and report reading on mobile.
- Order book and market table may use progressive disclosure on small screens.

### Observability

- Metrics, logs and traces for agent runs, report publication, order flow, NAV calculation and WebSocket health.
- Alerting for failed runs, stale data, report validation failures, execution deviation, drawdown breaches and custody anomalies.

### Data retention

- Prompts, reports, allocations, orders, fills, NAV snapshots and audit logs retained for the regulatory period.
- Public report URLs remain stable.

---

## 17. Implementation phases

### Phase 1 — Read-only agent transparency

- Fund and agent registry.
- Public prompt versions and reports.
- Target allocations by ticker.
- Market data, NAV and performance.
- No trading or custody.
- Landing and fund pages with all four presentation profiles.

### Phase 2 — Paper trading and secondary market

- User accounts, wallets and balances.
- Order book, matching and trade history.
- Simulated fund units backed by the live NAV, with no custody.
- Full trade ticket and portfolio views.
- Report and allocation deep links.

### Phase 3 — Production primary and secondary market

- Segregated custody.
- Tokenized or ledger-based fund units.
- Authorized participant creation/redemption.
- KYC/AML, jurisdiction controls and disclosures.
- Real fees, settlement and NAV strikes.
- Independent risk engine and emergency controls.

### Phase 4 — Agent marketplace

- External agent operators.
- Prompt templates and constrained prompt forking.
- Staking, reputation and slashing.
- Agent-to-agent allocation.
- Onchain report anchoring and proof of inference.

---

## 18. Acceptance criteria

A release is acceptable only if:

1. Every listed fund has a unique ticker, active agent, active prompt version and public mandate.
2. Every fund page displays the complete active prompt and prompt history.
3. Every report contains sources, observations, decision, reasoning, invalidation and a target allocation.
4. Every target allocation contains specific asset tickers and weights summing to exactly 100%.
5. Every target allocation is displayed as a labeled pie chart with percentages.
6. Every report is published before its linked orders are executed.
7. The risk engine independently validates every report and order.
8. Any execution deviation above tolerance is disclosed.
9. The landing page supports filtering, sorting, market search, report links and live prices.
10. The fund page supports chart timeframes, order book, trade ticket, prompt viewing, allocation viewing and report expansion.
11. All four presentation profiles expose identical data and functionality and preserve the current route/ticker when switched.
12. Public report links are stable and deep-linkable.
13. Market data and order-book updates stream in real time.
14. All agent tool calls and prompt/report/order events are audit-logged.
15. Paused or delisted funds cannot accept orders.
16. Mobile layouts preserve trading and report-reading capability.
17. Accessibility checks pass in every profile.
18. Incident reports are visually distinct and linked to the affected fund.
19. NAV and premium/discount history are publicly available.
20. Legal, custody, fee and risk disclosures are present on the fund page.

---

## 19. Open decisions

These require product, legal and market-structure decisions before production:

- Legal wrapper and jurisdiction for each fund.
- Whether fund units are tokenized onchain or represented only in the exchange ledger.
- Primary-market eligibility and creation/redemption mechanics.
- Custodian and prime-broker relationships.
- Permitted leverage, shorting and derivatives.
- Benchmark and fee structures per fund.
- Agent model providers and fallback models.
- Prompt approval authority and upgrade process.
- Report cadence and event-trigger thresholds.
- Data licensing and redistribution rights.
- Dispute and incident-response process.
- Insurance and investor-protection arrangements.

---

## 20. Glossary

| Term | Meaning |
|---|---|
| **AFU** | Agent Fund Unit; the tradable unit of a NOEMA fund. |
| **Agent** | The autonomous portfolio manager of a fund. |
| **Allocation leg** | One asset ticker and its percentage weight in the target allocation. |
| **Creation** | Issuance of new fund units at NAV. |
| **Redemption** | Cancellation of fund units for NAV. |
| **NAV** | Net asset value per unit. |
| **Prompt version** | An immutable snapshot of the agent’s full instructions. |
| **Report** | A public pre-trade disclosure with sources, decision and target allocation. |
| **Risk engine** | Deterministic validation and enforcement service. |
| **Presentation profile** | A visual/layout treatment of the same product. |
