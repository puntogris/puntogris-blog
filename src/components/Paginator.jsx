function Paginator({ currentPage, totalPages }) {
  const arr = [];
  const max = Math.min(currentPage + 3, totalPages);
  let min = 0;

  if (currentPage - 2 == 0) {
    min = 1;
  } else if (currentPage - 2 < 0) {
    min = currentPage;
  } else {
    min = currentPage - 2;
  }
  min = min - 1;

  for (var i = min; i < max; i++) {
    arr.push(i + 1);
  }

  return (
    <div class="flex gap-2 justify-center items-center w-full">
      {currentPage != 1 && <PaginatorItem value="<" href="/" focused={false} />}
      {arr.map((page) => (
        <PaginatorItem value={page} href="/" focused={page == currentPage} />
      ))}
      {currentPage != totalPages && (
        <PaginatorItem value=">" href="/" focused={false} />
      )}
    </div>
  );
}

function PaginatorItem({ value, href, focused }) {
  const styles = {
    normal:
      "flex justify-center items-center text-gray-100 bg-slate-800 p-2 rounded-md w-8 h-8",
    focused:
      "flex justify-center items-center text-slate-800 bg-gray-100 p-2 rounded-md w-8 h-8",
  };
  return (
    <a class={focused ? styles.focused : styles.normal} href={href}>
      {value}
    </a>
  );
}

export default Paginator;
