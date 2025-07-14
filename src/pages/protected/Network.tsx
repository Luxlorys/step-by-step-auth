import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for admins
const mockAdmins = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  firstName: "James",
  lastName: "Wallace",
  status: i % 3 === 0 ? "invited" : "joined",
  createMeetup: Math.random() > 0.5,
  createNotification: Math.random() > 0.5,
  addMembers: Math.random() > 0.5,
  requestToJoin: Math.random() > 0.5,
  removeMembers: Math.random() > 0.5,
  addModerators: Math.random() > 0.5,
  removeModerators: Math.random() > 0.5,
  addAdmin: Math.random() > 0.5,
  removeAdmin: Math.random() > 0.5,
  removeNetwork: Math.random() > 0.5,
  actionsRequireApproval: Math.random() > 0.5,
}));

// Mock data for moderators
const mockModerators = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  firstName: "James",
  lastName: "Wallace",
  status: i % 3 === 0 ? "invited" : "joined",
  createMeetup: Math.random() > 0.5,
  createNotification: Math.random() > 0.5,
  addMembers: Math.random() > 0.5,
  requestToJoin: Math.random() > 0.5,
  removeMembers: Math.random() > 0.5,
  addModerators: Math.random() > 0.5,
  removeModerators: Math.random() > 0.5,
  addAdmin: Math.random() > 0.5,
  removeAdmin: Math.random() > 0.5,
  removeNetwork: Math.random() > 0.5,
  actionsRequireApproval: Math.random() > 0.5,
}));

const ITEMS_PER_PAGE = 10;

const Network = () => {
  const [adminPage, setAdminPage] = useState(1);
  const [moderatorPage, setModeratorPage] = useState(1);

  const adminStartIndex = (adminPage - 1) * ITEMS_PER_PAGE;
  const adminEndIndex = adminStartIndex + ITEMS_PER_PAGE;
  const currentAdmins = mockAdmins.slice(adminStartIndex, adminEndIndex);
  const totalAdminPages = Math.ceil(mockAdmins.length / ITEMS_PER_PAGE);

  const moderatorStartIndex = (moderatorPage - 1) * ITEMS_PER_PAGE;
  const moderatorEndIndex = moderatorStartIndex + ITEMS_PER_PAGE;
  const currentModerators = mockModerators.slice(moderatorStartIndex, moderatorEndIndex);
  const totalModeratorPages = Math.ceil(mockModerators.length / ITEMS_PER_PAGE);

  const renderTable = (data: typeof mockAdmins, title: string, addButtonText: string) => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <Button variant="outline" size="sm">
          + {addButtonText}
        </Button>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">First name</TableHead>
              <TableHead className="w-24">Last name</TableHead>
              <TableHead className="w-20">Status</TableHead>
              <TableHead className="w-24">Create meetup</TableHead>
              <TableHead className="w-28">Create notification</TableHead>
              <TableHead className="w-24">Add members</TableHead>
              <TableHead className="w-24">Request to Join</TableHead>
              <TableHead className="w-26">Remove members</TableHead>
              <TableHead className="w-26">Add moderators</TableHead>
              <TableHead className="w-28">Remove moderators</TableHead>
              <TableHead className="w-20">Add admin</TableHead>
              <TableHead className="w-24">Remove admin</TableHead>
              <TableHead className="w-24">Remove network</TableHead>
              <TableHead className="w-32">Actions require pre-approval</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.firstName}</TableCell>
                <TableCell>{person.lastName}</TableCell>
                <TableCell>
                  <Badge 
                    className={person.status === "joined" 
                      ? "border-[#057A55] bg-[#ECFDF5] text-[#057A55]" 
                      : "border-[#FF8A4C] bg-[#FEECDC] text-[#FF8A4C]"
                    }
                    variant="outline"
                  >
                    {person.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Checkbox checked={person.createMeetup} />
                </TableCell>
                <TableCell>
                  <Checkbox checked={person.createNotification} />
                </TableCell>
                <TableCell>
                  <Checkbox checked={person.addMembers} />
                </TableCell>
                <TableCell>
                  <Checkbox checked={person.requestToJoin} />
                </TableCell>
                <TableCell>
                  <Checkbox checked={person.removeMembers} />
                </TableCell>
                <TableCell>
                  <Checkbox checked={person.addModerators} />
                </TableCell>
                <TableCell>
                  <Checkbox checked={person.removeModerators} />
                </TableCell>
                <TableCell>
                  <Checkbox checked={person.addAdmin} />
                </TableCell>
                <TableCell>
                  <Checkbox checked={person.removeAdmin} />
                </TableCell>
                <TableCell>
                  <Checkbox checked={person.removeNetwork} />
                </TableCell>
                <TableCell>
                  <Checkbox checked={person.actionsRequireApproval} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  const renderPagination = (currentPage: number, totalPages: number, onPageChange: (page: number) => void) => (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
        
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNumber = i + 1;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={() => onPageChange(pageNumber)}
                isActive={currentPage === pageNumber}
                className="cursor-pointer"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Permissions</h2>
      
      <Tabs defaultValue="admin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="admin" className="w-full">Admin</TabsTrigger>
          <TabsTrigger value="moderators" className="w-full">Moderators</TabsTrigger>
        </TabsList>
        
        <TabsContent value="admin">
          {renderTable(currentAdmins, "Admin", "Add admin")}
          {renderPagination(adminPage, totalAdminPages, setAdminPage)}
        </TabsContent>
        
        <TabsContent value="moderators">
          {renderTable(currentModerators, "Moderators", "Add moderator")}
          {renderPagination(moderatorPage, totalModeratorPages, setModeratorPage)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Network;