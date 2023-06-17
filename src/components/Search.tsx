import { useEffect, useState } from "preact/hooks";
import { CollectionEntry } from "astro:content";
import Fuse from "fuse.js";

function Search({ searchList }: { searchList: CollectionEntry<"blog">[] }) {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<CollectionEntry<"blog">[]>([]);

  const fuse = new Fuse(searchList, {
    keys: ["data.title", "data.description", "data.tags", "body"],
    includeMatches: true,
    minMatchCharLength: 1,
    threshold: 0.5,
  });

  useEffect(() => {
    const search = fuse.search(searchInput);
    setResults(search.map((result) => result.item));
  }, [searchInput]);

  return (
    <div class="mt-5">
      <div class="flex flex-col gap-3 rounded-md bg-content p-6">
        <h1 class="text-xl font-semibold text-gray-300">Search</h1>
        <input
          autoFocus
          className="rounded-sm bg-neutral-700 p-2 text-white outline-none placeholder:text-gray-400"
          type="text"
          placeholder="Search anything"
          onInput={(e) => setSearchInput(e.currentTarget.value)}
        />
      </div>
      <div class="mt-4 rounded-md bg-content p-6">
        {searchInput.length == 0 ? (
          <>
            <div className="text-gray-300">
              This is the site search engine of <b>Puntogris Blog</b>.
            </div>
            <div className="text-gray-300">
              When searching for multiple keywords, please use spaces to
              separate them, such as{" "}
              <span class="text-blue-400">
                "webpage dark mode annual summary"
              </span>
              .
            </div>
          </>
        ) : (
          <>
            <div className="pb-4 text-gray-300">
              Found {results.length}{" "}
              {results.length === 1 ? "result" : "results"} for '{searchInput}'
            </div>
            {results.map((post) => (
              <a
                class="flex flex-col border-t border-zinc-600 py-3 text-gray-300 duration-300 ease-in-out hover:bg-gray-800 hover:text-gray-200"
                key={post.id}
                href={`/posts/${post.slug}`}
              >
                <h2 class="text-lg font-semibold">{post.data.title}</h2>
                <p class="line-clamp-3">{post.body}</p>
              </a>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Search;
