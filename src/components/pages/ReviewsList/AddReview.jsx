import React, { useState } from "react";
import "./ReviewsList.css";

export default function AddReview({ onAdd }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [ratingStore, setRatingStore] = useState(5);
  const [ratingDelivery, setRatingDelivery] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !text) return;

    const newReview = {
      id: Date.now(),
      name,
      text,
      ratingStore,
      ratingDelivery,
      date: new Date().toLocaleDateString("ru-RU"),
    };

    onAdd(newReview);

    setName("");
    setText("");
    setRatingStore(5);
    setRatingDelivery(5);
  };

  return (
    <form className="add-review" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Ваш отзыв"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <label>
        Оценка магазина:
        <select value={ratingStore} onChange={(e) => setRatingStore(+e.target.value)}>
          {[5, 4, 3, 2, 1].map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </label>

      <label>
        Оценка доставки:
        <select value={ratingDelivery} onChange={(e) => setRatingDelivery(+e.target.value)}>
          {[5, 4, 3, 2, 1].map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </label>

      <button type="submit">Оставить отзыв</button>
    </form>
  );
}
