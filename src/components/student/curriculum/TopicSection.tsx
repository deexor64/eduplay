import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

interface TopicSectionProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

export default function TopicSection(props: TopicSectionProps) {

  const { title, open, onToggle, children } = props;

  return (

    <div className="rounded-2xl shadow-lg bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 border-2 border-blue-200 mb-2 
    transition-all duration-300 overflow-hidden">

      {/* Button and icon */}
      <button className="w-full flex items-center justify-between px-6 py-4 focus:outline-none select-none rounded-2xl 
      hover:bg-blue-200/40 active:bg-blue-300/40 transition-colors text-lg font-bold text-blue-900 tracking-wide gap-2"
        onClick={onToggle} type="button" aria-expanded={open} >
        <span className="flex items-center gap-3">
          <FontAwesomeIcon icon={open ? faFolderOpen : faFolder} className="text-xl text-blue-700" />
          {title}
        </span>
        <span className={`transition-transform duration-300 text-2xl ${open ? "rotate-180" : "rotate-0"}`}>▼</span>
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