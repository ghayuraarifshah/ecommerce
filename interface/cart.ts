import item from "./item";

type cart = {
  _id?: string;
  items: { item: item; quantity: number }[];
  total: number;
  quantity: number;
  owner: string;
};

export default cart;
