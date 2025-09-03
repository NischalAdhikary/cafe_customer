import React, { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllTablesQuery } from "../../../store/api/Table";
import Dropdown from "../../components/dropdown";
import {
  addToCart,
  removeFromCart,
  deleteItems,
  clearCart,
} from "../../../store/slice/Cartsitems";
import Button from "../../components/botton";
import AddCustomer from "./addcustomer";
import { useCreateCustomerMutation } from "../../../store/api/User";
import DropDownSearch from "../../components/dropdownsearch";
import { toast } from "react-toastify";
import {
  useCreatePosDineInOrderMutation,
  useCreatePosTakeAwayOrderMutation,
} from "../../../store/api/Order";
import { useGetAvailableCustomersQuery } from "../../../store/api/User";
import { useLocation } from "react-router-dom";

export default function Poscheckout() {
  const location = useLocation();
  console.log("from navigation", location.state);
  const { tabledata, type } = location.state || {};

  const [orderType, setOrderType] = useState(type || null);
  const [selectedTable, setSelectedTable] = useState(tabledata || null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [createNewUser, setCreateNewUser] = useState(null);
  const [OpenAddCustomerModal, setOpenAddCustomerModal] = useState(false);
  const [OpenSelectCustomerModal, setOpenSelectCustomerModal] = useState(false);
  console.log("order type for error", orderType);

  const { data, isLoading } = useGetAllTablesQuery();
  const { data: customerdata, isLoading: customerloading } =
    useGetAvailableCustomersQuery();
  const [createCustomer, { isLoading: ccLoading }] =
    useCreateCustomerMutation();
  const [createPosDineInOrder, { isLoading: posLoading }] =
    useCreatePosDineInOrderMutation();
  const [createPosTakeAwayOrder, { isLoading: postakeawayloading }] =
    useCreatePosTakeAwayOrderMutation();

  const activeTable = data?.data.filter((item) => item.status === "Active");

  const DropdownOptions = activeTable?.map((item) => ({
    value: item.tableid,
    label: item.tablename,
  }));
  console.log("selecteduser", selectedCustomer);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cartitems.items);

  const addItems = (item) => {
    dispatch(addToCart(item));
  };
  const handleAddModalClose = () => {
    setCreateNewUser(null);
    setOpenAddCustomerModal(false);
  };
  const removeItems = (item) => {
    dispatch(removeFromCart(item));
  };

  const deleteItem = (item) => {
    dispatch(deleteItems(item.foodid));
  };
  const setCustomerForOrder = (customer) => {
    setSelectedCustomer(customer);
  };
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const handleChange = (e) => {
    setOrderType(e.target.value);
    setSelectedCustomer(null);
  };
  const finalizeAdd = async () => {
    try {
      await createCustomer(createNewUser).unwrap();

      setOpenAddCustomerModal(false);
      setCreateNewUser(null);
      toast.success("Customer created successfully");
    } catch (e) {
      toast.error(e?.data?.message);
    }
  };
  const finalizeCheckOut = async () => {
    try {
      if (orderType === "dine-in") {
        if (selectedTable === null) {
          toast.error("Please select a table");
          return;
        } else if (selectedCustomer === null) {
          toast.error("Please select a customer");
          return;
        } else {
          await createPosDineInOrder({
            orderdetails: items,
            tableid: selectedTable,
            userid: selectedCustomer.userid,
          });
          setSelectedTable(null);
          setSelectedCustomer(null);
          dispatch(clearCart());
          toast.success("Order placed successfully");
        }
      }

      if (orderType === "takeaway") {
        if (selectedCustomer === null) {
          toast.error("Please select a customer");
          return;
        } else {
          await createPosTakeAwayOrder({
            orderdetails: items,
            userid: selectedCustomer.userid,
          });
          toast.success("Order placed successfully");
          setSelectedCustomer(null);
          dispatch(clearCart());
        }
      }
    } catch (e) {
      toast.error(e?.data?.message);
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col p-4 bg-gray-50">
      <div className="mb-6 flex-1 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Order Type</h3>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="orderType"
              value="dine-in"
              checked={orderType === "dine-in"}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm">Dine In</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="orderType"
              value="takeaway"
              checked={orderType === "takeaway"}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm">Takeaway</span>
          </label>
        </div>
        {orderType === "dine-in" && (
          <div className="mt-4">
            <Dropdown
              label="Table"
              selected={selectedTable}
              options={DropdownOptions}
              onChange={(tableId) => setSelectedTable(tableId)}
              placeholder="Select Table"
            />
            <div className="mt-4 flex flex-col flex-wrap md:flex-row  gap-5">
              <Button
                onClick={() => setOpenAddCustomerModal(true)}
                variant={"secondary"}
              >
                Create User
              </Button>
              <Button
                onClick={() => setOpenSelectCustomerModal(true)}
                variant={"secondary"}
              >
                Select User
              </Button>
              <Button variant={"secondary"}>Guest</Button>
            </div>
            {selectedCustomer && (
              <div className="mt-4 text-md font-semibold">
                Selected User: {selectedCustomer?.name}
              </div>
            )}
          </div>
        )}
        {orderType === "takeaway" && (
          <div>
            <div className="mt-5 flex flex-wrap gap-5">
              <Button
                variant={"secondary"}
                onClick={() => setOpenAddCustomerModal(true)}
              >
                Create User
              </Button>
              <Button
                onClick={() => setOpenSelectCustomerModal(true)}
                variant={"secondary"}
              >
                Select User
              </Button>
              <Button variant={"secondary"}>Guest</Button>
            </div>
            {selectedCustomer && (
              <div className="mt-4 text-md font-semibold">
                Selected User: {selectedCustomer?.name}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex-2 bg-white  overflow-y-auto  rounded-lg shadow-sm ">
        <div className="overflow-x-auto w-full  ">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">Items</th>
                <th className="text-center p-4 font-semibold">Quantity</th>
                <th className="text-center p-4 font-semibold">Total (Rs)</th>
                <th className="text-center p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-gray-500">
                    No items in cart
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{item.foodname}</div>
                        <div className="text-sm text-gray-500">
                          Rs {item.price} each
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => removeItems(item)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addItems(item)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-center font-medium">
                      Rs {item.price * item.quantity}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => deleteItem(item)}
                          className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4  bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total Amount:</span>
          <span className="text-xl font-bold text-green-600">
            Rs {calculateTotal()}
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={finalizeCheckOut}
            disabled={items.length === 0}
            className={`flex-1 py-3 rounded-lg font-medium text-white transition-colors
    ${
      items.length === 0
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }
  `}
          >
            Checkout
          </button>
          <button
            onClick={() => dispatch(clearCart())}
            className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
      {OpenAddCustomerModal && (
        <AddCustomer
          onClose={handleAddModalClose}
          data={createNewUser}
          onChange={(e) =>
            setCreateNewUser({
              ...createNewUser,
              [e.target.name]: e.target.value,
            })
          }
          onSave={finalizeAdd}
        />
      )}
      {OpenSelectCustomerModal && (
        <DropDownSearch
          onClose={() => setOpenSelectCustomerModal(false)}
          setCustomerForOrder={setCustomerForOrder}
          data={customerdata?.data}
          loading={customerloading}
          label="Select Customer"
          labelKey="name"
          secondLabelKey="phone"
        />
      )}
    </div>
  );
}
