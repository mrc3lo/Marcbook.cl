import { defineConfig } from 'vite';
import { seoHead } from './scripts/seo.mjs';

export default defineConfig({
  esbuild: { jsx: 'automatic' },
  plugins: [
    {
      name: 'marcbook-metadata',
      transformIndexHtml(html) {
        return html.replace('<!--seo-head-->', seoHead());
      },
    },
  ],
});
