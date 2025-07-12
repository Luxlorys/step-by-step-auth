
import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MembersTable from './MembersTable';
import { mockMembers } from '@/utils/mockData';

const AllMembersTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const membersPerPage = 6;

  const filteredMembers = useMemo(() => {
    return mockMembers.filter(member => {
      const matchesSearch = member.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const { currentMembers, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * membersPerPage;
    const endIndex = startIndex + membersPerPage;
    return {
      currentMembers: filteredMembers.slice(startIndex, endIndex),
      totalPages: Math.ceil(filteredMembers.length / membersPerPage)
    };
  }, [filteredMembers, currentPage]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">All members</h2>
        <p className="text-gray-600 mt-1">Overview of all members in your network</p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            All Members <span className="text-gray-500">({filteredMembers.length} ppl)</span>
          </h3>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tags" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Joined">Joined</SelectItem>
              <SelectItem value="Invited">Invited</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <MembersTable
        members={currentMembers}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AllMembersTab;
