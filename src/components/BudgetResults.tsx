import React from "react";
import { BudgetCategory } from "@/data/budgetCategories";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

interface BudgetResultsProps {
  income: number;
  categories: BudgetCategory[];
  onCategoryUpdate?: (categories: BudgetCategory[]) => void;
}

const BudgetResults = ({ income, categories: initialCategories, onCategoryUpdate }: BudgetResultsProps) => {
  const { toast } = useToast();
  const [categories, setCategories] = React.useState(initialCategories);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalAllocated = categories.reduce((sum, cat) => sum + cat.percentage, 0);
  const remainingPercentage = 100 - totalAllocated;
  const remainingAmount = (income * remainingPercentage) / 100;

  const handleSliderChange = (categoryName: string, newValue: number[]) => {
    const updatedCategories = categories.map(cat => {
      if (cat.name === categoryName) {
        return { ...cat, percentage: newValue[0] };
      }
      return cat;
    });

    const totalPercentage = updatedCategories.reduce((sum, cat) => sum + cat.percentage, 0);
    
    if (totalPercentage > 100) {
      toast({
        title: "Varning",
        description: "Total fördelning kan inte överstiga 100%",
        variant: "destructive",
      });
      return;
    }

    setCategories(updatedCategories);
    onCategoryUpdate?.(updatedCategories);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <Card className="p-4 bg-primary/5">
        <h3 className="font-semibold text-lg mb-2">Ofördelad Budget</h3>
        <p className="text-2xl font-bold text-primary">
          {formatCurrency(remainingAmount)}
        </p>
        <p className="text-sm text-gray-600">
          {remainingPercentage}% av din inkomst är ännu inte fördelad
        </p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const amount = (income * category.percentage) / 100;
          return (
            <Card key={category.name} className="p-4 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
              <p className="text-2xl font-bold text-primary mb-2">
                {formatCurrency(amount)}
              </p>
              <p className="text-sm text-gray-600 mb-4">{category.description}</p>
              <div className="space-y-2">
                <Slider
                  defaultValue={[category.percentage]}
                  max={category.maxPercentage || 100}
                  min={category.minPercentage || 0}
                  step={1}
                  onValueChange={(value) => handleSliderChange(category.name, value)}
                />
                <p className="text-sm font-semibold text-gray-500">
                  {category.percentage}% av inkomsten
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetResults;