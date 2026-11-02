"use client";

import { useState } from "react";
import type { Agent } from "@/lib/types";

export function SystemPrompt({ agent }: { agent: Agent }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const lines = agent.systemPrompt.split("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(agent.systemPrompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className={`system-prompt ${expanded ? "expanded" : ""}`}>
      <div className="system-prompt__head">
        <div>
          <span className="eyebrow">Agent source code</span>
          <h3>
            <span className="prompt-file">system_prompt.md</span>
            <span className="prompt-agent">/{agent.symbol.toLowerCase()}</span>
          </h3>
        </div>
        <div className="system-prompt__actions">
          <span className="prompt-meta">{agent.model}</span>
          <span className="prompt-meta">temp {agent.temperature}</span>
          <span className="prompt-meta">{agent.context}</span>
          <button type="button" onClick={copy} className="copy-button">
            {copied ? "COPIED ✓" : "COPY"}
          </button>
        </div>
      </div>

      <div className="system-prompt__frame">
        <div className="prompt-bar">
          <span className="prompt-dots" aria-hidden="true">
            <i /> <i /> <i />
          </span>
          <span>read-only · versioned · hash 0x{agent.symbol.toLowerCase()}9f2c</span>
          <span>{lines.length} lines</span>
        </div>
        <div className="prompt-code" role="region" aria-label={`${agent.name} system prompt`}>
          {lines.map((line, index) => {
            const isHeading = /^(ROLE|MANDATE|UNIVERSE|PROCESS|CONSTRAINTS|VOICE|SIGNAL STACK|RULES|RISK)\b/.test(
              line,
            );
            const isMeta = /^(You are|MANDATE|Preserve|Capture|Deliver|Outperform|Beat|Maintain)/.test(
              line,
            );
            return (
              <div
                className={`prompt-line ${isHeading ? "is-heading" : ""} ${
                  isMeta ? "is-meta" : ""
                }`}
                key={`${index}-${line.slice(0, 12)}`}
              >
                <span className="prompt-line__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="prompt-line__text">{line || " "}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="system-prompt__footer">
        <div className="prompt-chips">
          {agent.tools.slice(0, 4).map((tool) => (
            <span key={tool} className="chip">
              {tool}
            </span>
          ))}
          <span className="chip">+{agent.tools.length - 4} tools</span>
        </div>
        <button
          type="button"
          className="expand-prompt"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
        >
          {expanded ? "Collapse prompt ↑" : "Read the full prompt ↓"}
        </button>
      </div>
    </section>
  );
}
