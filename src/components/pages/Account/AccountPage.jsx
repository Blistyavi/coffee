import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import './AccountPage.css';

export default function AccountPage() {
  const { user, isLoggedIn, updateProfile, logout } = useAuth();
  const nav = useNavigate();

  // если не авторизован — на логин
  useEffect(() => {
    if (!isLoggedIn) nav('/login', { replace: true });
  }, [isLoggedIn, nav]);

  const initial = useMemo(() => ({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    about: user?.about || '',
  }), [user]);

  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { setForm(initial); }, [initial]);

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const errors = useMemo(() => {
    const er = {};
    if (!form.name.trim()) er.name = 'Введите имя';
    if (!form.email.trim()) er.email = 'Введите email';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'Неверный email';
    return er;
  }, [form]);

  const dirty = useMemo(() => {
    return JSON.stringify(form) !== JSON.stringify(initial);
  }, [form, initial]);

  const canSave = dirty && !saving && Object.keys(errors).length === 0;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSave) return;
    setError('');
    try {
      setSaving(true);
      await updateProfile(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    } catch (err) {
      setError(err?.message || 'Не удалось сохранить изменения');
    } finally {
      setSaving(false);
    }
  };

  const onLogout = () => {
    logout();
    nav('/', { replace: true });
  };

  return (
    <div className="account-page section">
      <div className="container account-wrap">
        <div className="account-card glass">
          <h1 className="account-title">Личный кабинет</h1>
          <p className="account-subtitle">
            Управляйте данными профиля, чтобы заказывать ещё быстрее
          </p>

          {error && <div className="acc-alert error">{error}</div>}
          {saved && <div className="acc-alert success">Изменения сохранены</div>}

          <form className="account-form" onSubmit={onSubmit}>
            <div className={`field ${errors.name ? 'has-error' : ''}`}>
              <label>Имя</label>
              <input
                className="input"
                type="text"
                placeholder="Иван"
                value={form.name}
                onChange={onChange('name')}
              />
              <div className="error-text">{errors.name || ' '}</div>
            </div>

            <div className={`field ${errors.email ? 'has-error' : ''}`}>
              <label>Email</label>
              <input
                className="input"
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={onChange('email')}
              />
              <div className="error-text">{errors.email || ' '}</div>
            </div>

            <div className="field">
              <label>Телефон (необязательно)</label>
              <input
                className="input"
                type="tel"
                placeholder="+7 999 123-45-67"
                value={form.phone}
                onChange={onChange('phone')}
              />
              <div className="error-text"> </div>
            </div>

            <div className="field">
              <label>О себе (необязательно)</label>
              <textarea
                className="input"
                placeholder="Кофе люблю с ягодной кислотностью..."
                value={form.about}
                onChange={onChange('about')}
                rows={4}
              />
              <div className="error-text"> </div>
            </div>

            <div className="account-actions">
              <button className="btn btn-dark" type="submit" disabled={!canSave}>
                {saving ? 'Сохраняем…' : 'Сохранить изменения'}
              </button>
              <button className="btn btn-outline" type="button" onClick={onLogout}>
                Выйти
              </button>
              <Link to="/" className="btn btn-ghost">На главную</Link>
            </div>
          </form>

          <div className="account-b2b">
            <span>Работаете оптом?</span>
            <Link to="/b2b" className="b2b-link">Перейти в оптовый раздел →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
