import { useEffect, useState } from "react";
import { ActivityViewMode, ActivityViewModeEnum, UserType } from "@/lib/utils/types";

type FooterProps = {
  viewMode: ActivityViewMode,
  handleSubmit: Function,
}

// Helper to format seconds as mm:ss
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export default function Footer(props: FooterProps) {

  return (
    <footer className="sticky bottom-0 left-0 w-full flex flex-col items-center gap-2 p-3 bg-white/30 backdrop-blur-md shadow-2xl rounded-full z-20">
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
    </footer>
  );
}