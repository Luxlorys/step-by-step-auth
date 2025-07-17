import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { 
  SubscriptionEngagementTab, 
  MeetupActivityTab, 
  HostEventsTab, 
  FiltersDrawer 
} from '@/components/analytics';


const Analytics = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    // Close the popover when both dates are selected
    if (range?.from && range?.to) {
      setIsDatePickerOpen(false);
    }
  };

  return (
    <div className="bg-white">
      <Tabs defaultValue="subscription" className="w-full">
        <div className="flex items-center justify-between mb-6 gap-6">
          <TabsList className="w-full grid grid-cols-3 gap-4">
            <TabsTrigger value="subscription" className="flex-1 text-sm px-4">
              Subscription & Engagement
            </TabsTrigger>
            <TabsTrigger value="meetup" className="flex-1 text-sm px-4">
              Meetup activity
            </TabsTrigger>
            <TabsTrigger value="events" className="flex-1 text-sm px-4">
              Host events
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <FiltersDrawer 
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />
            
            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className={cn(
                    "flex items-center justify-start text-left text-gray-950 font-normal",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span className='text-gray-950'>Choose period</span>
                  )}
                  <CalendarIcon className="w-4 h-4" color='#414149' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={handleDateSelect}
                  numberOfMonths={1}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
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
