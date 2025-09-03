// import { SquareMenu, ShoppingCart, User, History, House } from "lucide-react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// const NavigationLinks = [
//   { label: "Menu", path: "/menu", icon: <SquareMenu /> },
//   { label: "History", path: "/history", icon: <History /> },
//   { label: "Cart", path: "/cart", icon: <ShoppingCart /> },
//   { label: "Profile", path: "/profile", icon: <User /> },
// ];

// export default function Navtab() {
//   const navigate = useNavigate();
//   const cartItems = useSelector((state) => state.cartitems.items).length;
//   console.log("cartItems", cartItems);
//   const handleNavigation = (path) => {
//     navigate(path);
//   };
//   return (
//     <div className="w-full h-full relative  flex items-center justify-center">
//       <div className="p-2 h-20 w-full lg:w-[40vw] bg-gray-200  flex ">
//         {NavigationLinks.map((link, _) => (
//           <button
//             key={link.label}
//             onClick={() => handleNavigation(link.path)}
//             className="flex flex-col cursor-pointer relative items-center w-full h-full px-2 md:px-4 md:py-2 text-lg font-semibold hover:bg-white"
//           >
//             {link.icon}
//             {link.label}
//             {link.label === "Cart" && cartItems > 0 && (
//               <span className="absolute top-0 right-10 p-1 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartItems}
//               </span>
//             )}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
import { SquareMenu, ShoppingCart, User, History } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const NavigationLinks = [
  { label: "Menu", path: "/", icon: SquareMenu },
  { label: "History", path: "/history", icon: History },
  { label: "Cart", path: "/cart", icon: ShoppingCart },
  { label: "Table", path: "/table", icon: SquareMenu },
  { label: "Profile", path: "/profile", icon: User },
];

export default function Navtab() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cartitems.items).length;

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="absolute inset-0 bg-white/90 backdrop-blur-md"></div>

      <div className="relative px-2 py-1">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {NavigationLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);

            return (
              <button
                key={link.label}
                onClick={() => handleNavigation(link.path)}
                className={`
                  relative flex flex-col items-center justify-center
                  p-3 min-h-[64px] min-w-[64px] rounded-xl
                  transition-all duration-300 ease-out
                  ${
                    active
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 active:scale-95"
                  }
                `}
              >
                {/* Glow effect for active item */}
                {active && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur opacity-30 scale-110"></div>
                )}

                <div className="relative">
                  <Icon
                    size={20}
                    strokeWidth={active ? 2.5 : 2}
                    className="mb-1"
                  />

                  {/* Cart badge */}
                  {link.label === "Cart" && cartItems > 0 && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-lg animate-pulse">
                      {cartItems > 99 ? "99+" : cartItems}
                    </div>
                  )}
                </div>

                <span
                  className={`
                  text-xs font-medium leading-none
                  transition-all duration-200
                  ${active ? "font-bold" : ""}
                `}
                >
                  {link.label}
                </span>

                {/* Active indicator dot */}
                {active && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full opacity-80"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* iPhone-style home indicator */}
      <div className="flex justify-center pb-1">
        <div className="w-32 h-1 bg-gray-300 rounded-full opacity-60"></div>
      </div>
    </div>
  );
}
