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
  weight: ["400", "700"],
});

const title = "Sri Lanka 2026";
const description =
  "9 jours au Sri Lanka à 12 : Colombo, côte sud, safari, train Ella-Kandy, Sigiriya, Trincomalee. 2 000 € par personne tout compris.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Sri Lanka",
    "Voyage entre amis",
    "Safari Udawalawe",
    "Train Ella Kandy",
    "Trincomalee",
    "Sigiriya",
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-lime focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-night"
        >
          Aller au contenu principal
        </a>
        <CustomCursor forceHidden={!flags.animations} />
        {children}
      </body>
    </html>
  );
}
