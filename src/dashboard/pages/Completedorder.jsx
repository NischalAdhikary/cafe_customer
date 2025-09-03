import React from "react";
import {
  useGetCompletedDineInOrdersQuery,
  useGetCompletedTakeAwayOrdersQuery,
} from "../../store/api/Order";
import { Completeddinein } from "./components/completedDinein";
import { Completedtakeaway } from "./components/completedTakeaway";
export default function Completedorder() {
  const [changeTab, setChangeTab] = React.useState("dinein");
  const { data: dineindata, isLoading: dineinloading } =
    useGetCompletedDineInOrdersQuery(undefined, {
      skip: changeTab !== "dinein",
    });
  const { data: takeawaydata, isLoading: takeawayloading } =
    useGetCompletedTakeAwayOrdersQuery(undefined, {
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

      <div className="bg-white p-6 h-auto">
        {changeTab === "dinein" ? (
          <div>
            <Completeddinein
              orderdata={dineindata?.data}
              loading={dineinloading}
            />
          </div>
        ) : (
          <div>
            <Completedtakeaway
              orderdata={takeawaydata?.data}
              loading={takeawayloading}
            />
          </div>
        )}
      </div>
    </div>
  );
}
