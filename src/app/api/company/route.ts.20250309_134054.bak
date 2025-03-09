import { NextResponse } from 'next/server';
import { getCompanyData } from '@/services/companyService';

// This is a simple API route that returns company data
export async function GET(request: Request) {
  // Parse the company name from the URL query parameters
  const url = new URL(request.url);
  const companyName = url.searchParams.get('company');
  
  if (!companyName) {
    return NextResponse.json({ error: 'Company name is required' }, { status: 400 });
  }
  
  try {
    // Get company data from our service
    const data = await getCompanyData(companyName);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching company data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company data' }, 
      { status: 500 }
    );
  }
}