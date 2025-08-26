import React, { useState } from "react";
import "./ReviewsList.css";

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave, label, idx }) => (
  <button
    type="button"
    className={`star ${filled ? "active" : ""}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    aria-label={`${label}: ${idx} из 5`}
  >
    ★
  </button>
);

export default function AddReview({ onAdd }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [ratingStore, setRatingStore] = useState(0);
  const [ratingDelivery, setRatingDelivery] = useState(0);

  // для hover-подсветки
  const [hoverStore, setHoverStore] = useState(0);
  const [hoverDelivery, setHoverDelivery] = useState(0);

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || ratingStore === 0 || ratingDelivery === 0) {
      setError("Пожалуйста, заполните имя, отзыв и выберите обе оценки (магазин и доставка).");
      return;
    }
    const newReview = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      ratingStore,
      ratingDelivery,
      date: new Date().toLocaleDateString("ru-RU"),
    };
    onAdd?.(newReview);
    // сброс
    setName("");
    setText("");
    setRatingStore(0);
    setRatingDelivery(0);
    setHoverStore(0);
    setHoverDelivery(0);
    setError("");
  };

  return (
    <form className="add-review" onSubmit={handleSubmit}>
      <div className="ar-head">
        <h3>Оставить отзыв</h3>
        <p>Поделитесь впечатлениями о магазине и доставке.</p>
      </div>

      {error && <div className="ar-alert">{error}</div>}

      <div className="row">
        <div className="field">
          <label htmlFor="arName">Ваше имя</label>
          <input
            id="arName"
            placeholder="Например, Анна"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
          />
        </div>

        <div className="field">
          <label>Оценка магазина</label>
          <div className="stars" role="radiogroup" aria-label="Оценка магазина">
            {[1,2,3,4,5].map((i) => (
              <Star
                key={i}
                idx={i}
                label="Оценка магазина"
                filled={(hoverStore || ratingStore) >= i}
                onClick={() => setRatingStore(i)}
                onMouseEnter={() => setHoverStore(i)}
                onMouseLeave={() => setHoverStore(0)}
              />
            ))}
            <span className="stars-value">{ratingStore || "-"}</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="arText">Ваш отзыв</label>
          <textarea
            id="arText"
            placeholder="Что понравилось? Что можно улучшить?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Оценка доставки</label>
          <div className="stars" role="radiogroup" aria-label="Оценка доставки">
            {[1,2,3,4,5].map((i) => (
              <Star
                key={i}
                idx={i}
                label="Оценка доставки"
                filled={(hoverDelivery || ratingDelivery) >= i}
                onClick={() => setRatingDelivery(i)}
                onMouseEnter={() => setHoverDelivery(i)}
                onMouseLeave={() => setHoverDelivery(0)}
              />
            ))}
            <span className="stars-value">{ratingDelivery || "-"}</span>
          </div>
        </div>
      </div>

      <div className="actions">
        <button type="submit" className="btn-primary">Оставить отзыв</button>
      </div>
    </form>
  );
}
