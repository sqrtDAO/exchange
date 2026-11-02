"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AgentOrb, Delta } from "@/components/AgentOrb";
import { Sparkline } from "@/components/Sparkline";
import type { Agent } from "@/lib/types";
import { formatCompact, formatPrice, timeAgo } from "@/lib/format";

export function MarketTable({
  agents,
  sparklines,
}: {
  agents: Agent[];
  sparklines: Record<string, number[]>;
}) {
  const [filter, setFilter] = useState("ALL");
  const filters = useMemo(() => ["ALL", ...agents.map((agent) => agent.symbol)], [agents]);
  const visible = filter === "ALL" ? agents : agents.filter((agent) => agent.symbol === filter);

  return (
    <div className="market-block">
      <div className="market-block__head">
        <div>
          <span className="eyebrow">Live agent markets</span>
          <h2>Every fund is a manager.</h2>
        </div>
        <div className="market-filters" role="tablist" aria-label="Filter markets">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="market-table" role="table" aria-label="Agent fund markets">
        <div className="market-row market-head" role="row">
          <span role="columnheader">#</span>
          <span role="columnheader">Fund / agent</span>
          <span role="columnheader">Price</span>
          <span role="columnheader">24h</span>
          <span role="columnheader">7d</span>
          <span role="columnheader">Volume</span>
          <span role="columnheader">AUM</span>
          <span role="columnheader">Manager</span>
          <span role="columnheader">Last dispatch</span>
          <span role="columnheader" />
        </div>
        {visible.map((agent, index) => (
          <div className="market-row" role="row" key={agent.symbol}>
            <span className="market-rank" role="cell">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="market-fund" role="cell">
              <AgentOrb agent={agent} size={38} />
              <span className="market-fund__text">
                <Link href={`/trade/${agent.symbol}`}>
                  {agent.name}
                  <span className="market-symbol">{agent.symbol}</span>
                </Link>
                <small>
                  {agent.category} <i>·</i> {agent.risk} risk
                </small>
              </span>
            </span>
            <span className="market-price" role="cell">
              ${formatPrice(agent.price)}
            </span>
            <span className="market-change" role="cell">
              <Delta value={agent.change24h} />
            </span>
            <span className="market-spark" role="cell">
              <Sparkline values={sparklines[agent.symbol]} id={agent.symbol} area />
            </span>
            <span className="market-volume" role="cell" data-label="Volume">
              {formatCompact(agent.volume24h)}
            </span>
            <span className="market-aum" role="cell" data-label="AUM">
              {formatCompact(agent.aum)}
            </span>
            <span className="market-model" role="cell" data-label="Manager">
              <b>{agent.model}</b>
              <small>{agent.cadence.replace("Daily · ", "")}</small>
            </span>
            <span className="market-report" role="cell" data-label="Last dispatch">
              <b>{agent.reports[0]?.title}</b>
              <small>{timeAgo(agent.reports[0].date, agent.reports[0].time)}</small>
            </span>
            <span className="market-action" role="cell">
              <Link href={`/trade/${agent.symbol}`} aria-label={`Trade ${agent.symbol}`}>
                Trade <span aria-hidden="true">→</span>
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
