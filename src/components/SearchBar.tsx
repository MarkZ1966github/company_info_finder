"use client"

import { useState, useEffect, useRef } from 'react'
import { searchCompanies } from '@/services/companyScraperService'

interface SearchBarProps {
  onCompanySelect: (company: string, website?: string) => void
}


export default function SearchBar({ onCompanySelect }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
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

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    
    if (value.trim() === '') {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }
    
    // Search companies using the service
    try {
      const results = await searchCompanies(value)
      setSuggestions(results)
      setShowSuggestions(results.length > 0)
    } catch (error) {
      console.error('Error searching companies:', error)
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim() !== '') {
      onCompanySelect(searchTerm, websiteUrl.trim() || undefined)
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (company: string) => {
    setSearchTerm(company)
    onCompanySelect(company, websiteUrl.trim() || undefined)
    setShowSuggestions(false)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="mb-2 text-sm text-gray-600">Enter a company name and optionally its website URL for better results</div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => searchTerm.trim() !== '' && setShowSuggestions(true)}
          placeholder="Search for a company (e.g., Apple, Tesla)..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <input
          type="text"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          placeholder="Company website URL (optional, e.g., apple.com)..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition duration-200"
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