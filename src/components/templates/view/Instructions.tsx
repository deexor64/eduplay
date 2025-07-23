import InfoBadge from "@/components/shared/badges/InfoBadge";
import { ReactNode, useState } from "react";

type InstructionsProps = {
  infoTags: any,
  children: ReactNode,
}

export default function Instructions(props: InstructionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-white/40 backdrop-blur p-3 rounded-xl shadow-sm relative transition-all duration-300">
      <div className="flex items-center" onClick={() => setOpen((v) => !v)}>
        <h2 className="text-base font-semibold text-gray-800 select-none">Instructions</h2>
        {/* Info tags */}
        <div className="flex items-center gap-2 mt-1 text-xs flex-wrap ml-4">
          {props.infoTags.grade === 0 ? (
            <InfoBadge text="ALL GRADES" colorTheme="blue" />
          ) : (
            <InfoBadge text={"GRADE " + String(props.infoTags.grade)} colorTheme="blue" />
          )}
          <InfoBadge text={props.infoTags.subject} colorTheme="green" />
          <InfoBadge text={props.infoTags.difficulty} colorTheme="yellow" />
          {props.infoTags.isScored && (
            <InfoBadge text="SCORED" colorTheme="purple" />
          )}
          {props.infoTags.status === "UNPUBLISHED" && (
            <InfoBadge text={props.infoTags.status} colorTheme="indigo" />
          )}
        </div>
        {/* Collapse icon */}
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ml-auto ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {/* Description content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-lg text-gray-700">
          {props.children}
        </p>
      </div>
    </section>
  );
}