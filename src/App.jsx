// src/App.jsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Main layout
import Header from "./components/pages/Main/Header/Header";
import Footer from "./components/pages/Main/Footer/Footer";

// Catalog
import ProductCards from "./components/pages/Main/ProductCards/ProductCards";

// Auth
import { AuthProvider } from "./components/pages/Auth/AuthContext";
import RegisterPage from "./components/pages/Auth/RegisterPage";
import LoginPage from "./components/pages/Auth/LoginPage";
import AccountPage from "./components/pages/Auth/AccountPage";
import RequireAuth from "./components/pages/Auth/RequireAuth";
import MailRuCallback from "./components/pages/Auth/MailRuCallback";

// Cart
import { CartProvider } from "./components/pages/Main/context/CartContext";
import CartPage from "./components/pages/Cart/CartPage";
import MiniCartDrawer from "./components/pages/Main/cart/MiniCartDrawer";

// B2B
import B2BPage from "./components/pages/B2B/B2BPage";
import ReviewsList from "./components/pages/ReviewsList/ReviewsList";
import CommunityPage from "./components/pages/Community/CommunityPage";
import JournalPage from "./components/pages/Journal/JournalPage";
import DeliveryPage from "./components/pages/Info/DeliveryPage";
import DiscountsPage from "./components/pages/Info/DiscountsPage";
import ReturnsPage from "./components/pages/Info/ReturnsPage";
import FAQPage from "./components/pages/Info/FAQPage";

/** Главная */
function HomePage() {
  return <ProductCards />;
}

/** Каталог */
function CatalogPage() {
  return <ProductCards />;
}

export default function App() {
  const location = useLocation();
  const isB2B = location.pathname.startsWith("/b2b");

  return (
    <AuthProvider>
      <CartProvider>
        {!isB2B && <Header />}
        {/* Глобальная мини-корзина — не показываем на B2B */}
        {!isB2B && <MiniCartDrawer />}

        <main className={`page-main ${isB2B ? "page-main--b2b" : ""}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/community" element={<CommunityPage />} /> 
            <Route path="/reviews" element={<ReviewsList />} />
            <Route path="/journal" element={<JournalPage />} /> 
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/discounts" element={<DiscountsPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/faq" element={<FAQPage />} />

            {/* Регистрация / Вход */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Личный кабинет — только для авторизованных */}
            <Route
              path="/account"
              element={
                <RequireAuth>
                  <AccountPage />
                </RequireAuth>
              }
            />

            {/* Корзина */}
            <Route path="/cart" element={<CartPage />} />

            {/* B2B (со своим Header/Footer внутри страницы) */}
            <Route path="/b2b/*" element={<B2BPage />} />

            {/* OAuth Mail.ru callback */}
            <Route path="/oauth/mailru/callback" element={<MailRuCallback />} />

            {/* 404 → домой */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {!isB2B && <Footer />}
      </CartProvider>
    </AuthProvider>
  );
}
