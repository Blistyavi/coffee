import React, { useState } from "react";
import { Link } from "react-router-dom";
import B2BLeadModal from "../LeadModal/B2BLeadModal";   // <— модалка
import "./B2BFooter.css";

export default function B2BFooter() {
  const year = new Date().getFullYear();

  // локальная модалка в футере
  const [leadOpen, setLeadOpen] = useState(false);

  return (
    <footer className="b2b-footer">
      <div className="container b2b-foot-grid">
        <div className="b2b-foot-col">
          <h4>Оптовый отдел</h4>
          <p>Кофе, чай, аксессуары — поставки для HoReCa и розницы.</p>
        </div>

        <div className="b2b-foot-col">
          <h4>Навигация</h4>
          <ul>
            <li><Link to="/b2b/catalog">Каталог оптом</Link></li>
            <li><Link to="/b2b/prices">Цены</Link></li>
            <li><Link to="/b2b/delivery">Доставка</Link></li>
            <li><Link to="/b2b/payment">Оплата</Link></li>
          </ul>
        </div>

        <div className="b2b-foot-col">
          <h4>Документы</h4>
          <ul>
            <li><Link to="/b2b/docs/offer">Договор оферты</Link></li>
            <li><Link to="/b2b/docs/requisites">Реквизиты</Link></li>
            <li><Link to="/b2b/docs/certificates">Сертификаты</Link></li>
          </ul>
        </div>

        <div className="b2b-foot-col">
          <h4>Контакты</h4>
          <ul className="b2b-contacts">
            <li><a href="mailto:b2b@example.com">b2b@example.com</a></li>
            <li><a href="tel:+79990000000">+7 (999) 000-00-00</a></li>
            <li>Пн–Пт, 10:00–19:00</li>
          </ul>

          {/* Кнопка теперь открывает модалку */}
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setLeadOpen(true)}
          >
            Оставить заявку
          </button>
        </div>
      </div>

      <div className="b2b-foot-bottom">
        <div className="container b2b-foot-bottom-inner">
          <span>© {year} Coffee B2B. Все права защищены.</span>
          <div className="b2b-legal">
            <Link to="/policy">Политика конфиденциальности</Link>
            <Link to="/terms">Пользовательское соглашение</Link>
          </div>
        </div>
      </div>

      {/* Модалка заявки (футер) */}
      <B2BLeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />
    </footer>
  );
}
