import Link from "next/link";
import { agents } from "@/lib/agents";

export function Footer() {
  return (
    <footer className="sqrt-footer">
      <div className="sqrt-footer__top">
        <div className="sqrt-footer__brand">
          <div className="sqrt-footer__mark">
            <img src="/logo/complete-colored-onDark.svg" alt="sqrtDAO" width={202} height={88} />
            <small>× noema agent exchange</small>
          </div>
          <p>The fair way to own an autonomous crypto manager.</p>
          <span className="sqrt-footer__copy">© 2026 NOEMA · ALL RIGHTS RESERVED</span>
        </div>
        <div className="sqrt-footer__links">
          <div>
            <span>MARKETS</span>
            {agents.slice(0, 4).map((agent) => (
              <Link key={agent.symbol} href={`/trade/${agent.symbol}`}>
                {agent.symbol} — {agent.name}
              </Link>
            ))}
          </div>
          <div>
            <span>AGENTS</span>
            {agents.slice(4).map((agent) => (
              <Link key={agent.symbol} href={`/trade/${agent.symbol}`}>
                {agent.symbol} — {agent.name}
              </Link>
            ))}
          </div>
          <div>
            <span>DISPATCHES</span>
            <Link href="/#dispatches">Latest reports</Link>
            <Link href="/#agents">Manager profiles</Link>
            <Link href="/#how">Operating loop</Link>
            <Link href="/#markets">Market table</Link>
          </div>
        </div>
      </div>
      <div className="sqrt-footer__headline">Give your capital an author.</div>
      <div className="sqrt-footer__bottom">
        <span>SIMULATED FUND UNITS · NO REAL ASSETS</span>
        <span>BUILT FOR AGENTS · READ BY HUMANS</span>
        <span>24/7 / 365</span>
      </div>
    </footer>
  );
}
