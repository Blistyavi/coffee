import React from "react";
import "./JournalSubscribe.css";

export default function JournalSubscribe() {
  return (
    <section className="journal-subscribe">
      <div className="container">
        <h3>Подпишитесь на наш журнал</h3>
        <p>Получайте лучшие статьи о кофе каждую неделю</p>
        <form>
          <input type="email" placeholder="Ваш email" required />
          <button className="btn btn-dark">Подписаться</button>
        </form>
      </div>
    </section>
  );
}
