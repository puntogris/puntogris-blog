export default function PostCard({ post }) {
  return (
    <article class="flex bg-gray-800 rounded-lg overflow-auto flex-col xs:flex-row">
      {post.frontmatter.image && (
        <a
          class="flex h-full object-cover basis-0 shrink-0 grow-0 max-w-screen-xs xs:basis-64 md:basis-96"
          href={post.url}
        >
          <img
            src={post.frontmatter.image.url}
            alt={post.frontmatter.image.alt}
            loading="lazy"
          />
        </a>
      )}
      <div class="flex flex-col justify-between p-6 gap-y-3">
        <a class="text-2xl font-medium text-gray-100" href={post.url}>
          {post.frontmatter.title}
        </a>
        <p class="text-sm text-gray-400">{post.frontmatter.description}</p>
        <div class="flex flex-wrap gap-3 text-gray-300">
          {post.frontmatter.date}
          {post.frontmatter.tags.map((tag) => (
            <a class="hover:text-blue-400" href={`/tags/${tag}`}>
              {tag}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
