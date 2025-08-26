import React from "react";
import "./JournalFeatured.css";

export default function JournalFeatured() {
  return (
    <section className="journal-featured">
      <div className="container">
        <div className="featured-card">
          <img src="https://source.unsplash.com/1000x400/?coffee,cafe" alt="Featured" />
          <div className="featured-content">
            <h2>Спешиалти кофе: что это?</h2>
            <p>
              Разбираемся, чем отличается спешиалти кофе от обычного и стоит ли переплачивать.
            </p>
            <button className="btn btn-dark">Читать</button>
          </div>
        </div>
      </div>
    </section>
  );
}
