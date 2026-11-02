import Link from "next/link";
import { agents } from "@/lib/agents";
import { formatPct, formatPrice } from "@/lib/format";

export function TickerTape() {
  const items = [...agents, ...agents];

  return (
    <div className="tape-wrap" aria-label="Live agent fund prices">
      <div className="tape">
        {items.map((agent, index) => (
          <Link
            key={`${agent.symbol}-${index}`}
            href={`/trade/${agent.symbol}`}
            className="tape-item"
            aria-hidden={index >= agents.length}
            tabIndex={index >= agents.length ? -1 : 0}
          >
            <span className="tape-symbol">{agent.symbol}</span>
            <span className="tape-price">${formatPrice(agent.price)}</span>
            <span className={agent.change24h >= 0 ? "pos" : "neg"}>
              {formatPct(agent.change24h)}
            </span>
            <span className="tape-divider" aria-hidden="true">
              ·
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
