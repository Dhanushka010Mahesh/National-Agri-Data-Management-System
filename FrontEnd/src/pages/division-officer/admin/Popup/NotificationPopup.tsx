import React from 'react';
import { X, User, MessageSquare, Clock } from 'lucide-react';

interface NotificationPopupProps {
  onClose: () => void;
}

interface Feedback {
  id: string;
  farmerName: string;
  message: string;
  timestamp: string;
  type: 'complaint' | 'suggestion' | 'inquiry';
}

export const NotificationPopup: React.FC<NotificationPopupProps> = ({ onClose }) => {
  const feedbacks: Feedback[] = [
    {
      id: '1',
      farmerName: 'Sunil Perera',
      message: 'Need assistance with pest control for my paddy field. The current season has been challenging.',
      timestamp: '2 hours ago',
      type: 'inquiry',
    },
    {
      id: '2',
      farmerName: 'Kamala Silva',
      message: 'Suggestion: Could we have more workshops on organic farming techniques?',
      timestamp: '5 hours ago',
      type: 'suggestion',
    },
    {
      id: '3',
      farmerName: 'Ranjith Fernando',
      message: 'Complaint: The water distribution schedule is not being followed properly in our area.',
      timestamp: '1 day ago',
      type: 'complaint',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'complaint':
        return 'bg-red-100 text-red-800';
      case 'suggestion':
        return 'bg-blue-100 text-blue-800';
      case 'inquiry':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="absolute top-16 right-6 bg-white rounded-lg shadow-xl border border-gray-200 w-96 z-50">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <MessageSquare size={20} className="mr-2" />
          Farmer Feedback
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <User size={16} className="text-gray-500" />
                <span className="font-medium text-gray-800">{feedback.farmerName}</span>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(feedback.type)}`}>
                {feedback.type}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-2 line-clamp-3">
              {feedback.message}
            </p>
            
            <div className="flex items-center text-xs text-gray-500">
              <Clock size={12} className="mr-1" />
              {feedback.timestamp}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <button className="w-full text-center text-green-600 hover:text-green-700 text-sm font-medium">
          View All Feedback
        </button>
      </div>
    </div>
  );
};
