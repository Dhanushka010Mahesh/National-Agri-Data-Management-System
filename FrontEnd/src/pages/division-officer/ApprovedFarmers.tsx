
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
import { Search, CheckCircle, XCircle } from "lucide-react";
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
    date: "2023-06-15"
  },
  {
    id: "2",
    name: "Kumari Silva",
    nic: "895678901V",
    address: "45 Lake View, Kandy",
    mobile: "077-8901234",
    status: "Approved",
    category: "1", // Rice Farming
    date: "2023-07-22"
  },
  {
    id: "3",
    name: "Ajith Fernando",
    nic: "923456789V",
    address: "78 Hill Street, Nuwara Eliya",
    mobile: "076-5678901",
    status: "Approved",
    category: "2", // Vegetables
    date: "2023-05-10"
  },
  {
    id: "4",
    name: "Lakshmi Bandara",
    nic: "887654321V",
    address: "92 Garden Avenue, Galle",
    mobile: "070-2345678",
    status: "Approved",
    category: "2", // Vegetables
    date: "2023-08-05"
  },
  {
    id: "5",
    name: "Ranjan Wijesekera",
    nic: "913489012V",
    address: "15 Coconut Grove, Matara",
    mobile: "075-9012345",
    status: "Approved",
    category: "3", // Long-Term Crops
    date: "2023-04-18"
  }
];

const ApprovedFarmers: React.FC = () => {
  const { currentCategoryId, currentCategory } = useOutletContext<DashboardContextType>();
  const [searchNic, setSearchNic] = React.useState("");
  
  // Filter farmers based on selected category and search query
  const filteredFarmers = mockFarmers.filter(farmer => 
    (farmer.category === currentCategoryId) && 
    (searchNic === "" || farmer.nic.toLowerCase().includes(searchNic.toLowerCase()))
  );

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Approved Farmers - {currentCategory?.name}</CardTitle>
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
                <TableHead>Approval Date</TableHead>
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
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        {farmer.status}
                      </span>
                    </TableCell>
                    <TableCell>{farmer.date}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="mr-1 h-3 w-3" />
                          Revoke
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                    No approved farmers found for {currentCategory?.name}
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

export default ApprovedFarmers;
