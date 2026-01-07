import type { ICardItem } from "../../types";
import Button from "../button/button";

import "./cart.css";

interface CartProps {
  cartItems: ICardItem[];

  onCheckout: () => void;
}

const Cart = ({ cartItems, onCheckout }: CartProps) => {
  return (
    <div className="cart__container">
      <p>
        Umumiy narx:{" "}
        {cartItems?.reduce(
          (sum, item) => (sum += item?.price) * (item?.qty || 1),
          0
        )}
      </p>

      <Button
        title={`${cartItems?.length === 0 ? "Buyurtma berish" : "To'lov"}`}
        type="checkout"
        disabled={cartItems?.length === 0}
        onClick={onCheckout}
      />
    </div>
  );
};

export default Cart;
