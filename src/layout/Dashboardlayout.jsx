import React, { useEffect, useState } from "react";
import Sidebar from "../dashboard/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function () {
  const [showSidebar, setShowSidebar] = useState(true);
  useEffect(() => {
    const MobileView = () => {
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", MobileView);
    return () => {
      window.removeEventListener("resize", MobileView);
    };
  }, []);
  const toggleSidebar = () => {
    if (window.innerWidth < 768) return;
    setShowSidebar(!showSidebar);
  };
  return (
    <div className="w-full h-screen relative">
      <div className="flex w-full h-full">
        <Sidebar isOpen={showSidebar} toggleSidebar={toggleSidebar} />
        <div className="w-full h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
