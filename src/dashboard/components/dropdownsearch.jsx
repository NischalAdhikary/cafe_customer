import { Loader, X } from "lucide-react";
import React from "react";
import {
  useGetAllCustomersQuery,
  useGetAvailableCustomersQuery,
} from "../../store/api/User";

export default function DropDownSearch({
  onClose,
  placeholder,
  setCustomerForOrder,
  data,
  loading,
  label,
  labelKey,
  secondLabelKey,
}) {
  const [value, setValue] = React.useState(null);
  const onChange = (e) => setValue(e.target.value);
  console.log("data", data);

  const filterdata = data.filter((item) =>
    item[labelKey]
      .toLocaleLowerCase()
      .includes((value || "").toLocaleLowerCase())
  );
  console.log("filtered data", filterdata);
  const handleUserClick = (customer) => {
    console.log("selected data from dropdown", customer);
    setCustomerForOrder(customer);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white/50 flex justify-center z-50 items-center">
      <div className="w-96 h-1/2 p-4 bg-white rounded-xl shadow-2xl">
        <div className={`flex flex-col h-full`}>
          <div className="flex items-center border-b mb-2 justify-between">
            <h1 className="text-lg p-2">{label}</h1>
            <X onClick={onClose} className="w-6 h-6 cursor-pointer" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type="text"
              value={value || ""}
              name="username"
              onChange={onChange}
              autoComplete="off"
              placeholder={placeholder}
              className="w-full p-2 rounded-md border border-gray-300"
            />
          </div>

          <div className="flex-1 mt-2 overflow-y-auto">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center animate-spin">
                <Loader />
              </div>
            ) : filterdata && filterdata.length > 0 ? (
              filterdata.map((item, index) => (
                <div
                  onClick={() => handleUserClick(item)}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                  key={index}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="ml-2">
                      <p className="text-sm font-semibold">{item[labelKey]}</p>
                      <p className="text-xs text-gray-500">
                        {item[secondLabelKey]}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-sm">No Customer Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
