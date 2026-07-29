"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

export function useSiteExperience() {
  const [loaded, setLoaded] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setLoaded(true), reduced ? 80 : 1450);
    if (reduced) return () => window.clearTimeout(timer);

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    const updateScroll = () => ScrollTrigger.update();
    const updateLenis = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", updateScroll);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.to(".hero-copy-block", {
        yPercent: -38,
        opacity: 0,
        scrollTrigger: { trigger: ".hero", start: "top top", end: "55% top", scrub: true },
      });
      gsap.to(".hero-brand-ghost", {
        scale: 1.16,
        opacity: 0,
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>("[data-cinematic]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 72, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>(".gallery-frame").forEach((element) => {
        const image = element.querySelector("img");
        if (!image) return;
        gsap.fromTo(
          image,
          { yPercent: -8, scale: 1.08 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: ({ progress }) => {
          document.documentElement.style.setProperty("--hero-progress", String(progress));
        },
      });
    }, rootRef);

    return () => {
      window.clearTimeout(timer);
      context.revert();
      lenis.off("scroll", updateScroll);
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let targetX = 0;
    let targetY = 0;
    let ringX = 0;
    let ringY = 0;
    let visible = false;
    let frame = 0;

    document.documentElement.classList.add("custom-cursor-active");

    const moveCursor = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        ringX = targetX;
        ringY = targetY;
        visible = true;
        dot.classList.add("is-visible");
        ring.classList.add("is-visible");
      }

      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      const interactive =
        event.target instanceof Element &&
        Boolean(event.target.closest("a, button, input, textarea, select, [role='button']"));
      dot.classList.toggle("is-hovering", interactive);
      ring.classList.toggle("is-hovering", interactive);
    };

    const hideCursor = () => {
      visible = false;
      dot.classList.remove("is-visible");
      ring.classList.remove("is-visible");
    };

    const animateRing = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(animateRing);
    };

    frame = requestAnimationFrame(animateRing);
    window.addEventListener("pointermove", moveCursor);
    window.addEventListener("blur", hideCursor);
    document.documentElement.addEventListener("mouseleave", hideCursor);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("blur", hideCursor);
      document.documentElement.removeEventListener("mouseleave", hideCursor);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return { loaded, rootRef, cursorDotRef, cursorRingRef };
}
