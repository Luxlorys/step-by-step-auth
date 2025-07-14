import { useState } from "react";
import { Calendar, Clock, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: string;
  title: string;
  description: string;
  url?: string;
  tags: string[];
  scheduledDate?: Date;
  createdAt: Date;
}

const mockTags = [
  "Technology", "Finance", "Marketing", "Sales", "Development", "Design",
  "Management", "HR", "Operations", "Strategy", "Innovation", "Data",
  "Security", "Cloud", "Mobile", "Web", "Analytics", "AI", "ML",
  "Blockchain", "Healthcare", "Education", "Retail", "Manufacturing",
  "Logistics", "Energy", "Environment", "Legal", "Compliance"
];

const Messaging = () => {
  const [activeTab, setActiveTab] = useState("notifications");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "Insight",
      title: "It is a long established",
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      url: "https://www.awwwards.com/",
      tags: ["Technology", "Finance", "Tech", "IT"],
      createdAt: new Date()
    }
  ]);

  // Form state
  const [formType, setFormType] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState({ hours: "09", minutes: "00" });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  const handleCreateNotification = () => {
    if (!formType || !formTitle || !formDescription) return;

    const newNotification: Notification = {
      id: Date.now().toString(),
      type: formType,
      title: formTitle,
      description: formDescription,
      url: formUrl || undefined,
      tags: selectedTags,
      scheduledDate: scheduledDate,
      createdAt: new Date()
    };

    setNotifications(prev => [newNotification, ...prev]);
    
    // Reset form
    setFormType("");
    setFormTitle("");
    setFormDescription("");
    setFormUrl("");
    setSelectedTags([]);
    setScheduledDate(undefined);
    setShowDatePicker(false);
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const combinedScheduledDateTime = scheduledDate ? 
    new Date(scheduledDate.getFullYear(), scheduledDate.getMonth(), scheduledDate.getDate(), 
             parseInt(scheduledTime.hours), parseInt(scheduledTime.minutes)) : undefined;

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Messaging & Events</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="group-meetups">Group Meetups</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="flex-1 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Left Side - Form */}
            <Card className="bg-[#FAFAFA] border-[#E2E8F0]">
              <CardHeader>
                <CardTitle>Notification structure</CardTitle>
                <p className="text-sm text-gray-600">
                  These notifications will be sent to users based on the selected tag. 
                  Users can manage which types of notifications they receive, so 
                  please assign the most relevant tag.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Type and Title Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select value={formType} onValueChange={setFormType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Insight">Insight</SelectItem>
                        <SelectItem value="Update">Update</SelectItem>
                        <SelectItem value="Alert">Alert</SelectItem>
                        <SelectItem value="Reminder">Reminder</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Notification title</Label>
                    <Input
                      id="title"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="Enter notification title"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description (250 simbols)</Label>
                  <Textarea
                    id="description"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Enter description"
                    className="min-h-24"
                    maxLength={250}
                  />
                </div>

                {/* URL */}
                <div className="space-y-2">
                  <Label htmlFor="url">URL link (optional)</Label>
                  <Input
                    id="url"
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder="https://www.awwwards.com/"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="space-y-2">
                    {selectedTags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedTags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm"
                          >
                            {tag}
                            <button
                              onClick={() => handleRemoveTag(tag)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    <Select onValueChange={(value) => handleTagToggle(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={`${selectedTags.length} tags selected`} />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {mockTags.map(tag => (
                          <SelectItem
                            key={tag}
                            value={tag}
                            disabled={selectedTags.includes(tag)}
                          >
                            {tag}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Schedule Section */}
                {showDatePicker && (
                  <div className="space-y-4 p-4 bg-white rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Label>Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !scheduledDate && "text-muted-foreground"
                              )}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={scheduledDate}
                              onSelect={setScheduledDate}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="flex gap-2">
                        <div>
                          <Label>Hours</Label>
                          <Input
                            type="number"
                            min="0"
                            max="23"
                            value={scheduledTime.hours}
                            onChange={(e) => setScheduledTime(prev => ({ ...prev, hours: e.target.value }))}
                            className="w-16"
                          />
                        </div>
                        <div>
                          <Label>Minutes</Label>
                          <Input
                            type="number"
                            min="0"
                            max="59"
                            value={scheduledTime.minutes}
                            onChange={(e) => setScheduledTime(prev => ({ ...prev, minutes: e.target.value }))}
                            className="w-16"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    Schedule
                  </Button>
                  <Button
                    onClick={handleCreateNotification}
                    disabled={!formType || !formTitle || !formDescription}
                    className="bg-gray-900 hover:bg-gray-800 text-white"
                  >
                    Create notification
                  </Button>
                </div>

                {combinedScheduledDateTime && (
                  <p className="text-sm text-gray-600">
                    Scheduled for: {format(combinedScheduledDateTime, "PPP 'at' HH:mm")}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Right Side - Notifications List */}
            <div className="space-y-4 max-h-full overflow-y-auto">
              {notifications.map((notification) => (
                <Card key={notification.id} className="bg-white border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {notification.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {notification.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-blue-600 hover:underline cursor-pointer">
                        View more
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-[#FDF2F2] border-[#E02424] text-[#E02424] hover:bg-[#FDF2F2]/80"
                          onClick={() => handleDeleteNotification(notification.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-gray-900 text-white hover:bg-gray-800"
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="group-meetups" className="flex-1">
          <div className="text-center text-gray-500 mt-8">
            Group Meetups content coming soon...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messaging;