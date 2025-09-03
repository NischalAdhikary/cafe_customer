import React, { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle,
  Receipt,
  ChefHat,
  Utensils,
  AlertCircle,
  Eye,
  X,
  Calendar,
  Hash,
  MapPin,
  Plus,
  Minus,
  Trash2,
  AlertTriangle,
  Edit3,
  Loader2,
} from "lucide-react";
import {
  useCancelOrderDetailsMutation,
  useCancelOrderMasterMutation,
  useGetCreatedOrderQuery,
} from "../store/api/Order";
import { toast } from "react-toastify";

export default function EnhancedOrderManagementUI() {
  const { data, isLoading, error, isError, refetch } =
    useGetCreatedOrderQuery();
  const [cancelOrderMaster, { isLoading: cancelLoading }] =
    useCancelOrderMasterMutation();
  const [cancelOrderDetails, { isLoading: cancelDetailsLoading }] =
    useCancelOrderDetailsMutation();
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [masterid, setMasterOrderId] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [orderDetailIds, setOrderDetailsId] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (data) {
      setOrderData(data);
      setMasterOrderId(data?.data?.masterid);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-gray-50 min-h-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <Receipt className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Loading Order Status</h1>
                <p className="text-blue-100 text-sm">Please wait...</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-4 w-8 bg-gray-200 rounded animate-pulse mb-1"></div>
                      <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 flex-1 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-t border-blue-200 px-6 py-4">
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-blue-200 rounded animate-pulse"></div>
              <div>
                <div className="h-4 w-32 bg-blue-200 rounded animate-pulse mb-1"></div>
                <div className="h-3 w-48 bg-blue-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || error) {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-gray-50 min-h-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 text-white">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Error Loading Order</h1>
                <p className="text-red-100 text-sm">Something went wrong</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Failed to Load Order
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {error?.message ||
                  error?.data?.message ||
                  "Unable to fetch your order information. Please try again."}
              </p>
              <button
                onClick={() => refetch()}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Try Again
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Troubleshooting Tips
                  </h3>
                  <p className="text-sm text-gray-600">
                    Check your internet connection and try refreshing the page.
                    If the problem persists, please contact support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.data) {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-gray-50 min-h-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-400 to-gray-500 px-6 py-4 text-white">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <Receipt className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">No Active Order</h1>
                <p className="text-gray-100 text-sm">
                  Start by adding items to your order
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                No Order Found
              </h2>
              <p className="text-gray-600 text-sm">
                You don't have any active orders at the moment. Browse our menu
                to start ordering delicious food.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <ChefHat className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">
                    Ready to Order?
                  </h3>
                  <p className="text-sm text-blue-700">
                    Browse our menu and add your favorite items to create a new
                    order.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">How to Get Started</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">1</span>
                  </div>
                  <span className="text-sm text-gray-700">
                    Book a table by scanning QR code or just add menu items for
                    takeaway.
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <span className="text-sm text-gray-700">
                    Browse menu and select items
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <span className="text-sm text-gray-700">
                    Place your order and enjoy!
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => refetch()}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>

          <div className="bg-amber-50 border-t border-amber-200 px-6 py-4">
            <div className="flex items-start space-x-2">
              <span className="text-amber-600 text-lg">ℹ️</span>
              <div>
                <p className="text-sm font-medium text-amber-800">Need Help?</p>
                <p className="text-xs text-amber-700 mt-1">
                  Ask any staff member to help you get started with ordering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data.data.orderdetails || data.data.orderdetails.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-gray-50 min-h-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-4 text-white">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <Receipt className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Order Empty</h1>
                <p className="text-orange-100 text-sm">
                  All items have been removed
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-10 h-10 text-orange-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Your Order is Empty
              </h2>
              <p className="text-gray-600 text-sm">
                All items have been removed from your order. Add some delicious
                items to continue.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Utensils className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-900 mb-1">
                    Add Some Items
                  </h3>
                  <p className="text-sm text-green-700">
                    Browse our menu to add items to your order and continue with
                    your meal.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => refetch()}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors"
            >
              Browse Menu
            </button>
          </div>

          <div className="bg-blue-50 border-t border-blue-200 px-6 py-4">
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 text-lg">💡</span>
              <div>
                <p className="text-sm font-medium text-blue-800">Quick Tip</p>
                <p className="text-xs text-blue-700 mt-1">
                  You can always add more items to your order until it's
                  confirmed by the kitchen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const displayData = orderData || data;
 

  console.log("hello from", displayData);

  const canEdit = (orderstatus) => {
    if (orderstatus === "pending") {
      return true;
    }
    return false;
  };

  const totalItems = displayData.data.orderdetails.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );
  console.log(displayData.data.orderdetails);
  const totalitems = displayData.data.orderdetails.filter(
    (item) =>
      item.orderstatus === "pending" ||
      item.orderstatus === "process" ||
      item.orderstatus === "delivered"
  );
  console.log("totalitems for user", totalitems);
  const totalAmount = totalitems.reduce(
    (sum, item) => sum + (item.total || 0),
    0
  );

  const handlefinaledit = async () => {
    if (isEditing && orderDetailIds.length > 0) {
      console.log("called");
      try {
        await cancelOrderDetails({ orderDetailIds, masterid }).unwrap();
        setOrderDetailsId([]);
        toast.success("Order Cancelled Successfully");
      } catch (e) {
        toast.error(e?.data?.message);
      }
    }

    setIsEditing((prev) => !prev);
  };

  const offEditMode = () => {
    setIsEditing(false);
    setOrderDetailsId([]);
    setOrderData(data);
    setShowOrderDetails(false);
  };
  const removeItem = (orderDetailId) => {
    setOrderData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        orderdetails: prevData.data.orderdetails.filter(
          (item) => item.orderdetailid !== orderDetailId
        ),
      },
    }));

    setOrderDetailsId((previd) => [...previd, orderDetailId]);
  };

  const cancelOrder = async () => {
    try {
      await cancelOrderMaster().unwrap();
      toast.success("Order Cancelled Successfully");
      setShowCancelConfirm(false);
      setIsEditing(false);
    } catch (e) {
      console.log(e.data.message);
      toast.error(e?.data?.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800 border-gray-200";

    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "preparing":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    if (!status) return <AlertCircle className="w-4 h-4" />;

    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "preparing":
        return <ChefHat className="w-4 h-4" />;
      case "ready":
      case "delivered":
        return <Utensils className="w-4 h-4" />;
      case "cancelled":
        return <X className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const isStatusCompleted = (targetStatus, currentStatus) => {
    if (!currentStatus) return false;

    const statusOrder = [
      "pending",
      "confirmed",
      "preparing",
      "ready",
      "delivered",
    ];
    const currentIndex = statusOrder.indexOf(currentStatus.toLowerCase());
    const targetIndex = statusOrder.indexOf(targetStatus.toLowerCase());
    return currentIndex >= targetIndex;
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-gray-50 min-h-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Receipt className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Your Order</h1>
                <p className="text-blue-100 text-sm">
                  {displayData.data.orderstatus === "cancelled"
                    ? "Order cancelled"
                    : "Order placed successfully"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowOrderDetails(true)}
                className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                displayData.data.orderstatus
              )}`}
            >
              {getStatusIcon(displayData.data.orderstatus)}
              <span className="ml-1 capitalize">
                {displayData.data.orderstatus || "Unknown"}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {formatTime(displayData.data.createdat)}
            </span>
          </div>
        </div>

        {isEditing && canEdit && (
          <div className="bg-orange-50 border-b border-orange-200 px-6 py-3">
            <div className="flex items-center space-x-2">
              <Edit3 className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">
                Edit Mode Active
              </span>
              <span className="text-xs text-orange-600">
                • Modify quantities or remove items
              </span>
            </div>
          </div>
        )}

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Order Summary
            </h2>
            <span className="text-sm text-gray-500">
              #{displayData.data.masterid || "N/A"}
            </span>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Ordertype</span>
              <span className="text-sm font-medium">
                {displayData.data.ordertype || "N/A"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Items</span>
              <span className="font-medium">{totalItems} items</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Order Total</span>
              <span className="font-bold text-lg text-green-600">
                Rs.{totalAmount}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Ordered At</span>
              <span className="text-sm font-medium">
                {formatDate(displayData.data.createdat)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Items Ordered</h3>
            <div className="space-y-2">
              {displayData.data.orderdetails.slice(0, 3).map((item) => (
                <div
                  key={item.orderdetailid}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1 flex  gap-2">
                    <h4 className="font-medium text-sm text-gray-900">
                      {item.fooditems.foodname}
                    </h4>
                    <span className="text-xs text-gray-500">
                      x{item.quantity}
                    </span>
                  </div>
                  <div className="flex flex-col items-center space-x-2">
                    <span className="text-sm font-medium">Rs.{item.total}</span>
                    <span className="text-xs text-gray-500 font-medium">
                      {item.orderstatus}
                    </span>
                  </div>
                  {/* <div className="flex items-center space-x-3">
                    {isEditing && canEdit(item.orderstatus) ? (
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm min-w-[20px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => removeItem(item.orderdetailid)}
                          className="w-6 h-6 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center ml-2"
                        >
                          <Trash2 className="w-3 h-3 text-red-600" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-right">
                        <p className="text-sm font-medium">×{item.quantity}</p>
                        <p className="text-xs text-gray-500">{item.total}</p>
                      </div>
                    )}
                  </div> */}
                </div>
              ))}
              {displayData.data.orderdetails.length > 3 && (
                <button
                  onClick={() => setShowOrderDetails(true)}
                  className="w-full p-3 bg-blue-50 text-blue-600 rounded-lg font-medium text-sm hover:bg-blue-100 transition-colors"
                >
                  View All {displayData.data.orderdetails.length} Items
                </button>
              )}
            </div>
          </div>

          {/* {canEdit && (
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium"
              >
                <X className="w-4 h-4" />
                <span>Cancel Entire Order</span>
              </button>
            </div>
          )} */}
        </div>

        {/* <div
          className={`border-t px-6 py-4 ${
            displayData.data.orderstatus === "cancelled"
              ? "bg-red-50 border-red-200"
              : "bg-blue-50 border-blue-200"
          }`}
        > */}
        {/* <div className="flex items-start space-x-2">
            <span className="text-lg">
              {displayData.data.orderstatus === "cancelled" ? "❌" : "💡"}
            </span>
            <div>
              <p
                className={`text-sm font-medium ${
                  displayData.data.orderstatus === "cancelled"
                    ? "text-red-800"
                    : "text-blue-800"
                }`}
              >
                {displayData.data.orderstatus === "cancelled"
                  ? "Order Cancelled"
                  : canEdit
                  ? "Order Editable"
                  : "Order Tracking"}
              </p>
              <p
                className={`text-xs mt-1 ${
                  displayData.data.orderstatus === "cancelled"
                    ? "text-red-700"
                    : "text-blue-700"
                }`}
              >
                {displayData.data.orderstatus === "cancelled"
                  ? "Your order has been cancelled. No charges will apply."
                  : canEdit
                  ? "You can still modify or cancel this order until it's confirmed."
                  : "You'll be notified when your order status changes. Estimated time: 15-20 minutes."}
              </p>
            </div>
          </div> */}
        {/* </div> */}
      </div>

      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-sm">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Cancel Order?
                  </h3>
                  <p className="text-sm text-gray-600">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-6">
                Are you sure you want to cancel your entire order? All items
                will be removed and no charges will apply.
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Keep Order
                </button>
                <button
                  onClick={cancelOrder}
                  disabled={cancelLoading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
                >
                  {cancelLoading ? "Cancelling..." : "Cancel Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showOrderDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Order Details</h3>
              <button
                onClick={offEditMode}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="p-6 space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Order ID:</span>
                    <span className="text-sm font-mono">
                      {displayData.data.masterid}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Placed:</span>
                    <span className="text-sm">
                      {formatDate(displayData.data.createdat)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Table:</span>
                    <span className="text-sm">
                      {displayData.data.tables?.tablename || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">All Items</h4>
                  {displayData.data.orderdetails.map((item) => (
                    <div
                      key={item.orderdetailid}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">
                            {item.fooditems.foodname}
                          </h5>

                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mt-2">
                            {item.orderstatus}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 ml-4">
                          {isEditing && canEdit(item.orderstatus) ? (
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm min-w-[20px] text-center">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() => removeItem(item.orderdetailid)}
                                className="w-7 h-7 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center ml-1"
                              >
                                <Trash2 className="w-3 h-3 text-red-600" />
                              </button>
                            </div>
                          ) : (
                            <div className="text-right">
                              <p className="font-bold text-gray-900">
                                Rs.{item.total}
                              </p>
                              <p className="text-sm text-gray-500">
                                Rs.{item.price} × {item.quantity}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
                        Added: {formatTime(item.createdat)}
                        {item.updatedat !== item.createdat && (
                          <span className="ml-2">
                            • Modified: {formatTime(item.updatedat)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-green-800">
                      Total Amount
                    </span>
                    <span className="font-bold text-xl text-green-800">
                      Rs.{totalAmount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-green-600">Total Items</span>
                    <span className="text-sm font-medium text-green-600">
                      {totalItems} items
                    </span>
                  </div>
                </div>
                {/* 
                {canEdit && (
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={handlefinaledit}
                      className={`w-full flex items-center justify-center space-x-2 p-3 rounded-lg transition-colors font-medium ${
                        isEditing
                          ? "bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200"
                          : "bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100"
                      }`}
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>{isEditing ? "Done Editing" : "Edit Items"}</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowOrderDetails(false);
                        setShowCancelConfirm(true);
                      }}
                      className="w-full flex items-center justify-center space-x-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel Entire Order</span>
                    </button>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
