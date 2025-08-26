import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import coffepack from '../../../../assets/coffeepuck.png';
import { useCart } from '../context/CartContext';
import './ProductCards.css';

/* ===== helpers (вне компонента) ===== */
const normalizeStr = (s) =>
  (s || '').toString().toLowerCase().replaceAll('ё', 'е').trim();

const mapQueryToFilter = (q) => {
  const t = normalizeStr(q);
  if (!t) return null;
  if (/^робуст|robust/.test(t)) return 'robusta';
  if (/^арабик|arabic/.test(t)) return 'arabica';
  if (/^смес|blend|микс/.test(t)) return 'blend';
  return null;
};

/* ============ Card ============ */
const ProductCard = ({ product, uid, highlighted = false, appearNow = false, delayMs = 0 }) => {
  const { addItem, openCart } = useCart();

  const renderCoffeeAttribute = (value) => {
    const intensity = Math.min(Math.floor(value / 2), 5);
    return (
      <div className="coffee-attribute">
        <div className="attribute-bars">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`attribute-bar ${i < intensity ? 'filled' : ''}`} />
          ))}
        </div>
        <span className="attribute-value">{value}/10</span>
      </div>
    );
  };

  const handleAdd = () => {
    const chosen = product.options?.[0] || { form: 'в зёрнах' };
    addItem(
      {
        productId: product.id,
        name: product.name,
        form: chosen.form,
        image: coffepack,
        // price: product.price,
      },
      1
    );
    openCart();
  };

  return (
    <div
      className={`product-card ${appearNow ? 'reenter' : ''} ${highlighted ? 'search-hit' : ''}`}
      style={{ ['--delay']: `${delayMs}ms` }}
      data-uid={uid}
    >
      <div className="product-image-container">
        <img src={coffepack} alt={product.name} className="product-image" />
      </div>

      <div className="product-content">
        <div className="product-header">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-type">{product.type}</p>
        </div>

        <div className="product-rating">
          <span className="rating-value">{product.rating}</span>
          <span className="rating-icon">★</span>
          <span className="reviews-count">{product.reviews}</span>
          <span className="product-tag">{product.tag}</span>
        </div>

        <p className="product-description">{product.description}</p>

        <div className="product-options">
          {product.options.map((option, i) => (
            <div key={`${option.form}-${i}`} className="option-row">
              <div className="option-column">
                <span className="option-label">Плотность</span>
                {renderCoffeeAttribute(option.density)}
              </div>
              <div className="option-column">
                <span className="option-label">Кислотность</span>
                {renderCoffeeAttribute(option.acidity)}
              </div>
              <div className="option-column">
                <span className="option-label">Форма</span>
                <span className="option-value">{option.form}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="add-to-cart-btn" onClick={handleAdd}>
          ДОБАВИТЬ В КОРЗИНУ
        </button>
      </div>
    </div>
  );
};

/* ============ List ============ */
const ProductCards = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryRaw = (searchParams.get('q') || '').trim();

  const [sortBy, setSortBy] = useState('default'); // 'default' | 'name' | 'rating'
  const [filterBy, setFilterBy] = useState('all');  // 'all' | 'arabica' | 'robusta' | 'blend'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [animSeed, setAnimSeed] = useState(1);

  // demo-данные
  const coffeeProducts = useMemo(
    () => [
      { id: 1, name: 'КЭНДИ', type: 'для эспрессо смесь', sort: 'blend',   rating: 4.7, reviews: 2742, tag: 'рекомендуем',
        description: 'Плотный кофе с нотами тёмной карамели, цукатов и специй',
        options: [{ density: 8, acidity: 3, form: 'в зёрнах' }, { density: 7, acidity: 4, form: 'молотый' }] },
      { id: 2, name: 'ЭФИОПИЯ ЙИРГАЧЕФФ', type: 'натуральный', sort: 'arabica', rating: 4.6, reviews: 4953, tag: 'хит продаж',
        description: 'Ягодный кофе с цветочными нотами и цитрусовой кислотностью',
        options: [{ density: 6, acidity: 7, form: 'в зёрнах' }] },
      { id: 3, name: 'КОЛУМБИЯ СУПРЕМО', type: 'натуральный', sort: 'arabica', rating: 4.5, reviews: 3210, tag: 'популярный',
        description: 'Сбалансированный кофе с нотами орехов и молочного шоколада',
        options: [{ density: 7, acidity: 5, form: 'в зёрнах' }, { density: 6, acidity: 6, form: 'молотый' }] },
      { id: 4, name: 'РОБУСТА ПРЕМИУМ', type: 'натуральный', sort: 'robusta', rating: 4.3, reviews: 1850, tag: 'крепкий',
        description: 'Мощный кофе с высокой крепостью и земляными нотами',
        options: [{ density: 9, acidity: 2, form: 'в зёрнах' }] },
      // дубли для сетки
      { id: 3, name: 'КОЛУМБИЯ СУПРЕМО', type: 'натуральный', sort: 'arabica', rating: 4.5, reviews: 3210, tag: 'популярный',
        description: 'Сбалансированный кофе с нотами орехов и молочного шоколада',
        options: [{ density: 7, acidity: 5, form: 'в зёрнах' }, { density: 6, acidity: 6, form: 'молотый' }] },
      { id: 4, name: 'РОБУСТА ПРЕМИУМ', type: 'натуральный', sort: 'robusta', rating: 4.3, reviews: 1850, tag: 'крепкий',
        description: 'Мощный кофе с высокой крепостью и земляными нотами',
        options: [{ density: 9, acidity: 2, form: 'в зёрнах' }] },
      { id: 3, name: 'КОЛУМБИЯ СУПРЕМО', type: 'натуральный', sort: 'arabica', rating: 4.5, reviews: 3210, tag: 'популярный',
        description: 'Сбалансированный кофе с нотами орехов и молочного шоколада',
        options: [{ density: 7, acidity: 5, form: 'в зёрнах' }, { density: 6, acidity: 6, form: 'молотый' }] },
      { id: 4, name: 'РОБУСТА ПРЕМИУМ', type: 'натуральный', sort: 'robusta', rating: 4.3, reviews: 1850, tag: 'крепкий',
        description: 'Мощный кофе с высокой крепостью и земляными нотами',
        options: [{ density: 9, acidity: 2, form: 'в зёрнах' }] },
    ],
    []
  );

  // uid для ключей
  const normalized = useMemo(
    () => coffeeProducts.map((p, idx) => ({ ...p, _uid: `${p.id}-${idx}` })),
    [coffeeProducts]
  );

  // считаем количества для бейджиков
  const counts = useMemo(() => {
    const c = { all: normalized.length, arabica: 0, robusta: 0, blend: 0 };
    for (const p of normalized) c[p.sort] = (c[p.sort] || 0) + 1;
    return c;
  }, [normalized]);

  const collator = useMemo(() => new Intl.Collator('ru', { sensitivity: 'base' }), []);

  const filtered = useMemo(() => {
    if (filterBy === 'all') return normalized;
    return normalized.filter((p) => p.sort === filterBy);
  }, [normalized, filterBy]);

  const sortFn = useMemo(() => {
    switch (sortBy) {
      case 'name':
        return (a, b) => collator.compare(a.name, b.name);
      case 'rating':
        return (a, b) =>
          (b.rating - a.rating) ||
          (b.reviews - a.reviews) ||
          collator.compare(a.name, b.name);
      default:
        return (a, b) =>
          Number(a._uid.split('-')[1]) - Number(b._uid.split('-')[1]);
    }
  }, [sortBy, collator]);

  const viewProducts = useMemo(() => filtered.slice().sort(sortFn), [filtered, sortFn]);

  // перезапуск анимации при смене сортировки/фильтра
  useEffect(() => { setAnimSeed((s) => s + 1); }, [sortBy, filterBy]);

  /* ====== Поиск ====== */

  // применяем фильтр от поискового запроса (если распознана категория)
  useEffect(() => {
    const q = normalizeStr(queryRaw);
    const cat = mapQueryToFilter(q);
    if (cat) {
      setFilterBy(cat);
    } else if (q) {
      setFilterBy('all'); // показываем все — ищем по тексту
    }
  }, [queryRaw]);

  // список UID, чьи имена содержат подстроку запроса (после фильтра + сортировки)
  const hitUids = useMemo(() => {
    const q = normalizeStr(queryRaw);
    if (!q) return new Set();
    const set = new Set();
    for (const p of viewProducts) {
      if (normalizeStr(p.name).includes(q)) set.add(p._uid);
    }
    return set;
  }, [queryRaw, viewProducts]);

  // скроллим к первой найденной карточке
  useEffect(() => {
    const q = normalizeStr(queryRaw);
    if (!q) return;

    const firstHit = hitUids.values().next().value;
    const targetUid = firstHit ?? viewProducts[0]?._uid;
    if (!targetUid) return;

    requestAnimationFrame(() => {
      const el = document.querySelector(`[data-uid="${targetUid}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }, [queryRaw, hitUids, viewProducts]);

  // очистка q в URL
  const clearQuery = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('q');
    setSearchParams(next, { replace: true });
  };

  const onPickFilter = (val) => {
    setIsDropdownOpen(false);
    setFilterBy(val);
  };

  const filterLabel =
    filterBy === 'all' ? 'Все сорта'
      : filterBy === 'arabica' ? 'Арабика'
      : filterBy === 'robusta' ? 'Робуста'
      : 'Смеси';

  return (
    <div className="product-recommendations">
      <div className="products-header">
        <h2 className="section-title">ВОЗМОЖНО ВАМ ПОНРАВЯТСЯ</h2>

        <div className="sort-controls">
          <button className={`sort-button ${sortBy === 'default' ? 'active' : ''}`} onClick={() => setSortBy('default')}>По умолчанию</button>
          <button className={`sort-button ${sortBy === 'name' ? 'active' : ''}`} onClick={() => setSortBy('name')}>По названию</button>
          <button className={`sort-button ${sortBy === 'rating' ? 'active' : ''}`} onClick={() => setSortBy('rating')}>По рейтингу</button>

          <div className="sort-dropdown">
            <button
              className="sort-button pill"
              aria-haspopup="menu"
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen(v => !v)}
            >
              По сорту: {filterLabel} ▼
            </button>

            <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`} role="menu">
              <button className={filterBy === 'all' ? 'active' : ''} onClick={() => onPickFilter('all')} role="menuitemradio" aria-checked={filterBy === 'all'}>
                Все сорта <span className="dropdown-count">{counts.all}</span>
              </button>
              <button className={filterBy === 'arabica' ? 'active' : ''} onClick={() => onPickFilter('arabica')} role="menuitemradio" aria-checked={filterBy === 'arabica'}>
                Арабика <span className="dropdown-count">{counts.arabica}</span>
              </button>
              <button className={filterBy === 'robusta' ? 'active' : ''} onClick={() => onPickFilter('robusta')} role="menuitemradio" aria-checked={filterBy === 'robusta'}>
                Робуста <span className="dropdown-count">{counts.robusta}</span>
              </button>
              <button className={filterBy === 'blend' ? 'active' : ''} onClick={() => onPickFilter('blend')} role="menuitemradio" aria-checked={filterBy === 'blend'}>
                Смеси <span className="dropdown-count">{counts.blend}</span>
              </button>
            </div>
          </div>

          {/* Кнопка очистки поиска (видна только при наличии q) */}
          {queryRaw && (
            <button className="sort-button pill clear-search" onClick={clearQuery} title="Очистить поиск">
              Очистить поиск ×
            </button>
          )}
        </div>
      </div>

      <div className="products-grid">
        {viewProducts.map((product, i) => (
          <ProductCard
            key={`${product._uid}-${animSeed}`}
            uid={product._uid}
            product={product}
            highlighted={hitUids.has(product._uid)}
            appearNow={animSeed > 1}
            delayMs={i * 60}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCards;
