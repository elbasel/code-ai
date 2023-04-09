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
    <section
      className={twMerge(
        "my-2 flex max-w-full overflow-x-hidden text-ellipsis whitespace-nowrap flex-wrap items-center gap-1 text-sm hover:bg-black text-slate-400 hover:text-white",
        className
      )}
    >
      <Disclosure defaultOpen={defaultOpen} title={title}>
        <DisclosurePanel className="px-4">{children}</DisclosurePanel>
      </Disclosure>
    </section>
  );
};
