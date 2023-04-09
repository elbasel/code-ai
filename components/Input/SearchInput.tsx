import React from "react";
import { BsSearch } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

type SearchInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
};

export const SearchInput = ({
  value,
  onChange = () => undefined,
  className,
  placeholder = "Search",
}: SearchInputProps) => {
  return (
    <div className={twMerge("relative", className)}>
      <BsSearch className="absolute top-0 bottom-0 w-6 h-6 my-auto left-3" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="w-full py-3 pl-12 pr-4 rounded-md bg-slate-800 focus:bg-black outline-blue-900"
      />
    </div>
  );
};
