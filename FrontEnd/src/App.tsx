
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";

// Layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./pages/division-officer/DashboardLayout";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegistrationSuccess from "./pages/auth/RegistrationSuccess";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BlogList from "./pages/blogs/BlogList";
import BlogDetail from "./pages/blogs/BlogDetail";
import NotFound from "./pages/NotFound";

// Farmer Pages
import Profile from "./pages/farmer/Profile";
import LandList from "./pages/farmer/LandList";
import LandDetail from "./pages/farmer/LandDetail";

// Admin Division Officer Pages
import AdminFarmers from "./pages/division-officer/Admin/AdminFarmers";
import AdminLands from "./pages/division-officer/Admin/AdminLands";
import AdminCultivations from "./pages/division-officer/Admin/AdminCultivations";
import AdminApprovedFarmers from "./pages/division-officer/Admin/AdminApprovedFarmers";
import AdminApprovedLands from "./pages/division-officer/Admin/AdminApprovedLands";
import AdminApprovedCultivations from "./pages/division-officer/Admin/AdminApprovedCultivations";
import AdminSettings from "./pages/division-officer/Admin/AdminSettings";
import AdminBlogs from "./pages/division-officer/Admin/AdminBlogs";


//nothing
import DivisionOfficerDashboard from "./pages/division-officer/Dashboard";
import ApprovedFarmers from "./pages/division-officer/ApprovedFarmers";
import Farmers from "./pages/division-officer/Farmers";
import Settings from "./pages/division-officer/Settings";

// District Officer Pages
import DistrictOfficerDashboard from "./pages/district-officer/Dashboard";
import DistrictDetail from "./pages/district-officer/DistrictDetail";
import DivisionDetail from "./pages/district-officer/DivisionDetail";





const queryClient = new QueryClient();

// AuthRedirect component to handle redirection after login
const AuthRedirect = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const nextPath = localStorage.getItem("nextPath");
      if (nextPath) {
        navigate(nextPath);
        localStorage.removeItem("nextPath");
      }
    }
  }, [isAuthenticated, navigate]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthRedirect />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="blogs" element={<BlogList />} />
              <Route path="blogs/:id" element={<BlogDetail />} />
            </Route>
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registration-success" element={<RegistrationSuccess />} />
            
            {/* Farmer Routes */}
            <Route path="/farmer" element={<MainLayout />}>
              <Route path="/farmer/profile" element={<Profile />} />
              <Route path="/farmer/lands" element={<LandList />} />
              <Route path="/farmer/lands/:id" element={<LandDetail />} />
            </Route>
            
            {/* Division Officer Routes - Original paths still available */}
            <Route path="/division-officer" element={<DashboardLayout />}>
              <Route index element={<DivisionOfficerDashboard />} />
              <Route path="/division-officer/dashboard" element={<DivisionOfficerDashboard />} />
              <Route path="/division-officer/farmers" element={<Farmers />} />
              <Route path="/division-officer/approved-farmers" element={<ApprovedFarmers />} />
              <Route path="/division-officer/lands" element={<div>Lands Page</div>} />
              <Route path="/division-officer/approved-lands" element={<div>Approved Lands Page</div>} />
              <Route path="/division-officer/cultivation" element={<div>Cultivation Page</div>} />
              <Route path="/division-officer/approved-cultivation" element={<div>Approved Cultivation Page</div>} />
              <Route path="/division-officer/settings" element={<Settings />} />
              <Route path="/division-officer/blogs" element={<BlogList />} />
            </Route>
            
            {/* New District Officer Routes Structure */}
            <Route path="/District_Officer" element={<DistrictOfficerDashboard />} />
            <Route path="/District_Officer/:districtId" element={<DistrictDetail />} />
            <Route path="/District_Officer/:districtId/:divisionId" element={<DivisionDetail />} />
            
            {/* Category and Feature Based Routes */}
            <Route path="/District_Officer/:districtId/:divisionId/:category" element={<DashboardLayout />}>
              <Route index element={<DivisionOfficerDashboard />} />
              <Route path="dashboard" element={<DivisionOfficerDashboard />} />
            </Route>
            
            {/* Specific Feature Routes */}
            <Route path="/District_Officer/:districtId/:divisionId/:category/approved-farmers" element={<AdminApprovedFarmers />} />
            <Route path="/District_Officer/:districtId/:divisionId/:category/approved-lands" element={<AdminApprovedLands />} />
            <Route path="/District_Officer/:districtId/:divisionId/:category/approved-cultivation" element={<AdminApprovedCultivations />} />
            <Route path="/District_Officer/:districtId/:divisionId/:category/farmers" element={<AdminFarmers />} />
            <Route path="/District_Officer/:districtId/:divisionId/:category/Lands" element={<AdminLands />} />
            <Route path="/District_Officer/:districtId/:divisionId/:category/cultivation" element={<AdminCultivations />} />
            <Route path="/District_Officer/:districtId/:divisionId/:category/settings" element={<AdminSettings />} />
            <Route path="/District_Officer/:districtId/:divisionId/:category/blogs" element={<AdminBlogs />} />
            



            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
