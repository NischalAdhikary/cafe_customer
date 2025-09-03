import React from "react";
import AdminFoodAdd from "./components/adminfoodadd";
import Poscheckout from "./components/poscheckout";

export default function Pos() {
  return (
    <div className="w-full h-auto md:h-screen flex md:flex-row flex-col gap-2 ">
      <div className="bg-white w-full md:w-1/3 md:max-w-1/3 h-full">
        <Poscheckout />
      </div>
      <div className="overflow-y-auto w-full ">
        <div className=" flex-1 p-4">
          <AdminFoodAdd />
        </div>
      </div>
    </div>
  );
}
