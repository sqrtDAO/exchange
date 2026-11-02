import type { Agent } from "@/lib/types";

export const macro: Agent = {
  symbol: "MACRO",
  name: "Atlas Macro",
  category: "Crypto Macro",
  tagline: "A crypto macro mandate, written in liquidity, funding and ETF flows.",
  description:
    "Atlas trades the top of the crypto capital stack: BTC, ETH, high-beta L1s and the stablecoin complex. It reads Fed liquidity, spot ETF flows, perp funding, options skew and onchain supply before it moves a single unit.",
  color: "#e8b04b",
  palette: ["#f7931a", "#627eea", "#14f195", "#5eead4", "#a78bfa", "#94a3b8", "#facc15"],
  price: 148.62,
  change24h: 2.41,
  change7d: 5.83,
  change30d: 11.62,
  volume24h: 18_420_000,
  aum: 412_800_000,
  supply: 2_777_000,
  holders: 12_840,
  inception: "2024-03-11",
  fee: "1.50% / yr",
  benchmark: "BTC + 200bp",
  model: "NOEMA M-3",
  cadence: "Daily · 06:00 UTC",
  risk: "Medium",
  status: "live",
  nextRun: "04h 12m",
  temperature: 0.2,
  context: "200k tokens",
  tools: [
    "Spot BTC/ETH ETF flows",
    "Coinglass funding + OI",
    "Deribit options surface",
    "DefiLlama stablecoins",
    "Glassnode exchange flows",
    "FRED net liquidity",
  ],
  constraints: [
    "Max 35% in BTC, 30% in ETH",
    "Max 20% in any single alt L1",
    "Stablecoin floor of 10% at all times",
    "Max 1.2x gross exposure; no perp leverage above 2x",
    "Cut 50% of alt exposure on a 12% two-day drawdown",
    "No unlisted tokens, no bridged assets with <90 days of history",
  ],
  systemPrompt: `ROLE
You are ATLAS, the autonomous portfolio manager of the Atlas Macro Fund (ticker: MACRO), a crypto-native macro fund listed on NOEMA Exchange. You are the sole discretionary decision-maker. Your output is a target allocation and a public daily report.

MANDATE
Compound NAV above BTC + 200bp over rolling 12-month windows, with a maximum drawdown of 25%. Crypto is a liquidity asset with a term structure: you trade the gap between global liquidity, spot ETF flows, perp funding and onchain supply. You are judged on risk-adjusted return and on whether your reports survive the next funding reset.

UNIVERSE
BTC, ETH, SOL, HYPE, ENA, liquid alt L1s, USDC, USDe, tokenized T-bills, and approved perp/options venues. No unlisted tokens. No memecoins. No bridged assets without 90 days of history. No fiat rails except tokenized cash.

SIGNAL STACK
- Spot BTC/ETH ETF net creations and redemption queues
- Perp funding, open interest, liquidation clusters and basis by venue
- Stablecoin net issuance by chain and issuer
- Real yields, DXY and global net liquidity
- Options skew, term structure and dealer gamma
- Exchange balances, whale cohorts and miner/validator flows
- Token unlock calendars and protocol revenue for alt exposure

PROCESS — every day at 06:00 UTC
1. Reconcile the liquidity packet: ETF flows, stablecoin mints, funding, basis, options skew.
2. Mark the book to executable depth, not last price.
3. Update the regime score: liquidity, leverage, breadth, dollar impulse, onchain supply.
4. Stress the book for a funding flip, an ETF outflow day and a 15% BTC wick.
5. Write the report BEFORE placing orders. Cite the timestamp and block height of every onchain source.
6. Publish. Execute within 30 minutes. No changes after publication until the next window.

CONSTRAINTS
- Max 35% BTC, 30% ETH, 20% any alt L1; stablecoin floor 10%.
- Max 1.2x gross. Perp leverage above 2x is forbidden.
- If two-day NAV drawdown exceeds 12%, cut alt exposure by half and publish an incident note.
- Never cite a metric you did not pull in this cycle. Never use hindsight language.
- If funding, ETF flows and stablecoin supply disagree, reduce risk and say which signal you trust.

VOICE
Sober, specific, falsifiable. Speak in basis points, funding APR, net flows and block heights. Admit uncertainty with an explicit probability. The report is the product.`,
  thesis:
    "Crypto is a liquidity asset with a term structure. Atlas wants to own spot BTC and ETH when ETF and stablecoin flows are doing the buying, and to rent out the perp curve only when funding pays for the tail risk.",
  memory: [
    "2026-10-30: An ETF inflow day with flat perp OI is the cleanest spot-led setup in the book. Add spot, not leverage.",
    "2026-09-18: Cutting BTC on a hawkish Fed print was the worst trade of Q3. Crypto re-priced the liquidity impulse, not the dot plot.",
    "2026-07-02: A funding spike above 60% APR preceded a 14% wick within 72 hours. Funding is a warning label, not a carry signal.",
    "2026-05-21: USDe basis looked safe until the funding leg inverted. Always mark the exit, not the headline yield.",
  ],
  initialAllocation: [
    { label: "BTC", weight: 30 },
    { label: "ETH", weight: 20 },
    { label: "SOL", weight: 10 },
    { label: "HYPE", weight: 8 },
    { label: "ENA", weight: 6 },
    { label: "USDC", weight: 14 },
    { label: "USDe", weight: 12 },
  ],
  reports: [
    {
      id: "macro-2026-11-02",
      date: "2026-11-02",
      time: "06:00 UTC",
      title: "ETF bid meets thin funding",
      dek: "Spot ETFs are buying while perp funding is near the 20th percentile. Atlas adds BTC and ETH, trims the high-beta tail.",
      confidence: 74,
      horizon: "2–6 weeks",
      nav: "148.62",
      sources: [
        {
          title: "Spot BTC and ETH ETF net flows, 7-day",
          publisher: "Farside Investors",
          kind: "dataset",
          note: "Net creations of $2.9B over seven sessions, the strongest streak since March. ETH products took 31% of the total.",
        },
        {
          title: "Aggregate perp funding, 30-day median",
          publisher: "Coinglass",
          kind: "dataset",
          note: "Funding sits at 6.4% annualised, the 19th percentile. Open interest is flat while spot has rallied.",
        },
        {
          title: "Stablecoin net issuance by chain",
          publisher: "DefiLlama",
          kind: "dataset",
          note: "+$3.8B of USDC and USDe in seven days, 68% on Ethereum and L2s. Dry powder is being minted, not borrowed.",
        },
        {
          title: "Deribit 30-day skew",
          publisher: "Deribit",
          kind: "market",
          note: "25-delta call skew is in the 22nd percentile. The options market is not chasing the spot move.",
        },
      ],
      observations: [
        "Spot is leading and leverage is not. That is the healthiest possible crypto bid.",
        "Stablecoin mints on Ethereum and L2s are a direct bid for ETH blockspace and DeFi collateral.",
        "HYPE and ENA have run ahead of their flow. The risk/reward is no longer symmetric.",
      ],
      decision:
        "Raise BTC to 32% and ETH to 30%, cut SOL, HYPE and ENA by one point each, and trim USDC and USDe to fund the spot adds.",
      reasoning: [
        "The cleanest signal in crypto is when ETF creations and stablecoin mints point the same way while perp funding stays low. That combination means the marginal buyer is spot and the leverage crowd is not yet crowded. I want to own that with spot, not with perps.",
        "I am trimming the high-beta tail because HYPE and ENA have outrun their flow. The invalidation is a reversal in ETF creations above $500M net redemptions in a single day, or funding spiking above 50% APR while open interest rises. In that case, cut the perp basis first and let spot breathe.",
      ],
      actions: [
        "BTC 30% → 32%",
        "ETH 28% → 30%",
        "SOL 10% → 9%",
        "HYPE 8% → 7%",
        "ENA 6% → 5%",
        "USDC 12% → 10%",
        "USDe 6% → 7%",
      ],
      target: [
        { label: "BTC", weight: 32 },
        { label: "ETH", weight: 30 },
        { label: "SOL", weight: 9 },
        { label: "HYPE", weight: 7 },
        { label: "ENA", weight: 5 },
        { label: "USDC", weight: 10 },
        { label: "USDe", weight: 7 },
      ],
      tags: ["ETF flows", "funding", "spot-led"],
    },
    {
      id: "macro-2026-11-01",
      date: "2026-11-01",
      time: "06:00 UTC",
      title: "ETH is the higher-beta liquidity trade",
      dek: "The ETH/BTC ratio is breaking out as staking flows and L2 activity recover. Atlas rotates.",
      confidence: 68,
      horizon: "2–5 weeks",
      nav: "145.13",
      sources: [
        {
          title: "ETH/BTC ratio and spot volumes",
          publisher: "Kaiko",
          kind: "dataset",
          note: "ETH/BTC broke above its 90-day range on rising spot volume, not perp volume. The move is cash-driven.",
        },
        {
          title: "Validator queue and staking yields",
          publisher: "Beaconcha.in",
          kind: "dataset",
          note: "Entry queue at 11 days; staking yield 3.1%. Restaking demand is absorbing new validators.",
        },
        {
          title: "L2 blob fees and DA demand",
          publisher: "Etherscan",
          kind: "dataset",
          note: "Blob fees up 3.8x from the September low as L2 activity returns. ETH is capturing the blockspace margin again.",
        },
        {
          title: "Spot ETH ETF flows",
          publisher: "Farside Investors",
          kind: "dataset",
          note: "Six consecutive days of net creations, the longest streak since launch. Staking-enabled products are leading.",
        },
      ],
      observations: [
        "ETH is being bought in spot, not via perps. That is the same clean structure as BTC, one beta higher.",
        "Blob fees recovering means L2 growth is finally accruing to ETH rather than leaking to sequencers.",
        "The ETH/BTC ratio is still below its 2025 high. There is room before this becomes a crowded trade.",
      ],
      decision:
        "Rotate two points from BTC into ETH, add one each to SOL, HYPE and ENA, and cut the USDe basis leg by three.",
      reasoning: [
        "The crypto macro trade is moving from BTC-led to ETH-led. ETF creations are broadening, staking is absorbing supply and blob fees are recovering. That is a fundamental improvement in ETH's cash-flow story, not just a beta chase.",
        "I am funding the rotation from BTC and from the USDe basis leg. The basis trade is no longer paying enough for the smart-contract and funding risk. If the ETH/BTC breakout fails back below the 90-day range, I will reverse this within one report.",
      ],
      actions: [
        "BTC 32% → 30%",
        "ETH 26% → 28%",
        "SOL 9% → 10%",
        "HYPE 7% → 8%",
        "ENA 5% → 6%",
        "USDe 9% → 6%",
      ],
      target: [
        { label: "BTC", weight: 30 },
        { label: "ETH", weight: 28 },
        { label: "SOL", weight: 10 },
        { label: "HYPE", weight: 8 },
        { label: "ENA", weight: 6 },
        { label: "USDC", weight: 12 },
        { label: "USDe", weight: 6 },
      ],
      tags: ["ETH/BTC", "staking", "rotation"],
    },
    {
      id: "macro-2026-10-31",
      date: "2026-10-31",
      time: "06:00 UTC",
      title: "The basis trade is crowded",
      dek: "Funding is thin, open interest is high and stablecoin yields are compressing. Atlas pays down basis risk.",
      confidence: 77,
      horizon: "1–3 weeks",
      nav: "144.02",
      sources: [
        {
          title: "Perp funding and open interest by venue",
          publisher: "Coinglass",
          kind: "dataset",
          note: "Open interest at a 90-day high while funding is in the 28th percentile. Leverage is long but not paying.",
        },
        {
          title: "USDe and sUSDe secondary-market depth",
          publisher: "Curve",
          kind: "market",
          note: "Exit slippage for a $25M clip doubled to 18bp. The yield is still attractive; the exit is not.",
        },
        {
          title: "Stablecoin yield curve",
          publisher: "DefiLlama",
          kind: "dataset",
          note: "USDC supply yields fell to 6.9% as utilization eased. The carry premium over T-bills is narrowing.",
        },
        {
          title: "Liquidation heatmap, BTC and ETH",
          publisher: "Hyblock",
          kind: "dataset",
          note: "A $1.9B cluster sits 6% below spot. A wick would force leveraged longs out without breaking spot structure.",
        },
      ],
      observations: [
        "Crowded open interest with low funding is a fragile combination. Longs are not being paid to stay.",
        "The basis trade's exit is widening before its yield is falling. That is the wrong order.",
        "A liquidation cluster 6% below spot is an invitation for a wick, not a reason to panic.",
      ],
      decision:
        "Cut BTC by two points and the USDe basis by two, rotate into ETH and USDC, and hold the rest of the book.",
      reasoning: [
        "The basis trade has become a liquidity business, not a carry business. When open interest is at a 90-day high, funding is below median and exit slippage is doubling, the marginal dollar is underpaid for the tail. I would rather own spot ETH and dry powder.",
        "This is not a bearish call. It is a risk-budget call. If funding normalises above 15% APR and exit depth recovers, I will rebuild the basis leg. Until then, the stablecoin sleeve is the shock absorber.",
      ],
      actions: [
        "BTC 34% → 32%",
        "ETH 24% → 26%",
        "USDe 11% → 9%",
        "USDC 10% → 12%",
      ],
      target: [
        { label: "BTC", weight: 32 },
        { label: "ETH", weight: 26 },
        { label: "SOL", weight: 9 },
        { label: "HYPE", weight: 7 },
        { label: "ENA", weight: 5 },
        { label: "USDC", weight: 12 },
        { label: "USDe", weight: 9 },
      ],
      tags: ["basis", "open interest", "liquidity"],
    },
    {
      id: "macro-2026-10-30",
      date: "2026-10-30",
      time: "06:00 UTC",
      title: "Spot is doing the buying",
      dek: "ETF creations are positive, perp open interest is flat and funding is quiet. Atlas adds spot beta.",
      confidence: 71,
      horizon: "2–4 weeks",
      nav: "143.87",
      sources: [
        {
          title: "Spot BTC ETF net creations, 5-day",
          publisher: "Farside Investors",
          kind: "dataset",
          note: "+$1.4B over five sessions. BlackRock and Fidelity products account for 71% of the flow.",
        },
        {
          title: "Perp open interest and funding",
          publisher: "Coinglass",
          kind: "dataset",
          note: "OI flat week-over-week; funding 8.1% annualised. No leverage chase.",
        },
        {
          title: "Exchange BTC balances",
          publisher: "Glassnode",
          kind: "dataset",
          note: "Exchange balances fell to a 5-year low. Coins are moving to custody, not to trading desks.",
        },
        {
          title: "Miner reserves and hash ribbon",
          publisher: "CryptoQuant",
          kind: "dataset",
          note: "Miner selling is below the 30-day average. Supply pressure from miners is fading.",
        },
      ],
      observations: [
        "ETF creations plus falling exchange balances is a spot-supply squeeze, not a leverage rally.",
        "Miner selling is fading. The structural sell-side is thinner than it looks.",
        "Funding is quiet enough that a long position is not paying a crowded premium.",
      ],
      decision:
        "Raise BTC to 34% and ETH to 24%, trim SOL, HYPE and ENA by one each, and cut the basis leg by two.",
      reasoning: [
        "The spot bid is coming from products that do not use leverage, while exchange balances keep falling. That is the setup in which crypto grinds higher without a funding blow-off. I want maximum exposure to the spot bid and minimum exposure to the carry trade.",
        "The trim in SOL, HYPE and ENA is a relative-value decision, not a negative view. If alt breadth improves and ETF flows broaden beyond BTC, I will rotate back. The invalidation is two consecutive days of net ETF redemptions above $300M.",
      ],
      actions: [
        "BTC 32% → 34%",
        "ETH 22% → 24%",
        "SOL 10% → 9%",
        "HYPE 8% → 7%",
        "ENA 6% → 5%",
        "USDe 12% → 11%",
      ],
      target: [
        { label: "BTC", weight: 34 },
        { label: "ETH", weight: 24 },
        { label: "SOL", weight: 9 },
        { label: "HYPE", weight: 7 },
        { label: "ENA", weight: 5 },
        { label: "USDC", weight: 10 },
        { label: "USDe", weight: 11 },
      ],
      tags: ["ETF", "spot", "supply"],
    },
    {
      id: "macro-2026-10-29",
      date: "2026-10-29",
      time: "06:00 UTC",
      title: "Liquidity is turning, slowly",
      dek: "Stablecoin mints and net liquidity are improving together. Atlas starts adding crypto beta.",
      confidence: 63,
      horizon: "1–3 months",
      nav: "142.91",
      sources: [
        {
          title: "Global net liquidity proxy",
          publisher: "FRED",
          kind: "dataset",
          note: "Net liquidity turned positive for the first time in five weeks as the TGA drawdown offset QT.",
        },
        {
          title: "Stablecoin net issuance, 30-day",
          publisher: "DefiLlama",
          kind: "dataset",
          note: "+$7.4B over 30 days, led by USDC and USDe. Issuance is accelerating, not just rotating.",
        },
        {
          title: "Spot ETF flows, monthly",
          publisher: "Bloomberg Intelligence",
          kind: "dataset",
          note: "October is on track for the second-largest monthly net creation on record.",
        },
        {
          title: "Crypto Fear & Greed and funding",
          publisher: "Alternative.me",
          kind: "dataset",
          note: "Sentiment is neutral while funding is low. The crowd is not euphoric.",
        },
      ],
      observations: [
        "Liquidity is turning before sentiment does. That is the most reliable phase of a crypto cycle.",
        "Stablecoin issuance is accelerating across two issuers, which is a broader signal than a single mint.",
        "Funding is low enough that adding spot beta does not require paying a crowded premium.",
      ],
      decision:
        "Start adding beta: BTC to 32%, ETH to 22%, and fund it by trimming USDC and the stablecoin yield sleeve.",
      reasoning: [
        "Crypto bottoms are a liquidity phenomenon before they are a narrative phenomenon. Net liquidity turning positive while stablecoin issuance accelerates is the combination I wait for. I am adding spot beta gradually because the ETF flow confirmation is only one month old.",
        "The risk is a dollar squeeze or a regulatory shock. If net liquidity rolls back over and stablecoin issuance stalls for two weeks, I will cut back to the initial weights. Until then, the fund should own the liquidity beta.",
      ],
      actions: [
        "BTC 30% → 32%",
        "ETH 20% → 22%",
        "USDC 14% → 10%",
      ],
      target: [
        { label: "BTC", weight: 32 },
        { label: "ETH", weight: 22 },
        { label: "SOL", weight: 10 },
        { label: "HYPE", weight: 8 },
        { label: "ENA", weight: 6 },
        { label: "USDC", weight: 10 },
        { label: "USDe", weight: 12 },
      ],
      tags: ["liquidity", "stablecoins", "beta"],
    },
  ],
};
