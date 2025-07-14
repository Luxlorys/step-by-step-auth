
import React, { useState, useMemo, useCallback } from 'react';
import FileUpload from './FileUpload';
import MembersTable from './MembersTable';
import { mockMembers, Member } from '@/utils/mockData';
import { ParsedMember } from '@/utils/excelParser';

const InvitingMembersTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const membersPerPage = 6;
  
  const { currentMembers, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * membersPerPage;
    const endIndex = startIndex + membersPerPage;
    return {
      currentMembers: members.slice(startIndex, endIndex),
      totalPages: Math.ceil(members.length / membersPerPage)
    };
  }, [currentPage, members]);

  const handleMembersParsed = useCallback((parsedMembers: ParsedMember[]) => {
    const newMembers = parsedMembers.map(parsedMember => ({
      id: `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      email: parsedMember.email,
      tags: parsedMember.tags,
      status: 'Invited' as const,
      joinedDate: ''
    }));
    
    setMembers(prevMembers => {
      const existingEmails = new Set(prevMembers.map(m => m.email));
      const uniqueNewMembers = newMembers.filter(m => !existingEmails.has(m.email));
      return [...uniqueNewMembers, ...prevMembers];
    });
    
    setCurrentPage(1);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Inviting members</h2>
        <p className="text-gray-600 mt-1">Upload a file to invite multiple members at once</p>
      </div>

      <FileUpload onMembersParsed={handleMembersParsed} />
      
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
