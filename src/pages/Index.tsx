
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Settings, MessageCircle } from 'lucide-react';
import { MonthCard } from '@/components/MonthCard';
import { GroupManagement } from '@/components/GroupManagement';
import { WhatsAppNotification } from '@/components/WhatsAppNotification';

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

const Index = () => {
  const navigate = useNavigate();
  const [showGroupManagement, setShowGroupManagement] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  
  // Mock data for demonstration
  const monthsData: MonthData[] = [
    {
      id: '2024-12',
      month: 'December',
      year: 2024,
      youOwe: 125.50,
      othersOweYou: 89.25,
      isSettled: false,
      totalExpenses: 450.75,
      participantCount: 3
    },
    {
      id: '2024-11',
      month: 'November',
      year: 2024,
      youOwe: 0,
      othersOweYou: 0,
      isSettled: true,
      totalExpenses: 523.40,
      participantCount: 3
    },
    {
      id: '2024-10',
      month: 'October',
      year: 2024,
      youOwe: 0,
      othersOweYou: 0,
      isSettled: true,
      totalExpenses: 398.20,
      participantCount: 3
    }
  ];

  const handleMonthClick = (monthId: string) => {
    navigate(`/month/${monthId}`);
  };

  const handleSettleUp = (monthId: string) => {
    console.log(`Settling up for month: ${monthId}`);
    // Settlement logic would go here
  };

  const currentRoommates = ['You', 'Alex', 'Sam', 'Jordan'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Roommate Expenses
            </h1>
            <p className="text-sm text-gray-600">Track and split expenses with your roommates</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNotification(true)}
              className="p-2"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowGroupManagement(true)}
              className="p-2"
            >
              <Users className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-3">
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">You Owe</p>
                <p className="text-lg font-bold text-red-600">
                  ${monthsData.reduce((sum, month) => sum + month.youOwe, 0).toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-3">
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Others Owe You</p>
                <p className="text-lg font-bold text-green-600">
                  ${monthsData.reduce((sum, month) => sum + month.othersOweYou, 0).toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Cards */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Monthly Expenses</h2>
          {monthsData.map((month) => (
            <MonthCard
              key={month.id}
              monthData={month}
              onMonthClick={handleMonthClick}
              onSettleUp={handleSettleUp}
            />
          ))}
        </div>

        {/* Add New Month Button */}
        <div className="mt-6 text-center">
          <Button
            onClick={() => navigate('/month/new')}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Month
          </Button>
        </div>
      </div>

      {/* Group Management Modal */}
      {showGroupManagement && (
        <GroupManagement
          currentMembers={currentRoommates}
          onClose={() => setShowGroupManagement(false)}
        />
      )}

      {/* WhatsApp Notification Modal */}
      {showNotification && (
        <WhatsAppNotification
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default Index;
