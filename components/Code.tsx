import { ThemesType } from "@appTypes/ThemesType";
import useIsClient from "@hooks/useClient";
import React, { useContext, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { ThemeContext } from "./Theme";

const buttonStyles: ThemesType = {
  common: ["px-2", "py-1", "rounded-lg"].join(" "),
  dark: ["bg-black", "text-white", "hover:bg-white", "hover:text-black"].join(
    " "
  ),
  copied: {
    dark: ["bg-green-800", "text-white", "hover:bg-green-700"].join(" "),
  },
};

const codeStyles: ThemesType = {
  common: [
    "flex",
    "items-center",
    "gap-2",
    "whitespace-break-spaces",
    "flex-wrap",
  ].join(" "),
  dark: ["hover:text-green-800"].join(" "),
};

type CodeProps = {
  children?: string;
  className?: string;
};

export const Code = ({
  children = "",
  className,
}: CodeProps): React.ReactElement => {
  const [copied, setCopied] = useState(false);
  const { theme } = useContext(ThemeContext);
  const isClient = useIsClient();
  const textRef = useRef(null);

  const handleOnCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
    toast.success("Copied to clipboard!");
  };

  const handleOnTextMouseEnter = () => {
    const textSpanElement = textRef.current as HTMLSpanElement | null;
    if (textSpanElement != null) {
      textSpanElement.focus();
    }
  };

  if (!isClient) return <></>;

  return (
    <code className={twMerge(codeStyles.common, codeStyles[theme], className)}>
      <span
        className="break-all whitespace-break-spaces"
        onMouseEnter={handleOnTextMouseEnter}
        ref={textRef}
      >
        {children}
      </span>
      <CopyToClipboard text={children} onCopy={handleOnCopy}>
        <button
          type="button"
          className={twMerge(
            buttonStyles.common,
            buttonStyles[theme],
            copied && buttonStyles.copied[theme],
            className
          )}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </CopyToClipboard>
    </code>
  );
};
