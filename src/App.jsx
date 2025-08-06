import Menuitems from "./components/menuitems";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Guest from "./pages/Guest-login";
import { Route, Routes } from "react-router-dom";
import LoginMember from "./pages/Login-Member";
import AuthLayout from "./layout/AuthLayout";
import Home from "./pages/Home";
import History from "./pages/History";
import Profile from "./pages/Profile";

import Cartpage from "./pages/Cart";
import ProtectedRoute from "./route/ProtectedRoute";
import { Mainlayout } from "./layout/Mainlayout";

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
          <Route path="/" index element={<Home />} />
          <Route path="/Menu" element={<Menuitems />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
          </Route>

          <Route path="/cart" element={<Cartpage />} />
        </Route>
      </Routes>
    </>
  );
}
