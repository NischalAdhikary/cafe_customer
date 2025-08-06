import React, { useEffect, useState } from "react";
import Button from "./botton";
import Menucategorylist from "./menucatoegorylist";
import Modal from "./modal";
import Menuvariant from "./menuvariant";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/slice/Cartsitems";
import Cart from "./cart";

const menuitems = [
  {
    id: 1,
    name: "Espresso",
    price: 3.0,
    rating: 4.5,
    category: "Coffee",
    img: "",
    customizable: true,
    options: [
      { id: 1, name: "Double Shot", price: 0.75 },
      { id: 2, name: "Almond Milk", price: 0.5 },
    ],
  },
  {
    id: 2,
    name: "Latte",
    price: 4.0,
    rating: 4.5,
    category: "Coffee",
    img: "",
    customizable: true,
    options: [
      { id: 1, name: "Vanilla Syrup", price: 0.75 },
      { id: 2, name: "Soy Milk", price: 0.5 },
    ],
  },
  {
    id: 3,
    name: "Cappuccino",
    price: 4.5,
    rating: 4.5,
    category: "Coffee",
    img: "",
  },
  {
    id: 4,
    name: "Mocha",
    price: 5.0,
    rating: 4.5,
    category: "Coffee",
    img: "",
  },
  {
    id: 5,
    name: "Americano",
    price: 2.5,
    rating: 4.5,
    category: "Coffee",
    img: "",
    customizable: true,
    options: [
      { id: 1, name: "Extra Shot", price: 0.5 },
      { id: 2, name: "Flavored Syrup", price: 0.75 },
      { id: 3, name: "Oat Milk", price: 0.5 },
    ],
  },
  {
    id: 6,
    name: "Green Tea",
    price: 2.5,
    rating: 4.0,
    category: "Tea",
    img: "",
  },
  {
    id: 7,
    name: "Earl Grey",
    price: 2.5,
    rating: 4.2,
    category: "Tea",
    img: "",
    customizable: true,
    options: [
      { id: 1, name: "Lemon Slice", price: 0.25 },
      { id: 2, name: "Honey", price: 0.5 },
    ],
  },

  {
    id: 8,
    name: "Chamomile",
    price: 2.75,
    rating: 4.3,
    category: "Tea",
    img: "",
  },

  {
    id: 9,
    name: "Croissant",
    price: 3.5,
    rating: 4.6,
    category: "Pastries",
    img: "",
  },
  {
    id: 10,
    name: "Danish",
    price: 3.75,
    rating: 4.4,
    category: "Pastries",
    img: "",
  },

  {
    id: 11,
    name: "Chicken Club",
    price: 8.5,
    rating: 4.7,
    category: "Sandwiches",
    img: "",
  },
  {
    id: 12,
    name: "Veggie Wrap",
    price: 7.5,
    rating: 4.3,
    category: "Sandwiches",
    img: "",
  },

  {
    id: 13,
    name: "Caesar Salad",
    price: 9.0,
    rating: 4.4,
    category: "Salads",
    img: "",
  },
  {
    id: 14,
    name: "Greek Salad",
    price: 8.5,
    rating: 4.6,
    category: "Salads",
    img: "",
  },

  {
    id: 15,
    name: "Chocolate Cake",
    price: 5.5,
    rating: 4.8,
    category: "Desserts",
    img: "",
  },
  {
    id: 16,
    name: "Cheesecake",
    price: 6.0,
    rating: 4.7,
    category: "Desserts",
    img: "",
  },

  {
    id: 17,
    name: "Fresh Orange Juice",
    price: 4.0,
    rating: 4.5,
    category: "Beverages",
    img: "",
  },
  {
    id: 18,
    name: "Iced Lemon Tea",
    price: 3.5,
    rating: 4.3,
    category: "Beverages",
    img: "",
  },

  {
    id: 19,
    name: "Chef's Special Pasta",
    price: 12.0,
    rating: 4.9,
    category: "Specials",
    img: "",
  },
  {
    id: 20,
    name: "Signature Burger",
    price: 11.0,
    rating: 4.8,
    category: "Specials",
    img: "",
  },

  {
    id: 21,
    name: "Vegan Bowl",
    price: 10.5,
    rating: 4.6,
    category: "Vegan",
    img: "",
  },
  {
    id: 22,
    name: "Vegan Burger",
    price: 9.5,
    rating: 4.4,
    category: "Vegan",
    img: "",
  },

  {
    id: 23,
    name: "Breakfast Platter",
    price: 11.5,
    rating: 4.7,
    category: "Breakfast",
    img: "",
  },
  {
    id: 24,
    name: "Pancake Stack",
    price: 8.5,
    rating: 4.5,
    category: "Breakfast",
    img: "",
  },
];

export default function Menuitems() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [showcustomizeModal, setShowCustomizeModal] = React.useState(false);
  const [customizableItem, setCustomizeItem] = React.useState(null);
  const user = useSelector((state) => state.authUser.user);
  const cartItems = useSelector((state) => state.cartitems.items);
  console.log("cartItems", cartItems);

  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

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

  const handleCustomizeClickClose = () => {
    setShowCustomizeModal(false);
    setCustomizeItem(null);
  };

  const filteredItems =
    selectedCategory === "All"
      ? menuitems
      : menuitems.filter((item) => item.category === selectedCategory);

  return (
    <div className="w-full relative min-h-auto">
      <Menucategorylist onCategorySelect={setSelectedCategory} />
      <div className="p-4 w-full max-w-full container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {filteredItems.map((item) => (
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

            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <div className="flex items-center mt-1">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-sm">{item.rating}</span>
              </div>
              <p className="text-green-600 font-medium">
                ${item.price.toFixed(2)}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              {(() => {
                const existingItem = cartItems.find(
                  (cartItem) => cartItem.id === item.id
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
