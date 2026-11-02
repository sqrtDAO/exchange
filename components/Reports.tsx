"use client";

import { useState } from "react";
import type { Agent, Report, SourceKind } from "@/lib/types";
import { Donut } from "@/components/Donut";
import { formatDate, formatDateUpper, timeAgo } from "@/lib/format";

const kindLabels: Record<SourceKind, string> = {
  filing: "FILING",
  dataset: "DATASET",
  news: "NEWS",
  social: "SOCIAL",
  paper: "PAPER",
  market: "MARKET",
  api: "API",
};

function AllocationShift({
  report,
  agent,
}: {
  report: Report;
  agent: Agent;
}) {
  const before = report.before ?? [];
  const after = report.after ?? report.target;
  const labels = Array.from(
    new Set([...before.map((item) => item.label), ...after.map((item) => item.label)]),
  );
  const palette = agent.palette;

  return (
    <div className="report-allocation">
      <figure className="target-pie">
        <div className="target-pie__donut">
          <Donut
            data={after}
            palette={palette}
            size={196}
            thickness={20}
            centerLabel="100%"
            centerSub="target"
          />
        </div>
        <figcaption>
          <span>Target allocation</span>
          <strong>effective {report.time}</strong>
        </figcaption>
        <ul className="pie-legend">
          {after.map((item, index) => (
            <li key={item.label}>
              <span
                className="legend-dot"
                style={{ background: palette[index % palette.length] }}
              />
              <span>{item.label}</span>
              <b>{item.weight}%</b>
            </li>
          ))}
        </ul>
      </figure>

      <div className="allocation-shifts">
        <div className="shifts-head">
          <span>Previous target</span>
          <span>New target</span>
          <span>Change</span>
        </div>
        {labels.map((label) => {
          const beforeWeight = before.find((item) => item.label === label)?.weight ?? 0;
          const afterWeight = after.find((item) => item.label === label)?.weight ?? 0;
          const delta = afterWeight - beforeWeight;
          const index = after.findIndex((item) => item.label === label);
          const color =
            index >= 0 ? palette[index % palette.length] : "var(--muted)";
          return (
            <div className="shift-row" key={label}>
              <span className="shift-label">
                <span className="legend-dot" style={{ background: color }} />
                {label}
              </span>
              <span className="shift-values">
                {beforeWeight}% <i>→</i> <b>{afterWeight}%</b>
              </span>
              <span className={`shift-delta ${delta > 0 ? "pos" : delta < 0 ? "neg" : ""}`}>
                {delta > 0 ? "+" : ""}
                {delta}
              </span>
              <span className="shift-bar" aria-hidden="true">
                <i
                  style={{
                    width: `${Math.min(afterWeight * 2.5, 100)}%`,
                    background: color,
                  }}
                />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Reports({
  agent,
  reports,
  limit,
}: {
  agent: Agent;
  reports: Report[];
  limit?: number;
}) {
  const [openId, setOpenId] = useState(reports[0]?.id ?? "");
  const visible = limit ? reports.slice(0, limit) : reports;

  return (
    <div className="reports">
      {visible.map((report, index) => {
        const open = openId === report.id;
        const delta = report.target.reduce((sum, item) => {
          const old = report.before?.find((entry) => entry.label === item.label);
          return sum + Math.abs(item.weight - (old?.weight ?? 0));
        }, 0);

        return (
          <article
            className={`report ${open ? "open" : ""}`}
            key={report.id}
            id={report.id}
          >
            <button
              type="button"
              className="report-head"
              aria-expanded={open}
              onClick={() => setOpenId(open ? "" : report.id)}
            >
              <span className="report-index">{String(visible.length - index).padStart(2, "0")}</span>
              <span className="report-date">
                <b>{formatDateUpper(report.date)}</b>
                <small>{report.time} · {timeAgo(report.date, report.time)}</small>
              </span>
              <span className="report-title">
                <b>{report.title}</b>
                <small>{report.dek}</small>
              </span>
              <span className="report-tags">
                {report.tags.slice(0, 2).map((tag) => (
                  <span className="chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </span>
              <span className="report-confidence">
                <small>CONVICTION</small>
                <b>{report.confidence}%</b>
                <span className="confidence-bar">
                  <i style={{ width: `${report.confidence}%` }} />
                </span>
              </span>
              <span className="report-chevron" aria-hidden="true">
                {open ? "−" : "+"}
              </span>
            </button>

            {open && (
              <div className="report-body">
                <div className="report-meta">
                  <span><small>Report</small><b>{formatDate(report.date)}</b></span>
                  <span><small>Horizon</small><b>{report.horizon}</b></span>
                  <span><small>NAV at close</small><b>${report.nav}</b></span>
                  <span><small>Allocation turnover</small><b>{delta} pts</b></span>
                  <span><small>Sources read</small><b>{report.sources.length}</b></span>
                </div>

                <div className="report-decision">
                  <span className="eyebrow">Decision</span>
                  <p>{report.decision}</p>
                </div>

                <AllocationShift report={report} agent={agent} />

                <div className="report-columns">
                  <div className="report-reasoning">
                    <h4>Why the agent moved</h4>
                    {report.reasoning.map((paragraph) => (
                      <p key={paragraph.slice(0, 30)}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="report-observations">
                    <h4>What it observed</h4>
                    <ul>
                      {report.observations.map((observation) => (
                        <li key={observation.slice(0, 30)}>{observation}</li>
                      ))}
                    </ul>
                    <h4>Orders executed</h4>
                    <ul className="action-list">
                      {report.actions.map((action) => (
                        <li key={action}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="report-sources">
                  <div className="sources-head">
                    <h4>Resources read</h4>
                    <span>{report.sources.length} primary sources · all timestamps UTC</span>
                  </div>
                  <div className="source-grid">
                    {report.sources.map((source) => (
                      <div className="source-card" key={source.title}>
                        <div className="source-card__top">
                          <span className={`source-kind ${source.kind}`}>
                            {kindLabels[source.kind]}
                          </span>
                          <span className="source-publisher">{source.publisher}</span>
                        </div>
                        <strong>{source.title}</strong>
                        <p>{source.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
