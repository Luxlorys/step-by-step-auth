export interface JoinRequest {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  networkName: string;
  networkType: string;
  networkSize: string;
  networkDescription: string;
  organizationName: string;
  country: string;
  city: string;
  street: string;
  postCode: string;
  companyNumber: string;
  vatNumber: string;
}

const firstNames = [
  "John", "Sarah", "Michael", "Emma", "David", "Lisa", "James", "Anna", 
  "Robert", "Maria", "William", "Jennifer", "Richard", "Michelle", "Thomas",
  "Amanda", "Christopher", "Jessica", "Daniel", "Ashley", "Matthew", "Emily"
];

const lastNames = [
  "Anderson", "Johnson", "Williams", "Brown", "Davis", "Miller", "Wilson",
  "Moore", "Taylor", "Thomas", "Jackson", "White", "Harris", "Martin",
  "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis"
];

const networkNames = [
  "TechCorp Solutions", "Global Dynamics", "Innovation Labs", "Enterprise Systems",
  "Digital Frontiers", "Smart Solutions", "Future Tech", "Advanced Analytics",
  "Cloud Networks", "Data Insights", "Cyber Security Pro", "AI Innovations",
  "Blockchain Ventures", "Mobile Solutions", "Web Technologies", "Software Architects"
];

const networkTypes = ["Official", "Community", "Partner", "Subsidiary"];

const countries = [
  "United States", "United Kingdom", "Germany", "France", "Canada", 
  "Australia", "Netherlands", "Sweden", "Switzerland", "Japan"
];

const cities = {
  "United States": ["San Francisco", "New York", "Los Angeles", "Chicago", "Austin"],
  "United Kingdom": ["London", "Manchester", "Birmingham", "Edinburgh", "Bristol"],
  "Germany": ["Berlin", "Munich", "Hamburg", "Cologne", "Frankfurt"],
  "France": ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"],
  "Canada": ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  "Netherlands": ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
  "Sweden": ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås"],
  "Switzerland": ["Zurich", "Geneva", "Basel", "Bern", "Lausanne"],
  "Japan": ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya"]
};

const businessDescriptions = [
  "Leading provider of enterprise software solutions and digital transformation services.",
  "Innovative technology company focused on artificial intelligence and machine learning.",
  "Global consulting firm specializing in business process optimization.",
  "Cutting-edge fintech company revolutionizing payment systems.",
  "Healthcare technology provider delivering next-generation medical solutions.",
  "Sustainable energy solutions company driving the green revolution.",
  "E-commerce platform enabling seamless online business operations.",
  "Cybersecurity firm protecting businesses from digital threats.",
  "Cloud infrastructure provider supporting scalable business growth.",
  "Data analytics company transforming raw data into actionable insights."
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generatePhoneNumber(country: string): string {
  const formats = {
    "United States": () => `+1 (${Math.floor(Math.random() * 900 + 100)}) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
    "United Kingdom": () => `+44 ${Math.floor(Math.random() * 9000 + 1000)} ${Math.floor(Math.random() * 900000 + 100000)}`,
    "Germany": () => `+49 ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 9000000 + 1000000)}`,
    "France": () => `+33 ${Math.floor(Math.random() * 9 + 1)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)}`,
    "Canada": () => `+1 (${Math.floor(Math.random() * 900 + 100)}) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
    "Australia": () => `+61 ${Math.floor(Math.random() * 9 + 1)} ${Math.floor(Math.random() * 9000 + 1000)} ${Math.floor(Math.random() * 9000 + 1000)}`,
    "Netherlands": () => `+31 ${Math.floor(Math.random() * 9 + 1)} ${Math.floor(Math.random() * 9000000 + 1000000)}`,
    "Sweden": () => `+46 ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900000 + 100000)}`,
    "Switzerland": () => `+41 ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)}`,
    "Japan": () => `+81 ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 9000 + 1000)} ${Math.floor(Math.random() * 9000 + 1000)}`
  };
  
  const formatFn = formats[country as keyof typeof formats];
  return formatFn ? formatFn() : `+1 (555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;
}

function generatePostCode(country: string): string {
  const formats = {
    "United States": () => `${Math.floor(Math.random() * 90000 + 10000)}`,
    "United Kingdom": () => `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
    "Germany": () => `${Math.floor(Math.random() * 90000 + 10000)}`,
    "France": () => `${Math.floor(Math.random() * 90000 + 10000)}`,
    "Canada": () => `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 10)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))} ${Math.floor(Math.random() * 10)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 10)}`,
    "Australia": () => `${Math.floor(Math.random() * 9000 + 1000)}`,
    "Netherlands": () => `${Math.floor(Math.random() * 9000 + 1000)} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
    "Sweden": () => `${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 90 + 10)}`,
    "Switzerland": () => `${Math.floor(Math.random() * 9000 + 1000)}`,
    "Japan": () => `${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`
  };
  
  const formatFn = formats[country as keyof typeof formats];
  return formatFn ? formatFn() : `${Math.floor(Math.random() * 90000 + 10000)}`;
}

function generateCompanyNumber(country: string): string {
  const prefixes = {
    "United States": "CO",
    "United Kingdom": "UK",
    "Germany": "DE",
    "France": "FR",
    "Canada": "CA",
    "Australia": "AU",
    "Netherlands": "NL",
    "Sweden": "SE",
    "Switzerland": "CH",
    "Japan": "JP"
  };
  
  const prefix = prefixes[country as keyof typeof prefixes] || "CO";
  return `${prefix}${Math.floor(Math.random() * 900000000 + 100000000)}`;
}

function generateVATNumber(country: string): string {
  const prefixes = {
    "United States": "US",
    "United Kingdom": "GB",
    "Germany": "DE",
    "France": "FR",
    "Canada": "CA",
    "Australia": "AU",
    "Netherlands": "NL",
    "Sweden": "SE",
    "Switzerland": "CHE",
    "Japan": "JP"
  };
  
  const prefix = prefixes[country as keyof typeof prefixes] || "US";
  return `${prefix}${Math.floor(Math.random() * 900000000 + 100000000)}`;
}

export function generateJoinRequest(id: number): JoinRequest {
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  const country = getRandomElement(countries);
  const city = getRandomElement(cities[country as keyof typeof cities]);
  const networkName = getRandomElement(networkNames);
  
  return {
    id,
    fullName: `${firstName} ${lastName}`,
    phoneNumber: generatePhoneNumber(country),
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${networkName.toLowerCase().replace(/\s+/g, '')}.com`,
    networkName,
    networkType: getRandomElement(networkTypes),
    networkSize: `${Math.floor(Math.random() * 900 + 100)} members`,
    networkDescription: getRandomElement(businessDescriptions),
    organizationName: `${networkName} ${getRandomElement(["Ltd.", "Inc.", "Corp.", "LLC", "GmbH", "S.A."])}`,
    country,
    city,
    street: `${Math.floor(Math.random() * 9999 + 1)} ${getRandomElement(["Main", "Tech", "Business", "Innovation", "Enterprise", "Digital"])} ${getRandomElement(["Street", "Avenue", "Boulevard", "Drive", "Way"])}`,
    postCode: generatePostCode(country),
    companyNumber: generateCompanyNumber(country),
    vatNumber: generateVATNumber(country)
  };
}

export function generateMultipleJoinRequests(count: number): JoinRequest[] {
  return Array.from({ length: count }, (_, index) => generateJoinRequest(index + 1));
}

export const mockJoinRequests: JoinRequest[] = generateMultipleJoinRequests(25);