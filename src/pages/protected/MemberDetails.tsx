import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Eye, Link, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Mock data - this should match the joinRequests data structure
const mockRequests = [
  {
    id: 1,
    fullName: "John Anderson",
    phoneNumber: "+1 (555) 123-4567",
    email: "john.anderson@company.com",
    networkName: "TechCorp Solutions",
    networkType: "Official",
    networkSize: "600 members",
    networkDescription: "Leading provider of enterprise software solutions and digital transformation services.",
    organizationName: "TechCorp Solutions Ltd.",
    country: "United States",
    city: "San Francisco",
    street: "123 Tech Street",
    postCode: "94105",
    companyNumber: "CO987654321",
    vatNumber: "US123456789"
  }
];

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");

  // Find the member by ID
  const member = mockRequests.find(req => req.id === parseInt(id || ""));

  if (!member) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Member not found</h2>
          <Button onClick={() => navigate(-1)} variant="outline">
            Go back
          </Button>
        </div>
      </div>
    );
  }

  const handleApprove = () => {
    toast({
      title: "Request approved",
      description: "The membership request has been approved successfully.",
    });
    navigate("/join-requests");
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    console.log("Delete reason:", deleteReason);
    toast({
      title: "Request declined",
      description: "The membership request has been declined.",
      variant: "destructive",
    });
    setShowDeleteDialog(false);
    navigate("/join-requests");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Member Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Administrator Info */}
          <Card className="bg-[#FAFAFA] border-[#E2E8F0] rounded-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Administrator Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Full Name</p>
                <p className="text-gray-900">{member.fullName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Phone Number</p>
                <p className="text-gray-900">{member.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-gray-900">{member.email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="bg-[#FAFAFA] border-[#E2E8F0] rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Documents</CardTitle>
              <Button variant="ghost" size="sm" className="text-sm text-gray-600 gap-2">
                <Download className="h-4 w-4" />
                Download all
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                    <span className="text-red-600 text-xs font-semibold">PDF</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Company Registration.pdf</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                    <span className="text-red-600 text-xs font-semibold">PDF</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Tax Certificate.pdf</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                    <span className="text-red-600 text-xs font-semibold">PDF</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Tax Certificate.pdf</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">https://kpmg.com</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Link className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Network Info */}
          <Card className="bg-[#FAFAFA] border-[#E2E8F0] rounded-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Network Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Network Name</p>
                <p className="text-gray-900">{member.networkName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Network Type</p>
                <p className="text-gray-900">{member.networkType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Network Size</p>
                <p className="text-gray-900">{member.networkSize}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Network Description</p>
                <p className="text-gray-900">{member.networkDescription}</p>
              </div>
            </CardContent>
          </Card>

          {/* Organization Info */}
          <Card className="bg-[#FAFAFA] border-[#E2E8F0] rounded-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Organization Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Organization Name</p>
                  <p className="text-gray-900">{member.organizationName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Country</p>
                  <p className="text-gray-900">{member.country}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">City</p>
                  <p className="text-gray-900">{member.city}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Street</p>
                  <p className="text-gray-900">{member.street}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Post Code</p>
                  <p className="text-gray-900">{member.postCode}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Company Number</p>
                  <p className="text-gray-900">{member.companyNumber}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-600">VAT Number</p>
                  <p className="text-gray-900">{member.vatNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={handleDelete}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-2" />
            Decline
          </Button>
          <Button 
            onClick={handleApprove}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            Approve request
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Decline request!</DialogTitle>
            <DialogDescription className="sr-only">
              Provide a reason for declining this membership request
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-900 mb-2 block">
                Decline reason
              </label>
              <Textarea
                placeholder="Write the reason"
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              <X className="h-4 w-4 mr-2" />
              Decline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemberDetails;