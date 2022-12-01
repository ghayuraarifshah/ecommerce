import { createContext } from "react";
import order from "../interface/order";
import user from "../interface/user";
import cart from "../interface/cart";
import item from "../interface/item";
type orderContextType = {
  placeOrder: (order: order, user: user) => Promise<void>;
  placeOrderFromCart: (cart: cart, user: user) => Promise<void>;
};

const OrderContext = createContext<orderContextType>({
  placeOrder: (order: order, user: user) => new Promise(() => {}),
  placeOrderFromCart: (cart: cart, user: user) => new Promise(() => {}),
});
interface Props {
  children: React.ReactNode;
}
export const OrderProvider: React.FC<Props> = ({ children }) => {
  async function placeOrder(order: order, user: user) {
    fetch("/api/place-order", {
      method: "POST",
      body: JSON.stringify({ userId: user._id, order: order }),
    });
  }
  async function placeOrderFromCart(cart: cart, user: user) {
    const items: item[][] = cart.items.map((el) => {
      const itemList = [];
      for (let i = 0; i !== el.quantity; i++) {
        itemList.push(el.item);
      }
      return itemList;
    });
    const newItems = items.flatMap((el) => el);
    const itemsId = newItems.map((el) => el._id);
    const order: order = {
      items: itemsId,
      orderedBy: user._id,
      quantity: cart.quantity,
      total: cart.total,
    };
    await fetch("/api/place-order", {
      method: "POST",
      body: JSON.stringify({ userId: user._id, order: order }),
    });
    const newCart: cart = {
      items: [],
      owner: user._id,
      quantity: 0,
      total: 0,
    };
    await fetch("/api/change-cart", {
      method: "POST",
      body: JSON.stringify({ newCart }),
    });
    return;
  }
  const store = { placeOrder, placeOrderFromCart };
  return (
    <OrderContext.Provider value={store}>{children}</OrderContext.Provider>
  );
};
export default OrderContext;
