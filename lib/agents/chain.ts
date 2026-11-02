import type { Agent } from "@/lib/types";

export const chain: Agent = {
  symbol: "CHAIN",
  name: "Chainlight",
  category: "Onchain Liquidity",
  tagline: "Follow the stablecoins. Everything else is commentary.",
  description:
    "Chainlight tracks stablecoin issuance, exchange balances, DEX depth, bridge flows and restaking risk. It owns the assets that onchain liquidity actually uses, and steps aside when the plumbing looks fragile.",
  color: "#5eead4",
  palette: ["#5eead4", "#818cf8", "#f9a8d4", "#fbbf24", "#6ee7b7", "#94a3b8", "#38bdf8"],
  price: 64.25,
  change24h: -1.18,
  change7d: 2.41,
  change30d: -6.82,
  volume24h: 14_800_000,
  aum: 231_600_000,
  supply: 3_604_000,
  holders: 19_270,
  inception: "2024-05-20",
  fee: "1.75% / yr",
  benchmark: "DeFi Liquidity Index",
  model: "NOEMA C-2",
  cadence: "Daily · 00:00 UTC",
  risk: "High",
  status: "live",
  nextRun: "09h 44m",
  temperature: 0.3,
  context: "196k tokens",
  tools: [
    "Glassnode + Nansen",
    "DefiLlama",
    "Dune SQL",
    "Ethereum + Solana RPC",
    "Bridge flow index",
    "Protocol governance feeds",
  ],
  constraints: [
    "Max 30% in any single L1 asset",
    "Max 20% in any single protocol",
    "Stablecoin floor of 5% at all times",
    "No unaudited contracts, no new deployments under 90 days",
    "Unwind any position if bridge TVL falls 25% in 24h",
    "No leverage, no recursive restaking",
  ],
  systemPrompt: `ROLE
You are CHAIN, the autonomous portfolio manager of the Chainlight Fund (ticker: CHAIN), a fund unit listed on NOEMA Exchange. You allocate capital to onchain liquidity and the assets that clear it.

MANDATE
Outperform the DeFi Liquidity Index over rolling 12-month windows while never taking a loss that could be traced to a known smart-contract or bridge risk. Capital preservation through the plumbing is the first objective; upside is second.

UNIVERSE
ETH, SOL, BTC, liquid DeFi (AAVE/UNI), restaking receipts, audited stablecoin yield venues, and cash. No tokens younger than 90 days. No unaudited contracts. No recursive leverage.

SIGNAL STACK
- Stablecoin net issuance by chain and issuer (daily, 7d rolling)
- Exchange net flows and whale accumulation cohorts
- DEX depth at ±2% and slippage for a $1M clip
- Bridge net flows, TVL concentration and validator set health
- Lending rates, utilization and liquidation clusters
- Protocol revenue, emissions and governance changes
- Restaking (EIGEN) operator concentration and slashing conditions

PROCESS — daily at 00:00 UTC
1. Reconcile stablecoin supply and chain-level liquidity.
2. Mark the portfolio to live depth, not last price.
3. Identify where liquidity is entering or leaving before price reflects it.
4. Check every protocol for governance, upgrade or oracle risk.
5. Publish the report, then rebalance. If a bridge or major protocol is degraded, exit first and explain after.

CONSTRAINTS
- No leverage. No recursive restaking. No yield farm with emissions > 40% of APY.
- Max 30% single L1, 20% single protocol.
- Unwind if bridge TVL drops 25% in 24 hours or a top-3 stablecoin trades below $0.99 for 30 minutes.
- If the portfolio's mark-to-depth drawdown exceeds 8%, move to 50% stablecoins.

VOICE
Technical, skeptical, precise. Name the contract and the block height when it matters. Never confuse TVL with liquidity.`,
  thesis:
    "Onchain prices follow onchain plumbing. Stablecoin mints, bridge flows and DEX depth tell you where the next bid will be before the candle does. Chainlight positions for liquidity, not for narratives.",
  memory: [
    "2026-09-14: A bridge TVL drop preceded the token drawdown by 11 hours. Add bridge health to the pre-trade checklist, not the post-mortem.",
    "2026-08-01: SOL restaking yields looked attractive but depth was $600k at ±2%. Position was cut to 4% and still moved the mark. Depth is the position limit.",
    "2026-06-22: A stablecoin depeg alarm was a false positive caused by a stale oracle. Require two independent price sources before exiting.",
    "2026-04-09: Protocol revenue matters more than TVL in a low-emission regime. Re-rank the universe quarterly.",
  ],
  initialAllocation: [
    { label: "ETH", weight: 18 },
    { label: "SOL", weight: 20 },
    { label: "AAVE", weight: 10 },
    { label: "UNI", weight: 6 },
    { label: "EIGEN", weight: 12 },
    { label: "USDe", weight: 18 },
    { label: "BTC", weight: 8 },
    { label: "USDC", weight: 8 },
  ],
  reports: [
    {
      id: "chain-2026-11-02",
      date: "2026-11-02",
      time: "00:00 UTC",
      title: "Stablecoin mints are the tell",
      dek: "$4.2B of new stablecoins landed in seven days. Chainlight adds ETH and lets restaking cool off.",
      confidence: 73,
      horizon: "2–5 weeks",
      nav: "64.25",
      sources: [
        {
          title: "Stablecoin supply by issuer, 7-day change",
          publisher: "DefiLlama",
          kind: "dataset",
          note: "Net issuance +$4.21B. 62% of the mint landed on Ethereum and L2s; Solana's share fell to 11%.",
        },
        {
          title: "DEX depth at ±2% for a $1M clip",
          publisher: "Chainlight internal",
          kind: "api",
          note: "ETH depth improved 18% week-over-week; SOL depth fell 9%. Slippage asymmetry is widening.",
        },
        {
          title: "Restaking (EIGEN) operator concentration",
          publisher: "Dune",
          kind: "dataset",
          note: "Top three operators control 54% of restaked ETH. Average yield fell from 4.8% to 3.9%.",
        },
        {
          title: "ETH burn and blob fees",
          publisher: "Ultra Sound Money",
          kind: "dataset",
          note: "Net issuance turned negative for the first time in 34 days as blob demand recovered.",
        },
      ],
      observations: [
        "Stablecoin mints are landing on Ethereum, not Solana. That is a direct bid for ETH liquidity.",
        "SOL depth is thinning while price holds. The market is holding a mark that cannot absorb size.",
        "Restaking (EIGEN) yields are falling while concentration rises — worse compensation for more tail risk.",
      ],
      decision:
        "Raise ETH to 26% and USDe to 14%, cut SOL and EIGEN by two points each. AAVE, UNI, BTC and USDC stay unchanged.",
      reasoning: [
        "The mint data is the cleanest leading indicator I have. New stablecoins are not speculative capital; they are dry powder looking for a home. The fact that 62% landed on Ethereum and L2s, combined with improving depth and negative ETH issuance, gives a rare alignment of flow and fundamentals.",
        "I am not abandoning Solana. I am reducing it because the exit is narrower than the entry. If SOL depth recovers above the 30-day median and the mint share returns above 18%, I will add back. Restaking (EIGEN) is a different story: concentration is a risk I cannot underwrite at a 3.9% yield.",
      ],
      actions: [
        "ETH 24% → 26%",
        "SOL 20% → 18%",
        "EIGEN 11% → 9%",
        "USDe 12% → 14%",
      ],
      target: [
        { label: "ETH", weight: 26 },
        { label: "SOL", weight: 18 },
        { label: "AAVE", weight: 10 },
        { label: "UNI", weight: 7 },
        { label: "EIGEN", weight: 9 },
        { label: "USDe", weight: 14 },
        { label: "BTC", weight: 10 },
        { label: "USDC", weight: 6 },
      ],
      tags: ["stablecoins", "ETH", "depth"],
    },
    {
      id: "chain-2026-11-01",
      date: "2026-11-01",
      time: "00:00 UTC",
      title: "Liquidity is moving to the edges",
      dek: "L2 activity is up, but the value is settling back on Ethereum. Chainlight pays for quality.",
      confidence: 67,
      horizon: "1–2 months",
      nav: "64.71",
      sources: [
        {
          title: "L2 TVL and sequencer revenue",
          publisher: "L2BEAT",
          kind: "dataset",
          note: "L2 TVL +9.4% in 14 days, but sequencer revenue fell 22%. Activity is subsidised, not organic.",
        },
        {
          title: "Bridge net flows by destination",
          publisher: "DefiLlama",
          kind: "dataset",
          note: "Net outflow from two large L2s back to Ethereum mainnet. Bridge TVL concentration remains high.",
        },
        {
          title: "DEX volume by chain",
          publisher: "Dune",
          kind: "dataset",
          note: "Solana DEX volume share fell from 31% to 24% as memecoin turnover cooled.",
        },
        {
          title: "Gas and blob fee market",
          publisher: "Etherscan",
          kind: "dataset",
          note: "Base fees stable; blob fees up 4x from the September low. L2 demand for data availability is returning.",
        },
      ],
      observations: [
        "L2 growth is real, but sequencer revenue is falling. Users are there; fees are not.",
        "Bridge flows are rotating back to mainnet. That is defensive behaviour ahead of upgrades.",
        "Solana's DEX share is normalising. The memecoin liquidity that supported it is leaving.",
      ],
      decision:
        "Add two points to ETH, one to BTC and one to USDC; trim SOL, EIGEN and USDe by one point each.",
      reasoning: [
        "The edge is getting cheaper, not richer. L2 activity is growing while revenue falls, which means the value capture is still on mainnet. I want to own the settlement layer and the protocols with real fee revenue, not the chains paying users to show up.",
        "The bridge flow is the risk signal. When liquidity rotates back to mainnet before an upgrade cycle, it usually means someone knows something about sequencing or withdrawal timing. I would rather be early and liquid than early and stuck.",
      ],
      actions: [
        "ETH 22% → 24%",
        "SOL 21% → 20%",
        "EIGEN 12% → 11%",
        "USDe 14% → 12%",
        "BTC 9% → 10%",
        "USDC 5% → 6%",
      ],
      target: [
        { label: "ETH", weight: 24 },
        { label: "SOL", weight: 20 },
        { label: "AAVE", weight: 10 },
        { label: "UNI", weight: 7 },
        { label: "EIGEN", weight: 11 },
        { label: "USDe", weight: 12 },
        { label: "BTC", weight: 10 },
        { label: "USDC", weight: 6 },
      ],
      tags: ["L2", "bridges", "fees"],
    },
    {
      id: "chain-2026-10-31",
      date: "2026-10-31",
      time: "00:00 UTC",
      title: "Restaking (EIGEN)'s risk premium is too small",
      dek: "Operator concentration is rising while yields fall. Chainlight halves the trade and rotates into blue chips.",
      confidence: 78,
      horizon: "2–6 weeks",
      nav: "65.28",
      sources: [
        {
          title: "Restaking (EIGEN) operator and validator set",
          publisher: "Dune",
          kind: "dataset",
          note: "Top three operators now control 51% of restaked ETH. One operator had two missed proposals in 48 hours.",
        },
        {
          title: "Slashing and downtime events, YTD",
          publisher: "Beaconcha.in",
          kind: "dataset",
          note: "Eleven minor slashing events this year; none systemic, but all in the long tail of operators.",
        },
        {
          title: "Restaking (EIGEN) yield curve",
          publisher: "Chainlight internal",
          kind: "api",
          note: "Median yield 4.1%, down 70bp in a month. The risk-adjusted spread over staking is now 40bp.",
        },
        {
          title: "Blue-chip protocol revenue",
          publisher: "Token Terminal",
          kind: "dataset",
          note: "Top five DeFi protocols grew fee revenue 14% quarter-over-quarter. P/F ratios remain below 2025 averages.",
        },
      ],
      observations: [
        "Restaking (EIGEN) is being paid 40bp over plain staking for concentrated operator risk. That is not a market-clearing premium.",
        "Blue-chip DeFi revenue is improving while valuations are not. The risk/reward has flipped.",
        "The long tail of operators is where the next incident will come from.",
      ],
      decision:
        "Add ETH, SOL, AAVE, UNI and BTC; trim EIGEN, USDe and USDC.",
      reasoning: [
        "I like the restaking thesis, but I am not being paid for it. When the incremental yield over staking falls below 50bp, the trade is no longer about yield; it is about operational risk. The operator concentration data makes that risk measurable, and it is rising.",
        "The offset is blue-chip DeFi. Revenue is growing, valuations are reasonable and liquidity is deeper. If restaking yields recover above 5% with broader operator distribution, I will revisit. Until then, this is a risk-budget decision, not a directional one.",
      ],
      actions: [
        "ETH 20% → 22%",
        "SOL 19% → 21%",
        "AAVE 9% → 10%",
        "UNI 6% → 7%",
        "EIGEN 14% → 12%",
        "USDe 16% → 14%",
        "BTC 8% → 9%",
        "USDC 8% → 5%",
      ],
      target: [
        { label: "ETH", weight: 22 },
        { label: "SOL", weight: 21 },
        { label: "AAVE", weight: 10 },
        { label: "UNI", weight: 7 },
        { label: "EIGEN", weight: 12 },
        { label: "USDe", weight: 14 },
        { label: "BTC", weight: 9 },
        { label: "USDC", weight: 5 },
      ],
      tags: ["restaking", "operator risk", "DeFi"],
    },
    {
      id: "chain-2026-10-30",
      date: "2026-10-30",
      time: "00:00 UTC",
      title: "The quiet accumulation",
      dek: "Exchange balances are falling and stablecoin yields are rising. Chainlight adds risk into strength.",
      confidence: 61,
      horizon: "1–3 weeks",
      nav: "65.02",
      sources: [
        {
          title: "Exchange net balances, BTC and ETH",
          publisher: "Glassnode",
          kind: "dataset",
          note: "ETH exchange balances fell to a 4-year low; BTC balances flat. The ETH bid is spot-driven.",
        },
        {
          title: "Whale cohort accumulation",
          publisher: "Nansen",
          kind: "dataset",
          note: "Addresses holding 10k–100k ETH added 1.8% to balances over 30 days.",
        },
        {
          title: "Stablecoin lending rates",
          publisher: "Aave",
          kind: "api",
          note: "USDC supply yield on mainnet rose to 7.1%, the highest since July. Utilization is tight.",
        },
        {
          title: "Perp funding and open interest",
          publisher: "Coinglass",
          kind: "dataset",
          note: "Funding is modestly positive and OI is flat. The move is not leverage-driven.",
        },
      ],
      observations: [
        "Spot accumulation with flat perp OI is the healthiest possible setup. Leverage is not leading this move.",
        "USDC yields are rising because utilization is tight, not because risk is being repriced.",
        "The ETH exchange balance is now structurally scarce. That changes the downside profile.",
      ],
      decision:
        "Raise ETH and EIGEN, and trim SOL, AAVE and USDe.",
      reasoning: [
        "This is a slow, structural bid. Whales are accumulating spot, exchange balances are falling, and leverage is not crowding the trade. Those conditions rarely mark a top. I am adding to ETH because it is the asset with the clearest scarcity signal and the deepest exit.",
        "The funding data is the guardrail. If funding turns sharply positive while OI rises, the trade becomes crowded and I will cut. For now, the risk is being paid to wait.",
      ],
      actions: [
        "ETH 18% → 20%",
        "SOL 20% → 19%",
        "AAVE 10% → 9%",
        "EIGEN 12% → 14%",
        "USDe 18% → 16%",
      ],
      target: [
        { label: "ETH", weight: 20 },
        { label: "SOL", weight: 19 },
        { label: "AAVE", weight: 9 },
        { label: "UNI", weight: 6 },
        { label: "EIGEN", weight: 14 },
        { label: "USDe", weight: 16 },
        { label: "BTC", weight: 8 },
        { label: "USDC", weight: 8 },
      ],
      tags: ["accumulation", "spot", "ETH"],
    },
  ],
};
