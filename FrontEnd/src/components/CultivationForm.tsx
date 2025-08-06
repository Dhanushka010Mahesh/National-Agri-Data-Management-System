import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Search, Leaf } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Farmer {
  id: number;
  nic: string;
}

interface PaddyLand {
  id: number;
  landExtent: number;
  landOwnerNIC: string;
}

interface Crop {
  id: number;
  name: string;
  category: string;
  growthDurationDays: number;
  expectedYieldPerHectare: number;
}

interface CultivationFormProps {
  divisionId: string;
}

const CultivationForm: React.FC<CultivationFormProps> = ({ divisionId }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    startDate: "",
    yieldAmount: "",
    cultivationExtent: "",
    farmerId: "",
    paddyLandId: "",
    cropId: "",
    season: "",
  });

  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [lands, setLands] = useState<PaddyLand[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [filteredFarmers, setFilteredFarmers] = useState<Farmer[]>([]);
  const [filteredLands, setFilteredLands] = useState<PaddyLand[]>([]);
  const [filteredCrops, setFilteredCrops] = useState<Crop[]>([]);

  const [searchTerms, setSearchTerms] = useState({
    farmer: "",
    land: "",
    crop: "",
  });

  const [showDropdowns, setShowDropdowns] = useState({
    farmer: false,
    land: false,
    crop: false,
  });

  const [selectedItems, setSelectedItems] = useState({
    farmer: null as Farmer | null,
    land: null as PaddyLand | null,
    crop: null as Crop | null,
  });

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchFarmers();
    fetchLands();
    fetchCrops();
  }, [divisionId]);

  useEffect(() => {
    const filtered = farmers.filter((farmer) =>
      farmer.nic.toLowerCase().includes(searchTerms.farmer.toLowerCase())
    );
    setFilteredFarmers(filtered);
    setShowDropdowns((prev) => ({
      ...prev,
      farmer: searchTerms.farmer.length > 0 && filtered.length > 0,
    }));
  }, [farmers, searchTerms.farmer]);

  useEffect(() => {
    const filtered = lands.filter((land) =>
      land.landOwnerNIC.toLowerCase().includes(searchTerms.land.toLowerCase())
    );
    setFilteredLands(filtered);
    setShowDropdowns((prev) => ({
      ...prev,
      land: searchTerms.land.length > 0 && filtered.length > 0,
    }));
  }, [lands, searchTerms.land]);

  useEffect(() => {
    const filtered = crops.filter((crop) =>
      crop.name.toLowerCase().includes(searchTerms.crop.toLowerCase())
    );
    setFilteredCrops(filtered);
    setShowDropdowns((prev) => ({
      ...prev,
      crop: searchTerms.crop.length > 0 && filtered.length > 0,
    }));
  }, [crops, searchTerms.crop]);

  const fetchFarmers = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/cultivation/farmerGet/${divisionId}`
      );
      const data = await response.json();
      setFarmers(data);
    } catch (error) {
      console.error("Error fetching farmers:", error);
      toast({
        title: "Error",
        description: "Failed to fetch farmers data",
        variant: "destructive",
      });
    }
  };

  const fetchLands = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/cultivation/paddyLandGet/${divisionId}`
      );
      const data = await response.json();
      setLands(data);
    } catch (error) {
      console.error("Error fetching lands:", error);
      toast({
        title: "Error",
        description: "Failed to fetch land data",
        variant: "destructive",
      });
    }
  };

  const fetchCrops = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/cultivation/cropGet`
      );
      const data = await response.json();
      setCrops(data);
    } catch (error) {
      console.error("Error fetching crops:", error);
      toast({
        title: "Error",
        description: "Failed to fetch crops data",
        variant: "destructive",
      });
    }
  };

  const handleSelectFarmer = (farmer: Farmer) => {
    setSelectedItems((prev) => ({ ...prev, farmer }));
    setFormData((prev) => ({ ...prev, farmerId: farmer.id.toString() }));
    setSearchTerms((prev) => ({ ...prev, farmer: farmer.nic }));
    setShowDropdowns((prev) => ({ ...prev, farmer: false }));
  };

  const handleSelectLand = (land: PaddyLand) => {
    setSelectedItems((prev) => ({ ...prev, land }));
    setFormData((prev) => ({ ...prev, paddyLandId: land.id.toString() }));
    setSearchTerms((prev) => ({ ...prev, land: land.landOwnerNIC }));
    setShowDropdowns((prev) => ({ ...prev, land: false }));
  };

  const handleSelectCrop = (crop: Crop) => {
    setSelectedItems((prev) => ({ ...prev, crop }));
    setFormData((prev) => ({ ...prev, cropId: crop.id.toString() }));
    setSearchTerms((prev) => ({ ...prev, crop: crop.name }));
    setShowDropdowns((prev) => ({ ...prev, crop: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        startDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
        yieldAmount: parseFloat(formData.yieldAmount),
        cultivationExtent: parseFloat(formData.cultivationExtent),
        farmerId: { id: parseInt(formData.farmerId) },
        paddyLandId: { id: parseInt(formData.paddyLandId) },
        cropId: { id: parseInt(formData.cropId) },
        season: formData.season,
      };

      const response = await fetch(
        "http://localhost:8080/api/v1/cultivation/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast({
          title: "Success",
          description: "Cultivation data saved successfully!",
          className: "bg-green-50 border-green-200",
        });

        // Reset form
        setFormData({
          startDate: "",
          yieldAmount: "",
          cultivationExtent: "",
          farmerId: "",
          paddyLandId: "",
          cropId: "",
          season: "",
        });
        setSelectedDate(undefined);
        setSearchTerms({ farmer: "", land: "", crop: "" });
        setSelectedItems({ farmer: null, land: null, crop: null });
      } else {
        throw new Error("Failed to save cultivation data");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to save cultivation data",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <Card className="w-full max-w-7xl mx-auto bg-white border-green-200 shadow-lg">
      <CardContent className="p-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Selection Section */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 border-b border-gray-300 pb-2">
                Selection Details
              </h3>

              <div className="space-y-6">
                {/* Farmer Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Search Farmer by NIC *
                  </Label>
                  <div className="relative">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Type farmer NIC to search..."
                        value={searchTerms.farmer}
                        onChange={(e) =>
                          setSearchTerms({
                            ...searchTerms,
                            farmer: e.target.value,
                          })
                        }
                        className="pl-10 border-gray-300 focus:border-green-400 focus:ring-green-400"
                      />
                    </div>
                    {showDropdowns.farmer && (
                      <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto mt-1">
                        {filteredFarmers.map((farmer) => (
                          <div
                            key={farmer.id}
                            className="px-4 py-2 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => handleSelectFarmer(farmer)}
                          >
                            <div className="text-sm font-medium">
                              ID: {farmer.id}
                            </div>
                            <div className="text-xs text-gray-600">
                              NIC: {farmer.nic}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {selectedItems.farmer && (
                    <div className="p-3 bg-green-50 rounded border border-green-200">
                      <div className="text-sm font-medium text-green-800">
                        Selected Farmer
                      </div>
                      <div className="text-xs text-green-600">
                        ID: {selectedItems.farmer.id} - NIC:{" "}
                        {selectedItems.farmer.nic}
                      </div>
                    </div>
                  )}
                </div>

                {/* Land Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Search Land by Owner NIC *
                  </Label>
                  <div className="relative">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Type land owner NIC to search..."
                        value={searchTerms.land}
                        onChange={(e) =>
                          setSearchTerms({
                            ...searchTerms,
                            land: e.target.value,
                          })
                        }
                        className="pl-10 border-gray-300 focus:border-green-400 focus:ring-green-400"
                      />
                    </div>
                    {showDropdowns.land && (
                      <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto mt-1">
                        {filteredLands.map((land) => (
                          <div
                            key={land.id}
                            className="px-4 py-2 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => handleSelectLand(land)}
                          >
                            <div className="text-sm font-medium">
                              ID: {land.id}
                            </div>
                            <div className="text-xs text-gray-600">
                              Owner: {land.landOwnerNIC} ({land.landExtent} ha)
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {selectedItems.land && (
                    <div className="p-3 bg-green-50 rounded border border-green-200">
                      <div className="text-sm font-medium text-green-800">
                        Selected Land
                      </div>
                      <div className="text-xs text-green-600">
                        ID: {selectedItems.land.id} - Owner:{" "}
                        {selectedItems.land.landOwnerNIC} (
                        {selectedItems.land.landExtent} ha)
                      </div>
                    </div>
                  )}
                </div>

                {/* Crop Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Search Crop by Name *
                  </Label>
                  <div className="relative">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Type crop name to search..."
                        value={searchTerms.crop}
                        onChange={(e) =>
                          setSearchTerms({
                            ...searchTerms,
                            crop: e.target.value,
                          })
                        }
                        className="pl-10 border-gray-300 focus:border-green-400 focus:ring-green-400"
                      />
                    </div>
                    {showDropdowns.crop && (
                      <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto mt-1">
                        {filteredCrops.map((crop) => (
                          <div
                            key={crop.id}
                            className="px-4 py-2 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => handleSelectCrop(crop)}
                          >
                            <div className="text-sm font-medium">
                              {crop.name}
                            </div>
                            <div className="text-xs text-gray-600">
                              {crop.category} - {crop.growthDurationDays} days
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {selectedItems.crop && (
                    <div className="p-3 bg-green-50 rounded border border-green-200">
                      <div className="text-sm font-medium text-green-800">
                        Selected Crop
                      </div>
                      <div className="text-xs text-green-600">
                        {selectedItems.crop.name} -{" "}
                        {selectedItems.crop.category} (
                        {selectedItems.crop.growthDurationDays} days)
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Cultivation Details */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 border-b border-gray-300 pb-2">
                Cultivation Details
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="startDate"
                    className="text-sm font-medium text-gray-700"
                  >
                    Start Date *
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-gray-300 hover:border-green-400",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? (
                          format(selectedDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < tomorrow}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="season"
                    className="text-sm font-medium text-gray-700"
                  >
                    Season *
                  </Label>
                  <Select
                    value={formData.season}
                    onValueChange={(value) =>
                      setFormData({ ...formData, season: value })
                    }
                  >
                    <SelectTrigger className="border-gray-300 hover:border-green-400">
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="YALA">YALA</SelectItem>
                      <SelectItem value="MAHA">MAHA</SelectItem>
                      <SelectItem value="ALL_YEAR">ALL YEAR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="yieldAmount"
                    className="text-sm font-medium text-gray-700"
                  >
                    Expected Yield Amount (kg) *
                  </Label>
                  <Input
                    id="yieldAmount"
                    type="number"
                    step="0.01"
                    value={formData.yieldAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, yieldAmount: e.target.value })
                    }
                    className="border-gray-300 focus:border-green-400 focus:ring-green-400"
                    placeholder="Enter yield amount"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="cultivationExtent"
                    className="text-sm font-medium text-gray-700"
                  >
                    Cultivation Extent (hectares) *
                  </Label>
                  <Input
                    id="cultivationExtent"
                    type="number"
                    step="0.01"
                    value={formData.cultivationExtent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cultivationExtent: e.target.value,
                      })
                    }
                    className="border-gray-300 focus:border-green-400 focus:ring-green-400"
                    placeholder="Enter cultivation extent"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 font-medium"
            >
              {isSubmitting ? "Saving..." : "Save Cultivation"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CultivationForm;
