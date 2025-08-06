import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserRole, useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { fetchDivisionsByDistrictId } from "@/services/MockDivisionData";
import { PageSingleDistrictDTO } from "@/types";
import DivisionOfficePopup from "@/components/DivisionOfficePopup";
import DistrictOfficerForm from "../../components/DistrictOfficerForm";
// import { usePageDistrictData } from '@/services/MockDivisionData';
// import { usePageSingleDistrictData } from "@/services/MockDistrictData";

const DistrictDetail: React.FC = () => {
  const { districtId } = useParams();
  const { user,logout,isAuthenticated } = useAuth();
  const [allDivisions, setAllDivisions] = useState<PageSingleDistrictDTO[]>([]);
  const [isDistrictPopupOpen, setIsDistrictPopupOpen] = useState(false);
  // const { pageDistrictData, loading, error } = usePageDistrictData(Number(districtId));
  // const { singleDistrictData } = usePageSingleDistrictData(Number(districtId));

  // if (loading) {
  //   return (
  //     <div style={styles.loading}>
  //       <p>Loading district data...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div style={styles.error}>
  //       <p>Error: {error}</p>
  //     </div>
  //   );
  // }

  useEffect(() => {
    async function getDivisions() {
      try {
        const divisions = await fetchDivisionsByDistrictId(districtId);
        setAllDivisions(divisions);
      } catch (error) {
        console.error("Failed to fetch divisions", error);
      }
    }

    if (districtId) {
      getDivisions();
    }
  }, [districtId]);

  // useEffect(() => {
  //   if (allDivisions.length > 0) {
  //     console.log("Divisions updated:", allDivisions);
  //   }
  // }, [allDivisions]);

  // const {
  //   allDivisionCountLive,
  //   allDivisionFarmerCount,
  //   allDivisionLandCount
  // } = getDivisionsDetails(districtId);

  // console.log(allDivisionCountLive + " " +allDivisionFarmerCount +" "+ allDivisionLandCount);

  // Mock division data - in a real app this would come from an API
  // const divisions = [
  //   { id: "div1", name: "Division 1", farmers: 32, lands: 48 },
  //   { id: "div2", name: "Division 2", farmers: 26, lands: 38 },
  //   { id: "div3", name: "Division 3", farmers: 19, lands: 27 }
  // ];
  // {
  const [isDivisionPopupOpen, setIsDivisionPopupOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-4">
      {allDivisions?.map((singleDistrictData) => (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" key={2}>
          <div className="flex justify-between items-center mb-8">
            <div>
              {user?.role === 'DISTRICT_OFFICER' ? (
                <Button
                onClick={logout}
                variant="outline"
                className="w-15 text-red-50 bg-red-600 mr-3 mb-2"
              >
                Logout
              </Button>
              ) : (
                <Button variant="outline" asChild className="mb-4">
                  <Link to="/District_Officer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Back to Districts
                  </Link>
                </Button>
              )}
              <h1 className="text-3xl font-bold">
                District {districtId} Details
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome, {user?.name || "Officer"}
              </p>
            </div>
            <div className="space-x-2">
              <Button onClick={() => setIsDistrictPopupOpen(true)}>
                Assign Officer
              </Button>
              <Button variant="outline">Edit District</Button>
              <Button onClick={() => setIsDivisionPopupOpen(true)}>
                Add Division
              </Button>
            </div>
          </div>

          {/* Popups */}
          <DivisionOfficePopup
            isOpen={isDivisionPopupOpen}
            onClose={() => setIsDivisionPopupOpen(false)}
          />
          {/* Modal Overlays */}
          {isDistrictPopupOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
              onClick={() => setIsDistrictPopupOpen(false)}
            >
              <div
                className="max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <DistrictOfficerForm
                  onClose={() => setIsDistrictPopupOpen(false)}
                />
              </div>
            </div>
          )}
          {/* District Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Divisions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {singleDistrictData.divisionsCount ?? 0}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Farmers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {/* {allDivisions.reduce((sum, div) => sum + div.farmers, 0)} */}
                  {singleDistrictData.farmersCount ?? "0"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Agricultural Lands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {/* {allDivisions.reduce((sum, div) => sum + div.lands, 0)} */}
                  {singleDistrictData.landsCount ?? "0"}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Divisions List */}
          <Card>
            <CardHeader>
              <CardTitle>Divisions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {singleDistrictData.divisionsCount > 0 ? (
                  singleDistrictData.divisions?.map((division) => (
                    <Card
                      key={division.divisionId}
                      className="card-hover shadow-md hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-3">
                          {division.name}
                        </h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Farmers:
                            </span>
                            <span className="font-medium">
                              {division.farmersCount ?? "0"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Agricultural Lands:
                            </span>
                            <span className="font-medium">
                              {division.landsCount ?? "0"}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full" asChild>
                          <Link
                            to={`/District_Officer/${districtId}/${division.divisionId}`}
                          >
                            Manage Division
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-xl text-red-800">
                    No divisions available.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default DistrictDetail;
