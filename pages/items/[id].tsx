import type { NextPage } from "next";
import Head from "next/head";
import mongoose from "mongoose";
import type { NextPageContext } from "next/";
import userModel from "../../models/user";
import type user from "../../interface/user";
import cart from "../../interface/cart";
import cartModel from "../../models/cart";
import { useContext, useEffect } from "react";
import {
  faShoppingCart,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../../providers/userProvider";
import CartContext from "../../providers/cartProvider";
import itemModel from "../../models/items";
import item from "../../interface/item";
import { Ratings } from "../../components/Ratings";
import OrderContext from "../../providers/orderProvider";
import order from "../../interface/order";
import { useRouter } from "next/router";

interface Props {
  user: user;
  cart: cart;
  item: item;
}
const Items: NextPage<Props> = ({ cart, user, item }) => {
  const { setUser } = useContext(UserContext);
  const { setCart, addToCart } = useContext(CartContext);
  const { placeOrder } = useContext(OrderContext);
  useEffect(() => {
    if (setUser && setCart) {
      setUser(user);
      setCart(cart);
    }
  }, []);
  const router = useRouter();
  const placeOrderWrapper = () => {
    const order: order = {
      items: [item],
      quantity: 1,
      total: item.price,
      orderedBy: user?._id,
    };
    placeOrder(order, user);
    router.back();
  };
  const metaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: item.title,
    description: item.description,
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: item.rating,
      },
    },
  };
  return (
    <>
      <Head>
        <title>Item: {item.title}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(metaData) }}
        />
      </Head>
      <main className="flex h-[90vh]">
        <div className="w-3/4 mx-auto flex lg:flex-row flex-col">
          <img
            src={item.image}
            alt={item.description}
            className="m-5 rounded-md h-1/2"
          />
          <div className="flex flex-col m-5">
            <h1 className="text-3xl mt-1">{item.title}</h1>
            <p className="text-md font-thin mt-1">{item.category}</p>
            <div className="my-3">
              <Ratings ratings={item.rating} />
            </div>
            <h1 className="text-3xl">$ {item.price}</h1>
            <p className="mt-1 font-thin">{item.description}</p>
            <div className="flex justify-between px-6 mt-10 mb-5">
              <button
                className="bg-green-700 py-1 sm:px-10 px-5 rounded-md"
                onClick={() => {
                  if (item && addToCart) {
                    addToCart(item);
                  }
                }}
              >
                <FontAwesomeIcon icon={faShoppingCart} className="text-white" />
                <span className="text-sm mx-1 text-white">Add</span>
              </button>
              <button className="bg-purple-700 py-1 sm:px-10 px-5 rounded-md">
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  className="text-white"
                  onClick={() => {
                    placeOrderWrapper();
                  }}
                />
                <span className="text-sm mx-1 text-white">Buy</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  const { id } = query;
  await mongoose.connect(
    "mongodb://127.0.0.1:6000/ecommerse?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.4.2"
  );
  const user: user | null = await userModel.findOne<user>();
  const cart: cart | null = await cartModel
    .findOne<cart>({ owner: user?._id })
    .populate({
      path: "items",
      populate: {
        path: "item",
        model: "item",
      },
    });
  const item: item | null = await itemModel.findById(id);
  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      cart: JSON.parse(JSON.stringify(cart)),
      item: JSON.parse(JSON.stringify(item)),
    },
  };
}

export default Items;
