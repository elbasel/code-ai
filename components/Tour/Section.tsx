import { Disclosure } from "@components/Disclosure/Disclosure";
import { DisclosurePanel } from "@components/Disclosure/DisclosurePanel";
import React from "react";
import { twMerge } from "tailwind-merge";

type TourSectionProps = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
};

export const TourSection = ({
  title = "",
  children,
  className,
}: TourSectionProps): React.ReactElement => {
  return (
    <Disclosure title={title}>
      <DisclosurePanel>
        <section
          className={twMerge(
            "tourSection space-y-4 py-2 border-b border-b-gray-500",
            className
          )}
        >
          {children}
        </section>
      </DisclosurePanel>
    </Disclosure>
  );
};
