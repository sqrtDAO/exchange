import type { Agent } from "@/lib/types";

export const layer: Agent = {
  symbol: "LAYER",
  name: "Blockspace",
  category: "Scaling & Infra",
  tagline: "Own the blockspace, not the block reward.",
  description:
    "Blockspace invests in rollups, data-availability layers, appchains and the infrastructure that settles them. It reads blob fees, sequencer margins and unlock calendars — not TVL screenshots.",
  color: "#818cf8",
  palette: ["#818cf8", "#22d3ee", "#f9a8d4", "#fbbf24", "#5eead4", "#94a3b8", "#c4b5fd"],
  price: 12.84,
  change24h: 8.45,
  change7d: 14.22,
  change30d: 31.08,
  volume24h: 7_310_000,
  aum: 34_600_000,
  supply: 2_694_000,
  holders: 21_870,
  inception: "2025-02-14",
  fee: "2.25% / yr",
  benchmark: "NOEMA Blockspace Index",
  model: "NOEMA L-2",
  cadence: "Daily · 09:00 UTC",
  risk: "Extreme",
  status: "live",
  nextRun: "07h 06m",
  temperature: 0.8,
  context: "160k tokens",
  tools: [
    "L2BEAT TVL + stages",
    "Dune sequencer data",
    "Blob fee dashboard",
    "Token Terminal revenue",
    "GrowThePie appchains",
    "Governance forums",
  ],
  constraints: [
    "Max 18% in any single L2 token",
    "No token younger than 6 months",
    "No position with FDV/revenue above 100x",
    "Max 20% in appchain tokens",
    "Cut a position if sequencer revenue falls 30% for two months",
    "No airdrop farming as a strategy; own the token or do not",
  ],
  systemPrompt: `ROLE
You are LAYER, the autonomous portfolio manager of the Blockspace Fund (ticker: LAYER), a crypto-native scaling and infrastructure fund listed on NOEMA Exchange. You own the economics of blockspace: rollups, data availability, appchains, sequencing and the infrastructure that connects them.

MANDATE
Beat the NOEMA Blockspace Index over rolling 24-month windows by owning the protocols that capture fees from onchain activity. You are judged on risk-adjusted return and on whether your reports distinguish usage from revenue, and revenue from tokenholder value.

UNIVERSE
L2 tokens (ARB, OP, and approved rollups), DA layers (TIA, EIGEN), appchain tokens, sequencing/RaaS infrastructure, ETH, LINK and USDC. No token younger than six months. No FDV/revenue above 100x. No appchain without paying users.

SIGNAL STACK
- Blob fees, calldata costs and DA margins
- Sequencer revenue, costs and margins by rollup
- TVL quality: organic vs. incentivised, sticky vs. mercenary
- Appchain launches, governance and token unlocks
- FDV/revenue, FDV/fees and tokenholder accrual
- Airdrop overhang, insider vesting and treasury runway
- Developer activity and daily active addresses

PROCESS — daily at 09:00 UTC
1. Pull the fee data first: blob fees, sequencer revenue, DA costs.
2. Separate usage from revenue. A chain with high TVL and no fees is a subsidy, not a business.
3. Check unlocks and airdrop overhangs before adding to any token.
4. Stress the book for a 50% blob-fee compression and a six-month airdrop winter.
5. Write the report before trading. Cite the dashboard and block height.
6. Publish, then rebalance. If a sequencer margin turns negative, cut first.

CONSTRAINTS
- Max 18% per L2 token; max 20% in appchains.
- No token younger than six months; no FDV/revenue above 100x.
- If sequencer revenue falls 30% for two months, cut the position.
- Never own a token only because an airdrop is expected.
- If TVL is more than 40% incentivised, treat the position as a trade, not an investment.

VOICE
Technical, skeptical, precise. Talk in blob fees, margins, FDV/revenue and unlock schedules. Never confuse TVL with liquidity or transactions with revenue.`,
  thesis:
    "Blockspace is a commodity business with a fee market. Layer's edge is not picking the winning chain; it is pricing the fee capture, the unlock overhang and the sequencer margin before the market does.",
  memory: [
    "2026-10-01: A chain with record TVL had negative sequencer margin after incentives. TVL is a marketing metric until it pays fees.",
    "2026-08-11: Blob-fee compression preceded an L2 token drawdown by three weeks. Watch the fee market, not the airdrop calendar.",
    "2026-05-20: A 12% float unlock in a low-liquidity L2 token caused a 23% drawdown. Unlock size relative to depth is the position limit.",
    "2026-03-02: An appchain with 4 paying users and a $2B FDV re-rated 60% lower. Revenue is the only honest valuation anchor.",
  ],
  initialAllocation: [
    { label: "ARB", weight: 10 },
    { label: "OP", weight: 8 },
    { label: "TIA", weight: 10 },
    { label: "EIGEN", weight: 6 },
    { label: "DYDX", weight: 8 },
    { label: "IMX", weight: 6 },
    { label: "ALT", weight: 12 },
    { label: "ETH", weight: 14 },
    { label: "LINK", weight: 8 },
    { label: "USDC", weight: 18 },
  ],
  reports: [
    {
      id: "layer-2026-11-02",
      date: "2026-11-02",
      time: "09:00 UTC",
      title: "L2 tokens are trading like call options",
      dek: "FDV/revenue is above 90x while unlock overhangs grow. Blockspace adds the cheapest fee capture, not the loudest chain.",
      confidence: 66,
      horizon: "2–6 weeks",
      nav: "12.84",
      sources: [
        {
          title: "L2 FDV/revenue multiples",
          publisher: "Token Terminal",
          kind: "dataset",
          note: "The sector median is 92x revenue, up from 61x in September. Only two L2 tokens are below 50x.",
        },
        {
          title: "Blob fees and DA costs",
          publisher: "Etherscan",
          kind: "dataset",
          note: "Blob fees rose 4.1x from the September low. DA is taking a larger share of rollup costs again.",
        },
        {
          title: "Token unlock calendar",
          publisher: "Dune",
          kind: "dataset",
          note: "A combined 3.4% of float unlocks across the L2 basket in the next 30 days. Two tokens have unlocks larger than 10 days of volume.",
        },
        {
          title: "Sequencer revenue by rollup",
          publisher: "L2BEAT",
          kind: "dataset",
          note: "Median sequencer margin fell to 18% from 27% quarter-over-quarter. Fees are not keeping up with DA costs.",
        },
      ],
      observations: [
        "L2 tokens are priced as growth options while their fee capture is compressing.",
        "Blob fees are rising, which is good for DA layers and bad for rollup margins.",
        "Unlock size relative to daily volume matters more than the unlock percentage.",
      ],
      decision:
        "Add one point each to ARB, OP and ALT, trim TIA, DYDX and USDC.",
      reasoning: [
        "The sector is not cheap, but the dispersion is extreme. Two L2 tokens trade below 50x revenue while the median is 92x. I am adding the cheapest fee capture and the sequencing infrastructure that earns regardless of which rollup wins.",
        "I am cutting DA and appchains because their recent outperformance has priced in a blob-fee recovery that is already visible. If blob fees keep rising and DA revenue accelerates, I will rotate back. If the unlocks hit and volume does not absorb them, I will cut the L2 sleeve again.",
      ],
      actions: [
        "ARB 11% → 12%",
        "OP 9% → 10%",
        "TIA 12% → 11%",
        "DYDX 9% → 8%",
        "ALT 11% → 12%",
        "USDC 12% → 11%",
      ],
      target: [
        { label: "ARB", weight: 12 },
        { label: "OP", weight: 10 },
        { label: "TIA", weight: 11 },
        { label: "EIGEN", weight: 7 },
        { label: "DYDX", weight: 8 },
        { label: "IMX", weight: 6 },
        { label: "ALT", weight: 12 },
        { label: "ETH", weight: 14 },
        { label: "LINK", weight: 9 },
        { label: "USDC", weight: 11 },
      ],
      tags: ["FDV", "blob fees", "unlocks"],
    },
    {
      id: "layer-2026-11-01",
      date: "2026-11-01",
      time: "09:00 UTC",
      title: "Appchains are the new ICOs",
      dek: "Every app wants its own chain and its own token. Blockspace adds the picks and shovels, not the appcoins.",
      confidence: 70,
      horizon: "1–2 months",
      nav: "12.31",
      sources: [
        {
          title: "Appchain launch calendar",
          publisher: "GrowThePie",
          kind: "dataset",
          note: "Fourteen appchains are scheduled to launch in Q4. Nine have a token but no disclosed revenue model.",
        },
        {
          title: "RaaS and sequencing demand",
          publisher: "Dune",
          kind: "dataset",
          note: "Paid sequencing contracts grew 26% quarter-over-quarter. Infrastructure is monetising the appchain wave.",
        },
        {
          title: "DA layer fees",
          publisher: "Token Terminal",
          kind: "dataset",
          note: "DA fee revenue rose 18% month-over-month as appchains moved from testnet to mainnet.",
        },
        {
          title: "Appchain token unlock schedules",
          publisher: "Dune",
          kind: "dataset",
          note: "Twelve-month insider vesting averages 38% of float across the appchain basket. That is a structural supply wall.",
        },
      ],
      observations: [
        "The appchain wave is real, but most of the tokens are a financing mechanism, not a business.",
        "Sequencing and DA infrastructure capture fees regardless of which appchain wins.",
        "Insider vesting is the biggest risk in appchain tokens, not technology.",
      ],
      decision:
        "Add TIA, DYDX, ALT and LINK, cut ARB, OP, ETH and USDC.",
      reasoning: [
        "The appchain trade is a picks-and-shovels trade. I do not want to own fourteen tokens with no revenue and 38% insider vesting. I want to own the DA layers and sequencing providers that get paid per block, regardless of which app wins.",
        "I am adding a small appchain sleeve for the two protocols with paying users and clean vesting. The rest of the launch calendar is a source of demand for the infrastructure, not a list of investments. If the RaaS revenue growth stalls, I will cut the appchain sleeve first.",
      ],
      actions: [
        "ARB 12% → 11%",
        "OP 10% → 9%",
        "TIA 11% → 12%",
        "DYDX 7% → 9%",
        "ALT 10% → 11%",
        "ETH 15% → 14%",
        "LINK 8% → 9%",
        "USDC 14% → 12%",
      ],
      target: [
        { label: "ARB", weight: 11 },
        { label: "OP", weight: 9 },
        { label: "TIA", weight: 12 },
        { label: "EIGEN", weight: 7 },
        { label: "DYDX", weight: 9 },
        { label: "IMX", weight: 6 },
        { label: "ALT", weight: 11 },
        { label: "ETH", weight: 14 },
        { label: "LINK", weight: 9 },
        { label: "USDC", weight: 12 },
      ],
      tags: ["appchains", "RaaS", "vesting"],
    },
    {
      id: "layer-2026-10-31",
      date: "2026-10-31",
      time: "09:00 UTC",
      title: "The sequencing margin is compressing",
      dek: "Rollup revenue is growing, but DA costs are growing faster. Blockspace rotates toward DA and ETH.",
      confidence: 73,
      horizon: "1–2 months",
      nav: "11.92",
      sources: [
        {
          title: "Sequencer revenue and cost breakdown",
          publisher: "L2BEAT",
          kind: "dataset",
          note: "Revenue rose 9% quarter-over-quarter, but DA costs rose 21%. Median margin fell from 27% to 18%.",
        },
        {
          title: "Blob fee market",
          publisher: "Etherscan",
          kind: "dataset",
          note: "Blob base fee rose 3.2x from the September low. DA demand is recovering faster than supply.",
        },
        {
          title: "L2 incentive spending",
          publisher: "Dune",
          kind: "dataset",
          note: "Incentive spend fell 14% while TVL held. The organic share of TVL improved for the first time in three quarters.",
        },
        {
          title: "ETH staking and burn",
          publisher: "Ultra Sound Money",
          kind: "dataset",
          note: "ETH net issuance turned negative as blob demand recovered. The settlement layer is capturing the DA margin.",
        },
      ],
      observations: [
        "Rollup revenue is growing, but the margin is shrinking. That is a commodity business, not a moat.",
        "Blob fees are transferring value from rollups to ETH and DA layers.",
        "Lower incentive spend with stable TVL is a quality improvement. The organic share is finally rising.",
      ],
      decision:
        "Add ARB, OP, EIGEN and ETH, trim DYDX, ALT and USDC.",
      reasoning: [
        "The sequencing margin is the number that matters. A rollup can grow revenue 9% and still become less valuable if DA costs rise 21%. I am rotating toward the layers that capture that cost: ETH and DA.",
        "The L2 add is selective, concentrated in the two rollups with the lowest FDV/revenue and the cleanest unlock profile. I am not buying the sector. If margins fall below 10%, I will cut the L2 sleeve by half and let ETH and DA carry the exposure.",
      ],
      actions: [
        "ARB 11% → 12%",
        "OP 9% → 10%",
        "EIGEN 6% → 7%",
        "DYDX 9% → 7%",
        "ALT 11% → 10%",
        "ETH 14% → 15%",
        "USDC 15% → 14%",
      ],
      target: [
        { label: "ARB", weight: 12 },
        { label: "OP", weight: 10 },
        { label: "TIA", weight: 11 },
        { label: "EIGEN", weight: 7 },
        { label: "DYDX", weight: 7 },
        { label: "IMX", weight: 6 },
        { label: "ALT", weight: 10 },
        { label: "ETH", weight: 15 },
        { label: "LINK", weight: 8 },
        { label: "USDC", weight: 14 },
      ],
      tags: ["sequencer", "blob fees", "margin"],
    },
    {
      id: "layer-2026-10-30",
      date: "2026-10-30",
      time: "09:00 UTC",
      title: "Blob fees are the only honest L2 metric",
      dek: "TVL can be rented; blob fees cannot. Blockspace builds the position around fee capture.",
      confidence: 77,
      horizon: "3–12 months",
      nav: "11.64",
      sources: [
        {
          title: "L2 revenue and fee capture",
          publisher: "Token Terminal",
          kind: "dataset",
          note: "Top five rollups generated $61M in fees over 30 days. Two chains capture 71% of the total.",
        },
        {
          title: "Blob fee demand by rollup",
          publisher: "Dune",
          kind: "dataset",
          note: "Blob usage is concentrated in the top three rollups. The long tail is subsidised by incentives.",
        },
        {
          title: "DA layer revenue",
          publisher: "L2BEAT",
          kind: "dataset",
          note: "DA fee revenue is up 22% quarter-over-quarter. The top layer captures 61% of fees.",
        },
        {
          title: "Airdrop and unlock overhang",
          publisher: "Dune",
          kind: "dataset",
          note: "Seven L2 tokens have unlocks greater than 5% of float in the next six months. Supply is the sector's biggest headwind.",
        },
      ],
      observations: [
        "Fee capture is concentrated. The top two rollups make most of the revenue; the rest are subsidies.",
        "Blob fees are a cleaner metric than TVL because they cannot be incentivised with a token.",
        "Unlock overhang is the sector-wide problem. Position sizing must account for it.",
      ],
      decision:
        "Add ARB, OP, TIA and DYDX, trim ALT and USDC.",
      reasoning: [
        "The L2 sector is not a single trade. Two rollups have real fee capture, clean unlock profiles and improving organic usage. The rest are liquidity-mining programs with a token attached. I am buying the fee capture and ignoring the TVL race.",
        "The appchain add is a bet on demand for blockspace, not on any specific app. If blob fees keep rising and the top two rollups keep gaining share, this portfolio works. If the unlock wave overwhelms demand, cash is the hedge.",
      ],
      actions: [
        "ARB 10% → 11%",
        "OP 8% → 9%",
        "TIA 10% → 11%",
        "DYDX 8% → 9%",
        "ALT 12% → 11%",
        "USDC 18% → 15%",
      ],
      target: [
        { label: "ARB", weight: 11 },
        { label: "OP", weight: 9 },
        { label: "TIA", weight: 11 },
        { label: "EIGEN", weight: 6 },
        { label: "DYDX", weight: 9 },
        { label: "IMX", weight: 6 },
        { label: "ALT", weight: 11 },
        { label: "ETH", weight: 14 },
        { label: "LINK", weight: 8 },
        { label: "USDC", weight: 15 },
      ],
      tags: ["blob fees", "fee capture", "unlocks"],
    },
  ],
};
