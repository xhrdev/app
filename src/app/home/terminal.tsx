'use client';

import { useEffect, useState } from 'react';

type TermLine = { c?: string; d?: string; t: string; w: number };

const TERM: TermLine[] = [
  { d: '$ ', t: 'docker run -d -p 8080:8080 ghcr.io/xhrdev-<org>/xhrdev', w: 1000 },
  { c: '#4ade80', t: 'solver up · listening on :8080', w: 500 },
  { d: '$ ', t: 'curl -s localhost:8080/solve -d @challenge.json', w: 950 },
  { c: '#4ade80', t: '{ "token": "9Fk2…", "status": "ok" }', w: 2600 },
];

export function Terminal() {
  const n = useTerminalCycle();
  return (
    <div
      className="card"
      style={{
        background: 'linear-gradient(180deg,#14161d,#0d0f14)',
        borderColor: '#242833',
        borderRadius: 0,
        boxShadow: '0 30px 60px -30px rgba(20,21,26,.45)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          background: '#101219',
          borderBottom: '1px solid var(--term-line)',
          display: 'flex',
          gap: 8,
          padding: '11px 14px',
        }}
      >
        <span
          style={{
            background: '#343a47',
            borderRadius: '50%',
            height: 9,
            width: 9,
          }}
        />
        <span
          style={{
            background: '#343a47',
            borderRadius: '50%',
            height: 9,
            width: 9,
          }}
        />
        <span
          style={{
            background: '#343a47',
            borderRadius: '50%',
            height: 9,
            width: 9,
          }}
        />
        <div
          className="mono"
          style={{
            color: '#7c8393',
            flex: 1,
            fontSize: 11,
            textAlign: 'center',
          }}
        >
          your infrastructure
        </div>
      </div>
      <div
        className="mono"
        style={{ fontSize: 12.5, lineHeight: 2, minHeight: 150, padding: 20 }}
      >
        {TERM.slice(0, n).map((l, i) => (
          <div
            key={i}
            style={{ color: l.c ?? 'var(--term-fg)', wordBreak: 'break-all' }}
          >
            {l.d && <span style={{ color: 'var(--accent)' }}>{l.d}</span>}
            {l.t}
          </div>
        ))}
        {n < TERM.length && <span className="cursor" />}
      </div>
    </div>
  );
}

function useTerminalCycle() {
  // Starts at 1, not 0: the first line is PageSpeed's LCP element, and
  // waiting a full second (TERM[0].w) to paint it bought nothing -- the
  // typing effect still reads fine starting from line 2.
  const [n, setN] = useState(1);
  useEffect(() => {
    const t = setTimeout(
      () => setN((v) => (v + 1) % (TERM.length + 1)),
      n >= TERM.length ? 2200 : TERM[n].w
    );
    return () => clearTimeout(t);
  }, [n]);
  return n;
}
