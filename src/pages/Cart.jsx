import { useSelector } from "react-redux";
import Cart from "../components/cart";
import Button from "../components/botton";

export default function Cartpage() {
  const cartItems = useSelector((state) => state.cartitems.items);
  console.log("cartItems from cart page", cartItems);
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  if (cartItems.length <= 0) {
    return (
      <div className="flex justify-center items-center min-h-auto bg-white">
        <div className="bg-white p-8 flex flex-col items-center  text-center w-full md:h-auto h-full md:w-1/2 lg:w-1/4">
          <h2 className="mt-4 text-xl text-black font-semibold">
            Cart is Empty
          </h2>
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
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <div className="flex items-center mt-1">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-sm">{item.rating}</span>
              </div>
              <p className="text-green-600 font-medium">
                ${item.price.toFixed(2)}
              </p>
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
          <h2 className="text-lg font-semibold">${totalPrice.toFixed(2)}</h2>
        </div>
      </div>

      <div className=" w-full mb-20 p-4 ">
        <Button variant={"primary"} className={"w-full"}>
          Checkout
        </Button>
      </div>
    </div>
  );
}
