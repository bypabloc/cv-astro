import { defineConfig } from 'astro/config';
import basicSsl from "@vitejs/plugin-basic-ssl";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  vite: {
    // plugins: [basicSsl()],
    // server: {
    //   https: true
    // }
  },
  server: { port: 3000, host: true },
  integrations: [vue()]
});
