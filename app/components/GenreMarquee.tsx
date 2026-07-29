import { Fragment } from "react";

const genres = ["BOLLYWOOD", "HOUSE", "HIP-HOP", "MOOMBAHTON", "TECH", "POP"];

export function GenreMarquee() {
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-set" key={copy}>
            {genres.map((genre, index) => (
              <Fragment key={genre}>
                <span className={index % 2 === 0 ? "solid" : "hollow"}>{genre}</span><i>✦</i>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
