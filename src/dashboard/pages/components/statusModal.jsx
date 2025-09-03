import React, { useEffect } from "react";
import {
  ChevronLeft,
  XCircle,
  Hash,
  Edit3,
  X,
  ShoppingBag,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import {
  useUpdateOrderDetailsStatusMutation,
  useUpdateOrderMasterStatusMutation,
} from "../../../store/api/Order";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
export default function StatusModal({ orderdata, onClose }) {
  const [editingOrderMaster, setEditingOrderMaster] = React.useState(null);

  const [editingOrderItem, setEditingOrderItem] = React.useState(null);
  const [updateOrderDetailsStatus] = useUpdateOrderDetailsStatusMutation();
  const [updateOrderMasterStatus] = useUpdateOrderMasterStatusMutation();
  const ordermaster = useSelector((state) => state.activeorder.ordermaster);
  const reduxorderdetails = useSelector(
    (state) => state.activeorder.ordersdetails
  );

  const orderMasterStatusesAdmin = [
    { value: "pending", label: "Pending" },
    { value: "process", label: "In Process" },
    { value: "completed", label: "Completed" },
    { value: "cancel", label: "Cancelled" },
  ];

  const orderItemStatusesAdmin = [
    { value: "pending", label: "Pending" },
    { value: "process", label: "Preparing" },
    { value: "ready", label: "Ready" },
    { value: "delivered", label: "Served" },
    { value: "cancel", label: "Cancelled" },
  ];

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "served":
        return CheckCircle;
      case "process":
      case "preparing":
        return Loader;
      case "cancelled":
        return XCircle;
      default:
        return AlertCircle;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "served":
        return "green";
      case "process":
      case "preparing":
        return "blue";
      case "cancelled":
        return "red";
      default:
        return "yellow";
    }
  };

  const handleUpdateOrderMasterStatus = async (masterId, newStatus) => {
    try {
      await updateOrderMasterStatus({
        orderid: masterId,
        status: newStatus,
      });

      toast.success("Order status updated successfully");
    } catch (e) {
      toast.error("Failed to update order status");
    }
    setEditingOrderMaster(null);
  };

  const handleUpdateOrderItemStatus = async (orderDetailId, newStatus) => {
    try {
      await updateOrderDetailsStatus({
        orderid: orderDetailId,
        status: newStatus,
      });

      toast.success("Order item status updated successfully");
    } catch (e) {
      toast.error("Failed to update order item status");
    }
    setEditingOrderItem(null);
  };

  const totalAmount =
    orderdata?.orderdetails?.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0) || 0;

  const orderItems = orderdata?.orderdetails || [];

  if (!orderdata) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="bg-blue-500 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Order Management</h2>
              {}
              <span className="text-emerald-100 text-sm">
                {orderdata?.ordertype} {orderdata?.tables?.tablename} •{" "}
                {orderdata?.user?.name || "Unknown User"}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Hash className="w-5 h-5 text-blue-500" />
                Order #{orderdata?.masterid?.slice(-8) || "Unknown"}
              </h3>
              <button
                onClick={() => setEditingOrderMaster(orderdata?.masterid)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {formatDate(orderdata?.createdat)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  Total: Rs. {totalAmount}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Order Status:</span>
              {editingOrderMaster === orderdata?.masterid ? (
                <div className="flex items-center gap-2">
                  <select
                    defaultValue={orderdata?.orderstatus}
                    onChange={(e) => {
                      handleUpdateOrderMasterStatus(
                        orderdata?.masterid,
                        e.target.value
                      );
                    }}
                    className="text-xs px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {orderMasterStatuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setEditingOrderMaster(null)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {React.createElement(getStatusIcon(orderdata?.orderstatus), {
                    className: `w-4 h-4 text-${getStatusColor(
                      orderdata?.orderstatus
                    )}-500`,
                  })}
                  <span
                    className={`text-xs px-2 py-1 rounded-full bg-${getStatusColor(
                      orderdata?.orderstatus
                    )}-100 text-${getStatusColor(
                      orderdata?.orderstatus
                    )}-800 font-medium`}
                  >
                    {orderdata?.orderstatus}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-green-500" />
              Order Items ({orderItems.length})
            </h3>

            {orderItems.length > 0 ? (
              <div className="space-y-3">
                {orderItems.map((item, index) => {
                  const StatusIcon = getStatusIcon(item.orderstatus);
                  const isEditing = editingOrderItem === item.orderdetailid;

                  return (
                    <div
                      key={item.orderdetailid || index}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium text-gray-900">
                              {item.fooditems?.foodname || "Unknown Item"}
                            </h4>
                            <span className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                              ID: {item.orderdetailid?.slice(-6) || index}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span>Price: Rs. {item.price}</span>
                            <span className="font-medium">
                              Total: Rs. {item.price * item.quantity}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Status:
                            </span>
                            {isEditing ? (
                              <div className="flex items-center gap-2">
                                <select
                                  defaultValue={item.orderstatus?.toLowerCase()}
                                  onChange={(e) => {
                                    handleUpdateOrderItemStatus(
                                      item.orderdetailid,
                                      e.target.value
                                    );
                                  }}
                                  className="text-xs px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  {orderItemStatuses.map((status) => (
                                    <option
                                      key={status.value}
                                      value={status.value}
                                    >
                                      {status.label}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  onClick={() => setEditingOrderItem(null)}
                                  className="p-1 text-gray-500 hover:text-gray-700"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <StatusIcon
                                  className={`w-4 h-4 text-${getStatusColor(
                                    item.orderstatus
                                  )}-500`}
                                />
                                <span
                                  className={`text-xs px-2 py-1 rounded-full bg-${getStatusColor(
                                    item.orderstatus
                                  )}-100 text-${getStatusColor(
                                    item.orderstatus
                                  )}-800 font-medium`}
                                >
                                  {item.orderstatus}
                                </span>
                                <button
                                  onClick={() =>
                                    setEditingOrderItem(item.orderdetailid)
                                  }
                                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                >
                                  <Edit3 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>

                          {item.specialinstructions && (
                            <div className="mt-2 p-2 bg-yellow-50 rounded text-xs text-yellow-800">
                              <span className="font-medium">Note:</span>{" "}
                              {item.specialinstructions}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No order items found</p>
              </div>
            )}
          </div>

          {orderItems.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">
                Order Summary
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-600">Total Items:</span>
                  <span className="font-medium ml-2">{orderItems.length}</span>
                </div>
                <div>
                  <span className="text-green-600">Total Amount:</span>
                  <span className="font-medium ml-2">Rs. {totalAmount}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-green-600">Order Time:</span>
                  <span className="font-medium ml-2">
                    {formatDate(orderdata?.createdat)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Close
            </button>
            <span className="text-xs text-gray-500">
              Last updated:{" "}
              {formatTime(orderdata?.updatedat || new Date().toISOString())}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
