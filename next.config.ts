import type { NextConfig } from 'next';

// set by the preview workflow (e.g. /pr-preview/pr-12) so a pr build can be
// served from a subpath of the pages site; unset for production.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  // `next dev` otherwise appends a "nextjs-agent-rules" block to CLAUDE.md on
  // every start, which is a vendor-owned edit to a file this repo maintains by
  // hand. Off, so the working tree stays clean.
  agentRules: false,

  basePath,

  // the site is fully static: `next build` writes it to `out/`, which the
  // pages workflow publishes to GitHub Pages.
  images: { unoptimized: true },
  output: 'export',
};

export default nextConfig;
