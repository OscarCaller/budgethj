export type BudgetCategory = {
  name: string;
  percentage: number;
  description: string;
};

export const budgetCategories: BudgetCategory[] = [
  {
    name: "Boende",
    percentage: 30,
    description: "Hyra/lån, el, värme, försäkring, etc.",
  },
  {
    name: "Mat & Dagligvaror",
    percentage: 15,
    description: "Matinköp, hygienartiklar",
  },
  {
    name: "Transport",
    percentage: 10,
    description: "Kollektivtrafik, bil, bensin",
  },
  {
    name: "Sparande",
    percentage: 10,
    description: "Buffert och långsiktigt sparande",
  },
  {
    name: "Nöje & Fritid",
    percentage: 10,
    description: "Restaurang, hobby, underhållning",
  },
  {
    name: "Kläder & Skor",
    percentage: 5,
    description: "Kläder, skor, accessoarer",
  },
  {
    name: "Hälsa & Sjukvård",
    percentage: 5,
    description: "Läkarbesök, medicin, tandvård",
  },
  {
    name: "Övrigt",
    percentage: 15,
    description: "Oförutsedda utgifter, presenter, etc.",
  },
];