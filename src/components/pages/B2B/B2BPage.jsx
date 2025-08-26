// B2BPage.jsx
import React from "react";
import B2BHeader from "./Header/B2BHeader";
import B2BFooter from "./Footer/B2BFooter";
import "./B2BPage.css";
import HowWeWorkSlider from "./HowWeWorkSlider/HowWeWorkSlider";
import WorkCharts from "./WorkCharts/WorkCharts";

export default function B2BPage() {
  return (
    <>
      <B2BHeader />

      <main className="b2b-page">
        {/* Небольшой хиро-блок (при желании можно убрать) */}
        <section className="b2b-section b2b-hero">
          <div className="b2b-container">
            <h1 className="b2b-title">Оптовый отдел</h1>
            <p className="b2b-sub">
              Кофе, чай, аксессуары — поставки для HoReCa и розницы.
            </p>
          </div>
        </section>

        {/* Орбита с карточками. Большой нижний паддинг — чтобы ничего не накладывалось. */}
        <section className="b2b-section b2b-orbit">
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
