import React from "react";

interface InfoBadgeProps {
  text: string;
  colorTheme?: "blue" | "red" | "green" | "yellow" | "gray" | "purple" | "pink" | "indigo" | "default";
  className?: string;
  style?: React.CSSProperties;
}

const colorThemes: Record<string, string> = {
  blue: "bg-blue-100 text-blue-800 border-blue-300",
  red: "bg-red-100 text-red-700 border-red-300",
  green: "bg-green-100 text-green-800 border-green-300",
  yellow: "bg-yellow-100 text-yellow-800 border-yellow-300",
  gray: "bg-gray-100 text-gray-700 border-gray-300",
  purple: "bg-purple-100 text-purple-800 border-purple-300",
  pink: "bg-pink-100 text-pink-800 border-pink-300",
  indigo: "bg-indigo-100 text-indigo-800 border-indigo-300",
  default: "bg-gray-100 text-gray-700 border-gray-300",
};

export default function InfoBadge({ text, colorTheme = "default", className, style }: InfoBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-semibold shadow-sm ${colorThemes[colorTheme] || colorThemes.default} ${className || ""}`}
      style={style}
    >
      {text}
    </span>
  );
}
