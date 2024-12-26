import type { CollectionEntry } from "astro:content";

function Timeline({ posts }: { posts: CollectionEntry<"blog">[] }) {
  let currentYear = 0;

  const timeline = posts.map((post) => {
    const postYear = new Date(post.data.pubDate).getFullYear();
    const showDivider = currentYear != 0 && postYear != currentYear;
    const showYear = postYear != currentYear;
    currentYear = postYear;

    return (
      <>
        {showDivider && (
          <div class="relative ml-7 h-4 border-l-2 border-slate-400 pl-4" />
        )}
        {showYear && (
          <div class="flex w-14 justify-center rounded-md bg-blue-500 px-3 py-0.5 text-gray-200">
            {postYear}
          </div>
        )}
        <div class="relative ml-7 border-l-2 border-slate-400 pl-4 pt-4">
          <div class="absolute -left-[7.5px] top-6 h-3 w-3 rounded-full bg-slate-400" />
          <div class="w-full overflow-hidden rounded-md bg-slate-800 px-5 py-4 text-gray-100">
            <div class="text-sm text-gray-400">
              {getPostMonthAndDay(post.data.pubDate)}
            </div>
            <a class="text-lg text-gray-300" href={`/posts/${post.slug}`}>
              {post.data.title}
            </a>
          </div>
        </div>
      </>
    );
  });

  return <div class="mt-4 flex flex-col">{timeline}</div>;
}

function getPostMonthAndDay(postDate: string) {
  const date = new Date(String(postDate));
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  return `${month}-${day}`;
}

export default Timeline;
