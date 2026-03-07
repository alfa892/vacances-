export const dynamic = "force-static";
export const revalidate = 3600;

import { CalendarDays, MapPinned, Wallet } from "lucide-react";
import { storyData } from "./api/data/storyData";
import { budgetData } from "./api/data/budgetData";
import { BudgetWidget } from "./components/BudgetWidget";
import { ClientEffects } from "./components/ClientEffects";
import { CommandPalette } from "./components/CommandPalette";
import { PlanningToolkit } from "./components/PlanningToolkit";
import { PracticalResources } from "./components/PracticalResources";
import { ScrollytellingSection } from "./components/ScrollytellingSection";
import { SignatureMoments } from "./components/SignatureMoments";
import { TripHero } from "./components/TripHero";
import { TripFaq } from "./components/TripFaq";
import {
  faqItems,
  packingChecklist,
  planningSteps,
  practicalResources,
  signatureMoments,
} from "./lib/siteContent";

const heroImage = "/photos/hero-sri-lanka.jpg";

const quickPitchCards = [
  {
    label: "Duree",
    value: "9 jours",
    note: "Du jour 1 a Colombo au vol retour.",
    icon: CalendarDays,
    variant: "brutal-card-ocean" as const,
  },
  {
    label: "Budget",
    value: `${budgetData.totalPerPerson.toLocaleString("fr-FR")} EUR`,
    note: "Par personne, tout compris.",
    icon: Wallet,
    variant: "brutal-card-saffron" as const,
  },
  {
    label: "Parcours",
    value: `${new Set(storyData.days.flatMap((day) => day.cities)).size} etapes`,
    note: "Colombo, safari, train, temples, plages.",
    icon: MapPinned,
    variant: "brutal-card-lime" as const,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-night text-ink selection:bg-lime selection:text-night">
      <div className="bg-noise" />
      <ClientEffects />
      <CommandPalette />

      {/* ─── HERO ─── */}
      <TripHero
        title={storyData.tripTitle}
        subtitle={storyData.tripSubtitle}
        heroImage={heroImage}
        heroVideo={storyData.days[0]?.heroVideo}
        duration={String(storyData.days.length)}
        totalBudget={`${budgetData.totalPerPerson.toLocaleString("fr-FR")} EUR`}
        primaryAction={{ label: "Voir l'itineraire", href: "#itineraire" }}
        secondaryAction={{ label: "Voir le budget", href: "#budget" }}
      />

      {/* ─── RESUME RAPIDE ─── */}
      <section className="relative z-10 bg-night px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-lime/60">
            En bref
          </p>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-6xl">
            Le plan
          </h2>
          <p className="mt-4 max-w-xl text-base text-ink/50">
            9 jours au Sri Lanka a 12. Tout est deja organise,
            y&apos;a plus qu&apos;a confirmer.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {quickPitchCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className={`${card.variant} p-6`}>
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span className="text-xs font-mono uppercase tracking-[0.25em] opacity-60">
                      {card.label}
                    </span>
                  </div>
                  <p className="mt-4 font-serif text-4xl">{card.value}</p>
                  <p className="mt-3 text-sm leading-relaxed opacity-70">{card.note}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TEMPS FORTS ─── */}
      <SignatureMoments moments={signatureMoments} />

      {/* ─── ITINERAIRE ─── */}
      <div id="itineraire">
        <ScrollytellingSection days={storyData.days} />
      </div>

      {/* ─── BUDGET ─── */}
      <section id="budget" className="relative z-10 overflow-hidden bg-night px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-xl">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-saffron/80">
              Budget
            </p>
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-6xl">
              Combien ca coute
            </h2>
            <p className="mt-4 text-base text-ink/50">
              {budgetData.totalPerPerson.toLocaleString("fr-FR")} EUR par personne, tout compris.
              Voila comment c&apos;est reparti.
            </p>
          </div>
          <BudgetWidget budget={budgetData} />
        </div>
      </section>

      {/* ─── PLANNING + CHECKLIST ─── */}
      <PlanningToolkit planningSteps={planningSteps} checklist={packingChecklist} />

      {/* ─── INFOS PRATIQUES ─── */}
      <PracticalResources resources={practicalResources} />

      {/* ─── FAQ ─── */}
      <TripFaq items={faqItems} />

      {/* ─── FOOTER ─── */}
      <section className="relative z-10 bg-night px-6 py-28 lg:px-12">
        <div className="brutal-card-lime mx-auto max-w-5xl p-10 text-center sm:p-16">
          <h2 className="font-serif text-4xl md:text-7xl">
            Bon, vous en etes ?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed opacity-60">
            Tout est la : l&apos;itineraire, le budget, les infos.
            Confirmez vite qu&apos;on bloque les billets.
          </p>
        </div>
      </section>
    </main>
  );
}
