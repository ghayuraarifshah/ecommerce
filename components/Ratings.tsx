import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { RatingsProp } from "./Item";

export const Ratings: React.FC<RatingsProp> = ({ ratings }) => {
  const item = [];
  for (let i = 1; i !== 6; i++) {
    const classname = i < ratings ? "text-yellow-300" : "text-grey-600";
    item.push(
      <FontAwesomeIcon
        icon={i < ratings ? faStar : faStarOutline}
        key={Math.random()}
        className={classname}
      />
    );
  }
  return <div className="">{item}</div>;
};
