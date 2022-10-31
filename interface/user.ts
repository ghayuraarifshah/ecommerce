import item from "./item";
import order from "./order";
type user = {
  _id: any;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  billingAddress: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: number;
  };
  shippingAdress: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: number;
  };
  favorites: item;
  orders: order;
};
export default user;
