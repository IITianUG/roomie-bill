
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Users, ChevronDown, ChevronUp, Settings, MessageCircle } from 'lucide-react';
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
  const [showPreviousMonths, setShowPreviousMonths] = useState(false);

  // Mock data for demonstration
  const recentMonthsData: MonthData[] = [{
    id: '2024-12',
    month: 'December',
    year: 2024,
    youOwe: 125.50,
    othersOweYou: 89.25,
    isSettled: false,
    totalExpenses: 450.75,
    participantCount: 3
  }, {
    id: '2024-11',
    month: 'November',
    year: 2024,
    youOwe: 0,
    othersOweYou: 0,
    isSettled: true,
    totalExpenses: 523.40,
    participantCount: 3
  }, {
    id: '2024-10',
    month: 'October',
    year: 2024,
    youOwe: 0,
    othersOweYou: 0,
    isSettled: true,
    totalExpenses: 398.20,
    participantCount: 3
  }];

  const previousMonthsData: MonthData[] = [{
    id: '2024-09',
    month: 'September',
    year: 2024,
    youOwe: 0,
    othersOweYou: 0,
    isSettled: true,
    totalExpenses: 287.15,
    participantCount: 3
  }, {
    id: '2024-08',
    month: 'August',
    year: 2024,
    youOwe: 0,
    othersOweYou: 0,
    isSettled: true,
    totalExpenses: 412.80,
    participantCount: 3
  }, {
    id: '2024-07',
    month: 'July',
    year: 2024,
    youOwe: 0,
    othersOweYou: 0,
    isSettled: true,
    totalExpenses: 365.45,
    participantCount: 3
  }];

  const handleMonthClick = (monthId: string) => {
    navigate(`/month/${monthId}`);
  };
  
  const handleSettleUp = (monthId: string) => {
    console.log(`Settling up for month: ${monthId}`);
    // Settlement logic would go here
  };
  
  const currentRoommates = ['You', 'Alex', 'Sam', 'Jordan'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">RoomMates</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowNotification(true)} 
              className="flex items-center gap-1 text-xs px-2 py-1"
            >
              <MessageCircle className="w-3 h-3" />
              Notify
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowGroupManagement(true)} 
              className="flex items-center gap-1 text-xs px-2 py-1"
            >
              <Users className="w-3 h-3" />
              Group
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Total You Owe</p>
                  <p className="text-lg font-bold text-red-600">
                    ${recentMonthsData.reduce((sum, month) => sum + month.youOwe, 0).toFixed(2)}
                  </p>
                </div>
                <div className="text-red-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Others Owe You</p>
                    <p className="text-lg font-bold text-green-600">
                      ${recentMonthsData.reduce((sum, month) => sum + month.othersOweYou, 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-green-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Roommates</p>
                    <p className="text-lg font-bold text-blue-600">{currentRoommates.length}</p>
                  </div>
                  <div className="text-blue-500">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Monthly Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Months</h2>
          {recentMonthsData.map(month => (
            <MonthCard 
              key={month.id} 
              monthData={month} 
              onMonthClick={handleMonthClick} 
              onSettleUp={handleSettleUp} 
            />
          ))}
        </div>

        {/* Previous Months Toggle */}
        <div className="mt-6">
          <Button 
            onClick={() => setShowPreviousMonths(!showPreviousMonths)}
            variant="outline"
            className="w-full bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-gray-50 text-gray-700"
          >
            {showPreviousMonths ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Hide Previous Months
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                View Previous Months
              </>
            )}
          </Button>
        </div>

        {/* Previous Months Cards */}
        {showPreviousMonths && (
          <div className="space-y-4 mt-4">
            <h3 className="text-lg font-medium text-gray-800">Previous Months</h3>
            {previousMonthsData.map(month => (
              <MonthCard 
                key={month.id} 
                monthData={month} 
                onMonthClick={handleMonthClick} 
                onSettleUp={handleSettleUp} 
              />
            ))}
          </div>
        )}
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
