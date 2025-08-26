// Простая "БД" на localStorage + события синхронизации
const KEY = 'cartDB:v1';

// чтение/запись
function read() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw).items ?? [] : [];
  } catch {
    return [];
  }
}
function write(items) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ items }));
    // уведомим всех слушателей внутри вкладки
    window.dispatchEvent(new CustomEvent('cart:updated'));
  } catch (e) {
    console.warn('[cartDB] write failed:', e);
  }
}

// публичное API
export function getCart() { return read(); }
export function setCart(items) { write(items); }

export function addItem(payload, qty = 1) {
  const items = read();
  const idx = items.findIndex(
    i => i.productId === payload.productId && i.form === payload.form
  );
  if (idx > -1) {
    items[idx] = { ...items[idx], qty: items[idx].qty + qty };
  } else {
    items.unshift({ ...payload, qty });
  }
  write(items);
  return items;
}

export function updateQty(productId, form, qty) {
  const items = read().map(i =>
    i.productId === productId && i.form === form
      ? { ...i, qty: Math.max(1, qty) }
      : i
  );
  write(items);
  return items;
}

export function removeItem(productId, form) {
  const items = read().filter(i => !(i.productId === productId && i.form === form));
  write(items);
  return items;
}

export function clearCart() { write([]); return []; }

// подписка на изменения (внутри вкладки и между вкладками)
export function subscribeCart(handler) {
  const onLocal = () => handler(read());
  const onStorage = (e) => { if (e.key === KEY) handler(read()); };
  window.addEventListener('cart:updated', onLocal);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener('cart:updated', onLocal);
    window.removeEventListener('storage', onStorage);
  };
}
