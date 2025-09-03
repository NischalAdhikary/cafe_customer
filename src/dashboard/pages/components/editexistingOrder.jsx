import { Minus, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeExistingOrderdetails,
  removeSingleOrderDetails,
  setEditOrderDetails,
  clearRemovedOrderDetails,
  setItemsToRemove,
} from "../../../store/slice/Orderdetails";
import { toast } from "react-toastify";
import { useCancelTakeAwayPendingOrderMutation } from "../../../store/api/Order";

export default function EditExistingOrder({ onClose }) {
  const dispatch = useDispatch();

  const orderitems = useSelector((state) => state.activeorder.ordersdetails);
  console.log("orderitems", orderitems);
  const removedOrderDetails = useSelector(
    (state) => state.activeorder.removedOrderDetails
  );
  const [cancelTakeAwayPendingOrder, { isLoading }] =
    useCancelTakeAwayPendingOrderMutation();
  const ordermaster = useSelector((state) => state.activeorder.ordermaster);
  const itemstoremove = useSelector(
    (state) => state.activeorder.removedOrderDetails
  );
  console.log("itemstoremove", itemstoremove);

  const pendingItems = orderitems?.filter(
    (item) => item.orderstatus === "pending"
  );

  const mergedOrderItems = pendingItems.reduce((acc, item) => {
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

  const removeAllItems = (item) => {
    dispatch(removeExistingOrderdetails(item));
    const orderdetailstoremove = pendingItems.filter(
      (items) => items.foodid === item.foodid
    );
    console.log("orderdetailstoremove", orderdetailstoremove);
    for (let i = 0; i < orderdetailstoremove.length; i++) {
      dispatch(setItemsToRemove(orderdetailstoremove[i].orderdetailid));
    }
  };

  const reduceQuantity = (item) => {
    dispatch(removeSingleOrderDetails(item));
    dispatch(setItemsToRemove(item.orderdetailid));
  };
  const handleClose = () => {
    dispatch(clearRemovedOrderDetails());
    onClose();
  };
  const FinalizeSave = async () => {
    try {
      await cancelTakeAwayPendingOrder(itemstoremove).unwrap();
      dispatch(clearRemovedOrderDetails());
      onClose();
      toast.success("Order updated successfully");
    } catch (e) {
      toast.error("Failed to update order");
    }
  };

  return (
    <div className="fixed inset-0 flex w-full items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white w-140 h-[60vh] flex flex-col rounded-lg shadow-sm">
        <div className="p-2">
          <h1 className="text-2xl font-semibold mb-4">Edit Order Items</h1>
          {removedOrderDetails.length > 0 && (
            <div className="text-sm text-orange-600 mb-2">
              {removedOrderDetails.length} item(s) marked for removal
            </div>
          )}
        </div>

        <div className="w-full flex-1 overflow-x-scroll overflow-y-scroll">
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
                          onClick={() => reduceQuantity(item)}
                          disabled={item.quantity <= 0}
                          className="w-8 h-8 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          disabled
                          className="w-8 h-8 rounded-full cursor-pointer bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                          onClick={() => removeAllItems(item)}
                          className="w-8 h-8 cursor-pointer rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors"
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
          <button
            onClick={handleClose}
            className="w-1/2 bg-white border text-black border-green-500 hover:bg-green-500 hover:text-white font-semibold py-2 px-4 rounded-xl transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={FinalizeSave}
            className="w-1/2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
