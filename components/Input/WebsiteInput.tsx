import React from "react";

const themes = {
  common: [].join(" "),
  light: [].join(" "),
  dark: [].join(" "),
};

type WebsiteInputProps = {
  value?: string | null;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  label?: string;
};

export const WebsiteInput = ({
  value,
  onChange,
  placeholder = "www.example.com",
  id,
  label,
}: WebsiteInputProps): React.ReactElement => {
  const Label = () => {
    <label htmlFor={id} className="block">
      {label}
    </label>;
  };
  return (
    <>
      <div className="flex items-center border rounded-md">
        <span className="px-3 py-1 border-r rounded-l-md bg-slate-500">
          https://
        </span>
        <input
          type="text"
          placeholder={placeholder}
          id={id}
          // ! value has a default value here
          value={value || ""}
          onChange={onChange}
          className="w-full px-2 bg-transparent outline-none"
        />
      </div>
    </>
  );
};
