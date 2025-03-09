"use client"

import { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import CompanyDashboard from '@/components/CompanyDashboard'

export default function Home() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleCompanySelect = (company: string) => {
    setIsLoading(true)
    setSelectedCompany(company)
    // In a real app, we would fetch data here
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary-700">
        Company Research Dashboard
      </h1>
      
      <SearchBar onCompanySelect={handleCompanySelect} />
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : selectedCompany ? (
        <CompanyDashboard companyName={selectedCompany} />
      ) : (
        <div className="mt-16 text-center text-gray-500">
          <p className="text-xl">Search for a company to view detailed information</p>
          <p className="mt-4">Get insights on leadership, financials, and future predictions</p>
        </div>
      )}
    </div>
  )
}