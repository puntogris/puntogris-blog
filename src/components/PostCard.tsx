import { CollectionEntry } from "astro:content";
import { sanitizeSlug } from "../utils/helpers";

export default function PostCard({ post }: { post: CollectionEntry<"blog"> }) {
  return (
    <article class="flex flex-col overflow-auto rounded-lg bg-content xs:flex-row">
      {post.data.image && (
        <a class="flex max-h-60 w-full xs:w-2/5" href={`/posts/${post.slug}`}>
          <img
            src={post.data.image.url}
            alt={post.data.image.alt}
            loading="lazy"
            class="w-full object-cover brightness-90 filter"
          />
        </a>
      )}
      <div class="flex flex-col justify-between gap-y-3 p-6">
        <a
          class="text-2xl font-semibold text-gray-200"
          href={`/posts/${post.slug}`}
        >
          {post.data.title}
        </a>
        <p class="text-base text-gray-400">{post.data.description}</p>
        <div class="flex flex-wrap items-center gap-3 text-gray-300">
          {post.data.pubDate}
          <span class="text-xs">&#x2022;</span>
          {post.data.tags.map((tag) => (
            <a href={`/tags/${sanitizeSlug(tag)}`}>{tag}</a>
          ))}
        </div>
      </div>
    </article>
  );
}
