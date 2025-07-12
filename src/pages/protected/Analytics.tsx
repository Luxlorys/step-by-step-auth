import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Analytics = () => {
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
          <TabsContent value="subscription" className="mt-0">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Subscription & Engagement Analytics</h3>
              <p className="text-gray-600">
                This section will display subscriber engagement metrics, including sign-up rates, 
                active users, retention analytics, and engagement patterns across your platform.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="meetup" className="mt-0">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Meetup Activity Analytics</h3>
              <p className="text-gray-600">
                View comprehensive meetup statistics including attendance rates, popular meetup topics, 
                member participation trends, and geographic distribution of meetup activities.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="mt-0">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Host Events Analytics</h3>
              <p className="text-gray-600">
                Track your hosted events performance with metrics on event attendance, 
                host ratings, successful event completion rates, and revenue generated from hosted events.
              </p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Analytics;