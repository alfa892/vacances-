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

export const signatureMoments: SignatureMoment[] = [
  {
    eyebrow: "Jour 1",
    title: "Colombo de nuit",
    description:
      "On atterrit, on pose les sacs, et on monte direct sur un rooftop. Premier soir, premiere claque.",
    note: "Rooftop avec vue sur la Lotus Tower",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2y_CRTasuGeX5a8QeL-paqDIZT_Xobj1q8A&s",
  },
  {
    eyebrow: "Jour 3",
    title: "Safari elephants",
    description:
      "Jeep a l'aube dans le parc d'Udawalawe. Elephants, brume, silence. Le truc dont tout le monde reparle apres.",
    note: "Udawalawe National Park",
    image:
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/09/de/b4/21.jpg",
  },
  {
    eyebrow: "Jour 4",
    title: "Le train Ella - Kandy",
    description:
      "5 a 7h de train a travers les plantations de the. Fenetre ouverte, paysages de dingue. Tout le monde sort son tel.",
    note: "Viser le cote gauche pour les vues",
    image:
      "https://cdn.getyourguide.com/img/tour/72bc58fb94e5a37e.jpeg/145.jpg",
  },
  {
    eyebrow: "Jour 7",
    title: "Trincomalee et Pigeon Island",
    description:
      "Villa au bord de l'ocean, snorkelling, baleines. La partie du voyage ou on decroche vraiment.",
    note: "3 nuits sur place, on prend le temps",
    image:
      "https://www.carnetdescapades.com/app/uploads/2019/01/pigeon-island-sri-lanka.jpg",
  },
];

export const planningSteps: PlanningStep[] = [
  {
    when: "Maintenant",
    title: "Confirmer qui vient",
    note: "On a besoin du nombre definitif pour bloquer les vols et les logements.",
  },
  {
    when: "Des que c'est bon",
    title: "Prendre les billets d'avion",
    note: "741 EUR par personne. Plus on attend, plus ca monte.",
  },
  {
    when: "Dans la foulee",
    title: "Reserver les logements",
    note: "Surtout la villa de Trincomalee et la premiere nuit a Colombo.",
  },
  {
    when: "2 semaines avant",
    title: "Visa, assurance, check valises",
    note: "Le visa ETA se fait en ligne. Compter 50 EUR.",
  },
];

export const packingChecklist: ChecklistItem[] = [
  {
    id: "passport",
    category: "Papiers",
    label: "Passeport valide",
    note: "Obligatoire, verifier la date d'expiration.",
  },
  {
    id: "visa",
    category: "Papiers",
    label: "Visa ETA",
    note: "A faire en ligne avant de partir. 50 EUR.",
  },
  {
    id: "insurance",
    category: "Papiers",
    label: "Assurance voyage",
    note: "A prendre meme si c'est chiant.",
  },
  {
    id: "cards",
    category: "Argent",
    label: "Carte bancaire + backup",
    note: "Avoir une deuxieme carte au cas ou.",
  },
  {
    id: "adapter",
    category: "Tech",
    label: "Adaptateur prise",
    note: "Prises type G au Sri Lanka.",
  },
  {
    id: "sun",
    category: "Confort",
    label: "Creme solaire + lunettes",
    note: "Ca tape fort, surtout sur la cote.",
  },
  {
    id: "mosquito",
    category: "Confort",
    label: "Anti moustique",
    note: "Indispensable le soir.",
  },
  {
    id: "swim",
    category: "Bagage",
    label: "Maillot + tenues legeres",
    note: "Il fait chaud. Tout le temps.",
  },
  {
    id: "shoes",
    category: "Bagage",
    label: "Chaussures de marche",
    note: "Pour Sigiriya (1200 marches) et les temples.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "On va pas trop courir ?",
    answer:
      "Non. Y'a des grosses journees (genre safari + route) mais aussi des jours full chill a Trincomalee. C'est equilibre.",
  },
  {
    question: "2 000 EUR c'est le max ?",
    answer:
      "C'est le budget tout compris : vols, visa, chauffeur, logements, activites, bouffe. Apres si tu veux claquer plus en souvenir ou en restos c'est en plus.",
  },
  {
    question: "C'est dangereux ?",
    answer:
      "Non. Le Sri Lanka c'est safe pour les touristes. On a un chauffeur prive pour tous les trajets donc on gere pas la route non plus.",
  },
  {
    question: "Faut se faire vacciner ?",
    answer:
      "Pas obligatoire mais c'est recommande de checker avec ton medecin. Hepatite A et fievre typhoide en general.",
  },
  {
    question: "Et si je peux pas venir au dernier moment ?",
    answer:
      "Les billets d'avion c'est generalement non remboursable. Pour les logements ca depend des conditions. C'est pour ca qu'il faut confirmer vite.",
  },
];

export const practicalResources: PracticalResource[] = [
  {
    title: "Chauffeur prive",
    description: "On a un chauffeur pour tous les trajets. Pas besoin de se prendre la tete.",
    points: [
      "120 EUR par personne pour tout le sejour",
      "Transferts aeroport inclus",
      "Il connait les routes et les bons spots",
    ],
  },
  {
    title: "Train Ella - Kandy",
    description: "Le seul trajet qu'on fait pas en voiture. Et c'est le meilleur moment du voyage.",
    points: [
      "Reservation a faire 1 mois avant",
      "Cote gauche pour les vues",
      "Prevoir de quoi manger dans le train",
    ],
  },
  {
    title: "Sur place",
    description: "Quelques trucs utiles a savoir avant d'arriver.",
    points: [
      "Monnaie locale : roupie sri lankaise (LKR)",
      "On peut payer en carte dans pas mal d'endroits",
      "Pourboire classique : 10% au resto",
    ],
  },
];
