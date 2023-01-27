import { useEffect, useState } from "preact/hooks";
import Fuse from "fuse.js";
import PostCard from "./PostCard";

export default function Search({ searchList }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState();

  const fuse = new Fuse(searchList, {
    keys: ["title", "description", "headings", "tags"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.5,
  });

  useEffect(() => {
    const search = fuse.search(searchInput);
    setSearchResults(search);
  }, [searchInput]);

  return (
    <div>
      <SerchInput onInput={(e) => setSearchInput(e.target.value)} />
      <SearchResults results={searchResults} input={searchInput} />
    </div>
  );
}

function SerchInput({ onInput }) {
  return (
    <div>
      <label class="relative block mt-5">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 fill-none stroke-slate-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            ></path>
          </svg>
        </span>
        <input
          class="placeholder:italic text-slate-800 placeholder:text-slate-500 block bg-slate-100 w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          type="text"
          placeholder="Search anything"
          onInput={onInput}
        />
      </label>
    </div>
  );
}

function SearchResults({ results, input }) {
  return (
    <div>
      {input.length > 1 && (
        <div className="mt-8 text-gray-300">
          Found {results?.length}
          {results?.length && results?.length === 1
            ? " result"
            : " results"}{" "}
          for '{input}'
        </div>
      )}
      <ul>
        {results &&
          results.map(({ item }) => (
            <li>
              <PostCard post={item} />
            </li>
          ))}
      </ul>
    </div>
  );
}
