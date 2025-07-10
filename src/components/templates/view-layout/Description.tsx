import { useState } from "react";

export default function Description(props: any) {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-white/40 p-3 rounded-xl shadow-sm relative transition-all duration-300">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800 select-none">Instructions</h2>
        <button
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={open ? 'Collapse instructions' : 'Expand instructions'}
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          <svg
            className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {/* Description content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-lg text-gray-700">
          {props.children}
        </p>
      </div>
    </section>
  );
}