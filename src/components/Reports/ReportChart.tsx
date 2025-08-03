import React from 'react';

interface ChartData {
  date: string;
  interviews: number;
  incidents: number;
}

interface ReportChartProps {
  data: ChartData[];
}

function ReportChart({ data }: ReportChartProps) {
  const maxInterviews = Math.max(...data.map(d => d.interviews));
  const maxIncidents = Math.max(...data.map(d => d.incidents));
  const chartHeight = 200;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-gray-600">Interviews</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-gray-600">Security Incidents</span>
        </div>
      </div>
      
      <div className="flex items-end justify-between h-48 px-2">
        {data.map((item, index) => {
          const interviewHeight = maxInterviews > 0 ? (item.interviews / maxInterviews) * chartHeight : 0;
          const incidentHeight = maxIncidents > 0 ? (item.incidents / maxIncidents) * (chartHeight * 0.6) : 0;
          
          return (
            <div key={index} className="flex flex-col items-center space-y-2 flex-1">
              <div className="flex items-end space-x-1">
                <div 
                  className="bg-blue-500 rounded-t-sm w-6 min-h-[4px] transition-all duration-300 hover:bg-blue-600"
                  style={{ height: `${interviewHeight}px` }}
                  title={`${item.interviews} interviews on ${item.date}`}
                />
                <div 
                  className="bg-red-500 rounded-t-sm w-3 min-h-[2px] transition-all duration-300 hover:bg-red-600"
                  style={{ height: `${incidentHeight}px` }}
                  title={`${item.incidents} incidents on ${item.date}`}
                />
              </div>
              <div className="text-xs text-gray-500 text-center">
                {new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>7 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}

export default ReportChart;