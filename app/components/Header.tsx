/* eslint-disable @next/next/no-img-element */

type HeaderProps = {
  menuOpen: boolean;
  soundOn: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
  onSoundToggle: () => void;
};

const navigation = [
  ["#tracks", "Tracks"],
  ["#world", "Shows"],
  ["#highlights", "Highlights"],
  ["#gallery", "Gallery"],
  ["#booking", "Booking"],
];

export function Header({ menuOpen, soundOn, onMenuToggle, onMenuClose, onSoundToggle }: HeaderProps) {
  return (
    <header className="topbar">
      <a className="brand-logo-link" href="#top" aria-label="DJ NO-One home">
        <img className="brand-logo brand-logo-nav" src="/images/dj-a-logo.png" alt="" />
      </a>
      <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
        {navigation.map(([href, label]) => (
          <a href={href} onClick={onMenuClose} key={href}>{label}</a>
        ))}
      </nav>
      <div className="topbar-actions">
        <button
          className={`audio-control ${soundOn ? "on" : ""}`}
          onClick={onSoundToggle}
          aria-label={soundOn ? "Mute ambient audio" : "Unmute ambient audio"}
        >
          <span>{Array.from({ length: 4 }, (_, index) => <i key={index} />)}</span>
          {soundOn ? "SOUND ON" : "SOUND OFF"}
        </button>
        <button className="menu-button" onClick={onMenuToggle} aria-expanded={menuOpen} aria-label="Toggle menu">
          <i /><i />
        </button>
      </div>
    </header>
  );
}
