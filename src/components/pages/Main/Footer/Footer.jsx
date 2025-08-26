import React from 'react';
import './Footer.css';
import Logo from '../../../../assets/logo.png';

const Footer = () => {
  return (
    <footer className="coffee-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <img src={Logo} alt="Coffee Shop Logo" className="footer-logo-img" />
            <p className="delivery-text">Доставка по всей России</p>
          </div>

          <div className="footer-columns">
            <div className="footer-column">
              <p className="copyright">© 2025 Использование любых материалов с данного ресурса возможно только после письменного согласия владельца авторских прав.</p>
              <div className="legal-links">
                <a href="/privacy">Политика обработки персональных данных</a>
                <a href="/terms">Пользовательское соглашение</a>
                <a href="/offer">Публичная оферта</a>
              </div>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">КАТАЛОГ</h4>
              <div className="footer-links">
                <a href="/b2b">Оптовые поставки ▼</a>
              </div>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">ПОМОЩЬ</h4>
              <div className="footer-links">
                <a href="/community">Сообщество</a>
                <a href="/faq">Частые вопросы</a>
                <a href="/delivery">Доставка и оплата</a>
                <a href="/discounts">Система скидок</a>
                <a href="/returns">Возврат денег</a>
              </div>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">КОНТАКТЫ</h4>
              <div className="phone-number">
                <a href="tel:88003334980" className="phone-link">0 000 000-00-00</a>
                <span className="phone-description">Бесплатный звонок по России</span>
              </div>
              <div className="app-stores">
                <a href="#" className="app-link">App Store</a>
                <a href="#" className="app-link">AppGallery</a>
                <a href="#" className="app-link">APK file</a>
                <a href="#" className="app-link">Google Play</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;