import Link from "next/link";

interface TemplateTitleProps {
  templateCode: string,
  children: React.ReactNode
}

export default function TemplateTitle(props: TemplateTitleProps) {
  return (
    <header className="mb-6 bg-white p-4 rounded-xl shadow-sm sticky  flex items-center gap-3 top-2">
      <h2 className="text-xl font-semibold mb-4">
        {props.children}
      </h2>
      {/* templateCode tag*/}
      <span className="inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-mono font-semibold bg-gray-100 text-gray-700 border-gray-300 shadow-sm select-none" title="View Mode">
        {props.templateCode}
      </span>
      {/* Preview while editing */}
      <Link
        href={`/template/temp`}
        className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-medium shadow-sm transition bg-blue-600 hover:bg-blue-700"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' /></svg>
        <span className="hidden sm:inline">Preview</span>
      </Link>

    </header>
  )
}
