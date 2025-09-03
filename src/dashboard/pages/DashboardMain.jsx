import React from "react";
import { useSelector } from "react-redux";
import TableManagementUI from "../components/tableadmin";
export default function DashboardMain() {
  const user = useSelector((state) => state.authUser.user);
  return (
    <div className="w-full h-full relative">
      <div className="w-full p-2 h-16  flex  items-center">
        <h1 className="text-2xl font-semibold">
          Welcome to Dashboard{" ,"} <span>{user.name}</span>{" "}
        </h1>
      </div>
      <TableManagementUI />
    </div>
  );
}
