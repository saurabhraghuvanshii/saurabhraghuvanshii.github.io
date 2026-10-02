"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";
const KEY = "sr-theme";

const read = (): Theme => (document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, read, () => "dark" as Theme);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    if (next === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  };

  return (
    <button className="toggle" type="button" onClick={toggle} aria-label="Switch between Ink and Paper theme">
      {theme === "light" ? "Ink" : "Paper"}
    </button>
  );
}
