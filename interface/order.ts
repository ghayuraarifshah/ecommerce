import item from "./item";

type order = {
  _id?: string;
  items: item[];
  total: number;
  quantity: number;
  orderedBy: string;
  orderedOn?: string;
};
export default order;
