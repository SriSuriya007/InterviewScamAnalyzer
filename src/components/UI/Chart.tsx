import React from 'react';

interface ChartData {
  date: string;
  incidents: number;
}

interface ChartProps {
  data: ChartData[];
}

function Chart({ data }: ChartProps) {
  const maxValue = Math.max(...data.map(d => d.incidents));
  const chartHeight = 200;

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between h-48 px-2">
        {data.map((item, index) => {
          const height = maxValue > 0 ? (item.incidents / maxValue) * chartHeight : 0;
          return (
            <div key={index} className="flex flex-col items-center space-y-2 flex-1">
              <div 
                className="bg-blue-500 rounded-t-sm w-8 min-h-[4px] transition-all duration-300 hover:bg-blue-600"
                style={{ height: `${height}px` }}
                title={`${item.incidents} incidents on ${item.date}`}
              />
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

export default Chart;