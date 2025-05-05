
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const DistrictDetail: React.FC = () => {
  const { districtId } = useParams();
  const { user } = useAuth();

  // Mock division data - in a real app this would come from an API
  const divisions = [
    { id: "div1", name: "Division 1", farmers: 32, lands: 48 },
    { id: "div2", name: "Division 2", farmers: 26, lands: 38 },
    { id: "div3", name: "Division 3", farmers: 19, lands: 27 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Button variant="outline" asChild className="mb-4">
              <Link to="/District_Officer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Districts
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">District {districtId} Details</h1>
            <p className="text-gray-600 mt-2">Welcome, {user?.name || 'Officer'}</p>
          </div>
          <Button>Add Division</Button>
        </div>

        {/* District Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Divisions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{divisions.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {divisions.reduce((sum, div) => sum + div.farmers, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Agricultural Lands</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {divisions.reduce((sum, div) => sum + div.lands, 0)}
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
              {divisions.map(division => (
                <Card key={division.id} className="card-hover shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{division.name}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Farmers:</span>
                        <span className="font-medium">{division.farmers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Agricultural Lands:</span>
                        <span className="font-medium">{division.lands}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/District_Officer/${districtId}/${division.id}/Rice`}>Manage Division</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DistrictDetail;
