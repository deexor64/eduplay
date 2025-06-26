import Link from "next/link";

interface FooterProps {
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>,
}

export default function Footer(props: FooterProps) {
  
  return (
    <footer className="sticky bottom-0 left-0 w-full flex justify-center gap-4 p-4 
      bg-red-200 shadow rounded-lg">
        <Link href={`view?viewMode=PREVIEW`} className="font-semibold py-2 px-6 rounded-lg transition bg-green-500 
        text-white hover:bg-green-600">
        Preview
      </Link>
      <button
        className="font-semibold py-2 px-6 rounded-lg transition bg-green-500 
        text-white hover:bg-green-600"
        onClick={props.handleSubmit}
      >
        Save
      </button>
    </footer>
  )
}
