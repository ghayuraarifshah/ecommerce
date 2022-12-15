import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHeart,
  faShoppingCart,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import UserContext from "../providers/userProvider";
import CartContext from "../providers/cartProvider";
import { Router } from "next/router";
import SearchModal from "./SearchModal";

const Header: React.FC = () => {
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [isItemsOpen, setisItemsOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setIsOpen(false);
    });
  }, []);
  return (
    <div className={`flex bg-purple-700 justify-between items-center`}>
      <SearchModal isOpen={isItemsOpen} close={() => setisItemsOpen(false)} />
      <div className="flex">
        <div className="p-3">
          <span className="text-3xl">🏪</span>
          <span className="p-2 text-2xl text-white">E-Cart</span>
        </div>
        <div
          className="md:block my-auto bg-white rounded-sm hidden"
          onClick={() => setisItemsOpen(true)}
        >
          <input
            type="text"
            className="rounded-sm h-8 px-2 focus-visible:outline-none"
            placeholder="Search"
          />
          <FontAwesomeIcon icon={faSearch} className="px-2 text-gray-600" />
        </div>
      </div>
      <div className="md:flex mx-5 my-auto h-9 items-center hidden">
        <Link href="/user">
          <img
            src={`https://avatars.dicebear.com/api/initials/${user?.lastName}.svg`}
            alt=""
            className="h-8 rounded-full cursor-pointer"
          />
        </Link>
        <Link href={`/favorites/${user?._id}`}>
          <FontAwesomeIcon
            icon={faHeart}
            className="px-2 text-2xl text-pink-500 mx-3"
          />
        </Link>
        <div className="mx-3 relative">
          <div className="bg-white w-5 h-5 rounded-full ml-auto absolute top-[-15px] flex items-center justify-center right-0">
            <p>{cart?.quantity}</p>
          </div>
          <Link href={`/cart/${user?._id}`}>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="px-2 text-2xl text-white"
            />
          </Link>
        </div>
      </div>
      <div className="md:hidden mx-3">
        <button>
          <FontAwesomeIcon
            icon={faBars}
            color="white"
            onClick={() => setIsOpen(true)}
          />
        </button>
      </div>
      <div
        className={`fixed top-1 mx-1 h-[40vh] z-20 transition-all bg-white w-full rounded-lg border border-pink-500 ${
          !isOpen && "invisible opacity-0"
        }`}
      >
        <div className="flex justify-end mx-3 my-4">
          <FontAwesomeIcon
            icon={faTimes}
            className="bg-pink-500 text-white px-3 py-2 rounded-full "
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className="flex justify-end mx-3 my-4 border-2 border-pink-500 py-2 rounded-lg">
          <div className="my-auto bg-white rounded-sm w-full">
            <input
              type="text"
              className="rounded-sm h-8 px-2 focus-visible:outline-none w-[90%]"
              placeholder="Search"
            />
            <FontAwesomeIcon icon={faSearch} className="px-2 text-pink-500" />
          </div>
        </div>
        <Link href="/user">
          <div className="flex justify-center items-center border-2 rounded-lg border-pink-500 my-3 mx-2">
            <img
              src={`https://avatars.dicebear.com/api/initials/${user?.lastName}.svg`}
              alt=""
              className="h-8 my-2 rounded-full cursor-pointer"
            />
            <p className="mx-2">User</p>
          </div>
        </Link>
        <Link href={`/favorites/${user?._id}`}>
          <div className="flex justify-center border-2 rounded-lg border-pink-500 my-3 mx-2">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faHeart}
                className="p-2 text-2xl text-pink-500 mx-3"
              />
              <p>Favorites</p>
            </div>
          </div>
        </Link>
        <Link href={`/cart/${user?._id}`}>
          <div className="flex justify-center border-2 rounded-lg border-pink-500 my-3 mx-2">
            <div className="mx-3 relative flex items-center">
              <div className="w-5 h-5  ml-auto absolute top-[-15px] flex items-center justify-center left-10 mt-3 border bg-pink-500 rounded-full">
                <p className="text-white">{cart?.quantity}</p>
              </div>
              <>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="p-2  text-2xl text-pink-500 mx-3"
                />
                <p>Cart</p>
              </>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
