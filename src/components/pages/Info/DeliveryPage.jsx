import React from "react";
import "./DeliveryPage.css";

export default function DeliveryPage() {
  return (
    <section className="delivery container">
      <header className="delivery-hero">
        <h1 className="delivery-title">Доставка и оплата</h1>
        <p className="delivery-lead">
          Отправляем свежий кофе по всей России удобными способами. Здесь — кратко и по делу:
          как доставляем, сколько это стоит и как оплатить заказ.
        </p>
      </header>

      <div className="delivery-grid">
        {/* левая колонка — основной текст */}
        <div className="delivery-main">
          <section className="del-section">
            <h2>Способы доставки</h2>
            <ul className="list-markers">
              <li>
                <b>Курьер до двери</b> — партнёры (СДЭК/Boxberry/Яндекс) привезут заказ в удобное время.
              </li>
              <li>
                <b>Пункты выдачи</b> — заберите посылку в ближайшем ПВЗ. Удобно, если днём вы на работе.
              </li>
              <li>
                <b>Почта России</b> — для населённых пунктов без курьерской сети.
              </li>
              <li>
                <b>Самовывоз</b> — из нашего пункта (уточняйте адрес и режим работы на странице «Контакты»).
              </li>
            </ul>
          </section>

          <section className="del-section">
            <h2>Сроки</h2>
            <ul className="list-plain">
              <li><b>Москва и МО:</b> обычно 1–2 рабочих дня.</li>
              <li><b>Крупные города:</b> 2–4 рабочих дня.</li>
              <li><b>Отдалённые регионы:</b> 4–8 рабочих дней (зависит от логистики).</li>
            </ul>
            <p className="muted">
              Сроки ориентировочные и зависят от адреса, загруженности служб и праздничных дней.
            </p>
          </section>

          <section className="del-section">
            <h2>Стоимость доставки</h2>
            <div className="del-card">
              <table className="del-table">
                <tbody>
                  <tr>
                    <td>Пункты выдачи</td>
                    <td>от 199 ₽</td>
                  </tr>
                  <tr>
                    <td>Курьер до двери</td>
                    <td>от 299 ₽</td>
                  </tr>
                  <tr>
                    <td>Почта России</td>
                    <td>по тарифам оператора</td>
                  </tr>
                </tbody>
              </table>
              <p className="muted">* Точные сроки и стоимость считаются на шаге оформления по вашему адресу.</p>
            </div>
          </section>

          <section className="del-section">
            <h2>Оплата</h2>
            <ul className="list-markers">
              <li><b>Банковские карты</b> — Visa/Mastercard/МИР.</li>
              <li><b>СБП</b> — быстрые платежи по QR.</li>
              <li><b>Наличными/картой</b> — при самовывозе (если требуется чек ККТ — сообщите заранее).</li>
            </ul>
          </section>

          <section className="del-section">
            <h2>Свежесть и упаковка</h2>
            <p>
              Мы жарим небольшими партиями и упаковываем в пакеты с клапаном дегазации. Каждый пакет — с
              датой обжарки. Для транспортировки используем дополнительную защитную тару.
            </p>
          </section>

          <section className="del-section">
            <h2>Отслеживание</h2>
            <p>
              После отправки вы получите трек-номер на e-mail и в личном кабинете. Статус можно отслеживать на
              сайте перевозчика или у нас в «Моих заказах».
            </p>
          </section>

          <section className="del-section">
            <h2>Вопросы</h2>
            <p>
              Если остались вопросы по доставке или оплате — напишите нам на{" "}
              <a className="link" href="mailto:support@example.com">support@example.com</a>{" "}
              или позвоните <a className="link" href="tel:+79990000000">+7 (999) 000-00-00</a>. Мы на связи в будни с 10:00 до 19:00.
            </p>
          </section>
        </div>

        {/* правая колонка — короткое резюме/подсказки */}
        <aside className="delivery-aside">
          <div className="del-card">
            <h3 className="aside-title">Коротко</h3>
            <ul className="aside-list">
              <li>Доставляем по РФ курьером/ПВЗ/Почтой</li>
              <li>Срок 1–8 рабочих дней</li>
              <li>Оплата картой, СБП, при самовывозе</li>
              <li>Трек-номер в день отправки</li>
            </ul>
            <a className="btn btn-dark btn-wide" href="/catalog">В каталог</a>
          </div>

          <div className="del-card hint">
            <p className="muted">
              Оформляете большой заказ для офиса, кофейни или магазина? Посмотрите наш{" "}
              <a className="link" href="/b2b">оптовый раздел</a>.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
