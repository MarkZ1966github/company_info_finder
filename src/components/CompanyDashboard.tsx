"use client"

import { useState, useEffect } from 'react'
import CompanyOverview from './CompanyOverview'
import FinancialMetrics from './FinancialMetrics'
import LeadershipInfo from './LeadershipInfo'
import RiskAssessment from './RiskAssessment'
import ExportData from './ExportData'

interface CompanyDashboardProps {
  companyName: string
}

// Mock company data - in a real app, this would come from an API
const MOCK_COMPANY_DATA = {
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
  // Add mock data for other companies as needed
}

export default function CompanyDashboard({ companyName }: CompanyDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [companyData, setCompanyData] = useState<any>(null)

  useEffect(() => {
    // In a real app, we would fetch data from an API
    // For now, we'll use mock data
    if (MOCK_COMPANY_DATA[companyName as keyof typeof MOCK_COMPANY_DATA]) {
      setCompanyData(MOCK_COMPANY_DATA[companyName as keyof typeof MOCK_COMPANY_DATA])
    } else {
      // If company not found in mock data, create generic data
      setCompanyData({
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
      })
    }
  }, [companyName])

  if (!companyData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'financials', label: 'Financial Metrics' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'risk', label: 'Risk Assessment' },
  ]

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{companyData.name}</h2>
        <ExportData companyData={companyData} />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="py-4">
        {activeTab === 'overview' && <CompanyOverview company={companyData} />}
        {activeTab === 'financials' && <FinancialMetrics financials={companyData.financials} />}
        {activeTab === 'leadership' && <LeadershipInfo leadership={companyData.leadership} />}
        {activeTab === 'risk' && <RiskAssessment risk={companyData.risk} />}
      </div>
    </div>
  )
}