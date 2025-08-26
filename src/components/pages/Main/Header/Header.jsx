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

const CLOSE_DELAY = 120; // чтобы выпадашка не хлопала

export default function Header() {
  const { user } = useAuth();

  // dropdown «Условия работы»
  const [termsOpen, setTermsOpen] = useState(false);
  const termsTimer = useRef(null);
  const navRef = useRef(null);

  // поиск
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  // подтягиваем q из URL когда мы в /catalog
  useEffect(() => {
    if (location.pathname.startsWith("/catalog")) {
      const sp = new URLSearchParams(location.search);
      setQ(sp.get("q") || "");
    }
  }, [location.pathname, location.search]);

  // клики-вне и ESC закрывают меню
  useEffect(() => {
    const onDocDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setTermsOpen(false);
      }
    };
    const onEsc = (e) => e.key === "Escape" && setTermsOpen(false);

    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  useEffect(() => () => clearTimeout(termsTimer.current), []);

  // helpers для dropdown
  const openTerms = () => {
    clearTimeout(termsTimer.current);
    setTermsOpen(true);
  };
  const closeTermsDelayed = () => {
    clearTimeout(termsTimer.current);
    termsTimer.current = setTimeout(() => setTermsOpen(false), CLOSE_DELAY);
  };
  const toggleTerms = () => setTermsOpen((v) => !v);
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
              onPointerEnter={openTerms}
              onPointerLeave={closeTermsDelayed}
            >
              <button
                type="button"
                className="nav-link"
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
              >
                <Link to="/delivery" onClick={closeAll}>
                  ДОСТАВКА И ОПЛАТА
                </Link>
                <Link to="/discounts" onClick={closeAll}>
                  СИСТЕМА СКИДОК
                </Link>
                <Link to="/returns" onClick={closeAll}>
                  ВОЗВРАТ ДЕНЕГ
                </Link>
                <Link to="/faq" onClick={closeAll}>
                  ЧАСТЫЕ ВОПРОСЫ
                </Link>
              </div>
            </div>
          </nav>
        </div>

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

          {/* Регистрация / Аккаунт */}
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

          {/* обычная страница корзины */}
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
