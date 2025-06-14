
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

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
        monthData.isSettled 
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
          : 'bg-white hover:bg-gray-50 border-gray-200'
      }`}
      onClick={() => onMonthClick(monthData.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900">
              {monthData.month} {monthData.year}
            </h3>
            {monthData.isSettled && (
              <div className="flex items-center gap-1">
                <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                  <Sparkles className="w-2 h-2 mr-1" />
                  Settled
                </Badge>
                <span className="text-sm">🎉</span>
              </div>
            )}
          </div>
          
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </div>

        {monthData.isSettled ? (
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              Total: <span className="font-semibold">${monthData.totalExpenses.toFixed(2)}</span>
            </p>
            <p className="text-xs text-green-700 font-medium">
              ✅ Everything is balanced!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <TrendingDown className="w-3 h-3 text-red-500" />
                  <span className="text-xs text-gray-600">You owe:</span>
                </div>
                <p className="text-lg font-bold text-red-600">
                  ${monthData.youOwe.toFixed(2)}
                </p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-gray-600">Others owe you:</span>
                </div>
                <p className="text-lg font-bold text-green-600">
                  ${monthData.othersOweYou.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-gray-50">
              <span className="text-xs text-gray-600">Net balance:</span>
              <span className={`text-sm font-bold ${
                netBalance > 0 ? 'text-green-600' : netBalance < 0 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {netBalance > 0 ? '+' : ''}${netBalance.toFixed(2)}
              </span>
            </div>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                onSettleUp(monthData.id);
              }}
              size="sm"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full"
            >
              Settle Up
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
