import Link from "next/link";
import { TemplateViewMode } from "@/lib/utils/types";

interface ActivityTitleProps {
  viewMode: TemplateViewMode,
  templateCode: string,
  children: React.ReactNode
}

export default function ActivityTitle(props: ActivityTitleProps) {
  return (
    <header className="mb-2 bg-white/40 backdrop-blur p-2 pb-3 rounded-xl shadow-md flex items-center gap-3">
      <h1 className="text-xl font-bold text-gray-800">
        {props.children}
      </h1>
      {/* ViewMode tag (if not VIEW) */}
      {props.viewMode !== "VIEW" && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-mono font-semibold 
        bg-gray-100 text-gray-700 border-gray-300 shadow-sm select-none" title="View Mode">
          {props.viewMode}
        </span>
      )}
      {/* Go to Template button (if SAMPLE) */}
      {props.viewMode === "SAMPLE" && (
        <Link
          href={`/template?viewMode=CREATE&templateCode=${props.templateCode}`}
          className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-medium shadow-sm 
          transition bg-blue-600 hover:bg-blue-700"
          target="_parent"
          rel="noopener noreferrer"
        >
          <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
          <span className="hidden sm:inline">Template</span>
        </Link>
      )}
    </header>
  );
}
