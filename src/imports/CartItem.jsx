import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { usecart } from "../context/Cartcontext";

const CartItem = ({ item }) => {
  const { increaseQty, decreaseQty, removeFromCart } = usecart();

  return (
    <div className="flex items-center justify-between bg-gray-100 rounded-3xl p-4 shadow-sm">
      {/* Left: Product image + name */}
      <div className="flex items-center space-x-4">
        <img
          src={item.photo}
          alt={item.name}
          className="w-16 h-16 rounded-md object-cover"
        />
        <div>
          <h2 className="font-semibold text-lg">{item.name}</h2>
          <p className="text-gray-700 text-base">
            Rs: {Number(item.price).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-2">
        {/* Decrease */}
        <button
          onClick={() => decreaseQty(item.productId)}
          className="p-1 hover:scale-115 cursor-pointer rounded bg-gray-200 hover:bg-gray-300"
        >
          <Minus size={16} />
        </button>

        {/* Qty */}
        <div>{item.quantity}</div>

        {/* Increase */}
        <button
          onClick={() => increaseQty(item.productId)}
          className="p-1 hover:scale-115 cursor-pointer rounded bg-gray-200 hover:bg-gray-300"
        >
          <Plus size={16} />
        </button>

        {/* Remove */}
        <button
          onClick={() => removeFromCart(item.productId)}
          className="flex hover:scale-105 items-center gap-1 px-3 py-1 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition"
        >
          <Trash2 size={18} />
          <span className="hidden sm:inline">Remove</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
