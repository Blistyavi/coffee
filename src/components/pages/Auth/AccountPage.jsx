import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import "./Auth.css";

export default function AccountPage() {
  const { user, updateProfile, logout } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
  });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  const onSave = async (e) => {
    e.preventDefault();
    setMsg("");
    await updateProfile({ name: form.name, phone: form.phone, bio: form.bio });
    setMsg("Сохранено");
    setTimeout(() => setMsg(""), 1500);
  };

  return (
    <div className="auth-page section">
      <div className="container auth-wrap">
        <div className="card auth-card">
          <h1 className="auth-title">Личный кабинет</h1>
          <p className="auth-subtitle">Редактируйте данные профиля</p>

          {msg && <div className="auth-alert">{msg}</div>}

          <form className="auth-form" onSubmit={onSave}>
            <div className="field">
              <label>Имя</label>
              <input className="input" name="name" value={form.name} onChange={onChange} />
            </div>
            <div className="field">
              <label>Email</label>
              <input className="input" disabled value={form.email} />
            </div>
            <div className="field">
              <label>Телефон</label>
              <input className="input" name="phone" value={form.phone} onChange={onChange} />
            </div>
            <div className="field">
              <label>О себе</label>
              <textarea className="input" rows="4" name="bio" value={form.bio} onChange={onChange} />
            </div>

            <div className="auth-actions">
              <button className="btn btn-dark" type="submit">Сохранить</button>
              <button className="btn btn-outline" type="button" onClick={logout}>Выйти</button>
            </div>
          </form>

          <div style={{ marginTop: 14 }}>
            <a href="/b2b" className="btn btn-ghost">Перейти на оптовый сайт</a>
          </div>
        </div>
      </div>
    </div>
  );
}
