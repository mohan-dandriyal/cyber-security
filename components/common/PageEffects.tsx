"use client";

import { useEffect } from "react";

export default function PageEffects() {
  useEffect(() => {
    const preference = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let cleanup = () => {};

    const setup = () => {
      cleanup();
      if (!preference.matches) return;
      let frame = 0;
      let target = window.scrollY;
      let previousTime = 0;
      const stop = () => {
        cancelAnimationFrame(frame);
        frame = 0;
        target = window.scrollY;
      };
      const tick = (time: number) => {
        const elapsed = Math.min(time - previousTime || 16.67, 50);
        previousTime = time;
        target = Math.max(0, Math.min(target, document.documentElement.scrollHeight - window.innerHeight));
        const current = window.scrollY;
        const next = current + (target - current) * (1 - Math.exp(-elapsed / 85));
        window.scrollTo({ top: Math.abs(target - current) < 1 ? target : next, behavior: "instant" });
        if (Math.abs(target - window.scrollY) > 1) frame = requestAnimationFrame(tick);
        else frame = 0;
      };
      const onWheel = (event: WheelEvent) => {
        if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY) return;
        if ([document.body, document.documentElement].some(element => getComputedStyle(element).overflowY === "hidden")) return;
        let element = event.target instanceof Element ? event.target : null;
        if (element?.closest("input, textarea, select, [contenteditable='true']")) return;
        while (element && element !== document.body && element !== document.documentElement) {
          if (/(auto|scroll)/.test(getComputedStyle(element).overflowY) && element.scrollHeight > element.clientHeight) return;
          element = element.parentElement;
        }
        event.preventDefault();
        if (!frame) target = window.scrollY;
        const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
        target = Math.max(0, Math.min(target + delta, document.documentElement.scrollHeight - window.innerHeight));
        if (!frame) { previousTime = performance.now(); frame = requestAnimationFrame(tick); }
      };
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("pointerdown", stop, { passive: true });
      window.addEventListener("keydown", stop);
      window.addEventListener("resize", stop);
      window.addEventListener("hashchange", stop);
      cleanup = () => {
        stop();
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("pointerdown", stop);
        window.removeEventListener("keydown", stop);
        window.removeEventListener("resize", stop);
        window.removeEventListener("hashchange", stop);
      };
    };
    setup();
    preference.addEventListener("change", setup);
    return () => { cleanup(); preference.removeEventListener("change", setup); };
  }, []);

  return null;
}
