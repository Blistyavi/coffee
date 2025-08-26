import React from "react";
import "./ReviewsList.css";

export default function AverageRating({ reviews }) {
  if (reviews.length === 0) return null;

  const avgStore =
    reviews.reduce((sum, r) => sum + r.ratingStore, 0) / reviews.length;
  const avgDelivery =
    reviews.reduce((sum, r) => sum + r.ratingDelivery, 0) / reviews.length;

  return (
    <div className="average-rating">
      <div>
        <span className="avg-label">Средняя оценка магазина:</span>
        <span className="avg-rating-number">{avgStore.toFixed(1)}</span>
      </div>
      <div>
        <span className="avg-label">Средняя оценка доставки:</span>
        <span className="avg-rating-number">{avgDelivery.toFixed(1)}</span>
      </div>
    </div>
  );
}
