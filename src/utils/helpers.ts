import { SITE } from "./config";
import type { MarkdownInstance } from "astro";

export function getUniqueTags(posts): string[] {
  let tags = [];
  const filteredPosts = posts.filter(({ frontmatter }) => !frontmatter.draft);
  filteredPosts.forEach((post) => {
    tags = [...tags, ...post.frontmatter.tags].filter(
      (value, index, self) => self.indexOf(value) === index
    );
  });
  return tags;
}

export async function getTagsData() {
  const posts = await getPublishedPosts();
  const tags = getUniqueTags(posts);

  return tags.map((tag) => ({
    tag: tag,
    slug: sanitizeSlug(tag),
    posts: posts.reduce((acc, item) => {
      if (item.frontmatter.tags.includes(tag)) {
        return (acc = acc + 1);
      } else {
        return acc;
      }
    }, 0),
  }));
}

export function getNumberOfWords(content: string) {
  const clean = content.replace(/<\/?[^>]+(>|$)/g, "");
  const words = clean.split(/\s/g).filter((str) => str !== "");
  return words.length;
}

export function getPageNumbers(numberOfPosts: number) {
  const numberOfPages = numberOfPosts / SITE.postPerPage;
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i];
  }
  return pageNumbers;
}

export async function getPublishedPosts() {
  const posts = import.meta.glob<MarkdownInstance<Record<string, any>>>(
    "../pages/posts/*.md",
    {
      eager: true,
    }
  );
  return Object.values(posts).filter(({ frontmatter }) => !frontmatter.draft);
}

export async function getTimelinePosts() {
  const posts = await getPublishedPosts();
  return posts.sort(sortFunction);
}

export function sortFunction(postA, postB) {
  var dateA = new Date(postA.frontmatter.pubDate).getTime();
  var dateB = new Date(postB.frontmatter.pubDate).getTime();
  return dateA < dateB ? 1 : -1;
}

export function sanitizeSlug(slug: string): string {
  return slug.replaceAll(" ", "-");
}
