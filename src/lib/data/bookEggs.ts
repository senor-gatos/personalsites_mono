export interface MovieQuote {
  quote: string;
  film: string;
  year: number;
}

export interface CheeseLink {
  name: string;
  url: string;
}

export const QUOTES: MovieQuote[] = [
  { quote: "I'm gonna make him an offer he can't refuse.",       film: "The Godfather",              year: 1972 },
  { quote: "You can't handle the truth!",                        film: "A Few Good Men",             year: 1992 },
  { quote: "Get busy living, or get busy dying.",                film: "The Shawshank Redemption",   year: 1994 },
  { quote: "Why so serious?",                                    film: "The Dark Knight",            year: 2008 },
  { quote: "I am your father.",                                  film: "The Empire Strikes Back",    year: 1980 },
  { quote: "Here's looking at you, kid.",                        film: "Casablanca",                 year: 1942 },
  { quote: "We're gonna need a bigger boat.",                    film: "Jaws",                       year: 1975 },
  { quote: "To infinity and beyond!",                            film: "Toy Story",                  year: 1995 },
  { quote: "I see dead people.",                                 film: "The Sixth Sense",            year: 1999 },
  { quote: "There's no place like home.",                        film: "The Wizard of Oz",           year: 1939 },
  { quote: "My precious.",                                       film: "The Lord of the Rings",      year: 2001 },
  { quote: "I'll be back.",                                      film: "The Terminator",             year: 1984 },
  { quote: "Nobody puts Baby in a corner.",                      film: "Dirty Dancing",              year: 1987 },
  { quote: "You talking to me?",                                 film: "Taxi Driver",                year: 1976 },
  { quote: "Hasta la vista, baby.",                              film: "Terminator 2",               year: 1991 },
  { quote: "Just keep swimming.",                                film: "Finding Nemo",               year: 2003 },
  { quote: "Life is like a box of chocolates.",                  film: "Forrest Gump",               year: 1994 },
  { quote: "May the Force be with you.",                         film: "Star Wars",                  year: 1977 },
  { quote: "You had me at hello.",                               film: "Jerry Maguire",              year: 1996 },
  { quote: "It's not who I am underneath, but what I do that defines me.", film: "Batman Begins",   year: 2005 },
  { quote: "With great power comes great responsibility.",       film: "Spider-Man",                 year: 2002 },
  { quote: "You is kind, you is smart, you is important.",       film: "The Help",                   year: 2011 },
  { quote: "Just when I thought I was out, they pull me back in.", film: "The Godfather Part III",  year: 1990 },
  { quote: "I feel the need — the need for speed!",              film: "Top Gun",                    year: 1986 },
];

export const CHEESES: CheeseLink[] = [
  { name: 'Gruyère',    url: 'https://en.wikipedia.org/wiki/Gruy%C3%A8re_cheese' },
  { name: 'Brie',       url: 'https://en.wikipedia.org/wiki/Brie' },
  { name: 'Gouda',      url: 'https://en.wikipedia.org/wiki/Gouda_cheese' },
  { name: 'Camembert',  url: 'https://en.wikipedia.org/wiki/Camembert' },
  { name: 'Roquefort',  url: 'https://en.wikipedia.org/wiki/Roquefort' },
  { name: 'Manchego',   url: 'https://en.wikipedia.org/wiki/Manchego' },
  { name: 'Stilton',    url: 'https://en.wikipedia.org/wiki/Stilton_cheese' },
  { name: 'Emmental',   url: 'https://en.wikipedia.org/wiki/Emmental_cheese' },
  { name: 'Halloumi',   url: 'https://en.wikipedia.org/wiki/Halloumi' },
  { name: 'Burrata',    url: 'https://en.wikipedia.org/wiki/Burrata' },
  { name: 'Raclette',   url: 'https://en.wikipedia.org/wiki/Raclette' },
  { name: 'Havarti',    url: 'https://en.wikipedia.org/wiki/Havarti' },
  { name: 'Limburger',  url: 'https://en.wikipedia.org/wiki/Limburger' },
  { name: 'Taleggio',   url: 'https://en.wikipedia.org/wiki/Taleggio_cheese' },
  { name: 'Fontina',    url: 'https://en.wikipedia.org/wiki/Fontina' },
  { name: 'Comté',      url: 'https://en.wikipedia.org/wiki/Comt%C3%A9_cheese' },
  { name: 'Pecorino',   url: 'https://en.wikipedia.org/wiki/Pecorino' },
  { name: 'Edam',       url: 'https://en.wikipedia.org/wiki/Edam_cheese' },
];

// Assign each book (by index) an egg type — alternates in a non-obvious pattern
export function getBookEgg(index: number): 'quote' | 'cheese' {
  return (index * 3 + index % 5) % 2 === 0 ? 'cheese' : 'quote';
}

export function pickQuote(index: number): MovieQuote {
  return QUOTES[index % QUOTES.length];
}

export function pickCheese(index: number): CheeseLink {
  return CHEESES[index % CHEESES.length];
}
