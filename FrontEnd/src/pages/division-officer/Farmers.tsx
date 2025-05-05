
import React from "react";
import { useOutletContext } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle, XCircle, Clock } from "lucide-react";
import { Category } from "@/types";

interface DashboardContextType {
  currentCategoryId: string;
  currentCategory: Category | undefined;
  currentMenu: string;
}

// Mock farmers data
const mockFarmers = [
  {
    id: "1",
    name: "Nimal Perera",
    nic: "901234567V",
    address: "123 Farm Road, Colombo",
    mobile: "071-1234567",
    status: "Approved",
    category: "1", // Rice Farming
    registrationDate: "2023-06-15"
  },
  {
    id: "2",
    name: "Kumari Silva",
    nic: "895678901V",
    address: "45 Lake View, Kandy",
    mobile: "077-8901234",
    status: "Approved",
    category: "1", // Rice Farming
    registrationDate: "2023-07-22"
  },
  {
    id: "3",
    name: "Ajith Fernando",
    nic: "923456789V",
    address: "78 Hill Street, Nuwara Eliya",
    mobile: "076-5678901",
    status: "Pending",
    category: "2", // Vegetables
    registrationDate: "2023-10-10"
  },
  {
    id: "4",
    name: "Lakshmi Bandara",
    nic: "887654321V",
    address: "92 Garden Avenue, Galle",
    mobile: "070-2345678",
    status: "Approved",
    category: "2", // Vegetables
    registrationDate: "2023-08-05"
  },
  {
    id: "5",
    name: "Ranjan Wijesekera",
    nic: "913489012V",
    address: "15 Coconut Grove, Matara",
    mobile: "075-9012345",
    status: "Pending",
    category: "3", // Long-Term Crops
    registrationDate: "2023-11-18"
  },
  {
    id: "6",
    name: "Dilani Rathnayake",
    nic: "876543210V",
    address: "33 Tea Estate Road, Hatton",
    mobile: "071-8765432",
    status: "Rejected",
    category: "1", // Rice Farming
    registrationDate: "2023-09-05"
  }
];

const Farmers: React.FC = () => {
  const { currentCategoryId, currentCategory } = useOutletContext<DashboardContextType>();
  const [searchNic, setSearchNic] = React.useState("");
  
  // Filter farmers based on selected category and search query
  const filteredFarmers = mockFarmers.filter(farmer => 
    (farmer.category === currentCategoryId) && 
    (searchNic === "" || farmer.nic.toLowerCase().includes(searchNic.toLowerCase()))
  );

  // Helper function to render status badge with appropriate color
  const renderStatusBadge = (status: string) => {
    switch(status) {
      case "Approved":
        return (
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            {status}
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
            <Clock className="mr-1 h-3 w-3" />
            {status}
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
            <XCircle className="mr-1 h-3 w-3" />
            {status}
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Farmers - {currentCategory?.name}</CardTitle>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              placeholder="Search by NIC..."
              value={searchNic}
              onChange={(e) => setSearchNic(e.target.value)}
              className="max-w-xs"
            />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>NIC</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFarmers.length > 0 ? (
                filteredFarmers.map(farmer => (
                  <TableRow key={farmer.id}>
                    <TableCell className="font-medium">{farmer.name}</TableCell>
                    <TableCell>{farmer.nic}</TableCell>
                    <TableCell>{farmer.address}</TableCell>
                    <TableCell>{farmer.mobile}</TableCell>
                    <TableCell>
                      {renderStatusBadge(farmer.status)}
                    </TableCell>
                    <TableCell>{farmer.registrationDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View</Button>
                        {farmer.status === "Pending" && (
                          <>
                            <Button size="sm" variant="default">Approve</Button>
                            <Button size="sm" variant="destructive">Reject</Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                    No farmers found for {currentCategory?.name}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Farmers;
