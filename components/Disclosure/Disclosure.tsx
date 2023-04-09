import {
  Disclosure as HeadlessDisclosure,
  Transition,
} from "@headlessui/react";
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
          {/* TODO figure out why enter transition is not working while the leave transition is! */}
          <Transition
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="w-full"
          >
            {children}
          </Transition>
        </>
      )}
    </HeadlessDisclosure>
  );
};
