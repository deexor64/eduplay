import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons';

interface SubjectSectionProps {
  subject: string;
  grade: number;
  open: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

export default function SubjectSection(props: SubjectSectionProps) {

  const { subject, grade, open, onToggle, children } = props;

  return (
    <div className="rounded-lg shadow bg-gradient-to-br from-green-100 via-blue-50 to-white border-2 border-green-200 mb-3 transition-all duration-300 overflow-hidden">
      
      {/* Button and icon */}
      <button
        className="w-full flex items-center justify-between px-6 py-4 focus:outline-none select-none rounded-lg hover:bg-green-200/40 active:bg-green-300/40 transition-colors text-lg font-bold text-green-900 tracking-wide gap-2"
        onClick={onToggle}
        type="button"
        aria-expanded={open}
      >
        <span className="flex items-center gap-4">
          <FontAwesomeIcon icon={open ? faBookOpen : faBook} className="text-xl text-green-700" />
          <span>{subject}</span>
          <span className="ml-2 px-2 py-1 bg-green-200 text-green-800 rounded text-sm font-semibold">Grade {grade}</span>
        </span>
        <span className={`transition-transform duration-300 text-2xl ${open ? "rotate-180" : "rotate-0"}`}>▼</span>
      </button>

      {/* Content */}
      <div className={`overflow-hidden transition-all duration-500 ${open ? "py-2 px-4" : "max-h-0 py-0 px-4"}`}
        style={{ background: open ? "rgba(255,255,255,0.7)" : undefined }}>
        {open && (
          <div className="pt-2">{children}</div>
        )}
      </div>

    </div>
  );

} 