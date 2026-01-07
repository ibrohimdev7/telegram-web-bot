import { useEffect, useState } from "react";
import { getData } from "./constants/db";
import Card from "./components/card/card";
import Cart from "./components/cart/cart";
import type { ICardItem } from "./types";

import "./App.css";

const courses = getData();

const telegram = window.Telegram.WebApp;

const App = () => {
  const [cartItems, setCartItems] = useState<ICardItem[]>([]);

  useEffect(() => {
    telegram.ready();
  }, []);

  const onAddItem = (item: ICardItem) => {
    const existItem = cartItems.find((x) => x.id === item.id);

    if (existItem) {
      const data = cartItems.map((x) =>
        x.id === item.id ? { ...existItem, qty: (existItem?.qty || 0) + 1 } : x
      );
      setCartItems(data);
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }
  };

  const onRemoveItem = (item: ICardItem) => {
    const existItem = cartItems.find((x) => x.id === item.id);

    if (existItem?.qty === 1) {
      const newData = cartItems.filter((c) => c.id !== item?.id);
      setCartItems(newData);
    } else {
      const newData = cartItems.map((c) =>
        c.id === existItem?.id
          ? { ...existItem, qty: (existItem?.qty || 0) - 1 }
          : c
      );
      setCartItems(newData);
    }
  };

  const onCheckout = () => {
    telegram.MainButton.text = "Sotib olish :)";
    telegram.MainButton.show();
  };

  return (
    <>
      <h1 className="heading">Sammi kurslar</h1>

      <Cart cartItems={cartItems} onCheckout={onCheckout} />

      {/* Cart */}
      <div className="cards__container">
        {courses.map((course) => (
          <Card
            key={course?.id}
            course={course}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </>
  );
};

export default App;
