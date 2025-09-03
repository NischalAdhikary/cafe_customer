import Menuitems from "./dashboard/components/menuitems";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Guest from "./pages/Guest-login";
import { Route, Routes } from "react-router-dom";
import LoginMember from "./pages/Login-Member";
import AuthLayout from "./layout/AuthLayout";
import Profile from "./pages/Profile";

import Cartpage from "./pages/Cart";
import ProtectedRoute from "./route/ProtectedRoute";
import { Mainlayout } from "./layout/Mainlayout";
import ScanTable from "./pages/ScanTable";
import CurrentBooking from "./pages/Table";
import EnhancedOrderManagementUI from "./pages/History";
import Dashboardlayout from "./layout/Dashboardlayout";
import AdminRoute from "./route/AdminRoute";
import DashboardMain from "./dashboard/pages/DashboardMain";

import Customer from "./dashboard/pages/Customer";
import Tablemanagement from "./dashboard/pages/Tablemanagement";
import Category from "./dashboard/pages/Category";
import Fooditempage from "./dashboard/pages/Fooditempage";
import Activeorder from "./dashboard/pages/Activeorder";
import Completedorder from "./dashboard/pages/Completedorder";
import Pos from "./dashboard/pages/Pos";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/guest-login" element={<Guest />} />
          <Route path="/member-login" element={<LoginMember />} />
        </Route>
        <Route element={<Mainlayout />}>
          <Route path="/" element={<Menuitems />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/scan" element={<ScanTable />} />
            <Route path="/table" element={<CurrentBooking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<EnhancedOrderManagementUI />} />
          </Route>

          <Route path="/cart" element={<Cartpage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<Dashboardlayout />}>
              <Route path="/dashboard" index element={<DashboardMain />} />
              <Route path="/dashboard/customers" element={<Customer />} />
              <Route path="/dashboard/category" element={<Category />} />
              <Route
                path="/dashboard/orders/active"
                element={<Activeorder />}
              />
              <Route
                path="/dashboard/orders/completed"
                element={<Completedorder />}
              />
              <Route path="/dashboard/tables" element={<Tablemanagement />} />
              <Route path="/dashboard/fooditems" element={<Fooditempage />} />
            </Route>
          </Route>
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/dashboard/orders/add" element={<Pos />} />
        </Route>
      </Routes>
    </>
  );
}
