import type { Agent } from "@/lib/types";

export function AgentOrb({
  agent,
  size = 40,
  className = "",
}: {
  agent: Agent;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`agent-orb ${className}`}
      style={
        {
          "--orb-color": agent.color,
          width: size,
          height: size,
          fontSize: Math.max(9, Math.round(size * 0.26)),
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <span className="agent-orb__ring" />
      <span className="agent-orb__mark">{agent.symbol.slice(0, 2)}</span>
    </span>
  );
}

export function Delta({ value, suffix = "%" }: { value: number; suffix?: string }) {
  const positive = value >= 0;
  return (
    <span className={`delta ${positive ? "pos" : "neg"}`}>
      {positive ? "+" : ""}
      {value.toFixed(2)}
      {suffix}
    </span>
  );
}
