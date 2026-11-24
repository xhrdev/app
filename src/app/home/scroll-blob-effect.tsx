'use client';

import { useEffect } from 'react';

export function ScrollBlobEffect() {
  useEffect(() => {
    const shell = document.querySelector<HTMLElement>('.site-shell');
    if (!shell) return;

    let frame = 0;

    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;

      shell.style.setProperty('--blob-opacity', String(0.08 + progress * 0.87));
      shell.style.setProperty('--blob-scale', String(0.55 + progress * 2.45));
      shell.style.setProperty(
        '--blob-saturation',
        String(0.6 + progress * 2.4)
      );
      shell.style.setProperty('--blob-blur', `${44 - progress * 20}px`);
      shell.style.setProperty('--blob-x', `${-8 + progress * 18}%`);
      shell.style.setProperty('--blob-y', `${progress * -18}%`);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return null;
}
