import React from "react";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  label: string;
  onClick?: () => void;
  style?: string;
  disabled?: boolean;
};

const Button = ({ label, onClick, style, type, disabled }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`py-3 px-4  rounded-sm w-full ${style} flex items-center justify-center gap-x-4`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
