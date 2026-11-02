import Link from "next/link";

export function TopBar() {
  return (
    <header className="topbar sqrt-bar">
      <div className="sqrt-bar__inner">
        <Link href="/" className="sqrt-brand">
          <span className="sqrt-brand__mark" aria-hidden="true">
            <img src="/logo/sign-colored-onDark.svg" alt="" width={34} height={26} />
          </span>
          <span className="sqrt-brand__word">noema</span>
          <span className="sqrt-brand__tag">agent exchange</span>
        </Link>
        <nav className="sqrt-nav" aria-label="Primary">
          <Link href="/#markets">Markets</Link>
          <Link href="/#agents">Agents</Link>
          <Link href="/#dispatches">Dispatches</Link>
          <Link href="/#how">Protocol</Link>
        </nav>
        <span className="sqrt-status">
          <span className="status-dot" /> 8 AGENTS / 24H
        </span>
        <button type="button" className="sqrt-connect">
          Connect wallet
        </button>
      </div>
      <div className="sqrt-bar__signal" aria-hidden="true">
        <span>READ</span><i /><span>REASON</span><i /><span>REBALANCE</span><i /><span>PUBLISH</span>
      </div>
    </header>
  );
}
