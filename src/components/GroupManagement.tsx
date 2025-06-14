
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Users } from 'lucide-react';

interface GroupManagementProps {
  currentMembers: string[];
  onClose: () => void;
}

export const GroupManagement: React.FC<GroupManagementProps> = ({
  currentMembers,
  onClose,
}) => {
  const [members, setMembers] = useState(currentMembers);
  const [newMemberName, setNewMemberName] = useState('');

  const handleAddMember = () => {
    if (newMemberName.trim() && !members.includes(newMemberName.trim())) {
      setMembers([...members, newMemberName.trim()]);
      setNewMemberName('');
    }
  };

  const handleRemoveMember = (memberToRemove: string) => {
    if (memberToRemove !== 'You' && members.length > 2) {
      setMembers(members.filter(member => member !== memberToRemove));
    }
  };

  const handleSave = () => {
    console.log('Saving group members:', members);
    // Save logic would go here
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Group Management
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Members */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium text-gray-900 mb-3">Current Members</h3>
              <div className="space-y-2">
                {members.map((member) => (
                  <div
                    key={member}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-700">
                          {member.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{member}</span>
                      {member === 'You' && (
                        <Badge variant="secondary" className="text-xs">
                          You
                        </Badge>
                      )}
                    </div>
                    
                    {member !== 'You' && members.length > 2 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMember(member)}
                        className="p-1 hover:bg-red-50 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add New Member */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium text-gray-900 mb-3">Add New Member</h3>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="newMember" className="sr-only">
                    New member name
                  </Label>
                  <Input
                    id="newMember"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Enter roommate's name"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddMember()}
                  />
                </div>
                <Button
                  onClick={handleAddMember}
                  disabled={!newMemberName.trim() || members.includes(newMemberName.trim())}
                  className="px-3"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {newMemberName.trim() && members.includes(newMemberName.trim()) && (
                <p className="text-sm text-red-600 mt-2">
                  This member already exists
                </p>
              )}
            </CardContent>
          </Card>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> Removing members will not affect past expenses, but they won't appear in future expense splits.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
