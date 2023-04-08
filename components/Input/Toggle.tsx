import { Switch } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

type ToggleProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  title?: string;
};

export const Toggle = ({
  checked,
  onChange = () => undefined,
  className,
  title,
}: ToggleProps) => {
  return (
    <div className="py-16">
      <Switch
        checked={checked}
        onChange={onChange}
        className={twMerge(
          "relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75",
          className
        )}
      >
        <span className="sr-only">{title}</span>
        <span
          aria-hidden="true"
          className={twMerge(
            "pointer-events-none inline-block h-[34px] translate-x-0 w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
            checked && "translate-x-9"
          )}
        />
      </Switch>
    </div>
  );
};
