import React, { use, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
export default function ProtectedRoute() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.authUser.user);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return <Outlet />;
}
