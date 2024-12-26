import { type CollectionEntry, getCollection, getEntry } from "astro:content";
import { SITE } from "./config";

export function getUniqueTags(posts: CollectionEntry<"blog">[]): string[] {
  let tags: string[] = [];
  const filteredPosts = posts.filter(({ data }) => !data.draft);

  filteredPosts.forEach((post) => {
    tags = [...tags, ...post.data.tags].filter(
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
      if (item.data.tags.includes(tag)) {
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
  let pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i];
  }

  return pageNumbers;
}

export async function getPublishedPosts() {
  const posts = await getCollection("blog", ({ data }) => {
    return data.draft !== true;
  });
  return posts;
}

export async function getTimelinePosts() {
  const posts = await getPublishedPosts();

  return posts.sort((a, b) => {
    var dateA = new Date(a.data.pubDate).getTime();
    var dateB = new Date(b.data.pubDate).getTime();
    return dateA < dateB ? 1 : -1;
  });
}

export function sanitizeSlug(slug: string): string {
  return slug.replaceAll(" ", "-");
}
