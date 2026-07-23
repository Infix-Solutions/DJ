"use client";
/* eslint-disable @next/next/no-img-element */

import { FormEvent, useEffect, useRef, useState } from "react";

const cities = [
  { name: "Pune", note: "Home city", img: "/images/event-green-jacket.jpg" },
  { name: "Mumbai", note: "Taj · Sahara Star · JW Marriott", img: "/images/event-silver-jacket.jpg" },
  { name: "Goa", note: "Grand Hyatt · Marriott · Novotel", img: "/images/event-blue-jacket.jpg" },
  { name: "Kathmandu", note: "International tour · Hyatt", img: "/images/event-black-jacket.jpg" },
];

const genres = ["Bollywood", "House", "Pop", "Hip-Hop", "Tech", "Moombahton"];

const events = [
  { title: "Neon Afterdark", type: "Club", city: "Pune", date: "May 2026", img: "/images/event-blue-jacket.jpg", position: "center" },
  { title: "Skyline Sessions", type: "Festival", city: "Mumbai", date: "April 2026", img: "/images/event-black-jacket.jpg", position: "center" },
  { title: "The Grand Wedding", type: "Wedding", city: "Goa", date: "March 2026", img: "/images/event-booth.jpg", position: "center" },
  { title: "Arena Pulse", type: "Sports", city: "Bengaluru", date: "February 2026", img: "/images/event-silver-jacket.jpg", position: "center" },
  { title: "Sundown Society", type: "Festival", city: "Lonavala", date: "January 2026", img: "/images/event-green-jacket.jpg", position: "center" },
  { title: "Midnight Circuit", type: "Club", city: "Pune", date: "December 2025", img: "/images/event-blue-jacket.jpg", position: "center" },
  { title: "Royal Reception", type: "Wedding", city: "Mahabaleshwar", date: "November 2025", img: "/images/event-black-jacket.jpg", position: "center" },
  { title: "League Night", type: "Sports", city: "Mumbai", date: "October 2025", img: "/images/event-silver-jacket.jpg", position: "center" },
];

const bookingFacts = [
  { number: "01", title: "Crowd-first sets", copy: "Every performance adapts to the room, the moment and the energy on the floor." },
  { number: "02", title: "Open-format range", copy: "Bollywood, house, pop, hip-hop, tech and moombahton in one seamless journey." },
  { number: "03", title: "Event-ready", copy: "Experienced across weddings, clubs, hotels, destination events and national sports leagues." },
  { number: "04", title: "Clear tech rider", copy: "Pioneer 2000NXS2 setup, quality booth monitors and microphone requirements shared upfront." },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryPlaying, setGalleryPlaying] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[number] | null>(null);
  const [booking, setBooking] = useState({ name: "", date: "", city: "", event: "Wedding" });
  const heroRef = useRef<HTMLElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
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
    let idleTask = 0;
    const preloadGallery = () => {
      const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      if (connection?.saveData || connection?.effectiveType?.includes("2g")) return;
      [...new Set(events.map((event) => event.img))].forEach((src) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "image";
        link.href = src;
        document.head.appendChild(link);
      });
    };
    const schedulePreload = () => {
      if ("requestIdleCallback" in window) {
        idleTask = window.requestIdleCallback(preloadGallery, { timeout: 3500 });
      } else {
        idleTask = window.setTimeout(preloadGallery, 1600);
      }
    };
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
    if (document.readyState === "complete") schedulePreload();
    else window.addEventListener("load", schedulePreload, { once: true });
    updateProgress();
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("load", schedulePreload);
      revealObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleTask);
      else window.clearTimeout(idleTask);
    };
  }, []);

  const sendEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`DJ booking enquiry - ${booking.event}`);
    const body = encodeURIComponent(`${bookingMessage}\n\nPlease share availability and pricing.`);
    window.location.href = `mailto:abhinikam47@gmail.com?subject=${subject}&body=${body}`;
  };
  const visibleEvents = galleryFilter === "All" ? events : events.filter((event) => event.type === galleryFilter);
  const scrollGallery = (direction: number) => {
    const track = galleryTrackRef.current;
    if (!track) return;
    const amount = Math.min(track.clientWidth * 0.78, 430);
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };
  const selectAdjacentEvent = (direction: number) => {
    if (!selectedEvent) return;
    const current = visibleEvents.findIndex((event) => event.title === selectedEvent.title);
    const next = (current + direction + visibleEvents.length) % visibleEvents.length;
    setSelectedEvent(visibleEvents[next]);
  };

  useEffect(() => {
    document.body.style.overflow = selectedEvent ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedEvent]);

  useEffect(() => {
    if (!galleryOpen || !galleryPlaying || selectedEvent) return;
    const timer = window.setInterval(() => {
      const track = galleryTrackRef.current;
      if (!track) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 20;
      if (atEnd) track.scrollTo({ left: 0, behavior: "smooth" });
      else scrollGallery(1);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [galleryOpen, galleryPlaying, selectedEvent, galleryFilter]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reducedMotion || !finePointer) return;

    const tiltItems = [...document.querySelectorAll<HTMLElement>("[data-tilt]")];
    const cleanups = tiltItems.map((item) => {
      const move = (event: PointerEvent) => {
        const bounds = item.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        item.style.setProperty("--tilt-x", `${y * -7}deg`);
        item.style.setProperty("--tilt-y", `${x * 9}deg`);
      };
      const reset = () => {
        item.style.setProperty("--tilt-x", "0deg");
        item.style.setProperty("--tilt-y", "0deg");
      };
      item.addEventListener("pointermove", move);
      item.addEventListener("pointerleave", reset);
      return () => {
        item.removeEventListener("pointermove", move);
        item.removeEventListener("pointerleave", reset);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
      <div className={`site-lighting ${soundOn ? "is-live" : ""}`} aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="DJ Abhishek home">
          <span className="brand-mark"><span>DJ</span></span>
          <span className="brand-copy">DJ <b>ABHISHEK</b></span>
        </a>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#story" onClick={() => setMenuOpen(false)}>Story</a>
          <a href="#shows" onClick={() => setMenuOpen(false)}>Shows</a>
          <a
            href="#gallery"
            onClick={() => {
              setMenuOpen(false);
              setGalleryOpen(true);
              setGalleryPlaying(true);
            }}
          >
            Gallery
          </a>
          <a href="#sound" onClick={() => setMenuOpen(false)}>Sound</a>
          <a className="nav-cta" href="#book" onClick={() => setMenuOpen(false)}>Book now ↗</a>
        </div>
        <button
          type="button"
          className="menu"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </nav>

      <section className="hero" id="top" ref={heroRef}>
        <div className="hero-bg" aria-hidden="true" />
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className={`dj-atmosphere ${soundOn ? "is-live" : ""}`} aria-hidden="true">
          <div className="stage-rig">
            {Array.from({ length: 7 }, (_, index) => <span key={index} />)}
          </div>
          <i className="stage-beam beam-left" />
          <i className="stage-beam beam-right" />
          <i className="stage-beam beam-center-left" />
          <i className="stage-beam beam-center-right" />
          <div className="led-wall">
            {Array.from({ length: 18 }, (_, index) => <span key={index} />)}
          </div>
          <div className="laser laser-one" />
          <div className="laser laser-two" />
          <div className="laser laser-three" />
          <div className="hero-equalizer">
            {Array.from({ length: 12 }, (_, index) => <span key={index} />)}
          </div>
          <div className="bass-ring" />
          <div className="stage-floor" />
          <div className="stage-strobe" />
        </div>
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
          type="button"
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
        <div className="section-index artist-index"><span>01</span> / THE ARTIST</div>
        <div className="story-grid">
          <div className="portrait-stage" data-reveal>
            <div className="portrait-card" data-tilt>
              <img
                src="/images/portrait-1400.jpg"
                alt="DJ Abhishek in a black jacket"
                loading="lazy"
                decoding="async"
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
            <div className="artist-note" aria-label="DJ Abhishek performance strengths">
              <span>Open-format</span>
              <span>Guest-first</span>
              <span>Event-ready</span>
            </div>
            <div className="stats">
              <div><b>40+</b><span>Premium venues</span></div>
              <div><b>10+</b><span>Cities performed</span></div>
              <div><b>03</b><span>Sports leagues</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="confidence section" data-reveal>
        <div className="section-index">04 / WHY BOOK ABHISHEK</div>
        <div className="confidence-head">
          <div>
            <p className="kicker">WHAT A CUSTOMER NEEDS TO KNOW</p>
            <h2>Big energy.<br /><em>Zero guesswork.</em></h2>
          </div>
          <a href="#book">Check booking options ↗</a>
        </div>
        <div className="confidence-grid">
          {bookingFacts.map((fact) => (
            <article key={fact.number} data-tilt>
              <span>{fact.number}</span>
              <h3>{fact.title}</h3>
              <p>{fact.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sound section" id="sound" data-reveal>
        <div className="section-index">05 / THE SOUND</div>
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
        <div className="section-index">02 / PLAYED HERE</div>
        <div className="shows-head">
          <h2>From Pune<br />to <em>everywhere.</em></h2>
          <p>Hotels, destination resorts, arenas and city nights across India and beyond.</p>
        </div>
        <div className="city-grid">
          {cities.map((city, index) => (
            <article className="city-card" key={city.name} data-tilt>
              <img
                className="city-image"
                src={city.img}
                alt=""
                loading="lazy"
                decoding="async"
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
        <div className="section-index">03 / EVENT ARCHIVE</div>
        <div className="gallery-head">
          <div>
            <p className="kicker">MOMENTS FROM THE BOOTH</p>
            <h2>Lights. Crowd.<br /><em>Full volume.</em></h2>
          </div>
          <p>
            Open the event picker, pause it anywhere, then select a photo to view it full size.
          </p>
        </div>
        <button
          type="button"
          className="gallery-launch"
          onClick={() => {
            setGalleryOpen(!galleryOpen);
            setGalleryPlaying(true);
          }}
          aria-expanded={galleryOpen}
        >
          <span>{galleryOpen ? "Close gallery" : "Open event gallery"}</span>
          <b>{galleryOpen ? "×" : "→"}</b>
        </button>
        {galleryOpen && (
          <div className="gallery-picker">
            <div className="gallery-toolbar">
              <div className="gallery-filters" aria-label="Filter events">
                {["All", "Club", "Festival", "Wedding", "Sports"].map((filter) => (
                  <button
                    type="button"
                    key={filter}
                    className={galleryFilter === filter ? "active" : ""}
                    onClick={() => {
                      setGalleryFilter(filter);
                      setGalleryPlaying(false);
                      galleryTrackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
                    }}
                    aria-pressed={galleryFilter === filter}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="gallery-controls">
                <button type="button" onClick={() => { setGalleryPlaying(false); scrollGallery(-1); }} aria-label="Previous gallery photos">←</button>
                <button type="button" className="play-control" onClick={() => setGalleryPlaying(!galleryPlaying)}>
                  {galleryPlaying ? "Pause" : "Play"}
                </button>
                <button type="button" onClick={() => { setGalleryPlaying(false); scrollGallery(1); }} aria-label="Next gallery photos">→</button>
              </div>
            </div>
            <div
              className="gallery-track"
              ref={galleryTrackRef}
              onPointerDown={() => setGalleryPlaying(false)}
              onWheel={() => setGalleryPlaying(false)}
            >
              {visibleEvents.map((event) => (
                <button
                  type="button"
                  className="gallery-card"
                  key={event.title}
                  onClick={() => {
                    setGalleryPlaying(false);
                    setSelectedEvent(event);
                  }}
                  aria-label={`View ${event.title} event`}
                >
                  <img src={event.img} alt="" loading="lazy" decoding="async" style={{ objectPosition: event.position }} />
                  <span className="gallery-type">{event.type}</span>
                  <span className="gallery-meta">
                    <strong>{event.title}</strong>
                    <small>{event.city} · {event.date}</small>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="booking" id="book" data-reveal>
        <div className="booking-noise" />
        <div className="booking-content">
          <p className="kicker">YOUR CROWD. HIS FREQUENCY.</p>
          <h2>Ready to make<br />it <em>unforgettable?</em></h2>
          <form className="booking-form" onSubmit={sendEmail} data-tilt>
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
          <button type="button" className="lightbox-close" onClick={() => setSelectedEvent(null)} aria-label="Close gallery preview">×</button>
          <button type="button" className="lightbox-arrow prev" onClick={(event) => { event.stopPropagation(); selectAdjacentEvent(-1); }} aria-label="Previous event">←</button>
          <div className="lightbox-frame" onClick={(event) => event.stopPropagation()}>
            <img
              src={selectedEvent.img}
              alt={`${selectedEvent.title}, ${selectedEvent.city}`}
              decoding="async"
              style={{ objectPosition: selectedEvent.position }}
            />
            <div className="lightbox-caption">
              <span>{selectedEvent.type}</span>
              <h3>{selectedEvent.title}</h3>
              <p>{selectedEvent.city} · {selectedEvent.date}</p>
            </div>
          </div>
          <button type="button" className="lightbox-arrow next" onClick={(event) => { event.stopPropagation(); selectAdjacentEvent(1); }} aria-label="Next event">→</button>
        </div>
      )}

      <section className="faq section" data-reveal>
        <div className="section-index">06 / BEFORE YOU BOOK</div>
        <div className="faq-layout">
          <div className="faq-title">
            <p className="kicker">THE USEFUL DETAILS</p>
            <h2>Quick<br /><em>answers.</em></h2>
            <p>Everything an event planner usually wants to know before the first call.</p>
          </div>
          <div className="faq-list">
            <details>
              <summary>What events can DJ Abhishek perform at?<span>+</span></summary>
              <p>Weddings, private celebrations, clubs, corporate events, hotels, resorts, festivals and sports events.</p>
            </details>
            <details>
              <summary>Does he travel outside Pune?<span>+</span></summary>
              <p>Yes. Travel, accommodation and food arrangements apply for events outside Pune.</p>
            </details>
            <details>
              <summary>What music formats are available?<span>+</span></summary>
              <p>Both DJing and VDJing, with Bollywood as the base and house, pop, hip-hop, tech and moombahton in the mix.</p>
            </details>
            <details>
              <summary>What equipment is required?<span>+</span></summary>
              <p>A Pioneer 2000NXS2 setup, a quality microphone and two monitors at the DJ booth.</p>
            </details>
            <details>
              <summary>How are performance charges decided?<span>+</span></summary>
              <p>Pricing depends on the event format, location, festival period and special-date demand. Send the date and city for an accurate quote.</p>
            </details>
          </div>
        </div>
      </section>

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
          <span className="brand-mark"><span>DJ</span></span>
          <span className="brand-copy">DJ <b>ABHISHEK</b></span>
        </div>
        <p>DJ · REMIXER · PRODUCER · PUNE, INDIA</p>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
