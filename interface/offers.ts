import item from "./item";

type offers = {
  _id?: string;
  items: item;
  discount: number;
  category: string;
};
export default offers;
