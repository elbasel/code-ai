import { Disclosure } from "@components/Disclosure/Disclosure";
import { DisclosurePanel } from "@components/Disclosure/DisclosurePanel";
import React from "react";
import { twMerge } from "tailwind-merge";

type TourSubSectionProps = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  defaultOpen?: boolean;
};

export const TourSubSection = ({
  children,
  className,
  title,
  defaultOpen = false,
}: TourSubSectionProps): React.ReactElement => {
  return (
    <section
      className={twMerge(
        "my-2 flex max-w-full overflow-x-hidden text-ellipsis whitespace-nowrap flex-wrap items-center gap-1 text-sm hover:bg-black text-slate-400 hover:text-white",
        className
      )}
    >
      <Disclosure defaultOpen={defaultOpen} title={title}>
        <DisclosurePanel className="inline-block px-4 py-2 rounded-lg">{children}</DisclosurePanel>
      </Disclosure>
    </section>
  );
};
