/* eslint-disable @next/next/no-img-element */

import type { FormEvent } from "react";
import { FaInstagram, FaSoundcloud, FaSpotify, FaYoutube } from "react-icons/fa";

function submitBooking(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  window.location.href = "mailto:abhinikam47@gmail.com?subject=Booking%20Enquiry%20%E2%80%94%20DJ%20Abhishek";
}

export function BookingSection() {
  return (
    <section className="booking" id="booking">
      <div className="booking-portrait"><img src="/images/portrait-booking-clean.png" alt="DJ Abhishek" loading="lazy" /></div>
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
        <div className="footer-brand" aria-label="DJ Abhishek">
          <img className="brand-logo brand-logo-footer" src="/images/dj-a-logo.png" alt="" />
        </div>
        <div className="socials">
          <a href="https://www.instagram.com/deejay_abhii" target="_blank" rel="noreferrer"><FaInstagram aria-hidden="true" /><span>Instagram</span></a>
          <a href="#" aria-label="Spotify profile coming soon"><FaSpotify aria-hidden="true" /><span>Spotify</span></a>
          <a href="#" aria-label="YouTube profile coming soon"><FaYoutube aria-hidden="true" /><span>YouTube</span></a>
          <a href="#" aria-label="SoundCloud profile coming soon"><FaSoundcloud aria-hidden="true" /><span>SoundCloud</span></a>
        </div>
        <p>© 2026 DJ ABHISHEK · PUNE, INDIA</p>
      </footer>
    </section>
  );
}
