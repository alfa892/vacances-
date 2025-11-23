import { BudgetLine, BudgetResponse } from "./types";

const perPerson: BudgetLine[] = [
  { label: "Avion", amount: 650, note: "Paris ↔ Colombo", category: "vols" },
  { label: "Logement", amount: 470, note: "Hôtels & villas", category: "logement" },
  { label: "Activités", amount: 250, note: "Safari, zipline, temples", category: "activites" },
  { label: "Repas & drinks", amount: 200, note: "Restaurants, rooftops", category: "repas" },
  { label: "Transport", amount: 50, note: "Train, van, tuk-tuk", category: "transport" },
  { label: "Visa", amount: 40, note: "ETA en ligne", category: "visa" },
];

const groupSize = 8;

const totalPerPerson = perPerson.reduce((acc, curr) => acc + curr.amount, 0);

export const budgetData: BudgetResponse = {
  perPerson,
  totalPerPerson,
  totalGroup: totalPerPerson * groupSize,
  groupSize,
};
