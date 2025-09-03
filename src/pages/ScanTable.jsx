import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetTableStatusQuery } from "../store/api/Table";
import { setOrdertype } from "../store/slice/Ordertype";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { useBookTableMutation } from "../store/api/Table";
import Modalcenter from "../dashboard/components/Modalcenter";

export default function ScanTable() {
  const [params] = useSearchParams();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [availableOptions, setAvailableOptions] = useState([]);

  const user = useSelector((state) => state.authUser.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tableid = params.get("table");
  const [bookTable, { isLoading: bookloading, data: bookingdata }] =
    useBookTableMutation();
  const { data, error } = useGetTableStatusQuery(tableid);

  useEffect(() => {
    if (error) {
      if (error.data.status === "already_booked") {
        console.log(error);
        setAvailableOptions(["menu"]);
        setShowOrderModal(true);
        return;
      } else if (error.data.status === "takeawayorder") {
        console.log(error);
        setAvailableOptions(["menutakeaway"]);
        setShowOrderModal(true);
        return;
      }
      toast.error(error?.data?.message);
      setAvailableOptions(["takeaway"]);
      setShowOrderModal(true);
    }

    if (data) {
      if (data.status === "available") {
        toast.success(data.message);
        setAvailableOptions(["dinein", "takeaway"]);
        setShowOrderModal(true);
      } else if (data.status === "already_booked") {
        console.log("hello");
        toast.info(data.message);
        setAvailableOptions(["menu"]);
        setShowOrderModal(true);
      } else {
        toast.warn(data.message);
        setAvailableOptions(["takeaway"]);
        setShowOrderModal(true);
      }
    }
  }, [data, error]);

  const handleOptionSelect = async (option) => {
    if (!user) {
      toast.error("Please login first");
      return navigate("/login");
    }

    setShowOrderModal(false);

    if (option === "dinein") {
      try {
        const res = await bookTable(tableid).unwrap();
        dispatch(setOrdertype("dinein"));
        toast.success(res.message);
        navigate(`/`);
      } catch (err) {
        toast.error(err.data?.message || "Booking failed");
      }
    } else if (option === "takeaway") {
      dispatch(setOrdertype("takeaway"));
      navigate(`/`);
    }
  };
  const handleClose = () => {
    setShowOrderModal(false);
    navigate(`/`);
  };

  return (
    <div>
      <Modalcenter show={showOrderModal} onClose={handleClose}>
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-center">
            {availableOptions.includes("dinein")
              ? "Choose Order Type"
              : "Table Unavailable"}
          </h2>
          <div className="flex flex-col items-center gap-3">
            {availableOptions.includes("dinein") && (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded w-full"
                onClick={() => handleOptionSelect("dinein")}
                disabled={bookloading}
              >
                {bookloading ? "Processing..." : "Dine In"}
              </button>
            )}

            {availableOptions.includes("takeaway") && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                onClick={() => handleOptionSelect("takeaway")}
              >
                Take Away
              </button>
            )}

            {availableOptions.includes("takeaway") && (
              <p className="text-sm text-gray-500 text-center mt-2">
                This table is currently unavailable for dine-in
              </p>
            )}
            {availableOptions.includes("menu") && (
              <p className="text-sm text-gray-500 text-center mt-2">
                You have already booked a table.
              </p>
            )}
            {availableOptions.includes("menutakeaway") && (
              <p className="text-sm text-gray-500 text-center mt-2">
                You already have a takeaway order in progress. Please complete
                or cancel it before booking a table.
              </p>
            )}
          </div>
        </div>
      </Modalcenter>
    </div>
  );
}
