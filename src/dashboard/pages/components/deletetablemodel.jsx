import React, { useEffect } from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, dataName }) => {
  if (!isOpen) return null;
  useEffect(() => {
    const clickOutside = (event) => {
      if (refdiv.current && !refdiv.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [onClose]);
  const refdiv = React.useRef(null);
  const handleDelete = () => {
    onConfirm();
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-white/60  flex items-center justify-center z-50">
      <div ref={refdiv} className="bg-white rounded-lg shadow-xl w-96 p-6">
        <h2 className="text-lg font-bold text-red-600 mb-4">Delete Table</h2>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-medium">{dataName}</span>? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
