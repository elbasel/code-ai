import React, { useContext } from "react";
import { Disclosure as HeadlessDisclosure } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { ThemeContext } from "@components/Theme";
import { type ThemesType } from "@appTypes/ThemesType";

const themes: ThemesType = {
  common: ["disclosurePanel", "space-y-4", "w-full", "overflow-hidden"].join(
    " "
  ),
  light: ["text-gray-500"].join(" "),
  dark: [""].join(" "),
};

type DisclosurePanelProps = {
  children?: React.ReactNode;
  className?: string;
};

export const DisclosurePanel = ({
  children,
  className,
}: DisclosurePanelProps): React.ReactElement => {
  const { theme } = useContext(ThemeContext);
  return (
    <HeadlessDisclosure.Panel
      className={twMerge(themes.common, themes[theme], className)}
    >
      {children}
    </HeadlessDisclosure.Panel>
  );
};
