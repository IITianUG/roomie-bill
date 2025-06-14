import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Scale } from 'lucide-react';

interface DebtFlowProps {
  debts: { [key: string]: number };
  roommates: string[];
}

export const DebtFlow: React.FC<DebtFlowProps> = ({ debts, roommates }) => {
  const youOwe = Object.entries(debts)
    .filter(([person, amount]) => person !== 'You' && amount < 0)
    .map(([person, amount]) => ({ person, amount: Math.abs(amount) }));
  
  const othersOweYou = Object.entries(debts)
    .filter(([person, amount]) => person !== 'You' && amount > 0)
    .map(([person, amount]) => ({ person, amount }));

  const yourBalance = debts['You'] || 0;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Scale className="w-4 h-4 text-blue-600" />
          Balance Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {yourBalance === 0 ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-sm font-medium text-green-700">You're all even!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* You owe others */}
            {youOwe.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-red-700 mb-2">You owe:</h4>
                <div className="space-y-1">
                  {youOwe.map(({ person, amount }) => (
                    <div key={person} className="flex items-center justify-between p-2 bg-red-50 rounded text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-red-700">
                            {person.charAt(0)}
                          </span>
                        </div>
                        <span className="text-red-800 font-medium">{person}</span>
                      </div>
                      <span className="font-bold text-red-700">${amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Others owe you */}
            {othersOweYou.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-green-700 mb-2">Others owe you:</h4>
                <div className="space-y-1">
                  {othersOweYou.map(({ person, amount }) => (
                    <div key={person} className="flex items-center justify-between p-2 bg-green-50 rounded text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-green-700">
                            {person.charAt(0)}
                          </span>
                        </div>
                        <span className="text-green-800 font-medium">{person}</span>
                      </div>
                      <span className="font-bold text-green-700">${amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
