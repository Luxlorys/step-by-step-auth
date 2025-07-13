import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Calendar, Info, Users, Bell, Mail } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// Mock data for the chart
const chartData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  activeSubscriptions: Math.floor(Math.random() * 1000) + 2500,
  newSubscriptions: Math.floor(Math.random() * 800) + 200,
  unsubscribes: Math.floor(Math.random() * 400) + 100,
}));

const chartConfig = {
  activeSubscriptions: {
    label: "Active subscriptions",
    color: "#D03801",
  },
  newSubscriptions: {
    label: "New subscriptions", 
    color: "#014737",
  },
  unsubscribes: {
    label: "Unsubscribes",
    color: "#951F21",
  },
};

// Mock data for meetup topics scatter chart
const meetupTopicsData = Array.from({ length: 50 }, (_, i) => ({
  x: Math.floor(Math.random() * 12) + 1, // months 1-12
  y: Math.floor(Math.random() * 100) + 10, // meetup count 10-110
  topic: i === 25 ? 'Career development' : '', // highlight one topic
  size: Math.floor(Math.random() * 20) + 5,
}));

// Mock data for popular day & time heatmap
const dayTimeData = [
  { day: 'Mon', time: 'AM', slot: '8-11', count: 15, color: '#14b8a6' },
  { day: 'Mon', time: 'AM', slot: '9-12', count: 12, color: '#14b8a6' },
  { day: 'Mon', time: 'PM', slot: '13-16', count: 8, color: '#f97316' },
  { day: 'Mon', time: 'PM', slot: '15-18', count: 6, color: '#f97316' },
  
  { day: 'Tue', time: 'AM', slot: '8-11', count: 18, color: '#14b8a6' },
  { day: 'Tue', time: 'AM', slot: '9-12', count: 20, color: '#14b8a6' },
  { day: 'Tue', time: 'PM', slot: '12-15', count: 12, color: '#f97316' },
  { day: 'Tue', time: 'PM', slot: '14-17', count: 10, color: '#f97316' },
  
  { day: 'Wed', time: 'AM', slot: '8-11', count: 16, color: '#14b8a6' },
  { day: 'Wed', time: 'AM', slot: '9-12', count: 14, color: '#14b8a6' },
  { day: 'Wed', time: 'PM', slot: '12-15', count: 11, color: '#f97316' },
  { day: 'Wed', time: 'PM', slot: '14-17', count: 9, color: '#f97316' },
  
  { day: 'Thu', time: 'AM', slot: '8-11', count: 22, color: '#14b8a6' },
  { day: 'Thu', time: 'AM', slot: '9-12', count: 19, color: '#14b8a6' },
  { day: 'Thu', time: 'PM', slot: '12-15', count: 14, color: '#f97316' },
  { day: 'Thu', time: 'PM', slot: '14-17', count: 16, color: '#f97316' },
  
  { day: 'Fri', time: 'AM', slot: '8-11', count: 13, color: '#14b8a6' },
  { day: 'Fri', time: 'AM', slot: '9-12', count: 11, color: '#14b8a6' },
  { day: 'Fri', time: 'PM', slot: '12-15', count: 25, color: '#f97316' },
  { day: 'Fri', time: 'PM', slot: '14-17', count: 28, color: '#f97316' },
  
  { day: 'Sat', time: 'EVE', slot: '18-20', count: 35, color: '#3b82f6' },
  { day: 'Sat', time: 'EVE', slot: '21-22', count: 32, color: '#3b82f6' },
  
  { day: 'Sun', time: 'EVE', slot: '18-20', count: 30, color: '#3b82f6' },
  { day: 'Sun', time: 'EVE', slot: '21-22', count: 28, color: '#3b82f6' },
];

// Mock data for host events participants
const mockParticipants = [
  {
    id: '1',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    avatar: '',
    notificationStatus: 'Clicked',
    invitationResponse: 'Accepted',
    rating: 4,
    feedback: 'Great event! Very informative sessions.'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    avatar: '',
    notificationStatus: 'Clicked',
    invitationResponse: 'Declined',
    rating: 0,
    feedback: 'No feedback'
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    avatar: '',
    notificationStatus: 'Clicked',
    invitationResponse: 'Accepted',
    rating: 4,
    feedback: 'Great event! Very informative sessions.'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    avatar: '',
    notificationStatus: 'Not clicked',
    invitationResponse: 'Declined',
    rating: 3,
    feedback: 'Great event! Very informative sessions.'
  },
  {
    id: '5',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    avatar: '',
    notificationStatus: 'Clicked',
    invitationResponse: 'Accepted',
    rating: 0,
    feedback: 'No feedback'
  },
  {
    id: '6',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    avatar: '',
    notificationStatus: 'Not clicked',
    invitationResponse: 'Accepted',
    rating: 2,
    feedback: 'Great event! Very informative sessions.'
  }
];

const Analytics = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // Mock data for metric cards
  const activeSubscriptions = 3475;
  const lastMonthChange = 12;
  const newSubscriptions = 5453;
  const newSubsChange = 3.2;
  const unsubscribes = 1578;
  const unsubsChange = -4;
  const notificationCTR = 34;
  const ctrChange = 3.2;
  const invitationsSent = 4820;
  const invitationsChange = 8;
  const invitationsAccepted = 1324;
  const acceptedChange = 12;

  // Mock data for meetup metrics
  const totalMeetups = 182;
  const totalMeetupsChange = 12;
  const avgMeetupLength = "1h 35min";
  const avgLengthChange = 5;
  const cancelledMeetups = 24;
  const cancelledChange = -2;

  // Mock data for host events metrics
  const hostEvents = 12;
  const hostEventsChange = 2;
  const invitationAcceptanceRate = 53.8;
  const acceptanceRateChange = 4.2;
  const avgEventRating = 4.7;
  const avgRatingChange = 0.2;

  // Pagination logic
  const totalPages = Math.ceil(mockParticipants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentParticipants = mockParticipants.slice(startIndex, endIndex);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-yellow-500' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white">
      <Tabs defaultValue="subscription" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="grid grid-cols-3 max-w-3xl gap-4">
            <TabsTrigger value="subscription" className="text-sm px-4">
              Subscription & Engagement
            </TabsTrigger>
            <TabsTrigger value="meetup" className="text-sm px-4">
              Meetup activity
            </TabsTrigger>
            <TabsTrigger value="events" className="text-sm px-4">
              Host events
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Choose period</span>
            </Button>
          </div>
        </div>
        
        <div>
          <TabsContent value="subscription" className="mt-0 space-y-6">
            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Active Subscriptions */}
              <Card className="p-4">
                <CardHeader className="pb-2 px-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      Active subscriptions
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Displays the total number of subscriptions during the selected period</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <div className="text-2xl font-bold">{activeSubscriptions.toLocaleString()}</div>
                  <div className="text-sm text-orange-500 flex items-center gap-1">
                    +{lastMonthChange}% last month
                    <span className="text-orange-500">↗</span>
                  </div>
                </CardContent>
              </Card>

              {/* New Subscriptions */}
              <Card className="p-4">
                <CardHeader className="pb-2 px-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">Subscription</CardTitle>
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent className="px-0 pb-0 space-y-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">New</span>
                      <span className="text-lg font-bold text-green-600">{newSubscriptions.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      +{newSubsChange}% ↗
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Unsubscribes</span>
                      <span className="text-lg font-bold text-red-600">{unsubscribes.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-red-600 flex items-center gap-1">
                      {unsubsChange}% ↘
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notification CTR */}
              <Card className="p-4">
                <CardHeader className="pb-2 px-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      Notification CTR
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click-through rate for notifications sent to users</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <Bell className="w-5 h-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <div className="text-2xl font-bold">{notificationCTR}%</div>
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    +{ctrChange}% last month
                    <span className="text-green-600">↗</span>
                  </div>
                </CardContent>
              </Card>

              {/* Invitations */}
              <Card className="p-4">
                <CardHeader className="pb-2 px-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      Invitations
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Number of invitations sent and accepted</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent className="px-0 pb-0 space-y-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Sent</span>
                      <span className="text-lg font-bold">{invitationsSent.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      +{invitationsChange}% ↗
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Accepted</span>
                      <span className="text-lg font-bold">{invitationsAccepted.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      +{acceptedChange}% ↗
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chart Section */}
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#D03801' }}></div>
                      <span className="text-sm text-gray-600">Active subscriptions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#014737' }}></div>
                      <span className="text-sm text-gray-600">New subscriptions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#951F21' }}></div>
                      <span className="text-sm text-gray-600">Unsubscribes</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Last month</div>
                </div>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <ChartContainer config={chartConfig} className="h-80 w-full">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="activeSubscriptions"
                      stroke="#D03801"
                      strokeWidth={2}
                      dot={{ fill: '#D03801', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#D03801' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="newSubscriptions"
                      stroke="#014737"
                      strokeWidth={2}
                      dot={{ fill: '#014737', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#014737' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="unsubscribes"
                      stroke="#951F21"
                      strokeWidth={2}
                      dot={{ fill: '#951F21', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#951F21' }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="meetup" className="mt-0 space-y-6">
            {/* Meetup Metric Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Total Meetups */}
              <Card className="p-4">
                <CardHeader className="pb-2 px-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      Total meetups
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Total number of meetups organized</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <div className="text-2xl font-bold">{totalMeetups}</div>
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    +{totalMeetupsChange}% from last month
                    <span className="text-green-600">↗</span>
                  </div>
                </CardContent>
              </Card>

              {/* Average Meetup Length */}
              <Card className="p-4">
                <CardHeader className="pb-2 px-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      AVG. Meetup length
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Average duration of meetups</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <div className="text-2xl font-bold">{avgMeetupLength}</div>
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    {avgLengthChange} min from last month
                    <span className="text-green-600">↗</span>
                  </div>
                </CardContent>
              </Card>

              {/* Cancelled Meetups */}
              <Card className="p-4">
                <CardHeader className="pb-2 px-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      Canceled meetups
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Number of meetups that were cancelled</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <div className="text-2xl font-bold">{cancelledMeetups}</div>
                  <div className="text-sm text-red-600 flex items-center gap-1">
                    {cancelledChange} from last month
                    <span className="text-red-600">↘</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Popular Meetup Topics Chart */}
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      Popular meetup topics
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Most popular topics discussed in meetups</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <div className="text-sm text-gray-500">January - June 2024</div>
                  </div>
                </CardHeader>
                <CardContent className="px-0 pb-0 h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={meetupTopicsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        type="number"
                        dataKey="x"
                        domain={[0, 12]}
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        type="number"
                        dataKey="y"
                        domain={[0, 110]}
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-2 border rounded shadow">
                                {data.topic && <p className="font-medium">{data.topic}</p>}
                                <p>Count: {data.y}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Scatter 
                        dataKey="y" 
                        fill="#3b82f6"
                        r={4}
                      />
                      {/* Highlight Career development */}
                      <Scatter 
                        data={meetupTopicsData.filter(d => d.topic)}
                        dataKey="y" 
                        fill="#3b82f6"
                        r={6}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                  {/* Career development label */}
                  <div className="mt-2">
                    <div className="inline-flex items-center bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
                      <span>Career development</span>
                      <span className="ml-2 bg-white bg-opacity-20 px-2 py-0.5 rounded text-xs">65</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Popular Day & Times Chart */}
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      Popular Day & Times
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Most popular days and times for meetups</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <div className="text-sm text-gray-500">January - June 2024</div>
                  </div>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  {/* Time periods */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm font-medium">AM</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">PM</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">EVE</div>
                    </div>
                  </div>
                  
                  {/* Days grid */}
                  <div className="space-y-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <div key={day} className="grid grid-cols-7 gap-2 items-center">
                        <div className="text-sm font-medium text-center">{day}</div>
                        <div className="col-span-6 grid grid-cols-6 gap-1">
                          {dayTimeData
                            .filter(d => d.day === day)
                            .map((slot, index) => (
                              <div
                                key={index}
                                className="h-6 rounded text-xs flex items-center justify-center text-white font-medium"
                                style={{ backgroundColor: slot.color }}
                              >
                                {slot.slot}
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Legend */}
                  <div className="flex items-center gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                      <span>AM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span>PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>EVE</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Geographic Hotspots */}
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-lg font-semibold">Geographic Hotspots</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-4 bg-red-500 rounded-sm flex items-center justify-center">
                        <div className="w-3 h-2 bg-yellow-400 rounded-sm"></div>
                      </div>
                      <span className="font-medium">Germany</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">1,456 meetups</div>
                    </div>
                  </div>
                  <div className="ml-9 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total</span>
                      <span className="font-medium">1,456 meetups</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Hanover</span>
                      <span className="font-medium">451 meetups</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="events" className="mt-0 space-y-6">
            {/* Host Events Metric Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Host Events */}
              <Card className="p-4">
                <CardHeader className="pb-2 px-0">
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
              <Card className="p-4">
                <CardHeader className="pb-2 px-0">
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
                  <div className="text-2xl font-bold">{invitationAcceptanceRate}%</div>
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    +{acceptanceRateChange}% min from last month
                    <span className="text-green-600">↗</span>
                  </div>
                </CardContent>
              </Card>

              {/* Average Event Rating */}
              <Card className="p-4">
                <CardHeader className="pb-2 px-0">
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
            <Card className="p-6">
              <CardHeader className="px-0 pt-0 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Annual Tech Conference</CardTitle>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">1 - 12</span>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        ‹
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
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
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={participant.avatar} alt={participant.name} />
                              <AvatarFallback className="bg-purple-500 text-white">
                                {participant.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">{participant.name}</div>
                              <div className="text-sm text-gray-500">{participant.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={participant.notificationStatus === 'Clicked' ? 'default' : 'destructive'}
                            className={participant.notificationStatus === 'Clicked' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : 'bg-red-100 text-red-800 hover:bg-red-100'
                            }
                          >
                            {participant.notificationStatus === 'Clicked' ? '✓ Clicked' : '✗ Not clicked'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={participant.invitationResponse === 'Accepted' ? 'default' : 'destructive'}
                            className={participant.invitationResponse === 'Accepted' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : 'bg-red-100 text-red-800 hover:bg-red-100'
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
                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <div className="flex items-center gap-8 text-sm">
                    <span><strong>Total Participants:</strong> 6</span>
                    <span><strong>Click rate:</strong> 67%</span>
                    <span><strong>Acceptance rate:</strong> 37%</span>
                    <span><strong>Avg rate:</strong> 4.2</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Analytics;
