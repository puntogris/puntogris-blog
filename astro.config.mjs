import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";

export default defineConfig({
  site: "https://www.blog.puntogris.com",
  integrations: [tailwind(), sitemap(), preact()],
  markdown: {
    shikiConfig: {
      theme: "tokyo-night",
      langs: [],
      wrap: true,
    },
  },
});
