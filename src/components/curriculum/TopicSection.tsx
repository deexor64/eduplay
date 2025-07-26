import React from "react";

interface TopicSectionProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

export default function TopicSection(props: TopicSectionProps) {
  
  const { title, open, onToggle, children } = props;
  
  return (
    <div className="rounded-xl shadow bg-gradient-to-br from-blue-50 to-white border border-blue-200 mb-2 transition-all duration-300 overflow-hidden">
      
      {/* Button and icon */}
      <button
        className="w-full flex items-center justify-between px-5 py-3 focus:outline-none select-none rounded-t-xl hover:bg-blue-100 transition-colors text-base font-semibold text-blue-900 tracking-wide gap-2"
        onClick={onToggle}
        type="button"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">{open ? "📂" : "📁"}</span>
          {title}
        </span>
        <span className={`transition-transform duration-300 text-lg ${open ? "rotate-180" : "rotate-0"}`}>▼</span>
      </button>

      {/* Content */}
      <div className={`overflow-hidden transition-all duration-500 ${open ? "max-h-[1000px] py-2 px-4" : "max-h-0 py-0 px-4"}`}
        style={{ background: open ? "rgba(255,255,255,0.7)" : undefined }}>
        {open && (
          <div className="pt-2">{children}</div>
        )}
      </div>

    </div>
  );

} 