import React from "react";
import clsx from "clsx";

export default function Button({
  children,
  variant,
  onClick,
  className,
  ...Buttonprops
}) {
  // const buttonClasses =clsx(
  //     'bg-blue-500 text-white px-10 font-semibold py-3 rounded hover:bg-blue-600 transition duration-300',
  //     className,

  // )
  const buttonClasses = clsx(
    "px-4 py-2 rounded transition-colors cursor-pointer duration-300 focus:outline-none whitespace-nowrap",
    {
      "bg-blue-500 text-white hover:bg-blue-600": variant === "primary",
      "bg-gray-200 text-gray-800 hover:bg-gray-300": variant === "secondary",
      "bg-red-500 text-white hover:bg-red-600": variant === "danger",
      "bg-green-500 text-white hover:bg-green-600": variant === "success",
    },
    className
  );
  return (
    <button onClick={onClick} {...Buttonprops} className={buttonClasses}>
      {children}
    </button>
  );
}
