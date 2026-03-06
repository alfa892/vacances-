import { BudgetLine, BudgetResponse } from "./types";

const perPerson: BudgetLine[] = [
  { label: "Avion", amount: 650, note: "Paris ↔ Colombo", category: "vols" },
  { label: "Logement", amount: 470.62, note: "Hotels, villas et nuits clefs", category: "logement" },
  { label: "Activites", amount: 255, note: "Safari, snorkelling, temples et extras", category: "activites" },
  { label: "Repas", amount: 250, note: "Restos, rooftop et marge repas", category: "repas" },
  { label: "Trajets", amount: 41.64, note: "Voitures, train et petits transferts", category: "transport" },
];

const groupSize = 8;

const totalPerPerson = perPerson.reduce((acc, curr) => acc + curr.amount, 0);

export const budgetData: BudgetResponse = {
  perPerson,
  totalPerPerson,
  totalGroup: totalPerPerson * groupSize,
  groupSize,
};
