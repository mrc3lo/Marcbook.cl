import { readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { render } from '../.prerender/entry-server.js';
import { robotsTxt, sitemapXml } from './seo.mjs';

const template = await readFile('dist/index.html', 'utf8');
if (!template.includes('<!--app-html-->')) throw new Error('Falta el punto de inserción del HTML prerenderizado.');
await writeFile('dist/index.html', template.replace('<!--app-html-->', render()));
await writeFile('dist/robots.txt', robotsTxt());
await writeFile('dist/sitemap.xml', sitemapXml());

// No publicar metadatos locales del Finder ni la compilación temporal.
async function removeFinderFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = `${directory}/${entry.name}`;
    if (entry.name === '.DS_Store') await rm(file);
    else if (entry.isDirectory()) await removeFinderFiles(file);
  }
}
await removeFinderFiles('dist');
await rm('.prerender', { recursive: true, force: true });
console.log('HTML completo, datos estructurados, robots.txt y sitemap.xml generados.');
