import React, { useState } from "react";
import { Info, Users, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Participant } from "./shared/types";

const mockParticipants: Participant[] = [
  {
    id: "1",
    name: "Sarah Williams",
    email: "sarah@example.com",
    avatar: "",
    notificationStatus: "Clicked",
    invitationResponse: "Accepted",
    rating: 4,
    feedback: "Great event! Very informative sessions.",
  },
  {
    id: "2",
    name: "John Smith",
    email: "john@example.com",
    avatar: "",
    notificationStatus: "Clicked",
    invitationResponse: "Declined",
    rating: 0,
    feedback: "No feedback",
  },
  {
    id: "3",
    name: "Emily Johnson",
    email: "emily@example.com",
    avatar: "",
    notificationStatus: "Clicked",
    invitationResponse: "Accepted",
    rating: 5,
    feedback: "Excellent networking opportunities!",
  },
  {
    id: "4",
    name: "Michael Brown",
    email: "michael@example.com",
    avatar: "",
    notificationStatus: "Not clicked",
    invitationResponse: "Declined",
    rating: 3,
    feedback: "Good content but timing was not ideal.",
  },
  {
    id: "8",
    name: "Michael Brown",
    email: "michael@example.com",
    avatar: "",
    notificationStatus: "Not clicked",
    invitationResponse: "Declined",
    rating: 3,
    feedback: "Good content but timing was not ideal.",
  },
  {
    id: "7",
    name: "Emily Johnson",
    email: "emily@example.com",
    avatar: "",
    notificationStatus: "Clicked",
    invitationResponse: "Accepted",
    rating: 5,
    feedback: "Excellent networking opportunities!",
  },
  {
    id: "6",
    name: "John Smith",
    email: "john@example.com",
    avatar: "",
    notificationStatus: "Clicked",
    invitationResponse: "Declined",
    rating: 0,
    feedback: "No feedback",
  },

  {
    id: "5",
    name: "Sarah Williams",
    email: "sarah@example.com",
    avatar: "",
    notificationStatus: "Clicked",
    invitationResponse: "Accepted",
    rating: 4,
    feedback: "Great event! Very informative sessions.",
  },
];

const HostEventsTab: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const hostEvents = 12;
  const hostEventsChange = 2;
  const invitationAcceptanceRate = 53.8;
  const acceptanceRateChange = 4.2;
  const avgEventRating = 4.7;
  const avgRatingChange = 0.2;

  const totalPages = Math.ceil(mockParticipants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentParticipants = mockParticipants.slice(startIndex, endIndex);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="space-y-4">
      {/* Host Events Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Host Events */}
        <Card className="p-3 bg-[#FCFCFC] border-[#E5E6E8]">
          <CardHeader className="p-0 px-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                Host events
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total number of events you have hosted</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="text-2xl font-bold">{hostEvents}</div>
            <div className="text-sm text-green-600 flex items-center gap-1">
              +{hostEventsChange} from last month
              <span className="text-green-600">↗</span>
            </div>
          </CardContent>
        </Card>

        {/* Invitation Acceptance Rate */}
        <Card className="p-3 bg-[#FCFCFC] border-[#E5E6E8]">
          <CardHeader className="p-0 px-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                Invitation acceptance rate
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Percentage of invitations that were accepted</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="text-2xl font-bold">
              {invitationAcceptanceRate}%
            </div>
            <div className="text-sm text-green-600 flex items-center gap-1">
              +{acceptanceRateChange}% min from last month
              <span className="text-green-600">↗</span>
            </div>
          </CardContent>
        </Card>

        {/* Average Event Rating */}
        <Card className="p-3 bg-[#FCFCFC] border-[#E5E6E8]">
          <CardHeader className="p-0 px-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                Avg. event rating
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Average rating given by event participants</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
              <Bell className="w-5 h-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="text-2xl font-bold">{avgEventRating}/5</div>
            <div className="text-sm text-green-600 flex items-center gap-1">
              {avgRatingChange} min from last month
              <span className="text-green-600">↗</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Details Section */}
      <Card className="p-4 bg-[#FCFCFC] border-[#E5E6E8]">
        <CardHeader className="px-0 pt-0 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Annual Tech Conference
            </CardTitle>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">1 - 4</span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  ‹
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  ›
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          {/* Participants Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-600 font-medium">
                  <div className="flex items-center gap-2">
                    Participant
                    <span className="text-gray-400">↓</span>
                  </div>
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  <div className="flex items-center gap-2">
                    Notification status
                    <span className="text-gray-400">↓</span>
                  </div>
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  <div className="flex items-center gap-2">
                    Invitation response
                    <span className="text-gray-400">↓</span>
                  </div>
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  <div className="flex items-center gap-2">
                    Feedback
                    <span className="text-gray-400">↓</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentParticipants.map((participant) => (
                <TableRow key={participant.id} className="border-b">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={participant.avatar}
                          alt={participant.name}
                        />
                        <AvatarFallback className="bg-purple-500 text-white text-sm">
                          {participant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {participant.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {participant.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        participant.notificationStatus === "Clicked"
                          ? "default"
                          : "destructive"
                      }
                      className={
                        participant.notificationStatus === "Clicked"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {participant.notificationStatus === "Clicked"
                        ? "✓ Clicked"
                        : "✗ Not clicked"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        participant.invitationResponse === "Accepted"
                          ? "default"
                          : "destructive"
                      }
                      className={
                        participant.invitationResponse === "Accepted"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {participant.invitationResponse}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      {participant.rating > 0 && (
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex">
                            {renderStars(participant.rating)}
                          </div>
                        </div>
                      )}
                      <div className="text-sm text-gray-600 truncate">
                        {participant.feedback}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Table Footer with Stats */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t">
            <div className="flex w-full gap-8 text-sm">
              <span className="flex-1 justify-left">
                <strong>Total Participants:</strong> 4
              </span>
              <span className="flex-1 justify-left">
                <strong>Click rate:</strong> 75%
              </span>
              <span className="flex-1 justify-left">
                <strong>Acceptance rate:</strong> 50%
              </span>
              <span className="flex-1 justify-left">
                <strong>Avg rate:</strong> 4.0
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HostEventsTab;
