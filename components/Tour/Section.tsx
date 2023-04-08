import React from "react";
import { twMerge } from "tailwind-merge";

type TourSectionProps = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
};

export const TourSection = ({
  title,
  children,
  className,
}: TourSectionProps): React.ReactElement => {
  return (
    <section className={twMerge("py-2 border-b border-b-gray-500", className)}>
      {title && <h2 className="mb-5">{title}</h2>}
        {children}
    </section>
  );
};
