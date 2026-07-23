"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";

const cities = [
  { name: "Pune", note: "Home city", img: "/images/pune.jpg" },
  { name: "Mumbai", note: "Taj · Sahara Star · JW Marriott", img: "/images/cities.jpg" },
  { name: "Goa", note: "Grand Hyatt · Marriott · Novotel", img: "/images/cities.jpg" },
  { name: "Kathmandu", note: "International tour · Hyatt", img: "/images/cities.jpg" },
];

const genres = ["Bollywood", "House", "Pop", "Hip-Hop", "Tech", "Moombahton"];

const events = [
  { title: "Neon Afterdark", type: "Club", city: "Pune", date: "May 2026", img: "/images/press-cover.jpg", position: "66% center" },
  { title: "Skyline Sessions", type: "Festival", city: "Mumbai", date: "April 2026", img: "/images/biography.jpg", position: "76% center" },
  { title: "The Grand Wedding", type: "Wedding", city: "Goa", date: "March 2026", img: "/images/hiring.jpg", position: "25% center" },
  { title: "Arena Pulse", type: "Sports", city: "Bengaluru", date: "February 2026", img: "/images/cities.jpg", position: "30% center" },
  { title: "Sundown Society", type: "Festival", city: "Lonavala", date: "January 2026", img: "/images/pune.jpg", position: "75% center" },
  { title: "Midnight Circuit", type: "Club", city: "Pune", date: "December 2025", img: "/images/press-cover.jpg", position: "24% center" },
  { title: "Royal Reception", type: "Wedding", city: "Mahabaleshwar", date: "November 2025", img: "/images/biography.jpg", position: "25% center" },
  { title: "League Night", type: "Sports", city: "Mumbai", date: "October 2025", img: "/images/cities.jpg", position: "74% center" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[number] | null>(null);
  const [booking, setBooking] = useState({ name: "", date: "", city: "", event: "Wedding" });
  const heroRef = useRef<HTMLElement>(null);
  const bookingMessage = `Hi DJ Abhishek! I would like to enquire about a ${booking.event} booking${booking.date ? ` on ${booking.date}` : ""}${booking.city ? ` in ${booking.city}` : ""}.${booking.name ? ` My name is ${booking.name}.` : ""}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(bookingMessage)}`;

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const move = (event: PointerEvent) => {
      if (reducedMotion || !finePointer) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      hero.style.setProperty("--mx", `${x}`);
      hero.style.setProperty("--my", `${y}`);
    };
    let frame = 0;
    const updateProgress = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        document.documentElement.style.setProperty("--scroll", `${max > 0 ? window.scrollY / max : 0}`);
        frame = 0;
      });
    };
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => revealObserver.observe(element));
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setContactOpen(false);
        setSelectedEvent(null);
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("keydown", closeOnEscape);
    updateProgress();
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("keydown", closeOnEscape);
      revealObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const sendEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`DJ booking enquiry - ${booking.event}`);
    const body = encodeURIComponent(`${bookingMessage}\n\nPlease share availability and pricing.`);
    window.location.href = `mailto:abhinikam47@gmail.com?subject=${subject}&body=${body}`;
  };
  const visibleEvents = galleryFilter === "All" ? events : events.filter((event) => event.type === galleryFilter);

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="DJ Abhishek home">
          <span className="brand-mark">A</span>
          <span className="brand-copy">DJ <b>ABHISHEK</b></span>
        </a>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#story" onClick={() => setMenuOpen(false)}>Story</a>
          <a href="#shows" onClick={() => setMenuOpen(false)}>Shows</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
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

      <section className="story section" id="story" data-reveal>
        <div className="section-index">01 / THE ARTIST</div>
        <div className="story-grid">
          <div className="portrait-stage" data-reveal>
            <div className="portrait-card">
              <Image
                src="/images/biography.jpg"
                alt="DJ Abhishek in a black jacket"
                fill
                sizes="(max-width: 900px) 92vw, 42vw"
              />
            </div>
            <div className="stamp">SINCE<br /><b>2011</b></div>
            <span className="vertical-label">PUNE · INDIA · WORLDWIDE</span>
          </div>
          <div className="story-copy" data-reveal>
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

      <section className="sound section" id="sound" data-reveal>
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

      <section className="shows section" id="shows" data-reveal>
        <div className="section-index">03 / PLAYED HERE</div>
        <div className="shows-head">
          <h2>From Pune<br />to <em>everywhere.</em></h2>
          <p>Hotels, destination resorts, arenas and city nights across India and beyond.</p>
        </div>
        <div className="city-grid">
          {cities.map((city, index) => (
            <article className="city-card" key={city.name}>
              <Image
                className="city-image"
                src={city.img}
                alt=""
                fill
                sizes="(max-width: 580px) 92vw, (max-width: 900px) 46vw, 25vw"
              />
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

      <section className="gallery section" id="gallery" data-reveal>
        <div className="section-index">04 / EVENT ARCHIVE</div>
        <div className="gallery-head">
          <div>
            <p className="kicker">MOMENTS FROM THE BOOTH</p>
            <h2>Lights. Crowd.<br /><em>Full volume.</em></h2>
          </div>
          <p>
            A temporary look at club nights, festivals, weddings and arena energy.
            Replace these with real event shots whenever they are ready.
          </p>
        </div>
        <div className="gallery-filters" aria-label="Filter events">
          {["All", "Club", "Festival", "Wedding", "Sports"].map((filter) => (
            <button
              key={filter}
              className={galleryFilter === filter ? "active" : ""}
              onClick={() => setGalleryFilter(filter)}
              aria-pressed={galleryFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="gallery-grid">
          {visibleEvents.map((event, index) => (
            <button
              className="gallery-card"
              key={event.title}
              onClick={() => setSelectedEvent(event)}
              aria-label={`View ${event.title} event`}
            >
              <Image
                src={event.img}
                alt=""
                fill
                sizes="(max-width: 580px) 92vw, (max-width: 900px) 46vw, 33vw"
                style={{ objectPosition: event.position }}
              />
              <span className="gallery-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="gallery-type">{event.type}</span>
              <span className="gallery-meta">
                <strong>{event.title}</strong>
                <small>{event.city} · {event.date}</small>
              </span>
              <span className="gallery-open">View ↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="booking" id="book" data-reveal>
        <div className="booking-noise" />
        <div className="booking-content">
          <p className="kicker">YOUR CROWD. HIS FREQUENCY.</p>
          <h2>Ready to make<br />it <em>unforgettable?</em></h2>
          <form className="booking-form" onSubmit={sendEmail}>
            <label>
              <span>Your name</span>
              <input
                type="text"
                autoComplete="name"
                placeholder="Name"
                value={booking.name}
                onChange={(event) => setBooking({ ...booking, name: event.target.value })}
              />
            </label>
            <label>
              <span>Event type</span>
              <select value={booking.event} onChange={(event) => setBooking({ ...booking, event: event.target.value })}>
                <option>Wedding</option>
                <option>Club night</option>
                <option>Corporate event</option>
                <option>Festival</option>
                <option>Private party</option>
              </select>
            </label>
            <label>
              <span>Event date</span>
              <input type="date" value={booking.date} onChange={(event) => setBooking({ ...booking, date: event.target.value })} />
            </label>
            <label>
              <span>Event city</span>
              <input
                type="text"
                autoComplete="address-level2"
                placeholder="City"
                value={booking.city}
                onChange={(event) => setBooking({ ...booking, city: event.target.value })}
              />
            </label>
            <button className="booking-button" type="submit">
              <span>Send by email</span><b>↗</b>
            </button>
            <a className="booking-button whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
              <span>Continue on WhatsApp</span><b>↗</b>
            </a>
          </form>
          <div className="contact-row">
            <a href="https://instagram.com/deejay_abhii" target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href="https://facebook.com/abhishek.nik.7" target="_blank" rel="noreferrer">Facebook ↗</a>
            <a href="mailto:abhinikam47@gmail.com">abhinikam47@gmail.com</a>
          </div>
        </div>
        <div className="booking-monogram">A</div>
      </section>

      {selectedEvent && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedEvent.title} event preview`}
          onClick={() => setSelectedEvent(null)}
        >
          <button className="lightbox-close" onClick={() => setSelectedEvent(null)} aria-label="Close gallery preview">×</button>
          <div className="lightbox-frame" onClick={(event) => event.stopPropagation()}>
            <Image
              src={selectedEvent.img}
              alt={`${selectedEvent.title}, ${selectedEvent.city}`}
              fill
              sizes="95vw"
              priority
              style={{ objectPosition: selectedEvent.position }}
            />
            <div className="lightbox-caption">
              <span>{selectedEvent.type}</span>
              <h3>{selectedEvent.title}</h3>
              <p>{selectedEvent.city} · {selectedEvent.date}</p>
            </div>
          </div>
        </div>
      )}

      <aside className={`contact-dock ${contactOpen ? "open" : ""}`} aria-label="Quick contact">
        <div className="contact-actions">
          <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contact on WhatsApp">
            <span>WhatsApp</span><b>WA</b>
          </a>
          <a href="mailto:abhinikam47@gmail.com?subject=DJ%20booking%20enquiry" aria-label="Send booking email">
            <span>Email</span><b>@</b>
          </a>
          <a href="https://instagram.com/deejay_abhii" target="_blank" rel="noreferrer" aria-label="Open Instagram">
            <span>Instagram</span><b>IG</b>
          </a>
        </div>
        <button
          className="contact-trigger"
          onClick={() => setContactOpen(!contactOpen)}
          aria-expanded={contactOpen}
          aria-label={contactOpen ? "Close contact options" : "Open contact options"}
        >
          {contactOpen ? "×" : "↗"} <span>{contactOpen ? "Close" : "Book"}</span>
        </button>
      </aside>

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
