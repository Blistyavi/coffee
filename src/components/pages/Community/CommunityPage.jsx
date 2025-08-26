import React from "react";
import CommunityNews from "./CommunityNews/CommunityNews";

export default function CommunityPage() {
  return (
    <>

      <main className="page-main">
        <section className="container" style={{padding: "24px 0 40px"}}>
          <h1 style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "28px",
            margin: "4px 0 14px",
            letterSpacing: ".5px"
          }}>
            Сообщество
          </h1>
          <p style={{color:"#666b73", marginBottom: 18}}>
            Новости о кофе, жизни сообщества и наших активностях.
          </p>

          <CommunityNews />
        </section>
      </main>

    </>
  );
}
