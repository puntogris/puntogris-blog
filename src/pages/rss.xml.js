import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function get(context) {
  return rss({
    title: "Puntogris blog",
    description: "Blog about coding, mostly Android stuff",
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob("./posts/*.{md,mdx}")),
  });
}
