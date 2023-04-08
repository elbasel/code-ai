import React, { useContext } from "react";
import { Disclosure as HeadlessDisclosure } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { BsChevronUp } from "react-icons/bs";
import { ThemeContext } from "@components/Theme";
import { type Themes } from "@appTypes/Themes";

const themes: Themes = {
  common: [
    "flex",
    "justify-between",
    "w-full",
    "px-4",
    "py-2",
    "text-sm",
    "font-medium",
    "text-left",
    "rounded-lg",
  ].join(" "),
  light: [
    "text-purple-900",
    "bg-purple-100",
    "hover:bg-purple-200",
    "focus:outline-none",
    "focus-visible:ring",
    "focus-visible:ring-purple-500",
    "focus-visible:ring-opacity-75",
  ].join(" "),
  dark: ["bg-slate-800 outline-blue-900"].join(" "),
};

type DisclosureButtonProps = {
  children?: React.ReactNode;
  className?: string;
  show?: boolean;
};

export const DisclosureButton = ({
  children,
  className,
  show,
}: DisclosureButtonProps): React.ReactElement => {
  const { theme } = useContext(ThemeContext);
  return (
    <HeadlessDisclosure.Button
      className={twMerge(themes.common, themes[theme], className)}
    >
      <span>{children}</span>
      <BsChevronUp
        className={twMerge("h-5 w-5", show && "rotate-180 transform")}
      />
    </HeadlessDisclosure.Button>
  );
};
