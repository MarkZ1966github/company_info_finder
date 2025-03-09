"use client"

import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

// Register all Chart.js components
Chart.register(...registerables)

interface RiskAssessmentProps {
  risk: {
    overall: string
    factors: Array<{
      name: string
      score: number
    }>
    successProbability: number
  }
}

export default function RiskAssessment({ risk }: RiskAssessmentProps) {
  const radarChartRef = useRef<HTMLCanvasElement | null>(null)
  const radarChartInstance = useRef<Chart | null>(null)
  
  const gaugeChartRef = useRef<HTMLCanvasElement | null>(null)
  const gaugeChartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (risk.factors.length > 0 && radarChartRef.current) {
      // Destroy existing chart if it exists
      if (radarChartInstance.current) {
        radarChartInstance.current.destroy()
      }

      const ctx = radarChartRef.current.getContext('2d')
      
      if (ctx) {
        radarChartInstance.current = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: risk.factors.map(factor => factor.name),
            datasets: [
              {
                label: 'Risk Score (Lower is Better)',
                data: risk.factors.map(factor => factor.score),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              r: {
                beginAtZero: true,
                min: 0,
                max: 5,
                ticks: {
                  stepSize: 1
                }
              }
            },
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Risk Factor Assessment'
              }
            }
          }
        })
      }
    }

    if (gaugeChartRef.current) {
      // Destroy existing chart if it exists
      if (gaugeChartInstance.current) {
        gaugeChartInstance.current.destroy()
      }

      const ctx = gaugeChartRef.current.getContext('2d')
      
      if (ctx) {
        // Create a gauge chart for success probability
        gaugeChartInstance.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Success Probability', 'Failure Probability'],
            datasets: [{
              data: [risk.successProbability * 100, (1 - risk.successProbability) * 100],
              backgroundColor: [
                'rgba(75, 192, 192, 0.7)',
                'rgba(201, 203, 207, 0.3)'
              ],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            circumference: 180,
            rotation: -90,
            cutout: '75%',
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: 'Success Probability'
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `${context.label}: ${context.raw}%`;
                  }
                }
              }
            }
          }
        })
      }
    }

    return () => {
      if (radarChartInstance.current) {
        radarChartInstance.current.destroy()
      }
      if (gaugeChartInstance.current) {
        gaugeChartInstance.current.destroy()
      }
    }
  }, [risk])

  // Map risk level to color
  const getRiskColor = (riskLevel: string) => {
    const riskMap: Record<string, string> = {
      'Very Low': 'bg-green-500',
      'Low': 'bg-green-400',
      'Moderate': 'bg-yellow-400',
      'High': 'bg-orange-500',
      'Very High': 'bg-red-500',
      'Unknown': 'bg-gray-400'
    }
    return riskMap[riskLevel] || 'bg-gray-400'
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Risk Overview</h3>
          
          <div className="flex items-center mb-6">
            <div className="mr-4">
              <span className="text-gray-600 block mb-1">Overall Risk Level</span>
              <div className="flex items-center">
                <span className={`inline-block w-4 h-4 rounded-full mr-2 ${getRiskColor(risk.overall)}`}></span>
                <span className="font-medium text-lg">{risk.overall}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Success Probability</h4>
            <div className="relative h-48">
              <canvas ref={gaugeChartRef}></canvas>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-0 text-center">
                <span className="text-3xl font-bold block">{(risk.successProbability * 100).toFixed(1)}%</span>
                <span className="text-sm text-gray-500">Probability of Success</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Risk Factors</h3>
          {risk.factors.length > 0 ? (
            <div className="relative h-64">
              <canvas ref={radarChartRef}></canvas>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-400">No risk factor data available</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Future Outlook</h3>
        <p className="text-gray-700 mb-4">
          Based on current risk assessment and market trends, this company shows 
          {risk.successProbability >= 0.75 ? ' strong potential for continued success.' : 
           risk.successProbability >= 0.5 ? ' moderate potential for success with some caution advised.' : 
           ' significant challenges ahead that could impact future performance.'}
        </p>
        <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-400">Detailed future predictions would be shown here</p>
        </div>
      </div>
    </div>
  )
}