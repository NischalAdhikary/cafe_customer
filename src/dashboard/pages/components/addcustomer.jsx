import RadioButton from "../../components/radiobutton";

export default function AddCustomer({ onClose, data, onChange, onSave }) {
  const radioButtonOptions = [
    { label: "Active", value: "Active" },
    { label: "Bad", value: "Bad" },
  ];

  return (
    <div className="fixed inset-0 bg-white/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-bold mb-4">Create Customer</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={data?.name || ""}
            name="name"
            onChange={onChange}
            placeholder="Enter customer name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={data?.email || ""}
            name="email"
            onChange={onChange}
            placeholder="Enter customer email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            value={data?.phone || ""}
            name="phone"
            onChange={onChange}
            placeholder="Enter customer phone"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          {radioButtonOptions.map((option) => (
            <RadioButton
              key={option.value}
              id={option.value}
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
