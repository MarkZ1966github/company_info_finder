"use client"

import { useState, useEffect, useRef } from 'react'

interface SearchBarProps {
  onCompanySelect: (company: string) => void
}

// Mock data for companies - in a real app, this would come from an API
const MOCK_COMPANIES = [
  'Apple Inc.',
  'Microsoft Corporation',
  'Amazon.com Inc.',
  'Alphabet Inc. (Google)',
  'Meta Platforms Inc. (Facebook)',
  'Tesla, Inc.',
  'NVIDIA Corporation',
  'JPMorgan Chase & Co.',
  'Johnson & Johnson',
  'Walmart Inc.'
]

export default function SearchBar({ onCompanySelect }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    
    if (value.trim() === '') {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }
    
    // Filter companies based on search term
    const filteredCompanies = MOCK_COMPANIES.filter(company => 
      company.toLowerCase().includes(value.toLowerCase())
    )
    
    setSuggestions(filteredCompanies)
    setShowSuggestions(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim() !== '') {
      onCompanySelect(searchTerm)
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (company: string) => {
    setSearchTerm(company)
    onCompanySelect(company)
    setShowSuggestions(false)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => searchTerm.trim() !== '' && setShowSuggestions(true)}
          placeholder="Search for a company..."
          className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-r-lg transition duration-200"
        >
          Search
        </button>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((company, index) => (
            <div 
              key={index}
              onClick={() => handleSuggestionClick(company)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {company}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}