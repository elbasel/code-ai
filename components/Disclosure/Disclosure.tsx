import { Disclosure as HeadlessDisclosure } from "@headlessui/react";
import React from "react";

type DisclosureProps = {
  children?: React.ReactNode;
  defaultOpen?: boolean;
};

export const Disclosure = ({ children, defaultOpen }: DisclosureProps) => {
  return (
    <HeadlessDisclosure defaultOpen={defaultOpen}>
      {({ open }) => <>{children}</>}
    </HeadlessDisclosure>
  );
};
