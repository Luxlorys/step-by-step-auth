
import React, { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import RequestsTable from './RequestsTable';
import { mockRequests } from '@/utils/membershipRequestsData';

const MembershipRequestsTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const requestsPerPage = 6;

  const filteredRequests = useMemo(() => {
    return mockRequests.filter(request => {
      const matchesSearch = request.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const { currentRequests, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * requestsPerPage;
    const endIndex = startIndex + requestsPerPage;
    return {
      currentRequests: filteredRequests.slice(startIndex, endIndex),
      totalPages: Math.ceil(filteredRequests.length / requestsPerPage)
    };
  }, [filteredRequests, currentPage]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Membership requests</h2>
        <p className="text-gray-600 mt-1">Review and manage pending membership requests</p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            Requests List <span className="text-gray-500">({filteredRequests.length} ppl)</span>
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
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Awaiting approval">Awaiting approval</SelectItem>
              <SelectItem value="Declined">Declined</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <RequestsTable
        requests={currentRequests}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default MembershipRequestsTab;
