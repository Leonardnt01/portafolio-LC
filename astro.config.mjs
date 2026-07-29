// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // Necesario para generar el sitemap y las URL canonicas absolutas.
  site: 'https://portafolio-leonardo.vercel.app',
  integrations: [react(), tailwind(), sitemap()],
});
