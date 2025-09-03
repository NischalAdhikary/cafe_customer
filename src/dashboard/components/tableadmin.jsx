import React, { useEffect, useState } from "react";
import { Users, Clock, CheckCircle, XCircle } from "lucide-react";
import { useGetAllTablesQuery } from "../../store/api/Table";
import { useSelector, useDispatch } from "react-redux";
import { setTable } from "../../store/slice/Table";
import TableManagementSkeleton from "./admintableskeleton";
import BookedTableModal from "../pages/components/Tablemodal";
import { toast } from "react-toastify";
import Listbox from "./Listbox";
import { useNavigate } from "react-router-dom";
const TableManagementUI = () => {
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState(null);
  const [bookDineInTable, setBookDineInTable] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [openListBox, setOpenListBox] = useState(null);
  const ListItems = [
    {
      id: "book",
      label: "Book",
      path: "/dashboard/orders/add",
    },
    {
      id: "sell",
      label: "Show Sell",
      path: "/dashboard/orders/sell",
    },
  ];
  const handleNavigation = (path) => {
    navigate(path, { state: { tabledata: openListBox, type: "dine-in" } });
  };

  const { data, isLoading, isError } = useGetAllTablesQuery(undefined, {
    pollingInterval: 5000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.data) {
      dispatch(setTable(data?.data));
    }
  }, [data]);

  const table = useSelector((state) => state.table.table);

  if (isLoading) return <TableManagementSkeleton />;
  if (isError) return <div>Error</div>;

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 border-green-400 text-green-800 hover:bg-green-200";
      case "occupied":
        return "bg-yellow-100 border-yellow-400 text-yellow-800 hover:bg-yellow-200";
      case "inactive":
        return "bg-red-100 border-red-400 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 border-gray-400 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-5 h-5" />;
      case "occupied":
        return <Clock className="w-5 h-5" />;
      case "inactive":
        return <XCircle className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  const handleTableClick = async (clickedTable) => {
    console.log("clicked table", clickedTable);
    if (clickedTable.status.toLowerCase() === "occupied") {
      setSelectedTable(clickedTable);

      setIsModalOpen(true);
    } else {
      switch (clickedTable.status.toLowerCase()) {
        case "active":
          setOpenListBox(clickedTable.tableid);

          break;
        case "inactive":
          toast.warning(
            `Table ${clickedTable.tablename} is currently unavailable`
          );
          break;
      }
    }
  };

  const getStatusCounts = () => {
    return table.reduce((acc, table) => {
      acc[table.status.toLowerCase()] =
        (acc[table.status.toLowerCase()] || 0) + 1;
      return acc;
    }, {});
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full space-y-6 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Table Management
          </h1>
          <p className="text-gray-600">
            Monitor and manage restaurant table status
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Tables
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {table?.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {statusCounts.active || 0}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Occupied</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {statusCounts.occupied || 0}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-red-600">
                  {statusCounts.inactive || 0}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Tables Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {table?.map((table) => (
              <div
                key={table.tableid}
                onClick={() => handleTableClick(table)}
                className={`
                  relative p-4  rounded-lg border-2 cursor-pointer transition-all duration-200 transform  shadow-sm
                  ${getStatusColor(table.status.toLowerCase())}
                `}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center justify-center">
                    {getStatusIcon(table.status.toLowerCase())}
                  </div>

                  <div className="text-center">
                    <h3 className="font-bold text-lg">{table.tablename}</h3>
                  </div>

                  <div className="absolute -top-2 -right-2">
                    <span
                      className={`
                      inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                      ${
                        table.status === "active"
                          ? "bg-green-500 text-white"
                          : ""
                      }
                      ${
                        table.status === "occupied"
                          ? "bg-yellow-500 text-white"
                          : ""
                      }
                      ${
                        table.status === "inactive"
                          ? "bg-red-500 text-white"
                          : ""
                      }
                    `}
                    >
                      {table.status.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  {openListBox === table.tableid && (
                    <Listbox
                      className={"absolute top-10 right-0 z-50"}
                      item={ListItems}
                      handleNavigation={handleNavigation}
                      closeListItem={() => setOpenListBox(null)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Status Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <span className="font-medium text-green-800">Active</span>
                <p className="text-sm text-green-600">
                  Table is available and ready
                </p>
                <p className="text-xs text-green-500">
                  Count: {statusCounts.active || 0}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <Clock className="w-6 h-6 text-yellow-600" />
              <div>
                <span className="font-medium text-yellow-800">Occupied</span>
                <p className="text-sm text-yellow-600">
                  Table is currently in use
                </p>
                <p className="text-xs text-yellow-500">
                  Count: {statusCounts.occupied || 0}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <XCircle className="w-6 h-6 text-red-600" />
              <div>
                <span className="font-medium text-red-800">Inactive</span>
                <p className="text-sm text-red-600">Table is not available</p>
                <p className="text-xs text-red-500">
                  Count: {statusCounts.inactive || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <BookedTableModal
          isOpen={isModalOpen}
          table={selectedTable}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TableManagementUI;
