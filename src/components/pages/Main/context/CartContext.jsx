import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'cart:v1';
const MAX_QTY = 99;

const initialState = {
  items: [],   // [{ productId, name, form, price?, image?, qty }]
  isOpen: false,
};

/* ---------- helpers ---------- */
const clampInt = (x, min = 1, max = MAX_QTY) => {
  const n = Math.trunc(Number(x));
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
};

const normKey = (productId, form = '') =>
  `${String(productId)}@@${String(form).trim().toLowerCase()}`;

const sanitizeItems = (arr) =>
  Array.isArray(arr)
    ? arr
        .filter(Boolean)
        .map((i) => ({
          productId: i.productId,
          name: i.name ?? '',
          form: i.form ?? '',
          image: i.image ?? null,
          price: typeof i.price === 'number' ? i.price : undefined,
          qty: clampInt(i.qty ?? 1),
        }))
    : [];

/* ---------- reducer ---------- */
function reducer(state, action) {
  switch (action.type) {
    case 'OPEN':   return { ...state, isOpen: true };
    case 'CLOSE':  return { ...state, isOpen: false };
    case 'TOGGLE': return { ...state, isOpen: !state.isOpen };

    case 'LOAD': {
      const items = sanitizeItems(action.items ?? action.payload?.items);
      return { ...state, items };
    }

    case 'ADD': {
      const payload = action.payload;
      const qtyToAdd = clampInt(payload.qty ?? action.qty ?? 1);
      const key = normKey(payload.productId, payload.form);

      let merged = false;
      const items = state.items.map((it) => {
        if (normKey(it.productId, it.form) === key) {
          merged = true;
          return { ...it, qty: clampInt((it.qty ?? 0) + qtyToAdd) };
        }
        return it;
      });

      const next = merged ? items : [{ ...payload, qty: qtyToAdd }, ...items];
      return { ...state, items: next };
    }

    case 'SET_QTY': {
      const { productId, form, qty } = action;
      const key = normKey(productId, form);
      const nextQty = clampInt(qty);
      const items = state.items.map((it) =>
        normKey(it.productId, it.form) === key ? { ...it, qty: nextQty } : it
      );
      return { ...state, items };
    }

    case 'INC': {
      const { productId, form } = action;
      const key = normKey(productId, form);
      const items = state.items.map((it) =>
        normKey(it.productId, it.form) === key
          ? { ...it, qty: clampInt((it.qty ?? 0) + 1) }
          : it
      );
      return { ...state, items };
    }

    // ⬇️ если после уменьшения количество <= 0 — позиция удаляется
    case 'DEC': {
      const { productId, form } = action;
      const key = normKey(productId, form);
      const items = [];
      for (const it of state.items) {
        if (normKey(it.productId, it.form) === key) {
          const next = (it.qty ?? 1) - 1;
          if (next > 0) items.push({ ...it, qty: next });
          // если next <= 0 — просто не пушим (тем самым удаляем позицию)
        } else {
          items.push(it);
        }
      }
      return { ...state, items };
    }

    case 'REMOVE': {
      const { productId, form } = action;
      const key = normKey(productId, form);
      const items = state.items.filter(
        (it) => normKey(it.productId, it.form) !== key
      );
      return { ...state, items };
    }

    case 'CLEAR':
      return { ...state, items: [] };

    default:
      return state;
  }
}

/* ---------- provider ---------- */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // load from localStorage + sync across tabs
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        dispatch({ type: 'LOAD', items: parsed.items });
      }
    } catch (e) {
      console.warn('[Cart] Failed to load from localStorage:', e);
    }

    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        try {
          const next = e.newValue ? JSON.parse(e.newValue) : { items: [] };
          dispatch({ type: 'LOAD', items: next.items });
        } catch (err) {
          console.warn('[Cart] Failed to sync from storage event:', err);
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ items: state.items })
      );
    } catch (e) {
      console.warn('[Cart] Failed to save to localStorage:', e);
    }
  }, [state.items]);

  const itemsCount = useMemo(
    () => state.items.reduce((s, i) => s + (i.qty ?? 0), 0),
    [state.items]
  );

  const subtotal = useMemo(() => {
    const hasPrice = state.items.some((i) => typeof i.price === 'number');
    if (!hasPrice) return null;
    return state.items.reduce(
      (s, i) =>
        s + ((typeof i.price === 'number' ? i.price : 0) * (i.qty ?? 0)),
      0
    );
  }, [state.items]);

  const api = useMemo(
    () => ({
      // state
      items: state.items,
      isOpen: state.isOpen,
      itemsCount,
      subtotal,

      // actions
      openCart: () => dispatch({ type: 'OPEN' }),
      closeCart: () => dispatch({ type: 'CLOSE' }),
      toggleCart: () => dispatch({ type: 'TOGGLE' }),

      addItem: (payload, qty = 1) =>
        dispatch({ type: 'ADD', payload: { ...payload, qty } }),
      increment: (productId, form) =>
        dispatch({ type: 'INC', productId, form }),
      decrement: (productId, form) =>
        dispatch({ type: 'DEC', productId, form }), // при qty=1 — удалит
      setQty: (productId, form, qty) =>
        dispatch({ type: 'SET_QTY', productId, form, qty }),
      removeItem: (productId, form) =>
        dispatch({ type: 'REMOVE', productId, form }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
    }),
    [state.items, state.isOpen, itemsCount, subtotal]
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

/* eslint-disable-next-line react-refresh/only-export-components */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
