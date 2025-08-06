
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  FileText, 
  CheckCircle, 
  Users, 
  Map, 
  ChevronRight,
  ChevronLeft,
  Leaf,
  Grid3x3,
  Upload
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>('active');
  const location = useLocation();

  const menuItems = [
    // {
    //   id: 'dashboard',
    //   title: 'Dashboard',
    //   icon: Home,
    //   path: 'dashboard',
    //   hasSubmenu: false,
    // },
    {
      id: 'active',
      title: 'Active',
      icon: CheckCircle,
      hasSubmenu: true,
      submenu: [
        { title: 'Farmers', path: 'active/farmers', icon: Users },
        { title: 'Lands', path: 'active/lands', icon: Map },
        { title: 'Cultivated', path: 'active/cultivated', icon: Leaf },
      ],
    },
    // {
    //   id: 'settings',
    //   title: 'Settings',
    //   icon: Settings,
    //   path: 'settings',
    //   hasSubmenu: false,
    // },
    {
      id: 'blogs',
      title: 'Blogs',
      icon: FileText,
      path: 'blogs',
      hasSubmenu: false,
    },
    {
      id: 'approval',
      title: 'Approval',
      icon: CheckCircle,
      hasSubmenu: true,
      submenu: [
        { title: 'Farmers', path: 'approval/farmers', icon: Users },
        { title: 'Lands', path: 'approval/lands', icon: Map },
        { title: 'Cultivation', path: 'approval/cultivation', icon: Leaf },
      ],
    },
    {
      id: 'crop-category',
      title: 'Crop Category',
      icon: Grid3x3,
      path: 'crop-category',
      hasSubmenu: false,
    },
    // {
    //   id: 'paddy-land-type',
    //   title: 'Paddy Land Type',
    //   icon: Map,
    //   path: 'paddy-land-type',
    //   hasSubmenu: false,
    // },
    {
      id: 'update',
      title: 'Update',
      icon: Upload,
      hasSubmenu: true,
      submenu: [
        { title: 'Farmer', path: 'update/farmer', icon: Users },
        { title: 'Lands', path: 'update/lands', icon: Map },
      ],
    },
  ];

  const toggleSubmenu = (menuId: string) => {
    if (collapsed) return;
    setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
  };

  return (
    <div className={`bg-green-800 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex flex-col`}>
      {/* Header with toggle button */}
      <div className="p-4 border-b border-green-700 flex items-center justify-between">
        {!collapsed && (
          <h2 className="text-xl font-bold text-green-100">Division Dashboard</h2>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.id}>
            {/* Main menu item */}
            {item.hasSubmenu ? (
              <button
                onClick={() => toggleSubmenu(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-green-700 transition-colors ${
                  activeSubmenu === item.id ? 'bg-green-700' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon size={20} />
                  {!collapsed && <span className="font-medium">{item.title}</span>}
                </div>
                {!collapsed && activeSubmenu === item.id && (
                  <ChevronRight size={16} className="transform rotate-90 transition-transform" />
                )}
              </button>
            ) : (
              <NavLink
                to={item.path || '#'}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg hover:bg-green-700 transition-colors ${
                    isActive ? 'bg-green-700 font-medium' : ''
                  }`
                }
              >
                <item.icon size={20} />
                {!collapsed && <span className="font-medium">{item.title}</span>}
              </NavLink>
            )}

            {/* Submenu items */}
            {item.hasSubmenu && activeSubmenu === item.id && !collapsed && (
              <div className="ml-6 mt-2 space-y-1">
                {item.submenu?.map((subItem) => (
                  <NavLink
                    key={subItem.path}
                    to={subItem.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 p-2 rounded-lg hover:bg-green-600 transition-colors text-sm ${
                        isActive ? 'bg-green-600 font-medium' : ''
                      }`
                    }
                  >
                    <subItem.icon size={16} />
                    <span>{subItem.title}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};