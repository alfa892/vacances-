import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
