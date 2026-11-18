import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry, Polygon } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/countries-110m.json";
import { countryLabel, travel } from "@/content/travel";
import { TravelMapView, type MapCity, type MapRegion } from "./TravelMapView";

// The country shapes are projected here on the server, so no map library ships to the browser.
// TravelMapView (client) adds dragging, zooming, labels, and the photo pop-ups.

type Props = { name: string };
const W = 800;
const H = 480;

const lonLatBox = ([[w, s], [e, n]]: [[number, number], [number, number]]): Feature<Polygon> => ({
  type: "Feature",
  properties: {},
  geometry: { type: "Polygon", coordinates: [[[w, s], [w, n], [e, n], [e, s], [w, s]]] },
});

export function TravelMap() {
  const topo = world as unknown as Topology<{ countries: GeometryCollection<Props> }>;
  const geo = feature(topo, topo.objects.countries) as FeatureCollection<Geometry, Props>;
  const countries = geo.features.filter((f) => f.properties.name !== "Antarctica");

  const projection = geoMercator().fitWidth(W, lonLatBox(travel.bounds));
  const path = geoPath(projection);
  const [[, top], [, bottom]] = path.bounds(lonLatBox(travel.bounds));
  // Shift the map so the draggable area starts at y = 0.
  projection.translate([projection.translate()[0], projection.translate()[1] - top]);
  const mapH = bottom - top;

  const visited = new Set(travel.countries);
  const fill = (name: string) => {
    if (name === travel.studyAbroad) return "var(--bubblegum)";
    if (visited.has(name)) return "var(--bubblegum-soft)";
    return "#ece4da";
  };

  const cities: MapCity[] = travel.cities.map((c) => {
    const [x, y] = projection(c.coords) ?? [0, 0];
    return { ...c, id: c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), x, y, countryName: countryLabel(c.country) };
  });

  const regions: MapRegion[] = travel.regions.map((r) => {
    const [[x0, y0], [x1, y1]] = path.bounds(lonLatBox(r.bounds));
    return { label: r.label, box: [x0, y0, x1, y1] };
  });

  return (
    <TravelMapView
      W={W}
      H={H}
      mapW={W}
      mapH={mapH}
      cities={cities}
      regions={regions}
      countriesWithoutCities={travel.countries
        .filter((c) => !travel.cities.some((city) => city.country === c))
        .map(countryLabel)}
    >
      {countries.map((f) => (
        <path
          key={f.properties.name}
          d={path(f) ?? undefined}
          fill={fill(f.properties.name)}
          stroke="var(--paper)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        >
          <title>{countryLabel(f.properties.name)}</title>
        </path>
      ))}
    </TravelMapView>
  );
}
