import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './LoginPage.css';

/**
 * ENV (добавь в .env):
 *   VITE_GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
 *   VITE_MAILRU_CLIENT_ID="xxxxxxxxxxxxxxxxxxxxxxxxx"
 *   VITE_MAILRU_REDIRECT_URI="http://localhost:5173/oauth/mailru/callback"
 */

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const MAILRU_CLIENT_ID = import.meta.env.VITE_MAILRU_CLIENT_ID;
const MAILRU_REDIRECT_URI = import.meta.env.VITE_MAILRU_REDIRECT_URI;

export default function LoginPage() {
  const { login, loginWithGoogleIdToken, loginWithMailRuProfile } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const nav = useNavigate();

  /** ==== ЛОКАЛЬНЫЙ логин (email+пароль) ==== */
  const onSubmitLocal = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setSubmitting(true);
      await login({ email, password });
      nav('/', { replace: true });
    } catch (err) {
      setError(err?.message || 'Ошибка входа');
    } finally {
      setSubmitting(false);
    }
  };

  /** ==== Google One Tap / Button ==== */
  const gButtonRef = useRef(null);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
    // подгрузим SDK
    const id = 'google-gsi';
    if (!document.getElementById(id)) {
      const s = document.createElement('script');
      s.id = id;
      s.src = 'https://accounts.google.com/gsi/client';
      s.async = true;
      s.defer = true;
      document.body.appendChild(s);
    }
    let mounted = true;
    const init = () => {
      if (!window.google || !mounted) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (resp) => {
          try {
            await loginWithGoogleIdToken(resp.credential);
            nav('/', { replace: true });
          } catch (e) {
            setError(e?.message || 'Не удалось войти через Google');
          }
        },
      });
      if (gButtonRef.current) {
        window.google.accounts.id.renderButton(
          gButtonRef.current,
          { theme: 'outline', size: 'large', shape: 'pill', text: 'signin_with' }
        );
      }
      // можно включить one-tap (при желании)
      // window.google.accounts.id.prompt();
    };

    const timer = setInterval(() => {
      if (window.google?.accounts?.id) {
        clearInterval(timer);
        init();
      }
    }, 50);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [loginWithGoogleIdToken, nav]);

  /** ==== Mail.ru OAuth (popup) ==== */
  const mailruAuthUrl = useMemo(() => {
    const p = new URLSearchParams({
      client_id: MAILRU_CLIENT_ID || '',
      response_type: 'token',
      redirect_uri: MAILRU_REDIRECT_URI || `${window.location.origin}/oauth/mailru/callback`,
      scope: 'userinfo',
      state: Math.random().toString(36).slice(2),
    });
    return `https://oauth.mail.ru/login?${p.toString()}`;
  }, []);

  const onMailRuLogin = () => {
    if (!MAILRU_CLIENT_ID) {
      setError('MAILRU CLIENT ID не задан. Укажи VITE_MAILRU_CLIENT_ID в .env');
      return;
    }
    const w = 480, h = 640;
    const left = window.screenX + (window.outerWidth - w) / 2;
    const top  = window.screenY + (window.outerHeight - h) / 2;
    const popup = window.open(
      mailruAuthUrl,
      'mailru_oauth',
      `width=${w},height=${h},left=${left},top=${top}`
    );

    const onMsg = async (e) => {
      if (!e?.data || e.data.provider !== 'mailru') return;
      try {
        const token = e.data.access_token;
        // подтянем профиль
        const resp = await fetch('https://oauth.mail.ru/userinfo', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const profile = await resp.json();
        await loginWithMailRuProfile(profile);
        nav('/', { replace: true });
      } catch (err) {
        setError(err?.message || 'Не удалось войти через Mail.ru');
      } finally {
        window.removeEventListener('message', onMsg);
        popup && popup.close();
      }
    };
    window.addEventListener('message', onMsg);
  };

  return (
    <div className="auth-page section">
      <div className="container auth-wrap">
        <div className="auth-card glass">
          <h1 className="auth-title">Вход</h1>
          <p className="auth-subtitle">Выберите удобный способ</p>

          {error && <div className="auth-alert error">{error}</div>}

          <div className="oauth-buttons">
            <div ref={gButtonRef} className="g-btn-slot" />
            <button type="button" className="btn btn-ghost mailru-btn" onClick={onMailRuLogin}>
              Войти через Mail.ru
            </button>
          </div>

          <div className="or-sep"><span>или</span></div>

          <form className="auth-form" onSubmit={onSubmitLocal}>
            <div className="field">
              <label>Email</label>
              <input
                className="input"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Пароль</label>
              <input
                className="input"
                type="password"
                placeholder="••••••"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-actions">
              <button className="btn btn-dark" type="submit" disabled={submitting}>
                {submitting ? 'Входим...' : 'Войти'}
              </button>
              <Link to="/register" className="btn btn-ghost">Создать аккаунт</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
