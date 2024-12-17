import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import BudgetResults from "@/components/BudgetResults";
import { budgetCategories, BudgetCategory } from "@/data/budgetCategories";

const Index = () => {
  const [income, setIncome] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [categories, setCategories] = useState(budgetCategories);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const incomeNum = Number(income.replace(/[^0-9]/g, ""));
    
    if (!incomeNum || incomeNum <= 0) {
      toast({
        title: "Ogiltig inkomst",
        description: "Vänligen ange en giltig månadsinkomst",
        variant: "destructive",
      });
      return;
    }

    setShowResults(true);
  };

  const handleCategoryUpdate = (updatedCategories: BudgetCategory[]) => {
    setCategories(updatedCategories);
  };

  return (
    <div className="min-h-screen bg-accent p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="p-6 md:p-8 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Budgetplanerare
          </h1>
          <p className="text-gray-600 mb-6">
            Ange din månadsinkomst efter skatt för att få en rekommenderad budgetfördelning. 
            Justera sedan fördelningen efter dina behov med hjälp av reglagen.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <Input
                type="text"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="T.ex. 25000"
                className="text-lg"
                pattern="[0-9]*"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Beräkna
              </Button>
            </div>
          </form>
        </Card>

        {showResults && (
          <BudgetResults
            income={Number(income.replace(/[^0-9]/g, ""))}
            categories={categories}
            onCategoryUpdate={handleCategoryUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default Index;