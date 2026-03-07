import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "photos.altai-travel.com",
      },
{
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "cf.bstatic.com",
      },
      {
        protocol: "https",
        hostname: "a0.muscache.com",
      },
{
        protocol: "https",
        hostname: "dynamic-media-cdn.tripadvisor.com",
      },
      {
        protocol: "https",
        hostname: "l450v.alamy.com",
      },
      {
        protocol: "https",
        hostname: "www.prochain-arret.com",
      },
      {
        protocol: "https",
        hostname: "www.lovesrilanka.org",
      },
{
        protocol: "https",
        hostname: "wandertropics.com",
      },
      {
        protocol: "https",
        hostname: "thirdeyetraveller.com",
      },
{
        protocol: "https",
        hostname: "www.unpasseportencavale.com",
      },
{
        protocol: "https",
        hostname: "media.timeout.com",
      },
      {
        protocol: "https",
        hostname: "media.tacdn.com",
      },
      {
        protocol: "https",
        hostname: "duqjpivknq39s.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "media-cdn.tripadvisor.com",
      },
      {
        protocol: "https",
        hostname: "cdn.getyourguide.com",
      },
{
        protocol: "https",
        hostname: "lh5.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "preview.redd.it",
      },
      {
        protocol: "https",
        hostname: "backpackersunited.in",
      },
      {
        protocol: "https",
        hostname: "www.andbeyond.com",
      },
{
        protocol: "https",
        hostname: "www.carnetdescapades.com",
      },
      {
        protocol: "https",
        hostname: "www.mondeasie.com",
      },
      {
        protocol: "https",
        hostname: "res.klook.com",
      },
{
        protocol: "https",
        hostname: "www.trawell.in",
      },
      {
        protocol: "https",
        hostname: "www.artesine.fr",
      },
      {
        protocol: "https",
        hostname: "www.experiencetravelgroup.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://api.mapbox.com blob:",
              "style-src 'self' 'unsafe-inline' https://api.mapbox.com https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.unsplash.com https://*.gstatic.com https://*.muscache.com https://*.tripadvisor.com https://*.mapbox.com https://a0.muscache.com https://cf.bstatic.com https://encrypted-tbn0.gstatic.com https://dynamic-media-cdn.tripadvisor.com https://media-cdn.tripadvisor.com https://media.tacdn.com https://thirdeyetraveller.com https://l450v.alamy.com https://www.prochain-arret.com https://www.lovesrilanka.org https://media.timeout.com https://duqjpivknq39s.cloudfront.net https://cdn.getyourguide.com https://lh5.googleusercontent.com https://preview.redd.it https://backpackersunited.in https://www.andbeyond.com https://www.carnetdescapades.com https://www.mondeasie.com https://res.klook.com https://www.trawell.in https://www.artesine.fr https://www.experiencetravelgroup.com https://photos.altai-travel.com",
              "connect-src 'self' https://*.mapbox.com https://api.mapbox.com https://events.mapbox.com",
              "media-src 'self' https://coverr.co https://*.coverr.co blob:",
              "worker-src 'self' blob:",
              "frame-src 'none'",
            ].join("; "),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=300" },
        ],
      },
    ];
  },
};

export default nextConfig;
