import React, { useState } from "react";
import { useUserRegisterMutation } from "../store/api/User";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [userRegister, { isLoading }] = useUserRegisterMutation();

  const [createUser, setCreateUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const handleChange = (e) => {
    setCreateUser({ ...createUser, [e.target.name]: e.target.value });
    console.log(createUser);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userRegister(createUser).unwrap();
      toast.success(res.message);
      setCreateUser({ name: "", email: "", password: "", phone: "" });
    } catch (err) {
      console.error("Registration Error:", err);
      toast.error(err?.data?.message || "Registration failed");
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
      <div className="w-full md:w-1/3 z-50 h-full p-4 bg-white rounded-xl flex flex-col items-center">
        <div className="w-50 h-50  relative">
          <img src="/cafelogo.png"></img>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4 ">
          <input
            type="text"
            required
            onChange={handleChange}
            autoComplete="off"
            placeholder="Full Name"
            name="name"
            value={createUser.name}
            className="w-full p-3 text-semibold  rounded-md my-2 border-2 border-orange-500"
          ></input>
          <input
            type="email"
            required
            onChange={handleChange}
            autoComplete="off"
            placeholder="Email"
            name="email"
            value={createUser.email}
            className="w-full p-3  rounded-md my-2 border-2 border-orange-500"
          ></input>
          <input
            type="password"
            required
            placeholder="Password"
            autoComplete="off"
            onChange={handleChange}
            name="password"
            value={createUser.password}
            className="w-full p-3  rounded-md my-2 border-2 border-orange-500"
          ></input>
          <input
            placeholder="phone number"
            autoComplete="off"
            required
            name="phone"
            onChange={handleChange}
            value={createUser.phone}
            className="w-full p-2  rounded-md my-2 border-2 border-orange-500"
            type="text"
          ></input>
          <button
            type="submit"
            className="bg-orange-500 text-white rounded-xl cursor-pointer px-2 py-2 font-semibold text-lg"
          >
            {isLoading ? "Loading..." : "Register As Member"}
          </button>
        </form>
      </div>
    </div>
  );
}
