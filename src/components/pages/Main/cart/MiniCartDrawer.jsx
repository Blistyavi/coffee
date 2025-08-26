import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import EmptyCart from '../EmptyCart/EmptyCart';
import './MiniCartDrawer.css';

const formatPrice = (n) =>
  typeof n === 'number' ? n.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }) : '—';

const MiniCartDrawer = () => {
  const { isOpen, closeCart, items, itemsCount, subtotal, increment, decrement, removeItem } = useCart();

  // lock scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [isOpen]);

  return (
    <>
      <div className={`mc-overlay ${isOpen ? 'open' : ''}`} onClick={closeCart} />
      <aside className={`mc-drawer ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Мини-корзина">
        <div className="mc-header">
          <h3>Корзина <span className="mc-count">({itemsCount})</span></h3>
          <button className="mc-close" onClick={closeCart} aria-label="Закрыть">✕</button>
        </div>

        <div className="mc-body">
          {items.length === 0 ? (
            <div className="mc-empty-wrap">
              <EmptyCart />
            </div>
          ) : (
            <ul className="mc-list">
              {items.map((it) => (
                <li className="mc-item" key={`${it.productId}-${it.form}`}>
                  <div className="mc-thumb">
                    {it.image ? <img src={it.image} alt={it.name} /> : <div className="mc-thumb-ph" />}
                  </div>
                  <div className="mc-info">
                    <div className="mc-title">{it.name}</div>
                    <div className="mc-meta">Форма: <b>{it.form}</b></div>
                    <div className="mc-row">
                      <div className="mc-qty">
                        <button onClick={() => decrement(it.productId, it.form)}>-</button>
                        <span>{it.qty}</span>
                        <button onClick={() => increment(it.productId, it.form)}>+</button>
                      </div>
                      <div className="mc-price">{formatPrice(it.price)}</div>
                    </div>
                  </div>
                  <button className="mc-remove" onClick={() => removeItem(it.productId, it.form)} aria-label="Удалить">
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mc-footer">
          <div className="mc-total">
            <span>Итого</span>
            <b>{subtotal == null ? `${itemsCount} шт.` : formatPrice(subtotal)}</b>
          </div>
          <div className="mc-actions">
            <Link to="/cart" className="mc-btn ghost" onClick={closeCart}>В корзину</Link>
            <Link to="/checkout" className="mc-btn">Оформить</Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MiniCartDrawer;
