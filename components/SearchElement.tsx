import Link from "next/link";
import { FC } from "react";
import item from "../interface/item";
interface SearchElemenProps {
  item: item;
}

const SearchElemen: FC<SearchElemenProps> = ({ item }) => {
  return (
    <Link href={`/items/${item._id}`}>
      <div className="search-element w-full mx-3 flex justify-between text-white bg-purple-500 rounded-lg my-3 px-2 py-2 cursor-pointer">
        <p>{item.title}</p>
        <p>{item.price}</p>
      </div>
    </Link>
  );
};

export default SearchElemen;
