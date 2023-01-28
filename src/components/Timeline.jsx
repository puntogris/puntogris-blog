function Timeline({ posts }) {
  let initialDate = 0;

  const postView = posts.map((post) => {
    const postYear = new Date(post.frontmatter.pubDate).getFullYear();
    if (postYear != initialDate) {
      initialDate = postYear;
      return (
        <div class="flex flex-col">
          <div class="flex w-14 justify-center py-0.5 px-3 bg-blue-500 text-gray-200 rounded-md">
            {initialDate}
          </div>
          <div class="border-l-2 border-slate-400 ml-7 pl-4 relative pb-4">
            <div class="w-3 h-3 bg-slate-400 rounded-full absolute -left-[7.5px] top-6" />
            <div class="flex justify-between bg-slate-800 w-full p-4 rounded-md text-gray-100 mt-4 overflow-hidden">
              {post.frontmatter.title}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div class="border-l-2 border-slate-400 ml-7 pl-4 relative pb-4">
          <div class="w-3 h-3 bg-slate-400 rounded-full absolute -left-[7.5px] top-6" />
          <div class="flex justify-between bg-slate-800 w-full p-4 rounded-md text-gray-100 mt-4 overflow-hidden">
            {post.frontmatter.title}
          </div>
        </div>
      );
    }
  });
  return <div class="flex flex-col mt-4">{postView}</div>;
}

export default Timeline;
