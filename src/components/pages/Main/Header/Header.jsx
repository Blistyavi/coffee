// src/components/layout/Header/Header.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiChevronDown,
  FiChevronUp,
  FiUser,
  FiSearch,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../../Auth/AuthContext";
import "./Header.css";
import Logo from "../../../../assets/logo.png";

const CLOSE_DELAY = 120; // задержка для плавного hover

export default function Header() {
  const { user } = useAuth();

  const [termsOpen, setTermsOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const navRef = useRef(null);
  const termsTimer = useRef(null);

  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // определяем touch-устройство
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const setFlag = () => setIsTouch(mq.matches);
    setFlag();
    mq.addEventListener?.("change", setFlag);
    return () => mq.removeEventListener?.("change", setFlag);
  }, []);

  // подтягиваем q из URL, если мы на /catalog
  useEffect(() => {
    if (location.pathname.startsWith("/catalog")) {
      const sp = new URLSearchParams(location.search);
      setQ(sp.get("q") || "");
    }
  }, [location.pathname, location.search]);

  // обработка клика вне / ESC
  useEffect(() => {
    const onDocClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setTermsOpen(false);
      }
    };
    const onEsc = (e) => e.key === "Escape" && setTermsOpen(false);
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  useEffect(() => () => clearTimeout(termsTimer.current), []);

  // dropdown helpers
  const onEnterTerms = () => {
    if (isTouch) return;
    clearTimeout(termsTimer.current);
    setTermsOpen(true);
  };
  const onLeaveTerms = () => {
    if (isTouch) return;
    clearTimeout(termsTimer.current);
    termsTimer.current = setTimeout(() => setTermsOpen(false), CLOSE_DELAY);
  };
  const toggleTerms = () => setTermsOpen((v) => !v);
  const closeAfterClick = () => setTimeout(() => setTermsOpen(false), 0);
  const closeAll = () => setTermsOpen(false);

  // поиск
  const onSubmitSearch = (e) => {
    e.preventDefault();
    const query = q.trim();
    if (query) navigate(`/catalog?q=${encodeURIComponent(query)}`);
    else navigate("/catalog");
    closeAll();
  };
  const onClearSearch = () => {
    setQ("");
    if (location.pathname.startsWith("/catalog")) {
      navigate("/catalog", { replace: true });
    }
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <header className="coffee-header">
      <div className="header-container">
        {/* Левая часть */}
        <div className="header-left">
          <Link to="/" className="logo-link" onClick={closeAll}>
            <img src={Logo} alt="Coffee Shop Logo" className="logo-img" />
          </Link>

          <nav className="main-nav" ref={navRef}>
            <Link to="/reviews" className="nav-link" onClick={closeAll}>
              ОТЗЫВЫ <span className="highlight-count">34.693</span>
            </Link>
            <Link to="/community" className="nav-link" onClick={closeAll}>
              СООБЩЕСТВО
            </Link>
            <Link to="/journal" className="nav-link" onClick={closeAll}>
              ЖУРНАЛ
            </Link>

            {/* УСЛОВИЯ РАБОТЫ */}
            <div
              className={`nav-item with-dropdown ${termsOpen ? "open" : ""}`}
              onMouseEnter={onEnterTerms}
              onMouseLeave={onLeaveTerms}
            >
              <button
                type="button"
                className="nav-link dd-trigger"
                onClick={toggleTerms}
                aria-expanded={termsOpen}
                aria-haspopup="menu"
              >
                УСЛОВИЯ РАБОТЫ{" "}
                <span className="dropdown-arrow">
                  {termsOpen ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </button>

              <div
                className={`dropdown-menu ${termsOpen ? "open" : ""}`}
                role="menu"
                aria-hidden={!termsOpen}
                onClick={(e) => e.stopPropagation()}
              >
                <Link to="/delivery" onClick={closeAfterClick}>
                  ДОСТАВКА И ОПЛАТА
                </Link>
                <Link to="/discounts" onClick={closeAfterClick}>
                  СИСТЕМА СКИДОК
                </Link>
                <Link to="/returns" onClick={closeAfterClick}>
                  ВОЗВРАТ ДЕНЕГ
                </Link>
                <Link to="/faq" onClick={closeAfterClick}>
                  ЧАСТЫЕ ВОПРОСЫ
                </Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Правая часть */}
        <div className="header-right">
          <form className="search-wrapper" onSubmit={onSubmitSearch}>
            <FiSearch className="search-icon" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Поиск по каталогу..."
              className="search-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && onClearSearch()}
            />
            {q && (
              <button
                type="button"
                className="search-clear"
                aria-label="Очистить поиск"
                title="Очистить"
                onClick={onClearSearch}
              >
                <FiX />
              </button>
            )}
          </form>

          {!user ? (
            <Link
              to="/register"
              className="auth-btn"
              onClick={closeAll}
              aria-label="Регистрация"
            >
              Регистрация
            </Link>
          ) : (
            <Link
              to="/account"
              className="account-link"
              aria-label="Личный кабинет"
              onClick={closeAll}
              title={user?.name ? `Аккаунт: ${user.name}` : "Аккаунт"}
            >
              <FiUser className="user-icon" />
            </Link>
          )}

          <Link
            to="/cart"
            className="cart-link"
            aria-label="Корзина"
            onClick={closeAll}
          >
            <FiShoppingBag className="cart-icon" />
          </Link>
        </div>
      </div>
    </header>
  );
}
