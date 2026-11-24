import { Terminal } from '@/app/home/terminal';

const CAL =
  'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2uDlsqLG_VZLl3s3ri_-YIXD3xXi5WzY21o0dFuk6Gq4HhcXwJBxUz-1K6kMGxTEf4oIPny-nV';
const DOCS = 'https://docs.xhr.dev/';

export function Hero() {
  return (
    <section
      style={{
        overflow: 'hidden',
        padding: '136px 0 72px',
        position: 'relative',
      }}
    >
      <div className="wash" />
      <div className="rise wrap" style={{ position: 'relative' }}>
        <div
          className="two"
          style={{
            alignItems: 'center',
            display: 'grid',
            gap: 56,
            gridTemplateColumns: '1fr .9fr',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: '"Arial Black", var(--font-dm-sans), sans-serif',
                fontSize: 'clamp(42px, 5.6vw, 64px)',
                fontStyle: 'italic',
                fontWeight: 900,
                letterSpacing: '-0.055em',
                lineHeight: 0.98,
                margin: 0,
              }}
            >
              no more
              <br />
              <span style={{ color: 'var(--accent)' }}>anti-bot blocks.</span>
            </h1>
            <p className="lede" style={{ fontSize: 19, maxWidth: 440 }}>
              solvers for the hardest challenges.
              <br />
              still working after the vendor&apos;s next update.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                marginTop: 32,
              }}
            >
              <a
                className="btn btn-a"
                href={CAL}
                rel="noopener noreferrer"
                target="_blank"
              >
                book a call →
              </a>
              <a
                className="btn btn-b"
                href={DOCS}
                rel="noopener noreferrer"
                target="_blank"
              >
                read the docs
              </a>
            </div>
          </div>
          <Terminal />
        </div>
      </div>
    </section>
  );
}
