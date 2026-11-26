import { withBase } from '@/lib/base-path';

const DOCS = 'https://docs.xhrdev.com/';

const LINKS: [string, string][] = [
  ['docs', DOCS],
  ['status', 'https://status.xhr.dev/'],
  ['linkedin', 'https://www.linkedin.com/company/xhrdev/'],
  ['hello@xhr.dev', 'mailto:hello@xhr.dev'],
];

export const Footer = () => (
  <footer
    style={{ borderTop: '1px solid var(--line)', padding: '32px 0 44px' }}
  >
    <div
      className="wrap"
      style={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 20,
        justifyContent: 'space-between',
      }}
    >
      <div style={{ alignItems: 'center', display: 'flex', gap: 20 }}>
        <img
          alt="xhr.dev"
          height={18}
          src={withBase('/assets/logo.svg')}
          style={{ display: 'block', height: 18, width: 'auto' }}
          width={79}
        />
        <span className="mono" style={{ color: 'var(--faint)', fontSize: 11 }}>
          © 2026 xhr.dev software inc.
        </span>
      </div>
      <div
        className="mono"
        style={{ display: 'flex', flexWrap: 'wrap', fontSize: 12.5, gap: 24 }}
      >
        {LINKS.map(([label, href]) => (
          <a
            className="lk"
            href={href}
            key={label}
            {...(href.startsWith('http')
              ? { rel: 'noopener noreferrer', target: '_blank' }
              : {})}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);
