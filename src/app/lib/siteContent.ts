import type { BudgetLine } from "@/app/api/data/types";

export type TripModeId = "smart" | "balanced" | "premium";

export type TripMode = {
  id: TripModeId;
  label: string;
  badge: string;
  budgetHint: string;
  description: string;
  pace: string;
  vibe: string;
  bullets: string[];
  adjustments: Partial<Record<BudgetLine["category"], number>>;
  recommended?: boolean;
};

export type SignatureMoment = {
  eyebrow: string;
  title: string;
  description: string;
  note: string;
  image: string;
};

export type PlanningStep = {
  when: string;
  title: string;
  note: string;
};

export type ChecklistItem = {
  id: string;
  category: string;
  label: string;
  note: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type PracticalResource = {
  title: string;
  description: string;
  points: string[];
  href?: string;
  actionLabel?: string;
};

export const heroHighlights = [
  "9 jours sur place tres denses",
  "Budget groupe deja cadre",
  "Plage, safari, train et villas",
];

export const tripModes: TripMode[] = [
  {
    id: "smart",
    label: "Version malin",
    badge: "Le plus budget",
    budgetHint: "environ 1 450 EUR / pers",
    description: "On garde les temps forts et on coupe juste le superflu.",
    pace: "Rythme souple",
    vibe: "Confort simple, belles etapes, budget plus doux",
    bullets: [
      "Hotels plus simples sur 2 nuits",
      "Moins de restos premium",
      "Toujours safari, train et plages",
    ],
    adjustments: {
      logement: -90,
      repas: -35,
      activites: -25,
      transport: -10,
    },
  },
  {
    id: "balanced",
    label: "Version equilibree",
    badge: "La meilleure selon moi",
    budgetHint: "environ 1 667 EUR / pers",
    description: "Le bon ratio entre beau voyage, confort et prix defendable.",
    pace: "Rythme ideal",
    vibe: "On profite fort sans impression d'abus",
    bullets: [
      "Belles adresses sans surpayer",
      "Gros temps forts maintenus",
      "Le meilleur pitch pour convaincre le groupe",
    ],
    adjustments: {},
    recommended: true,
  },
  {
    id: "premium",
    label: "Version grand confort",
    badge: "Le plus wow",
    budgetHint: "environ 1 980 EUR / pers",
    description: "Plus de confort, plus de marge, moins de compromis.",
    pace: "Rythme fluide",
    vibe: "Plus beau, plus simple, plus premium",
    bullets: [
      "Villas et chambres plus fortes",
      "Restaurants et transferts plus confort",
      "Toujours simple a organiser",
    ],
    adjustments: {
      logement: 150,
      repas: 60,
      activites: 70,
      transport: 40,
    },
  },
];

export const signatureMoments: SignatureMoment[] = [
  {
    eyebrow: "Moment 01",
    title: "Colombo de nuit, sans temps mort",
    description: "On atterrit, on pose les valises, puis rooftop direct. Le voyage commence fort.",
    note: "Parfait pour donner le ton des la premiere soiree.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2y_CRTasuGeX5a8QeL-paqDIZT_Xobj1q8A&s",
  },
  {
    eyebrow: "Moment 02",
    title: "Safari a l'aube",
    description: "Brume, jeep, elephants. C'est le souvenir dont tout le monde reparle ensuite.",
    note: "Le moment carte postale qui justifie le Sri Lanka a lui seul.",
    image:
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/09/de/b4/21.jpg",
  },
  {
    eyebrow: "Moment 03",
    title: "Train bleu entre Ella et Kandy",
    description: "Le passage cinema. The, brume et rails. Tout le monde sort son telephone.",
    note: "Visuellement, c'est le passage le plus fort du site.",
    image:
      "https://cdn.getyourguide.com/img/tour/72bc58fb94e5a37e.jpeg/145.jpg",
  },
  {
    eyebrow: "Moment 04",
    title: "Trincomalee pour finir tres haut",
    description: "Villa, lagon, snorkelling et baleines. La fin qui donne l'impression de partir deux fois.",
    note: "Le genre de finale qui fait oublier toutes les hesitations du depart.",
    image:
      "https://www.carnetdescapades.com/app/uploads/2019/01/pigeon-island-sri-lanka.jpg",
  },
];

export const planningSteps: PlanningStep[] = [
  {
    when: "Maintenant",
    title: "Bloquer les vols et le mode du voyage",
    note: "C'est la vraie decision. Une fois ca valide, le reste devient simple.",
  },
  {
    when: "Semaine 1",
    title: "Reserver les nuits les plus importantes",
    note: "Colombo premiere nuit, villa sud, Trincomalee. Ce sont les points les plus sensibles.",
  },
  {
    when: "Semaine 2",
    title: "Verrouiller safari et train",
    note: "Ce sont les deux experiences qui structurent le recit du voyage.",
  },
  {
    when: "10 jours avant",
    title: "Visa, chauffeur et dernier recap groupe",
    note: "Tout le monde part rassure, sans messages paniques la veille.",
  },
];

export const packingChecklist: ChecklistItem[] = [
  {
    id: "passport",
    category: "Papiers",
    label: "Passeport valide",
    note: "Le vrai point non negociable.",
  },
  {
    id: "visa",
    category: "Papiers",
    label: "Visa ETA",
    note: "A faire avant le depart.",
  },
  {
    id: "cards",
    category: "Argent",
    label: "Carte bancaire + backup",
    note: "Toujours une deuxieme solution.",
  },
  {
    id: "adapter",
    category: "Tech",
    label: "Adaptateur prise",
    note: "Petit objet, gros agacement si oublie.",
  },
  {
    id: "sun",
    category: "Confort",
    label: "Creme solaire + lunettes",
    note: "Le soleil tape vite.",
  },
  {
    id: "mosquito",
    category: "Confort",
    label: "Anti moustique",
    note: "Tres utile sur certaines etapes.",
  },
  {
    id: "swim",
    category: "Bagage",
    label: "Maillot + tenue legere",
    note: "Plage, piscine, chaleur.",
  },
  {
    id: "shoes",
    category: "Bagage",
    label: "Chaussures faciles a marcher",
    note: "Sigiriya et les transferts deviennent plus simples.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Est-ce qu'on va trop courir ?",
    answer:
      "Non. Le rythme est pense pour alterner gros moment et respiration. On ne change pas d'hotel tous les jours.",
  },
  {
    question: "Est-ce que c'est defendable niveau budget ?",
    answer:
      "Oui. Le mode equilibre reste propre pour un voyage aussi riche. Et on a meme une version malin si le groupe bloque sur le prix.",
  },
  {
    question: "Est-ce qu'on aura aussi du repos ?",
    answer:
      "Oui. La cote sud et Trincomalee servent justement a ca. On n'est pas sur un circuit militaire.",
  },
  {
    question: "Qu'est-ce qui fait vraiment la difference ?",
    answer:
      "Le melange. On n'achete pas juste des plages. On a ville, safari, train, patrimoine et villas dans le meme voyage.",
  },
  {
    question: "Et si certains veulent plus de confort ?",
    answer:
      "On a prevu un mode grand confort. Le site peut donc servir a arbitrer sans tout refaire a la main.",
  },
];

export const groupPitchBullets = [
  "Un voyage qui fait vraiment envie meme aux indecis",
  "Un budget lisible des le debut",
  "Des moments forts qui justifient le prix",
];

export const groupPitchMessage =
  "J'ai prepare un vrai plan Sri Lanka: Colombo, cote sud, safari, train bleu, Sigiriya et Trincomalee. On garde de belles adresses, un budget encore defendable et un mix plage + wow + confort. Franchement, c'est le bon ratio plaisir / organisation.";

export const practicalResources: PracticalResource[] = [
  {
    title: "Taxi fiable",
    description: "Le contact note dans le sheet pour les gros transferts.",
    points: [
      "Real Lanka Holidays Taxi Service",
      "Reserve aussi via 12Go Asia",
      "WhatsApp: +94 77 710 8200",
    ],
    href: "https://wa.me/94777108200",
    actionLabel: "Contacter",
  },
  {
    title: "Train Ella → Kandy",
    description: "Le trajet le plus sensible du voyage.",
    points: [
      "Reservation a faire environ 1 mois avant",
      "Vise le cote gauche pour les vues",
      "Prevoir eau, snack et WC avant",
    ],
  },
  {
    title: "Tuk-tuk sur place",
    description: "La regle simple pour eviter de se faire allumer.",
    points: [
      "Utiliser PickMe quand c'est possible",
      "Sinon demander le prix avant de monter",
      "Garder le cash pour les petits trajets",
    ],
  },
];
