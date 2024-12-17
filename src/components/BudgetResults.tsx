import { BudgetCategory } from "@/data/budgetCategories";
import { Card } from "@/components/ui/card";

interface BudgetResultsProps {
  income: number;
  categories: BudgetCategory[];
}

const BudgetResults = ({ income, categories }: BudgetResultsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-fadeIn">
      {categories.map((category) => {
        const amount = (income * category.percentage) / 100;
        return (
          <Card key={category.name} className="p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
            <p className="text-2xl font-bold text-primary-foreground mb-2">
              {formatCurrency(amount)}
            </p>
            <p className="text-sm text-gray-600">{category.description}</p>
            <p className="text-sm font-semibold mt-2 text-gray-500">
              {category.percentage}% av inkomsten
            </p>
          </Card>
        );
      })}
    </div>
  );
};

export default BudgetResults;