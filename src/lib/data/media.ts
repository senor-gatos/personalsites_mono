// ── MEDIA COLLECTION ─────────────────────────────────────────────────────────
// Add your DVDs/Blu-rays here. Each item shows up on /media.
// format: 'dvd' | 'bluray' | 'uhd' (4K Blu-ray)
// status: 'owned' | 'wishlist'

export type MediaFormat = 'dvd' | 'bluray' | 'uhd';
export type MediaType   = 'film' | 'series';

export interface MediaItem {
  id: string;
  title: string;
  year: number;
  type: MediaType;
  format: MediaFormat;
  genres: string[];
  status: 'owned' | 'wishlist';
  note?: string; // optional personal note
}

export const collection: MediaItem[] = [
  // ── FILMS ────────────────────────────────────────────────────────────────────
  { id: 'jurassic-park',        title: 'Jurassic Park',                year: 1993, type: 'film',   format: 'bluray', genres: ['sci-fi', 'adventure'],          status: 'owned' },
  { id: 'the-matrix',           title: 'The Matrix',                   year: 1999, type: 'film',   format: 'bluray', genres: ['sci-fi', 'action'],              status: 'owned' },
  { id: '2001',                 title: '2001: A Space Odyssey',        year: 1968, type: 'film',   format: 'bluray', genres: ['sci-fi'],                        status: 'owned', note: 'one of the best things ever made' },
  { id: 'blade-runner',         title: 'Blade Runner',                 year: 1982, type: 'film',   format: 'bluray', genres: ['sci-fi', 'noir'],                status: 'owned' },
  { id: 'blade-runner-2049',    title: 'Blade Runner 2049',            year: 2017, type: 'film',   format: 'uhd',    genres: ['sci-fi'],                        status: 'owned' },
  { id: 'interstellar',         title: 'Interstellar',                 year: 2014, type: 'film',   format: 'bluray', genres: ['sci-fi'],                        status: 'owned' },
  { id: 'arrival',              title: 'Arrival',                      year: 2016, type: 'film',   format: 'bluray', genres: ['sci-fi'],                        status: 'owned' },
  { id: 'dune',                 title: 'Dune: Part One',               year: 2021, type: 'film',   format: 'uhd',    genres: ['sci-fi', 'epic'],                status: 'owned' },
  { id: 'dune-2',               title: 'Dune: Part Two',               year: 2024, type: 'film',   format: 'uhd',    genres: ['sci-fi', 'epic'],                status: 'owned' },
  { id: 'princess-mononoke',    title: 'Princess Mononoke',            year: 1997, type: 'film',   format: 'bluray', genres: ['animation', 'fantasy'],          status: 'owned' },
  { id: 'spirited-away',        title: 'Spirited Away',                year: 2001, type: 'film',   format: 'bluray', genres: ['animation', 'fantasy'],          status: 'owned' },
  { id: 'the-thing',            title: 'The Thing',                    year: 1982, type: 'film',   format: 'bluray', genres: ['horror', 'sci-fi'],              status: 'owned' },
  { id: 'aliens',               title: 'Aliens',                       year: 1986, type: 'film',   format: 'bluray', genres: ['sci-fi', 'action', 'horror'],    status: 'owned' },
  { id: 'mad-max-fury-road',    title: 'Mad Max: Fury Road',           year: 2015, type: 'film',   format: 'bluray', genres: ['action', 'sci-fi'],              status: 'owned' },
  { id: 'everything-everywhere',title: 'Everything Everywhere All at Once', year: 2022, type: 'film', format: 'bluray', genres: ['sci-fi', 'comedy', 'drama'], status: 'owned' },

  // ── SERIES ───────────────────────────────────────────────────────────────────
  { id: 'the-wire',             title: 'The Wire',                     year: 2002, type: 'series', format: 'dvd',    genres: ['drama', 'crime'],                status: 'owned', note: 'complete series' },
  { id: 'twin-peaks',           title: 'Twin Peaks',                   year: 1990, type: 'series', format: 'bluray', genres: ['mystery', 'drama'],              status: 'owned', note: 'complete series + The Return' },

  // ── WISHLIST ─────────────────────────────────────────────────────────────────
  { id: 'annihilation',         title: 'Annihilation',                 year: 2018, type: 'film',   format: 'bluray', genres: ['sci-fi', 'horror'],              status: 'wishlist' },
  { id: 'the-leftovers',        title: 'The Leftovers',                year: 2014, type: 'series', format: 'bluray', genres: ['drama', 'sci-fi'],               status: 'wishlist', note: 'complete series' },
];

export const ALL_GENRES = [...new Set(collection.flatMap(m => m.genres))].sort();
