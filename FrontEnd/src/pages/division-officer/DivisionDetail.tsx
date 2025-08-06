import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchDivisionsByDistrictIdDivisionId } from "@/services/MockDivisionData";
import { PageSingleDivisionDTO } from "@/types";
import { useEffect, useState } from "react";
import { number } from "zod";
import CultivationForm from "../../components/CultivationForm";
import { Leaf } from "lucide-react";
import DivisionOfficerForm from "../../components/DivisionOfficerForm";
import CropForm from "../../components/CropForm";
import LandForm from "../../components/LandForm";
import { UserRole, useAuth } from "@/contexts/AuthContext";

const DivisionDetail: React.FC = () => {
  const { districtId, divisionId } = useParams();
  const { user, logout, isAuthenticated } = useAuth();
  const [isDivisionPopupOpen, setIsDivisionPopupOpen] = useState(false);
  const [isCropPopupOpen, setIsCropPopupOpen] = useState(false);
  const currentDivisionId = divisionId || "1";
  const navigate = useNavigate();
  const [singleDivision, setSingleDivision] =
    useState<PageSingleDivisionDTO | null>(null);

  useEffect(() => {
    async function getDivisions() {
      try {
        if (districtId && divisionId) {
          const division = await fetchDivisionsByDistrictIdDivisionId(
            districtId,
            divisionId
          );
          setSingleDivision(division);
        }
      } catch (error) {
        console.error("Failed to fetch division", error);
      }
    }

    if (districtId && divisionId) {
      getDivisions();
    }
  }, [districtId, divisionId]);

  // {singleDivision ? (
  //   console.log(singleDivision.name)
  // ) : (
  //   <p>Loading division data...</p>
  // )}

  // Mock category data
  const categories = [
    {
      id: "Rice",
      name: "Rice Farming",
      farmers: 2,
      lands: 3,
      cultivations: 1,
    },
    {
      id: "Vegetable",
      name: "Vegetables",
      farmers: 2,
      lands: 3,
      cultivations: 2,
    },
    {
      id: "LongCrops",
      name: "Long-Term Crops",
      farmers: 2,
      lands: 1,
      cultivations: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {singleDivision ? (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
          
              {user?.role === 'DIVISION_OFFICER' ? (
                <Button
                  onClick={logout}
                  variant="outline"
                  className="w-15 text-red-50 bg-red-600 mr-3 mb-2"
                >
                  Logout
                </Button>
              ) : (
                <Button variant="outline" asChild className="mb-4">
                  <Link to={`/District_Officer/${districtId}`}>
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
                    Back to District
                  </Link>
                </Button>
              )}
              <h1 className="text-3xl font-bold">
                Division {divisionId} Management
              </h1>
              <p className="text-gray-500 mt-1">District: {districtId}</p>
            </div>
            <div className="space-x-2">
              <Button variant="outline">Edit Division</Button>
              <Button onClick={() => setIsDivisionPopupOpen(true)}>
                Assign Officer
              </Button>
            </div>
          </div>

          {isDivisionPopupOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
              onClick={() => setIsDivisionPopupOpen(false)}
            >
              <div
                className="max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <DivisionOfficerForm
                  onClose={() => setIsDivisionPopupOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Division Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Farmers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {/* {categories.reduce((sum, cat) => sum + cat.farmers, 0)} */}
                  {singleDivision.farmersCount ?? "0"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Lands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {/* {categories.reduce((sum, cat) => sum + cat.lands, 0)} */}
                  {singleDivision.landsCount ?? "0"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Cultivations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {categories.reduce((sum, cat) => sum + cat.cultivations, 0)}
                </div>
              </CardContent>
            </Card>
          </div>

          {isCropPopupOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
              onClick={() => setIsCropPopupOpen(false)}
            >
              <div
                className="max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <CropForm onClose={() => setIsCropPopupOpen(false)} />
              </div>
            </div>
          )}

          {/* Categories */}
          <Tabs defaultValue="categories">
            <TabsList>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="crops">Crop Management</TabsTrigger>
              <TabsTrigger value="newCultivated">Create Cultivate</TabsTrigger>
            </TabsList>

            <TabsContent value="categories">
              <Card>
                <CardHeader>
                  <CardTitle>Agricultural Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((category) => (
                      <Card key={category.id} className="card-hover">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-3">
                            {category.name}
                          </h3>
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">
                                Farmers:
                              </span>
                              <span className="font-medium">
                                {category.farmers}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">
                                Lands:
                              </span>
                              <span className="font-medium">
                                {category.lands}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">
                                Cultivations:
                              </span>
                              <span className="font-medium">
                                {category.cultivations}
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full" asChild>
                            <Link
                              to={`/District_Officer/${districtId}/${divisionId}/${category.id}`}
                            >
                              Manage {category.name}
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="crops">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Crops List</CardTitle>
                    <Button onClick={() => setIsCropPopupOpen(true)}>
                      Add new Crop
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10 text-gray-500">
                    <p>No crop create yet.</p>
                    <Button
                      variant="link"
                      className="mt-2"
                      onClick={() => setIsCropPopupOpen(true)}
                    >
                      Add new Crop
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* <TabsContent value="newCultivated" className="space-y-4">
            <CultivationForm divisionId={currentDivisionId} />
          </TabsContent> */}
            <TabsContent value="newCultivated">
              <Card>
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Leaf className="h-6 w-6" />
                    Create New Cultivation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <CultivationForm divisionId={currentDivisionId} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <p className="text-xl text-red-800">Loading division data...</p>
      )}
    </div>
  );
};

export default DivisionDetail;
