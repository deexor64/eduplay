import React, { useState } from "react";

interface PromptDialogProps {
  state: { 
    message: string; 
    resolve?: (value: string | null) => void 
  } | null;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

export function PromptDialog({ state, setState }: PromptDialogProps) {
  const [value, setValue] = useState("");

  if (!state) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl shadow-xl w-80 max-w-sm p-6 animate-fadeIn">
        
        {/* Title */}
        <h2 className="text-lg text-center font-semibold text-gray-800 mb-4">
          Enter Value
        </h2>
        
        {/* Message */}
        <p className="text-gray-600 mb-4 text-center">{state.message}</p>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Buttons */}
        <div className="flex justify-evenly">
          <button
            onClick={() => {
              state.resolve?.(null);
              setState(null);
            }}
            className="w-1/3 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              state.resolve?.(value);
              setState(null);
            }}
            className="w-1/3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
