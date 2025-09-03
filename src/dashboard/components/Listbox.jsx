import React, { useEffect } from "react";

export default function Listbox({
  item,
  handleNavigation,
  closeListItem,
  className,
}) {
  const divref = React.useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divref.current && !divref.current.contains(event.target)) {
        closeListItem();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleNavigationFunction = (path) => {
    handleNavigation(path);
    closeListItem();
  };
  return (
    <div
      ref={divref}
      className={`w-50 absolute  bg-white shadow  h-auto ${className}`}
    >
      {item.map((child) => (
        <div key={child.id}>
          <button
            onClick={
              child.onClick
                ? child.onClick
                : () => handleNavigationFunction(child.path)
            }
            className="w-full cursor-pointer flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <span>{child.label}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
