import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons';

interface SubjectSectionProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

export default function SubjectSection(props: SubjectSectionProps) {

  const { title, open, onToggle, children } = props;

  return (

    <div className="rounded-xl shadow-xl bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 border-2 border-purple-300 mb-4 
    transition-all duration-300 overflow-hidden">

      {/* Button and icon */}
      <button className="w-full flex items-center justify-between px-8 py-6 focus:outline-none select-none rounded-xl 
      hover:bg-purple-200/50 active:bg-purple-300/50 transition-colors text-xl font-bold text-purple-900 tracking-wide gap-3"
        onClick={onToggle} type="button" aria-expanded={open} >
        <span className="flex items-center gap-4">
          <FontAwesomeIcon icon={open ? faBookOpen : faBook} className="text-2xl text-purple-700"/>
          {title}
        </span>
        <span className={`transition-transform duration-300 text-3xl ${open ? "rotate-180" : "rotate-0"}`}>▼</span>
      </button>

      {/* Content */}
      <div className={`overflow-hidden transition-all duration-500 ${open ? "max-h-[1000px] py-4 px-6" : "max-h-0 py-0 px-6"}`}
        style={{ background: open ? "rgba(255,255,255,0.8)" : undefined }}>
        {open && (
          <div className="pt-3">{children}</div>
        )}
      </div>

    </div>
    
  );
} 