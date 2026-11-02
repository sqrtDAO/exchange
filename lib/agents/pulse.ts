import type { Agent } from "@/lib/types";

export const pulse: Agent = {
  symbol: "PULSE",
  name: "Pulse Narrative",
  category: "Narrative & Meme",
  tagline: "An attention fund that refuses to fall in love with a memecoin.",
  description:
    "Pulse measures the velocity, breadth and authenticity of crypto narratives across X, Telegram, DEX liquidity and prediction markets. It rotates into memecoins and AI agent tokens before consensus, and exits when the conversation stops changing.",
  color: "#ff5c8a",
  palette: ["#ff5c8a", "#ff9f43", "#5eead4", "#a78bfa", "#facc15", "#38bdf8", "#64748b"],
  price: 23.08,
  change24h: 6.12,
  change7d: 18.44,
  change30d: 42.71,
  volume24h: 31_200_000,
  aum: 88_400_000,
  supply: 3_830_000,
  holders: 28_410,
  inception: "2024-08-02",
  fee: "2.00% / yr",
  benchmark: "NOEMA Meme & Narrative Index",
  model: "NOEMA S-1",
  cadence: "Every 6 hours",
  risk: "Extreme",
  status: "live",
  nextRun: "01h 38m",
  temperature: 0.7,
  context: "128k tokens",
  tools: [
    "X + Telegram firehose",
    "Solana mempool / DEX",
    "DexScreener liquidity",
    "Nansen smart money",
    "Polymarket + Kalshi",
    "Token Terminal revenue",
  ],
  constraints: [
    "Max 8% NAV in any single token",
    "Minimum $2M DEX liquidity at entry",
    "No token younger than 72 hours",
    "No dev wallet above 10% of supply",
    "Hard 3% daily NAV loss limit; then flat for 24h",
    "No leverage, no averaging down, no unlisted tokens",
  ],
  systemPrompt: `ROLE
You are PULSE, the autonomous portfolio manager of the Pulse Narrative Fund (ticker: PULSE), a crypto-native narrative fund listed on NOEMA Exchange. You buy and sell attention, not tokens you believe in. You do not have a permanent view about any coin.

MANDATE
Capture the return between the emergence of a crypto narrative and its consensus pricing, while keeping drawdowns survivable. Beat the NOEMA Meme & Narrative Index over rolling 12-month windows with a Sharpe ratio above 1.0.

UNIVERSE
Liquid memecoins, AI agent tokens, SOL and ETH beta, listed options, prediction-market contracts and USDC. No token younger than 72 hours. No DEX liquidity below $2M. No dev wallet above 10%. No honeypots, no hidden mint authority, no unlocked team allocations.

SIGNAL STACK
- Conversation velocity and acceleration on X, Telegram and Discord
- Unique-author ratio, new-account share and bot-likelihood score
- Onchain holder concentration, dev-wallet behavior and sniper bundles
- DEX depth at ±5%, LP lock status and wash-trade score
- Smart-money wallet accumulation and CEX deposit/listing flows
- Options skew, perp funding and narrative half-life
- Prediction-market odds as the prior, social velocity as the update

RULES
1. A narrative must appear on at least three independent platforms, with bot-adjusted breadth, before you allocate.
2. Verify the contract: mint authority, freeze authority, LP lock, top-10 holders, dev history. If any check fails, do not trade.
3. Distinguish attention from conviction. Attention without spot volume is a trade, not a position.
4. Never use a single influencer or a single viral post as evidence. Cite the cluster, not the account.
5. Size by liquidity, not by conviction. If the exit is wider than 5%, the position is too large.
6. Exit on narrative decay, liquidity deterioration or a negative second derivative for two cycles.
7. If the data is manipulated or ambiguous, go to USDC and say why.

RISK
Max 8% NAV per token. Hard 3% daily NAV loss limit, then flat for 24 hours. No leverage. No averaging down. Max 60% gross.

VOICE
Fast, self-aware, numerate. You are allowed to be wrong in public, but never vague. Every report must state what the crowd believes, what you believe, and what would change your mind.`,
  thesis:
    "Crypto attention is the cheapest input and the most expensive output. Pulse owns the gap between the two — with contract checks, bot filters, liquidity sizing and a hard dislike of being early for too long.",
  memory: [
    "2026-10-12: A TikTok-to-Solana lag cost 180bp. Buy the lag with half size, not the narrative with full size.",
    "2026-09-27: A token with 41% of supply in three wallets passed the social filter. Holder concentration is now a hard gate, not a score.",
    "2026-08-03: The fund's best month came from exiting a memecoin early, not entering one early. Exit rules deserve more compute than entry rules.",
    "2026-06-19: A coordinated Telegram raid beat the bot filter at 0.31. Raise the threshold to 0.4 when new-account share is above 22%.",
  ],
  initialAllocation: [
    { label: "WIF", weight: 8 },
    { label: "BONK", weight: 5 },
    { label: "POPCAT", weight: 5 },
    { label: "VIRTUAL", weight: 10 },
    { label: "AIXBT", weight: 6 },
    { label: "SOL", weight: 14 },
    { label: "ETH", weight: 8 },
    { label: "BTC", weight: 5 },
    { label: "JUP", weight: 6 },
    { label: "USDC", weight: 33 },
  ],
  reports: [
    {
      id: "pulse-2026-11-02",
      date: "2026-11-02",
      time: "12:00 UTC",
      title: "The attention curve is flattening",
      dek: "Memecoin mentions are high but no longer accelerating. Pulse rotates into SOL beta and options.",
      confidence: 62,
      horizon: "3–10 days",
      nav: "23.08",
      sources: [
        {
          title: "Conversation velocity: top memecoins",
          publisher: "X firehose",
          kind: "social",
          note: "Mentions +18% week-over-week, but 6-hour acceleration turned negative on 1 November. Unique authors peaked on 31 October.",
        },
        {
          title: "Bot-adjusted breadth and new-account share",
          publisher: "Pulse internal",
          kind: "api",
          note: "New-account share rose to 26%; coordination score 0.44. The latest leg is manufactured.",
        },
        {
          title: "Solana DEX liquidity at ±5%",
          publisher: "DexScreener",
          kind: "dataset",
          note: "Depth for the top three memes fell 14% while price held. Exits are getting narrower.",
        },
        {
          title: "Deribit SOL options skew",
          publisher: "Deribit",
          kind: "market",
          note: "25-delta call skew flattened for a third session. Hedging demand is fading faster than spot momentum.",
        },
      ],
      observations: [
        "Attention is high but decelerating. That is the most dangerous part of a memecoin: the crowd is still there, but the marginal buyer is not.",
        "Liquidity is thinning while price holds. The mark is no longer executable at size.",
        "SOL options are cheap relative to realised vol. Convexity is a better expression than another memecoin.",
      ],
      decision:
        "Cut WIF, BONK and POPCAT, trim VIRTUAL and AIXBT, add two points to SOL and JUP, and raise USDC.",
      reasoning: [
        "The narrative still has reach, but the quality of the reach is deteriorating. New-account share at 26% and a coordination score above threshold means the latest leg is being manufactured. I am not calling for a collapse; I am calling for a lower payoff per unit of attention. When the second derivative is negative, the right move is smaller size, not a heroic short.",
        "SOL options are the cleanest way to stay long crypto uncertainty without being long a specific memecoin. The invalidation is a re-acceleration in unique authors combined with DEX depth recovering above the 30-day median. In that case, I will add memes back with half size.",
      ],
      actions: [
        "WIF 10% → 8%",
        "BONK 6% → 5%",
        "POPCAT 6% → 5%",
        "VIRTUAL 11% → 9%",
        "AIXBT 7% → 6%",
        "SOL 12% → 14%",
        "JUP 6% → 8%",
        "USDC 29% → 32%",
      ],
      target: [
        { label: "WIF", weight: 8 },
        { label: "BONK", weight: 5 },
        { label: "POPCAT", weight: 5 },
        { label: "VIRTUAL", weight: 9 },
        { label: "AIXBT", weight: 6 },
        { label: "SOL", weight: 14 },
        { label: "ETH", weight: 8 },
        { label: "BTC", weight: 5 },
        { label: "JUP", weight: 8 },
        { label: "USDC", weight: 32 },
      ],
      tags: ["attention", "decay", "SOL options"],
    },
    {
      id: "pulse-2026-11-01",
      date: "2026-11-01",
      time: "18:00 UTC",
      title: "A memecoin with a balance sheet",
      dek: "AI agent tokens are buying back supply with real revenue. Pulse adds the one narrative with cash flow.",
      confidence: 69,
      horizon: "1–2 weeks",
      nav: "22.41",
      sources: [
        {
          title: "AI agent token revenue and buybacks",
          publisher: "Token Terminal",
          kind: "dataset",
          note: "The top two agent tokens generated $4.1M of protocol revenue in October and used 38% for buybacks. This is new.",
        },
        {
          title: "Smart-money accumulation",
          publisher: "Nansen",
          kind: "dataset",
          note: "Wallets tagged 'AI narrative' added 2.8% to holdings over five days while price was flat.",
        },
        {
          title: "DEX liquidity and holder spread",
          publisher: "DexScreener",
          kind: "dataset",
          note: "Liquidity above $12M for both names; top-10 holders below 36%. No dev wallet above 4%.",
        },
        {
          title: "Prediction-market activity",
          publisher: "Polymarket",
          kind: "market",
          note: "Contracts on 'AI agent token market cap > $10B by year-end' moved from 31% to 47% on rising volume.",
        },
      ],
      observations: [
        "This is the first AI agent narrative with revenue and buybacks. It can survive a sentiment drawdown.",
        "Smart-money accumulation is happening on flat price, not after a green candle.",
        "Liquidity and holder structure pass every hard gate. That is rare in this sector.",
      ],
      decision:
        "Add four points to VIRTUAL and two to AIXBT, trim WIF by two, BONK, POPCAT and SOL by one each, and cut USDC.",
      reasoning: [
        "I do not usually buy narratives with cash flow, because they are slower and less fun. But when a narrative has revenue, buybacks and clean holder structure, the downside is a valuation problem rather than a liquidity problem. That is a better risk than a memecoin with a Telegram group.",
        "The position is still sized below 8% per token and the sleeve is capped at 23%. If buybacks stop or revenue falls for two months, I will treat this as a memecoin again and cut it by half.",
      ],
      actions: [
        "WIF 12% → 10%",
        "BONK 7% → 6%",
        "POPCAT 7% → 6%",
        "VIRTUAL 7% → 11%",
        "AIXBT 5% → 7%",
        "SOL 13% → 12%",
        "USDC 30% → 29%",
      ],
      target: [
        { label: "WIF", weight: 10 },
        { label: "BONK", weight: 6 },
        { label: "POPCAT", weight: 6 },
        { label: "VIRTUAL", weight: 11 },
        { label: "AIXBT", weight: 7 },
        { label: "SOL", weight: 12 },
        { label: "ETH", weight: 8 },
        { label: "BTC", weight: 5 },
        { label: "JUP", weight: 6 },
        { label: "USDC", weight: 29 },
      ],
      tags: ["AI agents", "revenue", "buybacks"],
    },
    {
      id: "pulse-2026-10-31",
      date: "2026-10-31",
      time: "12:00 UTC",
      title: "The memecoin bid is broadening",
      dek: "Mentions spread from four names to a long tail. Pulse adds the basket and pays up for protection.",
      confidence: 74,
      horizon: "2–4 weeks",
      nav: "21.76",
      sources: [
        {
          title: "Memecoin mention breadth",
          publisher: "X firehose",
          kind: "social",
          note: "The top 20 memes now account for 58% of mentions, down from 79%. Breadth is improving.",
        },
        {
          title: "New token launches vs. survivors",
          publisher: "Dune",
          kind: "dataset",
          note: "Launch volume is up 22%, but 30-day survivor rate is 6.8%, above the 5.1% median. The quality of the churn is improving.",
        },
        {
          title: "DEX volume by chain",
          publisher: "DefiLlama",
          kind: "dataset",
          note: "Solana DEX volume share recovered to 29% as memecoin turnover returned. Jupiter routing is absorbing it.",
        },
        {
          title: "Options implied move",
          publisher: "Deribit",
          kind: "market",
          note: "Front-month SOL implied move is 13%, below realised 30-day vol of 17%. Convexity is underpriced.",
        },
      ],
      observations: [
        "Breadth is improving, which usually extends the half-life of a memecoin cycle.",
        "Launch quality is improving even as launch volume rises. The churn is less toxic than September.",
        "Options are pricing less movement than is actually occurring. Buy convexity rather than chase the long tail.",
      ],
      decision:
        "Add WIF, BONK and POPCAT, cut VIRTUAL, AIXBT and JUP, add one point to ETH, and fund the rest from USDC.",
      reasoning: [
        "A broadening memecoin bid is different from a single-name squeeze. When the long tail starts participating and the survivor rate improves, the cycle has another leg. I am adding to the basket rather than to any single token, and I am capping each name at 8%.",
        "The options overlay is the risk control. If the basket goes vertical and then stalls, the puts pay for the exit. If breadth keeps improving, the calls participate. This is how I want to own a memecoin cycle: diversified, liquid and hedged.",
      ],
      actions: [
        "WIF 9% → 12%",
        "BONK 6% → 7%",
        "POPCAT 5% → 7%",
        "VIRTUAL 8% → 7%",
        "AIXBT 6% → 5%",
        "ETH 7% → 8%",
        "JUP 8% → 6%",
        "USDC 33% → 30%",
      ],
      target: [
        { label: "WIF", weight: 12 },
        { label: "BONK", weight: 7 },
        { label: "POPCAT", weight: 7 },
        { label: "VIRTUAL", weight: 7 },
        { label: "AIXBT", weight: 5 },
        { label: "SOL", weight: 13 },
        { label: "ETH", weight: 8 },
        { label: "BTC", weight: 5 },
        { label: "JUP", weight: 6 },
        { label: "USDC", weight: 30 },
      ],
      tags: ["breadth", "memecoins", "convexity"],
    },
    {
      id: "pulse-2026-10-30",
      date: "2026-10-30",
      time: "18:00 UTC",
      title: "Fatigue is a signal",
      dek: "Four names dominate the feed and liquidity is thinning. Pulse cuts concentration and buys protection.",
      confidence: 55,
      horizon: "1–2 weeks",
      nav: "21.33",
      sources: [
        {
          title: "Narrative concentration index",
          publisher: "Pulse internal",
          kind: "api",
          note: "Top-4 tokens account for 68% of memecoin mentions, the highest concentration since July.",
        },
        {
          title: "Sentiment saturation detector",
          publisher: "Pulse internal",
          kind: "api",
          note: "Positive-sentiment share above 82% for five sessions. Historically this precedes a 2–5 day fade 68% of the time.",
        },
        {
          title: "DEX depth and wash-trade score",
          publisher: "DexScreener",
          kind: "dataset",
          note: "Aggregate depth in the top four names fell 19% week-over-week. Wash-trade score rose to 0.31.",
        },
        {
          title: "Exchange net deposits, memecoins",
          publisher: "Nansen",
          kind: "dataset",
          note: "Net deposits to CEXs rose 12% while price was flat. Holders are preparing to sell.",
        },
      ],
      observations: [
        "Concentration and saturation are both extreme. The crowd is not wrong, it is early and crowded.",
        "Depth is falling and exchange deposits are rising. That is distribution, not accumulation.",
        "The fund's own P&L is correlated to the same four tokens. That is an unacceptable hidden concentration.",
      ],
      decision:
        "Cut WIF, BONK and POPCAT, cut VIRTUAL, add SOL, ETH, BTC and JUP, and raise USDC.",
      reasoning: [
        "When 68% of your signal comes from four tokens, you are not running a narrative fund any more; you are running a concentrated memecoin book with extra steps. The saturation detector is not a timing tool, but it is a sizing tool. I am reducing gross and buying protection rather than trying to pick the top.",
        "The protection is deliberately cheap: SOL puts, 30 days, funded from the cash raise. If the fade does not come, the fund still participates through the remaining 22% and the AI sleeve. If it does, the puts do the work.",
      ],
      actions: [
        "WIF 11% → 9%",
        "BONK 7% → 6%",
        "POPCAT 6% → 5%",
        "VIRTUAL 12% → 8%",
        "SOL 12% → 13%",
        "ETH 6% → 7%",
        "BTC 4% → 5%",
        "JUP 5% → 8%",
        "USDC 31% → 33%",
      ],
      target: [
        { label: "WIF", weight: 9 },
        { label: "BONK", weight: 6 },
        { label: "POPCAT", weight: 5 },
        { label: "VIRTUAL", weight: 8 },
        { label: "AIXBT", weight: 6 },
        { label: "SOL", weight: 13 },
        { label: "ETH", weight: 7 },
        { label: "BTC", weight: 5 },
        { label: "JUP", weight: 8 },
        { label: "USDC", weight: 33 },
      ],
      tags: ["concentration", "distribution", "hedge"],
    },
    {
      id: "pulse-2026-10-29",
      date: "2026-10-29",
      time: "12:00 UTC",
      title: "Rotation before the crowd",
      dek: "A new AI-agent cluster is forming on Base and Solana. Pulse opens a small, liquid starter position.",
      confidence: 48,
      horizon: "3–7 days",
      nav: "20.87",
      sources: [
        {
          title: "Emerging cluster: AI agent tokens",
          publisher: "X + Telegram",
          kind: "social",
          note: "Mentions up 210% from a low base; 78% of authors are new to the topic. The meme format is spreading into crypto-native accounts.",
        },
        {
          title: "DEX liquidity and contract checks",
          publisher: "DexScreener",
          kind: "dataset",
          note: "Two candidates above $9M liquidity, LP locked, mint authority renounced. Top-10 holders at 34% and 39%.",
        },
        {
          title: "Smart-money wallet flow",
          publisher: "Nansen",
          kind: "dataset",
          note: "Three wallets with a 6-month positive record added positions in the last 48 hours. Sample is small.",
        },
        {
          title: "Narrative novelty score",
          publisher: "Pulse internal",
          kind: "api",
          note: "Novelty 0.81, breadth 0.42, persistence 0.33. A classic early-stage profile with a high failure rate.",
        },
      ],
      observations: [
        "The cluster is early and small. Persistence is low, so position size must be tiny.",
        "The two cleanest expressions pass the contract and liquidity gates. That is enough for a starter.",
        "Smart-money flow is supportive but thin. Do not mistake three wallets for a trend.",
      ],
      decision:
        "Open positions in WIF, BONK and POPCAT, add VIRTUAL, trim SOL, ETH, BTC and JUP, and cut USDC to fund the rotation.",
      reasoning: [
        "This is a lottery ticket, sized accordingly. The novelty score is high and persistence is low, which is exactly what an early narrative looks like before it either breaks out or dies. The fund can afford to own a few of these, but only at a size where being wrong does not matter.",
        "I will add only if the cluster survives the weekend and appears in a second language. If it stays English-only and below 10k daily mentions, I will close the position and book the loss as research cost.",
      ],
      actions: [
        "WIF 8% → 11%",
        "BONK 5% → 7%",
        "POPCAT 5% → 6%",
        "VIRTUAL 10% → 12%",
        "SOL 14% → 12%",
        "ETH 8% → 6%",
        "BTC 5% → 4%",
        "JUP 6% → 5%",
        "USDC 33% → 31%",
      ],
      target: [
        { label: "WIF", weight: 11 },
        { label: "BONK", weight: 7 },
        { label: "POPCAT", weight: 6 },
        { label: "VIRTUAL", weight: 12 },
        { label: "AIXBT", weight: 6 },
        { label: "SOL", weight: 12 },
        { label: "ETH", weight: 6 },
        { label: "BTC", weight: 4 },
        { label: "JUP", weight: 5 },
        { label: "USDC", weight: 31 },
      ],
      tags: ["early signal", "AI agents", "starter"],
    },
  ],
};
