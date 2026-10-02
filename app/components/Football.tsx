"use client";

import { useEffect, useRef } from "react";

// Panel geometry for a 100x100 viewBox centered on 0,0.
const UP = -Math.PI / 2;
const STEP = (2 * Math.PI) / 5;
const pt = (r: number, a: number, cx = 0, cy = 0) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
const pent = (cx: number, cy: number, r: number, rot: number) =>
  Array.from({ length: 5 }, (_, i) => pt(r, rot + i * STEP, cx, cy).map((n) => n.toFixed(2)).join(",")).join(" ");

const seams: number[][] = [];
const patches: string[] = [pent(0, 0, 17, UP)];
for (let i = 0; i < 5; i++) {
  const a = UP + i * STEP;
  seams.push([...pt(17, a), ...pt(33, a)]);
  seams.push([...pt(33, a), ...pt(42, a + 0.38)]);
  seams.push([...pt(33, a), ...pt(42, a - 0.38)]);
  const b = a + Math.PI / 5;
  const [cx, cy] = pt(50, b);
  patches.push(pent(cx, cy, 19, b + Math.PI));
}

export default function Football() {
  const ballRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<SVGGElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ball = ballRef.current!;
    const spin = spinRef.current!;
    const hint = hintRef.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let mouse = false;
    let tx = innerWidth - 26;
    let ty = 80;
    let x = tx;
    let y = ty;
    let px = x;
    let py = y;
    let rot = 0;
    let sv = 0;
    let lastScroll = scrollY;
    let raf = 0;
    let hintTimer: ReturnType<typeof setTimeout> | undefined;

    if (window.matchMedia("(hover: none)").matches) {
      hint.hidden = false;
      hintTimer = setTimeout(() => (hint.hidden = true), 5000);
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      tx = e.clientX + 22;
      ty = e.clientY + 22;
      if (!mouse) {
        mouse = true;
        hint.hidden = true;
        x = px = tx;
        y = py = ty;
      }
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target instanceof Element && e.target.closest("a, button, summary");
      ball.classList.toggle("hot", !!t);
    };
    const onLeave = () => {
      mouse = false;
    };
    const onScroll = () => {
      const d = scrollY - lastScroll;
      lastScroll = scrollY;
      sv += d;
      if (!reduce) rot += d * 1.4;
    };

    const loop = () => {
      sv *= 0.86;
      let gx = tx;
      let gy = ty;
      if (!mouse) {
        const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        const p = Math.min(1, Math.max(0, scrollY / max));
        gx = innerWidth - 26;
        gy = 80 + p * (innerHeight - 160);
      } else if (!reduce) {
        gy -= Math.max(-70, Math.min(70, sv)) * 0.9 * 0.6;
      }
      const k = reduce ? 1 : mouse ? 0.16 : 0.1;
      x += (gx - x) * k;
      y += (gy - y) * k;
      if (!reduce) rot += (x - px + (y - py) * 0.6) * 3.6;
      px = x;
      py = y;
      ball.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
      spin.setAttribute("transform", `rotate(${rot.toFixed(1)})`);
      raf = requestAnimationFrame(loop);
    };

    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("pointerover", onOver, { passive: true });
    addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hintTimer);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerover", onOver);
      removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div className="ball" ref={ballRef} aria-hidden="true">
        <svg viewBox="-50 -50 100 100">
          <defs>
            <clipPath id="bc">
              <circle r="48" />
            </clipPath>
            <radialGradient id="bs" cx=".35" cy=".3" r=".8">
              <stop offset="0" stopColor="#fff" stopOpacity=".45" />
              <stop offset=".55" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity=".28" />
            </radialGradient>
          </defs>
          <circle r="48" className="b-fill" />
          <g ref={spinRef} clipPath="url(#bc)">
            {seams.map(([x1, y1, x2, y2], i) => (
              <line key={`s${i}`} x1={x1} y1={y1} x2={x2} y2={y2} className="b-seam" />
            ))}
            {patches.map((points, i) => (
              <polygon key={`p${i}`} points={points} className="b-patch" />
            ))}
          </g>
          <circle r="48" fill="url(#bs)" />
          <circle r="48" className="b-ring" />
        </svg>
      </div>
      <div className="hint mono" ref={hintRef} hidden>
        Football rides the scroll bar. Move a mouse to take over.
      </div>
    </>
  );
}
