import React from "react";
import Dropdown from "./dropdown";
import RadioButton from "./radiobutton";
import { useSelector } from "react-redux";
import { useGetCategoryQuery } from "../../store/api/Category";
import ImageUpload from "./Imageupload";
export default function AddFooditem({ onClose, data, onChange, onSave }) {
  const { data: dropDownOptions, isLoading } = useGetCategoryQuery();

  const formatDropDownOptions = dropDownOptions?.data.map((option) => ({
    value: option.categoryid,
    label: option.categoryname,
  }));

  const AvailableOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];
  const VegOptions = [
    { value: true, label: "Veg" },
    { value: false, label: "Nonveg" },
  ];
  return (
    <div className="fixed inset-0 bg-white/60 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-120 p-6">
        <h2 className="text-lg font-bold mb-4">Add Fooditem</h2>
        <ImageUpload
          value={data?.imageurl}
          onChange={(file) =>
            onChange({ target: { name: "image", value: file } })
          }
        />

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Food Name</label>
          <input
            type="text"
            value={data?.foodname || ""}
            placeholder="Enter food name"
            name="foodname"
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1"> Description</label>
          <input
            type="text"
            value={data?.description || ""}
            name="description"
            placeholder="Enter food description"
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1"> Price</label>
          <input
            type="number"
            value={data?.price || ""}
            name="price"
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <Dropdown
            options={formatDropDownOptions}
            selected={data?.category || null}
            onChange={(value) =>
              onChange({ target: { name: "category", value } })
            }
            placeholder="Select Category"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Available</label>
          <div className="flex gap-2">
            {AvailableOptions.map((option) => (
              <RadioButton
                key={option.value}
                id={option.value === true ? "yes" : "no"}
                label={option.label}
                name="availability"
                value={option.value}
                checked={data?.availability === option.value}
                onChange={onChange}
              />
            ))}
          </div>
        </div>
        <div className="mb-4 ">
          <label className="block text-sm font-medium mb-1">Veg</label>
          <div className=" flex gap-4">
            {VegOptions.map((option) => (
              <RadioButton
                key={option.value}
                label={option.label}
                id={option.value === true ? "veg" : "nonveg"}
                name="is_veg"
                value={option.value}
                checked={data?.is_veg === option.value}
                onChange={onChange}
              />
            ))}
          </div>
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
