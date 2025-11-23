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
const WORLD_ROUTE_COORDS: [number, number][] = [
  [2.3522, 48.8566], // Paris
  [79.8612, 6.9271], // Colombo
];
const ALL_COORDS_WITH_WORLD = [...WORLD_ROUTE_COORDS, ...ALL_COORDS];
const WORLD_MARKERS = [
  { coords: WORLD_ROUTE_COORDS[0], title: "Paris", icon: "✈️", color: "#60a5fa" },
];

const INITIAL_VIEW_STATE = {
  longitude: 25,
  latitude: 25,
  zoom: 3.2,
  bearing: 0,
  pitch: 0,
};

type ViewportTarget = {
  center: [number, number];
  zoom: number;
  bearing: number;
  pitch: number;
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

type RouteMapProps = {
  activeDay?: string;
  activeCity?: string;
  prefersReducedMotion?: boolean;
};

const DAY_COORDS: Record<string, [number, number][]> = {
  'Day 1': [STOPS[0].coords], // Colombo
  'Day 2': [STOPS[1].coords, STOPS[2].coords], // Unawatuna + Mirissa
  'Day 3': [STOPS[3].coords], // Udawalawe
  'Day 4': [STOPS[4].coords, STOPS[5].coords], // Ella + Kandy
  'Day 5': [STOPS[6].coords], // Sigiriya
  'Day 6': [STOPS[7].coords], // Trincomalee
  'Day 7': [STOPS[7].coords], // Trincomalee
  'Day 8': [STOPS[7].coords], // Trincomalee
  'Day 9': [STOPS[8].coords], // Colombo retour
};

const CITY_LOCATIONS: Record<string, ViewportTarget> = STOPS.reduce((acc, stop) => {
  const key = stop.title.replace(/\s*\(.*?\)\s*/g, '').toLowerCase();
  acc[key] = {
    center: stop.coords,
    zoom: stop.title.toLowerCase().includes('colombo') ? 12 : 11,
    bearing: -18,
    pitch: 45,
  };
  return acc;
}, {} as Record<string, ViewportTarget>);

const FALLBACK_LOCATION: ViewportTarget = {
  center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
  zoom: INITIAL_VIEW_STATE.zoom,
  bearing: INITIAL_VIEW_STATE.bearing,
  pitch: INITIAL_VIEW_STATE.pitch,
};

const normalizeDayKey = (value?: string) => {
  if (!value) return null;
  const trimmed = value.trim();
  const explicitDay = trimmed.match(/^(Day\s*\d+)/i);
  if (explicitDay) {
    return explicitDay[1].replace(/\s+/, ' ');
  }
  const beforeDash = trimmed.split('—')[0]?.trim();
  if (beforeDash) return beforeDash;
  return trimmed;
};

export function RouteMap({ activeDay, activeCity, prefersReducedMotion = false }: RouteMapProps) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const [activeSegmentId, setActiveSegmentId] = useState<string>("all");
  const [popupInfo, setPopupInfo] = useState<Stop | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [hasZoomedToSriLanka, setHasZoomedToSriLanka] = useState(false);
  const [introPlayed, setIntroPlayed] = useState(false);
  const [basemapStyle, setBasemapStyle] = useState<string>("mapbox://styles/mapbox/dark-v11");
  const [usingFallbackStyle, setUsingFallbackStyle] = useState(false);

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

  const worldRouteGeoJson = useMemo(
    () => ({
      type: "FeatureCollection" as const,
      features: [
        {
          type: "Feature" as const,
          properties: {},
          geometry: {
            type: "LineString" as const,
            coordinates: WORLD_ROUTE_COORDS,
          },
        },
      ],
    }),
    []
  );

  const focusOnCoordinates = useCallback((coordinates: [number, number][], bearing = -12, padding = 160) => {
    if (!mapRef.current || coordinates.length === 0) return;
    const map = mapRef.current.getMap();
    const bounds = computeBounds(coordinates);
    map.fitBounds(bounds, {
      padding,
      maxZoom: 13.5,
      duration: prefersReducedMotion ? 0 : 1200,
      bearing: 0,
      pitch: 0,
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!mapReady) return;
    if (activeSegmentId === "all") {
      focusOnCoordinates(ALL_COORDS_WITH_WORLD, 0, 220);
      return;
    }

    const segment = ROUTE_SEGMENTS.find((item) => item.id === activeSegmentId);
    if (segment) {
      const padding = segment.coordinates.length > 2 ? 160 : 140;
      focusOnCoordinates(segment.coordinates, 0, padding);
    }
  }, [activeSegmentId, focusOnCoordinates, mapReady]);

  // Fly to location when activeDay changes
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;

    const dayKey = normalizeDayKey(activeDay) || undefined;
    const dayCoords = dayKey ? DAY_COORDS[dayKey] : undefined;

    if (!introPlayed && dayCoords && dayCoords.length > 0) {
      if (prefersReducedMotion) {
        focusOnCoordinates(dayCoords, 0, dayCoords.length > 1 ? 150 : 180);
        setIntroPlayed(true);
        return;
      }

      const map = mapRef.current.getMap();

      // Step 1: Paris
      map.flyTo({
        center: WORLD_ROUTE_COORDS[0],
        zoom: 4.5,
        bearing: 0,
        pitch: 0,
        duration: 1200,
        essential: true,
      });

      // Step 2: Colombo
      setTimeout(() => {
        map.flyTo({
          center: STOPS[0].coords,
          zoom: 10,
          bearing: 0,
          pitch: 0,
          duration: 1200,
          essential: true,
        });
      }, 1300);

      // Step 3: focus day
      setTimeout(() => {
        const padding = dayCoords.length > 1 ? 150 : 180;
        focusOnCoordinates(dayCoords, 0, padding);
        setIntroPlayed(true);
      }, 2600);

      return;
    }

    if (dayCoords && dayCoords.length > 0) {
      const padding = dayCoords.length > 1 ? 150 : 180;
      focusOnCoordinates(dayCoords, 0, padding);
      return;
    }

    // No day coordinates: do nothing
  }, [activeCity, activeDay, focusOnCoordinates, introPlayed, mapReady, prefersReducedMotion]);

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
        className="flex h-[420px] w-full items-center justify-center rounded-3xl glass-panel px-6 text-sm text-ink/80"
      >
        Ajoute ton jeton Mapbox (`NEXT_PUBLIC_MAPBOX_TOKEN`) pour profiter de la carte interactive animée.
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-full"
    >
      <Map
        ref={mapRef}
        mapboxAccessToken={token}
        mapStyle={basemapStyle}
        initialViewState={INITIAL_VIEW_STATE}
        style={{ width: "100%", height: "100%" }}
        reuseMaps
        interactive={false}
        dragPan={false}
        scrollZoom={false}
        doubleClickZoom={false}
        keyboard={false}
        touchZoomRotate={false}
        touchPitch={false}
        dragRotate={false}
        onLoad={(event) => {
          setMapReady(true);
          const map = event.target;
          map.setProjection({ name: "globe" });
          map.setFog({
            color: "rgba(2, 44, 34, 0.5)",
            "high-color": "rgba(3, 84, 63, 0.6)",
            "space-color": "#020617",
            "horizon-blend": 0.2,
          });
          // Vue monde puis fly direct Sri Lanka large
          focusOnCoordinates(ALL_COORDS_WITH_WORLD, -10, 260);
          if (!hasZoomedToSriLanka) {
            const duration = prefersReducedMotion ? 0 : 1200;
            setTimeout(() => {
              map.flyTo({
                center: [80.4, 7.2],
                zoom: 6.4,
                bearing: 0,
                pitch: 0,
                duration,
                essential: true,
              });
              setHasZoomedToSriLanka(true);
            }, prefersReducedMotion ? 0 : 600);
          }
        }}
        onError={(event) => {
          // Si le style Mapbox échoue (token invalide / droit manquant), fallback vers un style public Carto
          if (!usingFallbackStyle) {
            setBasemapStyle("https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json");
            setUsingFallbackStyle(true);
          }
        }}
      >
        <Source id="world-route" type="geojson" data={worldRouteGeoJson}>
          <Layer
            id="world-line"
            type="line"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "#60a5fa",
              "line-width": 2.5,
              "line-opacity": 0.45,
              "line-dasharray": [2, 2],
            }}
          />
        </Source>

        <Source id="route" type="geojson" data={routeGeoJson}>
          <Layer
            id="route-line"
            type="line"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "#d9f99d", // Neon Lime
              "line-width": 4,
              "line-opacity": 0.9,
              "line-blur": 1,
            }}
          />
        </Source>

        {WORLD_MARKERS.map((marker) => (
          <Marker key={marker.title} longitude={marker.coords[0]} latitude={marker.coords[1]} anchor="bottom">
            <div className="flex flex-col items-center gap-1 pointer-events-none">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 bg-white/80 text-lg shadow-md" style={{ color: marker.color }}>
                {marker.icon}
              </span>
              <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold text-ink shadow-sm">{marker.title}</span>
            </div>
          </Marker>
        ))}

        {STOPS.map((stop) => {
          const phase = phaseMap[stop.phaseId];
          const isActive = popupInfo?.title === stop.title;
          return (
            <Marker key={`${stop.title}-${stop.coords[0]}`} longitude={stop.coords[0]} latitude={stop.coords[1]} anchor="bottom">
              <div className="group relative flex flex-col items-center pointer-events-none">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white/80 text-lg shadow-md transition ${isActive ? "border-[var(--color-jungle)]" : "border-white/70"
                    }`}
                  style={{ color: phase.color, backdropFilter: "blur(6px)" }}
                >
                  {phase.icon}
                </span>
              </div>
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
