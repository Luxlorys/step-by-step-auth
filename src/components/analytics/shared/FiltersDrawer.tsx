import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FilterProps } from './types';

type FiltersDrawerProps = FilterProps;

const FiltersDrawer: React.FC<FiltersDrawerProps> = ({ isFilterOpen, setIsFilterOpen }) => {
  return (
    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-1">
          <span className='text-gray-950'>Filters</span>
          <Filter className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-96 rounded-2xl">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Meetup Topics Dropdown */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Meetup topics</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose topics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="career">Career development</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
                <SelectItem value="startup">Startup</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location Section */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Location</Label>
            
            {/* Country Dropdown */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Country</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* City Dropdown */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">City</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nyc">New York</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="berlin">Berlin</SelectItem>
                  <SelectItem value="paris">Paris</SelectItem>
                  <SelectItem value="toronto">Toronto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Meetup Type Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Meetup type</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="type-1on1" />
                <Label htmlFor="type-1on1" className="text-sm">1:1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="type-small" />
                <Label htmlFor="type-small" className="text-sm">Small group (5-10)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="type-large" />
                <Label htmlFor="type-large" className="text-sm">Large group (10+)</Label>
              </div>
            </div>
          </div>

          {/* Meetup Duration Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Meetup duration</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="duration-30" />
                <Label htmlFor="duration-30" className="text-sm">30 min</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="duration-45" />
                <Label htmlFor="duration-45" className="text-sm">45 min</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="duration-60" />
                <Label htmlFor="duration-60" className="text-sm">60 min</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="duration-90" />
                <Label htmlFor="duration-90" className="text-sm">90 min</Label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setIsFilterOpen(false)}
            >
              Reset all
            </Button>
            <Button 
              className="flex-1 bg-black text-white hover:bg-gray-800"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FiltersDrawer;