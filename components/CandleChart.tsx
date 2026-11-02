"use client";

import { useId, useMemo, useState } from "react";
import type { Candle, Timeframe } from "@/lib/types";
import { formatPrice } from "@/lib/format";

const timeframes: Timeframe[] = ["1H", "4H", "1D", "1W"];

const CHART = {
  w: 920,
  h: 560,
  top: 24,
  right: 68,
  bottom: 28,
  left: 8,
  volume: 72,
  gap: 24,
};

function timeLabel(t: number, tf: Timeframe) {
  const date = new Date(t);
  if (tf === "1H" || tf === "4H") {
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function CandleChart({
  candles,
  markers = [],
  symbol,
  className = "",
}: {
  candles: Record<Timeframe, Candle[]>;
  markers?: { x: number; label: string; date: string }[];
  symbol: string;
  className?: string;
}) {
  const [tf, setTf] = useState<Timeframe>("1D");
  const [mode, setMode] = useState<"candles" | "line">("candles");
  const [hovered, setHovered] = useState<number | null>(null);
  const gradientId = useId().replace(/:/g, "");
  const data = candles[tf];

  const geometry = useMemo(() => {
    const plotW = CHART.w - CHART.left - CHART.right;
    const priceH = CHART.h - CHART.top - CHART.bottom - CHART.volume - CHART.gap;
    const highs = data.map((candle) => candle.h);
    const lows = data.map((candle) => candle.l);
    const rawMax = Math.max(...highs);
    const rawMin = Math.min(...lows);
    const pad = (rawMax - rawMin) * 0.08 || rawMax * 0.02;
    const max = rawMax + pad;
    const min = rawMin - pad;
    const span = max - min || 1;
    const step = plotW / data.length;
    const body = Math.min(11, Math.max(2, step * 0.58));
    const maxVolume = Math.max(...data.map((candle) => candle.v));
    const priceY = (price: number) =>
      CHART.top + ((max - price) / span) * priceH;
    const x = (index: number) => CHART.left + (index + 0.5) * step;
    const volumeY = CHART.h - CHART.bottom;
    return {
      plotW,
      priceH,
      min,
      max,
      step,
      body,
      maxVolume,
      priceY,
      x,
      volumeY,
      volumeH: CHART.volume,
    };
  }, [data]);

  const active = hovered === null ? data.length - 1 : hovered;
  const activeCandle = data[active];
  const first = data[0];
  const change = ((activeCandle.c - first.o) / first.o) * 100;
  const lastClose = data[data.length - 1].c;
  const linePath = data
    .map(
      (candle, index) =>
        `${index === 0 ? "M" : "L"}${geometry.x(index).toFixed(1)},${geometry
          .priceY(candle.c)
          .toFixed(1)}`,
    )
    .join(" ");
  const areaPath = `${linePath} L${geometry.x(data.length - 1).toFixed(1)},${
    CHART.top + geometry.priceH
  } L${geometry.x(0).toFixed(1)},${CHART.top + geometry.priceH} Z`;

  const gridPrices = Array.from({ length: 5 }, (_, index) => {
    const ratio = index / 4;
    return geometry.max - (geometry.max - geometry.min) * ratio;
  });

  return (
    <div className={`candle-chart ${className}`}>
      <div className="chart-toolbar">
        <div className="chart-identity">
          <span className="chart-pair">{symbol}/USD</span>
          <span className="chart-tf-label">{tf} · {mode === "candles" ? "candles" : "line"}</span>
        </div>
        <div className="chart-readout" aria-live="polite">
          <span>O <b>{formatPrice(activeCandle.o)}</b></span>
          <span>H <b>{formatPrice(activeCandle.h)}</b></span>
          <span>L <b>{formatPrice(activeCandle.l)}</b></span>
          <span>C <b>{formatPrice(activeCandle.c)}</b></span>
          <span className={change >= 0 ? "pos" : "neg"}>
            {change >= 0 ? "+" : ""}
            {change.toFixed(2)}%
          </span>
        </div>
        <div className="chart-controls">
          <div className="segmented chart-tf" role="group" aria-label="Timeframe">
            {timeframes.map((item) => (
              <button
                key={item}
                type="button"
                className={tf === item ? "active" : ""}
                onClick={() => setTf(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="segmented chart-mode" role="group" aria-label="Chart type">
            <button
              type="button"
              className={mode === "candles" ? "active" : ""}
              onClick={() => setMode("candles")}
              aria-label="Candlestick chart"
            >
              ▥
            </button>
            <button
              type="button"
              className={mode === "line" ? "active" : ""}
              onClick={() => setMode("line")}
              aria-label="Line chart"
            >
              ⌁
            </button>
          </div>
        </div>
      </div>

      <svg
        className="chart-svg"
        viewBox={`0 0 ${CHART.w} ${CHART.h}`}
        role="img"
        aria-label={`${symbol} price chart, ${tf}`}
        onMouseLeave={() => setHovered(null)}
      >
        <defs>
          <linearGradient id={`area-${gradientId}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-up)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--chart-up)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {gridPrices.map((price, index) => {
          const y = geometry.priceY(price);
          return (
            <g key={price}>
              <line
                x1={CHART.left}
                x2={CHART.w - CHART.right}
                y1={y}
                y2={y}
                className="chart-grid-line"
              />
              <text
                x={CHART.w - CHART.right + 10}
                y={y + 4}
                className="chart-axis-label"
              >
                {formatPrice(price)}
              </text>
            </g>
          );
        })}

        {data.map((candle, index) => {
          if (index % Math.ceil(data.length / 7) !== 0) return null;
          return (
            <text
              key={`x-${candle.t}`}
              x={geometry.x(index)}
              y={CHART.h - 6}
              textAnchor="middle"
              className="chart-axis-label"
            >
              {timeLabel(candle.t, tf)}
            </text>
          );
        })}

        {markers.map((marker) => {
          const x = CHART.left + marker.x * geometry.plotW;
          return (
            <g key={marker.date} className="chart-marker">
              <line
                x1={x}
                x2={x}
                y1={CHART.top}
                y2={CHART.top + geometry.priceH}
                strokeDasharray="2 5"
              />
              <circle cx={x} cy={CHART.top + 5} r="4" />
              <title>{`${marker.date} — ${marker.label}`}</title>
            </g>
          );
        })}

        {mode === "line" ? (
          <>
            <path d={areaPath} fill={`url(#area-${gradientId})`} />
            <path d={linePath} className="chart-line" />
          </>
        ) : (
          data.map((candle, index) => {
            const x = geometry.x(index);
            const up = candle.c >= candle.o;
            const yOpen = geometry.priceY(candle.o);
            const yClose = geometry.priceY(candle.c);
            const top = Math.min(yOpen, yClose);
            const bodyH = Math.max(1, Math.abs(yClose - yOpen));
            return (
              <g
                key={candle.t}
                className={`candle ${up ? "up" : "down"}`}
                onMouseEnter={() => setHovered(index)}
              >
                <line
                  x1={x}
                  x2={x}
                  y1={geometry.priceY(candle.h)}
                  y2={geometry.priceY(candle.l)}
                  className="candle-wick"
                />
                <rect
                  x={x - geometry.body / 2}
                  y={top}
                  width={geometry.body}
                  height={bodyH}
                  className="candle-body"
                  rx={geometry.body > 6 ? 0.7 : 0}
                />
              </g>
            );
          })
        )}

        {data.map((candle, index) => {
          const barH = (candle.v / geometry.maxVolume) * geometry.volumeH;
          return (
            <rect
              key={`v-${candle.t}`}
              x={geometry.x(index) - geometry.body / 2}
              y={geometry.volumeY - barH}
              width={geometry.body}
              height={barH}
              className={`volume-bar ${candle.c >= candle.o ? "up" : "down"}`}
              onMouseEnter={() => setHovered(index)}
            />
          );
        })}

        <line
          x1={CHART.left}
          x2={CHART.w - CHART.right}
          y1={geometry.priceY(lastClose)}
          y2={geometry.priceY(lastClose)}
          className="last-price-line"
        />
        <g
          transform={`translate(${CHART.w - CHART.right + 2}, ${geometry.priceY(
            lastClose,
          )})`}
        >
          <rect x="0" y="-10" width={62} height="20" rx="2" className="last-price-tag" />
          <text x="31" y="4" textAnchor="middle" className="last-price-text">
            {formatPrice(lastClose)}
          </text>
        </g>

        <g className="chart-crosshair">
          <line
            x1={geometry.x(active)}
            x2={geometry.x(active)}
            y1={CHART.top}
            y2={CHART.top + geometry.priceH}
            strokeDasharray="3 4"
          />
          <line
            x1={CHART.left}
            x2={CHART.w - CHART.right}
            y1={geometry.priceY(activeCandle.c)}
            y2={geometry.priceY(activeCandle.c)}
            strokeDasharray="3 4"
          />
          <circle
            cx={geometry.x(active)}
            cy={geometry.priceY(activeCandle.c)}
            r="3.2"
            className="crosshair-dot"
          />
        </g>

        <rect
          x={CHART.left}
          y={CHART.top}
          width={geometry.plotW}
          height={geometry.priceH}
          fill="transparent"
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const ratio = (event.clientX - rect.left) / rect.width;
            const index = Math.max(
              0,
              Math.min(data.length - 1, Math.floor(ratio * data.length)),
            );
            setHovered(index);
          }}
        />
      </svg>
    </div>
  );
}
