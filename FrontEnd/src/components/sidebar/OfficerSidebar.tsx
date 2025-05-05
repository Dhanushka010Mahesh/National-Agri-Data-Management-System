import React from "react";
import { NavLink } from "react-router-dom";
import { UserRole } from "@/types";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Category } from "@/types";
import { getMockCategories } from "@/services/mockData";
import { UserPlus, FileText, Settings, User, LayoutDashboard, Wheat, Carrot } from "lucide-react";

interface OfficerSidebarProps {
  role: UserRole.DIVISION_OFFICER | UserRole.DISTRICT_OFFICER;
  expanded: boolean;
  toggleSidebar: () => void;
  currentCategoryId?: string;
  onCategoryChange?: (categoryId: string) => void;
  onMenuItemClick?: (path: string) => void;
  currentMenu?: string;
}

const OfficerSidebar: React.FC<OfficerSidebarProps> = ({ 
  role, 
  expanded, 
  toggleSidebar,
  currentCategoryId,
  onCategoryChange,
  onMenuItemClick,
  currentMenu
}) => {
  const isMobile = useIsMobile();
  const categories = getMockCategories();
  
  const isDivisionOfficer = role === UserRole.DIVISION_OFFICER;
  const isDistrictOfficer = role === UserRole.DISTRICT_OFFICER;
  
  const handleCategoryChange = (category: Category) => {
    if (onCategoryChange) {
      onCategoryChange(category.id);
    }
  };

  // Common menu items for each category - these will be shared across categories
  const getCommonMenuItems = () => [
    {
      path: "dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      showInAllCategories: true
    },
    {
      path: "approved-farmers",
      icon: <UserPlus className="h-5 w-5" />,
      label: "Approval Farmer List",
      showInAllCategories: false
    },
    {
      path: "approved-lands",
      icon: <FileText className="h-5 w-5" />,
      label: "Approval Land List",
      showInAllCategories: false
    },
    {
      path: "approved-cultivation",
      icon: <Wheat className="h-5 w-5" />,
      label: "Approval Cultivation List",
      showInAllCategories: false
    },
    {
      path: "farmers",
      icon: <User className="h-5 w-5" />,
      label: "Farmers",
      showInAllCategories: false
    },
    {
      path: "lands",
      icon: <FileText className="h-5 w-5" />,
      label: "Lands",
      showInAllCategories: false
    },
    {
      path: "cultivation",
      icon: <Carrot className="h-5 w-5" />,
      label: "Cultivations",
      showInAllCategories: false
    },
    {
      path: "settings",
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      showInAllCategories: true
    }
  ];

  const handleMenuItemClick = (path: string) => {
    if (onMenuItemClick) {
      onMenuItemClick(`/division-officer/${path}`);
    }
  };

  // Get the appropriate category icon
  const getCategoryIcon = (categoryId: string) => {
    switch(categoryId) {
      case "1": // Rice Farming
        return <Wheat className="h-4 w-4 mr-2" />;
      case "2": // Vegetables
        return <Carrot className="h-4 w-4 mr-2" />;
      case "3": // Long-Term Crops
        return <FileText className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <aside
      className={cn(
        "bg-secondary text-secondary-foreground h-screen fixed left-0 top-16 transition-all duration-300 z-40",
        expanded ? "w-64" : "w-16",
        isMobile && !expanded && "hidden"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex justify-between items-center">
          {expanded && <h2 className="font-semibold">Menu</h2>}
          <button
            onClick={toggleSidebar}
            className={cn(
              "p-2 rounded-md hover:bg-secondary-dark transition-colors",
              !expanded && "mx-auto"
            )}
          >
            {expanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {isDivisionOfficer && (
            <>
              <div className={cn("mb-4 px-4", !expanded && "text-center")}>
                {expanded ? <h3 className="text-sm font-medium mb-2">Categories</h3> : <h3 className="text-xs">Cat</h3>}
                <div className={cn("space-y-1", !expanded && "flex flex-col items-center")}>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category)}
                      className={cn(
                        "w-full text-left py-1 px-2 rounded text-sm flex items-center",
                        currentCategoryId === category.id ? "bg-primary text-primary-foreground" : "hover:bg-secondary-dark",
                        !expanded && "text-center w-10 h-10 flex items-center justify-center"
                      )}
                      title={category.name}
                    >
                      {getCategoryIcon(category.id)}
                      {expanded ? category.name : category.name.charAt(0)}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-secondary-dark my-2" />
              
              {/* Common menu items for division officer */}
              <div className="px-4 py-2">
                {expanded ? <h3 className="text-sm font-medium mb-2">Navigation</h3> : <h3 className="text-xs text-center">Nav</h3>}
                <div className={cn("space-y-1", !expanded && "flex flex-col items-center")}>
                  {/* Render common menu items based on selected category */}
                  {getCommonMenuItems().map((item, index) => {
                    // Show items either if they are for all categories or specific to the current category
                    if (item.showInAllCategories || (!item.showInAllCategories && currentCategoryId)) {
                      return (
                        <button
                          key={index}
                          onClick={() => handleMenuItemClick(item.path)}
                          className={cn(
                            "flex items-center w-full py-1.5 px-2 rounded text-sm",
                            currentMenu === item.path ? "bg-primary text-primary-foreground" : "hover:bg-secondary-dark",
                            !expanded && "justify-center"
                          )}
                          aria-label={item.label}
                        >
                          {item.icon}
                          {expanded && <span className="ml-2">{item.label}</span>}
                        </button>
                      );
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => handleMenuItemClick("blogs")}
                    className={cn(
                      "flex items-center w-full py-1.5 px-2 rounded text-sm",
                      currentMenu === "blogs" ? "bg-primary text-primary-foreground" : "hover:bg-secondary-dark",
                      !expanded && "justify-center"
                    )}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                      <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                    </svg>
                    {expanded && <span className="ml-2">Blogs</span>}
                  </button>
                </div>
              </div>
            </>
          )}

          {isDistrictOfficer && (
            <div className="px-4 py-2">
              {expanded ? <h3 className="text-sm font-medium mb-2">Navigation</h3> : <h3 className="text-xs text-center">Nav</h3>}
              <div className={cn("space-y-1", !expanded && "flex flex-col items-center")}>
                <NavLink
                  to="/district-officer/dashboard"
                  className={({ isActive }) =>
                    cn(
                      "flex items-center py-1.5 px-2 rounded text-sm",
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary-dark",
                      !expanded && "justify-center"
                    )
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  {expanded && <span className="ml-2">Dashboard</span>}
                </NavLink>
                
                <NavLink
                  to="/district-officer/districts"
                  className={({ isActive }) =>
                    cn(
                      "flex items-center py-1.5 px-2 rounded text-sm",
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary-dark",
                      !expanded && "justify-center"
                    )
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  {expanded && <span className="ml-2">Districts</span>}
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default OfficerSidebar;
