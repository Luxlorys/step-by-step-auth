import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  SubscriptionEngagementTab, 
  MeetupActivityTab, 
  HostEventsTab, 
  FiltersDrawer 
} from '@/components/analytics';


const Analytics = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
            <FiltersDrawer 
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />
            
            <Button variant="outline" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Choose period</span>
            </Button>
          </div>
        </div>
        
        <div>
          <TabsContent value="subscription" className="mt-0">
            <SubscriptionEngagementTab />
          </TabsContent>
          
          <TabsContent value="meetup" className="mt-0">
            <MeetupActivityTab />
          </TabsContent>
          
          <TabsContent value="events" className="mt-0">
            <HostEventsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Analytics;
