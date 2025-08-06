import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, MapPin, Home, Ruler, Droplets, Map } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";

interface LandFormProps {
  onClose: () => void;
}

const LandForm = ({ onClose }: LandFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { districtId , divisionId } = useParams();
  const [formData, setFormData] = useState({
    landOwnerNIC: "",
    landOwnerName: "",
    address: {
      number: "",
      street: "",
      city: "",
      state: "",
      postalCode: ""
    },
    landExtent: 0,
    type: {
      typeName: "",
      soilType: ""
    },
    irrigationType: "",
    geoCoordinates: "",
    division: { id: divisionId },
    district: { id: districtId }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:8080/api/v1/lands/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Land created successfully!",
        });
        onClose();
      } else {
        throw new Error("Failed to create land");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create land. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-amber-50 rounded-xl shadow-2xl overflow-hidden max-h-[85vh]">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-8 py-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Create New Land</h2>
              <p className="text-amber-100 mt-1">Register a new land property</p>
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
          {/* Owner Information */}
          <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Home className="w-5 h-5 text-amber-600" />
              Owner Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="landOwnerNIC" className="text-gray-700 font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  Land Owner NIC
                </Label>
                <Input
                  id="landOwnerNIC"
                  value={formData.landOwnerNIC}
                  onChange={(e) => setFormData({ ...formData, landOwnerNIC: e.target.value })}
                  required
                  className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg h-12"
                  placeholder="Enter NIC number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="landOwnerName" className="text-gray-700 font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  Land Owner Name
                </Label>
                <Input
                  id="landOwnerName"
                  value={formData.landOwnerName}
                  onChange={(e) => setFormData({ ...formData, landOwnerName: e.target.value })}
                  required
                  className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg h-12"
                  placeholder="Enter owner name"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-600" />
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
                  className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg h-12"
                  placeholder="House/lot number"
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
                  className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg h-12"
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
                  className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg h-12"
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
                  className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg h-12"
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
                  className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg h-12"
                  placeholder="Postal code"
                />
              </div>
            </div>
          </div>

          {/* Land Details */}
          <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-amber-600" />
              Land Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="landExtent" className="text-gray-700 font-medium">Land Extent (Hectares)</Label>
                <Input
                  id="landExtent"
                  type="number"
                  step="0.001"
                  value={formData.landExtent}
                  onChange={(e) => setFormData({ ...formData, landExtent: parseFloat(e.target.value) })}
                  required
                  className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg h-12"
                  placeholder="Land size in hectares"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="irrigationType" className="text-gray-700 font-medium flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-amber-600" />
                  Irrigation Type
                </Label>
                <Input
                  id="irrigationType"
                  value={formData.irrigationType}
                  onChange={(e) => setFormData({ ...formData, irrigationType: e.target.value })}
                  required
                  className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg h-12"
                  placeholder="Irrigation method"
                />
              </div>
            </div>
          </div>

          {/* Soil Type */}
          <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Soil Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="typeName" className="text-gray-700 font-medium">Type Name</Label>
                <Input
                  id="typeName"
                  value={formData.type.typeName}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    type: { ...formData.type, typeName: e.target.value }
                  })}
                  required
                  className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg h-12"
                  placeholder="Soil type name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="soilType" className="text-gray-700 font-medium">Soil Type</Label>
                <Input
                  id="soilType"
                  value={formData.type.soilType}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    type: { ...formData.type, soilType: e.target.value }
                  })}
                  required
                  className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg h-12"
                  placeholder="Soil composition"
                />
              </div>
            </div>
          </div>

          {/* Coordinates */}
          <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-sm">
            <div className="space-y-2">
              <Label htmlFor="geoCoordinates" className="text-gray-700 font-medium flex items-center gap-2">
                <Map className="w-4 h-4 text-amber-600" />
                Geographic Coordinates
              </Label>
              <Input
                id="geoCoordinates"
                value={formData.geoCoordinates}
                onChange={(e) => setFormData({ ...formData, geoCoordinates: e.target.value })}
                placeholder="latitude: 7.8731, longitude: 80.7718"
                required
                className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg h-12"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6 border-t border-gray-200 bg-white rounded-lg p-6">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                "Create Land"
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

export default LandForm;
