/* eslint-disable @next/next/no-img-element */

import type { GalleryImage } from "../data/siteContent";

export function GallerySection({ images }: { images: GalleryImage[] }) {
  return (
    <section className="gallery" id="gallery">
      <div className="gallery-head" data-cinematic>
        <p className="section-label"><span>04</span> GALLERY</p>
        <h2>Inside<br /><em>the night.</em></h2>
      </div>
      <div className="gallery-flow">
        {images.map(({ src, title, n }, index) => (
          <figure className={`gallery-frame frame-${index + 1}`} key={src}>
            <img src={src} alt={`${title} — live DJ event atmosphere`} loading="lazy" />
            <figcaption><span>{n}</span>{title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
