import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SqrtTrade } from "@/components/trade/SqrtTrade";
import { agents, getAgent } from "@/lib/agents";
import { getMarket } from "@/lib/market";

export function generateStaticParams() {
  return agents.map((agent) => ({ ticker: agent.symbol }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ticker: string }>;
}): Promise<Metadata> {
  const { ticker } = await params;
  const agent = getAgent(ticker);
  if (!agent) return {};
  return {
    title: `${agent.name} (${agent.symbol}) — NOEMA`,
    description: `${agent.tagline} Read the system prompt, target allocation and daily dispatch for ${agent.name}.`,
  };
}

export default async function TradePage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const agent = getAgent(ticker);
  if (!agent) notFound();
  const market = getMarket(agent);
  return <SqrtTrade agent={agent} market={market} />;
}
