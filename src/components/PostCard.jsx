export default function PostCard({ post }) {
  return (
    <article class="flex bg-gray-800 rounded-lg overflow-auto flex-col xs:flex-row">
      {post.frontmatter.image && (
        <a
          class="flex basis-0 shrink-0 xs:basis-64 md:basis-96 grow-0 max-w-screen-xs"
          href={post.url}
        >
          <picture>
            <source
              srcset="https://arina.loli.net/2022/12/31/KURW6omZCO8XGA1.jpg/480/400"
              media="(max-width: 480px)"
            />
            <img
              class="h-full object-cover"
              src={post.frontmatter.image.url}
              alt={post.frontmatter.image.alt}
              loading="lazy"
            />
          </picture>
        </a>
      )}
      <div class="flex flex-col justify-between p-6">
        <a class="text-2xl font-medium text-gray-100" href={post.url}>
          {post.frontmatter.title}
        </a>
        <p class="text-sm text-gray-400">{post.frontmatter.description}</p>
        <div class="flex flex-wrap gap-3 text-gray-300">
          <div>{post.frontmatter.pubDate}</div>
          {post.frontmatter.tags.map((tag) => (
            <a class="hover:text-blue-400" href={`/categories/${tag}`}>
              {tag}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
