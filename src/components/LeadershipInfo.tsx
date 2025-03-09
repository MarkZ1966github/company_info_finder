"use client"

interface LeadershipInfoProps {
  leadership: Array<{
    name: string
    position: string
    since: string
    image?: string
  }>
}

export default function LeadershipInfo({ leadership }: LeadershipInfoProps) {
  if (leadership.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No leadership information available for this company.</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 text-gray-800">Current Leadership Team</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leadership.map((leader, index) => (
          <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                {leader.image ? (
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-3xl text-gray-400">
                    {leader.name.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>
              
              <h4 className="text-lg font-medium text-center text-gray-800 mb-1">{leader.name}</h4>
              <p className="text-primary-600 text-center mb-2">{leader.position}</p>
              <p className="text-sm text-gray-500 text-center">Since {leader.since}</p>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  In a real app, additional information about this leader would be displayed here.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Board of Directors</h3>
        <p className="text-gray-500 italic">
          In a real application, information about the board of directors would be displayed here.
        </p>
        <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg mt-4">
          <p className="text-gray-400">Board members and compensation data would be shown here</p>
        </div>
      </div>
    </div>
  )
}