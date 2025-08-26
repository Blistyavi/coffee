import React, { useMemo } from "react";
import "./ReviewsList.css";

/**
 * Принимает reviews = [{ name, rating/ratingStore, delivery/ratingDelivery, text, date }, ...]
 * Поддерживает обе схемы имен: (rating, delivery) и (ratingStore, ratingDelivery).
 */
export default function AverageRating({ reviews = [] }) {
  const { avgStore, avgDelivery, count } = useMemo(() => {
    const count = reviews.length;
    if (!count) return { avgStore: 0, avgDelivery: 0, count: 0 };

    let sumStore = 0;
    let sumDelivery = 0;

    for (const r of reviews) {
      const store =
        typeof r.ratingStore === "number"
          ? r.ratingStore
          : typeof r.rating === "number"
          ? r.rating
          : 0;

      const del =
        typeof r.ratingDelivery === "number"
          ? r.ratingDelivery
          : typeof r.delivery === "number"
          ? r.delivery
          : 0;

      sumStore += store;
      sumDelivery += del;
    }

    return {
      avgStore: sumStore / count,
      avgDelivery: sumDelivery / count,
      count,
    };
  }, [reviews]);

  if (!count) return null;

  return (
    <div className="average-rating">
      <div className="avg-block">
        <span className="avg-label">Средняя оценка магазина</span>
        <span className="avg-rating-number">{avgStore.toFixed(1)}</span>
      </div>
      <div className="avg-block">
        <span className="avg-label">Средняя оценка доставки</span>
        <span className="avg-rating-number">{avgDelivery.toFixed(1)}</span>
      </div>
      <div className="avg-block">
        <span className="avg-label">Всего отзывов</span>
        <span className="avg-rating-number">{count}</span>
      </div>
    </div>
  );
}
