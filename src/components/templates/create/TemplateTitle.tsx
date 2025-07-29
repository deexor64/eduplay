type TemplateTitleProps = {
  templateCode: string,
  children: React.ReactNode
}

export default function TemplateTitle(props: TemplateTitleProps) {
  return (
    <header className="mb-4 bg-white/60 backdrop-blur p-4 rounded-xl shadow-md sticky top-2 flex items-center gap-3 z-1000">
      <h2 className="text-xl font-bold text-gray-800">
        {props.children}
      </h2>
      {/* templateCode tag*/}
      <span className="inline-flex items-center px-2 py-0.5 rounded-full border text-sm font-mono font-semibold bg-gray-100/80 
      backdrop-blur text-gray-700 border-gray-300 shadow-sm select-none" title="Template Code">
        {props.templateCode}
      </span>

    </header>
  )
}
