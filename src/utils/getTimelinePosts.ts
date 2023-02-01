import getPublishedPosts from "./getPublishedPosts";

async function getTimelinePosts() {
  const posts = await getPublishedPosts();
  return posts.sort(sortFunction);
}

function sortFunction(postA, postB) {
  var dateA = new Date(postA.frontmatter.pubDate).getTime();
  var dateB = new Date(postB.frontmatter.pubDate).getTime();
  return dateA < dateB ? 1 : -1;
}

export default getTimelinePosts;
