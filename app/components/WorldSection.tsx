/* eslint-disable @next/next/no-img-element */

import type { City } from "../data/siteContent";

export function WorldSection({ cities }: { cities: City[] }) {
  return (
    <section className="world" id="world">
      <div className="world-layout">
        <div className="world-left" data-cinematic>
          <div className="world-copy">
            <p className="section-label"><span>02</span> LIVE AROUND THE COUNTRY</p>
            <h2><span>Every</span><span>room,</span><span><em>every</em> floor</span></h2>
          </div>
          <figure className="world-image">
            <img src="/images/event-green-jacket.jpg" alt="DJ NO-One performing at a luxury destination venue" loading="lazy" />
            <figcaption><span>150+</span> RESIDENCIES · INDIA & NEPAL</figcaption>
          </figure>
        </div>
        <div className="city-list" data-cinematic>
          {cities.map(({ city, country, venue, category }) => (
            <article key={city}>
              <i className="city-pin" aria-hidden="true" />
              <div className="city-name"><h3>{city}</h3><p>{country}</p></div>
              <small>{venue}</small>
              <span>{category}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
