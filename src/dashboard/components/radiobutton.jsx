import React from "react";

export default function RadioButton({
  label,
  name,
  value,
  checked,
  onChange,
  id,
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        className="cursor-pointer"
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
