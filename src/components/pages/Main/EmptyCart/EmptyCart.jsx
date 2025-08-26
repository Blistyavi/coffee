import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './EmptyCart.css';

const EmptyCart = () => {
  const { closeCart } = useCart();
  const navigate = useNavigate();

  const goToCatalog = (e) => {
    e.preventDefault();
    closeCart();        // закрываем мини-корзину
    navigate('/catalog'); // переходим в каталог
  };

  return (
    <div className="empty-cart">
      <div className="empty-cart-content">
        <h2 className="empty-cart-title">КОРЗИНА ПУСТА</h2>
        <p className="empty-cart-text">Давайте что-нибудь выберем в каталоге</p>

        {/* кнопка вместо Link — надёжно работает внутри оффканваса */}
        <button type="button" className="empty-cart-button" onClick={goToCatalog}>
          В КАТАЛОГ
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
