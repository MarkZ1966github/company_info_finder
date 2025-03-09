import React from 'react';

type DataSource = 'Wikipedia' | 'YahooFinance' | 'CompanyWebsite' | 'SECEDGAR' | 'NewsAPI' | 'MockData' | 'Algorithmic Estimate' | 'Error Fallback' | 'Combined' | string;

interface DataSourceProps {
  sources: Record<string, DataSource>;
}

const DataSourceAttribution: React.FC<DataSourceProps> = ({ sources }) => {
  if (!sources || Object.keys(sources).length === 0) {
    return null;
  }
  
  // Group sources by source type
  const sourceGroups: Record<string, string[]> = {};
  
  Object.entries(sources).forEach(([field, source]) => {
    // Skip the _all field
    if (field === '_all') {
      sourceGroups[source] = ['All data'];
      return;
    }
    
    if (!sourceGroups[source]) {
      sourceGroups[source] = [];
    }
    
    // Format the field name for display
    let displayField = field;
    if (field.includes('.')) {
      // Convert dot notation to more readable format
      displayField = field.split('.').pop() || field;
    }
    
    sourceGroups[source].push(displayField);
  });
  
  return (
    <div className="mt-4 p-3 bg-gray-100 rounded-md text-xs">
      <h4 className="font-semibold mb-1">Data Sources:</h4>
      <div className="space-y-1">
        {Object.entries(sourceGroups).map(([source, fields], index) => (
          <div key={index} className="flex">
            <span className="font-medium mr-2">{source}:</span>
            <span className="text-gray-600">{fields.join(', ')}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-gray-500 italic text-xs">
        Data is sourced from public information and may not be complete or up-to-date.
      </div>
    </div>
  );
};

export default DataSourceAttribution;