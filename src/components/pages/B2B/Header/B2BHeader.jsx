import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiChevronDown,
  FiChevronUp,
  FiFileText,
  FiUser,
  FiLogIn,
} from "react-icons/fi";
import { useAuth } from "../../Auth/AuthContext";
import B2BLeadModal from "../LeadModal/B2BLeadModal";   // <— модалка
import Logo from "../../../../assets/logo.png";
import "./B2BHeader.css";

const CLOSE_DELAY = 120;

export default function B2BHeader() {
  // если контекст недоступен — не ломаемся
  const { user } = useAuth?.() ?? { user: null };

  const [docsOpen, setDocsOpen] = useState(false);
  const docsTimer = useRef(null);
  const navRef = useRef(null);

  // управление модалкой «Оставить заявку»
  const [leadOpen, setLeadOpen] = useState(false);
  const openLead = () => {
    setDocsOpen(false);
    setLeadOpen(true);
  };

  useEffect(() => () => clearTimeout(docsTimer.current), []);

  // клик вне и ESC — закрыть меню документов
  useEffect(() => {
    const onDoc = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setDocsOpen(false);
      }
    };
    const onEsc = (e) => e.key === "Escape" && setDocsOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const openDocs = () => {
    clearTimeout(docsTimer.current);
    setDocsOpen(true);
  };
  const closeDocsDelayed = () => {
    clearTimeout(docsTimer.current);
    docsTimer.current = setTimeout(() => setDocsOpen(false), CLOSE_DELAY);
  };
  const toggleDocs = () => setDocsOpen((v) => !v);

  return (
    <header className="b2b-header">
      {/* Верхняя полоска контактов */}
      <div className="b2b-topbar">
        <div className="container b2b-topbar-inner">
          <a href="mailto:b2b@example.com" className="b2b-top-link">
            b2b@example.com
          </a>
          <a href="tel:+79990000000" className="b2b-top-link">
            +7 (999) 000-00-00
          </a>
        </div>
      </div>

      <div className="container b2b-row">
        <Link to="/" className="b2b-logo">
          <img src={Logo} alt="Coffee B2B" />
          <span>Оптовый отдел</span>
        </Link>

        <nav className="b2b-nav" ref={navRef}>
          <Link to="/b2b/catalog" className="b2b-link">
            Каталог оптом
          </Link>
          <Link to="/b2b/prices" className="b2b-link">
            Цены
          </Link>
          <Link to="/b2b/delivery" className="b2b-link">
            Доставка
          </Link>
          <Link to="/b2b/payment" className="b2b-link">
            Оплата
          </Link>

          {/* Документы с выпадающим меню */}
          <div
            className={`b2b-dd ${docsOpen ? "open" : ""}`}
            onPointerEnter={openDocs}
            onPointerLeave={closeDocsDelayed}
          >
            <button
              type="button"
              className="b2b-link dd-trigger"
              onClick={toggleDocs}
              aria-expanded={docsOpen}
              aria-haspopup="menu"
            >
              <FiFileText />
              Документы
              <span className="dd-arrow">
                {docsOpen ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </button>

            <div
              className={`dd-menu ${docsOpen ? "open" : ""}`}
              role="menu"
              aria-hidden={!docsOpen}
            >
              <Link to="/b2b/docs/offer" className="dd-item">
                Договор оферты
              </Link>
              <Link to="/b2b/docs/requisites" className="dd-item">
                Реквизиты
              </Link>
              <Link to="/b2b/docs/certificates" className="dd-item">
                Сертификаты
              </Link>
            </div>
          </div>

          <Link to="/b2b/contacts" className="b2b-link">
            Контакты
          </Link>
        </nav>

        <div className="b2b-actions">
          {/* CTA: заявка на опт — открываем модалку */}
          <button type="button" className="btn btn-dark btn-sm" onClick={openLead}>
            Оставить заявку
          </button>

          {/* Авторизация / ЛК */}
          {!user ? (
            <Link to="/login" className="b2b-auth">
              <FiLogIn />
              Войти
            </Link>
          ) : (
            <Link to="/account" className="b2b-auth" title={user?.name || "Аккаунт"}>
              <FiUser />
              ЛК
            </Link>
          )}
        </div>
      </div>

      {/* Модалка заявки */}
      <B2BLeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />
    </header>
  );
}
