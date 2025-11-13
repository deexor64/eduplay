import React from "react";

interface ConfirmDialogProps {
  state: { message: string; resolve?: (value: boolean) => void } | null;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

export function ConfirmDialog({ state, setState }: ConfirmDialogProps) {
  if (!state) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl shadow-xl w-80 max-w-sm p-6 animate-fadeIn">
        
        {/* Title */}
        <h2 className="text-lg text-center font-semibold text-gray-800 mb-4">Confirm Action</h2>
        
        {/* Message */}
        <p className="text-gray-600 mb-6 text-center">{state.message}</p>

        <div className="flex justify-evenly">
          <button
            onClick={() => {
              state.resolve?.(false);
              setState(null);
            }}
            className="cursor-pointer w-1/3 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              state.resolve?.(true);
              setState(null);
            }}
            className="cursor-pointer w-1/3 px-4 py-2 bg-pink-700 hover:bg-pink-800 text-white rounded-lg transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
