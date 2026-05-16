import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://labs.allscale.io',
  integrations: [react()],
  build: {
    inlineStylesheets: 'auto',
  },
});
