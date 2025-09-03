import React, { useEffect, useState } from "react";
import Button from "./botton";
import Menucategorylist from "./menucatoegorylist";
import Modal from "./modal";
import Menuvariant from "./menuvariant";
import { useSelector, useDispatch } from "react-redux";
// import { addToCart } from "../store/slice/Cartsitems";
import { addToCart } from "../../store/slice/Cartsitems";
// import { useGetFoodItemsQuery } from "../store/api/FoodItem";
import Cart from "./cart";
import { MenuItemsSkeletonGrid } from "./skeleton";
import Input from "./input";
import { useGetFoodItemsQuery } from "../../store/api/FoodItem";

export default function Menuitems() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [searchFood, setSearchFood] = useState("");

  const { data, isLoading } = useGetFoodItemsQuery();
  const dispatch = useDispatch();
  const [showcustomizeModal, setShowCustomizeModal] = React.useState(false);
  const [customizableItem, setCustomizeItem] = React.useState(null);
  const user = useSelector((state) => state.authUser.user);
  const cartItems = useSelector((state) => state.cartitems.items);

  const handleCustomizeClick = (item) => {
    if (user) {
      if (item.customizable) {
        setCustomizeItem(item);
        setShowCustomizeModal(true);
      } else {
        dispatch(addToCart(item));
      }
    } else {
      navigate("/login");
    }
  };
  console.log("cartItems", cartItems);

  const handleCustomizeClickClose = () => {
    setShowCustomizeModal(false);
    setCustomizeItem(null);
  };

  const filteredItems =
    selectedCategory === "All"
      ? data?.data
      : data?.data?.filter((item) => item.categoryid === selectedCategory);
  console.log("filteredItems", filteredItems);
  const searchFooditems = filteredItems?.filter((item) =>
    item.foodname.toLowerCase().includes(searchFood.toLowerCase())
  );
  if (isLoading) {
    return (
      <div className="w-full relative min-h-auto">
        <MenuItemsSkeletonGrid count={8} />
      </div>
    );
  }

  return (
    <div className="w-full relative min-h-auto p-4 ">
      <Input
        type={"text"}
        value={searchFood}
        className={
          "w-full p-3  mb-3 text-semibold  rounded-md my-2 border-2 border-orange-500"
        }
        name={"search"}
        onChange={(e) => setSearchFood(e.target.value)}
        placeholder={"Search"}
      />
      <Menucategorylist onCategorySelect={setSelectedCategory} />
      <div className="w-full max-w-full container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {searchFooditems.map((item) => (
          <div
            key={item.foodid}
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

            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.foodname}</h3>
              <div className="flex items-center mt-1">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-sm">{item.rating}</span>
              </div>
              <p className="text-green-600 font-medium">Rs.{item.price}</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              {(() => {
                const existingItem = cartItems.find(
                  (cartItem) => cartItem.id === item.foodid
                );
                const itemCount = existingItem ? existingItem.quantity : 0;

                return itemCount > 0 ? (
                  <Cart count={itemCount} item={item} />
                ) : (
                  <Button
                    variant={"primary"}
                    onClick={() => handleCustomizeClick(item)}
                  >
                    Add
                  </Button>
                );
              })()}

              {item.customizable && (
                <span className="text-[13px]">Customize</span>
              )}
            </div>
          </div>
        ))}
      </div>
      {showcustomizeModal && (
        <Modal onClose={handleCustomizeClickClose}>
          <Menuvariant
            item={customizableItem}
            onClose={handleCustomizeClickClose}
          />
        </Modal>
      )}
    </div>
  );
}
