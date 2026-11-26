import { withBase } from '@/lib/base-path';

const CAL =
  'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0StxPnhSfRoPXxXNSlenk1eQqKYB32IzXvwzv2__QKmYNpLF8kRGVJVAMaKsraFwsAm4NMqDIO';
const DOCS = 'https://docs.xhrdev.com/';

export const Navbar = () => (
  <nav
    className="frosted-nav"
    style={{
      left: 0,
      position: 'fixed',
      right: 0,
      top: 0,
      zIndex: 100,
    }}
  >
    <div
      className="wrap"
      style={{
        alignItems: 'center',
        display: 'flex',
        height: 64,
        justifyContent: 'space-between',
      }}
    >
      <a aria-label="xhrdev" href={withBase('/')}>
        <img
          alt="xhrdev"
          height={22}
          src={withBase('/assets/logo.svg')}
          style={{ display: 'block', height: 22, width: 'auto' }}
          width={96}
        />
      </a>

      <div
        className="hide-s mono"
        style={{ alignItems: 'center', display: 'flex', fontSize: 13, gap: 28 }}
      >
        <a className="lk" href="#what">
          what it does
        </a>
        <a className="lk" href="#maintenance">
          maintenance
        </a>
        <a className="lk" href="#self-hosted">
          self-hosted
        </a>
        <a className="lk" href="#faq">
          faq
        </a>
        <a className="lk" href={DOCS} rel="noopener noreferrer" target="_blank">
          docs
        </a>
      </div>

      <a
        className="btn btn-a"
        href={CAL}
        rel="noopener noreferrer"
        style={{ fontSize: 13, padding: '9px 16px' }}
        target="_blank"
      >
        book a call →
      </a>
    </div>
  </nav>
);
