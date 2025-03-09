import { NextResponse } from 'next/server';
import { searchCompanies } from '@/services/companyService';

// This is a simple API route that returns company search results
export async function GET(request: Request) {
  // Parse the query from the URL query parameters
  const url = new URL(request.url);
  const query = url.searchParams.get('q');
  
  if (!query) {
    return NextResponse.json({ results: [] });
  }
  
  try {
    // Search companies using our service
    const results = await searchCompanies(query);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error searching companies:', error);
    return NextResponse.json(
      { error: 'Failed to search companies', results: [] }, 
      { status: 500 }
    );
  }
}