export type Allocation = {
  label: string;
  weight: number;
};

export type SourceKind =
  | "filing"
  | "dataset"
  | "news"
  | "social"
  | "paper"
  | "market"
  | "api";

export type Source = {
  title: string;
  publisher: string;
  kind: SourceKind;
  note: string;
};

export type Report = {
  id: string;
  date: string;
  time: string;
  title: string;
  dek: string;
  confidence: number;
  horizon: string;
  nav: string;
  sources: Source[];
  observations: string[];
  decision: string;
  reasoning: string[];
  actions: string[];
  target: Allocation[];
  before?: Allocation[];
  after?: Allocation[];
  tags: string[];
};

export type Agent = {
  symbol: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  color: string;
  palette: string[];
  price: number;
  change24h: number;
  change7d: number;
  change30d: number;
  volume24h: number;
  aum: number;
  supply: number;
  holders: number;
  inception: string;
  fee: string;
  benchmark: string;
  model: string;
  cadence: string;
  risk: "Low" | "Medium" | "High" | "Extreme";
  status: "live";
  nextRun: string;
  temperature: number;
  context: string;
  tools: string[];
  constraints: string[];
  systemPrompt: string;
  thesis: string;
  memory: string[];
  initialAllocation: Allocation[];
  reports: Report[];
  allocation?: Allocation[];
};

export type Candle = {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
};

export type Timeframe = "1H" | "4H" | "1D" | "1W";

export type OrderRow = {
  price: number;
  size: number;
  total: number;
};

export type MarketTrade = {
  price: number;
  size: number;
  side: "buy" | "sell";
  time: string;
};
