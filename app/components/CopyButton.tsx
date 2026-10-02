"use client";

import { useRef, useState } from "react";

export default function CopyButton({ text, targetId }: { text: string; targetId: string }) {
  const [label, setLabel] = useState("Copy");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Fall back to selecting the address so the visitor can copy it by hand.
  const select = () => {
    const el = document.getElementById(targetId);
    const sel = window.getSelection();
    if (!el || !sel) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setLabel("Copied");
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setLabel("Copy"), 1600);
    } catch {
      select();
    }
  };

  return (
    <button className="toggle" type="button" onClick={copy} aria-label="Copy email address">
      {label}
    </button>
  );
}
