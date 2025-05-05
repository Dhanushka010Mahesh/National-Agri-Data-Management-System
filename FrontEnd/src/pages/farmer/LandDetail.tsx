
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMockLandById } from "@/services/mockData";
import { CultivationStatus } from "@/types";

const LandDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const land = getMockLandById(id || "");
  
  if (!land) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Land Not Found</h2>
          <p className="text-gray-600 mb-6">The land you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/farmer/lands")}>Return to My Lands</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Land Details</h1>
          <div className="space-x-4">
            <Button variant="outline" asChild>
              <Link to="/farmer/lands">Back to Lands</Link>
            </Button>
            <Button asChild>
              <Link to={`/farmer/lands/${id}/edit`}>Edit Land</Link>
            </Button>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="mb-8">
          <Badge className={`text-base py-1 px-3 ${land.approved ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}>
            {land.approved ? 'Approved Land' : 'Pending Approval'}
          </Badge>
        </div>
        
        {/* Land Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Land Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Address</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-500 block">Street & Number:</span>
                      <span className="font-medium">{land.address.no} {land.address.street}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block">City:</span>
                      <span className="font-medium">{land.address.city}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block">State:</span>
                      <span className="font-medium">{land.address.state}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block">Postal Code:</span>
                      <span className="font-medium">{land.address.postalCode}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block">District:</span>
                      <span className="font-medium">{land.address.district}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Land Properties</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-500 block">Irrigation Type:</span>
                      <span className="font-medium">{land.irrigationType}</span>
                    </div>
                    {land.paddyLandType && (
                      <div>
                        <span className="text-sm text-gray-500 block">Paddy Land Type:</span>
                        <span className="font-medium">{land.paddyLandType}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Approval Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                {land.approved ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              
              <p className="text-center font-medium mb-4">
                {land.approved
                  ? "This land has been approved by your division officer."
                  : "This land is awaiting approval from your division officer."}
              </p>
              
              {!land.approved && (
                <div className="rounded-md bg-amber-50 p-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-amber-700">
                      You'll be notified when your land is approved. You can't add cultivation details until approval.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Cultivation Tabs */}
        <Tabs defaultValue="current" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Cultivation History</h2>
          <TabsList className="mb-4">
            <TabsTrigger value="current">Current Cultivation</TabsTrigger>
            <TabsTrigger value="history">Past Cultivations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current">
            {land.cultivations.filter(c => c.status !== CultivationStatus.COMPLETED).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {land.cultivations
                  .filter(c => c.status !== CultivationStatus.COMPLETED)
                  .map((cultivation) => (
                    <Card key={cultivation.id} className="card-hover">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold">{cultivation.cropType}</h3>
                          <Badge className={`
                            ${cultivation.status === CultivationStatus.APPROVED ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                            ${cultivation.status === CultivationStatus.PENDING ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : ''}
                            ${cultivation.status === CultivationStatus.REJECTED ? 'bg-red-100 text-red-800 hover:bg-red-200' : ''}
                          `}>
                            {cultivation.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm text-gray-500 block">Started:</span>
                            <span className="font-medium">
                              {new Date(cultivation.startDate).toLocaleDateString()}
                            </span>
                          </div>
                          {cultivation.endDate && (
                            <div>
                              <span className="text-sm text-gray-500 block">Expected End:</span>
                              <span className="font-medium">
                                {new Date(cultivation.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/farmer/cultivation/${cultivation.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Active Cultivations</h3>
                
                <p className="text-gray-600 mb-6">
                  There are no active cultivations for this land. Start a new cultivation cycle.
                </p>
                
                {land.approved ? (
                  <Button asChild>
                    <Link to={`/farmer/lands/${id}/add-cultivation`}>Add Cultivation</Link>
                  </Button>
                ) : (
                  <p className="text-amber-600">
                    You can add cultivation details once this land is approved.
                  </p>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            {land.cultivations.filter(c => c.status === CultivationStatus.COMPLETED).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {land.cultivations
                  .filter(c => c.status === CultivationStatus.COMPLETED)
                  .map((cultivation) => (
                    <Card key={cultivation.id} className="card-hover">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold">{cultivation.cropType}</h3>
                          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                            {cultivation.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm text-gray-500 block">Started:</span>
                            <span className="font-medium">
                              {new Date(cultivation.startDate).toLocaleDateString()}
                            </span>
                          </div>
                          {cultivation.endDate && (
                            <div>
                              <span className="text-sm text-gray-500 block">Ended:</span>
                              <span className="font-medium">
                                {new Date(cultivation.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/farmer/cultivation/${cultivation.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Past Cultivations</h3>
                
                <p className="text-gray-600">
                  There are no completed cultivation cycles for this land yet.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LandDetail;
