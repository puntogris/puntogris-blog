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

  return <div class="flex flex-col mt-4">{views}</div>;
}

function TimelineSpacer() {
  return <div class="border-l-2 border-slate-400 ml-7 pl-4 relative h-4" />;
}

function TimelineYear({ year }) {
  return (
    <div class="flex w-14 justify-center py-0.5 px-3 bg-blue-500 text-gray-200 rounded-md">
      {year}
    </div>
  );
}

function TimelinePost({ post }) {
  return (
    <div class="border-l-2 border-slate-400 ml-7 pl-4 relative pt-4">
      <div class="w-3 h-3 bg-slate-400 rounded-full absolute -left-[7.5px] top-6" />
      <div class="bg-slate-800 w-full px-5 py-4 rounded-md text-gray-100 overflow-hidden">
        <div class="text-sm text-gray-400">{getPostMonthAndDay(post)}</div>
        <a class="text-lg text-gray-300" href={post.url}>{post.frontmatter.title}</a>
      </div>
    </div>
  );
}

function getPostMonthAndDay(post) {
  const date = new Date(String(post.frontmatter.pubDate));
  const utcDay = date.getUTCDate();
  const utcMonth = date.getUTCMonth();
  const day = (utcDay < 10 ? "0" : "") + utcDay;
  const month = (utcMonth + 1 < 10 ? "0" : "") + (utcMonth + 1);
  return `${month}-${day}`;
}
