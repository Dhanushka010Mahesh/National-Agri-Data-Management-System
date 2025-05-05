
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom";
import OfficerSidebar from "@/components/sidebar/OfficerSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { getMockCategoryById } from "@/services/mockData";

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { districtId, divisionId, category } = params;
  
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [currentCategoryId, setCurrentCategoryId] = useState("1"); // Default to first category (Rice Farming)
  
  // Determine the current category based on URL params
  useEffect(() => {
    if (category) {
      switch(category) {
        case "Rice":
          setCurrentCategoryId("1");
          break;
        case "Vegetable":
          setCurrentCategoryId("2");
          break;
        case "LongCrops":
          setCurrentCategoryId("3");
          break;
        default:
          setCurrentCategoryId("1");
      }
    }
  }, [category]);
  
  const currentCategory = getMockCategoryById(currentCategoryId);

  // Parse the current menu from the URL path or default to dashboard
  const pathSegments = location.pathname.split('/');
  const currentMenu = pathSegments[pathSegments.length - 1] || 'dashboard';

  if (user?.role !== UserRole.DIVISION_OFFICER && !districtId) {
    navigate("/login");
    return null;
  }

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleCategoryChange = (categoryId: string) => {
    setCurrentCategoryId(categoryId);
    
    // Determine category name for URL
    let categoryName = "Rice"; // default
    switch(categoryId) {
      case "1":
        categoryName = "Rice";
        break;
      case "2":
        categoryName = "Vegetable";
        break;
      case "3":
        categoryName = "LongCrops";
        break;
    }
    
    // Navigate to the same menu item but for the new category
    if (districtId && divisionId) {
      if (currentMenu && !['dashboard', 'District_Officer'].includes(currentMenu)) {
        navigate(`/District_Officer/${districtId}/${divisionId}/${categoryName}/${currentMenu}`);
      } else {
        navigate(`/District_Officer/${districtId}/${divisionId}/${categoryName}`);
      }
    } else {
      // Fallback to original routes
      if (currentMenu && currentMenu !== 'division-officer') {
        navigate(`/division-officer/${currentMenu}`);
      } else {
        navigate('/division-officer/dashboard');
      }
    }
  };

  const handleMenuItemClick = (menuPath: string) => {
    // Extract just the menu name from the path
    const menuName = menuPath.split('/').pop() || 'dashboard';
    
    if (districtId && divisionId) {
      // Determine category name for URL
      let categoryName = "Rice"; // default
      switch(currentCategoryId) {
        case "1":
          categoryName = "Rice";
          break;
        case "2":
          categoryName = "Vegetable";
          break;
        case "3":
          categoryName = "LongCrops";
          break;
      }
      
      // Handle special case for Lands which is not category specific
      if (menuName === "lands") {
        navigate(`/District_Officer/${districtId}/${divisionId}/Lands`);
      } else {
        navigate(`/District_Officer/${districtId}/${divisionId}/${categoryName}/${menuName}`);
      }
    } else {
      // Fallback to original routes
      navigate(menuPath);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Officer Sidebar */}
      <OfficerSidebar
        role={UserRole.DIVISION_OFFICER}
        expanded={sidebarExpanded}
        toggleSidebar={toggleSidebar}
        currentCategoryId={currentCategoryId}
        onCategoryChange={handleCategoryChange}
        onMenuItemClick={handleMenuItemClick}
        currentMenu={currentMenu}
      />
      
      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarExpanded ? "ml-64" : "ml-16"}`}>
        <div className="p-6">
          {/* Category Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {currentCategory ? currentCategory.name : "Dashboard"} 
              {currentMenu !== 'dashboard' && currentMenu !== 'settings' ? 
                ` - ${currentMenu.charAt(0).toUpperCase() + currentMenu.slice(1).replace(/-/g, ' ')}` : ''}
            </h1>
            {districtId && divisionId && (
              <div className="text-sm text-gray-500 mt-1">
                District ID: {districtId} | Division ID: {divisionId}
              </div>
            )}
          </div>
          
          {/* Rendered Route Content */}
          <Outlet context={{ currentCategoryId, currentCategory, currentMenu, districtId, divisionId }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
