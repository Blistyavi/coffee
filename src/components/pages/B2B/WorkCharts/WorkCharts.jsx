import React, { useEffect, useMemo, useRef, useState } from "react";
import "./WorkCharts.css";

/* ================= data ================= */

const MONTHS = ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"];
const ORDERS = [120, 160, 145, 190, 220, 260, 240, 285, 310, 340, 325, 360];
const CONV   = [72, 73, 74, 75, 76, 78, 77, 79, 80, 81, 80, 82];

const MIX = [
  { label: "Арабика", value: 62, color: "#8B5A2B" },
  { label: "Робуста", value: 23, color: "#C9A27E" },
  { label: "Смеси",   value: 15, color: "#E6D2BE" },
];

/* ================ helpers ================ */

function linePath(values, w, h, pad = 16) {
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(1, max - min);
  const stepX = innerW / (values.length - 1);

  return values
    .map((v, i) => {
      const x = pad + i * stepX;
      const y = pad + innerH - ((v - min) / range) * innerH;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

/* ================= charts ================= */

function OrdersLine() {
  const W = 680;
  const H = 240;

  const d = useMemo(() => linePath(ORDERS, W, H, 18), []);
  const pathRef = useRef(null);
  const [len, setLen] = useState(0);

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, []);

  const max = Math.max(...ORDERS);
  const min = Math.min(...ORDERS);
  const range = Math.max(1, max - min);
  const stepX = (W - 36) / (ORDERS.length - 1);

  return (
    <div className="wc-card">
      <div className="wc-card-head"><h3>Заказы по месяцам</h3></div>

      <svg className="wc-line" viewBox={`0 0 ${W} ${H}`} width="100%" height="240">
        <g className="grid">
          {[0,1,2,3].map(g => (
            <line key={g} x1="0" x2={W} y1={(H/4)*(g+1)} y2={(H/4)*(g+1)} />
          ))}
        </g>

        <path
          ref={pathRef}
          d={d}
          className="trace anim-path"
          style={{
            strokeDasharray: len,
            strokeDashoffset: len,
            /* чтобы @keyframes drawPath стартовал точно с длины пути */
            "--len": len
          }}
        />

        {ORDERS.map((v, idx) => {
          const x = 18 + idx * stepX;
          const y = 18 + (H - 36) - ((v - min) / range) * (H - 36);
          return (
            <g key={`pt-${idx}`} className="pt">
              <circle cx={x} cy={y} r="4" />
              <text x={x} y={y - 10}>{v}</text>
            </g>
          );
        })}

        {MONTHS.map((m, idx) => (
          <text key={`m-${idx}`} className="xlabel" x={18 + idx * stepX} y={H - 6}>{m}</text>
        ))}
      </svg>
    </div>
  );
}

function ConversionBars() {
  const MAX_H = 170; // высота области столбиков в px

  return (
    <div className="wc-card">
      <div className="wc-card-head"><h3>Конверсия доставки</h3></div>

      <div className="bars-wrap">
        {CONV.map((v, idx) => {
          const hpx = Math.round((v / 100) * MAX_H);
          return (
            <div key={`b-${idx}`} className="bar-item">
              <div className="bar-box" style={{ height: `${MAX_H}px` }}>
                <div
                  className="bar anim-height"
                  style={{ "--hpx": `${hpx}px` }}
                  aria-label={`${v}%`}
                />
              </div>
              <div className="bar-cap">{v}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AssortmentDonut() {
  const size = 300;
  const thickness = 28;
  const r = (size - thickness) / 2;
  const C = 2 * Math.PI * r;

  const GAP = 3; // px между сегментами
  const gapsTotal = GAP * MIX.length;
  const unit = (C - gapsTotal) / 100; // длина дуги на 1%

  const arcs = useMemo(() => {
    let acc = 0;
    return MIX.map((seg, idx) => {
      const len = seg.value * unit;
      const dasharray = `${len} ${C}`;
      const offset = -(acc) - idx * GAP;
      const start = offset - len;
      const end = offset;
      acc += len;
      return { key: seg.label, color: seg.color, len, dasharray, start, end, delay: idx * 160 };
    });
  }, [C, unit]);

  const total = MIX.reduce((s, x) => s + x.value, 0);

  return (
    <div className="wc-card">
      <div className="wc-card-head"><h3>Состав ассортимента</h3></div>

      <div className="donut">
        <svg className="donut-svg" viewBox={`0 0 ${size} ${size}`} width="100%" height={size}>
          <g transform={`rotate(-90 ${size/2} ${size/2})`}>
            <circle
              cx={size/2} cy={size/2} r={r}
              className="donut-track" strokeWidth={thickness} fill="none"
            />
            <g className="donut-arcs">
              {arcs.map((a, idx) => (
                <circle
                  key={`arc-${idx}`}
                  className="arc anim-sweep-offset"
                  cx={size/2} cy={size/2} r={r}
                  fill="none"
                  stroke={a.color}
                  strokeWidth={thickness}
                  strokeDasharray={a.dasharray}
                  strokeDashoffset={a.end}
                  style={{
                    "--start": a.start,
                    "--end": a.end,
                    "--delay": `${a.delay}ms`,
                  }}
                />
              ))}
            </g>
          </g>

          <text className="donut-center" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
            {total}%
          </text>
        </svg>

        <ul className="donut-legend">
          {MIX.map((seg, idx) => (
            <li key={`lg-${idx}`}>
              <span className="dot" style={{ background: seg.color }} />
              <span className="name">{seg.label}</span>
              <span className="val">{seg.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ================ export ================ */

export default function WorkCharts() {
  return (
    <section className="wc-grid">
      <OrdersLine />
      <ConversionBars />
      <AssortmentDonut />
    </section>
  );
}
