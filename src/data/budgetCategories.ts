export type BudgetCategory = {
  name: string;
  percentage: number;
  description: string;
  minPercentage?: number;
  maxPercentage?: number;
};

export const budgetCategories: BudgetCategory[] = [
  {
    name: "Skulder",
    percentage: 20,
    description: "Avbetalning av lån och skulder",
    minPercentage: 10,
    maxPercentage: 50,
  },
  {
    name: "Boende",
    percentage: 25,
    description: "Hyra/lån, el, värme, försäkring, etc.",
    minPercentage: 20,
    maxPercentage: 40,
  },
  {
    name: "Mat & Dagligvaror",
    percentage: 15,
    description: "Matinköp, hygienartiklar",
    minPercentage: 10,
    maxPercentage: 25,
  },
  {
    name: "Transport",
    percentage: 10,
    description: "Kollektivtrafik, bil, bensin",
    minPercentage: 5,
    maxPercentage: 20,
  },
  {
    name: "Sparande",
    percentage: 10,
    description: "Buffert och långsiktigt sparande",
    minPercentage: 5,
    maxPercentage: 30,
  },
  {
    name: "Nöje & Fritid",
    percentage: 5,
    description: "Restaurang, hobby, underhållning",
    minPercentage: 0,
    maxPercentage: 15,
  },
  {
    name: "Kläder & Skor",
    percentage: 5,
    description: "Kläder, skor, accessoarer",
    minPercentage: 0,
    maxPercentage: 10,
  },
  {
    name: "Hälsa & Sjukvård",
    percentage: 5,
    description: "Läkarbesök, medicin, tandvård",
    minPercentage: 3,
    maxPercentage: 15,
  },
  {
    name: "Övrigt",
    percentage: 5,
    description: "Oförutsedda utgifter, presenter, etc.",
    minPercentage: 0,
    maxPercentage: 15,
  },
];