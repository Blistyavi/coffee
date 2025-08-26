import React, { useEffect, useMemo, useRef, useState } from "react";
import "./HowWeWorkSlider.css";

const STEPS = [
  { n: "01", title: "Заявка", text: "Оставьте заявку — менеджер свяжется в день обращения." },
  { n: "02", title: "Бриф", text: "Уточняем формат, объёмы, сорта и сроки поставок." },
  { n: "03", title: "Договор", text: "Подписываем договор, выставляем счёт/ЗДО." },
  { n: "04", title: "Обжарка", text: "Жарим под ваш профиль и фасуем." },
  { n: "05", title: "Логистика", text: "Доставляем по РФ, СНГ или самовывоз." },
  { n: "06", title: "Поддержка", text: "Отчёты, рекомендации, стабильность качества." },
];

export default function HowWeWorkSlider() {
  const steps = useMemo(() => STEPS, []);
  const [idx, setIdx] = useState(0);
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const count = steps.length;

  // высота вьюпорта = высоте активного слайда (чтобы ничего не прыгало)
  useEffect(() => {
    const el = slideRefs.current[idx];
    if (!el) return;
    const setH = () => {
      const h = el.offsetHeight;
      if (trackRef.current?.parentElement) {
        trackRef.current.parentElement.style.setProperty("--h", `${h}px`);
      }
    };
    setH();
    const ro = new ResizeObserver(setH);
    ro.observe(el);
    return () => ro.disconnect();
  }, [idx]);

  const prev = () => setIdx((i) => Math.max(0, i - 1));
  const next = () => setIdx((i) => Math.min(count - 1, i + 1));

  // управление с клавиатуры (←/→)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="b2b-section">
      <div className="b2b-container">
        <div className="hww">
          <header className="hww-head">
            <h2 className="hww-title">Как мы работаем</h2>
            <p className="hww-sub">Ключевые этапы сотрудничества</p>
          </header>

          <div className="hww-viewport">
            <button
              className="hww-btn left"
              onClick={prev}
              disabled={idx === 0}
              aria-label="Назад"
            >
              ‹
            </button>

            <div
              ref={trackRef}
              className="hww-track"
              style={{ transform: `translateX(-${idx * 100}%)` }}
            >
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  className="hww-slide"
                  ref={(el) => (slideRefs.current[i] = el)}
                >
                  <article className="hww-card">
                    <div className="hww-badge">{s.n}</div>
                    <h3 className="hww-card-title">{s.title}</h3>
                    <p className="hww-card-text">{s.text}</p>
                  </article>
                </div>
              ))}
            </div>

            <button
              className="hww-btn right"
              onClick={next}
              disabled={idx === count - 1}
              aria-label="Вперёд"
            >
              ›
            </button>
          </div>

          <div className="hww-dots" role="tablist" aria-label="Слайды">
            {steps.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === idx ? "active" : ""}`}
                onClick={() => setIdx(i)}
                aria-label={`Шаг ${i + 1}`}
                aria-selected={i === idx}
                role="tab"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
