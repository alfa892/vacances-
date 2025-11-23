import type { Metadata } from "next";
import { Geist, Fraunces, JetBrains_Mono } from "next/font/google";
import { CustomCursor } from "./components/CustomCursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"], // Enable variable font axes for that organic feel
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const title = "Sri Lanka de Luxe — Roadtrip entre potes";
const description =
  "Itinéraire 11 jours au Sri Lanka : Colombo, plages sud, safari, train bleu, temples et Trincomalee. Budget 1 670 € maîtrisé, hébergements stylés, vibe fun.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Sri Lanka",
    "Voyage amis",
    "Itinéraire luxe",
    "Safari Udawalawe",
    "Train Ella Kandy",
    "Trincomalee",
    "Budget voyage",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    images: [
      {
        url: "https://photos.altai-travel.com/1920x0/train-bleu-sri-lanka-entre-colombo-et-kandy-altai-travel-35977.jpg",
        width: 1920,
        height: 1080,
        alt: "Train bleu traversant les plantations de thé au Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

import { getFeatureFlags } from "@/lib/api";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const flags = await getFeatureFlags();

  const bodyClasses = [
    geistSans.variable,
    fraunces.variable,
    jetbrainsMono.variable,
    "antialiased",
    flags.contrast === "high" ? "high-contrast" : "",
    flags.density === "compact" ? "density-compact" : "",
    flags.motionLevel !== "full" ? "reduce-motion" : "",
  ].filter(Boolean).join(" ");

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={bodyClasses}>
        <CustomCursor forceHidden={!flags.animations} />
        {children}
      </body>
    </html>
  );
}
