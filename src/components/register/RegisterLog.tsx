"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

type RegisterLogProps = {
  type: "info" | "error" | "success";
  message: string;
  timestamp: Date;
};

export default function RegisterLog(props: RegisterLogProps) {

  const { type, message, timestamp } = props;
  const [copied, setCopied] = useState(false);

  // Copy message to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  // Open large logs in a new tab
  const handleOpenInNewTab = () => {
    
    // ISSUE: Text wrap long logs not working
    const html = `
      <html>
        <head>
          <title>Log Message</title>
          <style>
            body { font-family: sans-serif; padding: 2rem; background: #111; color: #fff; }
            .info { background: #1e3a8a; color: #c7d2fe; padding: 1rem; border-radius: 0.5rem; }
            .success { background: #14532d; color: #bbf7d0; padding: 1rem; border-radius: 0.5rem; }
            .error { background: #7f1d1d; color: #fecaca; padding: 1rem; border-radius: 0.5rem; }
            pre { white-space: pre-wrap; word-break: break-word; margin-top: 1rem; }
            h1 { margin-bottom: 0.5rem; }
            small { opacity: 0.7; display: block; margin-bottom: 1rem; }
          </style>
        </head>
        <body>
          <div class="${type}">
            <small>${timestamp.toLocaleString()}</small>
            <pre>${message}</pre>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 5000);

  };

  const tooLong = message ? message.split("\n").length > 5 : false; // more than 30 lines

  return (
    <div className={`p-3 rounded-lg text-sm flex justify-between items-start ${type === "error"
        ? "bg-red-900/50 text-red-200 border border-red-800"
        : type === "success"
          ? "bg-green-900/50 text-green-200 border border-green-800"
          : "bg-blue-900/50 text-blue-200 border border-blue-800"
      }`}
    >

      {/* Message */}
      <div className="flex flex-col">
        <span className="font-medium break-words max-w-xl">
          {tooLong ? "Message too long, open in a new tab..." : <pre className="whitespace-pre-wrap break-words">{message}</pre> }
        </span>
        <span className="text-xs opacity-70">
          {timestamp.toLocaleTimeString()}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex space-x-2">

        {/* Copy */}
        <button
          onClick={handleCopy}
          className="px-2 py-1 rounded hover:bg-white/10 transition-colors cursor-copy"
          title="Copy to clipboard"
        >
          <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-xs" />
        </button>

        {/* Open in new tab */}
        {tooLong && (
          <button
            onClick={handleOpenInNewTab}
            className="px-2 py-1 rounded hover:bg-white/10 transition-colors"
            title="Open in new tab"
          >
            <FontAwesomeIcon icon={faUpRightFromSquare} className="text-xs" />
          </button>
        )}

      </div>
    </div>

  );
}
