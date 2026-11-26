const CAL =
  'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0StxPnhSfRoPXxXNSlenk1eQqKYB32IzXvwzv2__QKmYNpLF8kRGVJVAMaKsraFwsAm4NMqDIO';
const DOCS = 'https://docs.xhrdev.com/';

const CUSTOMERS = ['supergood.ai', 'trymemorylane.com'];

export function Customers() {
  return (
    <section style={{ padding: '0 0 88px' }}>
      <div className="wrap">
        <div
          style={{
            alignItems: 'center',
            borderBottom: '1px solid var(--line)',
            borderTop: '1px solid var(--line)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 32,
            padding: '20px 0',
          }}
        >
          <span
            className="mono"
            style={{
              color: 'var(--faint)',
              fontSize: 11,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
            }}
          >
            in production at
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 36 }}>
            {CUSTOMERS.map((n) => (
              <span
                key={n}
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  opacity: 0.75,
                }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const WHAT_CARDS = [
  {
    d: 'we solve at the payload level. no playwright instance to spin up, no cpu and ram burned per challenge.',
    t: 'milliseconds, not seconds',
  },
  {
    d: 'a docker image on your own hosts. no third-party api call, so nothing to explain in a security review.',
    t: 'runs in your infra',
  },
  {
    d: 'no per-request or per-gb billing at any volume. one number, whatever your traffic does.',
    t: 'flat fee, unlimited solves',
  },
];

const VENDORS = ['datadome', 'akamai bot manager'];

export function What() {
  return (
    <section id="what" style={{ padding: '0 0 104px' }}>
      <div className="wrap">
        <h2 className="h2">what it does</h2>
        <p className="lede">
          no browsers, no human solvers, no external vendors in the loop. we run
          the challenge inside our own sandbox and generate the payload directly
          — your worker calls the container on localhost and gets a valid token
          back.
        </p>
        <div
          className="three"
          style={{
            background: 'var(--line)',
            border: '1px solid var(--line)',
            borderRadius: 12,
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(3, 1fr)',
            marginTop: 40,
            overflow: 'hidden',
          }}
        >
          {WHAT_CARDS.map((c) => (
            <div
              key={c.t}
              style={{ background: 'var(--card)', padding: '26px 24px 28px' }}
            >
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                }}
              >
                {c.t}
              </div>
              <div
                style={{
                  color: 'var(--mute)',
                  fontSize: 14.5,
                  lineHeight: 1.65,
                  marginTop: 10,
                }}
              >
                {c.d}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            marginTop: 28,
          }}
        >
          <span
            className="mono"
            style={{
              color: 'var(--faint)',
              fontSize: 11,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
            }}
          >
            supported today
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {VENDORS.map((v) => (
              <span
                className="mono"
                key={v}
                style={{
                  alignItems: 'center',
                  border: '1px solid var(--line-2)',
                  borderRadius: 999,
                  color: 'var(--fg)',
                  display: 'inline-flex',
                  fontSize: 12.5,
                  gap: 8,
                  padding: '6px 14px',
                }}
              >
                <span
                  className="ping"
                  style={{
                    background: 'var(--good)',
                    borderRadius: '50%',
                    height: 6,
                    width: 6,
                  }}
                />
                {v}
              </span>
            ))}
          </div>
          <a
            className="mono"
            href={CAL}
            rel="noopener noreferrer"
            style={{
              color: 'var(--accent)',
              fontSize: 12.5,
              textDecoration: 'none',
            }}
            target="_blank"
          >
            need another one? →
          </a>
        </div>
      </div>
    </section>
  );
}

const MAINT_CARDS = [
  {
    d: "we watch the live challenges continuously. when a vendor ships new logic, the tooling auto-discovers what changed — we're not waiting on your bug report.",
    t: 'our tooling finds the change',
  },
  {
    d: 'the fix is generated and tested automatically, then a new image goes to your private registry. you pull it and carry on.',
    t: 'it patches the solver',
  },
  {
    d: 'we solve the challenge vm itself, not individual scripts, so most vendor changes never reach you in the first place.',
    t: 'built to survive minor updates',
  },
];

export function Maintenance() {
  return (
    <section id="maintenance" style={{ padding: '0 0 104px' }}>
      <div className="wrap">
        <h2 className="h2">
          vendor updates
          <br />
          don&apos;t take you down
        </h2>
        <p className="lede">
          &quot;what happens when akamai changes something?&quot; is the
          question everyone asks. the answer is that our tooling discovers the
          change and patches the solver — that loop is the product.
        </p>
        <div
          className="three"
          style={{
            background: 'var(--line)',
            border: '1px solid var(--line)',
            borderRadius: 12,
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(3, 1fr)',
            marginTop: 40,
            overflow: 'hidden',
          }}
        >
          {MAINT_CARDS.map((c) => (
            <div
              key={c.t}
              style={{ background: 'var(--card)', padding: '26px 24px 28px' }}
            >
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                }}
              >
                {c.t}
              </div>
              <div
                style={{
                  color: 'var(--mute)',
                  fontSize: 14.5,
                  lineHeight: 1.65,
                  marginTop: 10,
                }}
              >
                {c.d}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const REQUEST_PATH = ['your worker', 'xhr.dev container', 'target site'];

export function CTA() {
  return (
    <section style={{ padding: '0 0 96px' }}>
      <div className="wrap">
        <div
          className="card"
          style={{
            alignItems: 'center',
            background: 'var(--bg-2)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            justifyContent: 'space-between',
            padding: '40px 40px 42px',
          }}
        >
          <div>
            <h2 className="h2" style={{ fontSize: 'clamp(26px, 3vw, 34px)' }}>
              see it running in your stack
            </h2>
            <p
              className="mono"
              style={{ color: 'var(--mute)', fontSize: 13, marginTop: 12 }}
            >
              20 minutes with the engineers who build it.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a
              className="btn btn-a"
              href={CAL}
              rel="noopener noreferrer"
              target="_blank"
            >
              book a call →
            </a>
            <a className="btn btn-b" href="mailto:hello@xhrdev.com">
              hello@xhrdev.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SelfHosted() {
  return (
    <section
      id="self-hosted"
      style={{
        background: 'var(--bg-2)',
        borderBottom: '1px solid var(--line)',
        borderTop: '1px solid var(--line)',
        overflow: 'hidden',
        padding: '96px 0',
        position: 'relative',
      }}
    >
      <div className="wash" style={{ opacity: 0.7 }} />
      <div className="two wrap" style={{ position: 'relative' }}>
        <div
          style={{
            alignItems: 'center',
            display: 'grid',
            gap: 56,
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <div>
            <h2 className="h2">
              nothing leaves
              <br />
              your network
            </h2>
            <p className="lede">
              every other option means shipping your customers&apos; requests,
              cookies and tokens to someone else&apos;s api — the thing
              enterprise security reviews stop. xhr.dev runs on your side of the
              boundary, and works with outbound internet turned off entirely.
            </p>
            <a
              className="btn btn-b"
              href={DOCS}
              rel="noopener noreferrer"
              style={{ marginTop: 28 }}
              target="_blank"
            >
              deployment docs
            </a>
          </div>
          <div className="card" style={{ padding: '26px 24px' }}>
            <div
              className="mono"
              style={{
                color: 'var(--faint)',
                fontSize: 10.5,
                letterSpacing: '.12em',
                marginBottom: 18,
              }}
            >
              REQUEST PATH
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              {REQUEST_PATH.map((s, i) => (
                <div
                  key={s}
                  style={{ alignItems: 'center', display: 'flex', gap: 14 }}
                >
                  <span
                    className="mono"
                    style={{ color: 'var(--faint)', fontSize: 11, width: 18 }}
                  >
                    0{i + 1}
                  </span>
                  <div
                    style={{
                      background:
                        i === 1 ? 'rgba(77,124,254,.08)' : 'var(--bg-2)',
                      border:
                        '1px solid ' +
                        (i === 1 ? 'var(--accent)' : 'var(--line)'),
                      borderRadius: 8,
                      flex: 1,
                      fontSize: 15,
                      fontWeight: 500,
                      padding: '13px 16px',
                    }}
                  >
                    {s}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mono"
              style={{
                color: 'var(--mute)',
                fontSize: 12,
                lineHeight: 1.8,
                marginTop: 20,
              }}
            >
              <div>
                <span style={{ color: 'var(--good)' }}>✓</span> no external
                solving api
              </div>
              <div>
                <span style={{ color: 'var(--good)' }}>✓</span> works with
                egress disabled
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { FAQ } from '@/app/home/faq';
