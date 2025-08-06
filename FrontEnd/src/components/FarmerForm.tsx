import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Tractor, User, Home, CreditCard, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";

interface FarmerFormProps {
  onClose: () => void;
}

const FarmerForm = ({ onClose }: FarmerFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { districtId , divisionId } = useParams();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    nic: "",
    mobileNumber: "",
    division: { id: divisionId },
    district: { id: districtId },
    address: {
      number: "",
      street: "",
      city: "",
      state: "",
      postalCode: ""
    },
    bank: {
      accountNumber: "",
      bankName: ""
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:8080/api/v1/users/farmer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Farmer created successfully!",
        });
        onClose();
      } else {
        throw new Error("Failed to create farmer");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create farmer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-teal-50 rounded-xl shadow-2xl overflow-hidden max-h-[85vh]">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Tractor className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Create Farmer</h2>
              <p className="text-teal-100 mt-1">Register a new farmer in the system</p>
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

      {/* Form Content - Scrollable */}
      <div className="p-8 overflow-y-auto max-h-[calc(85vh-120px)]">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Account Information */}
          <div className="bg-white p-6 rounded-lg border border-teal-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-teal-600" />
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  Username
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-lg h-12"
                  placeholder="Enter username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-lg h-12"
                  placeholder="Enter password"
                />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-600" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-lg h-12"
                placeholder="Enter email address"
              />
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white p-6 rounded-lg border border-teal-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-lg h-12"
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nic" className="text-gray-700 font-medium">NIC</Label>
                <Input
                  id="nic"
                  value={formData.nic}
                  onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
                  required
                  className="border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-lg h-12"
                  placeholder="Enter NIC number"
                />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <Label htmlFor="mobileNumber" className="text-gray-700 font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-600" />
                Mobile Number
              </Label>
              <Input
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                required
                className="border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-lg h-12"
                placeholder="Enter mobile number"
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white p-6 rounded-lg border border-teal-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Home className="w-5 h-5 text-teal-600" />
              Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="number" className="text-gray-700 font-medium">Number</Label>
                <Input
                  id="number"
                  value={formData.address.number}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    address: { ...formData.address, number: e.target.value }
                  })}
                  required
                  className="border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-lg h-12"
                  placeholder="House number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street" className="text-gray-700 font-medium">Street</Label>
                <Input
                  id="street"
                  value={formData.address.street}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    address: { ...formData.address, street: e.target.value }
                  })}
                  required
                  className="border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-lg h-12"
                  placeholder="Street name"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-gray-700 font-medium">City</Label>
                <Input
                  id="city"
                  value={formData.address.city}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    address: { ...formData.address, city: e.target.value }
                  })}
                  required
                  className="border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-lg h-12"
                  placeholder="City name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-gray-700 font-medium">State</Label>
                <Input
                  id="state"
                  value={formData.address.state}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    address: { ...formData.address, state: e.target.value }
                  })}
                  required
                  className="border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-lg h-12"
                  placeholder="State/Province"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode" className="text-gray-700 font-medium">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={formData.address.postalCode}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    address: { ...formData.address, postalCode: e.target.value }
                  })}
                  required
                  className="border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-lg h-12"
                  placeholder="Postal code"
                />
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-white p-6 rounded-lg border border-teal-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-teal-600" />
              Bank Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="accountNumber" className="text-gray-700 font-medium">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={formData.bank.accountNumber}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    bank: { ...formData.bank, accountNumber: e.target.value }
                  })}
                  required
                  className="border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-lg h-12"
                  placeholder="Bank account number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankName" className="text-gray-700 font-medium">Bank Name</Label>
                <Input
                  id="bankName"
                  value={formData.bank.bankName}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    bank: { ...formData.bank, bankName: e.target.value }
                  })}
                  required
                  className="border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-lg h-12"
                  placeholder="Bank name"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6 border-t border-gray-200 bg-white rounded-lg p-6">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                "Create Farmer"
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

export default FarmerForm;
