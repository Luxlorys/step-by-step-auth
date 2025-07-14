import { useState } from "react";
import { Calendar, Clock, X, Search, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useToast } from "@/hooks/use-toast";
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

const mockSkillsInterests = [
  "JavaScript", "Python", "React", "Node.js", "TypeScript", "AWS",
  "Docker", "Kubernetes", "Machine Learning", "Data Science", "UI/UX Design",
  "Product Management", "Agile", "Scrum", "DevOps", "Cybersecurity",
  "Blockchain Development", "Mobile Development", "Full Stack", "Backend",
  "Frontend", "Database Design", "API Development", "Cloud Architecture",
  "Digital Marketing", "SEO", "Content Strategy", "Project Management",
  "Business Analysis", "Quality Assurance"
];

interface Contact {
  id: string;
  name: string;
  position: string;
  image: string;
  group: string;
}

const mockContacts: Contact[] = [
  { id: "1", name: "John Snow", position: "Finance Group", image: "/placeholder.svg", group: "Finance" },
  { id: "2", name: "Sarah Wilson", position: "Marketing Lead", image: "/placeholder.svg", group: "Marketing" },
  { id: "3", name: "Mike Johnson", position: "Tech Lead", image: "/placeholder.svg", group: "Technology" },
  { id: "4", name: "Emma Davis", position: "Product Manager", image: "/placeholder.svg", group: "Product" },
  { id: "5", name: "Alex Chen", position: "Designer", image: "/placeholder.svg", group: "Design" },
  { id: "6", name: "Lisa Brown", position: "HR Manager", image: "/placeholder.svg", group: "HR" },
  { id: "7", name: "David Lee", position: "Sales Director", image: "/placeholder.svg", group: "Sales" },
  { id: "8", name: "Anna Kim", position: "Operations Lead", image: "/placeholder.svg", group: "Operations" },
];

const Messaging = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  // Notification Form state
  const [formType, setFormType] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState({ hours: "09", minutes: "00" });
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Meetup Form state
  const [meetupTitle, setMeetupTitle] = useState("");
  const [meetupDescription, setMeetupDescription] = useState("");
  const [meetupTags, setMeetupTags] = useState<string[]>([]);
  const [meetupSkills, setMeetupSkills] = useState<string[]>([]);
  const [meetupDate, setMeetupDate] = useState<Date>();
  const [meetupTimeFrom, setMeetupTimeFrom] = useState("09:00");
  const [meetupTimeTo, setMeetupTimeTo] = useState("12:30");
  const [meetupLocation, setMeetupLocation] = useState("");
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  const [attendeeSearch, setAttendeeSearch] = useState("");
  const [showAttendeesDropdown, setShowAttendeesDropdown] = useState(false);

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

  const handleMeetupTagToggle = (tag: string) => {
    setMeetupTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleMeetupSkillToggle = (skill: string) => {
    setMeetupSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleAttendeeToggle = (attendeeId: string) => {
    setSelectedAttendees(prev => 
      prev.includes(attendeeId) 
        ? prev.filter(id => id !== attendeeId)
        : [...prev, attendeeId]
    );
  };

  const handleCreateMeetup = () => {
    toast({
      title: "Meetup created successfully!",
      description: "Your meetup has been scheduled and invitations will be sent.",
    });
    navigate("/dashboard/analytics");
  };

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(attendeeSearch.toLowerCase()) ||
    contact.position.toLowerCase().includes(attendeeSearch.toLowerCase())
  );

  const combinedScheduledDateTime = scheduledDate ? 
    new Date(scheduledDate.getFullYear(), scheduledDate.getMonth(), scheduledDate.getDate(), 
             parseInt(scheduledTime.hours), parseInt(scheduledTime.minutes)) : undefined;

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Messaging & Events</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
          <TabsTrigger value="group-meetups" className="flex-1">Group Meetups</TabsTrigger>
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

        <TabsContent value="group-meetups" className="flex-1 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Left Block */}
            <Card className="bg-[#FAFAFA] border-[#E2E8F0]">
              <CardHeader>
                <CardTitle>Meetup info</CardTitle>
                <p className="text-sm text-gray-600">
                  You can create meetups tailored to specific user groups, based on their 
                  availability and preferred days and times to ensure a convenient experience 
                  for participants.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Meetup title */}
                <div className="space-y-2">
                  <Label htmlFor="meetup-title">Meetup title</Label>
                  <Input
                    id="meetup-title"
                    value={meetupTitle}
                    onChange={(e) => setMeetupTitle(e.target.value)}
                    placeholder="Tech Innovation Meetup"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="meetup-description">Description</Label>
                  <Textarea
                    id="meetup-description"
                    value={meetupDescription}
                    onChange={(e) => setMeetupDescription(e.target.value)}
                    placeholder="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted..."
                    className="min-h-24"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="space-y-2">
                    {meetupTags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {meetupTags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm"
                          >
                            {tag}
                            <button
                              onClick={() => handleMeetupTagToggle(tag)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    <Select onValueChange={(value) => handleMeetupTagToggle(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={`${meetupTags.length} tags selected`} />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {mockTags.map(tag => (
                          <SelectItem
                            key={tag}
                            value={tag}
                            disabled={meetupTags.includes(tag)}
                          >
                            {tag}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Skills & Interests */}
                <div className="space-y-2">
                  <Label>Skills & interests</Label>
                  <div className="space-y-2">
                    {meetupSkills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {meetupSkills.map(skill => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1 bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm"
                          >
                            {skill}
                            <button
                              onClick={() => handleMeetupSkillToggle(skill)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    <Select onValueChange={(value) => handleMeetupSkillToggle(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={`${meetupSkills.length} tags selected`} />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {mockSkillsInterests.map(skill => (
                          <SelectItem
                            key={skill}
                            value={skill}
                            disabled={meetupSkills.includes(skill)}
                          >
                            {skill}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Block */}
            <div className="space-y-6">
              {/* Day & Time Card */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle>Day&Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Date Picker */}
                  <div className="space-y-2">
                    <Label>Select day</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !meetupDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {meetupDate ? format(meetupDate, "dd.MM.yyyy") : "23.05.2025"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={meetupDate}
                          onSelect={setMeetupDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Inputs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>From</Label>
                      <div className="relative">
                        <Input
                          type="time"
                          value={meetupTimeFrom}
                          onChange={(e) => setMeetupTimeFrom(e.target.value)}
                          className="pr-8"
                        />
                        <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>To</Label>
                      <div className="relative">
                        <Input
                          type="time"
                          value={meetupTimeTo}
                          onChange={(e) => setMeetupTimeTo(e.target.value)}
                          className="pr-8"
                        />
                        <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={meetupLocation}
                      onChange={(e) => setMeetupLocation(e.target.value)}
                      placeholder="DM Market, London, 456 -678"
                    />
                  </div>

                  {/* Match attendees */}
                  <div className="space-y-2">
                    <Label>Match atendees</Label>
                    <div className="space-y-2">
                      {selectedAttendees.length > 0 && (
                        <div className="p-3 bg-gray-50 rounded-lg border">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              {selectedAttendees.length} attendees selected
                            </span>
                            <button
                              onClick={() => setSelectedAttendees([])}
                              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                            >
                              Clear all <ChevronDown className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}
                      
                      <Popover open={showAttendeesDropdown} onOpenChange={setShowAttendeesDropdown}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between"
                          >
                            <span>{selectedAttendees.length} attendees selected</span>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                            {/* Search */}
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="Search"
                                value={attendeeSearch}
                                onChange={(e) => setAttendeeSearch(e.target.value)}
                                className="pl-9"
                              />
                            </div>

                            {/* Invite all option */}
                            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                              <Checkbox
                                checked={selectedAttendees.length === mockContacts.length}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedAttendees(mockContacts.map(c => c.id));
                                  } else {
                                    setSelectedAttendees([]);
                                  }
                                }}
                              />
                              <span className="font-medium">Invite all</span>
                            </div>

                            {/* Contacts list */}
                            {filteredContacts.map((contact) => (
                              <div key={contact.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                                <Checkbox
                                  checked={selectedAttendees.includes(contact.id)}
                                  onCheckedChange={() => handleAttendeeToggle(contact.id)}
                                />
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={contact.image} alt={contact.name} />
                                  <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{contact.name}</p>
                                  <p className="text-xs text-gray-500">{contact.position}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Create Meetup Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleCreateMeetup}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8"
                >
                  Create meetup
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messaging;