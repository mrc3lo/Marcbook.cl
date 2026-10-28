import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { branding } from '../src/config/branding.js';
import { readRgbaCrop, composeLogo, encodePng, encodeIco } from './lib/png.mjs';

// Derivados de compatibilidad: los PNG oficiales permanecen intactos.
const artwork = branding.stacked;
const cropped = readRgbaCrop(await readFile(`public${artwork.src}`), artwork.bounds);
const frames = [16, 32, 48, 64, 96].map(size => ({
  size,
  png: encodePng(composeLogo(cropped, size, size, Math.round(size * .9))),
}));
await writeFile('public/favicon.ico', encodeIco(frames));
await writeFile('public/favicon-96.png', frames.find(frame => frame.size === 96).png);
await writeFile('public/apple-touch-icon.png', encodePng(composeLogo(cropped, 180, 180, 162)));
await mkdir('public/social', { recursive: true });
await writeFile('public/social/marcbook-share.png', encodePng(composeLogo(cropped, 1200, 630, 600)));
console.log('Logo oficial exportado: favicon ICO/PNG, icono Apple y tarjeta social PNG 1200×630.');
