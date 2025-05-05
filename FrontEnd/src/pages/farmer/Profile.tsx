
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    nic: user?.nic || "",
    mobile: "0771234567", // Mock data
    address: "123 Farm Road, Colombo", // Mock data
    bankAccount: "1234567890", // Mock data
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the updated data to the server
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    
    setIsEditing(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-6">
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback className="text-4xl">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-2xl font-bold text-center mb-2">{user?.name}</h2>
              <p className="text-gray-500 text-center mb-6">{user?.nic}</p>
              
              <Button onClick={() => setIsEditing(!isEditing)} className="w-full">
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </Button>
            </CardContent>
          </Card>
          
          {/* Profile Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{isEditing ? "Edit Profile" : "Profile Details"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nic">NIC Number</Label>
                    <Input
                      id="nic"
                      name="nic"
                      value={formData.nic}
                      onChange={handleChange}
                      disabled={true} // NIC cannot be changed
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bankAccount">Bank Account Number</Label>
                    <Input
                      id="bankAccount"
                      name="bankAccount"
                      value={formData.bankAccount}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                
                {isEditing && (
                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Account Security Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  
                  <Button
                    type="button"
                    onClick={() => {
                      toast({
                        title: "Password Changed",
                        description: "Your password has been successfully changed.",
                      });
                    }}
                  >
                    Change Password
                  </Button>
                </form>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                <p className="text-gray-600 mb-6">
                  Two-factor authentication adds an extra layer of security to your account. When enabled, you'll need to provide a code from your phone in addition to your password when logging in.
                </p>
                
                <Button variant="outline">Enable Two-Factor Authentication</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
