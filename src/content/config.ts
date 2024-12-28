import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.string(),
      description: z.string(),
      author: z.string(),
      draft: z.boolean(),
      tags: z.array(z.string()),
      image: z
        .object({
          cover: image(),
          alt: z.string(),
        })
        .optional(),
    }),
});

export const collections = {
  blog: blogCollection,
};
