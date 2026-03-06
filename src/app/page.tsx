export const dynamic = "force-static";
export const revalidate = 3600;

import { CalendarDays, Compass, MapPinned, Wallet } from "lucide-react";
import { storyData } from "./api/data/storyData";
import { budgetData } from "./api/data/budgetData";
import { BudgetWidget } from "./components/BudgetWidget";
import { ClientEffects } from "./components/ClientEffects";
import { CommandPalette } from "./components/CommandPalette";
import { CtaSection } from "./components/CtaSection";
import { GroupPitchCard } from "./components/GroupPitchCard";
import { PlanningToolkit } from "./components/PlanningToolkit";
import { PracticalResources } from "./components/PracticalResources";
import { ScrollytellingSection } from "./components/ScrollytellingSection";
import { SignatureMoments } from "./components/SignatureMoments";
import { TripHero } from "./components/TripHero";
import { TripFaq } from "./components/TripFaq";
import { TripModes } from "./components/TripModes";
import {
  faqItems,
  groupPitchBullets,
  groupPitchMessage,
  heroHighlights,
  packingChecklist,
  planningSteps,
  practicalResources,
  signatureMoments,
  tripModes,
} from "./lib/siteContent";

const heroImage = "/photos/hero-sri-lanka.jpg";
const groupPitchWhatsApp = `https://wa.me/?text=${encodeURIComponent(groupPitchMessage)}`;

const quickStats = [
  {
    label: "Moments cles",
    value: `${storyData.days.length} etapes`,
    note: "Un fil rouge clair, sans planning indigeste.",
    icon: CalendarDays,
  },
  {
    label: "Budget",
    value: `${budgetData.totalPerPerson.toLocaleString("fr-FR")} EUR`,
    note: "Par personne, avant petite marge confort.",
    icon: Wallet,
  },
  {
    label: "Terrain de jeu",
    value: `${new Set(storyData.days.flatMap((day) => day.cities)).size} villes`,
    note: "Ville, jungle, safari, train et lagon.",
    icon: MapPinned,
  },
  {
    label: "Ambiance",
    value: "Confort + fun",
    note: "Beau, simple et facile a partager au groupe.",
    icon: Compass,
  },
];

const sellingPoints = [
  "On comprend le voyage en 30 secondes. Le site va maintenant droit au but.",
  "Les donnees viennent d'un seul endroit. Moins de doublons, moins de bugs.",
  "La recherche et la navigation mobile sont enfin utiles en vrai.",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-jungle selection:text-white">
      <div className="bg-noise" />
      <ClientEffects />
      <CommandPalette />

      <TripHero
        title={storyData.tripTitle}
        subtitle={storyData.tripSubtitle}
        heroImage={heroImage}
        heroVideo={storyData.days[0]?.heroVideo}
        highlights={heroHighlights}
        primaryAction={{ label: "Voir les moments forts", href: "#moments" }}
        secondaryAction={{ label: "Convaincre le groupe", href: "#kit-groupe" }}
      />

      <section className="relative z-10 border-y border-white/10 bg-[linear-gradient(180deg,rgba(2,44,34,0.96),rgba(3,84,63,0.92))] px-6 py-16 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-black/15 p-8 backdrop-blur-xl">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-lime/80">
              Pourquoi ce site marche mieux
            </p>
            <h2 className="mt-4 font-serif text-3xl text-white md:text-5xl">
              Un voyage premium, lisible et facile a partager
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-white/75 md:text-base">
              {sellingPoints.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {quickStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime/10 text-lime">
                    <Icon size={20} />
                  </div>
                  <p className="mt-5 text-xs font-mono uppercase tracking-[0.25em] text-white/45">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-serif text-3xl text-white">{stat.value}</p>
                  <p className="mt-3 text-sm leading-6 text-white/70">{stat.note}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SignatureMoments moments={signatureMoments} />

      <section id="kit-groupe" className="relative z-10 px-6 py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-lime/80">
              Trois facons de vendre le meme voyage
            </p>
            <h2 className="mt-4 font-serif text-4xl text-white md:text-6xl">
              On peut discuter le style sans refaire tout le projet
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
              C&apos;est ce qui manque souvent dans un groupe: un langage simple pour comparer.
              Ici, chacun comprend vite le niveau de confort vise.
            </p>
            <div className="mt-10">
              <TripModes modes={tripModes} />
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <GroupPitchCard
              message={groupPitchMessage}
              bullets={groupPitchBullets}
              whatsappHref={groupPitchWhatsApp}
            />
          </div>
        </div>
      </section>

      <ScrollytellingSection days={storyData.days} />

      <section className="relative overflow-hidden bg-ink px-6 py-24 text-white lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,249,157,0.14),transparent_35%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="max-w-xl">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-lime/80">
              Budget lisible
            </p>
            <h2 className="mt-4 font-serif text-4xl text-jungle md:text-5xl">
              Un budget clair, sans mauvaise surprise
            </h2>
            <p className="mt-5 text-sm leading-7 text-jungle/75 md:text-base">
              On garde une lecture simple: combien coute le voyage, ou part l&apos;argent,
              et combien de marge confort il reste.
            </p>
          </div>

          <div className="w-full max-w-3xl justify-self-end">
            <BudgetWidget budget={budgetData} />
          </div>
        </div>
      </section>

      <PlanningToolkit planningSteps={planningSteps} checklist={packingChecklist} />
      <PracticalResources resources={practicalResources} />
      <TripFaq items={faqItems} />

      <section className="relative z-10 px-6 py-28 lg:px-12">
        <div className="mx-auto max-w-5xl rounded-[3rem] border border-lime/20 bg-lime p-10 text-center shadow-[0_40px_120px_rgba(2,44,34,0.35)] sm:p-14">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-jungle/60">
            Call to action
          </p>
          <h2 className="mt-5 font-serif text-4xl text-jungle md:text-6xl">
            Si le groupe hesite encore, le site fait deja la moitie du travail
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-jungle/75 md:text-base">
            Tout est la: la vibe, les etapes, les liens utiles et le budget. Il ne
            reste qu&apos;a cliquer.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <CtaSection ctas={storyData.ctas} />
          </div>
        </div>
      </section>
    </main>
  );
}
