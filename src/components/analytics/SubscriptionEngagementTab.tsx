import React from 'react';
import { Info, Users, Bell, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChartDataPoint, ChartConfig } from './shared/types';

const chartData: ChartDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  activeSubscriptions: Math.floor(Math.random() * 1000) + 2500,
  newSubscriptions: Math.floor(Math.random() * 800) + 200,
  unsubscribes: Math.floor(Math.random() * 400) + 100,
}));

const chartConfig: ChartConfig = {
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

const SubscriptionEngagementTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Subscriptions */}
        <Card className="p-3 bg-[#FCFCFC] border-[#E5E6E8] flex flex-col justify-between">
          <CardHeader className="p-0 px-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-md font-medium text-gray-950 flex items-center gap-2">
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
        <Card className="p-3 bg-[#FCFCFC] border-[#E5E6E8] flex flex-col justify-between">
          <CardHeader className="p-0 px-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-md font-medium text-gray-950">Subscription</CardTitle>
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
        <Card className="p-3 bg-[#FCFCFC] border-[#E5E6E8] flex flex-col justify-between">
          <CardHeader className="p-0 px-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-md font-medium text-gray-950 flex items-center gap-2">
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
        <Card className="p-3 bg-[#FCFCFC] border-[#E5E6E8] flex flex-col justify-between">
          <CardHeader className="p-0 px-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-md font-medium text-gray-950 flex items-center gap-2">
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
      <Card className="p-6 bg-[#FCFCFC] border-[#E5E6E8]">
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
                content={<ChartTooltipContent className="p-3" />}
                cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="activeSubscriptions"
                stroke="#D03801"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: '#D03801' }}
              />
              <Line
                type="monotone"
                dataKey="newSubscriptions"
                stroke="#014737"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: '#014737' }}
              />
              <Line
                type="monotone"
                dataKey="unsubscribes"
                stroke="#951F21"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: '#951F21' }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionEngagementTab;