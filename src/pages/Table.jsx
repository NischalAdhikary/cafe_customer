import React, { useState } from "react";
import {
  MoreVertical,
  X,
  QrCode,
  Users,
  Clock,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  useGetbookedtableQuery,
  useUnBookTableMutation,
} from "../store/api/Table";
import { setOrdertype } from "../store/slice/Ordertype";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { editTablestatus } from "../store/slice/Table";
export default function QRTableBookingUI() {
  const [unBookTable] = useUnBookTableMutation();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { data, isLoading } = useGetbookedtableQuery();
  const tablesfromstore = useSelector((state) => state.table.table);
  const handleCancel = async (table) => {
    try {
      await unBookTable().unwrap();
      dispatch(setOrdertype("takeaway"));
      console.log("current redux state", tablesfromstore);
      dispatch(editTablestatus({ tableid: table.tableid, status: "active" }));
      toast.success("Table Unbooked Successfully");

      setShowCancelModal(false);
      setShowMenu(false);
    } catch (e) {
      toast.error(e?.data?.message);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-gray-50 min-h-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 px-6 py-4 text-white">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Loading Table Status</h1>
                <p className="text-green-100 text-sm">Please wait...</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="text-center mb-4">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
              <div className="h-6 bg-gray-200 rounded-md animate-pulse mb-2"></div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 flex-1 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.data) {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-gray-50 min-h-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-400 to-gray-500 px-6 py-4 text-white">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">No Table Booking</h1>
                <p className="text-gray-100 text-sm">Scan QR to book a table</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                No Active Table Reservation
              </h2>
              <p className="text-gray-600 text-sm">
                You don't have any table booked at the moment. Scan the QR code
                on your table to get started.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <QrCode className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">
                    How to Book a Table
                  </h3>
                  <p className="text-sm text-blue-700">
                    Simply scan the QR code available on any table in the
                    restaurant to reserve it and start ordering.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">
                What You Can Do Next
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">1</span>
                  </div>
                  <span className="text-sm text-gray-700">
                    Find an available table
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <span className="text-sm text-gray-700">
                    Scan the QR code on the table
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <span className="text-sm text-gray-700">
                    Browse menu and place your order
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border-t border-amber-200 px-6 py-4">
            <div className="flex items-start space-x-2">
              <span className="text-amber-600 text-lg">ℹ️</span>
              <div>
                <p className="text-sm font-medium text-amber-800">Need Help?</p>
                <p className="text-xs text-amber-700 mt-1">
                  Ask any staff member to help you locate a table or scan the QR
                  code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Date not available";
    }
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Date not available";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));

      if (diffInMinutes < 1) return "Just now";
      if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `${diffInHours} hours ago`;

      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    } catch {
      return "Date not available";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-gray-50 min-h-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
        <div className="bg-gradient-to-r from-green-500 to-teal-600 px-6 py-4 text-white relative">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Table Booked</h1>
              <p className="text-green-100 text-sm">Via QR Code Scan</p>
            </div>
          </div>

          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-12 bg-white rounded-lg shadow-xl py-2 w-48 z-10">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowCancelModal(true);
                  }}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  Cancel Table
                </button>

                <button
                  onClick={() => setShowMenu(false)}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  View Menu
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <CheckCircle className="w-4 h-4 mr-1" />
              Table Reserved
            </span>
            <span className="text-sm text-gray-500">
              {formatTimeAgo(data.data.createdat)}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="text-center mb-4">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-gray-700">
                {data.data.tables?.tablename || "N/A"}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Table {data.data.tables?.tablename || "Unknown"}
            </h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Table Type</span>
              </div>
              <span className="text-sm font-medium">
                {data.data.tables?.type || "Standard"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Booked At</span>
              </div>
              <span className="text-sm font-medium">
                {formatDate(data.data.createdat)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Booked By</span>
              </div>
              <span className="text-sm font-medium">
                {data?.data?.users?.name || "Guest"}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">What's Next?</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-orange-100 w-8 h-8 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-sm">1</span>
                </div>
                <span className="text-sm text-gray-700">
                  Browse menu and add items
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <span className="text-sm text-gray-700">Place your order</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">3</span>
                </div>
                <span className="text-sm text-gray-700">Enjoy your meal!</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-t border-yellow-200 px-6 py-4">
          <div className="flex items-start space-x-2">
            <span className="text-yellow-600 text-lg">💡</span>
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Table Reservation
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                Once you place an order, the table cannot be cancelled.
              </p>
            </div>
          </div>
        </div>
      </div>

      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Cancel Table Reservation?
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Are you sure you want to cancel Table{" "}
                {data.data.tables?.tablename || "Unknown"}? This will free up
                the table for other customers.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => handleCancel(data?.data?.tables)}
                  className="w-full bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition-colors"
                >
                  Yes, Cancel Table
                </button>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Keep Table
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowMenu(false)}
        ></div>
      )}
    </div>
  );
}
