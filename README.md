# Company Research Dashboard

A comprehensive tool for researching companies, their leadership, financials, and predicting their future success or failure. This version includes live web scraping capabilities to gather real-time company data from public sources.

## Features

- Search for any company by name and website URL
- View detailed company information including:
  - Current and past leadership
  - Financial performance trends
  - Board members and compensation
  - Risk assessment and future predictions
- Interactive data visualizations:
  - Revenue and profit trends
  - Success/failure probability charts
  - Key financial metrics
- Data export functionality (CSV)
- Responsive design for all devices

## Technology Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Data Export**: CSV
- **Web Scraping**: Server-side API with proxy
- **Deployment**: AWS / SiteGround

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MarkZ1966github/company_info_finder.git
cd company_info_finder
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
./start-server
# or
npm run dev
```

4. Open your browser and navigate to [http://localhost:9999](http://localhost:9999)

## Usage

1. Enter a company name in the search bar (e.g., "Apple")
2. Optionally provide the company's website URL for more accurate results (e.g., "apple.com")
3. Click "Search" to retrieve company information
4. Browse through the different tabs to explore various aspects of the company
5. Use the "Export Data" button to download the information as a CSV file

## Available Companies

The application can search for any company by scraping data from public sources. The following companies also have mock data available as fallbacks:

- Apple Inc. (apple.com)
- Microsoft Corporation (microsoft.com)
- Amazon.com Inc. (amazon.com)
- Alphabet Inc. (Google) (google.com)
- Meta Platforms Inc. (Facebook) (meta.com)
- Tesla, Inc. (tesla.com)
- NVIDIA Corporation (nvidia.com)
- JPMorgan Chase & Co. (jpmorganchase.com)
- Johnson & Johnson (jnj.com)
- Walmart Inc. (walmart.com)
- Unity (unity.com)

## Project Structure

```
company-info-finder/
├── public/             # Static files
├── src/                # Source files
│   ├── app/            # Next.js app directory
│   │   ├── api/        # API routes
│   │   │   ├── search/ # Company search API
│   │   │   ├── proxy/  # Proxy API for external requests
│   │   │   └── company/# Company data API
│   │   ├── layout.tsx  # Root layout component
│   │   ├── page.tsx    # Home page component
│   │   └── globals.css # Global styles
│   ├── components/     # React components
│   │   ├── SearchBar.tsx
│   │   ├── CompanyDashboard.tsx
│   │   ├── CompanyOverview.tsx
│   │   ├── FinancialMetrics.tsx
│   │   ├── LeadershipInfo.tsx
│   │   ├── RiskAssessment.tsx
│   │   ├── ExportData.tsx
│   │   └── DataSourceAttribution.tsx
│   ├── services/       # Data services
│   │   ├── companyService.ts        # Mock data service
│   │   └── companyScraperService.ts # Web scraping service
├── .gitignore          # Git ignore file
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies
├── server.js           # Server configuration
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Features and Capabilities

### Current Features
- Web scraping from multiple sources (Wikipedia, Yahoo Finance)
- Server-side proxy for handling external requests
- Intelligent data fallback strategy (scraped → cached → mock → generic)
- Rate limiting and respectful scraping with proper headers
- 24-hour data caching to reduce load on sources
- Data source attribution for transparency
- CSV export functionality
- Interactive charts and visualizations

### Future Enhancements
- User accounts with saved companies
- Real-time stock price integration
- News sentiment analysis
- Competitor comparison feature
- Custom alerts for company events
- Enhanced prediction models using machine learning
- Mobile application

## Troubleshooting

If you encounter CORS issues or scraping problems:
- Ensure the server is running correctly with `./start-server`
- Check that both the Next.js frontend and proxy server are active
- Try clearing your browser cache
- Use the provided mock data companies for testing

## License

This project is licensed under the MIT License - see the LICENSE file for details.