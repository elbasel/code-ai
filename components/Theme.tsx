import React, { createContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type ThemeProps = {
  children?: React.ReactNode;
  className?: string;
};

export const ThemeContext = createContext({
  theme: "dark",
  setTheme: (theme: string) => {},
});

export const Theme = ({
  children,
  className,
}: ThemeProps): React.ReactElement => {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <main
        className={twMerge(
          "min-h-screen px-4 py-2 rounded-lg bg-slate-950 text-white ",
          inter.className,
          className
        )}
      >
        {children}
      </main>
    </ThemeContext.Provider>
  );
};
