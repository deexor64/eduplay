"use client";

import React from "react";

interface DialogueMessage {
  message: string;
  type: "success" | "error" | "normal";
}

export default function DialogueCloud({ message }: { message: DialogueMessage }) {
  
  let bubbleClasses = "";
  let triangleClasses = "";

  switch (message.type) {
    case "error":
      bubbleClasses = "bg-red-200 text-red-800";
      triangleClasses = "border-r-red-200";
      break;
    case "success":
      bubbleClasses = "bg-green-200 text-green-800";
      triangleClasses = "border-r-green-200";
      break;
    default:
      bubbleClasses = "bg-gray-200 text-gray-800";
      triangleClasses = "border-r-gray-200";
  }

  return (
    <div className="absolute top-4 left-135 -translate-x-1/2 w-[24rem] flex items-start gap-3 z-50">
      <div className={`relative px-4 py-3 rounded-2xl shadow-md text-lg font-medium ${bubbleClasses}`}>
        {message.message}
        <div
          className={`absolute left-[-8px] top-3.5 w-0 h-0 border-t-8 border-b-8 border-r-8 ${triangleClasses} border-t-transparent border-b-transparent`}
        ></div>
      </div>
    </div>
  );
}
