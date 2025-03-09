"use client"

interface CompanyOverviewProps {
  company: {
    name: string
    ticker: string
    founded: string
    headquarters: string
    industry: string
    employees: string
    website: string
    description: string
  }
}

export default function CompanyOverview({ company }: CompanyOverviewProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Company Profile</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Ticker Symbol</span>
              <span className="font-medium">{company.ticker}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Founded</span>
              <span className="font-medium">{company.founded}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Headquarters</span>
              <span className="font-medium">{company.headquarters}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Industry</span>
              <span className="font-medium">{company.industry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Employees</span>
              <span className="font-medium">{company.employees}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Website</span>
              <a 
                href={`https://${company.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                {company.website}
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Company Description</h3>
          <p className="text-gray-700 leading-relaxed">{company.description}</p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent News</h3>
        <div className="space-y-4">
          <p className="text-gray-500 italic">
            In a real application, recent news articles about {company.name} would be displayed here.
          </p>
          <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-400">News feed would be integrated here</p>
          </div>
        </div>
      </div>
    </div>
  )
}