import React, { useState, useMemo } from "react";
import {
  Users,
  Clock,
  XCircle,
  Phone,
  Mail,
  Calendar,
  ShoppingBag,
  AlertTriangle,
  Eye,
  ChevronLeft,
  Edit3,
  X,
  Package,
  ChefHat,
  Truck,
  CheckCircle2,
  Clock3,
  AlertCircle,
  DollarSign,
  Hash,
  Calendar as CalendarIcon,
} from "lucide-react";
import {
  useGetBookedTableDeatilsQuery,
  useUnBookTableAdminMutation,
} from "../../../store/api/Table";
import Modal from "../../components/cancelModal";
import { toast } from "react-toastify";
import { editTablestatus } from "../../../store/slice/Table";
import { useDispatch } from "react-redux";
import {
  useUpdateOrderDetailsStatusMutation,
  useUpdateOrderMasterStatusMutation,
} from "../../../store/api/Order";

const BookedTableModal = ({
  table,
  isOpen,
  onClose,
  onViewOrders,
  userRole = "admin",
}) => {
  const { data, isLoading, refetch } = useGetBookedTableDeatilsQuery(
    table?.tableid,
    {
      skip: !table?.tableid,
    }
  );

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [editingOrderItem, setEditingOrderItem] = useState(null);
  const [editingOrderMaster, setEditingOrderMaster] = useState(null);

  const [unBookTableAdmin, { isLoading: isUnbookingLoading }] =
    useUnBookTableAdminMutation();
  const [updateOrderDetailsStatus] = useUpdateOrderDetailsStatusMutation();
  const [updateOrderMasterStatus] = useUpdateOrderMasterStatusMutation();

  const [bookingInfo, setBookingInfo] = useState(null);
  const dispatch = useDispatch();

  const orderItemStatuses = [
    { value: "pending", label: "Pending", icon: Clock3, color: "yellow" },
    { value: "process", label: "Preparing", icon: ChefHat, color: "blue" },
    { value: "delivered", label: "Delivered", icon: Package, color: "green" },
    { value: "ready", label: "Ready", icon: Truck, color: "yellow" },
    { value: "cancel", label: "Cancelled", icon: X, color: "red" },
  ];

  const orderMasterStatuses = [
    { value: "pending", label: "Pending", icon: Clock3, color: "blue" },
    { value: "process", label: "Processing", icon: Truck, color: "yellow" },
    {
      value: "completed",
      label: "Completed",
      icon: CheckCircle2,
      color: "green",
    },
    { value: "cancel", label: "Cancelled", icon: X, color: "red" },
    { value: "paid", label: "Paid", icon: DollarSign, color: "emerald" },
  ];

  const bookingDetails = useMemo(() => {
    if (!data?.data) return null;

    const responseData = data.data;
    const booking = responseData.tablebooking?.[0];
    const user = booking?.users;
    const orderMaster = responseData.ordermaster?.[0];
    const orderDetails = orderMaster?.orderdetails || [];

    const totalAmount = orderDetails.reduce(
      (sum, detail) => sum + detail.total,
      0
    );

    const calculateDuration = (createdAt) => {
      const now = new Date();
      const bookingTime = new Date(createdAt);
      const diffInMinutes = Math.floor((now - bookingTime) / (1000 * 60));

      if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
      } else {
        const hours = Math.floor(diffInMinutes / 60);
        const remainingMinutes = diffInMinutes % 60;
        if (remainingMinutes === 0) {
          return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        }
        return `${hours} hour${
          hours > 1 ? "s" : ""
        } ${remainingMinutes} minutes ago`;
      }
    };

    return {
      customer: {
        name: user?.name || "Unknown Customer",
        phone: user?.phone || "No phone",
        email: user?.email || "No email",
      },
      booking: {
        bookedAt: booking?.createdat || "",
        duration: booking?.createdat
          ? calculateDuration(booking.createdat)
          : "Unknown",
      },
      orders: {
        hasOrders: orderDetails.length > 0,
        orderCount: orderDetails.length,
        totalAmount: totalAmount,
        lastOrderTime: orderMaster?.createdat || "",
        orderMaster: orderMaster,
        orderDetails: orderDetails,
      },
    };
  }, [data]);
  console.log("Order details hello:", bookingDetails);

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    return new Date(timeString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (timeString) => {
    if (!timeString) return "N/A";
    return new Date(timeString).toLocaleDateString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status, type = "item") => {
    const statusList =
      type === "item" ? orderItemStatuses : orderMasterStatuses;
    const statusObj = statusList.find((s) => s.value === status?.toLowerCase());
    return statusObj?.color || "gray";
  };

  const getStatusIcon = (status, type = "item") => {
    const statusList =
      type === "item" ? orderItemStatuses : orderMasterStatuses;
    const statusObj = statusList.find((s) => s.value === status?.toLowerCase());
    return statusObj?.icon || AlertCircle;
  };

  const handleUpdateOrderItemStatus = async (orderDetailId, newStatus) => {
    console.log("hello from update");
    console.log("Order satus", newStatus);
    try {
      console.log("orderDetailId", orderDetailId);
      await updateOrderDetailsStatus({
        orderid: orderDetailId,
        status: newStatus,
      }).unwrap();
      toast.success("Order item status updated successfully");
      setEditingOrderItem(null);
      refetch();
    } catch (error) {
      toast.error("Failed to update order item status");
      console.error("Update error:", error);
    }
  };

  const handleUpdateOrderMasterStatus = async (orderMasterId, newStatus) => {
    try {
      await updateOrderMasterStatus({
        orderid: orderMasterId,
        status: newStatus,
      }).unwrap();

      toast.success("Order status updated successfully");
      setEditingOrderMaster(null);
      refetch();
    } catch (error) {
      toast.error("Failed to update order status");
      console.error("Update error:", error);
    }
  };

  const handleUnbook = ({ tableid, userid }) => {
    setBookingInfo({ tableid, userid });
    setIsCancelModalOpen(true);
  };

  const handleCancelBooking = async () => {
    if (!bookingInfo) return;

    try {
      await unBookTableAdmin(bookingInfo);
      dispatch(
        editTablestatus({ tableid: bookingInfo.tableid, status: "Active" })
      );
      setIsCancelModalOpen(false);
      toast.success("Booking cancelled successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  const handleViewOrders = () => {
    setShowOrderDetails(true);
  };

  const handleBackToBooking = () => {
    setShowOrderDetails(false);
    setEditingOrderItem(null);
    setEditingOrderMaster(null);
  };

  if (!isOpen || !table) return null;

  if (isLoading || !bookingDetails) {
    return (
      <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Table {table.tablename}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-yellow-100 text-sm">Loading...</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-6 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">
              Loading booking details...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (showOrderDetails) {
    return (
      <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToBooking}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="text-xl font-bold">Order Management</h2>
                  <span className="text-blue-100 text-sm">
                    Table {table.tablename}
                  </span>
                </div>
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
            {bookingDetails.orders.orderMaster && (
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Hash className="w-5 h-5 text-blue-500" />
                    Order #{bookingDetails.orders.orderMaster.masterid}
                  </h3>
                  {userRole === "admin" && (
                    <button
                      onClick={() =>
                        setEditingOrderMaster(
                          bookingDetails.orders.orderMaster.masterid
                        )
                      }
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formatDate(bookingDetails.orders.orderMaster.createdat)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      Total: Rs. {bookingDetails.orders.totalAmount}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Order Status:</span>
                  {editingOrderMaster ===
                  bookingDetails.orders.orderMaster.masterid ? (
                    <div className="flex items-center gap-2">
                      <select
                        defaultValue={
                          bookingDetails.orders.orderMaster.orderstatus
                        }
                        onChange={(e) => {
                          handleUpdateOrderMasterStatus(
                            bookingDetails.orders.orderMaster.masterid,
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
                      {React.createElement(
                        getStatusIcon(
                          bookingDetails.orders.orderMaster.status,
                          "master"
                        ),
                        {
                          className: `w-4 h-4 text-${getStatusColor(
                            bookingDetails.orders.orderMaster.status,
                            "master"
                          )}-500`,
                        }
                      )}
                      <span
                        className={`text-xs px-2 py-1 rounded-full bg-${getStatusColor(
                          bookingDetails.orders.orderMaster.status,
                          "master"
                        )}-100 text-${getStatusColor(
                          bookingDetails.orders.orderMaster.status,
                          "master"
                        )}-800 font-medium`}
                      >
                        {bookingDetails.orders.orderMaster.orderstatus}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-green-500" />
                Order Items ({bookingDetails.orders.orderCount})
              </h3>

              {bookingDetails.orders.hasOrders ? (
                <div className="space-y-3">
                  {bookingDetails.orders.orderDetails.map((item, index) => {
                    const StatusIcon = getStatusIcon(item.status);
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
                                {item.fooditems?.foodname ||
                                  item.itemname ||
                                  "Unknown Item"}
                              </h4>
                              <span className="text-sm text-gray-500">
                                Qty: {item.quantity}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span>Price: Rs. {item.price}</span>
                              <span className="font-medium">
                                Total: Rs. {item.total}
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
                                      item.status
                                    )}-500`}
                                  />
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full bg-${getStatusColor(
                                      item.status
                                    )}-100 text-${getStatusColor(
                                      item.status
                                    )}-800 font-medium`}
                                  >
                                    {item.orderstatus || "Pending"}
                                  </span>
                                  {userRole === "admin" && (
                                    <button
                                      onClick={() =>
                                        setEditingOrderItem(item.orderdetailid)
                                      }
                                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                    >
                                      <Edit3 className="w-3 h-3" />
                                    </button>
                                  )}
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

            {bookingDetails.orders.hasOrders && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">
                  Order Summary
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-green-600">Total Items:</span>
                    <span className="font-medium ml-2">
                      {bookingDetails.orders.orderCount}
                    </span>
                  </div>
                  <div>
                    <span className="text-green-600">Total Amount:</span>
                    <span className="font-medium ml-2">
                      Rs. {bookingDetails.orders.totalAmount}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-green-600">Order Time:</span>
                    <span className="font-medium ml-2">
                      {formatDate(bookingDetails.orders.lastOrderTime)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <button
                onClick={handleBackToBooking}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Booking
              </button>
              <span className="text-xs text-gray-500">
                Last updated: {formatTime(new Date().toISOString())}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-green-500 to-teal-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Table {table.tablename}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4" />
                <span className="text-yellow-100 text-sm">
                  Booked • {bookingDetails.booking.duration}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Customer Details
            </h3>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">
                  {bookingDetails.customer.name}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">
                    {bookingDetails.customer.phone}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">
                    {bookingDetails.customer.email}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">
                    Booked: {formatDate(bookingDetails.booking.bookedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-green-500" />
              Order Status
            </h3>

            {bookingDetails.orders.hasOrders ? (
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-medium text-green-800">
                      {bookingDetails.orders.orderCount} Order
                      {bookingDetails.orders.orderCount > 1 ? "s" : ""}
                    </span>
                    <p className="text-sm text-green-600">
                      Total: Rs. {bookingDetails.orders.totalAmount}
                    </p>
                  </div>
                  <button
                    onClick={handleViewOrders}
                    className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    Manage Orders
                  </button>
                </div>
                <p className="text-xs text-green-600">
                  Last order: {formatTime(bookingDetails.orders.lastOrderTime)}
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">No orders placed yet</span>
                </div>
              </div>
            )}
          </div>

          {userRole === "admin" && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Admin Actions
              </h3>

              <div className="space-y-2">
                {bookingDetails.orders.hasOrders && (
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 mb-3">
                    <div className="flex items-center gap-2 text-blue-800 text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      <span>
                        Customer has active orders. Consider completing orders
                        before unbooking.
                      </span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() =>
                    handleUnbook({
                      tableid: table.tableid,
                      userid: data?.data?.tablebooking?.[0]?.userid,
                    })
                  }
                  className="w-full flex items-center justify-center gap-2 p-3 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-lg transition-colors font-medium"
                  disabled={isUnbookingLoading}
                >
                  <XCircle className="w-5 h-5" />
                  {isUnbookingLoading ? "Unbooking..." : "Unbook Table"}
                </button>

                <p className="text-xs text-gray-500 text-center mt-2">
                  This will free up the table and cancel any active bookings.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              Table booked {bookingDetails.booking.duration}
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {isCancelModalOpen && (
        <Modal
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          onConfirm={handleCancelBooking}
          title="Confirm Unbooking"
          message="Are you sure you want to unbook this table? This action cannot be undone."
          confirmText="Unbook Table"
          cancelText="Cancel"
          isLoading={isUnbookingLoading}
        />
      )}
    </div>
  );
};

export default BookedTableModal;
