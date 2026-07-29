"use client";

import { useState } from "react";
import { BookingSection } from "./components/BookingSection";
import { CustomCursor } from "./components/CustomCursor";
import { GallerySection } from "./components/GallerySection";
import { GenreMarquee } from "./components/GenreMarquee";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { HighlightsSection } from "./components/HighlightsSection";
import { Preloader } from "./components/Preloader";
import { TracksSection } from "./components/TracksSection";
import { WorldSection } from "./components/WorldSection";
import { cities, galleryImages, highlights, tracks } from "./data/siteContent";
import { useSiteExperience } from "./hooks/useSiteExperience";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const { loaded, rootRef, cursorDotRef, cursorRingRef } = useSiteExperience();

  const toggleTrack = (index: number) => {
    setActiveTrack((current) => current === index ? null : index);
  };

  return (
    <main ref={rootRef}>
      <CustomCursor dotRef={cursorDotRef} ringRef={cursorRingRef} />
      <Preloader loaded={loaded} />
      <Header
        menuOpen={menuOpen}
        soundOn={soundOn}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onMenuClose={() => setMenuOpen(false)}
        onSoundToggle={() => setSoundOn((on) => !on)}
      />
      <Hero soundOn={soundOn} />
      <GenreMarquee />
      <TracksSection tracks={tracks} activeTrack={activeTrack} onTrackToggle={toggleTrack} />
      <WorldSection cities={cities} />
      <HighlightsSection highlights={highlights} />
      <GallerySection images={galleryImages} />
      <BookingSection />
    </main>
  );
}
