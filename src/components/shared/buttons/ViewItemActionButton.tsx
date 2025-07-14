"use client";

import React from "react";

interface ViewItemActionButtonProps {
  text: string;
  colorTheme?: "blue" | "red" | "green" | "yellow" | "gray" | "purple" | "pink" | "indigo" | "default";
  onAction: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const colorThemeClasses: { [key: string]: string } = {
  blue: "bg-blue-500 hover:bg-blue-600",
  red: "bg-red-500 hover:bg-red-600",
  green: "bg-green-500 hover:bg-green-600",
  yellow: "bg-yellow-500 hover:bg-yellow-600",
  gray: "bg-gray-500 hover:bg-gray-600",
  purple: "bg-purple-500 hover:bg-purple-600",
  pink: "bg-pink-500 hover:bg-pink-600",
  indigo: "bg-indigo-500 hover:bg-indigo-600",
  default: "bg-gray-400 hover:bg-gray-500",
};

export default function ViewItemActionButton({text, colorTheme = "default", 
  onAction, className, style}: ViewItemActionButtonProps) {
  return (
    <button
      className={`px-3 py-1 rounded-full text-white text-xs font-medium shadow-sm transition ${colorThemeClasses[colorTheme]} ${className || ""}`}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onAction();
      }}
      type="button"
      title={text}
      aria-label={text}
    >
      {text}
    </button>
  );
} 