import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminRoute() {
  const navigate = useNavigate();
  const userAdmin = useSelector((state) => state.authUser.user);

  useEffect(() => {
    if (!userAdmin) {
      return;
    }
    if (userAdmin.role !== "admin") {
      navigate("/");
    }
  }, [userAdmin, navigate]);

  return <Outlet />;
}
