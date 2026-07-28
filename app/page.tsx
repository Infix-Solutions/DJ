"use client";
/* eslint-disable @next/next/no-img-element */

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { FormEvent, useEffect, useRef, useState } from "react";

const DeckScene = dynamic(() => import("./components/DeckScene"), {
  ssr: false,
  loading: () => <div className="scene-loader"><span /><small>CALIBRATING DECKS</small></div>,
});

const tracks = [
  { n: "01", title: "Midnight Bombay", genre: "Bollywood House", year: "2024", duration: "5:42" },
  { n: "02", title: "Velvet Hours", genre: "Deep House", year: "2023", duration: "6:18" },
  { n: "03", title: "Monsoon Pulse", genre: "Moombahton", year: "2023", duration: "4:55" },
  { n: "04", title: "Golden Skyline", genre: "Tech House", year: "2022", duration: "7:04" },
];

const cities = [
  ["Kathmandu", "Nepal", "Hyatt Regency", "International"],
  ["Goa", "India", "Grand Hyatt · JW Marriott · The Lalit", "Coastal"],
  ["Mumbai", "India", "Taj · Sahara Star · The Leela Palace", "Metro"],
  ["Pune", "India", "JW Marriott · Sheraton Grand · Conrad", "Home Turf"],
  ["Lonavala", "India", "Della Adventure · Fariyas · Novotel", "Hills"],
  ["Mahabaleshwar", "India", "Le Méridien · The Fern", "Hills"],
  ["Bangalore", "India", "JW Marriott Golfshire", "Metro"],
  ["Daman", "India", "Fortune Park Galaxy", "Coastal"],
];

const highlights = [
  ["01", "Official DJ · MPL", "The soundtrack of Mobile Premier League — energising national campaigns and marquee moments."],
  ["02", "Ultimate Table Tennis", "Live performances powering one of India’s premier professional sporting leagues."],
  ["03", "Ultimate Kho Kho", "Arena-scale energy for the debut season of a reinvented traditional sport."],
  ["04", "150+ Luxury Residencies", "A decade of sets across five-star resorts — from the Taj to the Ritz-Carlton."],
];

const gallery = [
  ["/images/event-silver-jacket.jpg", "THE ARRIVAL", "01"],
  ["/images/event-blue-jacket.jpg", "BLUE HOUR", "02"],
  ["/images/event-booth.jpg", "BEHIND THE DECKS", "03"],
  ["/images/event-black-jacket.jpg", "AFTER DARK", "04"],
  ["/images/event-green-jacket.jpg", "THE RESIDENCY", "05"],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setLoaded(true), reduced ? 80 : 1450);
    if (reduced) return () => window.clearTimeout(timer);

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const rafId = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
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
        gsap.fromTo(element, { y: 72, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".gallery-frame").forEach((element) => {
        const image = element.querySelector("img");
        if (image) gsap.fromTo(image, { yPercent: -8, scale: 1.08 }, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: ({ progress }) => document.documentElement.style.setProperty("--hero-progress", String(progress)),
      });
    }, root);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(rafId);
      context.revert();
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = "mailto:abhinikam47@gmail.com?subject=Booking%20Enquiry%20%E2%80%94%20DJ%20Abhishek";
  };

  return (
    <main ref={root}>
      <AnimatePresence>
        {!loaded && (
          <motion.div className="preloader" exit={{ opacity: 0 }} transition={{ duration: .7 }}>
            <div className="preloader-mark">A<span>.</span></div>
            <p>ENTERING THE WORLD OF</p>
            <div className="preloader-line"><i /></div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="DJ Abhishek home">ABHISHEK<span>.</span></a>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          <a href="#tracks" onClick={() => setMenuOpen(false)}>Tracks</a>
          <a href="#world" onClick={() => setMenuOpen(false)}>World Tour</a>
          <a href="#highlights" onClick={() => setMenuOpen(false)}>Highlights</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#booking" onClick={() => setMenuOpen(false)}>Booking</a>
        </nav>
        <div className="topbar-actions">
          <button className={`audio-control ${soundOn ? "on" : ""}`} onClick={() => setSoundOn(!soundOn)} aria-label={soundOn ? "Mute ambient audio" : "Unmute ambient audio"}>
            <span>{Array.from({ length: 4 }, (_, index) => <i key={index} />)}</span>
            {soundOn ? "SOUND ON" : "SOUND OFF"}
          </button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">
            <i /><i />
          </button>
        </div>
      </header>

      <section className="hero" id="top" aria-label="DJ Abhishek cinematic introduction">
        <div className="hero-brand-ghost" aria-hidden="true">DJ ABHISHEK</div>
        <DeckScene active={soundOn} />
        <div className="hero-copy-block">
          <p className="micro-label">DJ · REMIXER · PRODUCER</p>
          <h1><span>DJ</span><em>Abhishek.</em></h1>
          <p className="hero-intro">An interactive performance from Pune, India.<br />Commanding floors since 2011.</p>
        </div>
        <div className="hero-meta">
          <span>01 / 06</span>
          <span>SCROLL TO ENTER</span>
          <i />
        </div>
        <div className="grain" aria-hidden="true" />
      </section>

      <section className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-set" key={copy}>
              <span className="solid">BOLLYWOOD</span><i>✦</i>
              <span className="hollow">HOUSE</span><i>✦</i>
              <span className="solid">HIP-HOP</span><i>✦</i>
              <span className="hollow">MOOMBAHTON</span><i>✦</i>
              <span className="solid">TECH</span><i>✦</i>
              <span className="hollow">POP</span><i>✦</i>
            </div>
          ))}
        </div>
      </section>

      <section className="chapter tracks" id="tracks">
        <div className="chapter-intro" data-cinematic>
          <p className="section-label"><span>01</span> FEATURED TRACKS</p>
          <h2>Sound<br /><em>in motion</em></h2>
          <p>Four frequencies. Four rooms. One instinct: knowing exactly when the floor is ready to move.</p>
        </div>
        <div className="track-list">
          {tracks.map((track, index) => (
            <article className={activeTrack === index ? "active" : ""} key={track.title} data-cinematic>
              <button className="track-play" onClick={() => setActiveTrack(activeTrack === index ? null : index)} aria-label={`${activeTrack === index ? "Pause" : "Preview"} ${track.title}`}>
                <span>{activeTrack === index ? "Ⅱ" : "▶"}</span>
              </button>
              <div className="vinyl" aria-hidden="true"><i /><b>{track.n}</b></div>
              <div className="track-name"><small>{track.genre}</small><h3>{track.title}</h3></div>
              <div className="track-wave" aria-hidden="true">{Array.from({ length: 30 }, (_, i) => <i key={i} style={{ "--h": `${18 + ((i * 17) % 58)}%` } as React.CSSProperties} />)}</div>
              <div className="track-time">{track.year}<span>{track.duration}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="world" id="world">
        <div className="world-layout">
          <div className="world-left" data-cinematic>
            <div className="world-copy">
              <p className="section-label"><span>02</span> LIVE AROUND THE WORLD</p>
              <h2><span>Every</span><span>room,</span><span><em>every</em> floor</span></h2>
            </div>
            <figure className="world-image">
              <img src="/images/event-green-jacket.jpg" alt="DJ Abhishek performing at a luxury destination venue" loading="lazy" />
              <figcaption><span>150+</span> RESIDENCIES · INDIA & NEPAL</figcaption>
            </figure>
          </div>
          <div className="city-list" data-cinematic>
            {cities.map(([city, country, venue, category], index) => (
              <article key={city} className={index === 0 ? "featured" : ""}>
                <i className="city-pin" aria-hidden="true" />
                <div className="city-name"><h3>{city}</h3><p>{country}</p></div>
                <small>{venue}</small>
                <span>{category}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter highlights" id="highlights">
        <div className="chapter-intro wide" data-cinematic>
          <p className="section-label"><span>03</span> CAREER HIGHLIGHTS</p>
          <h2>The moments<br /><em>that defined it.</em></h2>
        </div>
        <div className="milestone-grid">
          {highlights.map(([n, title, copy]) => (
            <article key={n} data-cinematic><span>{n}</span><div><h3>{title}</h3><p>{copy}</p></div><i>↗</i></article>
          ))}
        </div>
        <div className="statement" data-cinematic><span>2011</span><p>A DECADE OF<br />READING THE ROOM.</p><span>2026</span></div>
      </section>

      <section className="gallery" id="gallery">
        <div className="gallery-head" data-cinematic>
          <p className="section-label"><span>04</span> GALLERY</p>
          <h2>Inside<br /><em>the night.</em></h2>
        </div>
        <div className="gallery-flow">
          {gallery.map(([src, title, n], index) => (
            <figure className={`gallery-frame frame-${index + 1}`} key={src}>
              <img src={src} alt={`${title} — DJ Abhishek live performance`} loading="lazy" />
              <figcaption><span>{n}</span>{title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="booking" id="booking">
        <div className="booking-portrait"><img src="/images/portrait-1400.jpg" alt="DJ Abhishek" loading="lazy" /></div>
        <div className="booking-glow" aria-hidden="true" />
        <div className="booking-content" data-cinematic>
          <p className="section-label"><span>05</span> BOOKING & CONTACT</p>
          <h2>Bring the<br /><em>experience.</em></h2>
          <p>A DJ, remixer and producer from India — blending Bollywood roots with House, Hip-Hop, Tech and Moombahton into a sound that moves every floor.</p>
          <form onSubmit={submitBooking}>
            <button type="submit"><span>REQUEST A BOOKING</span><i>↗</i></button>
          </form>
          <a className="email-link" href="mailto:abhinikam47@gmail.com">ABHINIKAM47@GMAIL.COM</a>
        </div>
        <footer>
          <div className="wordmark">ABHISHEK<span>.</span></div>
          <div className="socials">
            <a href="https://www.instagram.com/deejay_abhii" target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href="#" aria-label="Spotify profile coming soon">Spotify ↗</a>
            <a href="#" aria-label="YouTube profile coming soon">YouTube ↗</a>
            <a href="#" aria-label="SoundCloud profile coming soon">SoundCloud ↗</a>
          </div>
          <p>© 2026 DJ ABHISHEK · PUNE, INDIA</p>
        </footer>
      </section>
    </main>
  );
}
