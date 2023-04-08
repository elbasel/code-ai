import React from "react";
import { twMerge } from "tailwind-merge";

type TextInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  onMouseLeave?: () => void;
};

export const TextInput = ({
  value,
  onChange = () => undefined,
  className,
  onMouseLeave = () => undefined,
  placeholder = "Enter text",
}: TextInputProps) => {
  return (
    <div className={twMerge("", className)}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onMouseLeave={onMouseLeave}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-white rounded-md bg-slate-800 focus:bg-black outline-blue-900"
      />
    </div>
  );
};
