import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, User, Shield, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AgricultureOfficerFormProps {
  onClose: () => void;
}

const AgricultureOfficerForm = ({ onClose }: AgricultureOfficerFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    contactInfo: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:8080/api/v1/users/agriculture-officer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Agriculture Officer created successfully!",
        });
        onClose();
      } else {
        throw new Error("Failed to create agriculture officer");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create agriculture officer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-orange-50 rounded-xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Create Agriculture Officer</h2>
              <p className="text-orange-100 mt-1">Add a new agriculture department officer</p>
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
                <User className="w-4 h-4 text-orange-600" />
                Username
              </Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                className="border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 rounded-lg h-12"
                placeholder="Enter username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 rounded-lg h-12"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-600" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 rounded-lg h-12"
              placeholder="Enter email address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactInfo" className="text-gray-700 font-medium flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-600" />
              Contact Information
            </Label>
            <Input
              id="contactInfo"
              value={formData.contactInfo}
              onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
              required
              className="border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 rounded-lg h-12"
              placeholder="Enter contact information"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                "Create Agriculture Officer"
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

export default AgricultureOfficerForm;
