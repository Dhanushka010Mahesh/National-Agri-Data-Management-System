
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RegistrationSuccess: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-green-600">Registration Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 text-green-500" 
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          
          <p className="text-gray-700">
            Your account has been created successfully. You can now login to access Agri-Connect.
          </p>
          
          <p className="text-gray-700">
            Your registration will be reviewed by a Division Officer. You will receive notifications once your account is approved.
          </p>
          
          <div className="pt-4">
            <Button asChild className="w-full">
              <Link to="/login">Proceed to Login</Link>
            </Button>
          </div>
          
          <div className="pt-2">
            <Button asChild variant="outline" className="w-full">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationSuccess;
