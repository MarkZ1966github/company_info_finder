import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }
    
    // Make the request server-side to avoid CORS issues
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Company Research Dashboard/1.0 (research-purposes; respectful-bot)',
        'Accept': 'text/html,application/xhtml+xml,application/xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 10000, // 10 second timeout
    });
    
    // Return the data
    return NextResponse.json({ 
      data: response.data,
      status: response.status,
      statusText: response.statusText
    });
  } catch (error: any) {
    console.error('Proxy error:', error.message);
    
    // Return error with appropriate status code
    return NextResponse.json(
      { 
        error: error.message,
        status: error.response?.status || 500,
        statusText: error.response?.statusText || 'Internal Server Error'
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Please use POST method with a URL in the request body' });
}