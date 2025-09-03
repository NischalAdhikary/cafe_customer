import { Minus, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useGetFoodItemsQuery } from "../../../store/api/FoodItem";
import DropDownSearch from "../../components/dropdownsearch";
import { useDispatch, useSelector } from "react-redux";
import {
  setNewOrderDetails,
  setExistingOrderDetails,
  emptyNewOrderDetails,
  setAddExisitingOrderDetails,
} from "../../../store/slice/Orderdetails";
import { useAddExistingTakeAwayOrderMutation } from "../../../store/api/Order";
export default function AddExistingOrder({ onClose }) {
  const { data: fooddata, isLoading: foodloading } = useGetFoodItemsQuery();
  const [selectedItem, setSelectedItem] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const ordermaster = useSelector((state) => state.activeorder.ordermaster);
  const orderitems = useSelector((state) => state.activeorder.ordersdetails);
  console.log("orderitems", orderitems);
  const newlyordered = useSelector(
    (state) => state.activeorder.newOrderDetails
  );
  console.log("newlyordered", newlyordered);

  const [addExistingTakeAwayOrder, { isLoading }] =
    useAddExistingTakeAwayOrderMutation();
  const mergedOrderItems = orderitems.reduce((acc, item) => {
    const existing = acc.find(
      (i) => i.fooditems.foodid === item.fooditems.foodid
    );
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  const [OpenFoodItemList, setOpenFoodItemList] = useState(false);
  const handleaddOrder = (item) => {
    dispatch(setExistingOrderDetails({ ...item, quantity: 1 }));
    dispatch(setNewOrderDetails(item.fooditems));
  };
  const handleSelectNewOrder = (item) => {
    setSelectedItem(item);
  };
  const handleAddNewFood = () => {
    console.log("quantity", quantity);
    if (!selectedItem) return;
    for (let i = 0; i < quantity; i++) {
      dispatch(setAddExisitingOrderDetails(selectedItem));
      dispatch(setNewOrderDetails(selectedItem));
    }

    setSelectedItem(null);
    setQuantity(1);
  };
  const handleClose = () => {
    onClose();
    dispatch(emptyNewOrderDetails());
  };
  const handleSave = async () => {
    try {
      await addExistingTakeAwayOrder({
        fooditems: newlyordered,
        ordermaster,
      }).unwrap();
      console.log("Order created successfully");

      setOpenFoodItemList(false);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="fixed inset-0 flex  w-full items-center justify-center bg-black/50  z-50 p-4">
      <div className=" bg-white w-140  h-[60vh] flex flex-col  rounded-lg shadow-sm ">
        <div className="p-2">
          <h1 className="text-2xl    font-semibold mb-4">Add Items</h1>
        </div>
        <div className="w-full flex-2  overflow-x-scroll overflow-y-scroll">
          <table className="w-full  ">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">Items</th>
                <th className="text-center p-4 font-semibold">Quantity</th>
                <th className="text-center p-4 font-semibold">Total (Rs)</th>
                <th className="text-center p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mergedOrderItems.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-gray-500">
                    No items in cart
                  </td>
                </tr>
              ) : (
                mergedOrderItems.map((item) => (
                  <tr key={item.orderdetailid} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">
                          {item.fooditems.foodname}
                        </div>
                        <div className="text-sm text-gray-500">
                          Rs {item.price} each
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => removeItems(item)}
                          disabled={true}
                          className="w-8 h-8 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleaddOrder(item)}
                          className="w-8 h-8 rounded-full cursor-pointer bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
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
                          disabled
                          className="w-8 h-8  cursor-pointer rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
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
        <div className="w-full p-4 flex justify-between gap-4 items-center">
          <div className="flex w-1/2 gap-2  flex-col">
            <h2 className="text-md font-semibold">Add New Item</h2>
            <button
              onClick={() => setOpenFoodItemList(true)}
              className="w-full bg-white border text-black border-green-500 hover:bg-green-500  hover:text-white font-semibold py-2 px-4 rounded-xl transition"
            >
              {selectedItem ? selectedItem.foodname : "Select Item"}
            </button>
          </div>
          <div className="flex flex-1 gap-2 flex-col">
            <h2 className="text-md font-semibold">Quantity</h2>
            <input
              type="number"
              value={quantity}
              disabled={!selectedItem}
              name="quantity"
              onChange={(e) => {
                setQuantity(e.target.value);
                if (e.target.value < 1) setQuantity(1);
              }}
              className="p-2 w-30 border rounded-md"
            />
          </div>
          <button
            onClick={handleAddNewFood}
            className="flex-1 mt-8 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl transition"
          >
            Add
          </button>
        </div>
        <div className="w-full p-4 flex justify-between gap-4 items-center">
          <button
            onClick={handleClose}
            className="w-1/2 bg-white border text-black border-green-500 hover:bg-green-500  hover:text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="w-1/2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl transition"
          >
            Save
          </button>
        </div>
      </div>
      {OpenFoodItemList && (
        <DropDownSearch
          onClose={() => setOpenFoodItemList(false)}
          setCustomerForOrder={handleSelectNewOrder}
          data={fooddata?.data}
          loading={foodloading}
          label="Select Item"
          labelKey="foodname"
          secondLabelKey="price"
        />
      )}
    </div>
  );
}
