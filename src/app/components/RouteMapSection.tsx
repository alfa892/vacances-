"use client";

import dynamic from "next/dynamic";

const LazyRouteMap = dynamic(() => import("./RouteMap").then((mod) => mod.RouteMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center rounded-2xl border border-ink/10 bg-sand text-sm text-ink/70">
      Chargement de la carte…
    </div>
  ),
});

export function RouteMapSection() {
  return <LazyRouteMap />;
}
