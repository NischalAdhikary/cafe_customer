import { SquareMenu, ShoppingCart, User, History, House } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const NavigationLinks = [
  { label: "Home", path: "/", icon: <House /> },
  { label: "Menu", path: "/menu", icon: <SquareMenu /> },
  { label: "History", path: "/history", icon: <History /> },
  { label: "Cart", path: "/cart", icon: <ShoppingCart /> },
  { label: "Profile", path: "/profile", icon: <User /> },
];

export default function Navtab() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cartitems.items).length;
  console.log("cartItems", cartItems);
  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div className="w-full h-full relative  flex items-center justify-center">
      <div className="p-2 h-20 w-full lg:w-[40vw] bg-gray-200  flex ">
        {NavigationLinks.map((link, _) => (
          <button
            key={link.label}
            onClick={() => handleNavigation(link.path)}
            className="flex flex-col cursor-pointer relative items-center w-full h-full px-2 md:px-4 md:py-2 text-lg font-semibold hover:bg-white"
          >
            {link.icon}
            {link.label}
            {link.label === "Cart" && cartItems > 0 && (
              <span className="absolute top-0 right-10 p-1 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
