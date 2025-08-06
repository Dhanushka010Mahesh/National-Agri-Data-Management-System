import React, { useState } from 'react';
import { X, Building2, MapPin, Hash, Map, Building, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'react-router-dom';

interface DivisionOfficePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const stateOptions = [
  'Western_Province',
  'Central_Province',
  'Southern_Province',
  'Northern_Province',
  'Eastern_Province',
  'North_Western_Province',
  'North_Central_Province',
  'Uva_Province',
  'Sabaragamuwa_Province'
];

// Mock districts data - replace with actual API call
const districts = [
  { id: 1, name: 'Colombo' },
  { id: 2, name: 'Gampaha' },
  { id: 3, name: 'Kalutara' },
  { id: 4, name: 'Kandy' },
  { id: 5, name: 'Matale' },
  { id: 6, name: 'Nuwara Eliya' },
  { id: 7, name: 'Galle' },
  { id: 8, name: 'Matara' },
  { id: 9, name: 'Hambantota' },
  { id: 10, name: 'Jaffna' },
];

const DivisionOfficePopup: React.FC<DivisionOfficePopupProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const { districtId} = useParams();
  const [formData, setFormData] = useState({
    name: '',
    districtId: '',
    number: '',
    street: '',
    city: '',
    state: '',
    postalCode: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const requestData = {
        name: formData.name,
        district: {
          id: districtId
        },
        address: {
          number: formData.number,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode
        }
      };

      console.log('Submitting division data:', requestData);

      const response = await fetch('http://localhost:8080/api/v1/divisions/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Division office created successfully!",
        });
        setFormData({
          name: '',
          districtId: '',
          number: '',
          street: '',
          city: '',
          state: '',
          postalCode: ''
        });
        onClose();
      } else {
        throw new Error('Failed to create division office');
      }
    } catch (error) {
      console.error('Error creating division office:', error);
      toast({
        title: "Error",
        description: "Failed to create division office. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 rounded-full p-2">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Create Division Office</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-blue-600" />
              Basic Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="division-name">Division Name *</Label>
                <Input
                  id="division-name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter division name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="district">District *</Label>
                <Select value={formData.districtId} onValueChange={(value) => handleInputChange('districtId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={"Select district Id "+districtId} />
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
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-green-600" />
              Address Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Number *</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="number"
                    value={formData.number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                    placeholder="No 95"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="street">Street *</Label>
                <div className="relative">
                  <Map className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) => handleInputChange('street', e.target.value)}
                    placeholder="Jaffna Road"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Kirinda"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="postal-code">Postal Code *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="postal-code"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    placeholder="54100"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State/Province *</Label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state/province" />
                </SelectTrigger>
                <SelectContent>
                  {stateOptions.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state.replace(/_/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? 'Creating...' : 'Create Division Office'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DivisionOfficePopup;