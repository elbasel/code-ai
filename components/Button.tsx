import React from "react";
import { twMerge } from "tailwind-merge";
import { Spinner } from "./Spinner";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  children,
  className,
  onClick,
  disabled,
}: ButtonProps): React.ReactElement => {
  const [parent] = useAutoAnimate({});

  return (
    <button
      ref={parent}
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={twMerge(
        "bg-blue-600 disabled:bg-black active:scale-95 disabled:cursor-not-allowed rounded-lg py-2 px-4 items-center gap-2 flex ",
        className
      )}
    >
      {disabled && <Spinner className="text-white" />}
      {children}
    </button>
  );
};
