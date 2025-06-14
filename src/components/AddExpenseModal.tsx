import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

interface AddExpenseModalProps {
  expense?: Expense | null;
  roommates: string[];
  onClose: () => void;
  onSave: (expense: Expense) => void;
}

const categoryIcons = {
  food: '🍕',
  rent: '🏠',
  utilities: '💡',
  entertainment: '🍿',
  other: '💰'
};

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  expense,
  roommates,
  onClose,
  onSave,
}) => {
  const [description, setDescription] = useState(expense?.description || '');
  const [amount, setAmount] = useState(expense?.amount?.toString() || '');
  const [category, setCategory] = useState<'food' | 'rent' | 'utilities' | 'entertainment' | 'other'>(expense?.category || 'food');
  const [paidBy, setPaidBy] = useState(expense?.paidBy || roommates[0]);
  const [participants, setParticipants] = useState<string[]>(expense?.participants || roommates);
  const [splitType, setSplitType] = useState<'equal' | 'custom'>('equal');
  const [customSplits, setCustomSplits] = useState<{ [key: string]: string }>(
    expense?.splits ? Object.fromEntries(Object.entries(expense.splits).map(([k, v]) => [k, v.toString()])) : {}
  );

  useEffect(() => {
    if (splitType === 'equal' && participants.length > 0) {
      const amountNum = parseFloat(amount) || 0;
      const splitAmount = amountNum / participants.length;
      const newSplits: { [key: string]: string } = {};
      participants.forEach(person => {
        newSplits[person] = splitAmount.toFixed(2);
      });
      setCustomSplits(newSplits);
    }
  }, [splitType, participants, amount]);

  const handleParticipantToggle = (person: string) => {
    setParticipants(prev =>
      prev.includes(person)
        ? prev.filter(p => p !== person)
        : [...prev, person]
    );
  };

  const handleCustomSplitChange = (person: string, value: string) => {
    setCustomSplits(prev => ({
      ...prev,
      [person]: value
    }));
  };

  const getTotalSplit = () => {
    return Object.values(customSplits).reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
  };

  const handleSave = () => {
    const splits: { [key: string]: number } = {};
    participants.forEach(person => {
      splits[person] = parseFloat(customSplits[person]) || 0;
    });

    const newExpense: Expense = {
      id: expense?.id || Math.random().toString(36).substr(2, 9),
      description,
      amount: parseFloat(amount),
      category: category as any,
      paidBy,
      participants,
      splits,
      date: expense?.date || new Date().toISOString().split('T')[0]
    };

    onSave(newExpense);
  };

  const isValid = description && amount && participants.length > 0 && Math.abs(getTotalSplit() - parseFloat(amount)) < 0.01;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {expense ? 'Edit Expense' : 'Add New Expense'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Basic Information */}
          <Card>
            <CardContent className="p-3 space-y-3">
              <div>
                <Label htmlFor="description" className="text-sm">Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Grocery shopping"
                  className="mt-1"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="amount" className="text-sm">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-sm">Category</Label>
                  <Select value={category} onValueChange={(value) => setCategory(value as typeof category)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categoryIcons).map(([key, icon]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <span>{icon}</span>
                            <span className="capitalize">{key}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="paidBy" className="text-sm">Paid by</Label>
                <Select value={paidBy} onValueChange={setPaidBy}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roommates.map(person => (
                      <SelectItem key={person} value={person}>
                        {person}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Participants */}
          <Card>
            <CardContent className="p-3">
              <Label className="text-sm font-medium">Who should split this expense?</Label>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {roommates.map(person => (
                  <div key={person} className="flex items-center space-x-2">
                    <Checkbox
                      id={person}
                      checked={participants.includes(person)}
                      onCheckedChange={() => handleParticipantToggle(person)}
                    />
                    <Label htmlFor={person} className="text-sm">{person}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Split Configuration */}
          <Card>
            <CardContent className="p-3">
              <Tabs value={splitType} onValueChange={(value) => setSplitType(value as 'equal' | 'custom')}>
                <TabsList className="grid w-full grid-cols-2 text-xs">
                  <TabsTrigger value="equal">Equal Split</TabsTrigger>
                  <TabsTrigger value="custom">Custom Split</TabsTrigger>
                </TabsList>

                <TabsContent value="equal" className="mt-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700 mb-1">
                      Split equally among {participants.length} participant(s)
                    </p>
                    {participants.length > 0 && amount && (
                      <p className="text-sm font-semibold text-blue-800">
                        ${(parseFloat(amount) / participants.length).toFixed(2)} per person
                      </p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="custom" className="mt-3">
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600">
                      Set custom amounts for each participant:
                    </p>
                    {participants.map(person => (
                      <div key={person} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <Label htmlFor={`split-${person}`} className="text-sm">{person}</Label>
                        <div className="flex items-center gap-1">
                          <span className="text-sm">$</span>
                          <Input
                            id={`split-${person}`}
                            type="number"
                            step="0.01"
                            value={customSplits[person] || ''}
                            onChange={(e) => handleCustomSplitChange(person, e.target.value)}
                            className="w-16 h-8 text-sm"
                          />
                        </div>
                      </div>
                    ))}
                    
                    <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-yellow-800">Total splits:</span>
                        <span className={`text-sm font-semibold ${
                          Math.abs(getTotalSplit() - parseFloat(amount || '0')) < 0.01 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          ${getTotalSplit().toFixed(2)} / ${amount || '0.00'}
                        </span>
                      </div>
                      {Math.abs(getTotalSplit() - parseFloat(amount || '0')) >= 0.01 && (
                        <p className="text-xs text-red-600 mt-1">
                          Splits must add up to the total amount
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-2 pt-3 border-t">
          <Button 
            onClick={handleSave} 
            disabled={!isValid}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {expense ? 'Update Expense' : 'Add Expense'}
          </Button>
          <Button variant="outline" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
