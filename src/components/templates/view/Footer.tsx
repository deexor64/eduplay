import { useEffect, useState } from "react";
import { ActivityViewMode, ActivityViewModeEnum, UserType } from "@/lib/utils/types";

type FooterProps = {
  viewMode: ActivityViewMode,
  setResetActivity: React.Dispatch<React.SetStateAction<boolean>>,
  handleSubmit: Function,
}

export default function Footer(props: FooterProps) {

  return (
    <footer className="sticky bottom-0 left-0 w-full flex flex-col items-center gap-2 p-3 bg-white/30 backdrop-blur-md shadow-2xl rounded-full z-20">
      <div className="flex gap-3">
        <button
          className="flex items-center gap-2 font-semibold py-1.5 px-5 rounded-full transition bg-green-600 text-white hover:bg-green-700 shadow text-base"
          onClick={() => props.handleSubmit()}
        >
          {
            props.viewMode === ActivityViewModeEnum.VIEW ? 
            <span>Submit</span>
            : 
            <span>Check</span>
          }
        </button>
        <button
          className="flex items-center gap-2 font-semibold py-1.5 px-5 rounded-full transition bg-red-500 text-white hover:bg-red-600 shadow text-base"
          onClick={() => props.setResetActivity(true)}
        >
          <span>Reset</span>
        </button>
      </div>
    </footer>
  );
}