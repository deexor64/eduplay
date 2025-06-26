import Link from "next/link";

interface TemplateTitleProps {
  children: React.ReactNode
}

export default function TemplateTitle(props: TemplateTitleProps) {
  return (
    <header className="mb-6 bg-white p-4 rounded-xl shadow-sm sticky 
      top-2 flex items-center">
      <h2 className="text-xl font-semibold mb-4">
        {props.children}
      </h2>
    </header>
  )
}
