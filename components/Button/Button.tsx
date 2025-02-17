import React from "react";

type ButtonProps = {
  label: string;
  onClick: () => void;
  style?: string;
};

const Button = ({ label, onClick, style }: ButtonProps) => {
  return (
    <button
      className={`py-3 px-4 text-center rounded-sm w-full ${style}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
