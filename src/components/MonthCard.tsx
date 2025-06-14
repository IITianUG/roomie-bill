
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, TrendingUp, TrendingDown } from 'lucide-react';

interface MonthData {
  id: string;
  month: string;
  year: number;
  youOwe: number;
  othersOweYou: number;
  isSettled: boolean;
  totalExpenses: number;
  participantCount: number;
}

interface MonthCardProps {
  monthData: MonthData;
  onMonthClick: (monthId: string) => void;
  onSettleUp: (monthId: string) => void;
}

export const MonthCard: React.FC<MonthCardProps> = ({
  monthData,
  onMonthClick,
  onSettleUp,
}) => {
  const netBalance = monthData.othersOweYou - monthData.youOwe;
  const isOwed = netBalance > 0;
  const isOwing = netBalance < 0;

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] ${
        monthData.isSettled 
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
          : 'bg-white hover:bg-gray-50 border-gray-200'
      }`}
      onClick={() => onMonthClick(monthData.id)}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {monthData.month} {monthData.year}
              </h3>
              {monthData.isSettled && (
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <Sparkles className="w-3 h-3 mr-1" />
                    All Settled Up!
                  </Badge>
                  <div className="animate-bounce">
                    🎉
                  </div>
                </div>
              )}
            </div>

            {monthData.isSettled ? (
              <div className="space-y-2">
                <p className="text-gray-600">
                  Total expenses: <span className="font-semibold">${monthData.totalExpenses.toFixed(2)}</span>
                </p>
                <p className="text-gray-600">
                  Participants: <span className="font-semibold">{monthData.participantCount} roommates</span>
                </p>
                <p className="text-green-700 font-medium">
                  ✅ Everything is paid and balanced!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-600">You owe:</span>
                  </div>
                  <p className="text-2xl font-bold text-red-600">
                    ${monthData.youOwe.toFixed(2)}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Others owe you:</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    ${monthData.othersOweYou.toFixed(2)}
                  </p>
                </div>
              </div>
            )}

            {!monthData.isSettled && (
              <div className="mt-4 p-3 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Net balance:</span>
                  <span className={`font-bold ${
                    netBalance > 0 ? 'text-green-600' : netBalance < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {netBalance > 0 ? '+' : ''}${netBalance.toFixed(2)}
                    {netBalance > 0 && ' (you are owed)'}
                    {netBalance < 0 && ' (you owe)'}
                    {netBalance === 0 && ' (balanced)'}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-3 ml-6">
            {!monthData.isSettled && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onSettleUp(monthData.id);
                }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Settle Up
              </Button>
            )}
            
            <div className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
              <span className="text-sm">View Details</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
