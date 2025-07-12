
export interface MembershipRequest {
  id: string;
  fullName: string;
  email: string;
  status: 'Approved' | 'Awaiting approval' | 'Declined';
  joinedDate: string;
}

const statusOptions: MembershipRequest['status'][] = ['Approved', 'Awaiting approval', 'Declined'];

// Generate random date within last 6 months
const generateRandomDate = () => {
  const start = new Date();
  start.setMonth(start.getMonth() - 6);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString('en-GB');
};

// Generate random full names
const generateRandomName = () => {
  const firstNames = ['Sarah', 'Mike', 'John', 'Marco', 'Alex', 'Emma', 'David', 'Lisa', 'Tom', 'Anna', 'Chris', 'Sophie', 'Ryan', 'Kate', 'Luke', 'Alice', 'Ben', 'Clara', 'Dan', 'Eva'];
  const lastNames = ['Williams', 'Johnson', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

// Generate random email based on name
const generateEmailFromName = (fullName: string) => {
  const domains = ['gmail.com', 'outlook.com', 'company.com', 'business.org'];
  const name = fullName.toLowerCase().replace(' ', '.');
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${name}@${domain}`;
};

// Generate mock membership requests
export const generateMockRequests = (count: number): MembershipRequest[] => {
  return Array.from({ length: count }, (_, index) => {
    const fullName = generateRandomName();
    return {
      id: `request-${index + 1}`,
      fullName,
      email: generateEmailFromName(fullName),
      status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
      joinedDate: generateRandomDate(),
    };
  });
};

// Generate 50 mock requests for pagination demo
export const mockRequests = generateMockRequests(50);
