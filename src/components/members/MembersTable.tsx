import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, ChevronDown, Edit, Trash2, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Member } from "@/utils/mockData";

interface MembersTableProps {
  members: Member[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  withTagsDropdown?: boolean;
}

const getTagColor = (tag: string) => {
  const colors: Record<string, string> = {
    "Business analysis": "bg-orange-100 text-orange-800",
    Marketing: "bg-blue-100 text-blue-800",
    VIP: "bg-green-100 text-green-800",
    Management: "bg-yellow-100 text-yellow-800",
    Tech: "bg-gray-100 text-gray-800",
    Sales: "bg-purple-100 text-purple-800",
    Consulting: "bg-cyan-100 text-cyan-800",
    Finance: "bg-red-100 text-red-800",
    HR: "bg-pink-100 text-pink-800",
    Operations: "bg-indigo-100 text-indigo-800",
  };
  return colors[tag] || "bg-gray-100 text-gray-800";
};

const getStatusBadge = (status: Member["status"]) => {
  return status === "Joined" ? (
    <Badge
      variant="outline"
      className="bg-green-50 text-green-700 border-green-200"
    >
      Joined
    </Badge>
  ) : (
    <Badge
      variant="outline"
      className="bg-orange-50 text-orange-700 border-orange-200"
    >
      Invited
    </Badge>
  );
};

const MembersTable: React.FC<MembersTableProps> = ({
  members,
  currentPage,
  totalPages,
  onPageChange,
  withTagsDropdown = true,
}) => {
  const navigate = useNavigate();
  const [editTagsOpen, setEditTagsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [newTag, setNewTag] = useState("");
  const [deleteReason, setDeleteReason] = useState("");
  const [memberTags, setMemberTags] = useState<string[]>([]);

  const handleRowClick = (memberId: string) => {
    navigate(`/dashboard/members/${memberId}`);
  };

  const handleEditTags = (member: Member) => {
    setSelectedMember(member);
    setMemberTags([...member.tags]);
    setEditTagsOpen(true);
  };

  const handleDelete = (member: Member) => {
    setSelectedMember(member);
    setDeleteOpen(true);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !memberTags.includes(newTag.trim())) {
      setMemberTags([...memberTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setMemberTags(memberTags.filter(tag => tag !== tagToRemove));
  };

  const handleSaveEditTags = () => {
    // Here you would typically update the member's tags
    console.log("Saving tags for", selectedMember?.email, ":", memberTags);
    setEditTagsOpen(false);
    setSelectedMember(null);
    setMemberTags([]);
  };

  const handleConfirmDelete = () => {
    // Here you would typically delete the member
    console.log("Deleting", selectedMember?.email, "with reason:", deleteReason);
    setDeleteOpen(false);
    setSelectedMember(null);
    setDeleteReason("");
  };

  return (
    <div className="space-y-4">
      {withTagsDropdown && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">
              Members List{" "}
              <span className="text-gray-500">({members.length} ppl)</span>
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Tags</span>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-1"
            >
              <span>All</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center space-x-1">
                  <span>Tags</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </TableHead>
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
            {members.map((member) => (
              <TableRow 
                key={member.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(member.id)}
              >
                <TableCell className="font-medium">{member.email}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {member.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className={`text-xs ${getTagColor(tag)}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                    {member.tags.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gray-100 text-gray-600"
                      >
                        +{member.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(member.status)}</TableCell>
                <TableCell className="text-gray-600">
                  {member.joinedDate}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditTags(member);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                        Edit tags
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(member);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </PopoverContent>
                  </Popover>
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
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
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
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
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

      {/* Edit Tags Modal */}
      <Dialog open={editTagsOpen} onOpenChange={setEditTagsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit tags!</DialogTitle>
            <DialogDescription>
              {selectedMember?.email}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Existing tags of this contact</h4>
              <div className="flex flex-wrap gap-2">
                {memberTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className={`${getTagColor(tag)} flex items-center gap-1`}
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:bg-black/10 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Add new tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <Button onClick={handleAddTag} size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </div>

          <DialogFooter className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setEditTagsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEditTags}
              className="bg-black text-white hover:bg-gray-800"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Decline request!</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Decline reason</label>
              <Textarea
                placeholder="Write the reason"
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
            >
              <X className="w-4 h-4 mr-1" />
              Decline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MembersTable;
