import Link from "next/link";

interface FooterProps {
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>,
}

export default function Footer(props: FooterProps) {
  
  return (
    <footer className="sticky bottom-4 left-0 w-full flex justify-center gap-4 p-4 
      bg-white/40 backdrop-blur shadow-lg rounded-xl">
        <button
          className="flex items-center gap-2 font-semibold py-3 px-8 rounded-full transition-all duration-300 bg-green-600 
          text-white hover:bg-green-700 hover:shadow-lg shadow-md"
          onClick={props.handleSubmit}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Save Activity
        </button>
    </footer>
  )
}
