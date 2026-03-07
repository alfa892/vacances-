export const dynamic = "force-static";
export const revalidate = 3600;

import { CalendarDays, MapPinned, Wallet } from "lucide-react";
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
import {
  faqItems,
  groupPitchBullets,
  groupPitchMessage,
  packingChecklist,
  planningSteps,
  practicalResources,
  signatureMoments,
} from "./lib/siteContent";

const heroImage = "/photos/hero-sri-lanka.jpg";
const groupPitchWhatsApp = `https://wa.me/?text=${encodeURIComponent(groupPitchMessage)}`;

const quickPitchCards = [
  {
    label: "Quand",
    value: "9 jours sur place",
    note: "Depart 2026. Dense mais pas speed.",
    icon: CalendarDays,
    variant: "brutal-card-ocean" as const,
  },
  {
    label: "Combien",
    value: `${budgetData.totalPerPerson.toLocaleString("fr-FR")} EUR`,
    note: "Vol + hotel + activites. Tout inclus.",
    icon: Wallet,
    variant: "brutal-card-saffron" as const,
  },
  {
    label: "Le parcours",
    value: `${new Set(storyData.days.flatMap((day) => day.cities)).size} villes`,
    note: "Colombo, safari, train, temples, lagon.",
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
        secondaryAction={{ label: "Convaincre le groupe", href: "#kit-groupe" }}
      />

      {/* ─── QUICK PITCH — 3 neobrutal cards ─── */}
      <section className="relative z-10 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-lime/60">
            En 10 secondes
          </p>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-6xl">
            T&apos;es chaud ou pas ?
          </h2>
          <p className="mt-4 max-w-xl text-base text-ink/50">
            Le Sri Lanka en groupe. Tout est deja cadre.
            Il te reste juste a dire oui.
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

      {/* ─── SIGNATURE MOMENTS ─── */}
      <SignatureMoments moments={signatureMoments} />

      {/* ─── ITINERARY (scrollytelling + map) ─── */}
      <div id="itineraire">
        <ScrollytellingSection days={storyData.days} />
      </div>

      {/* ─── BUDGET ─── */}
      <section className="relative z-10 overflow-hidden bg-night px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-xl">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-saffron/80">
              Budget transparent
            </p>
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-6xl">
              Combien ca coute, vraiment
            </h2>
            <p className="mt-4 text-base text-ink/50">
              Pas de surprise. Tu vois ou va chaque euro.
              Et tu peux ajuster le niveau de confort.
            </p>
          </div>
          <BudgetWidget budget={budgetData} />
        </div>
      </section>

      {/* ─── CONVINCE THE GROUP ─── */}
      <section id="kit-groupe" className="relative z-10 px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-xl">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-lime/60">
              Kit de persuasion
            </p>
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-6xl">
              Envoie ca au groupe, c&apos;est plie
            </h2>
          </div>
          <GroupPitchCard
            message={groupPitchMessage}
            bullets={groupPitchBullets}
            whatsappHref={groupPitchWhatsApp}
          />
        </div>
      </section>

      {/* ─── PLANNING + CHECKLIST ─── */}
      <PlanningToolkit planningSteps={planningSteps} checklist={packingChecklist} />

      {/* ─── PRACTICAL RESOURCES ─── */}
      <PracticalResources resources={practicalResources} />

      {/* ─── FAQ ─── */}
      <TripFaq items={faqItems} />

      {/* ─── FINAL CTA — massive, neobrutal ─── */}
      <section className="relative z-10 px-6 py-28 lg:px-12">
        <div className="brutal-card-lime mx-auto max-w-5xl p-10 text-center sm:p-16">
          <p className="text-xs font-mono uppercase tracking-[0.3em] opacity-50">
            Derniere chance
          </p>
          <h2 className="mt-6 font-serif text-4xl md:text-7xl">
            Le Sri Lanka t&apos;attend. Tes potes aussi.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed opacity-60">
            Tout est la. L&apos;itineraire, le budget, les liens.
            Il manque plus que toi.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <CtaSection ctas={storyData.ctas} />
          </div>
        </div>
      </section>
    </main>
  );
}
