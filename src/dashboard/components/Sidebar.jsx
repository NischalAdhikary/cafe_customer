import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Table,
  UtensilsCrossed,
  LogOut,
  Menu,
  User,
  X,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Listbox from "./Listbox";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const [activeItem, setActiveItem] = useState(null);
  const handleCLose = () => {
    toggleSidebar();
    setActiveItem(null);
  };
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-50",
      children: [
        {
          id: "add-order",
          label: "Add Order (POS)",
          path: "/dashboard/orders/add",
        },
        {
          id: "active-order",
          label: "Active Orders",
          path: "/dashboard/orders/active",
        },
        {
          id: "completed-order",
          label: "Completed Orders",
          path: "/dashboard/orders/completed",
        },
      ],
    },
    {
      id: "tables",
      label: "Tables",
      path: "/dashboard/tables",
      icon: Table,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "category",
      label: "Category",
      path: "/dashboard/category",
      icon: Menu,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      id: "fooditems",
      label: "Food Items",
      path: "/dashboard/fooditems",
      icon: UtensilsCrossed,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: "customers",
      label: "Customers",
      path: "/dashboard/customers",
      icon: User,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
  ];
  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div
      className={`h-full bg-white shadow-xl transition-all duration-300 ease-in-out border-r border-gray-200 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex relative items-center justify-center p-4 border-b border-gray-200">
        {isOpen && (
          <div className="flex items-center space-x-2">
            <div className="w-18 h-18  rounded-lg flex items-center justify-center">
              <img src="/cafelogo.png" />
            </div>
          </div>
        )}
        <button
          onClick={handleCLose}
          className={` rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
            isOpen ? "absolute right-4 top-4" : ""
          }`}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-gray-600" />
          ) : (
            <Menu className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      <nav
        className={`flex-1 flex flex-col items-center  ${isOpen ? "p-4" : ""} `}
      >
        <ul className="space-y-2 w-full">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isHovered = hoveredItem === item.id;
            const isActive = activeItem === item.id;

            return (
              <li key={item.id} className="w-full relative">
                <button
                  onClick={() =>
                    item.children
                      ? setActiveItem(isActive ? null : item.id)
                      : handleNavigation(item.path)
                  }
                  className={`w-full flex  px-4  py-2 rounded-lg ${
                    isHovered
                      ? `${item.bgColor} ${item.color}`
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div
                    className={`p-1 rounded-md ${isHovered ? "bg-white" : ""}`}
                  >
                    <Icon
                      className={`w-5 h-5 ${isHovered ? item.color : ""}`}
                    />
                  </div>
                  {isOpen && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.children && (
                        <ChevronRight
                          className={`w-4 h-4 transform transition-transform duration-200 ${
                            isActive ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </>
                  )}
                </button>

                {isActive &&
                  item.children &&
                  (isOpen ? (
                    <ul className="mt-2 space-y-2">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <button
                            onClick={() => handleNavigation(child.path)}
                            className="w-full flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                          >
                            <ChevronRight className="w-4 h-4" />
                            <span>{child.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Listbox
                      key={item.id}
                      item={item.children}
                      className={` top-0 left-20 z-50 w-50 `}
                      handleNavigation={handleNavigation}
                      closeListItem={() => setActiveItem(null)}
                    />
                  ))}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-gray-200 flex flex-col items-center p-4">
        <button
          className=" flex items-center justify-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 group"
          onMouseEnter={() => setHoveredItem("logout")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div
            className={`p-1  rounded-md ${
              hoveredItem === "logout" ? "bg-white" : ""
            }`}
          >
            <LogOut className="w-5 h-5" />
          </div>
          {isOpen && (
            <>
              <span className="font-medium flex-1 text-left">Logout</span>
              <ChevronRight
                className={`w-4 h-4 transition-transform duration-200 ${
                  hoveredItem === "logout" ? "translate-x-1" : ""
                }`}
              />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
