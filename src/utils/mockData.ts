
export interface Member {
  id: string;
  email: string;
  tags: string[];
  status: 'Joined' | 'Invited';
  joinedDate: string;
}

const tagOptions = [
  'Business analysis', 'Marketing', 'VIP', 'Management', 'Tech', 
  'Sales', 'Consulting', 'Finance', 'HR', 'Operations'
];

const statusOptions: Member['status'][] = ['Joined', 'Invited'];

// Generate random date within last 6 months
const generateRandomDate = () => {
  const start = new Date();
  start.setMonth(start.getMonth() - 6);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString('en-GB');
};

// Generate random email
const generateRandomEmail = () => {
  const names = ['sarah.w', 'mike.j', 'john.doe', 'marco.bosco', 'alex.smith', 'emma.jones', 'david.brown', 'lisa.white', 'tom.wilson', 'anna.davis', 'chris.taylor', 'sophie.miller', 'ryan.johnson', 'kate.anderson', 'luke.thomas'];
  const domains = ['gmail.com', 'outlook.com', 'company.com', 'business.org'];
  const name = names[Math.floor(Math.random() * names.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${name}@${domain}`;
};

// Generate random tags (1-4 tags per member)
const generateRandomTags = () => {
  const numTags = Math.floor(Math.random() * 4) + 1;
  const shuffled = [...tagOptions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numTags);
};

// Generate mock members data
export const generateMockMembers = (count: number): Member[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `member-${index + 1}`,
    email: generateRandomEmail(),
    tags: generateRandomTags(),
    status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
    joinedDate: generateRandomDate(),
  }));
};

// Generate 50 mock members for pagination demo
export const mockMembers = generateMockMembers(50);
