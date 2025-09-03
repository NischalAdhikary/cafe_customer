import React from "react";

export default function Input({
  className,
  type,
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <input
      type={type}
      className={className}
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    ></input>
  );
}
