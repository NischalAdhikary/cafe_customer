import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useVerifyUserQuery } from "../store/api/User";
import { removeUser } from "../store/slice/Authslice";
import { Loader } from "lucide-react";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authUser.user);

  const { data, isLoading, error } = useVerifyUserQuery();
  console.log(data, user);

  useEffect(() => {
    if (error) {
      dispatch(removeUser());
      navigate("/login");
    }
  }, [error, dispatch, navigate, data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-8 h-8" />
      </div>
    );
  }
  if (user && data?.success === true) {
    return <Outlet />;
  }
}
