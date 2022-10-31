import item from "./item";

type order = {
  items: item[];
  total: number;
  quantity: number;
  orderedBy: string;
};
export default order;
