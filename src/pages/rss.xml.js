import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function get(context) {
  const posts = await getCollection("blog");
  return rss({
    title: "Puntogris blog",
    description: "Blog about coding, mostly Android stuff",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
