import B2BHeader from "./Header/B2BHeader";
import B2BFooter from "./Footer/B2BFooter";
import "./B2BPage.css";

// секции
import HowWeWorkSlider from "./HowWeWorkSlider/HowWeWorkSlider";
import WorkCharts from "./WorkCharts/WorkCharts";

export default function B2BPage() {
  return (
    <>
      <B2BHeader />

      {/* Основной контент B2B */}
      <main className="b2b-page" role="main">
        {/* Хиро-блок */}
        <section className="b2b-section b2b-hero" aria-label="О компании опт">
          <div className="b2b-container">
            <h1 className="b2b-title">Оптовый отдел</h1>
            <p className="b2b-sub">
              Кофе, чай, аксессуары — поставки для HoReCa и розницы.
            </p>
          </div>
        </section>

        {/* Блок с карточками и графиками */}
        <section className="b2b-section b2b-orbit" aria-label="Как мы работаем">
          <div className="b2b-container">
            <HowWeWorkSlider />
            <WorkCharts />
          </div>
        </section>
      </main>

      <B2BFooter />
    </>
  );
}
