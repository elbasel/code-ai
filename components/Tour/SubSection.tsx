import { Disclosure } from "@components/Disclosure/Disclosure";
import { DisclosureButton } from "@components/Disclosure/DisclosureButton";
import { DisclosurePanel } from "@components/Disclosure/DisclosurePanel";
import React from "react";
import { twMerge } from "tailwind-merge";

type SubSectionProps = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  defaultOpen?: boolean;
};

export const SubSection = ({
  children,
  className,
  title,
  defaultOpen = false,
}: SubSectionProps): React.ReactElement => {
  return (
    <section className={twMerge("space-y-4 my-2", className)}>
      <Disclosure defaultOpen={defaultOpen} title={title}>
        <DisclosurePanel>{children}</DisclosurePanel>
      </Disclosure>
    </section>
  );
};
