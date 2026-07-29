import type { CSSProperties } from "react";
import type { Track } from "../data/siteContent";

type TracksSectionProps = {
  tracks: Track[];
  activeTrack: number | null;
  onTrackToggle: (index: number) => void;
};

export function TracksSection({ tracks, activeTrack, onTrackToggle }: TracksSectionProps) {
  return (
    <section className="chapter tracks" id="tracks">
      <div className="chapter-intro" data-cinematic>
        <p className="section-label"><span>01</span> FEATURED TRACKS</p>
        <h2>Sound<br /><em>in motion</em></h2>
        <p>Four frequencies. Four rooms. One instinct: knowing exactly when the floor is ready to move.</p>
      </div>
      <div className="track-list">
        {tracks.map((track, index) => {
          const isActive = activeTrack === index;
          return (
            <article className={isActive ? "active" : ""} key={track.title} data-cinematic>
              <button className="track-play" onClick={() => onTrackToggle(index)} aria-label={`${isActive ? "Pause" : "Preview"} ${track.title}`}>
                <span>{isActive ? "Ⅱ" : "▶"}</span>
              </button>
              <div className="vinyl" aria-hidden="true"><i /><b>{track.n}</b></div>
              <div className="track-name"><small>{track.genre}</small><h3>{track.title}</h3></div>
              <div className="track-wave" aria-hidden="true">
                {Array.from({ length: 30 }, (_, i) => (
                  <i key={i} style={{ "--h": `${18 + ((i * 17) % 58)}%` } as CSSProperties} />
                ))}
              </div>
              <div className="track-time">{track.year}<span>{track.duration}</span></div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
