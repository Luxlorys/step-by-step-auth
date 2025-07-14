import React from 'react';
import { Info, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip } from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MeetupTopicDataPoint, DayTimeSlot } from './shared/types';

const meetupTopicsData: MeetupTopicDataPoint[] = Array.from({ length: 50 }, (_, i) => ({
  x: Math.floor(Math.random() * 12) + 1,
  y: Math.floor(Math.random() * 100) + 10,
  topic: i === 25 ? 'Career development' : '',
  size: Math.floor(Math.random() * 20) + 5,
}));

const dayTimeData: DayTimeSlot[] = [
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

const MeetupActivityTab: React.FC = () => {
  const totalMeetups = 182;
  const totalMeetupsChange = 12;
  const avgMeetupLength = "1h 35min";
  const avgLengthChange = 5;
  const cancelledMeetups = 24;
  const cancelledChange = -2;

  return (
    <div className="space-y-6">
      {/* Meetup Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Meetups */}
        <Card className="p-4 bg-[#FCFCFC] border-[#E5E6E8]">
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
        <Card className="p-4 bg-[#FCFCFC] border-[#E5E6E8]">
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
        <Card className="p-4 bg-[#FCFCFC] border-[#E5E6E8]">
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
        <Card className="p-6 bg-[#FCFCFC] border-[#E5E6E8]">
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
                <RechartsTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      if (data.topic) {
                        return (
                          <div className="bg-[#3557FF] text-white px-3 py-2 rounded-lg shadow-lg">
                            <div className="font-medium">{data.topic}</div>
                            <div className="text-sm opacity-90">{data.y}</div>
                          </div>
                        );
                      }
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
          </CardContent>
        </Card>

        {/* Popular Day & Times Chart */}
        <Card className="p-6 bg-[#FCFCFC] border-[#E5E6E8]">
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
            {/* Grid Layout */}
            <div className="grid grid-cols-8 gap-2 mb-4">
              {/* Empty corner cell */}
              <div></div>
              {/* Day headers */}
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center text-sm font-medium">
                  {day}
                </div>
              ))}
              
              {/* AM Row */}
              <div className="text-sm font-medium flex items-center">AM</div>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={`${day}-AM`} className="flex flex-col gap-1">
                  {dayTimeData
                    .filter(d => d.day === day && d.time === 'AM')
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
              ))}
              
              {/* PM Row */}
              <div className="text-sm font-medium flex items-center">PM</div>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={`${day}-PM`} className="flex flex-col gap-1">
                  {dayTimeData
                    .filter(d => d.day === day && d.time === 'PM')
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
              ))}
              
              {/* EVE Row */}
              <div className="text-sm font-medium flex items-center">EVE</div>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={`${day}-EVE`} className="flex flex-col gap-1">
                  {dayTimeData
                    .filter(d => d.day === day && d.time === 'EVE')
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
      <div className="p-6 bg-[#FCFCFC] border border-[#E5E6E8] rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Geographic Hotspots</h3>
          <div className="flex items-center gap-2">
            <ChevronLeft className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          {/* United Kingdom Card */}
          <div className="bg-white border border-[#E5E6E8] rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-gray-900">United Kingdom</span>
              <span className="text-sm text-gray-600">1,456 meetups</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-gray-900">354</div>
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-600">Bristol</span>
            </div>
          </div>

          {/* Germany Card */}
          <div className="bg-white border border-[#E5E6E8] rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-gray-900">Germany</span>
              <span className="text-sm text-gray-600">1,456 meetups</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-gray-900">354</div>
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-600">Hanover</span>
            </div>
          </div>

          {/* France Card */}
          <div className="bg-white border border-[#E5E6E8] rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-gray-900">France</span>
              <span className="text-sm text-gray-600">1,456 meetups</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-gray-900">354</div>
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-600">Lyon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetupActivityTab;