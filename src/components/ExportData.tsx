"use client"

import { useState } from 'react'

interface ExportDataProps {
  companyData: any
}

export default function ExportData({ companyData }: ExportDataProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = (format: 'csv' | 'excel') => {
    setIsExporting(true)
    
    try {
      // Convert company data to CSV format
      const csvData = convertToCSV(companyData)
      
      // Create a Blob containing the data
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
      
      // Create a link element to download the file
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      
      link.setAttribute('href', url)
      link.setAttribute('download', `${companyData.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_data.csv`)
      link.style.visibility = 'hidden'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      setTimeout(() => {
        setIsExporting(false)
      }, 1000)
    } catch (error) {
      console.error('Error exporting data:', error)
      setIsExporting(false)
    }
  }

  const convertToCSV = (data: any) => {
    // Basic company info
    let csvContent = 'Company Information\n'
    csvContent += 'Name,Ticker,Founded,Headquarters,Industry,Employees,Website\n'
    csvContent += `${data.name},${data.ticker},${data.founded},${data.headquarters},${data.industry},${data.employees},${data.website}\n\n`
    
    // Description
    csvContent += 'Description\n'
    csvContent += `"${data.description}"\n\n`
    
    // Financial data
    csvContent += 'Financial Data\n'
    csvContent += 'Year,Revenue (Billions),Profit (Billions)\n'
    for (let i = 0; i < data.financials.years.length; i++) {
      csvContent += `${data.financials.years[i]},${data.financials.revenue[i]},${data.financials.profit[i]}\n`
    }
    csvContent += '\n'
    
    // Financial metrics
    csvContent += 'Financial Metrics\n'
    csvContent += 'P/E Ratio,Market Cap,Dividend Yield,Debt to Equity\n'
    csvContent += `${data.financials.metrics.peRatio},${data.financials.metrics.marketCap},${data.financials.metrics.dividendYield},${data.financials.metrics.debtToEquity}\n\n`
    
    // Leadership
    csvContent += 'Leadership\n'
    csvContent += 'Name,Position,Since\n'
    data.leadership.forEach((leader: any) => {
      csvContent += `${leader.name},${leader.position},${leader.since}\n`
    })
    csvContent += '\n'
    
    // Risk assessment
    csvContent += 'Risk Assessment\n'
    csvContent += 'Overall Risk,Success Probability\n'
    csvContent += `${data.risk.overall},${data.risk.successProbability}\n\n`
    
    // Risk factors
    if (data.risk.factors.length > 0) {
      csvContent += 'Risk Factors\n'
      csvContent += 'Factor,Score\n'
      data.risk.factors.forEach((factor: any) => {
        csvContent += `${factor.name},${factor.score}\n`
      })
    }
    
    return csvContent
  }

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => handleExport('csv')}
        disabled={isExporting}
        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center"
      >
        {isExporting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Exporting...
          </>
        ) : (
          <>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Export CSV
          </>
        )}
      </button>
    </div>
  )
}