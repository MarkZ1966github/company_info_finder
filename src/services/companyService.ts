import axios from 'axios';

// Extended mock company data for more companies
export const MOCK_COMPANY_DATA: Record<string, any> = {
  'Apple Inc.': {
    name: 'Apple Inc.',
    ticker: 'AAPL',
    founded: '1976',
    headquarters: 'Cupertino, California, USA',
    industry: 'Consumer Electronics, Software',
    employees: '147,000+',
    website: 'apple.com',
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, Mac, iPad, and wearables, home, and accessories.',
    leadership: [
      { name: 'Tim Cook', position: 'CEO', since: '2011' },
      { name: 'Luca Maestri', position: 'CFO', since: '2014' },
      { name: 'Jeff Williams', position: 'COO', since: '2015' }
    ],
    financials: {
      revenue: [267.7, 274.5, 365.8, 394.3, 383.3],
      profit: [57.4, 59.5, 94.7, 99.8, 96.9],
      years: ['2019', '2020', '2021', '2022', '2023'],
      metrics: {
        peRatio: 28.5,
        marketCap: '2.78T',
        dividendYield: '0.50%',
        debtToEquity: 1.76
      }
    },
    risk: {
      overall: 'Low',
      factors: [
        { name: 'Market Competition', score: 3 },
        { name: 'Supply Chain Disruption', score: 4 },
        { name: 'Regulatory Changes', score: 2 },
        { name: 'Innovation Pace', score: 1 }
      ],
      successProbability: 0.85
    }
  },
  'Microsoft Corporation': {
    name: 'Microsoft Corporation',
    ticker: 'MSFT',
    founded: '1975',
    headquarters: 'Redmond, Washington, USA',
    industry: 'Software, Cloud Computing, Hardware',
    employees: '181,000+',
    website: 'microsoft.com',
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates through three segments: Productivity and Business Processes, Intelligent Cloud, and More Personal Computing.',
    leadership: [
      { name: 'Satya Nadella', position: 'CEO', since: '2014' },
      { name: 'Amy Hood', position: 'CFO', since: '2013' },
      { name: 'Brad Smith', position: 'President', since: '2015' }
    ],
    financials: {
      revenue: [125.8, 143.0, 168.1, 198.3, 211.9],
      profit: [39.2, 44.3, 61.3, 72.7, 77.5],
      years: ['2019', '2020', '2021', '2022', '2023'],
      metrics: {
        peRatio: 32.1,
        marketCap: '2.82T',
        dividendYield: '0.73%',
        debtToEquity: 0.42
      }
    },
    risk: {
      overall: 'Very Low',
      factors: [
        { name: 'Market Competition', score: 2 },
        { name: 'Security Breaches', score: 3 },
        { name: 'Regulatory Changes', score: 2 },
        { name: 'Innovation Pace', score: 1 }
      ],
      successProbability: 0.92
    }
  },
  'Amazon.com Inc.': {
    name: 'Amazon.com Inc.',
    ticker: 'AMZN',
    founded: '1994',
    headquarters: 'Seattle, Washington, USA',
    industry: 'E-commerce, Cloud Computing, Digital Streaming',
    employees: '1,540,000+',
    website: 'amazon.com',
    description: 'Amazon.com Inc. engages in the retail sale of consumer products and subscriptions through online and physical stores. It also focuses on the manufacture and sale of electronic devices, and provides advertising services and web services.',
    leadership: [
      { name: 'Andy Jassy', position: 'CEO', since: '2021' },
      { name: 'Brian Olsavsky', position: 'CFO', since: '2015' },
      { name: 'Dave Clark', position: 'CEO Worldwide Consumer', since: '2021' }
    ],
    financials: {
      revenue: [280.5, 386.1, 469.8, 513.9, 574.8],
      profit: [11.6, 21.3, 33.4, 12.2, 30.4],
      years: ['2019', '2020', '2021', '2022', '2023'],
      metrics: {
        peRatio: 42.7,
        marketCap: '1.84T',
        dividendYield: '0%',
        debtToEquity: 0.89
      }
    },
    risk: {
      overall: 'Low',
      factors: [
        { name: 'Market Competition', score: 2 },
        { name: 'Regulatory Scrutiny', score: 5 },
        { name: 'Labor Relations', score: 4 },
        { name: 'Supply Chain Disruption', score: 3 }
      ],
      successProbability: 0.88
    }
  },
  'Alphabet Inc. (Google)': {
    name: 'Alphabet Inc. (Google)',
    ticker: 'GOOGL',
    founded: '1998',
    headquarters: 'Mountain View, California, USA',
    industry: 'Internet Content & Information, Cloud Computing',
    employees: '156,000+',
    website: 'abc.xyz',
    description: 'Alphabet Inc. offers various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America. It operates through Google Services, Google Cloud, and Other Bets segments.',
    leadership: [
      { name: 'Sundar Pichai', position: 'CEO', since: '2015' },
      { name: 'Ruth Porat', position: 'CFO', since: '2015' },
      { name: 'Philipp Schindler', position: 'Chief Business Officer', since: '2015' }
    ],
    financials: {
      revenue: [161.9, 182.5, 257.6, 282.8, 307.4],
      profit: [34.3, 40.3, 76.0, 59.7, 73.8],
      years: ['2019', '2020', '2021', '2022', '2023'],
      metrics: {
        peRatio: 21.8,
        marketCap: '1.91T',
        dividendYield: '0%',
        debtToEquity: 0.06
      }
    },
    risk: {
      overall: 'Low',
      factors: [
        { name: 'Regulatory Scrutiny', score: 5 },
        { name: 'Market Competition', score: 2 },
        { name: 'Privacy Concerns', score: 4 },
        { name: 'Innovation Pace', score: 1 }
      ],
      successProbability: 0.87
    }
  },
  'Meta Platforms Inc. (Facebook)': {
    name: 'Meta Platforms Inc. (Facebook)',
    ticker: 'META',
    founded: '2004',
    headquarters: 'Menlo Park, California, USA',
    industry: 'Social Media, Virtual Reality, Advertising',
    employees: '86,000+',
    website: 'meta.com',
    description: 'Meta Platforms, Inc. develops products that enable people to connect and share with friends and family through mobile devices, personal computers, virtual reality headsets, and wearables worldwide. It operates in two segments, Family of Apps and Reality Labs.',
    leadership: [
      { name: 'Mark Zuckerberg', position: 'CEO', since: '2004' },
      { name: 'Susan Li', position: 'CFO', since: '2022' },
      { name: 'Javier Olivan', position: 'COO', since: '2022' }
    ],
    financials: {
      revenue: [70.7, 86.0, 117.9, 116.6, 134.9],
      profit: [18.5, 29.1, 39.4, 23.2, 39.1],
      years: ['2019', '2020', '2021', '2022', '2023'],
      metrics: {
        peRatio: 26.3,
        marketCap: '1.19T',
        dividendYield: '0.45%',
        debtToEquity: 0.18
      }
    },
    risk: {
      overall: 'Moderate',
      factors: [
        { name: 'Regulatory Scrutiny', score: 5 },
        { name: 'Privacy Concerns', score: 5 },
        { name: 'Market Competition', score: 3 },
        { name: 'User Engagement', score: 2 }
      ],
      successProbability: 0.75
    }
  },
  'Tesla, Inc.': {
    name: 'Tesla, Inc.',
    ticker: 'TSLA',
    founded: '2003',
    headquarters: 'Austin, Texas, USA',
    industry: 'Automotive, Clean Energy',
    employees: '127,000+',
    website: 'tesla.com',
    description: 'Tesla, Inc. designs, develops, manufactures, sells, and leases electric vehicles and energy generation and storage systems. The company operates in two segments, Automotive, and Energy Generation and Storage.',
    leadership: [
      { name: 'Elon Musk', position: 'CEO', since: '2008' },
      { name: 'Zachary Kirkhorn', position: 'CFO', since: '2019' },
      { name: 'Drew Baglino', position: 'SVP, Powertrain and Energy Engineering', since: '2019' }
    ],
    financials: {
      revenue: [24.6, 31.5, 53.8, 81.5, 96.8],
      profit: [0.9, 0.7, 5.5, 12.6, 14.1],
      years: ['2019', '2020', '2021', '2022', '2023'],
      metrics: {
        peRatio: 54.8,
        marketCap: '695.6B',
        dividendYield: '0%',
        debtToEquity: 0.11
      }
    },
    risk: {
      overall: 'Moderate',
      factors: [
        { name: 'Production Challenges', score: 4 },
        { name: 'Market Competition', score: 3 },
        { name: 'Regulatory Changes', score: 3 },
        { name: 'Leadership Dependence', score: 5 }
      ],
      successProbability: 0.72
    }
  },
  'NVIDIA Corporation': {
    name: 'NVIDIA Corporation',
    ticker: 'NVDA',
    founded: '1993',
    headquarters: 'Santa Clara, California, USA',
    industry: 'Semiconductors, AI Computing',
    employees: '26,000+',
    website: 'nvidia.com',
    description: 'NVIDIA Corporation provides graphics, computing, and networking solutions in the United States, Taiwan, China, and internationally. The company operates through Graphics and Compute & Networking segments.',
    leadership: [
      { name: 'Jensen Huang', position: 'CEO', since: '1993' },
      { name: 'Colette Kress', position: 'CFO', since: '2013' },
      { name: 'Debora Shoquist', position: 'EVP of Operations', since: '2009' }
    ],
    financials: {
      revenue: [10.9, 16.7, 26.9, 27.0, 60.9],
      profit: [2.8, 4.3, 9.8, 4.4, 29.8],
      years: ['2019', '2020', '2021', '2022', '2023'],
      metrics: {
        peRatio: 73.2,
        marketCap: '2.38T',
        dividendYield: '0.03%',
        debtToEquity: 0.01
      }
    },
    risk: {
      overall: 'Low',
      factors: [
        { name: 'Market Competition', score: 2 },
        { name: 'Supply Chain Disruption', score: 3 },
        { name: 'Regulatory Changes', score: 2 },
        { name: 'AI Demand Sustainability', score: 3 }
      ],
      successProbability: 0.89
    }
  },
  'JPMorgan Chase & Co.': {
    name: 'JPMorgan Chase & Co.',
    ticker: 'JPM',
    founded: '1799',
    headquarters: 'New York, New York, USA',
    industry: 'Financial Services, Banking',
    employees: '293,000+',
    website: 'jpmorganchase.com',
    description: 'JPMorgan Chase & Co. operates as a financial services company worldwide. It operates through four segments: Consumer & Community Banking, Corporate & Investment Bank, Commercial Banking, and Asset & Wealth Management.',
    leadership: [
      { name: 'Jamie Dimon', position: 'CEO', since: '2005' },
      { name: 'Jeremy Barnum', position: 'CFO', since: '2021' },
      { name: 'Daniel Pinto', position: 'President and COO', since: '2018' }
    ],
    financials: {
      revenue: [115.6, 119.5, 121.6, 128.7, 154.9],
      profit: [36.4, 29.1, 48.3, 37.7, 49.6],
      years: ['2019', '2020', '2021', '2022', '2023'],
      metrics: {
        peRatio: 12.1,
        marketCap: '544.2B',
        dividendYield: '2.20%',
        debtToEquity: 1.18
      }
    },
    risk: {
      overall: 'Low',
      factors: [
        { name: 'Economic Downturn', score: 4 },
        { name: 'Regulatory Changes', score: 3 },
        { name: 'Cybersecurity Threats', score: 3 },
        { name: 'Market Competition', score: 2 }
      ],
      successProbability: 0.82
    }
  },
  'Johnson & Johnson': {
    name: 'Johnson & Johnson',
    ticker: 'JNJ',
    founded: '1886',
    headquarters: 'New Brunswick, New Jersey, USA',
    industry: 'Pharmaceuticals, Medical Devices, Consumer Health',
    employees: '142,000+',
    website: 'jnj.com',
    description: 'Johnson & Johnson researches, develops, manufactures, and sells various products in the healthcare field worldwide. It operates through three segments: Consumer Health, Pharmaceutical, and Medical Devices.',
    leadership: [
      { name: 'Joaquin Duato', position: 'CEO', since: '2022' },
      { name: 'Joseph Wolk', position: 'CFO', since: '2018' },
      { name: 'Peter Fasolo', position: 'EVP, Chief HR Officer', since: '2016' }
    ],
    financials: {
      revenue: [82.1, 82.6, 93.8, 94.9, 85.2],
      profit: [15.1, 14.7, 20.9, 17.9, 13.3],
      years: ['2019', '2020', '2021', '2022', '2023'],
      metrics: {
        peRatio: 15.8,
        marketCap: '379.5B',
        dividendYield: '3.20%',
        debtToEquity: 0.44
      }
    },
    risk: {
      overall: 'Low',
      factors: [
        { name: 'Litigation Risk', score: 4 },
        { name: 'Regulatory Changes', score: 3 },
        { name: 'Market Competition', score: 2 },
        { name: 'R&D Success Rate', score: 3 }
      ],
      successProbability: 0.84
    }
  },
  'Walmart Inc.': {
    name: 'Walmart Inc.',
    ticker: 'WMT',
    founded: '1962',
    headquarters: 'Bentonville, Arkansas, USA',
    industry: 'Retail, E-commerce',
    employees: '2,100,000+',
    website: 'walmart.com',
    description: 'Walmart Inc. engages in the operation of retail, wholesale, and other units worldwide. The company operates through three segments: Walmart U.S., Walmart International, and Sam's Club.',
    leadership: [
      { name: 'Doug McMillon', position: 'CEO', since: '2014' },
      { name: 'John David Rainey', position: 'CFO', since: '2022' },
      { name: 'Judith McKenna', position: 'President and CEO, Walmart International', since: '2018' }
    ],
    financials: {
      revenue: [523.9, 559.2, 572.8, 611.3, 648.1],
      profit: [14.9, 13.7, 13.5, 11.7, 15.5],
      years: ['2019', '2020', '2021', '2022', '2023'],
      metrics: {
        peRatio: 28.7,
        marketCap: '428.9B',
        dividendYield: '1.40%',
        debtToEquity: 0.71
      }
    },
    risk: {
      overall: 'Very Low',
      factors: [
        { name: 'Market Competition', score: 2 },
        { name: 'Labor Relations', score: 3 },
        { name: 'Supply Chain Disruption', score: 3 },
        { name: 'E-commerce Transition', score: 2 }
      ],
      successProbability: 0.91
    }
  }
};

// List of all available companies for search
export const AVAILABLE_COMPANIES = Object.keys(MOCK_COMPANY_DATA);

// Function to search for companies by name
export const searchCompanies = async (query: string): Promise<string[]> => {
  // In a real app, this would be an API call
  // For now, we'll filter our mock data
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query.trim()) return [];
    
    const normalizedQuery = query.toLowerCase().trim();
    return AVAILABLE_COMPANIES.filter(company => 
      company.toLowerCase().includes(normalizedQuery)
    );
  } catch (error) {
    console.error('Error searching for companies:', error);
    return [];
  }
};

// Function to get detailed company data
export const getCompanyData = async (companyName: string): Promise<any> => {
  // In a real app, this would be an API call
  // For now, we'll use our mock data
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // First try exact match
    if (MOCK_COMPANY_DATA[companyName]) {
      return MOCK_COMPANY_DATA[companyName];
    }
    
    // Try case-insensitive match
    const matchedCompany = AVAILABLE_COMPANIES.find(
      company => company.toLowerCase() === companyName.toLowerCase()
    );
    
    if (matchedCompany && MOCK_COMPANY_DATA[matchedCompany]) {
      return MOCK_COMPANY_DATA[matchedCompany];
    }
    
    // Try partial match
    const partialMatch = AVAILABLE_COMPANIES.find(
      company => company.toLowerCase().includes(companyName.toLowerCase())
    );
    
    if (partialMatch && MOCK_COMPANY_DATA[partialMatch]) {
      return MOCK_COMPANY_DATA[partialMatch];
    }
    
    // If no match found, return generic data
    return {
      name: companyName,
      ticker: 'UNKNOWN',
      founded: 'Unknown',
      headquarters: 'Unknown',
      industry: 'Unknown',
      employees: 'Unknown',
      website: '',
      description: `Information for ${companyName} is currently being compiled.`,
      leadership: [],
      financials: {
        revenue: [0, 0, 0, 0, 0],
        profit: [0, 0, 0, 0, 0],
        years: ['2019', '2020', '2021', '2022', '2023'],
        metrics: {
          peRatio: 0,
          marketCap: 'Unknown',
          dividendYield: 'Unknown',
          debtToEquity: 0
        }
      },
      risk: {
        overall: 'Unknown',
        factors: [],
        successProbability: 0.5
      }
    };
  } catch (error) {
    console.error('Error fetching company data:', error);
    throw new Error('Failed to fetch company data');
  }
};