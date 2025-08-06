
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { getMockLandsByFarmerId } from "@/services/mockData";
import { Search } from "lucide-react";
import LandForm from "@/components/LandForm";

const LandList: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get lands for the logged-in farmer
  const lands = user ? getMockLandsByFarmerId(user.id) : [];
  const [isLandPopupOpen, setIsLandPopupOpen] = useState(false);
  
  // Filter lands based on search term
  const filteredLands = lands.filter((land) => 
    land.address.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
    land.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    land.address.district.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Lands</h1>
          <Button asChild onClick={() => setIsLandPopupOpen(true)} >
            <Link to="/farmer/lands">Add New Land</Link>
          </Button>
        </div>
        {isLandPopupOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setIsLandPopupOpen(false)}
        >
          <div 
            className="max-w-5xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <LandForm onClose={() => setIsLandPopupOpen(false)} />
          </div>
        </div>
      )}
        
        {/* Search bar */}
        <div className="relative max-w-md mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search by address or district..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {filteredLands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLands.map((land) => (
              <Link to={`/farmer/lands/${land.id}`} key={land.id}>
                <Card className="card-hover h-full">
                  <CardContent className="p-6">
                    <div className={`flex items-center justify-center h-32 mb-4 rounded-md ${land.approved ? 'bg-green-100' : 'bg-amber-100'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 ${land.approved ? 'text-green-500' : 'text-amber-500'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">
                      {land.address.no} {land.address.street}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {land.address.city}, {land.address.district}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-500 block mb-1">Irrigation:</span>
                        <span className="font-medium">{land.irrigationType}</span>
                      </div>
                      
                      {land.paddyLandType && (
                        <div>
                          <span className="text-sm text-gray-500 block mb-1">Type:</span>
                          <span className="font-medium">{land.paddyLandType}</span>
                        </div>
                      )}
                      
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${land.approved ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                          {land.approved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Lands Found</h3>
            
            {searchTerm ? (
              <p className="text-gray-600 mb-6">
                No lands match your search for "{searchTerm}". Try a different search term or clear the search.
              </p>
            ) : (
              <p className="text-gray-600 mb-6">
                You haven't registered any lands yet. Start by adding your first land.
              </p>
            )}
            
            <Button asChild onClick={() => setIsLandPopupOpen(true)} >
              <Link to="/farmer/lands">Add New Land</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandList;
