import React from "react";
import Dropdown from "./dropdown";
import RadioButton from "./radiobutton";

export default function Editfood({ onClose, data, onChange, onSave }) {
  const dropDownOptions = [
    { value: "Normal", label: "Normal" },
    { value: "Dining", label: "Dining" },
    { value: "Hall", label: "Hall" },
    { value: "Special", label: "Special" },
  ];
  const radioButtonOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "Occupied", label: "Occupied" },
  ];
  return (
    <div className="fixed inset-0 bg-white/60 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-120 p-6">
        <h2 className="text-lg font-bold mb-4">Edit Fooditem</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Food Name</label>
          <input
            type="text"
            value={data?.tablename || ""}
            name="tablename"
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1"> Description</label>
          <input
            type="text"
            value={data?.tablename || ""}
            name="tablename"
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1"> Price</label>
          <input
            type="number"
            value={data?.tablename || ""}
            name="tablename"
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <Dropdown
            options={dropDownOptions}
            selected={data?.type || null}
            onChange={(value) => onChange({ target: { name: "type", value } })}
            placeholder="Select Table Type"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Available</label>
          {radioButtonOptions.map((option) => (
            <RadioButton
              key={option.value}
              label={option.label}
              name="status"
              value={option.value}
              checked={data?.status === option.value}
              onChange={onChange}
            />
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Veg</label>
          {radioButtonOptions.map((option) => (
            <RadioButton
              key={option.value}
              label={option.label}
              name="status"
              value={option.value}
              checked={data?.status === option.value}
              onChange={onChange}
            />
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave();
              onClose();
            }}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
