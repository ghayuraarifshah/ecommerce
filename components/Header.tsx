import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import Link from "next/link";
import UserContext from "../providers/userProvider";
import CartContext from "../providers/cartProvider";

const Header: React.FC = () => {
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  return (
    <div className={`flex bg-purple-700 justify-between items-center`}>
      <div className="flex">
        <div className="p-3">
          <span className="text-3xl">🏪</span>
          <span className="p-2 text-2xl text-white">E-Cart</span>
        </div>
        <div className="my-auto bg-white rounded-sm">
          <input
            type="text"
            className="rounded-sm h-8 px-2 focus-visible:outline-none"
            placeholder="Search"
          />
          <FontAwesomeIcon icon={faSearch} className="px-2 text-gray-600" />
        </div>
      </div>
      <div className="flex mx-5 my-auto h-9 items-center">
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
    </div>
  );
};

export default Header;
