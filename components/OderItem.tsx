import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import order from "../interface/order";
interface Props {
  order: order;
}
const OrderItem: React.FC<Props> = ({ order }) => {
  const { items, quantity, orderedOn } = order;
  const orderedOnFormatted =
    orderedOn && new Date(orderedOn)?.toLocaleString().split(`,`)[0];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center bg-purple-600 text-white m-3 rounded-md transition-all">
      <div className="flex w-full justify-between">
        <p className="p-3 mr-auto">Order On: {orderedOnFormatted}</p>
        <button
          className="p-3"
          onClick={() => setIsOpen((previousVal) => !previousVal)}
        >
          Items{" "}
          {<FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />}
        </button>
      </div>
      <div className="flex flex-col w-full">
        {isOpen &&
          items.map((item, index) => (
            <div className="flex p-3 justify-between " key={Math.random()}>
              <div className="mx-2 text-xl mr-auto">
                {index + 1}. {item.title}
              </div>
              <div className="flex  mx-2 items-center">
                <p className="mx-2">Quantity: {quantity}</p>
                <p className="mx-2">Total: ${quantity}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderItem;
