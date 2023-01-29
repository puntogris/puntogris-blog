function getUniqueTags(posts) {
  let tags = [];
  const filteredPosts = posts.filter(({ frontmatter }) => !frontmatter.draft);
  filteredPosts.forEach((post) => {
    tags = [...tags, ...post.frontmatter.tags].filter(
      (value, index, self) => self.indexOf(value) === index
    );
  });
  return tags;
}

export default getUniqueTags;
