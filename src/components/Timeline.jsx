export default function Timeline({ posts }) {
  let currentYear = 0;
  const views = [];

  posts.forEach((post) => {
    const postYear = new Date(post.frontmatter.pubDate).getFullYear();
    if (currentYear != 0 && postYear != currentYear) {
      views.push(<TimelineSpacer />);
    }
    if (postYear != currentYear) {
      currentYear = postYear;
      views.push(<TimelineYear year={currentYear} />);
    }
    views.push(<TimelinePost post={post} />);
  });

  return <div class="mt-4 flex flex-col">{views}</div>;
}

function TimelineSpacer() {
  return <div class="relative ml-7 h-4 border-l-2 border-slate-400 pl-4" />;
}

function TimelineYear({ year }) {
  return (
    <div class="flex w-14 justify-center rounded-md bg-blue-500 py-0.5 px-3 text-gray-200">
      {year}
    </div>
  );
}

function TimelinePost({ post }) {
  return (
    <div class="relative ml-7 border-l-2 border-slate-400 pl-4 pt-4">
      <div class="absolute -left-[7.5px] top-6 h-3 w-3 rounded-full bg-slate-400" />
      <div class="w-full overflow-hidden rounded-md bg-slate-800 px-5 py-4 text-gray-100">
        <div class="text-sm text-gray-400">{getPostMonthAndDay(post)}</div>
        <a class="text-lg text-gray-300" href={post.url}>
          {post.frontmatter.title}
        </a>
      </div>
    </div>
  );
}

function getPostMonthAndDay(post) {
  const date = new Date(String(post.frontmatter.pubDate));
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  return `${month}-${day}`;
}
