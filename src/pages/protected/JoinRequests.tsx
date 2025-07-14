import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MoreVertical, Check, Pause, RotateCcw, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Mock data
const joinRequests = [
  {
    id: 1,
    companyName: "J.P. Morgan Chase United States",
    networkName: "J.P. Morgan Chase Alumni",
    fullName: "Martin Bosco",
    status: "approved" as const,
    dateTime: "25.03.2025 / 18:36"
  },
  {
    id: 2,
    companyName: "Netflix",
    networkName: "Netflix Alumni",
    fullName: "Martin Bosco",
    status: "declined" as const,
    dateTime: "25.03.2025 / 18:36"
  },
  {
    id: 3,
    companyName: "Reddit",
    networkName: "Reddit Alumni",
    fullName: "Martin Bosco",
    status: "approved" as const,
    dateTime: "25.03.2025 / 18:36"
  },
  {
    id: 4,
    companyName: "Netflix",
    networkName: "Netflix Alumni",
    fullName: "Martin Bosco",
    status: "awaiting" as const,
    dateTime: "25.03.2025 / 18:36"
  },
  {
    id: 5,
    companyName: "Reddit",
    networkName: "Reddit Alumni",
    fullName: "Martin Bosco",
    status: "approved" as const,
    dateTime: "25.03.2025 / 18:36"
  },
  {
    id: 6,
    companyName: "Netflix",
    networkName: "Netflix Alumni",
    fullName: "Martin Bosco",
    status: "awaiting" as const,
    dateTime: "25.03.2025 / 18:36"
  },
  {
    id: 7,
    companyName: "Reddit",
    networkName: "Reddit Alumni",
    fullName: "Martin Bosco",
    status: "approved" as const,
    dateTime: "25.03.2025 / 18:36"
  },
  {
    id: 8,
    companyName: "Netflix",
    networkName: "Netflix Alumni",
    fullName: "Martin Bosco",
    status: "awaiting" as const,
    dateTime: "25.03.2025 / 18:36"
  },
  {
    id: 9,
    companyName: "Reddit",
    networkName: "Reddit Alumni",
    fullName: "Martin Bosco",
    status: "approved" as const,
    dateTime: "25.03.2025 / 18:36"
  },
  {
    id: 10,
    companyName: "Netflix",
    networkName: "Netflix Alumni",
    fullName: "Martin Bosco",
    status: "awaiting" as const,
    dateTime: "25.03.2025 / 18:36"
  }
];

const getStatusBadgeStyles = (status: "approved" | "declined" | "awaiting") => {
  switch (status) {
    case "approved":
      return "bg-[#ECFDF5] border-[#057A55] text-[#057A55] hover:bg-[#ECFDF5]";
    case "declined":
      return "bg-[#FDE3E3] border-[#F05252] text-[#F05252] hover:bg-[#FDE3E3]";
    case "awaiting":
      return "bg-[#FFF8F1] border-[#FF8A4C] text-[#FF8A4C] hover:bg-[#FFF8F1]";
  }
};

const getStatusText = (status: "approved" | "declined" | "awaiting") => {
  switch (status) {
    case "approved":
      return "Approved";
    case "declined":
      return "Declined";
    case "awaiting":
      return "Awaiting approval";
  }
};

const truncateText = (text: string, maxLength: number = 25) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const JoinRequests = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredRequests = joinRequests.filter(request =>
    request.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.networkName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, endIndex);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Join Requests</h1>
        </div>
        
        <div className="bg-white rounded-lg border border-[#E5E6E8] p-6">
          {/* Header with search and filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Table */}
          <div className="border border-[#E5E6E8] rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#FCFCFC]">
                  <TableHead className="font-medium text-gray-700">Company name</TableHead>
                  <TableHead className="font-medium text-gray-700">Network name</TableHead>
                  <TableHead className="font-medium text-gray-700">Full name</TableHead>
                  <TableHead className="font-medium text-gray-700">Status</TableHead>
                  <TableHead className="font-medium text-gray-700">Date & Time</TableHead>
                  <TableHead className="font-medium text-gray-700">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentRequests.map((request) => (
                  <TableRow 
                    key={request.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/dashboard/company-details/${request.id}`)}
                  >
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help">
                            {truncateText(request.companyName)}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{request.companyName}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help">
                            {truncateText(request.networkName)}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{request.networkName}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help">
                            {truncateText(request.fullName)}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{request.fullName}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={getStatusBadgeStyles(request.status)}
                      >
                        {getStatusText(request.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {request.dateTime}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Pause className="h-4 w-4 text-orange-600" />
                            Suspend
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <RotateCcw className="h-4 w-4 text-blue-600" />
                            Restore
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Trash2 className="h-4 w-4 text-red-600" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  {totalPages > 5 && (
                    <>
                      <PaginationItem>
                        <span className="flex h-9 w-9 items-center justify-center">...</span>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(totalPages);
                          }}
                          isActive={currentPage === totalPages}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
            
            <div className="text-sm text-gray-600">
              Showing {Math.min(itemsPerPage, filteredRequests.length)} of {filteredRequests.length}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default JoinRequests;