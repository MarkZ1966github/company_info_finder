"use client"

import { useState, useEffect } from 'react'
import CompanyOverview from './CompanyOverview'
import FinancialMetrics from './FinancialMetrics'
import LeadershipInfo from './LeadershipInfo'
import RiskAssessment from './RiskAssessment'
import ExportData from './ExportData'
import DataSourceAttribution from './DataSourceAttribution'
import { getCompanyData } from '@/services/companyScraperService'

interface CompanyDashboardProps {
  companyName: string;
  websiteUrl?: string;
}

// Company data is now managed by the companyService

export default function CompanyDashboard({ companyName, websiteUrl }: CompanyDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [companyData, setCompanyData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data using our service
        const data = await getCompanyData(companyName, websiteUrl);
        setCompanyData(data);
      } catch (error) {
        console.error('Error fetching company data:', error);
        // Set generic data on error
        setCompanyData({
          name: companyName,
          ticker: 'ERROR',
          founded: 'Unknown',
          headquarters: 'Unknown',
          industry: 'Unknown',
          employees: 'Unknown',
          website: '',
          description: `Unable to fetch information for ${companyName}. Please try again later.`,
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
        });
      }
    };
    
    fetchData();
  }, [companyName, websiteUrl])

  if (!companyData) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
        <p className="text-gray-600">Searching for information about {companyName}...</p>
        <p className="text-gray-500 text-sm mt-2">This may take a moment as we gather data from various sources</p>
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
        
        {/* Data Source Attribution */}
        {companyData.dataSources && <DataSourceAttribution sources={companyData.dataSources} />}
      </div>
    </div>
  )
}