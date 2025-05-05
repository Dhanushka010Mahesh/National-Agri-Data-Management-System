
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (nic: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (nic: string, password: string): Promise<boolean> => {
    try {
      // This would be an API call in a real application
      // For now, we'll simulate a successful login with mock data
      console.log("Logging in with NIC:", nic, "and password:", password);
      
      // Simulate different user roles for testing
      let mockUser: User;
      let nextPath = "/";
      
      if (nic === "farmer" && password === "password") {
        mockUser = {
          id: "1",
          name: "John Farmer",
          role: UserRole.FARMER,
          nic: "farm123",
          profilePicture: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
        };
        nextPath = "/farmer/profile";
      } else if (nic === "division" && password === "1234") {
        mockUser = {
          id: "2",
          name: "Mary Division",
          role: UserRole.DIVISION_OFFICER,
          nic: "div123",
          profilePicture: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
        };
        nextPath = "/division-officer/dashboard";
      } else if (nic === "district" && password === "1234") {
        mockUser = {
          id: "3",
          name: "David District",
          role: UserRole.DISTRICT_OFFICER,
          nic: "dist123",
          profilePicture: "https://images.unsplash.com/photo-1517022812141-23620dba5c23"
        };
        nextPath = "/District_Officer";
      } else {
        // Default case - fallback to farmer
        mockUser = {
          id: "4",
          name: "Test User",
          role: UserRole.FARMER,
          nic: nic,
          profilePicture: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
        };
        nextPath = "/farmer/profile";
      }
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));

      // Add the path to localStorage for navigation in App.tsx
      localStorage.setItem("nextPath", nextPath);
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("nextPath");
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    try {
      // This would be an API call in a real application
      console.log("Registering user:", userData);
      
      // Mock successful registration
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
