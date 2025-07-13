import React from "react";

type TransparentOverlayProps = {
  isVisible: boolean;
  children?: React.ReactNode;
  zIndex?: number;
};

export default function TransparentOverlay({ 
  isVisible, 
  children, 
  zIndex = 50 
}: TransparentOverlayProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex }}
    >
      {children}
    </div>
  );
} 