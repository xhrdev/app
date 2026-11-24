'use client';

import { useState } from 'react';

const FAQS = [
  {
    a: 'our tooling auto-discovers the change against the live challenge and patches the solver, then pushes a new image to your registry. you pull it — no work on your side, no waiting for a human to reverse-engineer it from scratch.',
    q: 'how do you update a solver when a vendor breaks it?',
  },
  {
    a: 'run the container and point your code at it over http. it returns a token you attach to the request you were already making.',
    q: 'how do we integrate it?',
  },
  {
    a: "no. we don't resell another solver or route through anyone else's api — the sandbox and payload generators are ours, running on your hardware.",
    q: 'do you depend on any external solving vendors?',
  },
  {
    a: 'yes — several teams run us as a second solver for redundancy, and fail over when their primary gets blocked.',
    q: 'can we run it alongside our current setup?',
  },
  {
    a: 'yes. it needs no outbound internet to solve. updates are images you pull on your own schedule.',
    q: 'can we run it air-gapped?',
  },
  {
    a: "a docker host. it's stateless, so you scale it out the same way you scale your workers.",
    q: 'what does it need to run?',
  },
  {
    a: 'no. solving happens inside your own network. we never proxy, store or log your requests.',
    q: 'do you see our traffic?',
  },
  {
    a: "a flat fee, unlimited solves — no per-request or per-gb billing. book a call and we'll give you a number for the vendors you need.",
    q: 'what does it cost?',
  },
];

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    acceptedAnswer: { '@type': 'Answer', text: f.a },
    name: f.q,
  })),
};

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" style={{ padding: '96px 0' }}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
        type="application/ld+json"
      />
      <div className="wrap">
        <div
          className="two"
          style={{
            alignItems: 'start',
            display: 'grid',
            gap: 56,
            gridTemplateColumns: '.7fr 1.3fr',
          }}
        >
          <h2 className="h2">questions</h2>
          <div>
            {FAQS.map((f, i) => (
              <div
                key={f.q}
                style={{
                  borderBottom:
                    i === FAQS.length - 1 ? '1px solid var(--line)' : 'none',
                  borderTop: '1px solid var(--line)',
                }}
              >
                <button
                  aria-controls={`faq-answer-${i}`}
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? -1 : i)}
                  style={{
                    alignItems: 'center',
                    background: 'transparent',
                    border: 0,
                    color: 'var(--fg)',
                    cursor: 'pointer',
                    display: 'flex',
                    fontSize: 16.5,
                    fontWeight: 600,
                    gap: 20,
                    justifyContent: 'space-between',
                    letterSpacing: '-0.015em',
                    padding: '20px 0',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  {f.q}
                  <span
                    className="mono"
                    style={{
                      color: 'var(--accent)',
                      flexShrink: 0,
                      fontSize: 16,
                    }}
                  >
                    {open === i ? '−' : '+'}
                  </span>
                </button>
                {/* Always rendered (not conditional on `open`), just hidden --
                    a crawler that doesn't run JS (most LLM/AI crawlers) only
                    ever sees the initial HTML, and open defaults to the first
                    FAQ only, so a conditional render was shipping 7 of 8
                    answers to nobody but a mouse click. */}
                <div
                  hidden={open !== i}
                  id={`faq-answer-${i}`}
                  style={{
                    color: 'var(--mute)',
                    fontSize: 15,
                    lineHeight: 1.7,
                    maxWidth: 600,
                    padding: '0 40px 22px 0',
                  }}
                >
                  {f.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
