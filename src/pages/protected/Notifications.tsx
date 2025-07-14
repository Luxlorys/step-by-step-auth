import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockNotifications = [
  {
    id: 1,
    notification: "New user registration request from John Doe",
    date: "25.03.2025",
  },
  {
    id: 2,
    notification: "New comment on blog post \"Top 10 Marketing Strategies\"",
    date: "25.03.2025",
  },
  {
    id: 3,
    notification: "System update scheduled for tomorrow at 2:00 PM",
    date: "25.03.2025",
  },
  {
    id: 4,
    notification: "New feature request: \"Add dark mode support\"",
    date: "25.03.2025",
  },
  {
    id: 5,
    notification: "New user registration request from Jane Smith",
    date: "25.03.2025",
  },
  {
    id: 6,
    notification: "New comment on blog post \"Marketing Trends 2025\"",
    date: "25.03.2025",
  },
  {
    id: 7,
    notification: "System maintenance completed successfully",
    date: "25.03.2025",
  },
  {
    id: 8,
    notification: "New feature request: \"Mobile app integration\"",
    date: "25.03.2025",
  },
];

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredNotifications = mockNotifications.filter(notification =>
    notification.notification.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNotifications = filteredNotifications.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedNotifications(paginatedNotifications.map(n => n.id));
    } else {
      setSelectedNotifications([]);
    }
  };

  const handleSelectNotification = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedNotifications(prev => [...prev, id]);
    } else {
      setSelectedNotifications(prev => prev.filter(nId => nId !== id));
    }
  };

  const isAllSelected = paginatedNotifications.length > 0 && 
    paginatedNotifications.every(n => selectedNotifications.includes(n.id));

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          All notifications ({filteredNotifications.length.toLocaleString()})
        </h1>
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Notification</TableHead>
              <TableHead className="w-32">Date</TableHead>
              <TableHead className="w-48">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedNotifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedNotifications.includes(notification.id)}
                    onCheckedChange={(checked) => 
                      handleSelectNotification(notification.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {notification.notification}
                </TableCell>
                <TableCell className="text-gray-600">
                  {notification.date}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-[#FDF2F2] border-[#E02424] text-[#E02424] hover:bg-[#FDF2F2]/80"
                    >
                      Decline
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-[#F3FAF7] border-[#057A55] text-[#057A55] hover:bg-[#F3FAF7]/80"
                    >
                      Approve
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div></div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
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
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(pageNum)}
                className="w-8 h-8 p-0"
              >
                {pageNum}
              </Button>
            );
          })}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
          
          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm text-gray-600">Showing</span>
            <select 
              value={itemsPerPage}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;