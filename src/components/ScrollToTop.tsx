export default function ScrollToTop() {
  function onClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      onClick={onClick}
      className="bg fixed bottom-4 right-4 flex items-center justify-center rounded-md bg-content p-3 shadow-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-chevron-up text-slate-50"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
