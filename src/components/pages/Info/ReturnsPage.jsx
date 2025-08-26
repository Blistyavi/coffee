import React from "react";
import "./ReturnsPage.css";

export default function ReturnsPage() {
  return (
    <section className="returns container">
      <header className="returns-hero">
        <h1 className="returns-title">Возврат денег</h1>
        <p className="returns-lead">
          Мы всегда помогаем, если что-то пошло не так: оформим обмен или вернём
          деньги согласно закону «О защите прав потребителей» и нашим правилам.
        </p>
      </header>

      <div className="returns-content">
        <section className="ret-section">
          <h2>Когда возможен возврат</h2>
          <ul className="list-markers">
            <li>
              <b>Надлежащее качество (непродовольственные позиции):</b> не подошёл товар,
              комплектация/совместимость — в течение <b>7 дней</b> при сохранении товарного
              вида и упаковки.
            </li>
            <li>
              <b>Ненадлежащее качество (любой товар):</b> брак, повреждение при доставке,
              несоответствие заказу — в течение гарантийного срока или разумного срока.
            </li>
            <li>
              <b>Продукты питания (кофе, чай):</b> возврат возможен только при выявленном
              браке/порче или ошибке комплектации.
            </li>
          </ul>
        </section>

        <section className="ret-section">
          <h2>Как оформить возврат</h2>
          <ol className="list-steps">
            <li>
              Напишите нам на <a className="link" href="mailto:support@example.com">support@example.com</a> или в чат.
            </li>
            <li>
              Укажите номер заказа, причину возврата и приложите фото/видео при необходимости.
            </li>
            <li>
              Мы подтвердим запрос и направим инструкции по отправке обратно или предложим забор курьером.
            </li>
          </ol>
          <div className="ret-note glass">
            Для ускорения решения приложите фото коробки, ярлыков и самого товара. Это поможет нам быстрее всё проверить.
          </div>
        </section>

        <section className="ret-section">
          <h2>Сроки и способ возврата денег</h2>
          <ul className="list-plain">
            <li>
              Проверка и одобрение возврата — до <b>3 рабочих дней</b> с момента получения товара на склад.
            </li>
            <li>
              Возврат средств — на тот же способ оплаты: карта/счёт — <b>1–5 рабочих дней</b>,
              электронные кошельки — обычно <b>мгновенно–3 дня</b>.
            </li>
            <li>
              Если оплачивали бонусами/промокодом — вернём бонусы/применим новый промокод.
            </li>
          </ul>
        </section>

        <section className="ret-section">
          <h2>Доставка при возврате</h2>
          <p>
            Если возврат по нашей ошибке (брак/ошибка комплектации) — доставку оплачиваем мы.
            Если по иным причинам — доставка до нашего склада за счёт покупателя.
          </p>
        </section>

        <section className="ret-section">
          <h2>Обмен</h2>
          <p>
            Можно оформить обмен на аналогичный/другой товар. Уточним разницу в цене и условия
            доставки. Сроки обработки те же, что и при возврате.
          </p>
        </section>

        <section className="ret-section">
          <h2>FAQ</h2>
          <ul className="list-plain">
            <li>
              <b>Нужен чек?</b> — Да, электронный чек/выписка из банка подойдут.
            </li>
            <li>
              <b>Упаковку вскрыл — вернут деньги?</b> — Для брака/несоответствия да; для возврата
              надлежащего качества упаковка/товарный вид должны быть сохранены.
            </li>
            <li>
              <b>Сколько идёт курьер за возвратом?</b> — Обычно 1–3 дня по графику службы доставки.
            </li>
          </ul>
        </section>

        <section className="ret-section ret-contacts">
          <h2>Контакты для возврата</h2>
          <div className="ret-contacts-grid">
            <div>
              <div className="ret-kv">
                <span>Почта:</span>
                <a className="link" href="mailto:support@example.com">support@example.com</a>
              </div>
              <div className="ret-kv">
                <span>Телефон:</span>
                <a className="link" href="tel:+79990000000">+7 (999) 000-00-00</a>
              </div>
            </div>
            <div>
              <div className="ret-kv">
                <span>Адрес склада:</span>
                <p>Москва, ул. Примерная, 10, будни 10:00–19:00</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
