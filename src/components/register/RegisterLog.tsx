"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

type RegisterLogProps = {
  type: "info" | "error" | "success";
  message: string;
  timestamp: Date;
};

export default function RegisterLog(props: RegisterLogProps) {
  
  const { type, message, timestamp } = props;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  return (
    <div
      className={`p-3 rounded-lg text-sm flex justify-between items-start ${
        type === "error"
          ? "bg-red-900/50 text-red-200 border border-red-800"
          : type === "success"
          ? "bg-green-900/50 text-green-200 border border-green-800"
          : "bg-blue-900/50 text-blue-200 border border-blue-800"
      }`}
    >
      {/* Message */}
      <div className="flex flex-col">
        <span className="font-medium">{message}</span>
        <span className="text-xs opacity-70">{timestamp.toLocaleTimeString()}</span>
      </div>

      {/* Copy */}
      <button
        onClick={handleCopy}
        className="ml-3 px-2 py-1 rounded hover:bg-white/10 transition-colors cursor-copy"
        title="Copy to clipboard"
      >
        <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-xs" />
      </button>
      
    </div>
  );
}
