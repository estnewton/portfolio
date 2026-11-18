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

export type City = {
  name: string;
  country: string;
  coords: [number, number];
  photo?: string;
  photoAlt?: string;
  photoPosition?: string;
  caption?: string;
  cluster?: string;
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
  "United States of America",
];

const cities: City[] = [
  // Europe
  { name: "Paris", country: "France", coords: [2.352, 48.857] },
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

  // United States
  { name: "New York City", country: "United States of America", coords: [-74.006, 40.713] },
  { name: "Washington, DC", country: "United States of America", coords: [-77.037, 38.907] },
  { name: "Pittsburgh", country: "United States of America", coords: [-79.996, 40.441] },
  { name: "Buffalo", country: "United States of America", coords: [-78.878, 42.886], cluster: "Buffalo & Niagara" },
  { name: "Niagara Falls", country: "United States of America", coords: [-79.074, 43.083], cluster: "Buffalo & Niagara" },
  { name: "Wilmington", country: "United States of America", coords: [-77.945, 34.226], caption: "North Carolina" },
  { name: "Miami", country: "United States of America", coords: [-80.192, 25.762], cluster: "Florida" },
  { name: "West Palm Beach", country: "United States of America", coords: [-80.053, 26.715], cluster: "Florida" },
  { name: "Orlando", country: "United States of America", coords: [-81.379, 28.538], cluster: "Florida" },
  { name: "Seattle", country: "United States of America", coords: [-122.332, 47.606] },
  { name: "San Francisco", country: "United States of America", coords: [-122.419, 37.775] },
];

/** Friendlier names for the list under the map. */
export const countryLabel = (name: string) => (name === "United States of America" ? "United States" : name);

export const travel = {
  studyAbroad: "France",
  countries,
  cities,
  /** Whole draggable area, [west, south] to [east, north] in longitude/latitude. */
  bounds: [
    [-130, 16],
    [34, 62],
  ] as [[number, number], [number, number]],
  /** Quick-jump buttons above the map. The first one is the starting view. */
  regions: [
    { label: "Europe", bounds: [[-11, 29], [22, 55]] },
    { label: "United States", bounds: [[-125, 24], [-67, 49]] },
    { label: "Everywhere", bounds: [[-128, 18], [32, 60]] },
  ] as { label: string; bounds: [[number, number], [number, number]] }[],
  headline: `${cities.length} cities, ${countries.length} countries, and counting`,
};
