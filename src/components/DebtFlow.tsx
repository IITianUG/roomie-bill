
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, DollarSign, Scale } from 'lucide-react';

interface DebtFlowProps {
  debts: { [key: string]: number };
  roommates: string[];
}

export const DebtFlow: React.FC<DebtFlowProps> = ({ debts, roommates }) => {
  // Calculate simplified debt chain
  const simplifyDebts = () => {
    const debtors = Object.entries(debts)
      .filter(([, amount]) => amount < 0)
      .map(([person, amount]) => ({ person, amount: Math.abs(amount) }))
      .sort((a, b) => b.amount - a.amount);
    
    const creditors = Object.entries(debts)
      .filter(([, amount]) => amount > 0)
      .map(([person, amount]) => ({ person, amount }))
      .sort((a, b) => b.amount - a.amount);

    const transactions: { from: string; to: string; amount: number }[] = [];
    
    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
      
      const amount = Math.min(debtor.amount, creditor.amount);
      
      if (amount > 0.01) { // Avoid tiny amounts
        transactions.push({
          from: debtor.person,
          to: creditor.person,
          amount
        });
      }
      
      debtor.amount -= amount;
      creditor.amount -= amount;
      
      if (debtor.amount < 0.01) i++;
      if (creditor.amount < 0.01) j++;
    }
    
    return transactions;
  };

  const transactions = simplifyDebts();
  const totalOwed = Object.values(debts).filter(amount => amount < 0).reduce((sum, amount) => sum + Math.abs(amount), 0);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-blue-600" />
          Debt Flow
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-lg font-semibold text-green-700 mb-2">Everyone's Even!</h3>
            <p className="text-gray-600">No outstanding debts this month</p>
          </div>
        ) : (
          <>
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">Total to be settled:</span>
                <span className="text-xl font-bold text-blue-800">
                  ${totalOwed.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Simplified Payment Flow:</h4>
              {transactions.map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-green-50 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-red-700">
                          {transaction.from.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{transaction.from}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-500">
                      <span className="text-sm">owes</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-green-700">
                          {transaction.to.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{transaction.to}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-bold text-gray-900">
                      {transaction.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800">
                💡 <strong>Tip:</strong> This simplified flow minimizes the number of transactions needed to settle all debts.
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
