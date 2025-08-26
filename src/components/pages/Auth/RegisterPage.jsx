import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './LoginPage.css';

const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRx = /^\+?\d[\d\-\s()]{6,}$/;

const init = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirm: '',
  agree: false,
};

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState(init);
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState('');

  const navigate = useNavigate();

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = 'Введите имя';
    if (!form.email.trim()) e.email = 'Введите email';
    else if (!emailRx.test(form.email.trim().toLowerCase())) e.email = 'Некорректный email';
    if (form.phone && !phoneRx.test(form.phone.trim())) e.phone = 'Некорректный телефон';
    if (!form.password) e.password = 'Введите пароль';
    else if (form.password.length < 6) e.password = 'Минимум 6 символов';
    if (form.confirm !== form.password) e.confirm = 'Пароли не совпадают';
    if (!form.agree) e.agree = 'Необходимо согласие на обработку данных';
    return e;
  }, [form]);

  const canSubmit = useMemo(
    () => !submitting && Object.keys(errors).length === 0,
    [errors, submitting]
  );

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');
    if (!canSubmit) return;

    try {
      setSubmitting(true);
      await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      // успех — переходим на главную (или /account)
      navigate('/', { replace: true });
    } catch (err) {
      setGlobalError(err?.message || 'Ошибка регистрации');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page section">
      <div className="container auth-wrap">
        <div className="auth-card glass">
          <h1 className="auth-title">Регистрация</h1>
          <p className="auth-subtitle">Создайте аккаунт, чтобы оформлять заказы быстрее</p>

          {globalError && <div className="auth-alert error">{globalError}</div>}

          <form className="auth-form" onSubmit={onSubmit} noValidate>
            <div className={`field ${errors.name ? 'has-error' : ''}`}>
              <label>Имя</label>
              <input
                className="input"
                type="text"
                placeholder="Иван"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className={`field ${errors.email ? 'has-error' : ''}`}>
              <label>Email</label>
              <input
                className="input"
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className={`field ${errors.phone ? 'has-error' : ''}`}>
              <label>Телефон (необязательно)</label>
              <input
                className="input"
                type="tel"
                placeholder="+7 999 123-45-67"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="field-grid">
              <div className={`field ${errors.password ? 'has-error' : ''}`}>
                <label>Пароль</label>
                <input
                  className="input"
                  type="password"
                  placeholder="••••••"
                  value={form.password}
                  onChange={(e) => set('password', e.target.value)}
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <div className={`field ${errors.confirm ? 'has-error' : ''}`}>
                <label>Повторите пароль</label>
                <input
                  className="input"
                  type="password"
                  placeholder="••••••"
                  value={form.confirm}
                  onChange={(e) => set('confirm', e.target.value)}
                />
                {errors.confirm && <span className="error-text">{errors.confirm}</span>}
              </div>
            </div>

            <label className={`checkbox-row ${errors.agree ? 'has-error' : ''}`}>
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => set('agree', e.target.checked)}
              />
              <span>
                Я согласен с{' '}
                <Link to="/terms" target="_blank" rel="noreferrer">
                  условиями обработки персональных данных
                </Link>
              </span>
            </label>
            {errors.agree && <span className="error-text">{errors.agree}</span>}

            <div className="auth-actions">
              <button className="btn btn-dark" type="submit" disabled={!canSubmit}>
                {submitting ? 'Создаём...' : 'Создать аккаунт'}
              </button>
              <Link to="/" className="btn btn-ghost">На главную</Link>
            </div>

            <p className="auth-hint">
              Уже зарегистрированы? <Link to="/login">Войти</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
