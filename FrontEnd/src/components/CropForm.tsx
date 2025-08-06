import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Wheat, Sprout, Calendar, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CropFormProps {
  onClose: () => void;
}

const CropForm = ({ onClose }: CropFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    growthDurationDays: 0,
    expectedYieldPerHectare: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:8080/api/v1/crops/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Crop created successfully!",
        });
        onClose();
      } else {
        throw new Error("Failed to create crop");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create crop. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-emerald-50 rounded-xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Wheat className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Create New Crop</h2>
              <p className="text-emerald-100 mt-1">Add a new crop type to the system</p>
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
              <Label htmlFor="name" className="text-gray-700 font-medium flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-600" />
                Crop Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-12"
                placeholder="Enter crop name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-700 font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                Category
              </Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., VEGETABLES, FRUITS"
                required
                className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-12"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="growthDurationDays" className="text-gray-700 font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Growth Duration (Days)
              </Label>
              <Input
                id="growthDurationDays"
                type="number"
                value={formData.growthDurationDays}
                onChange={(e) => setFormData({ ...formData, growthDurationDays: parseInt(e.target.value) })}
                required
                className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-12"
                placeholder="Enter growth duration"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedYieldPerHectare" className="text-gray-700 font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Expected Yield Per Hectare
              </Label>
              <Input
                id="expectedYieldPerHectare"
                type="number"
                step="0.1"
                value={formData.expectedYieldPerHectare}
                onChange={(e) => setFormData({ ...formData, expectedYieldPerHectare: parseFloat(e.target.value) })}
                required
                className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-12"
                placeholder="Enter expected yield"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                "Create Crop"
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

export default CropForm;
