export type Track = {
  n: string;
  title: string;
  genre: string;
  year: string;
  duration: string;
};

export type City = {
  city: string;
  country: string;
  venue: string;
  category: string;
};

export type Highlight = {
  n: string;
  title: string;
  copy: string;
};

export type GalleryImage = {
  src: string;
  title: string;
  n: string;
};

export const tracks: Track[] = [
  { n: "01", title: "Midnight Bombay", genre: "Bollywood House", year: "2024", duration: "5:42" },
  { n: "02", title: "Velvet Hours", genre: "Deep House", year: "2023", duration: "6:18" },
  { n: "03", title: "Monsoon Pulse", genre: "Moombahton", year: "2023", duration: "4:55" },
  { n: "04", title: "Golden Skyline", genre: "Tech House", year: "2022", duration: "7:04" },
];

export const cities: City[] = [
  { city: "Kathmandu", country: "Nepal", venue: "Hyatt Regency", category: "International" },
  { city: "Goa", country: "India", venue: "Grand Hyatt · JW Marriott · The Lalit", category: "Coastal" },
  { city: "Mumbai", country: "India", venue: "Taj · Sahara Star · The Leela Palace", category: "Metro" },
  { city: "Pune", country: "India", venue: "JW Marriott · Sheraton Grand · Conrad", category: "Home Turf" },
  { city: "Lonavala", country: "India", venue: "Della Adventure · Fariyas · Novotel", category: "Hills" },
  { city: "Mahabaleshwar", country: "India", venue: "Le Méridien · The Fern", category: "Hills" },
  { city: "Bangalore", country: "India", venue: "JW Marriott Golfshire", category: "Metro" },
  { city: "Daman", country: "India", venue: "Fortune Park Galaxy", category: "Coastal" },
];

export const highlights: Highlight[] = [
  { n: "01", title: "Official DJ · MPL", copy: "The soundtrack of Mobile Premier League — energising national campaigns and marquee moments." },
  { n: "02", title: "Ultimate Table Tennis", copy: "Live performances powering one of India’s premier professional sporting leagues." },
  { n: "03", title: "Ultimate Kho Kho", copy: "Arena-scale energy for the debut season of a reinvented traditional sport." },
  { n: "04", title: "150+ Luxury Residencies", copy: "A decade of sets across five-star resorts — from the Taj to the Ritz-Carlton." },
];

export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery-dj-01.jpg", title: "MAIN STAGE", n: "01" },
  { src: "/images/gallery-dj-02.jpg", title: "OPEN AIR", n: "02" },
  { src: "/images/gallery-dj-03.jpg", title: "SEA OF LIGHTS", n: "03" },
  { src: "/images/gallery-dj-04.jpg", title: "AFTER HOURS", n: "04" },
  { src: "/images/gallery-dj-05.jpg", title: "FROM THE BOOTH", n: "05" },
];
