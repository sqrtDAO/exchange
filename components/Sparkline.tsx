export function Sparkline({
  values,
  className = "",
  area = false,
  id,
}: {
  values: number[];
  className?: string;
  area?: boolean;
  id?: string;
}) {
  if (!values.length) return null;
  const width = 132;
  const height = 40;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width;
    const y = height - 3 - ((value - min) / span) * (height - 6);
    return [x, y] as const;
  });
  const line = points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");
  const fill = `${line} L${width},${height} L0,${height} Z`;
  const positive = values[values.length - 1] >= values[0];
  const gradientId = `spark-${id ?? values[0]}-${positive ? "up" : "down"}`;

  return (
    <svg
      className={`sparkline ${positive ? "pos" : "neg"} ${className}`}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`7 day price trend, ${positive ? "up" : "down"}`}
    >
      {area && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={fill} fill={`url(#${gradientId})`} />
        </>
      )}
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
