"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Map, {
  FullscreenControl,
  Layer,
  MapRef,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  Source,
} from "react-map-gl/mapbox";
import { LngLatBounds } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TRAVEL_PHASES = [
  { id: "colombo", label: "Colombo", color: "#f97316", icon: "🌆" },
  { id: "south", label: "Côte Sud", color: "#0ea5e9", icon: "🌴" },
  { id: "safari", label: "Safaris", color: "#facc15", icon: "🦁" },
  { id: "hill", label: "Hill Country", color: "#34d399", icon: "⛰️" },
  { id: "triangle", label: "Triangle culturel", color: "#a855f7", icon: "🪨" },
  { id: "east", label: "Côte Est", color: "#ec4899", icon: "🌊" },
  { id: "return", label: "Retour Colombo", color: "#64748b", icon: "✈️" },
] as const;

const phaseMap = Object.fromEntries(TRAVEL_PHASES.map((phase) => [phase.id, phase]));

type Stop = {
  coords: [number, number];
  title: string;
  description: string;
  phaseId: (typeof TRAVEL_PHASES)[number]["id"];
  segmentId: string;
  href?: string;
  image?: string;
};

const STOPS: Stop[] = [
  {
    coords: [79.8612, 6.9271],
    title: "Colombo",
    description: "Rooftops et ambiance urbaine à l’arrivée.",
    phaseId: "colombo",
    segmentId: "colombo-sud",
    href: "https://www.therooftopguide.com/rooftop-bars-in-colombo/cloud-red-at-cinnamon-red.html",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2y_CRTasuGeX5a8QeL-paqDIZT_Xobj1q8A&s",
  },
  {
    coords: [80.2496, 6.009],
    title: "Unawatuna",
    description: "Villa tropicale et plages à perte de vue.",
    phaseId: "south",
    segmentId: "colombo-sud",
    href: "https://www.airbnb.fr/rooms/1265998667374290710",
    image: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI2NTk5ODY2NzM3NDI5MDcxMA==/original/e4fffc4f-d3d8-4fbc-8f51-51761ac980e3.jpeg?im_w=1200",
  },
  {
    coords: [80.454, 5.9485],
    title: "Mirissa",
    description: "Surf à Weligama et Coconut Tree Hill.",
    phaseId: "south",
    segmentId: "colombo-sud",
    href: "https://thirdeyetraveller.com/coconut-tree-hill-mirissa/",
    image: "https://thirdeyetraveller.com/wp-content/uploads/COCONUTHILL-7-of-12-2-scaled-scaled.jpg",
  },
  {
    coords: [80.888, 6.4269],
    title: "Udawalawe",
    description: "Safari immersif avec les éléphants au lever du soleil.",
    phaseId: "safari",
    segmentId: "sud-safari",
    href: "https://www.unpasseportencavale.com/le-sri-lanka/parcs-reserves-et-safaris/faire-un-safari-a-uda-walawe/",
    image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/09/de/b4/21.jpg",
  },
  {
    coords: [81.05, 6.8667],
    title: "Ella",
    description: "Train bleu, Nine Arch Bridge et cascades.",
    phaseId: "hill",
    segmentId: "safari-hill",
    href: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
  },
  {
    coords: [80.6337, 7.2906],
    title: "Kandy",
    description: "Temple de la Dent et marchés colorés.",
    phaseId: "hill",
    segmentId: "safari-hill",
    href: "https://www.unpasseportencavale.com/le-sri-lanka/le-triangle-culturel/visiter-le-temple-de-la-dent-a-kandy/",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/17/74/46/29/sri-dalada-maligawa-or.jpg",
  },
  {
    coords: [80.7603, 7.957],
    title: "Sigiriya",
    description: "Ascension du Rocher du Lion au lever du soleil.",
    phaseId: "triangle",
    segmentId: "hill-triangle",
    href: "https://www.unpasseportencavale.com/le-sri-lanka/le-triangle-culturel/le-rocher-du-lion-a-sigiriya-notre-guide-complet/",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ed/85/6b/um-palacio-no-topo-da.jpg?w=1200&h=-1&s=1",
  },
  {
    coords: [81.2152, 8.5874],
    title: "Trincomalee",
    description: "Snorkelling à Pigeon Island et sorties baleines.",
    phaseId: "east",
    segmentId: "triangle-east",
    href: "https://www.carnetdescapades.com/voyage/sri-lanka/trincomalee",
    image: "https://www.carnetdescapades.com/app/uploads/2019/01/pigeon-island-sri-lanka.jpg",
  },
  {
    coords: [79.8612, 6.9271],
    title: "Colombo (retour)",
    description: "Derniers cocktails avant le vol retour.",
    phaseId: "return",
    segmentId: "east-return",
    href: "https://www.therooftopguide.com/rooftop-bars-in-colombo/cloud-red-at-cinnamon-red.html",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYUqGs1Ruk50DCu9t9Ke6TjUCO1oHWc_JjNw&s",
  },
];

const ROUTE_SEGMENTS = [
  {
    id: "colombo-sud",
    label: "Colombo → Côte Sud",
    shortLabel: "Colombo → Sud",
    color: phaseMap.south.color,
    coordinates: [STOPS[0].coords, STOPS[1].coords, STOPS[2].coords],
    description: "Rooftops nocturnes puis cocotiers et villa privée sur la côte sud.",
    bearing: -30,
  },
  {
    id: "sud-safari",
    label: "Côte Sud → Safaris",
    shortLabel: "Sud → Safaris",
    color: phaseMap.safari.color,
    coordinates: [STOPS[2].coords, STOPS[3].coords],
    description: "Route panoramique vers Udawalawe pour observer les éléphants.",
    bearing: -12,
  },
  {
    id: "safari-hill",
    label: "Safaris → Hill Country",
    shortLabel: "Safaris → Hill",
    color: phaseMap.hill.color,
    coordinates: [STOPS[3].coords, STOPS[4].coords, STOPS[5].coords],
    description: "Des plaines à la brume des plantations de thé d'Ella et Kandy.",
    bearing: -38,
  },
  {
    id: "hill-triangle",
    label: "Hill Country → Triangle culturel",
    shortLabel: "Hill → Triangle",
    color: phaseMap.triangle.color,
    coordinates: [STOPS[5].coords, STOPS[6].coords],
    description: "Temples et patrimoine UNESCO autour de Sigiriya.",
    bearing: -18,
  },
  {
    id: "triangle-east",
    label: "Triangle culturel → Côte Est",
    shortLabel: "Triangle → Est",
    color: phaseMap.east.color,
    coordinates: [STOPS[6].coords, STOPS[7].coords],
    description: "Cap à l'est pour les eaux translucides de Trincomalee.",
    bearing: 4,
  },
  {
    id: "east-return",
    label: "Côte Est → Colombo",
    shortLabel: "Est → Colombo",
    color: phaseMap.return.color,
    coordinates: [STOPS[7].coords, STOPS[8].coords],
    description: "Retour vers la capitale pour une dernière soirée dans les hauteurs.",
    bearing: -26,
  },
];

const ALL_COORDS = STOPS.map((stop) => stop.coords);

const INITIAL_VIEW_STATE = {
  longitude: 80.35,
  latitude: 7.2,
  zoom: 6,
  bearing: -10,
  pitch: 0,
};

const computeBounds = (coordinates: [number, number][]) => {
  if (coordinates.length === 0) {
    return new LngLatBounds([79.4, 5.5], [81.6, 9.1]);
  }

  return coordinates.reduce(
    (bounds, coord) => bounds.extend(coord),
    new LngLatBounds(coordinates[0], coordinates[0])
  );
};

export function RouteMap() {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const [activeSegmentId, setActiveSegmentId] = useState<string>("all");
  const [popupInfo, setPopupInfo] = useState<Stop | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const mapRef = useRef<MapRef | null>(null);

  const segmentsWithStyle = useMemo(
    () =>
      ROUTE_SEGMENTS.map((segment) => ({
        ...segment,
        width: activeSegmentId === "all" || segment.id === activeSegmentId ? 6 : 3,
        opacity: activeSegmentId === "all" || segment.id === activeSegmentId ? 0.95 : 0.2,
      })),
    [activeSegmentId]
  );

  const routeGeoJson = useMemo(
    () => ({
      type: "FeatureCollection" as const,
      features: segmentsWithStyle.map((segment) => ({
        type: "Feature" as const,
        properties: {
          id: segment.id,
          color: segment.color,
          width: segment.width,
          opacity: segment.opacity,
        },
        geometry: {
          type: "LineString" as const,
          coordinates: segment.coordinates,
        },
      })),
    }),
    [segmentsWithStyle]
  );

const focusOnCoordinates = useCallback((coordinates: [number, number][], bearing: number) => {
  if (!mapRef.current || coordinates.length === 0) return;
  const map = mapRef.current.getMap();
  const bounds = computeBounds(coordinates);
  map.fitBounds(bounds, {
    padding: 120,
    duration: 1200,
    bearing,
    pitch: 0,
  });
}, []);

  useEffect(() => {
    if (!mapReady) return;

    if (activeSegmentId === "all") {
      focusOnCoordinates(ALL_COORDS, -18);
      return;
    }

    const segment = ROUTE_SEGMENTS.find((item) => item.id === activeSegmentId);
    if (segment) {
      focusOnCoordinates(segment.coordinates, segment.bearing);
    }
  }, [activeSegmentId, focusOnCoordinates, mapReady]);

  const handleMarkerSelect = useCallback(
    (stop: Stop) => {
      if (popupInfo?.title === stop.title) {
        setPopupInfo(null);
        setActiveSegmentId("all");
        return;
      }

      setPopupInfo(stop);
      if (stop.segmentId) {
        setActiveSegmentId(stop.segmentId);
      }
    },
    [popupInfo]
  );

  const handleSidebarSelect = useCallback(
    (stop: Stop) => {
      handleMarkerSelect(stop);
      if (!mapReady) return;

      const segment = ROUTE_SEGMENTS.find((item) => item.id === stop.segmentId);
      if (segment) {
        focusOnCoordinates(segment.coordinates, segment.bearing);
      } else {
        focusOnCoordinates([stop.coords], -18);
      }
    },
    [focusOnCoordinates, handleMarkerSelect, mapReady]
  );

  if (!token) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.25 }}
        className="flex h-[420px] w-full items-center justify-center rounded-2xl border border-ink/10 bg-sand px-6 text-sm text-ink/80 shadow-lg"
      >
        Ajoute ton jeton Mapbox (`NEXT_PUBLIC_MAPBOX_TOKEN`) pour profiter de la carte interactive animée.
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.25 }}
      className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-ink/10 shadow-lg"
    >
      {mapReady ? (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-start justify-end p-4">
          <div className="pointer-events-auto hidden max-h-[calc(100%-32px)] w-60 flex-col gap-2 overflow-y-auto rounded-3xl bg-white/85 p-4 text-xs text-ink shadow-lg backdrop-blur sm:flex">
            <div>
              <p className="text-sm font-semibold text-ink">Étapes sur la carte</p>
              <p className="mt-1 text-[11px] text-slate-500">Clique pour zoomer ou ouvrir sur la carte.</p>
            </div>
            <div className="mt-2 flex flex-col gap-2">
              {STOPS.map((stop) => {
                const phase = phaseMap[stop.phaseId];
                const isActive = popupInfo?.title === stop.title;
                return (
                  <button
                    key={`sidebar-${stop.title}-${stop.coords[0]}`}
                    type="button"
                    onClick={() => handleSidebarSelect(stop)}
                    className={`flex items-center gap-3 rounded-2xl border px-3 py-2 text-left text-xs font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-jungle)]/40 focus-visible:ring-offset-2 ${
                      isActive ? "border-transparent text-ink shadow" : "border-ink/10 text-ink/80 hover:bg-white"
                    }`}
                    style={{
                      backgroundColor: isActive ? `${phase.color}20` : "rgba(255,255,255,0.75)",
                    }}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-base">{phase.icon}</span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold text-ink">{stop.title}</span>
                      <span className="text-[11px] text-slate-500">{stop.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      <Map
        ref={mapRef}
        mapboxAccessToken={token}
        mapStyle="mapbox://styles/mapbox/navigation-night-v1"
        initialViewState={INITIAL_VIEW_STATE}
        style={{ width: "100%", height: "100%" }}
        reuseMaps
        onLoad={(event) => {
          setMapReady(true);
          const map = event.target;
          map.setFog({
            color: "rgba(12, 74, 110, 0.35)",
            "high-color": "#fdf6ec",
            "space-color": "#0f172a",
            "horizon-blend": 0.2,
          });
          focusOnCoordinates(ALL_COORDS, -18);
        }}
      >
        <Source id="route" type="geojson" data={routeGeoJson}>
          <Layer
            id="route-line"
            type="line"
            paint={{
              "line-color": ["get", "color"],
              "line-width": ["get", "width"],
              "line-opacity": ["get", "opacity"],
              "line-join": "round",
              "line-cap": "round",
            }}
          />
        </Source>

        <NavigationControl position="top-right" visualizePitch />
        <FullscreenControl position="top-left" />
        <ScaleControl position="bottom-left" maxWidth={120} unit="metric" />

        {STOPS.map((stop) => {
          const phase = phaseMap[stop.phaseId];
          const isActive = popupInfo?.title === stop.title;
          return (
            <Marker key={`${stop.title}-${stop.coords[0]}`} longitude={stop.coords[0]} latitude={stop.coords[1]} anchor="bottom">
              <button
                type="button"
                onClick={() => handleMarkerSelect(stop)}
                className="group relative flex flex-col items-center focus:outline-none"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white/80 text-lg shadow-md transition ${
                    isActive ? "border-[var(--color-jungle)]" : "border-white/70"
                  }`}
                  style={{ color: phase.color, backdropFilter: "blur(6px)" }}
                >
                  {phase.icon}
                </span>
                <span
                  className="pointer-events-none absolute left-12 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-2xl bg-white/95 px-3 py-1 text-xs font-semibold text-ink shadow-lg transition group-hover:block group-focus-visible:block"
                >
                  {stop.title}
                </span>
              </button>
            </Marker>
          );
        })}

        {popupInfo ? (
          <Popup
            longitude={popupInfo.coords[0]}
            latitude={popupInfo.coords[1]}
            anchor="top"
            offset={[0, 18]}
            closeButton
            closeOnMove={false}
            maxWidth="240px"
            onClose={() => {
              setPopupInfo(null);
              setActiveSegmentId("all");
            }}
          >
            <div className="w-[220px] space-y-2">
              {popupInfo.image ? (
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={popupInfo.image}
                    alt={popupInfo.title}
                    width={220}
                    height={112}
                    className="h-28 w-full object-cover"
                    sizes="220px"
                    priority={false}
                  />
                </div>
              ) : null}
              <div>
                <p className="text-sm font-semibold text-ink">{popupInfo.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{popupInfo.description}</p>
              </div>
              {popupInfo.href ? (
                <a
                  href={popupInfo.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-jungle)] underline decoration-dotted underline-offset-2"
                >
                  Ouvrir la fiche
                </a>
              ) : null}
            </div>
          </Popup>
        ) : null}
      </Map>
    </motion.div>
  );
}
