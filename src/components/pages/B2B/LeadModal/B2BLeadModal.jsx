import React, { useEffect, useRef, useState } from "react";
import "./B2BLeadModal.css";

/**
 * Модалка-заявка для B2B.
 * Сохраняет заявки в localStorage (ключ "b2b_leads") как временную БД.
 */
export default function B2BLeadModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    city: "",
    time: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const backdropRef = useRef(null);

  // закрытие по ESC + запрет прокрутки задника
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    if (open) {
      document.addEventListener("keydown", onEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const onBackdrop = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  const setField =
    (k) =>
    (e) => {
      const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setForm((f) => ({ ...f, [k]: v }));
    };

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Укажите имя";
    if (!form.company.trim()) e.company = "Укажите компанию";
    if (!form.email.trim() && !form.phone.trim())
      e.email = "Нужен email или телефон";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Некорректный email";
    if (form.phone && form.phone.replace(/\D/g, "").length < 10)
      e.phone = "Укажите телефон полностью";
    if (!form.consent) e.consent = "Необходимо согласие";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const saveToLocal = (rec) => {
    const key = "b2b_leads";
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    arr.push(rec);
    localStorage.setItem(key, JSON.stringify(arr));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    saveToLocal({ ...form, ts: new Date().toISOString() });
    setSent(true);
    // авто-закрытие через 1.4с
    setTimeout(() => {
      setSent(false);
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        city: "",
        time: "",
        message: "",
        consent: false,
      });
      onClose();
    }, 1400);
  };

  if (!open) return null;

  return (
    <div
      className={`b2b-modal ${open ? "open" : ""}`}
      ref={backdropRef}
      onMouseDown={onBackdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="leadTitle"
    >
      <div
        className="b2b-modal-card"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {!sent ? (
          <>
            <div className="b2b-modal-head">
              <h3 id="leadTitle">Оставить заявку</h3>
              <button className="x" onClick={onClose} aria-label="Закрыть">
                ✕
              </button>
            </div>

            <form className="b2b-form" onSubmit={onSubmit} noValidate>
              <div className="grid">
                <label className={errors.name ? "err" : ""}>
                  <span>Имя*</span>
                  <input
                    value={form.name}
                    onChange={setField("name")}
                    autoFocus
                  />
                  {errors.name && <i>{errors.name}</i>}
                </label>

                <label className={errors.company ? "err" : ""}>
                  <span>Компания*</span>
                  <input value={form.company} onChange={setField("company")} />
                  {errors.company && <i>{errors.company}</i>}
                </label>

                <label className={errors.email ? "err" : ""}>
                  <span>Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={setField("email")}
                    placeholder="name@example.com"
                  />
                  {errors.email && <i>{errors.email}</i>}
                </label>

                <label className={errors.phone ? "err" : ""}>
                  <span>Телефон</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={setField("phone")}
                    placeholder="+7 999 123-45-67"
                  />
                  {errors.phone && <i>{errors.phone}</i>}
                </label>

                <label>
                  <span>Город</span>
                  <input value={form.city} onChange={setField("city")} />
                </label>

                <label>
                  <span>Удобное время для связи</span>
                  <input
                    value={form.time}
                    onChange={setField("time")}
                    placeholder="Например: 10:00–18:00 (Мск)"
                  />
                </label>
              </div>

              <label className="full">
                <span>Комментарий</span>
                <textarea
                  rows="3"
                  value={form.message}
                  onChange={setField("message")}
                  placeholder="Что именно нужно: кофе/чай, объёмы, условия…"
                />
              </label>

              <label className={`chk ${errors.consent ? "err" : ""}`}>
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={setField("consent")}
                />
                <span>
                  Согласен с условиями обработки персональных данных
                </span>
              </label>
              {errors.consent && <i className="err-msg">{errors.consent}</i>}

              <div className="actions">
                <button type="submit" className="btn btn-dark">
                  Отправить
                </button>
                <button type="button" className="btn btn-ghost" onClick={onClose}>
                  Отмена
                </button>
              </div>

              <p className="note">
                * — обязательные поля. Достаточно указать один контакт: email
                или телефон.
              </p>
            </form>
          </>
        ) : (
          <div className="b2b-modal-done">
            <h3>Спасибо!</h3>
            <p>Мы получили вашу заявку и свяжемся в ближайшее время.</p>
          </div>
        )}
      </div>
    </div>
  );
}
