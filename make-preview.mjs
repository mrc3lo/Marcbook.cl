import { readFile, writeFile, readdir } from 'node:fs/promises';
import { branding } from './src/config/branding.js';

const assets = await readdir('dist/assets');
let js = await readFile(`dist/assets/${assets.find(file => file.endsWith('.js'))}`, 'utf8');
const css = await readFile(`dist/assets/${assets.find(file => file.endsWith('.css'))}`, 'utf8');
let html = await readFile('dist/index.html', 'utf8');
const images = [
  '/trabajos/optimized/limpieza.jpg',
  '/trabajos/optimized/ssd.jpg',
  branding.horizontal.src,
  branding.stacked.src,
];
for (const file of images) {
  const image = await readFile(`dist${file}`);
  const mime = file.endsWith('.png') ? 'image/png' : 'image/jpeg';
  const data = `data:${mime};base64,${image.toString('base64')}`;
  // Reemplazar rutas locales exactas, sin modificar URLs absolutas de metadatos.
  js = js.replaceAll(JSON.stringify(file), JSON.stringify(data));
  html = html.replaceAll(JSON.stringify(file), JSON.stringify(data));
}
const icon = await readFile('public/favicon.svg');
html = html.replace(/<link\b(?=[^>]*\brel="icon")[^>]*>/, `<link rel="icon" href="data:image/svg+xml;base64,${icon.toString('base64')}" />`);
html = html.replace(/<link\b(?=[^>]*\brel="stylesheet")(?=[^>]*\bhref="\/assets\/)[^>]*>/, () => `<style>${css.replaceAll('</style', '<\\/style')}</style>`);
html = html.replace(/<script\b(?=[^>]*\btype="module")(?=[^>]*\bsrc=)[^>]*><\/script>/, () => `<script type="module">${js.replaceAll('</script', '<\\/script')}</script>`);
// Esta copia de revisión no debe competir con la página de producción.
html = html.replace(/(<meta name="robots" content=")[^"]*/, '$1noindex, nofollow');
await writeFile('REVISAR.html', html);
console.log('REVISAR.html actualizado con contenido prerenderizado y recursos integrados.');
