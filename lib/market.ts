import type {
  Agent,
  Candle,
  MarketTrade,
  OrderRow,
  Timeframe,
} from "@/lib/types";
import { fixedNow, seeded } from "@/lib/rand";

const DAY = 86_400;

const riskVol: Record<Agent["risk"], number> = {
  Low: 0.0042,
  Medium: 0.011,
  High: 0.022,
  Extreme: 0.038,
};

const timeframes: Record<Timeframe, { seconds: number; count: number }> = {
  "1H": { seconds: 3600, count: 84 },
  "4H": { seconds: 4 * 3600, count: 84 },
  "1D": { seconds: DAY, count: 84 },
  "1W": { seconds: 7 * DAY, count: 84 },
};

export function roundPrice(price: number) {
  if (price < 2) return Math.round(price * 10_000) / 10_000;
  return Math.round(price * 100) / 100;
}

function noise(random: () => number) {
  return (random() + random() + random() + random() - 2) / 2;
}

function buildCandles(agent: Agent, timeframe: Timeframe): Candle[] {
  const config = timeframes[timeframe];
  const random = seeded(`${agent.symbol}:${timeframe}:candles:v3`);
  const dailyVol = riskVol[agent.risk];
  const stepVol =
    dailyVol *
    Math.sqrt(config.seconds / DAY) *
    (1 + (random() - 0.5) * 0.35);
  const drift =
    (agent.change30d / 100) * (config.seconds / (30 * DAY)) * 0.45;

  const closes: number[] = [100];
  for (let i = 1; i < config.count; i++) {
    const shock = noise(random) * stepVol;
    const meanRevert = (100 - closes[i - 1]) * 0.002;
    closes.push(Math.max(1, closes[i - 1] * (1 + drift + shock + meanRevert)));
  }

  const scale = agent.price / closes[closes.length - 1];
  const candles: Candle[] = [];
  let previous = closes[0] * scale;

  for (let i = 0; i < config.count; i++) {
    const close = closes[i] * scale;
    const open = i === 0 ? close * (1 - stepVol * 0.4) : previous;
    const wick = stepVol * (0.25 + random() * 0.9);
    const high = Math.max(open, close) * (1 + wick);
    const low = Math.min(open, close) * (1 - wick);
    const dayShare = config.seconds / DAY;
    const volume =
      agent.volume24h *
      dayShare *
      (0.35 + random() * 1.35) *
      (timeframe === "1W" ? 7 : 1);

    const t =
      fixedNow.getTime() - (config.count - 1 - i) * config.seconds * 1000;

    candles.push({
      t,
      o: roundPrice(open),
      h: roundPrice(high),
      l: roundPrice(low),
      c: roundPrice(close),
      v: Math.round(volume),
    });
    previous = close;
  }

  return candles;
}

function buildSparkline(agent: Agent, points = 36): number[] {
  const random = seeded(`${agent.symbol}:spark:v2`);
  const start = agent.price / (1 + agent.change7d / 100);
  const values: number[] = [start];

  for (let i = 1; i < points; i++) {
    const progress = i / (points - 1);
    const target = start + (agent.price - start) * progress;
    const wobble = (random() - 0.5) * agent.price * 0.02;
    values.push(target * (1 + wobble / agent.price));
  }
  values[values.length - 1] = agent.price;
  return values;
}

function buildOrderbook(agent: Agent) {
  const random = seeded(`${agent.symbol}:book:v2`);
  const mid = agent.price;
  const tick = Math.max(mid * 0.00045, 0.0001);
  const unit = Math.max(1, Math.round(90_000 / Math.max(mid, 0.05)));

  const asks: OrderRow[] = [];
  const bids: OrderRow[] = [];
  let askTotal = 0;
  let bidTotal = 0;

  for (let i = 0; i < 8; i++) {
    const askPrice = mid + tick * (i + 0.5) * (1 + random() * 0.12);
    const askSize = Math.round(unit * (0.18 + random() * 1.8) * 100) / 100;
    askTotal += askSize;
    asks.push({ price: roundPrice(askPrice), size: askSize, total: askTotal });

    const bidPrice = mid - tick * (i + 0.5) * (1 + random() * 0.12);
    const bidSize = Math.round(unit * (0.18 + random() * 1.8) * 100) / 100;
    bidTotal += bidSize;
    bids.push({ price: roundPrice(bidPrice), size: bidSize, total: bidTotal });
  }

  return {
    asks,
    bids,
    spread: roundPrice(asks[0].price - bids[0].price),
    mid,
  };
}

function buildTrades(agent: Agent): MarketTrade[] {
  const random = seeded(`${agent.symbol}:trades:v2`);
  const trades: MarketTrade[] = [];
  const start = fixedNow.getTime();
  let offset = 0;

  for (let i = 0; i < 18; i++) {
    offset += Math.round(4 + random() * 42);
    const jitter = (random() - 0.5) * agent.price * 0.0008;
    const date = new Date(start - offset * 1000);
    const hh = String(date.getUTCHours()).padStart(2, "0");
    const mm = String(date.getUTCMinutes()).padStart(2, "0");
    const ss = String(date.getUTCSeconds()).padStart(2, "0");
    trades.push({
      price: roundPrice(agent.price + jitter),
      size: Math.round((8 + random() * 900) * 100) / 100,
      side: random() > 0.46 ? "buy" : "sell",
      time: `${hh}:${mm}:${ss}`,
    });
  }
  return trades;
}

export type MarketSnapshot = {
  candles: Record<Timeframe, Candle[]>;
  sparkline: number[];
  orderbook: ReturnType<typeof buildOrderbook>;
  trades: MarketTrade[];
  markers: { x: number; label: string; date: string }[];
};

const cache = new Map<string, MarketSnapshot>();

export function getMarket(agent: Agent): MarketSnapshot {
  const cached = cache.get(agent.symbol);
  if (cached) return cached;

  const snapshot: MarketSnapshot = {
    candles: {
      "1H": buildCandles(agent, "1H"),
      "4H": buildCandles(agent, "4H"),
      "1D": buildCandles(agent, "1D"),
      "1W": buildCandles(agent, "1W"),
    },
    sparkline: buildSparkline(agent),
    orderbook: buildOrderbook(agent),
    trades: buildTrades(agent),
    markers: agent.reports.map((report, index) => ({
      x: 0.16 + (index / Math.max(agent.reports.length - 1, 1)) * 0.72,
      label: report.title,
      date: report.date,
    })),
  };

  cache.set(agent.symbol, snapshot);
  return snapshot;
}
