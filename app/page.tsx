"use client";

import { useEffect, useRef, useState } from "react";

const cities = [
  { name: "Pune", note: "Home city", img: "/images/pune.jpg" },
  { name: "Mumbai", note: "Taj · Sahara Star · JW Marriott", img: "/images/cities.jpg" },
  { name: "Goa", note: "Grand Hyatt · Marriott · Novotel", img: "/images/cities.jpg" },
  { name: "Kathmandu", note: "International tour · Hyatt", img: "/images/cities.jpg" },
];

const genres = ["Bollywood", "House", "Pop", "Hip-Hop", "Tech", "Moombahton"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const move = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      hero.style.setProperty("--mx", `${x}`);
      hero.style.setProperty("--my", `${y}`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="DJ Abhishek home">
          <span className="brand-mark">A</span>
          <span className="brand-copy">DJ <b>ABHISHEK</b></span>
        </a>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#story" onClick={() => setMenuOpen(false)}>Story</a>
          <a href="#shows" onClick={() => setMenuOpen(false)}>Shows</a>
          <a href="#sound" onClick={() => setMenuOpen(false)}>Sound</a>
          <a className="nav-cta" href="#book" onClick={() => setMenuOpen(false)}>Book now ↗</a>
        </div>
        <button
          className="menu"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </nav>

      <section className="hero" id="top" ref={heroRef}>
        <div className="hero-bg" />
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="hero-content">
          <p className="eyebrow"><span /> DJ · REMIXER · PRODUCER</p>
          <h1>
            <span>Turn up</span>
            <strong>the night.</strong>
          </h1>
          <p className="hero-copy">
            India&apos;s high-energy open-format artist, moving dance floors since 2011.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#book">Book the night <span>↗</span></a>
            <a className="button ghost" href="#shows">Explore the journey <span>↓</span></a>
          </div>
        </div>
        <div className="hero-side">
          <div className="since"><b>13+</b><span>years<br />on stage</span></div>
          <div className="line" />
          <div className="scroll-copy">SCROLL TO FEEL THE SET</div>
        </div>
        <button
          className="sound-toggle"
          onClick={() => setSoundOn(!soundOn)}
          aria-label={soundOn ? "Mute visualizer" : "Activate visualizer"}
        >
          <span className={`bars ${soundOn ? "playing" : ""}`}>
            {[1, 2, 3, 4].map((bar) => <i key={bar} />)}
          </span>
          {soundOn ? "LIVE ENERGY" : "PAUSED"}
        </button>
      </section>

      <section className="ticker" aria-label="DJ genres">
        <div>
          {[...genres, ...genres].map((genre, i) => (
            <span key={`${genre}-${i}`}>{genre} <b>✦</b></span>
          ))}
        </div>
      </section>

      <section className="story section" id="story">
        <div className="section-index">01 / THE ARTIST</div>
        <div className="story-grid">
          <div className="portrait-stage">
            <div className="portrait-card" />
            <div className="stamp">SINCE<br /><b>2011</b></div>
            <span className="vertical-label">PUNE · INDIA · WORLDWIDE</span>
          </div>
          <div className="story-copy">
            <p className="kicker">CONFIDENCE IN EVERY DROP</p>
            <h2>Built for the<br /><em>big moment.</em></h2>
            <p className="lead">
              DJ Abhishek is a Pune-based DJ, remixer and producer known for
              fearless transitions, sharp crowd reading and sets engineered to peak.
            </p>
            <p>
              From luxury resorts and city clubs to national sports leagues and an
              international show at Hyatt Kathmandu, every room becomes his stage.
            </p>
            <div className="stats">
              <div><b>40+</b><span>Premium venues</span></div>
              <div><b>10+</b><span>Cities performed</span></div>
              <div><b>03</b><span>Sports leagues</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="sound section" id="sound">
        <div className="section-index">02 / THE SOUND</div>
        <div className="sound-head">
          <h2>One booth.<br /><em>Every frequency.</em></h2>
          <p>An open-format journey grounded in Bollywood and built to move without borders.</p>
        </div>
        <div className="genre-stack">
          {genres.map((genre, index) => (
            <div className="genre" key={genre}>
              <span>0{index + 1}</span>
              <h3>{genre}</h3>
              <i style={{ width: `${95 - index * 7}%` }} />
              <b>{index % 2 ? "NIGHT DRIVE" : "PEAK HOUR"}</b>
            </div>
          ))}
        </div>
      </section>

      <section className="shows section" id="shows">
        <div className="section-index">03 / PLAYED HERE</div>
        <div className="shows-head">
          <h2>From Pune<br />to <em>everywhere.</em></h2>
          <p>Hotels, destination resorts, arenas and city nights across India and beyond.</p>
        </div>
        <div className="city-grid">
          {cities.map((city, index) => (
            <article className="city-card" key={city.name}>
              <div className="city-image" style={{ backgroundImage: `url(${city.img})` }} />
              <span>0{index + 1}</span>
              <div>
                <h3>{city.name}</h3>
                <p>{city.note}</p>
              </div>
              <b>↗</b>
            </article>
          ))}
        </div>
        <div className="credits">
          <span>OFFICIAL DJ FOR</span>
          <b>MPL</b>
          <b>ULTIMATE TABLE TENNIS 2023</b>
          <b>ULTIMATE KHO KHO 2022</b>
        </div>
      </section>

      <section className="booking" id="book">
        <div className="booking-noise" />
        <div className="booking-content">
          <p className="kicker">YOUR CROWD. HIS FREQUENCY.</p>
          <h2>Ready to make<br />it <em>unforgettable?</em></h2>
          <a className="booking-button" href="mailto:abhinikam47@gmail.com">
            <span>Start a booking</span><b>↗</b>
          </a>
          <div className="contact-row">
            <a href="https://instagram.com/deejay_abhii" target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href="https://facebook.com/abhishek.nik.7" target="_blank" rel="noreferrer">Facebook ↗</a>
            <a href="mailto:abhinikam47@gmail.com">abhinikam47@gmail.com</a>
          </div>
        </div>
        <div className="booking-monogram">A</div>
      </section>

      <footer>
        <div className="brand footer-brand">
          <span className="brand-mark">A</span>
          <span className="brand-copy">DJ <b>ABHISHEK</b></span>
        </div>
        <p>DJ · REMIXER · PRODUCER · PUNE, INDIA</p>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
