import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faShoppingBag,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import type itemType from "../interface/item";
import ItemExtened from "./ItemExtened";
import order from "../interface/order";
import UserContext from "../providers/userProvider";
import CartContext from "../providers/cartProvider";
import OrderContext from "../providers/orderProvider";
import Link from "next/link";
import { Ratings } from "./Ratings";
interface Props {
  item: itemType;
}
export interface RatingsProp {
  ratings: number;
}
const Item: React.FC<Props> = ({ item }) => {
  const { user, addToFavorites } = useContext(UserContext);
  const { addToCart } = useContext(CartContext);
  const { placeOrder } = useContext(OrderContext);
  const [order, setOrder] = useState<order>({
    items: [item],
    quantity: 1,
    total: item.price,
    orderedBy: user?._id,
  });
  function changeQuatity(opp: "add" | "sub") {
    if (order.quantity <= 1 && opp == "sub") return;
    const newQuantity = opp == "add" ? order.quantity + 1 : order.quantity - 1;
    setOrder({
      items: [item],
      quantity: newQuantity,
      total: item.price * newQuantity,
      orderedBy: user?._id,
    });
    return;
  }
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const description = item.description.substring(0, 200);
  function closePopup() {
    setIsOpen(false);
  }
  async function _placeOrder() {
    if (!user) return;
    await placeOrder(order, user);
    setIsOpen(false);
  }
  const icon =
    user?.favorites?.findIndex((el) => el._id == item._id) !== -1
      ? faHeart
      : faHeartOutline;

  return (
    <>
      <ItemExtened
        item={item}
        isOpen={isOpen}
        closePopup={closePopup}
        changeQuantity={changeQuatity}
        order={order}
        placeOrder={_placeOrder}
      />
      <div className="w-full rounded overflow-hidden shadow-lg my-5 relative z-0">
        <div className="absolute right-1 top-1 px-2 py-1 rounded-full bg-white">
          <FontAwesomeIcon
            icon={icon}
            className="text-pink-600"
            onClick={() => {
              addToFavorites(item);
            }}
          />
        </div>
        <Link href={`/items/${item._id}`}>
          <img className="w-full" src={item.image} alt={item.title} />
        </Link>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{item.title}</div>
          <p className="text-gray-700 text-base">{description + "..."}</p>
        </div>
        <div className="px-6 flex justify-between">
          <span className="text-sm">Price: ${item.price}</span>
          <div className="flex">
            <Ratings ratings={item.rating} />
          </div>
        </div>
        <div className="flex justify-between px-6 mt-2 mb-5">
          <button
            className="bg-green-700 py-1 px-2 rounded-md"
            onClick={() => {
              if (item && addToCart) {
                addToCart(item);
              }
            }}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="text-white" />
            <span className="text-sm mx-1 text-white">Add</span>
          </button>
          <button
            className="bg-purple-700 py-1 px-2 rounded-md"
            onClick={() => setIsOpen((i) => !i)}
          >
            <FontAwesomeIcon icon={faShoppingBag} className="text-white" />
            <span className="text-sm mx-1 text-white">Buy</span>
          </button>
        </div>
      </div>
    </>
  );
};
export default Item;
