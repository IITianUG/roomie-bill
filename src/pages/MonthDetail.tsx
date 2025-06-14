
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';
import { ExpenseCard } from '@/components/ExpenseCard';
import { AddExpenseModal } from '@/components/AddExpenseModal';
import { DebtFlow } from '@/components/DebtFlow';

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

const MonthDetail = () => {
  const { monthId } = useParams();
  const navigate = useNavigate();
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Mock data
  const monthData = {
    id: monthId,
    month: 'December',
    year: 2024,
    isSettled: monthId === '2024-11' || monthId === '2024-10'
  };

  const expenses: Expense[] = [
    {
      id: '1',
      description: 'Grocery shopping at Whole Foods',
      amount: 156.75,
      category: 'food',
      paidBy: 'You',
      participants: ['You', 'Alex', 'Sam'],
      splits: { 'You': 52.25, 'Alex': 52.25, 'Sam': 52.25 },
      date: '2024-12-15'
    },
    {
      id: '2',
      description: 'Electricity bill',
      amount: 89.50,
      category: 'utilities',
      paidBy: 'Alex',
      participants: ['You', 'Alex', 'Sam'],
      splits: { 'You': 29.83, 'Alex': 29.83, 'Sam': 29.84 },
      date: '2024-12-10'
    },
    {
      id: '3',
      description: 'Movie night snacks and drinks',
      amount: 45.20,
      category: 'entertainment',
      paidBy: 'Sam',
      participants: ['You', 'Alex', 'Sam'],
      splits: { 'You': 15.07, 'Alex': 15.07, 'Sam': 15.06 },
      date: '2024-12-08'
    }
  ];

  const roommates = ['You', 'Alex', 'Sam'];

  const calculateDebts = () => {
    const balances: { [key: string]: number } = {};
    
    roommates.forEach(person => {
      balances[person] = 0;
    });

    expenses.forEach(expense => {
      // Add what person paid
      balances[expense.paidBy] += expense.amount;
      
      // Subtract what each person owes
      Object.entries(expense.splits).forEach(([person, amount]) => {
        balances[person] -= amount;
      });
    });

    return balances;
  };

  const debts = calculateDebts();

  const handleDeleteExpense = (expenseId: string) => {
    console.log('Deleting expense:', expenseId);
    // Delete logic would go here
  };

  if (monthData.isSettled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {monthData.month} {monthData.year}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  ✅ All Settled Up!
                </Badge>
                <span className="animate-bounce">🎉</span>
              </div>
            </div>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
            <CardContent className="p-6">
              <p className="text-lg text-gray-700 text-center">
                This month has been fully settled! All expenses have been paid and balanced.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
            {expenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                isSettled={true}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {monthData.month} {monthData.year}
              </h1>
              <p className="text-gray-600">Manage expenses for this month</p>
            </div>
          </div>
          
          <Button
            onClick={() => setShowAddExpense(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Expense
          </Button>
        </div>

        {/* Debt Flow */}
        <DebtFlow debts={debts} roommates={roommates} />

        {/* Expenses List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Expenses</h2>
          
          {expenses.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses yet</h3>
                <p className="text-gray-600 mb-4">Start by adding your first expense for this month</p>
                <Button
                  onClick={() => setShowAddExpense(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  Add First Expense
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {expenses.map((expense) => (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  isSettled={false}
                  onEdit={(expense) => setEditingExpense(expense)}
                  onDelete={handleDeleteExpense}
                />
              ))}
            </div>
          )}
        </div>

        {/* Settle Up Button */}
        {expenses.length > 0 && (
          <div className="mt-8 text-center">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
              Settle Up This Month
            </Button>
          </div>
        )}
      </div>

      {/* Add/Edit Expense Modal */}
      {(showAddExpense || editingExpense) && (
        <AddExpenseModal
          expense={editingExpense}
          roommates={roommates}
          onClose={() => {
            setShowAddExpense(false);
            setEditingExpense(null);
          }}
          onSave={(expense) => {
            console.log('Saving expense:', expense);
            setShowAddExpense(false);
            setEditingExpense(null);
          }}
        />
      )}
    </div>
  );
};

export default MonthDetail;
