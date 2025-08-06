import React, { useState } from 'react';
import { Bell, Plus, User } from 'lucide-react';
import LandForm from '@/components/LandForm';
import FarmerForm from '@/components/FarmerForm';
import { useAuth } from '@/contexts/AuthContext';

// interface TopNavigationProps {
//   onAddFarmer: () => void;
//   onAddLand: () => void;
//   onNotificationClick: () => void;
// }

export const TopNavigation: React.FC = () => {
  const [activeSeason, setActiveSeason] = useState('YALA');
  const { user, logout } = useAuth();

  // const seasons = ['YALA', 'MAHA', 'ALL_YEAR'];
  const [isLandPopupOpen, setIsLandPopupOpen] = useState(false);
  const [isFarmerPopupOpen, setIsFarmerPopupOpen] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Season Navigation */}
        <div className="flex items-center space-x-1">
          {/* {seasons.map((season) => (
            <button
              key={season}
              onClick={() => setActiveSeason(season)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeSeason === season
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {season.replace('_', ' ')}
            </button>
          ))} */}
        </div>

        {/* Action Buttons and Notification */}
        <div className="flex items-center space-x-4">
          {/* Add Farmer Button */}
          <button
            // onClick={onAddFarmer}
            onClick={() => setIsFarmerPopupOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            <span>Add Farmer</span>
          </button>

          {/* Add Land Button */}
          <button
            // onClick={onAddLand}
            onClick={() => setIsLandPopupOpen(true)}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus size={16} />
            <span>Add Land</span>
          </button>
          {isLandPopupOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setIsLandPopupOpen(false)}
        >
          <div 
            className="max-w-5xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <LandForm onClose={() => setIsLandPopupOpen(false)} />
          </div>
        </div>
      )}
          {isFarmerPopupOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setIsFarmerPopupOpen(false)}
        >
          <div 
            className="max-w-5xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <FarmerForm onClose={() => setIsFarmerPopupOpen(false)} />
          </div>
        </div>
      )}

          {/* User Profile */}
          <div className="flex items-center space-x-2 text-gray-600" onClick={logout}>
            <User size={20} />
            <span className="font-medium">{user.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
