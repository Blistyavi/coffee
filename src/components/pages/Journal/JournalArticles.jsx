import React from "react";
import "./JournalArticles.css";

const mockArticles = [
  {
    id: 1,
    title: "5 способов заваривания кофе дома",
    excerpt: "Узнайте, как правильно готовить кофе во френч-прессе, аэропрессе и других методах...",
    img: "https://source.unsplash.com/400x250/?coffee,brew"
  },
  {
    id: 2,
    title: "История эспрессо",
    excerpt: "Эспрессо – это сердце итальянской кофейной культуры. Расскажем, как он появился...",
    img: "https://source.unsplash.com/400x250/?coffee,history"
  },
  {
    id: 3,
    title: "Как выбрать кофе для дома",
    excerpt: "Арабика, робуста или смесь? Советы по выбору зерна и помола для разных способов приготовления...",
    img: "https://source.unsplash.com/400x250/?coffee,beans"
  }
];

export default function JournalArticles() {
  return (
    <section className="journal-articles container">
      <h2>Последние статьи</h2>
      <div className="articles-grid">
        {mockArticles.map((a) => (
          <div key={a.id} className="article-card">
            <div className="article-img">
              <img src={a.img} alt={a.title} />
            </div>
            <div className="article-body">
              <h3>{a.title}</h3>
              <p>{a.excerpt}</p>
              <button className="btn btn-ghost">Читать</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
