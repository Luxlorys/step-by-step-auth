
import React from 'react';
import { MoreHorizontal, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { MembershipRequest } from '@/utils/membershipRequestsData';

interface RequestsTableProps {
  requests: MembershipRequest[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getStatusBadge = (status: MembershipRequest['status']) => {
  switch (status) {
    case 'Approved':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Approved
        </Badge>
      );
    case 'Awaiting approval':
      return (
        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
          Awaiting approval
        </Badge>
      );
    case 'Declined':
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          Declined
        </Badge>
      );
    default:
      return null;
  }
};

const RequestsTable: React.FC<RequestsTableProps> = ({
  requests,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Full name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead className="font-semibold">Joined Date</TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.fullName}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell className="text-gray-600">{request.joinedDate}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <Pagination className="justify-start">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) onPageChange(currentPage - 1);
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(pageNum);
                    }}
                    isActive={currentPage === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <PaginationItem>
                <span className="px-4 py-2">...</span>
              </PaginationItem>
            )}
            
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) onPageChange(currentPage + 1);
                }}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Showing</span>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option value="6">6</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default RequestsTable;
