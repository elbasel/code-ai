import React from "react";

const themes = {
  common: [].join(" "),
  light: [].join(" "),
  dark: [].join(" "),
};

type WebsiteInputProps = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  label?: string;
};

export const WebsiteInput = ({
  value,
  onChange,
  placeholder = "example.com",
  id,
  label,
}: WebsiteInputProps): React.ReactElement => {
  return (
    <>
      <div className="flex items-center border rounded-md">
        <span className="px-3 py-1 bg-black border-r rounded-l-md">
          https://
        </span>
        <input
          type="text"
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={onChange}
          className="w-full px-2 bg-transparent outline-none"
        />
      </div>
    </>
  );
};
