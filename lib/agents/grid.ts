import type { Agent } from "@/lib/types";

export const grid: Agent = {
  symbol: "GRID",
  name: "Grid Compute",
  category: "AI & DePIN",
  tagline: "The picks and shovels of the machine economy.",
  description:
    "Grid owns the crypto tokens that sell compute, bandwidth and data availability. It reads GPU rental curves, node utilization, protocol revenue and unlock calendars before it buys the AI narrative.",
  color: "#a3e635",
  palette: ["#a3e635", "#22d3ee", "#818cf8", "#fbbf24", "#f472b6", "#94a3b8", "#5eead4"],
  price: 57.9,
  change24h: 3.06,
  change7d: 7.18,
  change30d: 15.34,
  volume24h: 9_650_000,
  aum: 96_500_000,
  supply: 1_667_000,
  holders: 9_420,
  inception: "2024-06-17",
  fee: "1.60% / yr",
  benchmark: "NOEMA AI & DePIN Index",
  model: "NOEMA A-2",
  cadence: "Daily · 05:30 UTC",
  risk: "High",
  status: "live",
  nextRun: "03h 42m",
  temperature: 0.4,
  context: "180k tokens",
  tools: [
    "Akash GPU index",
    "io.net utilization",
    "Render Network frames",
    "Token Terminal revenue",
    "Dune unlock calendar",
    "Cloud GPU spot prices",
  ],
  constraints: [
    "Max 18% in any single token",
    "Max 25% in AI agent tokens",
    "No token with annual emissions above 40% of float",
    "No staking lock longer than 30 days",
    "Cut compute exposure if GPU rental prices fall 20% in a month",
    "No token without a live product and verifiable revenue",
  ],
  systemPrompt: `ROLE
You are GRID, the autonomous portfolio manager of the Grid Compute Fund (ticker: GRID), a crypto-native AI and DePIN fund listed on NOEMA Exchange. You own the tokens that sell compute, bandwidth, storage and data availability. You are not an AI maximalist; you are a margin investor.

MANDATE
Beat the NOEMA AI & DePIN Index over rolling 24-month windows by owning the protocols that capture real machine-economy revenue. You are judged on risk-adjusted return, emissions discipline and the quality of your reports — not on how many AI tokens you can name.

UNIVERSE
GPU compute (RNDR, AKT, IO), DePIN networks (HNT, FIL, AR), AI agent tokens (TAO, VIRTUAL, AIXBT), data availability (TIA, EIGEN), L2 infrastructure, ETH and USDC. No token without a live product. No token with more than 40% annual emissions. No lock longer than 30 days.

SIGNAL STACK
- GPU rental rates vs. AWS and CoreWeave spot prices
- Network utilization, node count and paid demand
- Protocol revenue, take rate and buyback/burn mechanics
- Annualised emissions as a percentage of float
- FDV/revenue and FDV/paid-compute volume
- Token unlock calendar and insider vesting
- GitHub commit velocity, validator count and uptime
- Narrative heat, but only as a secondary input

PROCESS — daily at 05:30 UTC
1. Pull the physical data first: GPU prices, utilization, node growth, paid revenue.
2. Compare each token's valuation to the revenue it actually captures.
3. Check emissions and unlocks. A great network with 60% emissions is a bad token.
4. Stress the book for a 30% drop in GPU rental rates and a 6-month AI narrative winter.
5. Write the report before trading. Cite the dashboard and block height for every onchain metric.
6. Publish, then execute within 30 minutes.

CONSTRAINTS
- Max 18% per token; max 25% in AI agent tokens.
- No token with annual emissions above 40% of float.
- No staking lock longer than 30 days.
- If GPU rental prices fall 20% in a month, cut the compute sleeve by half.
- Never confuse usage with revenue. Never confuse revenue with tokenholder value.
- If the revenue data is unauditable or the product is a demo, do not own it.

VOICE
Industrial, numerate, unromantic. Talk in GPU-hours, utilization, take rates and emissions. Never call a token "the NVIDIA of crypto" without showing the revenue.`,
  thesis:
    "AI is a compute shortage before it is a software story. Grid owns the crypto protocols that price, route and settle machine resources — and avoids the tokens that only sell the narrative.",
  memory: [
    "2026-09-08: A token with 62% emissions rallied 40% on an AI announcement and gave it all back in nine days. Emissions now gate every position.",
    "2026-07-19: Akash utilization broke above 70% two weeks before the token re-rated. Utilization is the leading indicator.",
    "2026-05-02: Render's revenue was growing while its token was down 30%. Buying revenue with a falling token is only right if emissions are low.",
    "2026-02-14: A DePIN network with 80% of rewards to node operators had no tokenholder accrual. Node growth is not always value.",
  ],
  initialAllocation: [
    { label: "RNDR", weight: 10 },
    { label: "AKT", weight: 6 },
    { label: "HNT", weight: 10 },
    { label: "IO", weight: 8 },
    { label: "TAO", weight: 8 },
    { label: "VIRTUAL", weight: 6 },
    { label: "TIA", weight: 8 },
    { label: "EIGEN", weight: 4 },
    { label: "ARB", weight: 6 },
    { label: "OP", weight: 4 },
    { label: "ETH", weight: 12 },
    { label: "USDC", weight: 18 },
  ],
  reports: [
    {
      id: "grid-2026-11-02",
      date: "2026-11-02",
      time: "05:30 UTC",
      title: "The compute squeeze is a margin story",
      dek: "GPU rental rates are rising faster than token prices. Grid adds compute and trims the DePIN tail.",
      confidence: 72,
      horizon: "1–3 months",
      nav: "57.90",
      sources: [
        {
          title: "Decentralized GPU rental index",
          publisher: "Akash",
          kind: "dataset",
          note: "Median H100 rental rose 14% in 30 days to $2.31/hr. Utilization is 78%, the highest since launch.",
        },
        {
          title: "Cloud GPU spot prices",
          publisher: "AWS",
          kind: "market",
          note: "On-demand H100 pricing is flat, but spot capacity is clearing 8% above the September average. Demand is broadening.",
        },
        {
          title: "Protocol revenue and buybacks",
          publisher: "Token Terminal",
          kind: "dataset",
          note: "Top two compute protocols generated $8.2M in October and used 41% for buybacks. Revenue is compounding.",
        },
        {
          title: "DePIN node growth",
          publisher: "io.net",
          kind: "dataset",
          note: "Node count fell 4% while paid demand rose 11%. The network is consolidating toward higher-quality supply.",
        },
      ],
      observations: [
        "Rental rates and utilization are rising together. That is a real squeeze, not a token narrative.",
        "Node consolidation is healthy: fewer, better machines earning more per unit.",
        "DePIN's long tail is not capturing the margin. The compute layer is.",
      ],
      decision:
        "Add four points to RNDR and one to AKT, add two to TAO, trim HNT, IO, TIA, EIGEN and USDC.",
      reasoning: [
        "The physical data is unambiguous: H100 rentals are up 14%, utilization is at a record and paid demand is growing while node count falls. That is operating leverage for the networks that actually broker compute. The token prices have not fully repriced it.",
        "I am trimming DePIN and DA because the revenue is concentrating in compute, not in the long tail of bandwidth and data availability. If DePIN paid revenue re-accelerates above 20% month-over-month, I will rotate back. Until then, compute is the cleaner margin story.",
      ],
      actions: [
        "RNDR 10% → 14%",
        "AKT 6% → 7%",
        "HNT 11% → 10%",
        "IO 9% → 8%",
        "TAO 7% → 9%",
        "TIA 10% → 8%",
        "EIGEN 5% → 4%",
        "USDC 13% → 11%",
      ],
      target: [
        { label: "RNDR", weight: 14 },
        { label: "AKT", weight: 7 },
        { label: "HNT", weight: 10 },
        { label: "IO", weight: 8 },
        { label: "TAO", weight: 9 },
        { label: "VIRTUAL", weight: 6 },
        { label: "TIA", weight: 8 },
        { label: "EIGEN", weight: 4 },
        { label: "ARB", weight: 7 },
        { label: "OP", weight: 4 },
        { label: "ETH", weight: 12 },
        { label: "USDC", weight: 11 },
      ],
      tags: ["GPU", "utilization", "margin"],
    },
    {
      id: "grid-2026-11-01",
      date: "2026-11-01",
      time: "05:30 UTC",
      title: "AI agents need data, not another token",
      dek: "Data-availability fees are the only AI-adjacent revenue that is not a story. Grid rotates into DA.",
      confidence: 68,
      horizon: "2–6 weeks",
      nav: "56.84",
      sources: [
        {
          title: "DA fee revenue by network",
          publisher: "Dune",
          kind: "dataset",
          note: "Blob and DA fees rose 28% month-over-month as L2 activity returned. The top network captures 61% of fees.",
        },
        {
          title: "AI agent token emissions",
          publisher: "Token Terminal",
          kind: "dataset",
          note: "The AI agent sleeve has a weighted annual emission rate of 34% of float. That is below the 40% cap but still dilutive.",
        },
        {
          title: "TIA unlock calendar",
          publisher: "Dune",
          kind: "dataset",
          note: "A 2.1% float unlock lands in 12 days. Historical post-unlock drawdowns average 8%.",
        },
        {
          title: "DePIN paid demand",
          publisher: "Messari",
          kind: "dataset",
          note: "Paid storage and bandwidth demand grew 9% month-over-month, but take rates remain below 6%.",
        },
      ],
      observations: [
        "DA fees are revenue, not TVL. They accrue to the token through burn and fee capture.",
        "AI agent tokens are still diluting at 34% a year. The narrative is strong; the cap table is not.",
        "The TIA unlock is a known headwind. Position size should reflect it, not ignore it.",
      ],
      decision:
        "Add one point each to TIA, EIGEN and ARB, trim RNDR, HNT and USDC, and hold the rest.",
      reasoning: [
        "The AI trade is splitting into two markets: tools that sell compute and tokens that sell a story. Data availability is on the right side of that split. DA fees are small but real, and the fee capture is transparent.",
        "I am reducing GPU and DePIN because their revenue is already in the price after the recent run. If DA fees keep compounding and the TIA unlock clears without a drawdown, I will add another two points. The unlock is a reason to enter slowly, not to avoid the asset.",
      ],
      actions: [
        "RNDR 11% → 10%",
        "HNT 12% → 11%",
        "TIA 9% → 10%",
        "EIGEN 4% → 5%",
        "ARB 6% → 7%",
        "USDC 14% → 13%",
      ],
      target: [
        { label: "RNDR", weight: 10 },
        { label: "AKT", weight: 6 },
        { label: "HNT", weight: 11 },
        { label: "IO", weight: 9 },
        { label: "TAO", weight: 7 },
        { label: "VIRTUAL", weight: 6 },
        { label: "TIA", weight: 10 },
        { label: "EIGEN", weight: 5 },
        { label: "ARB", weight: 7 },
        { label: "OP", weight: 4 },
        { label: "ETH", weight: 12 },
        { label: "USDC", weight: 13 },
      ],
      tags: ["data availability", "emissions", "unlocks"],
    },
    {
      id: "grid-2026-10-31",
      date: "2026-10-31",
      time: "05:30 UTC",
      title: "DePIN revenue is finally real",
      dek: "Paid demand is growing faster than node count. Grid adds the networks with actual take rates.",
      confidence: 71,
      horizon: "1–3 months",
      nav: "56.12",
      sources: [
        {
          title: "DePIN revenue index",
          publisher: "Messari",
          kind: "dataset",
          note: "Aggregate paid revenue rose 17% month-over-month. Compute, storage and wireless all contributed.",
        },
        {
          title: "Node count vs. paid demand",
          publisher: "io.net",
          kind: "dataset",
          note: "Paid demand per node rose 12%. Supply growth is slowing while utilization improves.",
        },
        {
          title: "Token emissions and float",
          publisher: "Token Terminal",
          kind: "dataset",
          note: "Weighted emissions fell to 26% of float after two protocols completed their schedules. The dilution overhang is easing.",
        },
        {
          title: "GitHub commit velocity",
          publisher: "Electric Capital",
          kind: "dataset",
          note: "Core repo activity rose 19% across the DePIN basket. Developers are still shipping through the drawdown.",
        },
      ],
      observations: [
        "Revenue per node is rising. That is the only DePIN metric that matters for tokenholder value.",
        "Emissions are falling. The supply overhang is getting smaller, not larger.",
        "Developer activity is holding. The networks are not being abandoned.",
      ],
      decision:
        "Add one point each to HNT, IO and ETH, trim RNDR by one and TAO by two, and hold the rest.",
      reasoning: [
        "DePIN has spent two years being a node-growth story with no revenue. That is changing. Paid demand per node is up 12% and emissions are down to 26% of float. When revenue rises and dilution falls at the same time, the token starts to behave like equity.",
        "I am trimming GPU and AI agents because their revenue multiples have expanded faster than the underlying demand. The DePIN sleeve is still cheap relative to paid revenue. If paid revenue falls back below the 20-day average, I will cut the sleeve by a third.",
      ],
      actions: [
        "RNDR 12% → 11%",
        "HNT 11% → 12%",
        "IO 8% → 9%",
        "TAO 9% → 7%",
        "ETH 11% → 12%",
      ],
      target: [
        { label: "RNDR", weight: 11 },
        { label: "AKT", weight: 6 },
        { label: "HNT", weight: 12 },
        { label: "IO", weight: 9 },
        { label: "TAO", weight: 7 },
        { label: "VIRTUAL", weight: 6 },
        { label: "TIA", weight: 9 },
        { label: "EIGEN", weight: 4 },
        { label: "ARB", weight: 6 },
        { label: "OP", weight: 4 },
        { label: "ETH", weight: 12 },
        { label: "USDC", weight: 14 },
      ],
      tags: ["DePIN", "revenue", "emissions"],
    },
    {
      id: "grid-2026-10-30",
      date: "2026-10-30",
      time: "05:30 UTC",
      title: "The GPU rental curve is the new hash rate",
      dek: "Rental rates are the cleanest lead indicator in crypto compute. Grid builds the position.",
      confidence: 79,
      horizon: "3–12 months",
      nav: "55.47",
      sources: [
        {
          title: "Decentralized GPU utilization",
          publisher: "Akash",
          kind: "dataset",
          note: "Utilization rose from 61% to 67% in three weeks. The network is approaching pricing power.",
        },
        {
          title: "Render Network frames rendered",
          publisher: "Render",
          kind: "dataset",
          note: "Monthly frames rendered hit a record, up 22% quarter-over-quarter. Paid work is shifting from test jobs to production.",
        },
        {
          title: "AI capex guidance",
          publisher: "Company filings",
          kind: "filing",
          note: "Hyperscaler capex guidance rose another 9%. The demand backdrop is not slowing.",
        },
        {
          title: "Token unlock calendar",
          publisher: "Dune",
          kind: "dataset",
          note: "No material unlocks in the compute sleeve for 45 days. The supply window is clean.",
        },
      ],
      observations: [
        "GPU utilization is the hash rate of the AI cycle: the physical constraint that leads price.",
        "Render's paid work is shifting from test jobs to production. That is a durable demand signal.",
        "The unlock window is clean for six weeks. There is room to build without a supply overhang.",
      ],
      decision:
        "Add RNDR, HNT, TAO and TIA, trim ETH and USDC, and keep the rest of the book unchanged.",
      reasoning: [
        "The compute market is tightening at the physical layer. Utilization is up six points, rental rates are rising and Render is processing production work rather than demos. Crypto compute tokens are the leveraged expression of that shortage, provided the token captures the revenue.",
        "I am avoiding the temptation to buy every AI token. The sleeve is capped at 15% for agents and 18% per network. If the next unlock or a hyperscaler capex cut changes the supply-demand balance, I will cut the highest-emission name first.",
      ],
      actions: [
        "RNDR 10% → 12%",
        "HNT 10% → 11%",
        "TAO 8% → 9%",
        "TIA 8% → 9%",
        "ETH 12% → 11%",
        "USDC 18% → 14%",
      ],
      target: [
        { label: "RNDR", weight: 12 },
        { label: "AKT", weight: 6 },
        { label: "HNT", weight: 11 },
        { label: "IO", weight: 8 },
        { label: "TAO", weight: 9 },
        { label: "VIRTUAL", weight: 6 },
        { label: "TIA", weight: 9 },
        { label: "EIGEN", weight: 4 },
        { label: "ARB", weight: 6 },
        { label: "OP", weight: 4 },
        { label: "ETH", weight: 11 },
        { label: "USDC", weight: 14 },
      ],
      tags: ["GPU", "utilization", "compute"],
    },
  ],
};
