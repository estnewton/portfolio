import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/countries-110m.json";
import { travel } from "@/content/travel";

// Rendered on the server into a plain SVG, so it ships zero map JavaScript to the browser.

type Props = { name: string };
const W = 800;
const H = 400;

export function TravelMap() {
  const topo = world as unknown as Topology<{ countries: GeometryCollection<Props> }>;
  const geo = feature(topo, topo.objects.countries) as FeatureCollection<Geometry, Props>;
  const countries = geo.features.filter((f) => f.properties.name !== "Antarctica");
  const projection = geoNaturalEarth1().fitSize([W, H], { type: "FeatureCollection", features: countries });
  const path = geoPath(projection);
  const visited = new Set(travel.visited);

  const fill = (name: string) => {
    if (name === travel.studyAbroad) return "var(--cherry)";
    if (visited.has(name)) return "var(--bubblegum)";
    if (name === travel.home) return "var(--kraft)";
    return "#ece4da";
  };

  const count = travel.visited.length;
  return (
    <figure>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`World map highlighting ${count} visited ${count === 1 ? "country" : "countries"}: ${travel.visited.join(", ")}.`}
      >
        {countries.map((f) => (
          <path
            key={f.properties.name}
            d={path(f) ?? undefined}
            fill={fill(f.properties.name)}
            stroke="var(--paper)"
            strokeWidth={0.6}
          >
            <title>{f.properties.name}</title>
          </path>
        ))}
      </svg>
      <figcaption className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-3 rounded-sm bg-cherry" /> Studied abroad
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-3 rounded-sm bg-bubblegum" /> Visited
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-3 rounded-sm bg-kraft" /> Home
        </span>
      </figcaption>
    </figure>
  );
}
