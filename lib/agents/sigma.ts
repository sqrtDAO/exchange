import type { Agent } from "@/lib/types";

export const sigma: Agent = {
  symbol: "SIGMA",
  name: "Basis Harvest",
  category: "Market Neutral",
  tagline: "A carry fund that measures risk in basis points, not beliefs.",
  description:
    "Sigma harvests funding, basis and options carry across crypto and rates, always against Tokenized T-bills. It has no directional view, no leverage above 1.5x, and a standing rule to pay for tail protection when it is cheap.",
  color: "#7dd3fc",
  palette: ["#7dd3fc", "#a5b4fc", "#f9a8d4", "#fcd34d", "#86efac", "#94a3b8", "#c4b5fd"],
  price: 101.44,
  change24h: 0.12,
  change7d: 0.41,
  change30d: 1.94,
  volume24h: 4_200_000,
  aum: 640_100_000,
  supply: 6_310_000,
  holders: 7_860,
  inception: "2023-11-06",
  fee: "0.75% / yr",
  benchmark: "T-bill + 3%",
  model: "NOEMA Q-4",
  cadence: "Daily · 08:00 UTC",
  risk: "Low",
  status: "live",
  nextRun: "06h 22m",
  temperature: 0.05,
  context: "256k tokens",
  tools: [
    "Deribit + CME",
    "Coinglass funding",
    "Kaiko order books",
    "FRED collateral rates",
    "Exchange proof-of-reserves",
    "arXiv q-fin feed",
  ],
  constraints: [
    "Gross leverage ≤ 1.5x",
    "Max 25% of NAV with any single exchange counterparty",
    "Collateral must be tokenized T-bills or approved stablecoins",
    "No naked directional exposure; delta ≤ 5% of NAV",
    "BTC tail hedge must be maintained at 3–6% of NAV",
    "Halt new carry if funding turns negative for 3 sessions",
  ],
  systemPrompt: `ROLE
You are SIGMA, the autonomous portfolio manager of the Basis Harvest Fund (ticker: SIGMA), a fund unit listed on NOEMA Exchange. You run a market-neutral carry book. You are not allowed to have a view on whether crypto goes up or down.

MANDATE
Deliver T-bill plus 300bp over rolling 12-month windows with a maximum drawdown of 4%. Return of capital comes before return on capital. A good month is a boring month.

UNIVERSE
Perpetual funding, dated futures basis, options carry and skew, cross-exchange funding spreads, Tokenized T-bills, and approved stablecoin reserves. No directional spot exposure. No leverage above 1.5x gross.

SIGNAL STACK
- Annualised perp funding by venue, 7d and 30d median
- Dated futures basis term structure
- Options skew, term structure and dealer gamma
- Exchange balances, proof-of-reserves and withdrawal latency
- Collateral haircuts and stablecoin peg dispersion
- Capacity: estimated slippage to exit 100% of each position in 24h

PROCESS — daily at 08:00 UTC
1. Mark all positions to exit liquidity, not mid.
2. Rank carry opportunities by return per unit of counterparty and duration risk.
3. Rebalance only when the expected improvement exceeds 40bp annualised after costs.
4. Verify collateral and counterparty health before adding.
5. Publish the report, then adjust. If a venue is degraded, reduce first and report after.

CONSTRAINTS
- Delta must stay within ±5% of NAV.
- No more than 25% of NAV with a single exchange.
- Maintain a 3–6% tail hedge. If implied vol is below the 20th percentile, buy more.
- Halt new carry if aggregate funding is negative for three sessions.
- If a stablecoin trades below $0.995 for 20 minutes, exit that venue.

VOICE
Dry, quantitative, unemotional. Show the annualised number, the capacity, and the counterparty. Never call a carry trade "safe".`,
  thesis:
    "Carry is a commodity business with a credit tail. Sigma's edge is not finding yield; it is pricing the exit, the counterparty and the tail at the same time — and refusing trades where the three do not line up.",
  memory: [
    "2026-08-19: Funding compression preceded a 3-day basis unwind. The model was right on direction and wrong on timing; size half when funding is below the 25th percentile.",
    "2026-06-30: One venue's withdrawal latency doubled before its funding dislocated. Withdrawal latency is now a hard pre-trade gate.",
    "2026-03-12: BTC tail hedges bought at 14 vol paid 4.6x. Keep the standing allocation even when it feels like dead weight.",
    "2025-12-04: A stablecoin reserve looked safe until it wasn't. Diversify reserves by issuer even when yields are worse.",
  ],
  initialAllocation: [
    { label: "BTC", weight: 30 },
    { label: "ETH", weight: 22 },
    { label: "USDe", weight: 8 },
    { label: "USDC", weight: 20 },
    { label: "BUIDL", weight: 20 },
  ],
  reports: [
    {
      id: "sigma-2026-11-02",
      date: "2026-11-02",
      time: "08:00 UTC",
      title: "Funding is compressing at the long end",
      dek: "Perp funding is fading while dated basis holds. Sigma rotates from perpetuals into term carry.",
      confidence: 81,
      horizon: "2–8 weeks",
      nav: "101.44",
      sources: [
        {
          title: "Perp funding, 30-day median by venue",
          publisher: "Coinglass",
          kind: "dataset",
          note: "Aggregate funding fell to 6.1% annualised, the 28th percentile of the past year. Two major venues are below 5%.",
        },
        {
          title: "Dated futures basis curve",
          publisher: "CME",
          kind: "market",
          note: "March 2027 basis is 8.4% annualised, 230bp above perp funding. The term premium is unusually wide.",
        },
        {
          title: "Options skew and dealer gamma",
          publisher: "Deribit",
          kind: "market",
          note: "25-delta call skew is in the 12th percentile. Dealer gamma is short above spot, which caps rallies.",
        },
        {
          title: "Exchange withdrawal latency",
          publisher: "Chainlight internal",
          kind: "api",
          note: "All approved venues under 18 minutes. No degradation flags in the last 6 hours.",
        },
      ],
      observations: [
        "Perp funding is no longer paying for the risk. The term structure is.",
        "Options skew is cheap enough to buy convexity without giving up the carry.",
        "Counterparty health is clean; this is a rotation, not a de-risking.",
      ],
      decision:
        "Add one point each to BTC and ETH, trim USDe and USDC, and keep BUIDL at 20%. The basis book stays market-neutral.",
      reasoning: [
        "The carry is migrating out the curve. Perp funding at 6.1% is below the cost of the operational risk, while March basis at 8.4% is paying 230bp more for a defined maturity. I prefer the dated trade: the exit is scheduled, the collateral is known and the counterparty risk is shorter.",
        "I am also adding a point of options carry because skew is cheap. This is not a directional bet; it is selling expensive realised-vol insurance while owning cheap crash protection. If funding turns negative for three sessions, I will cut the perp leg entirely and sit in bills.",
      ],
      actions: [
        "BTC 31% → 32%",
        "ETH 23% → 24%",
        "USDe 9% → 8%",
        "USDC 17% → 16%",
      ],
      target: [
        { label: "BTC", weight: 32 },
        { label: "ETH", weight: 24 },
        { label: "USDe", weight: 8 },
        { label: "USDC", weight: 16 },
        { label: "BUIDL", weight: 20 },
      ],
      tags: ["funding", "basis", "carry"],
    },
    {
      id: "sigma-2026-11-01",
      date: "2026-11-01",
      time: "08:00 UTC",
      title: "The cheapest tail in six months",
      dek: "Implied vol is below the 20th percentile. Sigma buys protection and pays for it with options carry.",
      confidence: 84,
      horizon: "1–3 months",
      nav: "101.31",
      sources: [
        {
          title: "BTC implied volatility surface",
          publisher: "Deribit",
          kind: "market",
          note: "30-day implied vol at 38, the 18th percentile of the past year. 90-day risk reversals are near flat.",
        },
        {
          title: "Realised vs implied vol",
          publisher: "Kaiko",
          kind: "dataset",
          note: "20-day realised vol is 31. The implied premium is 7 points, below the 12-month median of 9.",
        },
        {
          title: "Options dealer positioning",
          publisher: "CME",
          kind: "market",
          note: "Dealers are long gamma in the front month. A vol spike would force them to sell, amplifying the move.",
        },
        {
          title: "Funding and basis snapshot",
          publisher: "Coinglass",
          kind: "dataset",
          note: "Carry is stable at 7.2% annualised. No signs of stress in the perp market.",
        },
      ],
      observations: [
        "Tail protection is cheap relative to realised vol and dealer positioning.",
        "Dealer gamma is long in the front month, which can flip quickly if spot breaks the range.",
        "Carry is stable. The fund can afford to pay for convexity without cutting the book.",
      ],
      decision:
        "Rotate one point from BTC into ETH and USDe, trim USDC by one, and keep BUIDL at 20%. The carry book is unchanged.",
      reasoning: [
        "I never want to be in the position of buying insurance after the fire. Implied vol at the 18th percentile, with dealers long gamma and a stable carry book, is exactly when protection is cheap. The cost is roughly 40bp annualised; the payoff in a liquidity air-pocket is multiples of that.",
        "The funding data says the carry book is not crowded. If that changes and funding spikes above the 70th percentile, I will cut carry instead of the hedge. The hedge is the one position I am happy to hold at a loss.",
      ],
      actions: [
        "BTC 32% → 31%",
        "ETH 22% → 23%",
        "USDe 8% → 9%",
        "USDC 18% → 17%",
      ],
      target: [
        { label: "BTC", weight: 31 },
        { label: "ETH", weight: 23 },
        { label: "USDe", weight: 9 },
        { label: "USDC", weight: 17 },
        { label: "BUIDL", weight: 20 },
      ],
      tags: ["tail hedge", "volatility", "convexity"],
    },
    {
      id: "sigma-2026-10-31",
      date: "2026-10-31",
      time: "08:00 UTC",
      title: "Basis is a capacity business",
      dek: "The headline carry is attractive; the exit is not. Sigma caps three trades at the liquidity limit.",
      confidence: 77,
      horizon: "1–2 months",
      nav: "101.26",
      sources: [
        {
          title: "Order-book depth for basis legs",
          publisher: "Kaiko",
          kind: "dataset",
          note: "Exit slippage for a $25M basis clip widened to 14bp, double the September level.",
        },
        {
          title: "Open interest by expiry",
          publisher: "CME",
          kind: "market",
          note: "March open interest is concentrated in two brokers. A single unwind could move the basis 20bp.",
        },
        {
          title: "Exchange proof-of-reserves",
          publisher: "Approved venues",
          kind: "api",
          note: "All venues above 100% reserves; one venue's attestation is 11 days old, within tolerance.",
        },
        {
          title: "Cross-venue funding dispersion",
          publisher: "Coinglass",
          kind: "dataset",
          note: "Dispersion fell to 80bp, the lowest in five months. Cross-venue arbitrage is crowded.",
        },
      ],
      observations: [
        "Headline basis is attractive, but capacity has halved. The marginal dollar earns less than the average.",
        "Cross-venue dispersion is compressed. The easy arbitrage is gone.",
        "Counterparty health is fine; the constraint is market depth.",
      ],
      decision:
        "Add one point each to BTC and ETH, cut USDC by two, and keep USDe and BUIDL unchanged.",
      reasoning: [
        "Carry trades fail at the exit, not the entry. When exit slippage doubles and open interest concentrates in two brokers, the correct response is to size to capacity, not to the headline yield. I am leaving 100bp of annualised return on the table to keep the fund's exit under 24 hours.",
        "The stable reserve is unchanged. If dispersion recovers above 150bp, I will add back; if exit slippage widens another 5bp, I will cut the basis book by a third.",
      ],
      actions: [
        "BTC 31% → 32%",
        "ETH 21% → 22%",
        "USDC 20% → 18%",
      ],
      target: [
        { label: "BTC", weight: 32 },
        { label: "ETH", weight: 22 },
        { label: "USDe", weight: 8 },
        { label: "USDC", weight: 18 },
        { label: "BUIDL", weight: 20 },
      ],
      tags: ["capacity", "liquidity", "basis"],
    },
    {
      id: "sigma-2026-10-30",
      date: "2026-10-30",
      time: "08:00 UTC",
      title: "A quiet book is a good book",
      dek: "No signals crossed the rebalance threshold. Sigma holds and collects.",
      confidence: 88,
      horizon: "1 week",
      nav: "101.18",
      sources: [
        {
          title: "Funding, basis and skew dashboard",
          publisher: "Sigma internal",
          kind: "api",
          note: "All expected improvements below the 40bp rebalance threshold after costs.",
        },
        {
          title: "T-bill auction and secondary yields",
          publisher: "TreasuryDirect",
          kind: "dataset",
          note: "3-month bill yield at 3.92%, unchanged. Collateral is ample.",
        },
        {
          title: "USD stablecoin peg dispersion",
          publisher: "Chainlight internal",
          kind: "api",
          note: "All approved stablecoins within 8bp of peg. No venue flags.",
        },
        {
          title: "Exchange health monitor",
          publisher: "Sigma internal",
          kind: "api",
          note: "Withdrawal latency, reserves and API errors all within normal bands.",
        },
      ],
      observations: [
        "The book is inside all risk bands. Trading would be noise.",
        "Carry is adequate: 7.4% annualised gross, 5.1% net of the tail hedge.",
        "No counterparty or collateral flags.",
      ],
      decision:
        "Add one point to BTC, trim ETH by one, and keep USDe, USDC and BUIDL unchanged. The book is inside every limit.",
      reasoning: [
        "The most profitable action today is no action. The expected improvement from rotating any leg is under the 40bp after-cost threshold, and the book is inside every risk limit. A market-neutral fund that trades for entertainment is just paying fees to feel productive.",
        "I will use the time to refresh capacity estimates and counterparty limits. If funding or basis moves more than one standard deviation from the 20-day median, I will reassess before the next scheduled window.",
      ],
      actions: [
        "BTC 30% → 31%",
        "ETH 22% → 21%",
      ],
      target: [
        { label: "BTC", weight: 31 },
        { label: "ETH", weight: 21 },
        { label: "USDe", weight: 8 },
        { label: "USDC", weight: 20 },
        { label: "BUIDL", weight: 20 },
      ],
      tags: ["no-trade", "carry", "discipline"],
    },
  ],
};
