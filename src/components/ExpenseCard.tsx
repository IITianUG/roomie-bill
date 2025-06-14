
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2 } from 'lucide-react';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: 'food' | 'rent' | 'utilities' | 'entertainment' | 'other';
  paidBy: string;
  participants: string[];
  splits: { [key: string]: number };
  date: string;
}

interface ExpenseCardProps {
  expense: Expense;
  isSettled: boolean;
  onEdit: (expense: Expense) => void;
  onDelete: (expenseId: string) => void;
}

const categoryIcons = {
  food: '🍕',
  rent: '🏠',
  utilities: '💡',
  entertainment: '🍿',
  other: '💰'
};

const categoryColors = {
  food: 'bg-orange-100 text-orange-800 border-orange-200',
  rent: 'bg-blue-100 text-blue-800 border-blue-200',
  utilities: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  entertainment: 'bg-purple-100 text-purple-800 border-purple-200',
  other: 'bg-gray-100 text-gray-800 border-gray-200'
};

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  expense,
  isSettled,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="text-2xl">
              {categoryIcons[expense.category]}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 mb-2">
                <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                  {expense.description}
                </h3>
                <Badge className={`${categoryColors[expense.category]} text-xs`}>
                  {expense.category}
                </Badge>
              </div>
              
              <div className="text-lg font-bold text-gray-900 mb-2">
                ${expense.amount.toFixed(2)}
              </div>
              
              <div className="flex flex-col gap-1 text-xs text-gray-600">
                <span>Paid by: <strong>{expense.paidBy}</strong></span>
                <span>{formatDate(expense.date)} • {expense.participants.length} participants</span>
              </div>
            </div>
          </div>

          {!isSettled && (
            <div className="flex gap-1 ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(expense)}
                className="p-1 h-8 w-8 hover:bg-blue-50"
              >
                <Edit2 className="w-3 h-3 text-blue-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(expense.id)}
                className="p-1 h-8 w-8 hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3 text-red-600" />
              </Button>
            </div>
          )}
        </div>

        {/* Splits */}
        <div className="border-t pt-3">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Split breakdown:</h4>
          <div className="grid grid-cols-1 gap-1">
            {Object.entries(expense.splits).map(([person, amount]) => (
              <div
                key={person}
                className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs"
              >
                <span className="text-gray-700">{person}</span>
                <span className="font-semibold text-gray-900">
                  ${amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
