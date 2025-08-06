import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { districts, divisions, getDivisionsByDistrictId } from "@/services/mockDataSignUp";
import { ArrowLeft } from "lucide-react";

const DivisionSignUp = () => {
  const navigate = useNavigate();
  const { districtId, divisionId } = useParams();
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    divisionOfficeName: "",
    districtId: "",
    divisionId: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDistrictChange = (districtId: string) => {
    const id = parseInt(districtId);
    setSelectedDistrictId(id);
    setFormData(prev => ({ ...prev, districtId, divisionId: "" }));
  };

  const validateForm = () => {
    const requiredFields = ['username', 'password', 'email', 'divisionOfficeName', 'districtId', 'divisionId'];
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return false;
      }
    }
    
    if (!formData.email.includes('@')) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    const submitData = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      divisionOfficeName: formData.divisionOfficeName,
      district: {
        id: districtId
      },
      division: {
        id: divisionId
      }
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1/users/division-officer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Division officer account created successfully!"
        });
        navigate('/');
      } else {
        throw new Error('Failed to create account');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create division officer account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const availableDivisions = selectedDistrictId ? getDivisionsByDistrictId(selectedDistrictId) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-lg mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/register')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center text-blue-700">
              Division Officer Registration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="divisionOfficeName">Division Office Name *</Label>
                <Input
                  id="divisionOfficeName"
                  value={formData.divisionOfficeName}
                  onChange={(e) => handleInputChange('divisionOfficeName', e.target.value)}
                  placeholder="e.g., Galagedara Division Office"
                  required
                />
              </div>

              <div>
                <Label>District *</Label>
                <Select onValueChange={handleDistrictChange} value={formData.districtId}>
                  <SelectTrigger>
                    <SelectValue placeholder={"Selected District Id "+districtId} />
                  </SelectTrigger>
                  {/* <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district.id} value={district.id.toString()}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent> */}
                </Select>
              </div>

              <div>
                <Label>Division *</Label>
                <Select onValueChange={(value) => handleInputChange('divisionId', value)} value={formData.divisionId}>
                  <SelectTrigger>
                    <SelectValue placeholder={"Selected Division Id "+divisionId} />
                  </SelectTrigger>
                  {/* <SelectContent>
                    {availableDivisions.map((division) => (
                      <SelectItem key={division.id} value={division.id.toString()}>
                        {division.name}
                      </SelectItem>
                    ))}
                  </SelectContent> */}
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Division Officer Account"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DivisionSignUp;