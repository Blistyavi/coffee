import React from "react";
import "./DiscountsPage.css";

export default function DiscountsPage() {
  return (
    <section className="discounts container">
      <header className="discounts-hero">
        <h1 className="discounts-title">Система скидок</h1>
        <p className="discounts-lead">
          Мы ценим постоянных клиентов и предлагаем прозрачную систему скидок —
          чем больше вы заказываете, тем выгоднее цена.
        </p>
      </header>

      <div className="discounts-content">
        <section className="disc-section">
          <h2>Накопительные скидки</h2>
          <p>
            Скидка применяется автоматически в зависимости от суммы ваших заказов
            за последние 12 месяцев:
          </p>
          <table className="disc-table">
            <tbody>
              <tr>
                <td>от 10 000 ₽</td>
                <td>5%</td>
              </tr>
              <tr>
                <td>от 25 000 ₽</td>
                <td>7%</td>
              </tr>
              <tr>
                <td>от 50 000 ₽</td>
                <td>10%</td>
              </tr>
              <tr>
                <td>от 100 000 ₽</td>
                <td>15%</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="disc-section">
          <h2>Бонусная программа</h2>
          <ul className="list-markers">
            <li>За каждый заказ начисляем <b>3% бонусами</b>.</li>
            <li>1 бонус = 1 рубль, можно оплатить до 20% корзины.</li>
            <li>Бонусы активируются через 3 дня после получения заказа.</li>
          </ul>
        </section>

        <section className="disc-section">
          <h2>Промокоды</h2>
          <p>
            Следите за нашими акциями и e-mail рассылкой — мы регулярно отправляем
            персональные промокоды на скидки и бесплатную доставку.
          </p>
        </section>

        <section className="disc-section">
          <h2>Скидки для HoReCa и опта</h2>
          <p>
            Для кофеен, ресторанов и магазинов действует отдельная{" "}
            <a href="/b2b" className="link">оптовая программа</a>. Условия индивидуальные
            и зависят от объёмов закупки.
          </p>
        </section>

        <section className="disc-section">
          <h2>Частые вопросы</h2>
          <ul className="list-plain">
            <li>
              <b>Скидки суммируются?</b> — Нет, применяется наибольшая из доступных.
            </li>
            <li>
              <b>Можно использовать бонусы и промокод одновременно?</b> — Да.
            </li>
            <li>
              <b>Как узнать свою скидку?</b> — В личном кабинете в разделе «Мои заказы».
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
}
