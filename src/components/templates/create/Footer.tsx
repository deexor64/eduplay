type FooterProps = {
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>,
}

export default function Footer(props: FooterProps) {
  
  return (
    <footer className="sticky bottom-4 left-0 w-full flex justify-center gap-4 p-4 
      bg-white/40 backdrop-blur shadow-lg rounded-xl">
        <button
          className="cursor-pointer flex items-center gap-2 font-semibold py-1.5 px-5 rounded-full transition-all duration-75 
          bg-green-500 text-white shadow-[0_4px_0_#15803d] active:shadow-[0_1px_0_#15803d] active:translate-y-[3px] 
          hover:bg-green-600 text-base"
          onClick={props.handleSubmit}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Save
        </button>
        
    </footer>
  )
}
