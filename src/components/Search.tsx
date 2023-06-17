import { useEffect, useState } from "preact/hooks";
import { CollectionEntry } from "astro:content";
import Fuse from "fuse.js";
import PostCard from "./PostCard";

export default function Search({
  searchList,
}: {
  searchList: CollectionEntry<"blog">[];
}) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<CollectionEntry<"blog">[]>(
    []
  );

  const fuse = new Fuse(searchList, {
    keys: ["data.title", "data.description", "data.tags"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.5,
  });

  useEffect(() => {
    const search = fuse.search(searchInput);
    setSearchResults(search.map((result) => result.item));
  }, [searchInput]);

  return (
    <>
      <div className="relative mt-5">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 fill-none stroke-slate-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
        <input
          autoFocus
          className="placeholder-italic block w-full rounded-md border border-slate-300 bg-slate-100 py-2 pl-9 pr-3 text-slate-800 placeholder-slate-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          type="text"
          placeholder="Search anything"
          onInput={(e) => setSearchInput(e.currentTarget.value)}
        />
      </div>
      <div>
        {searchInput.length > 1 && (
          <div className="mt-8 text-gray-300">
            Found {searchResults.length}{" "}
            {searchResults.length === 1 ? "result" : "results"} for '
            {searchInput}'
          </div>
        )}
        <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {searchResults.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
