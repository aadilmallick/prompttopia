"use client";

import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  onClick?: () => void;
}

export const GradientOutlineButton: React.FC<ButtonProps> = (props) => {
  // const Props : Record<string, any> = {}
  return (
    <button
      {...props}
      className={`relative inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 shadow-lg`}
      // onClick={onClick}
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        {props.children}
      </span>
    </button>
  );
};
