import getPublishedPosts from "./getPublishedPosts";
import getUniqueTags from "./getUniqueTags";
import sanitizeSlug from "./sanitizeSlug";

async function getTagsData() {
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

export default getTagsData;
