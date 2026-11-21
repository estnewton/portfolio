// Edit me: where you've been. The map, its labels, and the headline update automatically.
//
// countries: exact English names from the world map, e.g. "United Kingdom", "United States of America".
//   (Very small countries like Monaco are too small to color; they still show as a city dot.)
// cities:
//   coords  [longitude, latitude]. On Google Maps, right-click a spot: it shows latitude, longitude,
//           so flip them.
//   photo   Optional. Save the picture in /public/images/travel/ and put its path here, e.g.
//           "/images/travel/paris.jpg". Cities without one show "photo coming soon" when clicked.
//   photoAlt       Optional description of the photo for screen readers.
//   photoPosition  Optional focus point for the crop, e.g. "50% 90%" keeps the bottom of a tall photo.
//   caption Optional line under the photo.
//   cluster Nearby cities that share one label when the map is zoomed out.
//   featured  The one highlighted spot: its photo is open when the map loads.
//
// This map covers where I traveled while studying abroad (Europe and Morocco).

export type City = {
  name: string;
  country: string;
  coords: [number, number];
  photo?: string;
  photoAlt?: string;
  photoPosition?: string;
  caption?: string;
  cluster?: string;
  /** Optional shape of the pop-up photo, e.g. "3 / 4" for a tall photo, so it shows uncropped. Default 4 / 3. */
  photoAspect?: string;
  /** The highlighted spot: its photo is open when the map loads and its dot gets a ring. */
  featured?: boolean;
};

const countries = [
  "France",
  "Monaco",
  "Italy",
  "Spain",
  "Portugal",
  "Hungary",
  "United Kingdom",
  "Morocco",
];

const cities: City[] = [
  // Europe
  {
    name: "Paris",
    country: "France",
    coords: [2.352, 48.857],
    featured: true,
    photo: "/images/travel/paris.jpg",
    photoAlt: "Esther smiling in a fluffy cream coat in front of the Mona Lisa at the Louvre.",
    photoAspect: "3 / 4",
    caption: "Me and the Mona Lisa",
  },
  { name: "Aix-en-Provence", country: "France", coords: [5.447, 43.529], cluster: "Provence & Riviera" },
  { name: "Marseille", country: "France", coords: [5.37, 43.297], cluster: "Provence & Riviera" },
  { name: "Saint-Tropez", country: "France", coords: [6.64, 43.272], cluster: "Provence & Riviera" },
  { name: "Cannes", country: "France", coords: [7.017, 43.552], cluster: "Provence & Riviera" },
  {
    name: "Nice",
    country: "France",
    coords: [7.262, 43.71],
    cluster: "Provence & Riviera",
    photo: "/images/travel/nice.jpg",
    photoAlt: "The pebble beach in Nice under a bright blue sky, with hillside villas along the coast.",
    photoPosition: "50% 90%",
  },
  { name: "Èze", country: "France", coords: [7.361, 43.728], cluster: "Provence & Riviera" },
  { name: "Monaco", country: "Monaco", coords: [7.42, 43.738], cluster: "Provence & Riviera" },
  { name: "Ventimiglia", country: "Italy", coords: [7.607, 43.791], cluster: "Provence & Riviera" },
  { name: "Venice", country: "Italy", coords: [12.316, 45.441] },
  { name: "Florence", country: "Italy", coords: [11.256, 43.77] },
  { name: "Madrid", country: "Spain", coords: [-3.704, 40.417] },
  { name: "Porto", country: "Portugal", coords: [-8.611, 41.15] },
  {
    name: "Budapest",
    country: "Hungary",
    coords: [19.04, 47.498],
    photo: "/images/travel/budapest.jpg",
    photoAlt: "Esther on a boat on the Danube at night, smiling in front of the lit-up Hungarian Parliament Building.",
    photoPosition: "50% 50%",
  },
  { name: "London", country: "United Kingdom", coords: [-0.128, 51.507] },
  {
    name: "Sahara Desert",
    country: "Morocco",
    coords: [-4.013, 31.1],
    photo: "/images/travel/sahara.jpg",
    photoAlt: "A line of ATVs riding over tall orange sand dunes in the Moroccan Sahara under a blue sky.",
    photoPosition: "50% 72%",
  },
];

/** Friendlier names for the list under the map. */
export const countryLabel = (name: string) => (name === "United States of America" ? "United States" : name);

export const travel = {
  studyAbroad: "France",
  countries,
  cities,
  /** Whole draggable area, [west, south] to [east, north] in longitude/latitude. */
  // Keep it about 1.7x wider than tall (in degrees) so it fills the map frame.
  bounds: [
    [-28, 27],
    [44, 58],
  ] as [[number, number], [number, number]],
  /** Quick-jump buttons above the map. The first one is the starting view. */
  regions: [
    { label: "Everywhere", bounds: [[-11, 29], [22, 55]] },
    { label: "France", bounds: [[-5, 41.5], [9.5, 51.5]] },
  ] as { label: string; bounds: [[number, number], [number, number]] }[],
  headline: `${cities.length} cities, ${countries.length} countries, and counting`,
};
