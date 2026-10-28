import { readFile, writeFile } from 'node:fs/promises';
import { branding } from '../src/config/branding.js';

// El favicon encuadra el PNG oficial, sin redibujar la marca.
const artwork = branding.stacked;
const [x, y, width, height] = artwork.bounds;
const edge = Math.max(width, height) + 220;
const left = x + width / 2 - edge / 2;
const top = y + height / 2 - edge / 2;
const image = await readFile(`public${artwork.src}`);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${left} ${top} ${edge} ${edge}"><image href="data:image/png;base64,${image.toString('base64')}" width="${artwork.canvasSize}" height="${artwork.canvasSize}"/></svg>`;
await writeFile('public/favicon.svg', svg);
console.log('Favicon actualizado con el logo oficial.');
