"use client";

import { useEffect, useRef, useState } from "react";
import type { Agent } from "@/lib/types";
import { formatPrice } from "@/lib/format";

export function TradeForm({ agent }: { agent: Agent }) {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [type, setType] = useState<"market" | "limit">("market");
  const [amount, setAmount] = useState("1000");
  const [limitPrice, setLimitPrice] = useState(agent.price);
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number | null>(null);
  const balance = 25_000;
  const price = type === "limit" ? limitPrice : agent.price;
  const numericAmount = Math.max(0, Number.parseFloat(amount) || 0);
  const units = price > 0 ? numericAmount / price : 0;
  const fee = numericAmount * 0.001;
  const total = numericAmount + (side === "buy" ? fee : -fee);

  useEffect(() => {
    const onPrice = (event: Event) => {
      const detail = (event as CustomEvent<{ price: number }>).detail;
      if (!detail?.price) return;
      setLimitPrice(detail.price);
      setType("limit");
      setAmount("1000");
    };
    window.addEventListener("noema:price", onPrice);
    return () => window.removeEventListener("noema:price", onPrice);
  }, []);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!numericAmount) {
      setMessage("Enter an amount to route an order.");
      return;
    }
    setMessage(
      `${side === "buy" ? "BUY" : "SELL"} ${units.toFixed(2)} ${agent.symbol} @ ${
        type === "market" ? "market" : `$${formatPrice(price)}`
      } · order simulated`,
    );
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMessage(null), 6000);
  };

  return (
    <section className="trade-form" aria-label={`Buy or sell ${agent.symbol}`}>
      <div className="trade-form__sides" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={side === "buy"}
          className={`buy ${side === "buy" ? "active" : ""}`}
          onClick={() => setSide("buy")}
        >
          Buy {agent.symbol}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={side === "sell"}
          className={`sell ${side === "sell" ? "active" : ""}`}
          onClick={() => setSide("sell")}
        >
          Sell {agent.symbol}
        </button>
      </div>

      <form onSubmit={submit}>
        <div className="order-type-row">
          <div className="segmented">
            <button
              type="button"
              className={type === "market" ? "active" : ""}
              onClick={() => setType("market")}
            >
              Market
            </button>
            <button
              type="button"
              className={type === "limit" ? "active" : ""}
              onClick={() => setType("limit")}
            >
              Limit
            </button>
          </div>
          <span className="order-fee">Fee 0.10%</span>
        </div>

        {type === "limit" && (
          <label className="field">
            <span>Limit price</span>
            <span className="field__input">
              <input
                type="number"
                step="0.0001"
                min="0"
                value={limitPrice}
                onChange={(event) => setLimitPrice(Number(event.target.value))}
                aria-label="Limit price"
              />
              <span className="field__suffix">USD</span>
            </span>
          </label>
        )}

        <label className="field">
          <span>Amount</span>
          <span className="field__input">
            <input
              type="number"
              min="0"
              step="10"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              aria-label="Order amount in US dollars"
            />
            <span className="field__suffix">USD</span>
          </span>
        </label>

        <div className="quick-amounts">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => setAmount(((balance * pct) / 100).toFixed(0))}
            >
              {pct === 100 ? "MAX" : `${pct}%`}
            </button>
          ))}
        </div>

        <div className="order-summary">
          <div>
            <span>Available</span>
            <strong>${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong>
          </div>
          <div>
            <span>Est. units</span>
            <strong>
              {units.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              {agent.symbol}
            </strong>
          </div>
          <div>
            <span>Fee</span>
            <strong>${fee.toFixed(2)}</strong>
          </div>
          <div className="order-summary__total">
            <span>Total</span>
            <strong>${Math.max(total, 0).toFixed(2)}</strong>
          </div>
        </div>

        <button type="submit" className={`submit-order ${side}`}>
          {side === "buy" ? "Buy" : "Sell"} {agent.symbol}
        </button>

        {message && (
          <p className="order-message" role="status">
            {message}
          </p>
        )}

        <p className="trade-disclaimer">
          Simulated order. No funds move. Units are fund units of an
          agent-managed mock portfolio.
        </p>
      </form>
    </section>
  );
}
