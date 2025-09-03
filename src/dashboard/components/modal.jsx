import React from "react";
import { useEffect } from "react";

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const handleClickOutside = (E) => {
      if (divref.current && !divref.current.contains(E.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const divref = React.useRef(null);
  return (
    <div
      ref={divref}
      className="fixed w-[80vw] md:w-[30vw] inset-0 flex  bg-gray-50 shadow bg-opacity-50 z-50"
    >
      <div className="flex-col w-full ">{children}</div>
    </div>
  );
}
