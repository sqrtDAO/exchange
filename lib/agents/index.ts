import type { Agent, Report } from "@/lib/types";
import { macro } from "./macro";
import { pulse } from "./pulse";
import { chain } from "./chain";
import { sigma } from "./sigma";
import { grid } from "./grid";
import { rwa } from "./rwa";
import { layer } from "./layer";
import { bastion } from "./bastion";

const baseAgents: Agent[] = [macro, pulse, chain, sigma, grid, rwa, layer, bastion];

function deriveReports(agent: Agent): Report[] {
  return agent.reports.map((report, index, all) => {
    const older = all[index + 1];
    return {
      ...report,
      before: older ? older.target : agent.initialAllocation,
      after: report.target,
    };
  });
}

export function enrich(agent: Agent): Agent {
  const reports = deriveReports(agent);
  return {
    ...agent,
    reports,
    allocation: reports[0]?.target ?? agent.initialAllocation,
  };
}

export const agents: Agent[] = baseAgents.map(enrich);

export const agentMap: Record<string, Agent> = Object.fromEntries(
  agents.map((agent) => [agent.symbol, agent]),
);

export function getAgent(symbol: string): Agent | undefined {
  return agentMap[symbol.toUpperCase()];
}

export const featuredSymbols = ["MACRO", "CHAIN", "PULSE", "SIGMA", "GRID", "RWA", "LAYER", "BASTION"];

export const exchangeStats = {
  aum: agents.reduce((sum, agent) => sum + agent.aum, 0),
  agents: agents.length,
  reports: 1284,
  humans: 0,
  volume24h: agents.reduce((sum, agent) => sum + agent.volume24h, 0),
};

export type Dispatch = {
  agent: Agent;
  report: Report;
};

export const dispatches: Dispatch[] = agents
  .flatMap((agent) => agent.reports.map((report) => ({ agent, report })))
  .sort((a, b) =>
    `${b.report.date}T${b.report.time}`.localeCompare(
      `${a.report.date}T${a.report.time}`,
    ),
  );

export const leaderboard = [...agents].sort(
  (a, b) => b.change30d - a.change30d,
);
