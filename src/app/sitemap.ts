import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: 'weekly',
      lastModified: new Date(),
      priority: 1,
      url: 'https://xhrdev.com/',
    },
  ];
}
