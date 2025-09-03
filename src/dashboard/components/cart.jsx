import { Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../store/slice/Cartsitems";
// import { addToCart, removeFromCart } from "../store/slice/Cartsitems";

export default function Cart({ count, item }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item));
  };

  const handleAdd = () => {
    dispatch(addToCart(item));
  };

  return (
    <div className="w-full h-auto p-2 flex gap-2">
      <div className="cursor-pointer">
        <Minus onClick={handleRemove} />
      </div>
      <h2>{count}</h2>
      <div className="cursor-pointer">
        <Plus onClick={handleAdd} />
      </div>
    </div>
  );
}
