import React, { useEffect } from "react";

export default function MailRuCallback() {
  useEffect(() => {
    try {
      const raw = window.location.hash.startsWith("#")
        ? window.location.hash.slice(1)
        : window.location.hash;
      const p = new URLSearchParams(raw);
      const access_token = p.get("access_token");
      const state = p.get("state");
      if (access_token && window.opener) {
        window.opener.postMessage({ provider: "mailru", access_token, state }, window.location.origin);
      }
    } catch {
      // ignore
    } finally {
      setTimeout(() => window.close(), 200);
    }
  }, []);

  return <div style={{ padding: 20, fontFamily: "Oswald, sans-serif" }}>Можно закрыть это окно…</div>;
}
