export default function TemplateTitle(props: any) {
  return (
    <header className="mb-6">
      <h2 className="text-xl font-semibold mb-4">{props.children}</h2>
    </header>
  )
}
