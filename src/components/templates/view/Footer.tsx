import { TemplateViewMode, UserType } from "@/lib/utils/types";

type FooterProps = {
  viewMode: TemplateViewMode,
  handleSubmit: Function,
}

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
);

export default function Footer(props: FooterProps) {

  return (
    <footer className="sticky bottom-0 left-0 w-full flex justify-center gap-4 p-3 bg-white/30 backdrop-blur-md shadow-2xl rounded-full z-20">
      <button
        className="flex items-center gap-2 font-semibold py-1.5 px-5 rounded-full transition bg-green-600 text-white hover:bg-green-700 shadow text-base"
        onClick={() => props.handleSubmit()}
      >
        <CheckIcon />
        <span>Save</span>
      </button>
    </footer>
  );
}