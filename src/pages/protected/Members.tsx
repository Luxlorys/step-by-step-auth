
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InvitingMembersTab from '@/components/members/InvitingMembersTab';
import MembershipRequestsTab from '@/components/members/MembershipRequestsTab';
import AllMembersTab from '@/components/members/AllMembersTab';

const Members = () => {
  return (
    <div className="bg-white">
      <Tabs defaultValue="inviting" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="inviting" className="text-sm">
            Inviting members
          </TabsTrigger>
          <TabsTrigger value="requests" className="text-sm">
            Membership requests
          </TabsTrigger>
          <TabsTrigger value="all" className="text-sm">
            All members
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
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
