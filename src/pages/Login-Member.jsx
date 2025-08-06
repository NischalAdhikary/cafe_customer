import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useUserLoginMutation } from "../store/api/User";
import { setUser } from "../store/slice/Authslice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LoginMember() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userLogin, { isLoading }] = useUserLoginMutation();

  const [LoginData, setLoginData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setLoginData({ ...LoginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userLogin(LoginData).unwrap();
      dispatch(setUser(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/Menu");
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('/bgimage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/30 "></div>
      <div className="w-full md:w-1/3 z-50 h-full p-4 bg-white rounded-xl  flex flex-col items-center">
        <div className="w-50 h-50  relative">
          <img src="/cafelogo.png"></img>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-8 ">
          <input
            onChange={handleChange}
            name="email"
            value={LoginData.email}
            type="text"
            placeholder="Email/Phone Number"
            className="w-full p-3 text-semibold  rounded-md my-2 border-2 border-orange-500"
          ></input>
          <input
            onChange={handleChange}
            type="text"
            name="password"
            value={LoginData.password}
            placeholder="Password/OTP"
            className="w-full p-3  rounded-md my-2 border-2 border-orange-500"
          ></input>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-orange-500 text-white rounded-xl cursor-pointer px-2 py-2 font-semibold text-lg"
          >
            {isLoading ? "Loading..." : "Login As Member"}
          </button>
        </form>
      </div>
    </div>
  );
}
