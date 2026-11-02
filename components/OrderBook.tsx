"use client";

import { useEffect, useMemo, useState } from "react";
import type { Agent, MarketTrade, OrderRow } from "@/lib/types";
import { formatCompactNumber, formatPrice } from "@/lib/format";

type Book = {
  asks: OrderRow[];
  bids: OrderRow[];
  spread: number;
  mid: number;
};

function jitterBook(book: Book): Book {
  const drift = (Math.random() - 0.5) * 0.0012;
  const rebuild = (rows: OrderRow[], side: "ask" | "bid") => {
    let total = 0;
    return rows.map((row, index) => {
      const price =
        row.price * (1 + drift * (side === "ask" ? 1 : 1)) +
        (side === "ask" ? 1 : -1) * row.price * 0.00002 * (index + 1);
      const size = Math.max(
        0.01,
        row.size * (0.82 + Math.random() * 0.38),
      );
      total += size;
      return {
        price: price < 2 ? Math.round(price * 10_000) / 10_000 : Math.round(price * 100) / 100,
        size: Math.round(size * 100) / 100,
        total,
      };
    });
  };
  const asks = rebuild(book.asks, "ask");
  const bids = rebuild(book.bids, "bid");
  return {
    asks,
    bids,
    spread:
      asks[0].price < 2
        ? Math.round((asks[0].price - bids[0].price) * 10_000) / 10_000
        : Math.round((asks[0].price - bids[0].price) * 100) / 100,
    mid: (asks[0].price + bids[0].price) / 2,
  };
}

export function OrderBook({
  agent,
  book,
  trades,
}: {
  agent: Agent;
  book: Book;
  trades: MarketTrade[];
}) {
  const [liveBook, setLiveBook] = useState(book);
  const [tab, setTab] = useState<"book" | "trades">("book");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (tab !== "book") return;
    const timer = window.setInterval(() => {
      setLiveBook((current) => jitterBook(current));
      setTick((value) => value + 1);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [tab]);

  const maxTotal = useMemo(
    () =>
      Math.max(
        ...liveBook.asks.map((row) => row.total),
        ...liveBook.bids.map((row) => row.total),
      ),
    [liveBook],
  );

  const renderRow = (row: OrderRow, side: "ask" | "bid") => {
    const width = `${(row.total / maxTotal) * 100}%`;
    return (
      <button
        type="button"
        key={`${side}-${row.price}`}
        className={`ob-row ${side}`}
        onClick={() => {
          window.dispatchEvent(
            new CustomEvent("noema:price", { detail: { price: row.price } }),
          );
        }}
        title={`Use ${formatPrice(row.price)} in the order ticket`}
      >
        <span className="ob-depth" style={{ width }} />
        <span className="ob-price">{formatPrice(row.price)}</span>
        <span className="ob-size">{formatCompactNumber(row.size)}</span>
        <span className="ob-total">{formatCompactNumber(row.total)}</span>
      </button>
    );
  };

  return (
    <section className="orderbook" aria-label={`${agent.symbol} order book`}>
      <div className="panel-head">
        <div className="segmented ob-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "book"}
            className={tab === "book" ? "active" : ""}
            onClick={() => setTab("book")}
          >
            Order book
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "trades"}
            className={tab === "trades" ? "active" : ""}
            onClick={() => setTab("trades")}
          >
            Trades
          </button>
        </div>
        <span className={`ob-pulse ${tick % 2 ? "on" : ""}`}>
          <span className="status-dot" /> LIVE
        </span>
      </div>

      {tab === "book" ? (
        <div className="ob-table">
          <div className="ob-head">
            <span>Price (USD)</span>
            <span>Size</span>
            <span>Total</span>
          </div>
          <div className="ob-asks">
            {[...liveBook.asks].reverse().map((row) => renderRow(row, "ask"))}
          </div>
          <div className="ob-spread">
            <span className="ob-spread__price">
              {formatPrice(liveBook.mid)}
            </span>
            <span className="ob-spread__label">
              spread {formatPrice(liveBook.spread)}
            </span>
          </div>
          <div className="ob-bids">
            {liveBook.bids.map((row) => renderRow(row, "bid"))}
          </div>
        </div>
      ) : (
        <div className="ob-trades">
          <div className="ob-head">
            <span>Price (USD)</span>
            <span>Size</span>
            <span>Time</span>
          </div>
          <div className="ob-trade-list">
            {trades.map((trade, index) => (
              <div className={`ob-trade ${trade.side}`} key={`${trade.time}-${index}`}>
                <span>{formatPrice(trade.price)}</span>
                <span>{formatCompactNumber(trade.size)}</span>
                <span>{trade.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
