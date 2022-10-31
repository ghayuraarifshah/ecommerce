import React, { useState } from "react";
import itemType from "../interface/item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import order from "../interface/order";
interface Props {
  item: itemType;
  isOpen: boolean;
  closePopup: () => void;
  changeQuantity: (opp: "add" | "sub") => void;
  order: order;
  placeOrder: () => void;
}
const ItemExteneded: React.FC<Props> = ({
  item,
  isOpen,
  closePopup,
  changeQuantity,
  order,
  placeOrder,
}) => {
  return (
    <>
      <div
        className={`fixed top-0 z-[5] opacity-20 h-[100vh] w-[100vw] bg-black ${
          !isOpen && "hidden"
        }`}
      ></div>
      <div
        className={` ${
          !isOpen && "hidden"
        } fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-lg z-10 min-h-[40vh]`}
      >
        <div className="flex justify-between my-2 border-b border-gray-500">
          <div className="mx-5 my-3">
            <p className="text-purple-700 text-2xl">Buy Item</p>
          </div>
          <div className="mx-5 my-3 cursor-pointer" onClick={closePopup}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        <div className="flex lg:flex-row flex-col">
          <img
            src={item.image}
            className=" flex-1 lg:m-4 bg-cover lg:rounded-md text-center overflow-hidden "
          />
          <div className="flex-1 p-4 flex flex-col leading-normal">
            <div className="mb-8">
              <div className="text-gray-900 font-bold text-xl mb-2">
                {item.title}
              </div>
              <p className="text-gray-700 text-base">{item.description}</p>
            </div>
            <div className="flex items-center justify-between mt-5">
              <div className="flex justify-between w-1/4 border border-gray-400 rounded-md">
                <button
                  className="px-3 my-2 border-r border-gray-400 text-xl cursor-pointer"
                  onClick={() => changeQuantity("sub")}
                >
                  -
                </button>
                <div className="w-5 flex justify-center items-center text-md">
                  {order.quantity}
                </div>
                <button
                  className="px-3 my-2 border-l border-gray-400 text-md cursor-pointer"
                  onClick={() => changeQuantity("add")}
                >
                  +
                </button>
              </div>
              <div className="mx-16 text-xl">${order.quantity}</div>
            </div>
            <div className="flex items-center justify-between mt-10">
              <p className="font-bold text-xl">Total Price: </p>
              <p className="mx-16 text-xl">${order.quantity}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-evenly my-10">
          <button
            onClick={closePopup}
            className="px-10 py-2 border-2 border-purple-700 text-purple-700 rounded-md text-md"
          >
            Cancel
          </button>
          <button
            onClick={placeOrder}
            className="px-10 py-2 bg-green-600 rounded-md text-md text-white"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default ItemExteneded;
