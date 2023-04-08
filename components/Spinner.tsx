import React from "react";
import { twMerge } from "tailwind-merge";

type SpinnerProps = {
  className?: string;
};

export const Spinner = ({ className }: SpinnerProps): React.ReactElement => {
  return (
    <div
      className={twMerge(
        "w-4 h-4 text-blue-600 border-2 border-current rounded-full animate-spin border-t-transparent",
        className
      )}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
