export interface ChartDataPoint {
  day: number;
  activeSubscriptions: number;
  newSubscriptions: number;
  unsubscribes: number;
}

export interface MeetupTopicDataPoint {
  x: number;
  y: number;
  topic: string;
  size: number;
}

export interface DayTimeSlot {
  day: string;
  time: string;
  slot: string;
  count: number;
  color: string;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  avatar: string;
  notificationStatus: 'Clicked' | 'Not clicked';
  invitationResponse: 'Accepted' | 'Declined';
  rating: number;
  feedback: string;
}

export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

export interface FilterProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
}