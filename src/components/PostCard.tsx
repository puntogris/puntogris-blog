import { sanitizeSlug } from "../utils/helpers";

export default function PostCard({ post }) {
  return (
    <article class="flex flex-col overflow-auto rounded-lg bg-gray-800 xs:flex-row">
      {post.frontmatter.image && (
        <a
          class="flex h-full max-w-screen-xs shrink-0 grow-0 basis-0 object-cover xs:basis-64 md:basis-96"
          href={post.url}
        >
          <img
            src={post.frontmatter.image.url}
            alt={post.frontmatter.image.alt}
            loading="lazy"
          />
        </a>
      )}
      <div class="flex flex-col justify-between gap-y-3 p-6">
        <a class="text-2xl font-medium text-gray-100" href={post.url}>
          {post.frontmatter.title}
        </a>
        <p class="text-sm text-gray-400">{post.frontmatter.description}</p>
        <div class="flex flex-wrap gap-3 text-gray-300">
          {post.frontmatter.pubDate}
          {post.frontmatter.tags.map((tag) => (
            <a href={`/tags/${sanitizeSlug(tag)}`}>{tag}</a>
          ))}
        </div>
      </div>
    </article>
  );
}
