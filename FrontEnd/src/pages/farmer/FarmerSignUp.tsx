import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { FarmerSignUpData } from '@/types/farmer';
import { useToast } from '@/hooks/use-toast';

interface FarmerSignUpProps {
  isOpen: boolean;
  onClose: () => void;
}
interface Division {
  id: number;
}

interface District {
  id: number;
}

interface Address {
  number: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

interface Bank {
  accountNumber: string;
  bankName: string;
}

interface FarmerSignUpData {
  username: string;
  password: string;
  email: string;
  fullName: string;
  nic: string;
  mobileNumber: string;
  division: Division;
  district: District;
  address: Address;
  bank: Bank;
}

const FarmerSignUp: React.FC<FarmerSignUpProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FarmerSignUpData>({
    username: '',
    password: '',
    email: '',
    fullName: '',
    nic: '',
    mobileNumber: '',
    division: { id: 1 },
    district: { id: 1 },
    address: {
      number: '',
      street: '',
      city: '',
      state: '',
      postalCode: ''
    },
    bank: {
      accountNumber: '',
      bankName: ''
    }
  });

  // const handleInputChange = (field: string, value: string) => {
  //   if (field.includes('.')) {
  //     const [parent, child] = field.split('.');
  //     setFormData(prev => ({
  //       ...prev,
  //       [parent]: {
  //         ...prev[parent as keyof FarmerSignUpData],
  //         [child]: value
  //       }
  //     }));
  //   } else {
  //     setFormData(prev => ({
  //       ...prev,
  //       [field]: value
  //     }));
  //   }
  // };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('localhost:8080/api/v1/users/farmer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Farmer account created successfully.",
        });
        onClose();
        setFormData({
          username: '',
          password: '',
          email: '',
          fullName: '',
          nic: '',
          mobileNumber: '',
          division: { id: 1 },
          district: { id: 1 },
          address: {
            number: '',
            street: '',
            city: '',
            state: '',
            postalCode: ''
          },
          bank: {
            accountNumber: '',
            bankName: ''
          }
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to create farmer account. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error creating farmer account:', error);
      toast({
        title: "Error",
        description: "Network error. Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-2xl font-bold text-green-700">
            Create Farmer Account
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    // onChange={(e) => handleInputChange('username', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    // onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    // onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    // onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="nic">NIC *</Label>
                  <Input
                    id="nic"
                    type="text"
                    value={formData.nic}
                    // onChange={(e) => handleInputChange('nic', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="mobileNumber">Mobile Number *</Label>
                  <Input
                    id="mobileNumber"
                    type="tel"
                    value={formData.mobileNumber}
                    // onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Address Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="addressNumber">House Number *</Label>
                  <Input
                    id="addressNumber"
                    type="text"
                    value={formData.address.number}
                    // onChange={(e) => handleInputChange('address.number', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="street">Street *</Label>
                  <Input
                    id="street"
                    type="text"
                    value={formData.address.street}
                    // onChange={(e) => handleInputChange('address.street', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.address.city}
                    // onChange={(e) => handleInputChange('address.city', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    type="text"
                    value={formData.address.state}
                    // onChange={(e) => handleInputChange('address.state', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    type="text"
                    value={formData.address.postalCode}
                    // onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Location Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="division">Division ID *</Label>
                  <Input
                    id="division"
                    type="number"
                    value={formData.division.id}
                    // onChange={(e) => handleInputChange('division.id', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="district">District ID *</Label>
                  <Input
                    id="district"
                    type="number"
                    value={formData.district.id}
                    // onChange={(e) => handleInputChange('district.id', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Bank Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Bank Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    type="text"
                    value={formData.bank.accountNumber}
                    // onChange={(e) => handleInputChange('bank.accountNumber', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Input
                    id="bankName"
                    type="text"
                    value={formData.bank.bankName}
                    // onChange={(e) => handleInputChange('bank.bankName', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-6"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-6 bg-green-600 hover:bg-green-700 text-white"
              >
                Create Account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerSignUp;