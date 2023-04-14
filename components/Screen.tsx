import React from "react";

type ScreenProps = {
  children: React.ReactNode;
};

export const Screen = ({ children }: ScreenProps): React.ReactElement => {
  return <div className="w-screen min-h-screen screen">{children}</div>;
};
