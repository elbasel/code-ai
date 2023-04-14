import { useMousePosition } from "@hooks/useMousePosition";
import React from "react";
import { twMerge } from "tailwind-merge";

type SimpleFollowProps = {
  children: React.ReactNode;
  className?: string;
};

export const SimpleFollow = ({
  children,
  className,
}: SimpleFollowProps): React.ReactElement => {
  const { x, y } = useMousePosition();

  const divWidth = 70;

  return (
    <span
      className={twMerge(
        "fixed z-50 inset-0 w-[70px] flex items-center justify-center p-4 aspect-square rounded-full transform",
        className
      )}
      style={{
        transform: `translate(${x - divWidth / 2}px, ${y - divWidth / 2}px)`,
      }}
    >
      {children}
    </span>
  );
};
