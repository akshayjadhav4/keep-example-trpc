import classNames from "classnames";
import React from "react";

interface CheckIconProps {
  showCheckboxes?: boolean;
}

export const CheckIcon = ({ showCheckboxes = false }: CheckIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={classNames("h-6 w-6 stroke-red-500", {
        "stroke-neutral-800 dark:stroke-white": !showCheckboxes,
      })}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
