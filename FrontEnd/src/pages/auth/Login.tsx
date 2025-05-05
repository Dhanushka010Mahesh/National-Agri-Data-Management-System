
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
import { UserRole } from "@/types";

const loginFormSchema = z.object({
  nic: z.string().min(1, { message: "NIC/Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      nic: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      const success = await login(data.nic, data.password);
      
      if (success) {
        toast({
          title: "Login Successful",
          description: "You have been successfully logged in.",
        });
        
        // Redirect based on user role (this will be handled by AuthRedirect in App.tsx)
        navigate("/");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid NIC/Username or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle quick login buttons with correct credentials
  const handleQuickLogin = (userType: string) => {
    // let username = userType;
    // let password = userType === "farmer" ? "password" : "1234";
    
    // form.setValue("nic", username);
    // form.setValue("password", password);
    
    // // Submit form with these values
    // form.handleSubmit(onSubmit)();
    form.setValue("nic", userType);
    form.setValue("password", "password");
    // Navigate to specific route based on user type
    if (userType === "division") {
      navigate("/division-officer");
    } else if (userType === "district") {
      navigate("/District_Officer");
    } else if (userType === "farmer") {
      //navigate("/farmer/profile");
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your NIC/Username and password to login
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
                    <FormLabel>NIC/Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your NIC or Username" {...field} />
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
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-sm text-right">
                <Link to="/forgot-password" className="text-primary hover:text-primary-dark">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              
              {/* Quick login for demo purposes */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-center mb-2">Demo logins:</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin("farmer")}
                  >
                    Farmer
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin("division")}
                  >
                    Division Officer
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin("district")}
                  >
                    District Officer
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:text-primary-dark font-medium">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
