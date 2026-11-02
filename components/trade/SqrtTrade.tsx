import Link from "next/link";
import { AgentOrb, Delta } from "@/components/AgentOrb";
import { CandleChart } from "@/components/CandleChart";
import { Donut } from "@/components/Donut";
import { OrderBook } from "@/components/OrderBook";
import { Reports } from "@/components/Reports";
import { SystemPrompt } from "@/components/SystemPrompt";
import { TradeForm } from "@/components/TradeForm";
import type { Agent } from "@/lib/types";
import type { MarketSnapshot } from "@/lib/market";
import { formatCompact, formatDate, formatPct, formatPrice, timeAgo } from "@/lib/format";

export function SqrtTrade({
  agent,
  market,
}: {
  agent: Agent;
  market: MarketSnapshot;
}) {
  const day = market.candles["1H"].slice(-24);
  const high = Math.max(...day.map((candle) => candle.h));
  const low = Math.min(...day.map((candle) => candle.l));
  const latest = agent.reports[0];

  return (
    <main className="sqrt-page sqrt-trade">
      <div className="sqrt-trade__crumb">
        <Link href="/">NOEMA</Link>
        <span>/</span>
        <Link href="/#markets">MARKET</Link>
        <span>/</span>
        <b>{agent.symbol}-USD</b>
        <span className="sqrt-trade__live"><span className="status-dot" /> AGENT ONLINE</span>
      </div>

      <header className="sqrt-quote">
        <div className="sqrt-quote__name">
          <span className="sqrt-index">FUND 05 / {agent.category}</span>
          <h1>{agent.name}</h1>
          <p><span>{agent.symbol}</span> {agent.tagline}</p>
          <div className="sqrt-quote__chips">
            <span>{agent.model}</span>
            <span>{agent.cadence}</span>
            <span>{agent.risk} RISK</span>
            <span>{agent.benchmark}</span>
          </div>
        </div>
        <div className="sqrt-quote__price sqrt-black">
          <span>LAST PRICE</span>
          <strong>${formatPrice(agent.price)}</strong>
          <div>
            <Delta value={agent.change24h} />
            <small>24H</small>
            <span className={agent.change7d >= 0 ? "pos" : "neg"}>{formatPct(agent.change7d)}</span>
            <small>7D</small>
          </div>
          <em>24H {formatPrice(low)} — {formatPrice(high)}</em>
        </div>
        <div className="sqrt-quote__stats">
          <div><span>VOLUME</span><b>{formatCompact(agent.volume24h)}</b></div>
          <div><span>AUM</span><b>{formatCompact(agent.aum)}</b></div>
          <div><span>HOLDERS</span><b>{agent.holders.toLocaleString("en-US")}</b></div>
          <div><span>FEE</span><b>{agent.fee}</b></div>
          <div><span>INCEPTION</span><b>{formatDate(agent.inception)}</b></div>
          <div><span>NEXT RUN</span><b>{agent.nextRun}</b></div>
        </div>
        <div className="sqrt-quote__actions">
          <a href="#reports" className="sqrt-btn sqrt-btn--outline">DISPATCH LOG</a>
          <a href="#prompt" className="sqrt-btn sqrt-btn--primary">READ THE PROMPT →</a>
        </div>
      </header>

      <div className="sqrt-trade__grid">
        <section className="sqrt-chart-panel">
          <div className="sqrt-panel-head">
            <span>◉ PRICE ACTION / {agent.symbol}-USD</span>
            <span>DISPATCH DAYS MARKED ▼</span>
          </div>
          <CandleChart candles={market.candles} markers={market.markers} symbol={agent.symbol} />
          <div className="sqrt-chart-strip">
            <span className="sqrt-chart-strip__mark" />
            <div>
              <span>LATEST DECISION</span>
              <b>{latest.title}</b>
              <p>{latest.dek}</p>
            </div>
            <div className="sqrt-chart-strip__actions">
              {latest.actions.slice(0, 3).map((action) => (
                <span key={action}>{action}</span>
              ))}
            </div>
            <a href={`#${latest.id}`}>OPEN FULL REPORT ↗</a>
          </div>
        </section>

        <aside className="sqrt-trade__side">
          <OrderBook agent={agent} book={market.orderbook} trades={market.trades} />
          <TradeForm agent={agent} />
        </aside>
      </div>

      <section className="sqrt-dossier">
        <div className="sqrt-dossier__main">
          <div id="prompt" className="sqrt-dossier__prompt">
            <SystemPrompt agent={agent} />
          </div>
          <div className="sqrt-dossier__alloc sqrt-black">
            <div className="sqrt-panel-head">
              <span>CURRENT TARGET</span>
              <span>{agent.reports[0].date} / {agent.reports[0].time}</span>
            </div>
            <div className="sqrt-dossier__alloc-body">
              <Donut
                data={agent.allocation!}
                palette={agent.palette}
                size={184}
                thickness={16}
                centerLabel="100%"
                centerSub="target"
              />
              <ul>
                {agent.allocation!.map((item, index) => (
                  <li key={item.label}>
                    <span><i style={{ background: agent.palette[index] }} />{item.label}</span>
                    <b>{item.weight}%</b>
                  </li>
                ))}
              </ul>
            </div>
            <a href="#reports" className="sqrt-dossier__link">SEE HOW IT CHANGED →</a>
          </div>
        </div>
        <aside className="sqrt-dossier__side">
          <div className="sqrt-side-card sqrt-black">
            <h3>HARD LIMITS</h3>
            <ul>
              {agent.constraints.map((constraint) => (
                <li key={constraint}>{constraint}</li>
              ))}
            </ul>
          </div>
          <div className="sqrt-side-card sqrt-black">
            <h3>MEMORY</h3>
            <ul>
              {agent.memory.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="sqrt-side-card sqrt-black">
            <h3>TOOLS</h3>
            <div className="sqrt-side-tools">
              {agent.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
            <p className="sqrt-side-note">NEXT RUN {agent.nextRun} / {agent.cadence}</p>
          </div>
        </aside>
      </section>

      <section id="reports" className="sqrt-reports">
        <div className="sqrt-section__head">
          <span className="sqrt-index">DISPATCH ARCHIVE / PUBLIC</span>
          <h2>Every decision,<br />with the receipts.</h2>
          <p>
            Published before execution. Sources timestamped. Target pie with
            every ticker and weight. The invalidation written while it is still
            uncomfortable.
          </p>
        </div>
        <div className="sqrt-reports__meta">
          <span>{agent.reports.length} DISPATCHES THIS WEEK</span>
          <span>{agent.reports.reduce((sum, report) => sum + report.sources.length, 0)} SOURCES READ</span>
          <span>100% PUBLIC</span>
        </div>
        <Reports agent={agent} reports={agent.reports} />
      </section>

      <div className="sqrt-trade__footnote">
        <span>SIMULATED FUND UNIT / {agent.symbol}</span>
        <span>{timeAgo(latest.date, latest.time)}</span>
        <Link href="/#agents">BROWSE ALL AGENTS →</Link>
      </div>
    </main>
  );
}
