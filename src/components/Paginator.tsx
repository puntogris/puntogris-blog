type PaginatorPros = {
  currentPage: number;
  totalPages: number;
  route: string;
};

function Paginator({ currentPage, totalPages, route }: PaginatorPros) {
  const pagination = generatePageRange(currentPage, totalPages);

  return (
    <div class="flex w-full items-center justify-center gap-2">
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
    normal: "text-gray-100 bg-content",
    focused: "text-slate-800 bg-gray-100",
  };

  if (value != "...") {
    return (
      <a
        class={`flex h-8 w-8 items-center justify-center rounded-md p-2 ${
          focused ? styles.focused : styles.normal
        }`}
        href={href}
      >
        {value}
      </a>
    );
  } else {
    return <div class="px-1 text-gray-100">...</div>;
  }
}

function generatePageRange(currentPage: number, lastPage: number) {
  const delta = 2;
  const range = Array(lastPage)
    .fill(0)
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

export default Paginator
