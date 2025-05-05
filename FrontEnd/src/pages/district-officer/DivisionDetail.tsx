
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DivisionDetail: React.FC = () => {
  const { districtId, divisionId } = useParams();

  // Mock category data
  const categories = [
    { id: "Rice", name: "Rice Farming", farmers: 15, lands: 22, cultivations: 18 },
    { id: "Vegetable", name: "Vegetables", farmers: 8, lands: 12, cultivations: 10 },
    { id: "LongCrops", name: "Long-Term Crops", farmers: 9, lands: 14, cultivations: 7 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Button variant="outline" asChild className="mb-4">
              <Link to={`/District_Officer/${districtId}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to District
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Division {divisionId} Management</h1>
            <p className="text-gray-500 mt-1">District: {districtId}</p>
          </div>
          <div className="space-x-2">
            <Button variant="outline">Edit Division</Button>
            <Button>Assign Officer</Button>
          </div>
        </div>

        {/* Division Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {categories.reduce((sum, cat) => sum + cat.farmers, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Lands</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {categories.reduce((sum, cat) => sum + cat.lands, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Cultivations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {categories.reduce((sum, cat) => sum + cat.cultivations, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <Tabs defaultValue="categories">
          <TabsList>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="officers">Division Officers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Agricultural Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {categories.map(category => (
                    <Card key={category.id} className="card-hover">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-3">{category.name}</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Farmers:</span>
                            <span className="font-medium">{category.farmers}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Lands:</span>
                            <span className="font-medium">{category.lands}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Cultivations:</span>
                            <span className="font-medium">{category.cultivations}</span>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to={`/District_Officer/${districtId}/${divisionId}/${category.id}`}>
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
          <TabsContent value="officers">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Division Officers</CardTitle>
                  <Button>Assign New Officer</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10 text-gray-500">
                  <p>No division officers assigned yet.</p>
                  <Button variant="link" className="mt-2">Assign Division Officer</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Division Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Division Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Division Name</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          placeholder="Division Name"
                          defaultValue={`Division ${divisionId}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          placeholder="Location"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DivisionDetail;
