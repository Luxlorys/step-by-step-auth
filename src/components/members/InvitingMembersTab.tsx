
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import FileUpload from './FileUpload';
import MembersTable from './MembersTable';
import { mockMembers } from '@/utils/mockData';

const InvitingMembersTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 6;
  
  const { currentMembers, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * membersPerPage;
    const endIndex = startIndex + membersPerPage;
    return {
      currentMembers: mockMembers.slice(startIndex, endIndex),
      totalPages: Math.ceil(mockMembers.length / membersPerPage)
    };
  }, [currentPage]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Inviting members</h2>
          <p className="text-gray-600 mt-1">Upload a file to invite multiple members at once</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download Template</span>
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800">
            Save
          </Button>
        </div>
      </div>

      <FileUpload />
      
      <MembersTable
        members={currentMembers}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default InvitingMembersTab;
