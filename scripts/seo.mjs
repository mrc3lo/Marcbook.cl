import { site } from '../src/config/site.js';
import { seo } from '../src/config/seo.js';
import { branding } from '../src/config/branding.js';
import { services } from '../src/data/services.js';

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const url = path => new URL(path, site.url).href;

export function structuredData() {
  const organizationId = `${site.url}#organization`;
  const serviceNodes = services.map((service, index) => ({
    '@type': 'Service',
    '@id': `${site.url}#service-${index + 1}`,
    name: service.name,
    description: service.text,
    serviceType: service.name,
    provider: { '@id': organizationId },
    areaServed: { '@type': 'City', name: 'Concepción' },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `https://wa.me/${site.whatsappNumber}`,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: site.name,
        url: site.url,
        description: seo.description,
        logo: { '@type': 'ImageObject', url: url(branding.stacked.src), width: 6250, height: 6250 },
        image: url(seo.image),
        telephone: `+${site.whatsappNumber}`,
        sameAs: [site.instagramUrl],
        areaServed: { '@type': 'City', name: 'Concepción' },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'atención al cliente',
          telephone: `+${site.whatsappNumber}`,
          availableLanguage: 'Spanish',
          areaServed: 'Concepción, Chile',
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '19:00',
          },
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios de reparación y mantención de computadores',
          itemListElement: serviceNodes.map(service => ({
            '@type': 'Offer', itemOffered: { '@id': service['@id'] },
          })),
        },
      },
      { '@type': 'WebSite', '@id': `${site.url}#website`, name: site.name, url: site.url, inLanguage: seo.language, publisher: { '@id': organizationId } },
      { '@type': 'WebPage', '@id': `${site.url}#webpage`, name: seo.title, description: seo.description, url: site.url, inLanguage: seo.language, isPartOf: { '@id': `${site.url}#website` }, about: { '@id': organizationId }, primaryImageOfPage: { '@type': 'ImageObject', url: url(seo.image), width: seo.imageWidth, height: seo.imageHeight } },
      ...serviceNodes,
    ],
  };
}

export function seoHead() {
  const meta = (name, content, property = false) => `<meta ${property ? 'property' : 'name'}="${escape(name)}" content="${escape(content)}" />`;
  return [
    `<title>${escape(seo.title)}</title>`,
    meta('description', seo.description),
    meta('robots', 'index, follow, max-image-preview:large'),
    `<link rel="canonical" href="${escape(site.url)}" />`,
    meta('og:type', 'website', true),
    meta('og:site_name', site.name, true),
    meta('og:locale', seo.locale, true),
    meta('og:title', seo.title, true),
    meta('og:description', seo.description, true),
    meta('og:url', site.url, true),
    meta('og:image', url(seo.image), true),
    meta('og:image:width', seo.imageWidth, true),
    meta('og:image:height', seo.imageHeight, true),
    meta('og:image:alt', seo.imageAlt, true),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', seo.title),
    meta('twitter:description', seo.description),
    meta('twitter:image', url(seo.image)),
    meta('twitter:image:alt', seo.imageAlt),
    `<script type="application/ld+json">${JSON.stringify(structuredData()).replaceAll('<', '\\u003c')}</script>`,
  ].join('\n    ');
}

export function robotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${url('/sitemap.xml')}\n`;
}

export function sitemapXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(site.url)}</loc></url></urlset>\n`;
}
