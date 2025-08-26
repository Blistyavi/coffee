import React, { useState } from "react";
import JournalHero from "./JournalHero";
import JournalCategories from "./JournalCategories";
import JournalArticles from "./JournalArticles";
import JournalFeatured from "./JournalFeatured";
import JournalSubscribe from "./JournalSubscribe";

export default function JournalPage() {
  const [category, setCategory] = useState("Все");

  return (
    <>
      <main>
        <JournalHero />
        <JournalCategories onSelect={setCategory} />
        <JournalFeatured />
        <JournalArticles category={category} />
        <JournalSubscribe />
      </main>
    </>
  );
}
