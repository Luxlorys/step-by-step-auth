import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InvitingMembersTab from '@/components/members/InvitingMembersTab';
import MembershipRequestsTab from '@/components/members/MembershipRequestsTab';
import AllMembersTab from '@/components/members/AllMembersTab';
import { useNavigate } from 'react-router-dom';

const Members = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inviting');

  return (
    <div className="bg-white">
      <Tabs defaultValue="inviting" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-6">
          <TabsList className="grid grid-cols-3 max-w-2xl gap-4">
            <TabsTrigger value="inviting" className="text-sm px-6">
              Inviting members
            </TabsTrigger>
            <TabsTrigger value="requests" className="text-sm px-6">
              Membership requests
            </TabsTrigger>
            <TabsTrigger value="all" className="text-sm px-6">
              All members
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-3">
            {activeTab === 'requests' ? (
              <Button variant="outline" className="flex items-center space-x-2" onClick={() => navigate('/dashboard/create-form')}>
                <span>Set questions</span>
              </Button>
            ) : (
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download template</span>
              </Button>
            )}
            <Button className="bg-black text-white hover:bg-gray-800">
              Save
            </Button>
          </div>
        </div>
        
        <div>
          <TabsContent value="inviting" className="mt-0">
            <InvitingMembersTab />
          </TabsContent>
          
          <TabsContent value="requests" className="mt-0">
            <MembershipRequestsTab />
          </TabsContent>
          
          <TabsContent value="all" className="mt-0">
            <AllMembersTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Members;