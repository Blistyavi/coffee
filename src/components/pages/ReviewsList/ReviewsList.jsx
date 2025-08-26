import React, { useState } from "react";
import "./ReviewsList.css";
import AddReview from "./AddReview";
import AverageRating from "./AverageRating";

export default function ReviewsList() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Анна",
      ratingStore: 5,
      ratingDelivery: 4,
      text: "Очень вкусный кофе, сервис на высшем уровне!",
      date: "10.08.2025",
    },
    {
      id: 2,
      name: "Игорь",
      ratingStore: 4,
      ratingDelivery: 5,
      text: "Быстрая доставка, кофе понравился. Закажу ещё!",
      date: "05.08.2025",
    },
    {
      id: 3,
      name: "Мария",
      ratingStore: 5,
      ratingDelivery: 5,
      text: "Арабика просто супер! Спасибо команде.",
      date: "30.07.2025",
    },
  ]);

  const addReview = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  return (
    <>

      <section className="reviews-page container">
        <h2>Отзывы клиентов</h2>

        {/* средний рейтинг */}
        <AverageRating reviews={reviews} />

        {/* форма добавления отзыва */}
        <AddReview onAdd={addReview} />

        {/* список отзывов */}
        <div className="reviews-grid">
          {reviews.map((r) => (
            <div key={r.id} className="review-card">
              <div className="review-top">
                <span className="review-name">{r.name}</span>
                <span className="review-date">{r.date}</span>
              </div>

              <div className="review-rating">
                <strong>Магазин:</strong> {"★".repeat(r.ratingStore)}{"☆".repeat(5 - r.ratingStore)}
              </div>
              <div className="review-rating">
                <strong>Доставка:</strong> {"★".repeat(r.ratingDelivery)}{"☆".repeat(5 - r.ratingDelivery)}
              </div>

              <p className="review-text">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}
