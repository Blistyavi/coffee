import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Main/context/CartContext';
import './CartPage.css';

const formatPrice = (n) =>
  typeof n === 'number'
    ? n.toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
      })
    : '—';

const CartPage = () => {
  const {
    items,
    itemsCount,
    subtotal,
    increment,
    decrement,
    removeItem,
    clearCart,
    closeCart, // закрытие мини-корзины из контекста
  } = useCart();

  const lineTotal = (it) =>
    typeof it.price === 'number' ? it.price * it.qty : null;

  return (
    <div className="cart-page container">
      <h1 className="cart-title">
        Корзина <span>({itemsCount})</span>
      </h1>

      {items.length === 0 ? (
        <div className="cart-empty">
          <h3>Корзина пуста</h3>
          <p>Загляните в каталог и добавьте что-нибудь вкусное ☕</p>
          <Link to="/catalog" className="btn btn-dark" onClick={closeCart}>
            В каталог
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {items.map((it) => {
              const lt = lineTotal(it);
              return (
                <div className="cart-item card" key={`${it.productId}-${it.form}`}>
                  <div className="ci-thumb">
                    {it.image ? (
                      <img src={it.image} alt={it.name} />
                    ) : (
                      <div className="ci-ph" />
                    )}
                  </div>

                  <div className="ci-main">
                    <div className="ci-row">
                      <div className="ci-name">{it.name}</div>
                      <button
                        className="ci-remove"
                        onClick={() => removeItem(it.productId, it.form)}
                        aria-label="Удалить"
                        title="Удалить товар"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="ci-meta">
                      Форма: <b>{it.form}</b>
                    </div>

                    <div className="ci-controls">
                      <div className="qty">
                        <button
                          onClick={() => decrement(it.productId, it.form)}
                          aria-label="Минус"
                          title="Уменьшить количество"
                        >
                          −
                        </button>
                        <span>{it.qty}</span>
                        <button
                          onClick={() => increment(it.productId, it.form)}
                          aria-label="Плюс"
                          title="Увеличить количество"
                        >
                          +
                        </button>
                      </div>

                      <div className="ci-price">
                        {formatPrice(it.price)}
                        {/* ВСЕГДА рендерим подстроку -> стабильная высота блока цены */}
                        <span className="ci-line-total">
                          {lt != null ? (
                            <>
                              × {it.qty} = {formatPrice(lt)}
                            </>
                          ) : (
                            '\u00A0' /* тонкий неразрывный пробел как заглушка */
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Большой минус — сразу удаляет позицию (desktop/tablet) */}
                  <button
                    className="ci-kill"
                    aria-label="Удалить товар"
                    title="Удалить товар"
                    onClick={() => removeItem(it.productId, it.form)}
                  >
                    &mdash;
                  </button>
                </div>
              );
            })}

            <div className="cart-actions-left">
              <button className="btn btn-outline" onClick={clearCart}>
                Очистить корзину
              </button>
              <Link to="/catalog" className="btn btn-ghost" onClick={closeCart}>
                Продолжить покупки
              </Link>
            </div>
          </div>

          <aside className="cart-summary glass">
            <div className="cs-row">
              <span>Товары</span>
              <b>{itemsCount} шт.</b>
            </div>

            <div className="cs-row cs-total">
              <span>Итого</span>
              <b>{subtotal == null ? '—' : formatPrice(subtotal)}</b>
            </div>

            <div className="cs-actions">
              <Link to="/cart" className="btn btn-ghost">
                В корзину
              </Link>
              <Link to="/checkout" className="btn btn-dark">
                Оформить
              </Link>
            </div>

            <p className="cs-note">Цены носят демонстрационный характер.</p>
          </aside>
        </div>
      )}
    </div>
  );
};

export default CartPage;
