import { useState } from "react";
import type { ICardItem } from "../../types";
import Button from "../button/button";

import "./card.css";

interface CardProps {
  course: ICardItem;
  onAddItem: (item: ICardItem) => void;
  onRemoveItem: (item: ICardItem) => void;
}

const Card = ({ course, onAddItem, onRemoveItem }: CardProps) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    onAddItem(course);
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
    onRemoveItem(course);
  };

  return (
    <div className="card">
      <span className={`${count !== 0 ? "card__badge" : "card__badge-hidden"}`}>
        {count}
      </span>

      <div className="image__container">
        <img
          src={course?.image}
          alt={course?.title}
          width={"100%"}
          height={230}
        />
      </div>

      <div className="card__body">
        <h2 className="card__title">{course?.title}</h2>

        <div className="card__price">
          {course?.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
      </div>

      <div className="hr" />

      <div className="btn__container">
        <Button title="+" type="add" onClick={handleIncrement} />
        {count > 0 && (
          <Button title="-" type="remove" onClick={handleDecrement} />
        )}
      </div>
    </div>
  );
};

export default Card;
