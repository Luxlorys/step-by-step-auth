
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockRequests } from '@/utils/membershipRequestsData';

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");

  // Find the member by ID
  const member = mockRequests.find(request => request.id === id);

  if (!member) {
    return (
      <div className="p-6">
        <p>Member not found</p>
      </div>
    );
  }

  const handleApprove = () => {
    toast({
      title: "Request Approved",
      description: "The membership request has been approved successfully.",
    });
    navigate('/members');
  };

  const handleDelete = () => {
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting member", member.email, "with reason:", deleteReason);
    toast({
      title: "Request Declined",
      description: "The membership request has been declined.",
      variant: "destructive",
    });
    setDeleteOpen(false);
    setDeleteReason("");
    navigate('/members');
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Info Block */}
          <Card>
            <CardHeader>
              <CardTitle>User Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Full Name</label>
                <p className="font-semibold">{member.fullName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-gray-900">{member.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Joined Date</label>
                <p className="text-gray-900">{member.joinedDate}</p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info Block */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Office location</label>
                  <p className="text-gray-900">74 Ermin Street,<br />Wrenthorpe, WF2 3YU</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Job title</label>
                  <p className="text-gray-900">Product Designer</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Start Date</label>
                  <p className="text-gray-900">25.03.2020</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Department</label>
                  <p className="text-gray-900">CMS</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">End Date</label>
                  <p className="text-gray-900">25.03.2025</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Line manager</label>
                  <p className="text-gray-900">Sarah Willson</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={handleDelete}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <X className="w-4 h-4 mr-2" />
            Decline
          </Button>
          <Button
            onClick={handleApprove}
            className="bg-black text-white hover:bg-gray-800"
          >
            Approve request
          </Button>
        </div>
      </div>

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

export default MemberDetails;
