import { useState } from "preact/hooks";

export default function Search() {
  const [input, setInput] = useState("a");
  const onChangeHandler = event => {
    setInput(event.target.value);
 };
  return (
    <>
    <Test setValue={onChangeHandler} />
    {input}
    </>
  );
}

function Test({setValue}) {
    return (
        <div>

        <label class="relative block mt-5">
        <span class="sr-only">Search</span>
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
          onInput={setValue}
        />
      </label>
    </div>
    )
}
