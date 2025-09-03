import { useDispatch, useSelector } from "react-redux";
import Cart from "../dashboard/components/cart";
import Button from "../dashboard/components/botton";
import { useCreateOrderMutation } from "../store/api/Order";
import { clearCart } from "../store/slice/Cartsitems";
import { toast } from "react-toastify";
import { useGetbookedtableQuery } from "../store/api/Table";

import {
  ShoppingCart,
  ChefHat,
  Utensils,
  Pizza,
  Coffee,
  Star,
  ArrowRight,
  Sparkles,
  Heart,
} from "lucide-react";
import { setOrdertype } from "../store/slice/Ordertype";

export default function Cartpage() {
  const { data } = useGetbookedtableQuery();

  const cartItems = useSelector((state) => state.cartitems.items);
  console.log(cartItems);
  const dispatch = useDispatch();
  const ordertype = useSelector((state) => state.ordertype.ordertype);

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  console.log(data);
  console.log(data?.data);

  if (data && data?.data !== null) {
    dispatch(setOrdertype("dinein"));
  }
  console.log("ordertype", ordertype);
  const handleCheckout = async () => {
    try {
      await createOrder({ fooditems: cartItems, ordertype }).unwrap();
      dispatch(clearCart());
      toast.success("Order created successfully");
    } catch (err) {
      console.log(err);
      toast.error("Order creation failed");
    }
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  if (cartItems.length <= 0) {
    return (
      <div className="flex justify-center items-center min-h-auto  ">
        <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center w-full h-full max-w-md mx-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-100 to-yellow-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

          <div className="relative mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg relative">
              <ShoppingCart className="w-12 h-12 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3 relative">
            Your Cart is Empty
            <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-1 -right-6 animate-pulse" />
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Looks like you haven't added any delicious items yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  relative flex flex-col justify-between min-h-auto bg-white">
      <div className="p-4 w-full max-w-full container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-gray-50 rounded-lg shadow-lg p-4"
          >
            <div className="w-24 h-24 bg-gray-200 rounded-lg mr-4">
              {item.img ? (
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <div className="flex-1 ">
              <h3 className="text-lg font-semibold">{item.foodname}</h3>
              <div className="flex items-center mt-1">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-sm">{item.rating}</span>
              </div>
              <p className="text-green-600 font-medium">Rs{item.price}</p>
              <input
                className="w-full mt-4 border-0 border-b-2 border-transparent focus:outline-none focus:border-orange-500"
                placeholder="Note"
                type="text"
              />
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              {(() => {
                const existingItem = cartItems.find(
                  (cartItem) => cartItem.id === item.id
                );
                const itemCount = existingItem ? existingItem.quantity : 0;

                return itemCount > 0 && <Cart count={itemCount} item={item} />;
              })()}

              {item.customizable && (
                <span className="text-[13px]">Customize</span>
              )}
            </div>
          </div>
        ))}
        <div className="w-full p-4 flex justify-between items-center border-t border-gray-200">
          <h2 className="text-lg font-semibold">Total:</h2>
          <h2 className="text-lg font-semibold">Rs.{totalPrice}</h2>
        </div>
      </div>

      <div className=" w-full mb-20 p-4 ">
        <Button
          onClick={handleCheckout}
          variant={"primary"}
          className={"w-full"}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
