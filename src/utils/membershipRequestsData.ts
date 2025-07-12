
export interface MembershipRequest {
  id: string;
  fullName: string;
  email: string;
  status: 'Approved' | 'Awaiting approval' | 'Declined';
  joinedDate: string;
  tags: string[];
}

export const mockRequests: MembershipRequest[] = [
  {
    id: '1',
    fullName: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    status: 'Approved',
    joinedDate: '25.03.2025',
    tags: ['Marketing', 'VIP']
  },
  {
    id: '2',
    fullName: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    status: 'Awaiting approval',
    joinedDate: '24.03.2025',
    tags: ['Tech', 'Sales']
  },
  {
    id: '3',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    status: 'Declined',
    joinedDate: '23.03.2025',
    tags: ['Finance', 'Consulting']
  },
  {
    id: '4',
    fullName: 'Emily Davis',
    email: 'emily.davis@example.com',
    status: 'Approved',
    joinedDate: '22.03.2025',
    tags: ['HR', 'Management']
  },
  {
    id: '5',
    fullName: 'Alex Brown',
    email: 'alex.brown@example.com',
    status: 'Awaiting approval',
    joinedDate: '21.03.2025',
    tags: ['Operations', 'VIP']
  },
  {
    id: '6',
    fullName: 'Lisa Miller',
    email: 'lisa.miller@example.com',
    status: 'Approved',
    joinedDate: '20.03.2025',
    tags: ['Business analysis', 'Tech']
  },
  {
    id: '7',
    fullName: 'Tom Wilson',
    email: 'tom.wilson@example.com',
    status: 'Awaiting approval',
    joinedDate: '19.03.2025',
    tags: ['Marketing', 'Sales']
  },
  {
    id: '8',
    fullName: 'Kate Anderson',
    email: 'kate.anderson@example.com',  
    status: 'Declined',
    joinedDate: '18.03.2025',
    tags: ['Finance']
  },
  {
    id: '9',
    fullName: 'David Taylor',
    email: 'david.taylor@example.com',
    status: 'Approved',
    joinedDate: '17.03.2025',
    tags: ['Tech', 'Management', 'VIP']
  },
  {
    id: '10',
    fullName: 'Anna Martinez',
    email: 'anna.martinez@example.com',
    status: 'Awaiting approval',
    joinedDate: '16.03.2025',
    tags: ['HR', 'Operations']
  },
  {
    id: '11',
    fullName: 'Chris Garcia',
    email: 'chris.garcia@example.com',
    status: 'Approved',
    joinedDate: '15.03.2025',
    tags: ['Consulting', 'Business analysis']
  },
  {
    id: '12',
    fullName: 'Rachel White',
    email: 'rachel.white@example.com',
    status: 'Declined',
    joinedDate: '14.03.2025',
    tags: ['Sales', 'Marketing']
  },
  {
    id: '13',
    fullName: 'Mark Thompson',
    email: 'mark.thompson@example.com',
    status: 'Awaiting approval',
    joinedDate: '13.03.2025',
    tags: ['Tech', 'Operations']
  }
];
