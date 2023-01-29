export default function Paginator({ currentPage, totalPages, index, route }) {
  const pagination = generatePageRange(currentPage, totalPages);

  return (
    <div class="flex gap-2 justify-center items-center w-full">
      {currentPage != 1 && (
        <PaginatorItem
          value="<"
          href={`${route}/${Number(currentPage) - Number(1)}`}
          focused={false}
        />
      )}
      {pagination.map((page) => (
        <PaginatorItem
          value={page}
          href={`${route}/${page}`}
          focused={page == currentPage}
        />
      ))}
      {currentPage != totalPages && (
        <PaginatorItem
          value=">"
          href={`${route}/${Number(currentPage) + Number(1)}`}
          focused={false}
        />
      )}
    </div>
  );
}

function PaginatorItem({ value, href, focused }) {
  const styles = {
    normal: "text-gray-100 bg-slate-800",
    focused: "text-slate-800 bg-gray-100",
  };

  if (value != "...") {
    return (
      <a
        class={`flex justify-center items-center p-2 rounded-md w-8 h-8 ${
          focused ? styles.focused : styles.normal
        }`}
        href={href}
      >
        {value}
      </a>
    );
  } else {
    return <div class="text-gray-100 px-1">...</div>;
  }
}

function generatePageRange(currentPage, lastPage) {
  const delta = 2;
  const range = Array(lastPage)
    .fill()
    .map((_, index) => index + 1);

  return range.reduce((pages, page) => {
    if (page === 1 || page === lastPage) {
      return [...pages, page];
    }
    if (page - delta <= currentPage && page + delta >= currentPage) {
      return [...pages, page];
    }
    if (pages[pages.length - 1] !== "...") {
      return [...pages, "..."];
    }
    return pages;
  }, []);
}
