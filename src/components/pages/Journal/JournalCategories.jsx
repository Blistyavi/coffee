import React, { useState } from "react";
import "./JournalCategories.css";

const categories = ["Все", "Рецепты", "Обжарка", "История", "Советы"];

export default function JournalCategories({ onSelect }) {
  const [active, setActive] = useState("Все");

  const handleClick = (cat) => {
    setActive(cat);
    onSelect(cat);
  };

  return (
    <div className="journal-cats container">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`cat-btn ${active === cat ? "active" : ""}`}
          onClick={() => handleClick(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
