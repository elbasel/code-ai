import React from "react";

type CanvasProps = {
  children: React.ReactNode;
};

export const Canvas = ({ children }: CanvasProps): React.ReactElement => {
  return (
    <div className="fixed inset-0 z-30 w-screen min-h-screen p-4 overflow-visible transform canvas scrollbar-hide min-w-max">
      {children}
    </div>
  );
};

// tailwind safelist bg-black
