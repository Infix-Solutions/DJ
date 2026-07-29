"use client";

import dynamic from "next/dynamic";

const DeckScene = dynamic(() => import("./DeckScene"), {
  ssr: false,
  loading: () => <div className="scene-loader"><span /><small>CALIBRATING DECKS</small></div>,
});

export function Hero({ soundOn }: { soundOn: boolean }) {
  return (
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
  );
}
