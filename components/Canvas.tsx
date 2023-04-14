import React, { useRef } from "react";

type CanvasProps = {
  children: React.ReactNode;
};

export const Canvas = ({ children }: CanvasProps): React.ReactElement => {
  const canvasRef: any = useRef({});
  const handleOnMouseOver = () => {
    const canvasRefCurrent: HTMLElement = canvasRef.current;
    const canvasFirstChild = canvasRefCurrent?.children[0];
    console.log({ canvasFirstChild });
    if (!canvasFirstChild) return;
    canvasFirstChild.classList.add("bg-black");
  };
  return (
    <div
      onMouseOver={handleOnMouseOver}
      ref={canvasRef}
      className="fixed inset-0 z-30 w-screen min-h-screen p-4 overflow-visible transform canvas scrollbar-hide min-w-max"
    >
      {children}
    </div>
  );
};

// tailwind safelist bg-black
