import React from "react";

import {
  useGetActiveDineInOrdersQuery,
  useGetActiveTakeAwayOrdersQuery,
} from "../../store/api/Order";
import { Activedinein } from "./components/activedinein";
import { Activetakeaway } from "./components/activetakeaway";

export default function Activeorder() {
  const [changeTab, setChangeTab] = React.useState("dinein");
  const {
    data: dineindata,
    isLoading: dineinloading,
    refetch,
  } = useGetActiveDineInOrdersQuery(undefined, {
    skip: changeTab !== "dinein",
  });
  const { data: takeawaydata, isLoading: takeawayloading } =
    useGetActiveTakeAwayOrdersQuery(undefined, {
      skip: changeTab !== "takeaway",
    });

  return (
    <div className="w-full h-full p-6">
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6 max-w-md">
        <button
          onClick={() => setChangeTab("dinein")}
          className={`flex-1 px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
            changeTab === "dinein"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          Dine In
        </button>
        <button
          onClick={() => setChangeTab("takeaway")}
          className={`flex-1 px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
            changeTab === "takeaway"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          Takeaway
        </button>
      </div>

      <div className="bg-white rounded-lg   w-full  h-auto">
        {changeTab === "dinein" ? (
          <div>
            <Activedinein
              loading={dineinloading}
              orderdata={dineindata?.data}
              refetch={refetch}
            />
          </div>
        ) : (
          <div>
            <Activetakeaway
              loading={takeawayloading}
              orderdata={takeawaydata?.data}
            />
          </div>
        )}
      </div>
    </div>
  );
}
