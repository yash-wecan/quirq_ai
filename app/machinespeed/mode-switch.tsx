"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./machinespeed.module.css";

/**
 * "Which sounds like you?" The choice swaps the hero and closing copy for the
 * reader's situation. It is written to <html data-mode> so server-rendered
 * paragraphs anywhere on the page can respond through CSS alone, and it is
 * removed on unmount because the root layout outlives this route.
 */

type Mode = "stuck" | "scale";
const KEY = "ms-mode";
const OPTIONS: { mode: Mode; label: string }[] = [
  { mode: "stuck", label: "We rushed AI in. It's fragile." },
  { mode: "scale", label: "AI works here. We want it everywhere." },
];

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function ModeSwitch() {
  const [mode, setMode] = useState<Mode | null>(null);
  const seg = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {}
    if (saved === "stuck" || saved === "scale") setMode(saved);
    return () => document.documentElement.removeAttribute("data-mode");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (mode) root.setAttribute("data-mode", mode);
    else root.removeAttribute("data-mode");
  }, [mode]);

  const place = useCallback(() => {
    const t = thumb.current;
    const btn = seg.current?.querySelector<HTMLButtonElement>('button[aria-pressed="true"]');
    if (!t) return;
    if (!btn) {
      t.style.width = "0";
      return;
    }
    t.style.width = `${btn.offsetWidth}px`;
    t.style.transform = `translate(${btn.offsetLeft - 4}px, ${btn.offsetTop - 4}px)`;
  }, []);

  useIsoLayoutEffect(place, [mode, place]);

  useEffect(() => {
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [place]);

  const choose = (next: Mode) => {
    const value = mode === next ? null : next;
    setMode(value);
    try {
      localStorage.setItem(KEY, value ?? "");
    } catch {}
  };

  return (
    <div className={styles.switcher}>
      <span className={styles.k}>Which sounds like you?</span>
      <div ref={seg} className={styles.seg} role="group" aria-label="Choose your situation">
        <span ref={thumb} className={styles.thumb} aria-hidden />
        {OPTIONS.map((o) => (
          <button key={o.mode} type="button" aria-pressed={mode === o.mode} onClick={() => choose(o.mode)}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
