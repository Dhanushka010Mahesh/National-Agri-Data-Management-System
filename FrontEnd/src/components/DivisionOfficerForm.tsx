import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, UserPlus, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";

interface DivisionOfficerFormProps {
  onClose: () => void;
}

const DivisionOfficerForm = ({ onClose }: DivisionOfficerFormProps) => {
  const { toast } = useToast();
  const { districtId ,divisionId} = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    divisionOfficeName: "",
    district: { id: districtId },
    division: { id: divisionId }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:8080/api/v1/users/division-officer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Division Officer created successfully!",
        });
        onClose();
      } else {
        throw new Error("Failed to create division officer");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create division officer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Create Division Officer</h2>
              <p className="text-blue-100 mt-1">Add a new divisional administrative officer</p>
            </div>
          </div>
          <Button 
            onClick={onClose} 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-white/20 rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Username
              </Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg h-12"
                placeholder="Enter username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg h-12"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg h-12"
              placeholder="Enter email address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="divisionOfficeName" className="text-gray-700 font-medium flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-600" />
              Division Office Name
            </Label>
            <Input
              id="divisionOfficeName"
              value={formData.divisionOfficeName}
              onChange={(e) => setFormData({ ...formData, divisionOfficeName: e.target.value })}
              required
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg h-12"
              placeholder="Enter division office name"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                "Create Division Officer"
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="px-8 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DivisionOfficerForm;