import type { Allocation } from "@/lib/types";

export function Donut({
  data,
  palette,
  size = 176,
  thickness = 18,
  centerLabel,
  centerSub,
  className = "",
}: {
  data: Allocation[];
  palette: string[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerSub?: string;
  className?: string;
}) {
  const radius = 50 - thickness / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div
      className={`donut ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Allocation: ${data
        .map((item) => `${item.label} ${item.weight}%`)
        .join(", ")}`}
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.08"
          strokeWidth={thickness}
        />
        <g transform="rotate(-90 50 50)">
          {data.map((item, index) => {
            const length = Math.max((item.weight / 100) * circumference - 1.4, 0.4);
            const dash = `${length} ${circumference - length}`;
            const element = (
              <circle
                key={item.label}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={palette[index % palette.length]}
                strokeWidth={thickness}
                strokeDasharray={dash}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              >
                <title>{`${item.label} — ${item.weight}%`}</title>
              </circle>
            );
            offset += (item.weight / 100) * circumference;
            return element;
          })}
        </g>
      </svg>
      {(centerLabel || centerSub) && (
        <span className="donut-center">
          <strong>{centerLabel}</strong>
          <small>{centerSub}</small>
        </span>
      )}
    </div>
  );
}

export function AllocationLegend({
  data,
  palette,
  compact = false,
}: {
  data: Allocation[];
  palette: string[];
  compact?: boolean;
}) {
  return (
    <ul className={`allocation-legend ${compact ? "compact" : ""}`}>
      {data.map((item, index) => (
        <li key={item.label}>
          <span
            className="legend-dot"
            style={{ background: palette[index % palette.length] }}
          />
          <span className="legend-label">{item.label}</span>
          <span className="legend-value">{item.weight}%</span>
        </li>
      ))}
    </ul>
  );
}
