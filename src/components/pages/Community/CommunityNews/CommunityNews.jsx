import React, { useMemo } from "react";
import "./CommunityNews.css";

// заглушки с новостями (можно потом подтягивать из API)
const RAW_NEWS = [
  {
    id: "n1",
    title: "Каппинг новой Эфиопии: йирга, ягоды и жасмин",
    excerpt: "Провели закрытый каппинг свежей партии. Делимся впечатлениями и профилями.",
    cover: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=1200&auto=format&fit=crop",
    tag: "Дегустации",
    date: "12 авг 2025",
    readMin: 4,
  },
  {
    id: "n2",
    title: "Как мы обновили обжарку для эспрессо-смесей",
    excerpt: "Рассказываем, как добились более плотного тела и карамельной сладости.",
    cover: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop",
    tag: "Производство",
    date: "9 авг 2025",
    readMin: 3,
  },
  {
    id: "n3",
    title: "Встреча комьюнити: турнир по альтернативе",
    excerpt: "Аэропресс, V60 и немного соревновательного духа. Присоединяйтесь!",
    cover: "https://images.unsplash.com/photo-1510707577719-ae7c082f94a4?q=80&w=1200&auto=format&fit=crop",
    tag: "События",
    date: "3 авг 2025",
    readMin: 2,
  },
  {
    id: "n4",
    title: "Гайд: как выбрать помол под свой метод",
    excerpt: "Простой чек-лист: что менять в помоле и как стабильно варить вкусно.",
    cover: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop",
    tag: "Гайды",
    date: "28 июл 2025",
    readMin: 5,
  },
  {
    id: "n5",
    title: "Запускаем волонтёрскую программу",
    excerpt: "Помогай на событиях и каппингах, прокачивай скиллы, получай бонусы.",
    cover: "https://images.unsplash.com/photo-1501747315-124a0eaca060?q=80&w=1200&auto=format&fit=crop",
    tag: "Сообщество",
    date: "22 июл 2025",
    readMin: 2,
  },
];

export default function CommunityNews() {
  const news = useMemo(() => RAW_NEWS, []);

  return (
    <div className="cn-grid">
      {news.map((n) => (
        <article key={n.id} className="cn-card">
          <a className="cn-media" href={`/community/${n.id}`} aria-label={n.title}>
            <img loading="lazy" src={n.cover} alt={n.title} />
            <span className="cn-tag">{n.tag}</span>
          </a>

          <div className="cn-body">
            <h3 className="cn-title">
              <a href={`/community/${n.id}`}>{n.title}</a>
            </h3>
            <p className="cn-excerpt">{n.excerpt}</p>

            <div className="cn-meta">
              <span>{n.date}</span>
              <span>•</span>
              <span>{n.readMin} мин</span>
              <a className="cn-more" href={`/community/${n.id}`} aria-label="Читать">
                Читать →
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
