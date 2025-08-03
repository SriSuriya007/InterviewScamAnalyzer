import React from 'react';
import { Download, FileText, Clock, CheckCircle } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  status: 'ready' | 'generating' | 'failed';
  size: string;
}

interface ReportCardProps {
  report: Report;
}

function ReportCard({ report }: ReportCardProps) {
  const getStatusIcon = () => {
    switch (report.status) {
      case 'ready':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'generating':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <Clock className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = () => {
    switch (report.status) {
      case 'ready':
        return 'Ready';
      case 'generating':
        return 'Generating...';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'security':
        return 'bg-red-100 text-red-800';
      case 'performance':
        return 'bg-blue-100 text-blue-800';
      case 'fraud':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h4 className="text-lg font-medium text-gray-900">{report.title}</h4>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(report.type)}`}>
                {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
              </span>
            </div>
            
            <p className="text-gray-600 mb-3">{report.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Generated: {new Date(report.date).toLocaleDateString()}</span>
              <span>Size: {report.size}</span>
              <div className="flex items-center space-x-1">
                {getStatusIcon()}
                <span>{getStatusText()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {report.status === 'ready' && (
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          )}
          
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportCard;