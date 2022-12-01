import React from "react";
import type item from "../interface/item";
interface itemWithQuantity {
  item: item;
  quantity: number;
}
interface Props {
  item: item;
  quantity: number;
  removeItem: (item: itemWithQuantity) => void;
}
const CartItem: React.FC<Props> = ({ item, quantity, removeItem }) => {
  return (
    <div className="flex justify-between items-center bg-purple-600 text-white h-12 m-3 rounded-md">
      <div className="mx-2 text-xl">{item.title}</div>
      <div className="flex mx-2 items-center">
        <p className="mx-2">Quantity: {quantity}</p>
        <p className="mx-2">Total: ${quantity * item.price}</p>
        <button
          className="bg-red-600 px-3 py-1 mx-5 rounded-md"
          onClick={() => removeItem({ item, quantity })}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
