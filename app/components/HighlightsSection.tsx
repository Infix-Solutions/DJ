import type { Highlight } from "../data/siteContent";

export function HighlightsSection({ highlights }: { highlights: Highlight[] }) {
  return (
    <section className="chapter highlights" id="highlights">
      <div className="chapter-intro wide" data-cinematic>
        <p className="section-label"><span>03</span> CAREER HIGHLIGHTS</p>
        <h2>The moments<br /><em>that defined it.</em></h2>
      </div>
      <div className="milestone-grid">
        {highlights.map(({ n, title, copy }) => (
          <article key={n} data-cinematic><span>{n}</span><div><h3>{title}</h3><p>{copy}</p></div><i>↗</i></article>
        ))}
      </div>
      <div className="statement" data-cinematic><span>2011</span><p>A DECADE OF<br />READING THE ROOM.</p><span>2026</span></div>
    </section>
  );
}
