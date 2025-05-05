
import React from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Category } from "@/types";

interface DashboardContextType {
  currentCategoryId: string;
  currentCategory: Category | undefined;
  currentMenu: string;
}

const Dashboard: React.FC = () => {
  const { currentCategoryId, currentCategory, currentMenu } = useOutletContext<DashboardContextType>();

  // Mock data for dashboard stats - in a real app this would come from an API
  const dashboardData = {
    farmerCount: 128,
    approvedLandCount: 210,
    pendingLandCount: 15,
    activeCultivations: 185,
    pendingCultivations: 22,
    completedCultivations: 87,
  };

  return (
    <div>
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <div>
                <div className="text-3xl font-bold">{dashboardData.farmerCount}</div>
                <p className="text-xs text-gray-500">Registered Farmers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Agricultural Lands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="flex space-x-3">
                  <div>
                    <div className="text-3xl font-bold">{dashboardData.approvedLandCount}</div>
                    <p className="text-xs text-gray-500">Approved</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-amber-500">{dashboardData.pendingLandCount}</div>
                    <p className="text-xs text-gray-500">Pending</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Total Lands</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cultivations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="flex space-x-3">
                  <div>
                    <div className="text-3xl font-bold">{dashboardData.activeCultivations}</div>
                    <p className="text-xs text-gray-500">Active</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-amber-500">{dashboardData.pendingCultivations}</div>
                    <p className="text-xs text-gray-500">Pending</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-500">{dashboardData.completedCultivations}</div>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Total Cultivations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Cultivation Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center min-h-[300px]">
            {/* In a real app, this would be a chart component */}
            <div className="text-center">
              <p className="text-gray-500">Chart visualization would be here</p>
              <p className="text-sm text-gray-400 mt-2">Displaying crop distribution for {currentCategory?.name || "selected category"}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Land Utilization</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center min-h-[300px]">
            {/* In a real app, this would be a chart component */}
            <div className="text-center">
              <p className="text-gray-500">Chart visualization would be here</p>
              <p className="text-sm text-gray-400 mt-2">Displaying land usage statistics</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Activity items */}
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Land registration approved for <span className="text-primary">Kumara Perera</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">10 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  New farmer registration pending from <span className="text-primary">Amali Fernando</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">30 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  New cultivation cycle started by <span className="text-primary">Nimal Jayasinghe</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  You published a new blog post: <span className="text-primary">Best Practices for Rice Cultivation</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
