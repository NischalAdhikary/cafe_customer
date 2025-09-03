import React from "react";
import { Loader, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFoodItemsQuery } from "../../../store/api/FoodItem";
import { addToCart } from "../../../store/slice/Cartsitems";

export default function AdminFoodAdd() {
  const dispatch = useDispatch();
  const handleAddCart = (item) => {
    dispatch(addToCart(item));
  };
  const foods = useSelector((state) => state.cartitems.items);
  console.log("carts items from pos", foods);
  const { data, isLoading } = useGetFoodItemsQuery();
  const fooditems = data?.data || [];
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center animate-spin">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-full h-auto relative">
      <div className="grid p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {fooditems.map((item) => (
          <div
            key={item.foodid}
            className="bg-gray-200 min-h-[150px] overflow-hidden rounded-lg shadow-md"
          >
            {item.imageurl ? (
              <img
                src={`http://localhost:9000/uploads/${item.imageurl}`}
                alt={item.name}
                className="w-full h-40 object-cover mb-2"
              />
            ) : (
              <div className="w-full h-40 bg-white mb-2"></div>
            )}
            <div className="flex flex-col p-2 gap-3">
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">{item.foodname}</h3>
                <p className="text-gray-600 ">{item.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 font-semibold text-xl">
                  Rs. {item.price}
                </p>
                <div
                  className="cursor-pointer hover:bg-gray-300 p-2 rounded-full"
                  onClick={() => handleAddCart(item)}
                >
                  <Plus />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
