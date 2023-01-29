import type { MarkdownInstance } from "astro";

async function getPublishedPosts() {
  const posts = import.meta.glob<MarkdownInstance<Record<string, any>>>(
    "../pages/posts/*.md",
    {
      eager: true,
    }
  );
  return Object.values(posts).filter(({ frontmatter }) => !frontmatter.draft);
}

export default getPublishedPosts;
