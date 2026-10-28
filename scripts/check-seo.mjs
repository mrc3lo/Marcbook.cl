import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { site } from '../src/config/site.js';
import { seo } from '../src/config/seo.js';
import { services } from '../src/data/services.js';

const html = await readFile('dist/index.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;
const canonical = document.querySelector('link[rel="canonical"]')?.href;
const metadata = name => document.querySelector(`meta[name="${name}"],meta[property="${name}"]`)?.content;

assert.equal(document.documentElement.lang, 'es-CL');
assert.equal(document.querySelectorAll('title').length, 1);
assert.equal(document.title, seo.title);
assert.match(document.title, /servicio técnico.*Concepción/i);
assert.equal(document.querySelectorAll('meta[name="description"]').length, 1);
assert.equal(metadata('description'), seo.description);
assert.equal(canonical, site.url);
assert.equal(new URL(canonical).protocol, 'https:');
assert.equal(metadata('og:url'), canonical);
assert.equal(metadata('og:title'), document.title);
assert.match(metadata('robots'), /index/);
assert.ok(!metadata('robots').includes('noindex'));
assert.equal(metadata('twitter:card'), 'summary_large_image');
assert.equal(document.querySelectorAll('h1').length, 1);
assert.equal(document.querySelectorAll('main').length, 1);
assert.equal(document.querySelectorAll('.service-card').length, services.length);
assert.match(document.querySelector('.hero-description').textContent, /servicio técnico de MacBook, iMac y PC en Concepción/i);
assert.ok(document.body.textContent.includes(site.attentionLabel));
assert.ok(!html.includes('<!--app-html-->') && !html.includes('<!--seo-head-->'));

const graph = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
const organization = graph['@graph'].find(node => node['@type'] === 'Organization');
assert.equal(organization.telephone, `+${site.whatsappNumber}`);
assert.equal(organization.url, canonical);
assert.equal(organization.address, undefined, 'No inventar ni publicar una dirección privada.');
assert.equal(organization.aggregateRating, undefined);
assert.equal(graph['@graph'].filter(node => node['@type'] === 'Service').length, services.length);
assert.ok(!graph['@graph'].some(node => node['@type'] === 'LocalBusiness' || node['@type'] === 'FAQPage'));
const ids = new Set(graph['@graph'].map(node => node['@id']));
function checkReferences(node) {
  if (!node || typeof node !== 'object') return;
  if (Object.keys(node).length === 1 && node['@id']) assert.ok(ids.has(node['@id']), `Referencia no resuelta: ${node['@id']}`);
  Object.values(node).forEach(value => Array.isArray(value) ? value.forEach(checkReferences) : checkReferences(value));
}
checkReferences(graph);

for (const image of document.querySelectorAll('img')) {
  assert.ok(image.alt);
  assert.ok(Number(image.width) > 0 && Number(image.height) > 0);
  assert.equal(image.getAttribute('loading'), 'lazy');
  assert.equal(image.getAttribute('decoding'), 'async');
  assert.ok((await stat(`dist${image.getAttribute('src')}`)).size < 300_000);
}
for (const link of document.querySelectorAll('a[href^="#"]')) {
  assert.ok(document.getElementById(link.getAttribute('href').slice(1)), `Ancla sin destino: ${link.href}`);
}
for (const asset of document.querySelectorAll('script[src],link[rel="stylesheet"],link[rel="icon"],svg image')) {
  const source = asset.getAttribute('src') ?? asset.getAttribute('href');
  if (source?.startsWith('/')) await stat(`dist${source}`);
}
const socialImage = new URL(metadata('og:image'));
assert.equal(socialImage.origin, new URL(canonical).origin);
await stat(`dist${socialImage.pathname}`);
const robots = await readFile('dist/robots.txt', 'utf8');
assert.ok(robots.includes(`Sitemap: ${new URL('/sitemap.xml', canonical).href}`));
assert.ok(!/Disallow:\s*\//i.test(robots));
const sitemap = new JSDOM(await readFile('dist/sitemap.xml', 'utf8'), { contentType: 'text/xml' });
assert.deepEqual([...sitemap.window.document.querySelectorAll('loc')].map(node => node.textContent), [canonical]);
assert.ok(!html.includes('src/main.jsx'));
sitemap.window.close();
dom.window.close();
console.log('OK SEO: metadatos, canonical, HTML sin JavaScript, JSON-LD, privacidad, fotos, anclas, assets, robots y sitemap. No sustituye pruebas del dominio publicado ni validación de Google.');
