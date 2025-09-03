import React, { useState } from "react";
import {
  Edit,
  Trash2,
  Search,
  ChevronUp,
  ChevronDown,
  Loader,
} from "lucide-react";
import Pagination from "./pagination";

const DynamicTable = ({
  data = [],
  columns = [],
  onEdit,
  onDelete,
  searchable = true,
  sortable = true,
  title = "Dynamic Table",
  className = "",
  button,
  onButtonClick,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(1);
  const dataperpage = 8;
  const startIndex = (page - 1) * dataperpage;
  const endIndex = startIndex + dataperpage;

  const getNestedValue = (obj, key) => {
    return key.split(".").reduce((value, k) => value?.[k], obj);
  };

  const filteredData = searchable
    ? data.filter((item) =>
        columns.some((column) => {
          const value = getNestedValue(item, column.key);
          return value
            ?.toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        })
      )
    : data;

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);
  const currentData = sortedData.slice(startIndex, endIndex);

  const handleSort = (key) => {
    if (!sortable) return;

    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const renderCell = (item, column) => {
    const value = getNestedValue(item, column.key);

    if (column.render) {
      return column.render(value, item);
    }

    return value?.toString() || "-";
  };

  const getSortIcon = (columnKey) => {
    if (!sortable || sortConfig.key !== columnKey) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-1" />
    );
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
    >
      <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="text-sm opacity-90">
            {sortedData.length} {sortedData.length === 1 ? "item" : "items"}
          </div>
        </div>
      </div>

      {searchable && (
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="relative flex  gap-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={onButtonClick}
              className="bg-blue-600 px-4 whitespace-nowrap  text-white rounded  cursor-pointer"
            >
              {button || "Add New"}
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    sortable && column.sortable !== false
                      ? "cursor-pointer hover:bg-gray-100"
                      : ""
                  }`}
                  onClick={() =>
                    column.sortable !== false && handleSort(column.key)
                  }
                >
                  <div className="flex items-center">
                    {column.title}
                    {getSortIcon(column.key)}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  {searchTerm
                    ? "No results found for your search."
                    : "No data available."}
                </td>
              </tr>
            ) : (
              currentData.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {renderCell(item, column)}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-150"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {sortedData.length > 0 && (
        <div className="px-6 py-3 bg-gray-50 border-t flex justify-between">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {(page - 1) * dataperpage + 1} to{" "}
              {Math.min(page * dataperpage, sortedData.length)} of{" "}
              {sortedData.length}
            </span>
            {searchTerm && (
              <span>
                Filtered by: <span className="font-medium">"{searchTerm}"</span>
              </span>
            )}
          </div>
          <div className="flex items-center">
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(sortedData.length / dataperpage)}
              onPageChange={setPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ExampleUsage = ({
  title,

  data,
  columns,
  onEdit,
  onDelete,
  searchable,
  sortable,
  button,
  onButtonClick,
}) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="w-full mx-auto">
        <DynamicTable
          title={title}
          data={data}
          columns={columns}
          onEdit={onEdit}
          onDelete={onDelete}
          searchable={searchable}
          button={button}
          onButtonClick={onButtonClick}
          sortable={sortable}
          isLoading={false}
        />
      </div>
    </div>
  );
};

export default ExampleUsage;
