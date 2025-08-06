import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePageDistrictData } from "@/services/MockDistrictData";
import { useEffect, useState } from "react";
import DistrictOfficePopup from "@/components/DistrictOfficePopup";
import AgricultureOfficerForm from "../../components/AgricultureOfficerForm";
import { useAuth } from "@/contexts/AuthContext";

const DistrictOfficerDashboard: React.FC = () => {
  const { pageDistrictData, loading, error } = usePageDistrictData();
  const [isDistrictPopupOpen, setIsDistrictPopupOpen] = useState(false);
  const [isAgriculturePopupOpen, setIsAgriculturePopupOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 pt-16" key={4}>
      {/* this this district page all data get API */}
      {pageDistrictData?.map((dataAllPage) => (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" key={1}>
          <h1 className="text-3xl font-bold mb-4" >
            Welcome {user.name}
            </h1>
            

          <Button 
            onClick={logout}
            variant="outline"
            className="w-15 text-red-50 bg-red-600 mr-3 mb-2"
          >
            Logout
          </Button>
          

          {/* Stats Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Districts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-primary mr-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <div>
                    <div className="text-3xl font-bold">
                      {dataAllPage.districtsCount ?? "0"}
                    </div>
                    <p className="text-xs text-gray-500">Total Districts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Division Offices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-primary mr-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <div className="text-3xl font-bold">
                      {dataAllPage.divisionsCount ?? "0"}
                    </div>
                    <p className="text-xs text-gray-500">Total Divisions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Count</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-primary mr-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <div>
                    <div className="flex space-x-3">
                      <div>
                        <div className="text-3xl font-bold text-red-500">
                          {dataAllPage.landsCount ?? "0"}
                        </div>
                        <p className="text-xs text-gray-500">Lands</p>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-amber-500">
                          {dataAllPage.farmersCount ?? "0"}
                        </div>
                        <p className="text-xs text-gray-500">Famers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Districts Section */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>District Management</CardTitle>
                <Button asChild>
                  <Link to="/District_Officer">View All Districts</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* District Cards */}
                {/* innaer array have all destrict info */}
                {dataAllPage.districtsCount > 0 ? (
                  dataAllPage.districts?.map((district) => (
                    <Card className="card-hover" key={district.districtId}>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-3">
                          {district.name} District
                        </h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Division Offices:
                            </span>
                            <span className="font-medium">
                              {district.divisionsCount ?? "0"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Farmers:
                            </span>
                            <span className="font-medium">
                              {district.farmersCount ?? "0"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Agricultural Lands:
                            </span>
                            <span className="font-medium">
                              {district.landsCount ?? "0"}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to={`/District_Officer/${district.districtId}`}>
                            Manage District
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-xl text-red-800">
                    No districts available.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Button
                  className="h-auto py-6 flex flex-col"
                  asChild
                  onClick={() => setIsDistrictPopupOpen(true)}
                >
                  <Link to="/District_Officer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mb-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Create New District
                  </Link>
                </Button>

                {/* Popups */}
                <DistrictOfficePopup
                  isOpen={isDistrictPopupOpen}
                  onClose={() => setIsDistrictPopupOpen(false)}
                />
                {/* <Button
                  className="h-auto py-6 flex flex-col"
                  variant="outline"
                  asChild
                >
                  <Link to="/district-officer/divisions/new">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mb-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" />
                    </svg>
                    Create New Division
                  </Link>
                </Button> */}

                <Button
                  className="h-auto py-6 flex flex-col"
                  variant="outline"
                  onClick={() => setIsAgriculturePopupOpen(true)}
                  asChild
                >
                  <Link to="/District_officer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mb-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                    Super Admin Officer
                  </Link>
                </Button>
              </div>
              
              {isAgriculturePopupOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setIsAgriculturePopupOpen(false)}
        >
          <div 
            className="max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <AgricultureOfficerForm onClose={() => setIsAgriculturePopupOpen(false)} />
          </div>
        </div>
      )}
              
            </CardContent>
          </Card>
          
        </div>
      ))}
    </div>
  );
};

export default DistrictOfficerDashboard;
