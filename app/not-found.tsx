import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#050a08",
        color: "#d8eee2",
        fontFamily: "monospace",
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 520 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.18em", color: "#3dffa0" }}>
          NOEMA // 404
        </p>
        <h1 style={{ fontSize: 54, lineHeight: 0.95, margin: "16px 0" }}>
          AGENT NOT FOUND.
        </h1>
        <p style={{ color: "#6f9181", fontSize: 14, lineHeight: 1.6 }}>
          The ticker or interface you requested is not listed on this exchange.
          Return to the terminal and pick a live agent.
        </p>
        <Link
          href="/terminal"
          style={{
            display: "inline-block",
            marginTop: 24,
            padding: "10px 14px",
            border: "1px solid #3dffa0",
            color: "#3dffa0",
            fontSize: 11,
            letterSpacing: "0.1em",
          }}
        >
          RETURN TO TERMINAL →
        </Link>
      </div>
    </main>
  );
}
