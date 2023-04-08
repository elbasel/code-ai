import React, { useContext } from "react";
import { Disclosure as HeadlessDisclosure } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { ThemeContext } from "@components/Theme";
import { type Themes } from "@appTypes/Themes";
import { useAutoAnimate } from "@formkit/auto-animate/react";

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
  open?: boolean;
};

export const DisclosureButton = ({
  children,
  className,
  open,
}: DisclosureButtonProps): React.ReactElement => {
  const { theme } = useContext(ThemeContext);
  const [parent] = useAutoAnimate({});

  return (
    <HeadlessDisclosure.Button
      className={twMerge(themes.common, themes[theme], className)}
      ref={parent}
    >
      <span>{children}</span>
      {open && <BsChevronUp className="w-5 h-5" />}
      {!open && <BsChevronDown className="w-5 h-5" />}
    </HeadlessDisclosure.Button>
  );
};
