import React from "react";
import { Clock, User, MapPin, Loader, Check, Phone } from "lucide-react";

const COMPLETED_TAKEAWAY = {
  headerBg: "bg-purple-600",
  headerText: "text-white",
  badgeBg: "bg-white",
  badgeText: "text-purple-600",
  buttonBg: "bg-purple-500 hover:bg-purple-600",
  buttonText: "text-white",
  accent: "bg-purple-400",
  borderColor: "border-purple-200",
};

export function Completedtakeaway({ orderdata, loading }) {
  console.log("Completed takeaway order", orderdata);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [OpenPaymentModal, setOpenPaymentModal] = React.useState(false);

  const handleStatusChange = (order) => {
    setSelectedOrder(order);
    setOpenStatusModal(true);
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  const dineinOrders =
    orderdata?.filter((order) => order.ordertype === "TAKEAWAY") || [];

  if (dineinOrders.length === 0) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center text-gray-500">
        <div className="text-6xl mb-4">🍽️</div>
        <h3 className="text-lg font-medium mb-2">No Dine-in Orders</h3>
        <p className="text-sm">All dine-in orders will appear here</p>
      </div>
    );
  }

  return (
    <div className="w-full h-auto">
      <div className="flex flex-wrap gap-4">
        {dineinOrders.map((item) => (
          <div
            key={item.masterid}
            className="basis-[300px] h-auto min-h-[250px] flex-1 min-w-[300px] max-w-[450px] bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <div
              className={`${COMPLETED_TAKEAWAY.headerBg} ${COMPLETED_TAKEAWAY.headerText} p-4 rounded-t-lg border-b`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-medium  px-2 py-1 rounded-full ${COMPLETED_TAKEAWAY.badgeBg} ${COMPLETED_TAKEAWAY.badgeText}`}
                >
                  {item.ordertype}
                </span>
                <span className="text-xs text-white flex items-center gap-1">
                  <Clock size={12} />
                  {formatTime(item.createdat)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-white">
                  <User size={14} />
                  {item.user?.name || "Unknown User"}
                </div>

                <div className="flex items-center gap-1 text-sm text-white *:">
                  <Phone size={14} />
                  {item.user?.phone || "Unknown Number"}
                </div>
              </div>
            </div>

            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Order Items:
              </h4>
              <ul className="space-y-2 mb-4">
                {(() => {
                  const groupedItems = {};

                  item.orderdetails?.forEach((orderItem) => {
                    const foodName =
                      orderItem.fooditems?.foodname || "Unknown Item";
                    const quantity = orderItem.quantity || 1;

                    if (groupedItems[foodName]) {
                      groupedItems[foodName] += quantity;
                    } else {
                      groupedItems[foodName] = quantity;
                    }
                  });

                  return Object.entries(groupedItems).length > 0
                    ? Object.entries(groupedItems).map(
                        ([foodName, totalQuantity], index) => (
                          <li
                            key={`${foodName}-${index}`}
                            className="flex justify-between items-center text-sm"
                          >
                            <span className="flex items-center gap-6">
                              <span className="w-1.5 h-1.5  rounded-full">
                                <Check size={14} />
                              </span>
                              {foodName}
                            </span>
                            <span className="text-gray-600 font-medium">
                              x{totalQuantity}
                            </span>
                          </li>
                        )
                      )
                    : [
                        <li
                          key="no-items"
                          className="text-sm text-gray-500 italic"
                        >
                          No items found
                        </li>,
                      ];
                })()}
              </ul>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500">Status:</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    item.orderstatus === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : item.orderstatus === "process"
                      ? "bg-blue-100 text-blue-700"
                      : item.orderstatus === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.orderstatus || "Unknown"}
                </span>
              </div>

              <button
                onClick={() => handleStatusChange(item)}
                className={`w-full ${COMPLETED_TAKEAWAY.buttonBg} ${COMPLETED_TAKEAWAY.buttonText} py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200`}
              >
                Pay
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
