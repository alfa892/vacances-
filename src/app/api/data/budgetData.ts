import { BudgetLine, BudgetResponse } from "./types";

const perPerson: BudgetLine[] = [
  { label: "Vols", amount: 741, note: "Paris - Colombo aller-retour", category: "vols" },
  { label: "Visa", amount: 50, note: "ETA a faire avant de partir", category: "visa" },
  { label: "Chauffeur prive", amount: 120, note: "Pour tous les trajets sur place", category: "transport" },
  { label: "Logement", amount: 470, note: "Hotels et villas pour 9 nuits", category: "logement" },
  { label: "Activites", amount: 255, note: "Safari, snorkelling, temples, zipline", category: "activites" },
  { label: "Repas", amount: 250, note: "Restos et bouffe sur place", category: "repas" },
  { label: "Divers", amount: 114, note: "Marge pour les imprevus", category: "divers" },
];

const groupSize = 12;

const totalPerPerson = perPerson.reduce((acc, curr) => acc + curr.amount, 0);

export const budgetData: BudgetResponse = {
  perPerson,
  totalPerPerson,
  totalGroup: totalPerPerson * groupSize,
  groupSize,
};
