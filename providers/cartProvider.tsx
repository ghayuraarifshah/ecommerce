import { createContext, useState } from "react";
import cart from "../interface/cart";
import item from "../interface/item";
type cartContextType = {
  cart?: cart;
  setCart?: (Cart: cart) => void;
  addToCart?: (item: item) => void;
  removeItemFromCart: (item: { item: item; quantity: number }) => void;
};
const CartContext = createContext<cartContextType>({
  removeItemFromCart: (item: { item: item; quantity: number }) => {},
});

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<cart>();
  async function addToCart(item: item) {
    const newCart: cart = {
      items: cart?.items || [],
      owner: cart?.owner || "",
      quantity: cart?.quantity || 0,
      total: cart?.total || 0,
      _id: cart?._id || "",
    };
    const indexOfItem = newCart.items.findIndex((el) => {
      return el.item._id == item._id;
    });
    if (indexOfItem !== -1) {
      newCart.items[indexOfItem].quantity += 1;
      newCart.total = newCart.total + item.price;
      newCart.quantity += 1;
      try {
        const res = await fetch("/api/change-cart", {
          method: "POST",
          body: JSON.stringify(newCart),
        });
        const _newCart = await res.json();
        setCart(_newCart);
      } catch (error) {
        alert("Something went wrong");
      }
      return;
    }
    newCart.items.push({ item, quantity: 1 });
    newCart.total = newCart.total + item.price;
    newCart.quantity += 1;
    try {
      const res = await fetch("/api/change-cart", {
        method: "POST",
        body: JSON.stringify(newCart),
      });
      const _newCart = await res.json();
      setCart(_newCart);
    } catch (error) {
      alert("Something went wrong");
    }
    return;
  }
  async function removeItemFromCart(item: { item: item; quantity: number }) {
    if (!cart) return;
    const { quantity } = cart.items.filter(
      (el) => el.item._id === item.item._id
    )[0];
    const { price } = cart.items.filter(
      (el) => el.item._id === item.item._id
    )[0].item;
    const newItems = cart.items.filter((el) => el.item._id !== item.item._id);
    const newCart: cart = {
      ...cart,
      quantity: cart.quantity - quantity,
      items: newItems,
      total: cart.total - price * quantity,
    };
    const res = await fetch("/api/change-cart", {
      method: "POST",
      body: JSON.stringify(newCart),
    });
    const resCart = await res.json();
    setCart(resCart);
  }
  const store = {
    cart,
    setCart,
    addToCart,
    removeItemFromCart,
  };
  return <CartContext.Provider value={store}>{children}</CartContext.Provider>;
};
export default CartContext;
