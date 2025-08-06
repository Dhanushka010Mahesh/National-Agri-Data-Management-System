import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Users, UserPlus, Building, MapPin, ArrowLeft } from "lucide-react";
import FarmerSignUp from "../farmer/FarmerSignUp";

// const registerFormSchema = z.object({
//   nic: z.string().min(1, { message: "NIC is required" }),
//   name: z.string().min(1, { message: "Name is required" }),
//   mobile: z.string().min(10, { message: "Mobile number must be at least 10 digits" }),
//   address: z.string().min(1, { message: "Address is required" }),
//   bankAccount: z.string().optional(),
//   username: z.string().min(3, { message: "Username must be at least 3 characters" }),
//   password: z.string().min(6, { message: "Password must be at least 6 characters" }),
//   confirmPassword: z.string().min(6, { message: "Confirm password is required" }),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

// type RegisterFormValues = z.infer<typeof registerFormSchema>;

// const Register: React.FC = () => {
//   const { register } = useAuth();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(false);

//   const form = useForm<RegisterFormValues>({
//     resolver: zodResolver(registerFormSchema),
//     defaultValues: {
//       nic: "",
//       name: "",
//       mobile: "",
//       address: "",
//       bankAccount: "",
//       username: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const onSubmit = async (data: RegisterFormValues) => {
//     setIsLoading(true);
    
//     try {
//       const success = await register({
//         nic: data.nic,
//         name: data.name,
//         // Other fields would be added here
//         password: data.password,
//       });
      
//       if (success) {
//         toast({
//           title: "Registration Successful",
//           description: "Your account has been created successfully.",
//         });
//         navigate("/registration-success");
//       } else {
//         toast({
//           title: "Registration Failed",
//           description: "There was a problem registering your account. Please try again.",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       toast({
//         title: "Registration Error",
//         description: "An error occurred during registration. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
          <CardDescription className="text-center">
            Create a new account to access Agri-Connect
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIC</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your National ID Card number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bankAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Account (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your bank account number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Choose a username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Create a password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card> */}
  //   </div>
  // );
  const Register = () => {
    const navigate = useNavigate();
  

    //...
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    const openSignUp = () => setIsSignUpOpen(true);
    const closeSignUp = () => setIsSignUpOpen(false);
    //...
    const buttonData = [
      {
        title: "Farmer SignUp",
        description: "Register as a farmer",
        icon: Users,
        onClick: () => navigate("/register/farmerSignUp"),
        className: "bg-green-600 hover:bg-green-700"
      }
    ];
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate('/District_Officer/dfm')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Pages Check
        </Button>


          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Agricultural Management System
            </h1>
            <p className="text-lg text-gray-600">
              Choose your registration type or sign in to continue
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {buttonData.map((button, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <Button
                    onClick={button.onClick}
                    className={`w-full h-24 ${button.className} text-white transition-all duration-300 hover:scale-105`}
                    size="lg"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <button.icon className="h-8 w-8" />
                      <span className="text-lg font-semibold">{button.title}</span>
                      <span className="text-sm opacity-90">{button.description}</span>
                    </div>
                  </Button>

                  //....
                  <Button
              onClick={openSignUp}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Sign Up as Farmer
            </Button>
                  <FarmerSignUp isOpen={isSignUpOpen} onClose={closeSignUp} />
                  //...
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default Register;
