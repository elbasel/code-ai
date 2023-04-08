import { Disclosure as HeadlessDisclosure } from "@headlessui/react";
import React from "react";
import { DisclosureButton } from "./DisclosureButton";

type DisclosureProps = {
  children?: React.ReactNode;
  defaultOpen?: boolean;
  title?: string;
};

export const Disclosure = ({
  children,
  defaultOpen,
  title,
}: DisclosureProps) => {
  return (
    <HeadlessDisclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <DisclosureButton open={open}>{title}</DisclosureButton>
          {children}
        </>
      )}
    </HeadlessDisclosure>
  );
};
