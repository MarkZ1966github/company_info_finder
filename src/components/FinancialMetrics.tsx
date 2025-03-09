"use client"

import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

// Register all Chart.js components
Chart.register(...registerables)

interface FinancialMetricsProps {
  financials: {
    revenue: number[]
    profit: number[]
    years: string[]
    metrics: {
      peRatio: number
      marketCap: string
      dividendYield: string
      debtToEquity: number
    }
  }
}

export default function FinancialMetrics({ financials }: FinancialMetricsProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext('2d')
      
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: financials.years,
            datasets: [
              {
                label: 'Revenue (Billions $)',
                data: financials.revenue,
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
              },
              {
                label: 'Profit (Billions $)',
                data: financials.profit,
                backgroundColor: 'rgba(16, 185, 129, 0.5)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Billions ($)'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Year'
                }
              }
            },
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Revenue and Profit Trends'
              }
            }
          }
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [financials])

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Key Financial Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-gray-600 text-sm">P/E Ratio</p>
            <p className="text-2xl font-bold text-gray-800">{financials.metrics.peRatio.toFixed(2)}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-gray-600 text-sm">Market Cap</p>
            <p className="text-2xl font-bold text-gray-800">{financials.metrics.marketCap}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-gray-600 text-sm">Dividend Yield</p>
            <p className="text-2xl font-bold text-gray-800">{financials.metrics.dividendYield}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-gray-600 text-sm">Debt to Equity</p>
            <p className="text-2xl font-bold text-gray-800">{financials.metrics.debtToEquity.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="aspect-w-16 aspect-h-9 h-80">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  )
}