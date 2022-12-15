import { FC, useEffect, useState } from "react";
import item from "../interface/item";
import SearchElemen from "./SearchElement";
import { Router } from "next/router";

interface SearchModalProps {
  isOpen: boolean;
  close: () => void;
}

const SearchModal: FC<SearchModalProps> = ({ isOpen, close }) => {
  const [toBeDisplayedItems, setToBeDisplayedItems] = useState<item[]>();
  async function onChange(val: string) {
    const req = await fetch("/api/search-items", {
      method: "POST",
      body: JSON.stringify({ str: val }),
    });
    const { items } = await req.json();
    setToBeDisplayedItems(items);
  }
  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      close();
    });
  }, []);
  return (
    <>
      <div
        className={` top-0 left-0 bg-white opacity-50 w-[100vw] h-[100vh] z-40 ${
          isOpen ? "fixed" : "hidden"
        }`}
      ></div>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-5 h-1/2 rounded-lg ${
          isOpen ? "fixed" : "hidden"
        } bg-white shadow-xl`}
      >
        <input
          type="text"
          name="Search"
          placeholder="Search"
          className="w-[50vw] focus-visible:outline-none border-b border-gray-500 py-2"
          onChange={({ currentTarget }) => onChange(currentTarget.value)}
        />
        <div className="my-2 h-5/6 overflow-scroll">
          {toBeDisplayedItems?.map((el) => {
            return <SearchElemen item={el} />;
          })}
        </div>
      </div>
    </>
  );
};

export default SearchModal;
