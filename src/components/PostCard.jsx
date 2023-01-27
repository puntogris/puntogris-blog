export default function PostCard({ post }) {
  return (
    <div class="mt-4 p-4 rounded-lg bg-gray-800">
      <a class="text-gray-300" href={post.url}>
        {post.frontmatter.title}
      </a>
      <p class="text-gray-400">{post.frontmatter.description}</p>
      <div class="flex gap-3 text-gray-400">
        <div>{post.frontmatter.pubDate}</div>
        {post.frontmatter.tags.map((tag) => (
          <a class="hover:text-blue-400" href={`/categories/${tag}`}>
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
}