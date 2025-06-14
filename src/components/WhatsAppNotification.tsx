
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Check, CheckCheck } from 'lucide-react';

interface WhatsAppNotificationProps {
  onClose: () => void;
}

export const WhatsAppNotification: React.FC<WhatsAppNotificationProps> = ({
  onClose,
}) => {
  const [notificationSent, setNotificationSent] = useState(false);
  const [messageStatus, setMessageStatus] = useState<'sending' | 'sent' | 'delivered'>('sending');

  const handleSendNotification = () => {
    setNotificationSent(true);
    setMessageStatus('sending');
    
    // Simulate message sending process
    setTimeout(() => {
      setMessageStatus('sent');
      setTimeout(() => {
        setMessageStatus('delivered');
      }, 1000);
    }, 1500);
  };

  const currentMonth = 'December 2024';
  const totalOwed = 125.50;
  const totalOwedToYou = 89.25;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-green-600" />
            WhatsApp Settlement Reminder
          </DialogTitle>
        </DialogHeader>

        {!notificationSent ? (
          <div className="space-y-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h3 className="font-medium text-green-800 mb-2">
                  Ready to send settlement reminder?
                </h3>
                <p className="text-sm text-green-700">
                  This will send a WhatsApp message to your roommates with the current expense summary for {currentMonth}.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Summary to be sent:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Total you owe: <span className="font-semibold text-red-600">${totalOwed.toFixed(2)}</span></p>
                <p>• Total owed to you: <span className="font-semibold text-green-600">${totalOwedToYou.toFixed(2)}</span></p>
                <p>• Net balance: <span className="font-semibold">${(totalOwedToYou - totalOwed).toFixed(2)}</span></p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSendNotification}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send WhatsApp Message
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* WhatsApp Interface Mockup */}
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">G</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Roommate Expenses Group</h3>
                  <p className="text-xs text-gray-500">Alex, Sam, Jordan</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="bg-green-500 text-white p-3 rounded-lg max-w-xs text-sm">
                    <div className="space-y-1">
                      <p className="font-medium">💰 {currentMonth} Expense Summary</p>
                      <p>Hey everyone! Time to settle up for this month:</p>
                      <div className="mt-2 space-y-1 text-xs">
                        <p>📊 <strong>My Summary:</strong></p>
                        <p>• I owe: ${totalOwed.toFixed(2)}</p>
                        <p>• Owed to me: ${totalOwedToYou.toFixed(2)}</p>
                        <p>• Net: ${(totalOwedToYou - totalOwed).toFixed(2)}</p>
                      </div>
                      <p className="mt-2">Let's settle up! Check the app for details 📱</p>
                    </div>
                    <div className="flex items-center justify-end gap-1 mt-2 text-xs opacity-70">
                      <span>12:34 PM</span>
                      {messageStatus === 'sending' && (
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                      )}
                      {messageStatus === 'sent' && <Check className="w-3 h-3" />}
                      {messageStatus === 'delivered' && <CheckCheck className="w-3 h-3 text-blue-200" />}
                    </div>
                  </div>
                </div>

                {messageStatus === 'delivered' && (
                  <div className="space-y-2">
                    <div className="bg-white p-2 rounded-lg max-w-xs text-sm">
                      <p><strong>Alex:</strong> Thanks! I'll check the app 👍</p>
                      <div className="text-xs text-gray-500 mt-1">12:35 PM</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg max-w-xs text-sm">
                      <p><strong>Sam:</strong> Got it! Let me review my expenses</p>
                      <div className="text-xs text-gray-500 mt-1">12:36 PM</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 py-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">
                {messageStatus === 'sending' && 'Sending message...'}
                {messageStatus === 'sent' && 'Message sent successfully!'}
                {messageStatus === 'delivered' && 'Message delivered to all roommates!'}
              </span>
            </div>

            {messageStatus === 'delivered' && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCheck className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium text-green-800">Notification Sent!</h3>
                  </div>
                  <p className="text-sm text-green-700">
                    Your roommates have been notified about the monthly settlement. They can now check the app and settle their expenses.
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end">
              <Button onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
