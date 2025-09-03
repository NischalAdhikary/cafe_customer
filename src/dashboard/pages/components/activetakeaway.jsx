// import React, { useState } from "react";
// import { Clock, User, MapPin, Loader, EllipsisVertical } from "lucide-react";
// import StatusModal from "./statusModal";
// import Listbox from "../../components/Listbox";
// import { useDispatch } from "react-redux";
// import {
//   setOrderMaster,
//   setOrderDetails,
// } from "../../../store/slice/Orderdetails";
// import AddExistingOrder from "./addexistingorder";
// import EditExistingOrder from "./editexistingOrder";
// const ACTIVE_TAKEAWAY = {
//   headerBg: "bg-orange-500",
//   headerText: "text-white",
//   badgeBg: "bg-white",
//   badgeText: "text-orange-500",
//   buttonBg: "bg-orange-500 hover:bg-orange-600",
//   buttonText: "text-white",
//   accent: "bg-orange-400",
//   borderColor: "border-orange-200",
// };

// export function Activetakeaway({ orderdata, loading }) {
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [OpenListBox, setOpenListBox] = useState(null);
//   const [OpenStatusModal, setOpenStatusModal] = useState(false);
//   const [OpenAddItemsModal, setAddItemsModal] = useState(false);

//   const [OpenEditItemsModal, setEditItemsModal] = useState(false);
//   const dispatch = useDispatch();

//   const listBoxItems = [
//     {
//       id: "add_items",
//       label: "Add Items",
//       onClick: () => {
//         setAddItemsModal(true);
//         setOpenListBox(false);
//       },
//     },
//     {
//       id: "edit_items",
//       label: "Edit Items",
//       onClick: () => {
//         setEditItemsModal(true);
//         setOpenListBox(false);
//       },
//     },
//   ];

//   const handleStatusChange = (order) => {
//     setSelectedOrderId(order.masterid);

//     setOpenStatusModal(true);
//   };
//   const handleCLickList = (item) => {
//     setOpenListBox(item.masterid);
//     dispatch(setOrderMaster(item.masterid));
//     dispatch(setOrderDetails(item.orderdetails));
//   };
//   const selectedOrder = orderdata?.find(
//     (order) => order.masterid === selectedOrderId
//   );
//   const formatTime = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleTimeString("en-US", {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   if (loading) {
//     return (
//       <div className="w-full h-[80vh] flex items-center justify-center">
//         <Loader className="animate-spin" size={32} />
//       </div>
//     );
//   }

//   const dineinOrders =
//     orderdata?.filter((order) => order.ordertype === "TAKEAWAY") || [];

//   if (dineinOrders.length === 0) {
//     return (
//       <div className="w-full h-[60vh] flex flex-col items-center justify-center text-gray-500">
//         <div className="text-6xl mb-4">🍽️</div>
//         <h3 className="text-lg font-medium mb-2">No Takeaway Orders</h3>
//         <p className="text-sm">All takeaway orders will appear here</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full h-auto">
//       <div className="flex flex-wrap gap-4">
//         {dineinOrders.map((item) => (
//           <div
//             key={item.masterid}
//             className="basis-[300px] h-auto min-h-[250px] flex-1 min-w-[300px] max-w-[450px] bg-white border border-gray-200 rounded-lg shadow-sm"
//           >
//             <div
//               className={`${ACTIVE_TAKEAWAY.headerBg}
//  p-4 rounded-t-lg border-b ${ACTIVE_TAKEAWAY.borderColor}`}
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <span
//                   className={`text-xs font-medium ${ACTIVE_TAKEAWAY.badgeText} ${ACTIVE_TAKEAWAY.badgeBg}  px-2 py-1 rounded-full`}
//                 >
//                   {item.ordertype}
//                 </span>
//                 <span
//                   className={`text-xs  flex items-center gap-1 ${ACTIVE_TAKEAWAY.headerText}`}
//                 >
//                   <Clock size={12} />
//                   {formatTime(item.createdat)}
//                 </span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div
//                   className={`${ACTIVE_TAKEAWAY.headerText} ${ACTIVE_TAKEAWAY.headerBg} flex items-center gap-1 text-sm `}
//                 >
//                   <User size={14} />
//                   {item.user?.name || "Unknown User"}
//                 </div>

//                 <div
//                   className={` flex items-center gap-1 text-sm ${ACTIVE_TAKEAWAY.headerText}`}
//                 >
//                   <MapPin size={14} />
//                   {item.user?.phone || "Unknown Table"}
//                 </div>
//               </div>
//             </div>

//             <div className="p-4 space-y-4   ">
//               <div className="flex relative justify-between">
//                 <h4 className="text-sm font-medium text-gray-900 mb-3">
//                   Order Items:
//                 </h4>
//                 <div
//                   onClick={() => handleCLickList(item)}
//                   className="cursor-pointer rounded-full relative hover:bg-gray-200 w-7 h-7 flex items-center justify-center p-1 "
//                 >
//                   <EllipsisVertical size={18} />
//                 </div>
//                 {OpenListBox === item.masterid && (
//                   <Listbox
//                     className={"right-0 top-10"}
//                     item={listBoxItems}
//                     closeListItem={() => setOpenListBox(false)}
//                   />
//                 )}
//               </div>
//               <ul className="space-y-2 mb-4">
//                 {(() => {
//                   const groupedItems = {};

//                   item.orderdetails?.forEach((orderItem) => {
//                     const foodName =
//                       orderItem.fooditems?.foodname || "Unknown Item";
//                     const quantity = orderItem.quantity || 1;

//                     if (groupedItems[foodName]) {
//                       groupedItems[foodName] += quantity;
//                     } else {
//                       groupedItems[foodName] = quantity;
//                     }
//                   });

//                   return Object.entries(groupedItems).length > 0
//                     ? Object.entries(groupedItems).map(
//                         ([foodName, totalQuantity], index) => (
//                           <li
//                             key={`${foodName}-${index}`}
//                             className="flex justify-between items-center text-sm"
//                           >
//                             <span className="flex items-center gap-2">
//                               <span
//                                 className={`w-1.5 h-1.5 rounded-full ${ACTIVE_TAKEAWAY.accent}`}
//                               ></span>
//                               {foodName}
//                             </span>
//                             <span className="text-gray-600 font-medium">
//                               x{totalQuantity}
//                             </span>
//                           </li>
//                         )
//                       )
//                     : [
//                         <li
//                           key="no-items"
//                           className="text-sm text-gray-500 italic"
//                         >
//                           No items found
//                         </li>,
//                       ];
//                 })()}
//               </ul>

//               <div className="flex items-center justify-between mb-3">
//                 <span className="text-xs text-gray-500">Status:</span>
//                 <span
//                   className={`text-xs px-2 py-1 rounded-full font-medium ${
//                     item.orderstatus === "pending"
//                       ? "bg-yellow-100 text-yellow-700"
//                       : item.orderstatus === "process"
//                       ? "bg-blue-100 text-blue-700"
//                       : item.orderstatus === "completed"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-gray-100 text-gray-700"
//                   }`}
//                 >
//                   {item.orderstatus || "Unknown"}
//                 </span>
//               </div>

//               <button
//                 onClick={() => handleStatusChange(item)}
//                 className={`w-full ${ACTIVE_TAKEAWAY.buttonBg} ${ACTIVE_TAKEAWAY.buttonText} py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200`}
//               >
//                 Change Status
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       {OpenStatusModal && (
//         <StatusModal
//           orderdata={selectedOrder}
//           onClose={() => {
//             setSelectedOrderId(null);
//             setOpenStatusModal(false);
//           }}
//         />
//       )}
//       {OpenAddItemsModal && (
//         <AddExistingOrder onClose={() => setAddItemsModal(false)} />
//       )}
//       {OpenEditItemsModal && (
//         <EditExistingOrder onClose={() => setEditItemsModal(false)} />
//       )}
//     </div>
//   );
// }
import React, { useState } from "react";
import { Clock, User, MapPin, Loader, EllipsisVertical } from "lucide-react";
import StatusModal from "./statusModal";
import Listbox from "../../components/Listbox";
import { useDispatch } from "react-redux";
import {
  setOrderMaster,
  setOrderDetails,
} from "../../../store/slice/Orderdetails";
import AddExistingOrder from "./addexistingorder";
import EditExistingOrder from "./editexistingOrder";

const ACTIVE_TAKEAWAY = {
  headerBg: "bg-orange-500",
  headerText: "text-white",
  badgeBg: "bg-white",
  badgeText: "text-orange-500",
  buttonBg: "bg-orange-500 hover:bg-orange-600",
  buttonText: "text-white",
  accent: "bg-orange-400",
  borderColor: "border-orange-200",
};

export function Activetakeaway({ orderdata, loading }) {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [OpenListBox, setOpenListBox] = useState(null);
  const [OpenStatusModal, setOpenStatusModal] = useState(false);
  const [OpenAddItemsModal, setAddItemsModal] = useState(false);
  const [OpenEditItemsModal, setEditItemsModal] = useState(false);
  const [currentOrderItem, setCurrentOrderItem] = useState(null);

  const dispatch = useDispatch();

  const handleAddItems = (orderItem) => {
    console.log("Order master Check", orderItem.masterid);
    dispatch(setOrderMaster(orderItem.masterid));
    dispatch(setOrderDetails(orderItem.orderdetails));
    setCurrentOrderItem(orderItem);
    setAddItemsModal(true);
    setOpenListBox(false);
  };

  const handleEditItems = (orderItem) => {
    const pendingItems =
      orderItem.orderdetails?.filter(
        (item) => item.orderstatus === "pending"
      ) || [];

    dispatch(setOrderMaster(orderItem));
    dispatch(setOrderDetails(pendingItems));
    setCurrentOrderItem(orderItem);
    setEditItemsModal(true);
    setOpenListBox(false);
  };

  const listBoxItems = [
    {
      id: "add_items",
      label: "Add Items",
      onClick: () => handleAddItems(currentOrderItem),
    },
    {
      id: "edit_items",
      label: "Edit Items",
      onClick: () => handleEditItems(currentOrderItem),
    },
  ];

  const handleStatusChange = (order) => {
    setSelectedOrderId(order.masterid);
    setOpenStatusModal(true);
  };

  const handleClickList = (item) => {
    setCurrentOrderItem(item);
    setOpenListBox(item.masterid);
  };

  const selectedOrder = orderdata?.find(
    (order) => order.masterid === selectedOrderId
  );

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
        <h3 className="text-lg font-medium mb-2">No Takeaway Orders</h3>
        <p className="text-sm">All takeaway orders will appear here</p>
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
              className={`${ACTIVE_TAKEAWAY.headerBg} p-4 rounded-t-lg border-b ${ACTIVE_TAKEAWAY.borderColor}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-medium ${ACTIVE_TAKEAWAY.badgeText} ${ACTIVE_TAKEAWAY.badgeBg} px-2 py-1 rounded-full`}
                >
                  {item.ordertype}
                </span>
                <span
                  className={`text-xs flex items-center gap-1 ${ACTIVE_TAKEAWAY.headerText}`}
                >
                  <Clock size={12} />
                  {formatTime(item.createdat)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`${ACTIVE_TAKEAWAY.headerText} ${ACTIVE_TAKEAWAY.headerBg} flex items-center gap-1 text-sm`}
                >
                  <User size={14} />
                  {item.user?.name || "Unknown User"}
                </div>

                <div
                  className={`flex items-center gap-1 text-sm ${ACTIVE_TAKEAWAY.headerText}`}
                >
                  <MapPin size={14} />
                  {item.user?.phone || "Unknown Table"}
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex relative justify-between">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Order Items:
                </h4>
                <div
                  onClick={() => handleClickList(item)}
                  className="cursor-pointer rounded-full relative hover:bg-gray-200 w-7 h-7 flex items-center justify-center p-1"
                >
                  <EllipsisVertical size={18} />
                </div>
                {OpenListBox === item.masterid && (
                  <Listbox
                    className={"right-0 top-10"}
                    item={listBoxItems}
                    closeListItem={() => setOpenListBox(false)}
                  />
                )}
              </div>

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
                            <span className="flex items-center gap-2">
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${ACTIVE_TAKEAWAY.accent}`}
                              ></span>
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
                <span className="text-xs text-gray-500">Items by Status:</span>
                <div className="flex gap-1">
                  {(() => {
                    const statusCounts = {
                      pending: 0,
                      process: 0,
                      completed: 0,
                    };

                    item.orderdetails?.forEach((orderItem) => {
                      const status = orderItem.orderstatus || "pending";
                      if (statusCounts[status] !== undefined) {
                        statusCounts[status]++;
                      }
                    });

                    return Object.entries(statusCounts).map(
                      ([status, count]) =>
                        count > 0 && (
                          <span
                            key={status}
                            className={`text-xs px-1.5 py-0.5 rounded text-[10px] font-medium ${
                              status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : status === "process"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {status}: {count}
                          </span>
                        )
                    );
                  })()}
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500">Overall Status:</span>
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
                className={`w-full ${ACTIVE_TAKEAWAY.buttonBg} ${ACTIVE_TAKEAWAY.buttonText} py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200`}
              >
                Change Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {OpenStatusModal && (
        <StatusModal
          orderdata={selectedOrder}
          onClose={() => {
            setSelectedOrderId(null);
            setOpenStatusModal(false);
          }}
        />
      )}

      {OpenAddItemsModal && (
        <AddExistingOrder
          onClose={() => {
            setAddItemsModal(false);
            setCurrentOrderItem(null);
          }}
        />
      )}

      {OpenEditItemsModal && (
        <EditExistingOrder
          onClose={() => {
            setEditItemsModal(false);
            setCurrentOrderItem(null);
          }}
        />
      )}
    </div>
  );
}
