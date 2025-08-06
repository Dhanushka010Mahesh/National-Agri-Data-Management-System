import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavigation } from './TopNavigation';
// import { AddFarmerModal } from '../../pages/division-officer/admin/farmer/AddFarmerModal';
import { AddLandModal } from '../../pages/division-officer/admin/land/AddLandModal';
import { NotificationPopup } from '../../pages/division-officer/admin/Popup/NotificationPopup';
import { Outlet } from 'react-router-dom';

export const DivisionDashboardLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // const [showAddFarmerModal, setShowAddFarmerModal] = useState(false);
  // const [showAddLandModal, setShowAddLandModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className="flex-1 flex flex-col">
        <TopNavigation />
        
        <main className="flex-1 p-6 relative">
          <Outlet />
          
          {showNotifications && (
            <NotificationPopup onClose={() => setShowNotifications(false)} />
          )}
        </main>
      </div>

      {/* {showAddFarmerModal && (
        <AddFarmerModal onClose={() => setShowAddFarmerModal(false)} />
      )}
      
      {showAddLandModal && (
        <AddLandModal onClose={() => setShowAddLandModal(false)} />
      )} */}
    </div>
  );
};
