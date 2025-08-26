import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

const AuthContext = createContext(null);

const USERS_KEY = "auth:users";
const SESSION_KEY = "auth:session";

/* ---------- helpers (localStorage) ---------- */
const loadUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("[Auth] Failed to load users:", err);
    return [];
  }
};

const saveUsers = (arr) => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(arr));
  } catch (err) {
    console.warn("[Auth] Failed to save users:", err);
  }
};

/* ---------- provider ---------- */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Подхватываем сессию при монтировании
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch (err) {
      console.warn("[Auth] Failed to read session:", err);
    }
  }, []);

  // Сохраняем / очищаем сессию
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    } catch (err) {
      console.warn("[Auth] Failed to write session:", err);
    }
  }, [user]);

  const register = useCallback(async ({ name, email, password, phone = "", bio = "" }) => {
    const users = loadUsers();
    const exists = users.some(
      (u) => u.email.toLowerCase() === String(email).toLowerCase()
    );
    if (exists) throw new Error("Пользователь с таким email уже существует");

    const newUser = {
      id: (crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
      name: String(name || "").trim(),
      email: String(email || "").trim(),
      password, // демо-хранилище!
      phone,
      bio,
      createdAt: Date.now(),
    };

    users.push(newUser);
    saveUsers(users);

    setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone || "",
      bio: newUser.bio || "",
    });

    return newUser;
  }, []);

  const login = useCallback(async (email, password) => {
    const users = loadUsers();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === String(email).toLowerCase() &&
        u.password === password
    );
    if (!found) throw new Error("Неверный email или пароль");

    setUser({
      id: found.id,
      name: found.name,
      email: found.email,
      phone: found.phone || "",
      bio: found.bio || "",
    });

    return found;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (patch) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };

      try {
        const users = loadUsers();
        const idx = users.findIndex((u) => u.id === prev.id);
        if (idx > -1) {
          users[idx] = { ...users[idx], ...patch };
          saveUsers(users);
        }
      } catch (err) {
        console.warn("[Auth] Failed to update profile:", err);
      }

      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ user, register, login, logout, updateProfile }),
    [user, register, login, logout, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* eslint-disable-next-line react-refresh/only-export-components */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
