import React from "react";

type WindowProps = {
  children?: React.ReactNode;
};

export const Window = ({ children }: WindowProps): React.ReactElement => {
  return (
    <div className="fixed inset-0 z-20 w-screen h-screen p-4 transform border border-black scrollbar-hide">
      {children}
    </div>
  );
};
