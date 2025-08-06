import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/slice/Authslice";
import { useUserLogoutMutation } from "../store/api/User";

export default function Profile() {
  const user = useSelector((state) => state.authUser.user);
  const [userLogout, { isLoading }] = useUserLogoutMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  const handleLogout = async () => {
    navigate("/menu");
    await userLogout();
    dispatch(removeUser());
  };
  return (
    <div className="flex justify-center items-center min-h-auto   ">
      <div className="bg-white p-8 flex flex-col items-center rounded-2xl  shadow-md text-center w-full md:h-auto h-full md:w-1/2 lg:w-1/4">
        <div className="w-30 h-30 bg-gray-300 rounded-full"></div>

        <h2 className="mt-4 text-xl font-semibold">{user?.username}</h2>
        <p className="text-gray-500">{user?.email}</p>

        <div className="mt-6 w-full space-y-4">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl transition">
            Orders
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl transition"
          >
            {isLoading ? <span>Loading...</span> : <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
