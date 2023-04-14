import React from "react";

type ScreenProps = {
  children: React.ReactNode;
};

export const Screen = ({ children }: ScreenProps): React.ReactElement => {
  return <div className="p-2 min-h-screen-relaxed-relaxed screen">{children}</div>;
};
