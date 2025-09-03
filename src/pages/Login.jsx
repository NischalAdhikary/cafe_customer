import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center  "
      style={{
        backgroundImage: "url('/bgimage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="w-full md:w-1/3 z-50 relative h-full rounded-xl bg-white p-4 flex flex-col items-center gap-8  ">
        <div
          className=" cursor-pointer p-2 absolute w-12 h-12 text-center text-2xl font-semibold left-4"
          onClick={() => navigate("/")}
        >
          <ArrowLeft />
        </div>
        <div className="w-50 h-50">
          <img src="/cafelogo.png" alt="cafe_logo"></img>
        </div>
        <div className="w-full flex flex-col gap-4 ">
          <button
            className="bg-orange-500 text-white rounded-xl font-semibold text-lg px-2 py-2 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register As Member
          </button>
          <button
            className="bg-orange-500 text-white rounded-xl cursor-pointer px-2 py-2 font-semibold text-lg"
            onClick={() => navigate("/member-login")}
          >
            Login As Member
          </button>
          <button
            className="bg-orange-500 text-white rounded-xl cursor-pointer px-2 py-2 font-semibold text-lg"
            onClick={() => navigate("/guest-login")}
          >
            Login As Guests
          </button>
        </div>
      </div>
    </div>
  );
}
