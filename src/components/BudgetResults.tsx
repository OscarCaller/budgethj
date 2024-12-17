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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-fadeIn">
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
  );
};

export default BudgetResults;