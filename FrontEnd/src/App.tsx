import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, UserRole, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

// Auth Pages
import UsersLogin from "./pages/auth/UsersLogin";
import DivisionOffcerSignUp from "./pages/division-officer/DivisionSignUp";
import DistrictOfficerSignUp from "./pages/district-officer/DistrictSignUp";
import FarmerSignUp from "./pages/farmer/FarmerSignUp";

// Farmer Pages
import Profile from "./pages/farmer/Profile";
import LandList from "./pages/farmer/LandList";
import LandDetail from "./pages/farmer/LandDetail";

// District Officer Pages
import AgricultureOfficerDashboard from "./pages/agriculture-officer/Dashboard";
import DistrictOfficerDashboard from "./pages/district-officer/DistrictDetail";
import DivisionOfficerDashboard from "./pages/division-officer/DivisionDetail";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BlogList from "./pages/blogs/BlogList";
import BlogDetail from "./pages/blogs/BlogDetail";
import NotFound from "./pages/NotFound";
import RegistrationSuccess from "./pages/auth/RegistrationSuccess";

import MainLayout from "./layouts/MainLayout";
import Register from "./pages/auth/Register";

import { DivisionDashboardLayout } from "./components/DivisionMenuBar/DashboardLayout";
import { DivisionDashboard } from "./pages/division-officer/admin/Dashboard";
import { ActiveFarmers } from "./pages/division-officer/admin/farmer/ActiveFarmers";
import { UpdateFarmer } from "./pages/division-officer/admin/farmer/UpdateFarmer";
import { ActiveLands } from "./pages/division-officer/admin/land/ActiveLands";
import { ActiveCultivation } from "./pages/division-officer/admin/cultivation/ActiveCultivation";
import { Settings } from "./pages/division-officer/admin/Settings";
import { Blogs } from "./pages/division-officer/Blogs";
import Unauthorized from "./pages/Unauthorized";

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
              <Route path="/blog/:id" element={<BlogDetail />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/login" element={<UsersLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registration-success" element={<RegistrationSuccess />} />

            {/* Farmer Routes */}
            <Route
              path="/farmer"
              element={
                <ProtectedRoute allowedRoles={[UserRole.FARMER]}>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="profile" element={<Profile />} />
              <Route path="lands" element={<LandList />} />
              <Route path="lands/:id" element={<LandDetail />} />
            </Route>

            {/* District Officer Routes */}
            <Route
              path="/District_Officer"
              element={
                <ProtectedRoute allowedRoles={[UserRole.AGRICULTURE_OFFICER]}>
                  <AgricultureOfficerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/District_Officer/:districtId"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    UserRole.AGRICULTURE_OFFICER,
                    UserRole.DISTRICT_OFFICER
                  ]}
                >
                  <DistrictOfficerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/District_Officer/:districtId/:divisionId"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    UserRole.AGRICULTURE_OFFICER,
                    UserRole.DISTRICT_OFFICER,
                    UserRole.DIVISION_OFFICER
                  ]}
                >
                  <DivisionOfficerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/District_Officer/:districtId/new"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    UserRole.AGRICULTURE_OFFICER,
                    UserRole.DISTRICT_OFFICER
                  ]}
                >
                  <DistrictOfficerSignUp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/District_Officer/:districtId/:divisionId/new"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    UserRole.AGRICULTURE_OFFICER,
                    UserRole.DISTRICT_OFFICER,
                    UserRole.DIVISION_OFFICER
                  ]}
                >
                  <DivisionOffcerSignUp />
                </ProtectedRoute>
              }
            />

            {/* Division Dashboard Routes */}
            <Route
              path="/District_Officer/:districtId/:divisionId/:category"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    UserRole.AGRICULTURE_OFFICER,
                    UserRole.DISTRICT_OFFICER,
                    UserRole.DIVISION_OFFICER
                  ]}
                >
                  <DivisionDashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DivisionDashboard />} />
              <Route path="dashboard" element={<DivisionDashboard />} />
              <Route path="active/farmers" element={<ActiveFarmers />} />
              <Route path="active/lands" element={<ActiveLands />} />
              <Route path="active/cultivated" element={<ActiveCultivation />} />
              <Route path="settings" element={<Settings />} />
              <Route path="blogs" element={<Blogs />} />
              <Route
                path="approval/farmers"
                element={
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Farmer Approvals</h1>
                    <p>Farmer approval content will be displayed here.</p>
                  </div>
                }
              />
              <Route
                path="approval/lands"
                element={
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Land Approvals</h1>
                    <p>Land approval content will be displayed here.</p>
                  </div>
                }
              />
              <Route
                path="approval/cultivation"
                element={
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Cultivation Approvals</h1>
                    <p>Cultivation approval content will be displayed here.</p>
                  </div>
                }
              />
              <Route
                path="crop-category"
                element={
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Crop Categories</h1>
                    <p>Crop category content will be displayed here.</p>
                  </div>
                }
              />
              <Route
                path="paddy-land-type"
                element={
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Paddy Land Types</h1>
                    <p>Paddy land type content will be displayed here.</p>
                  </div>
                }
              />
              <Route path="update/farmer" element={<UpdateFarmer />} />
              <Route
                path="update/lands"
                element={
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Update Lands</h1>
                    <p>Update lands content will be displayed here.</p>
                  </div>
                }
              />
            </Route>

            {/* Unauthorized and 404 Routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;


// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { AuthProvider, UserRole, useAuth } from "@/contexts/AuthContext";
// import ProtectedRoute from "@/components/ProtectedRoute";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";
// import { useEffect } from "react";

// // Auth Pages
// import UsersLogin from "./pages/auth/UsersLogin";
// import DivisionOffcerSignUp from "./pages/division-officer/DivisionSignUp";
// import DistrictOfficerSignUp from "./pages/district-officer/DistrictSignUp";
// import FarmerSignUp from "./pages/farmer/FarmerSignUp";

// // Farmer Pages
// import Profile from "./pages/farmer/Profile";
// import LandList from "./pages/farmer/LandList";
// import LandDetail from "./pages/farmer/LandDetail";

// // District Officer Pages
// import AgricultureOfficerDashboard from "./pages/agriculture-officer/Dashboard";
// import DistrictOfficerDashboard from "./pages/district-officer/DistrictDetail";
// import DivisionOfficerDashboard from "./pages/division-officer/DivisionDetail";

// // Public Pages
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import BlogList from "./pages/blogs/BlogList";
// import BlogDetail from "./pages/blogs/BlogDetail";
// import NotFound from "./pages/NotFound";
// import RegistrationSuccess from "./pages/auth/RegistrationSuccess";

// import MainLayout from "./layouts/MainLayout";
// import Register from "./pages/auth/Register";

// import { DivisionDashboardLayout } from "./components/DivisionMenuBar/DashboardLayout";
// import { DivisionDashboard } from "./pages/division-officer/admin/Dashboard";
// import { ActiveFarmers } from "./pages/division-officer/admin/farmer/ActiveFarmers";
// import { UpdateFarmer } from "./pages/division-officer/admin/farmer/UpdateFarmer";
// import { ActiveLands } from "./pages/division-officer/admin/land/ActiveLands";
// import { ActiveCultivation } from "./pages/division-officer/admin/cultivation/ActiveCultivation";
// import { Settings } from "./pages/division-officer/admin/Settings";
// import { Blogs } from "./pages/division-officer/Blogs";
// import Unauthorized from "./pages/Unauthorized";

// const queryClient = new QueryClient();

// // AuthRedirect component to handle redirection after login
// const AuthRedirect = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     if (isAuthenticated) {
//       const nextPath = localStorage.getItem("nextPath");
//       if (nextPath) {
//         navigate(nextPath);
//         localStorage.removeItem("nextPath");
//       }
//     }
//   }, [isAuthenticated, navigate]);

//   return null;
// };

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <AuthProvider>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <AuthRedirect />
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<MainLayout />}>
//               <Route index element={<Home />} />
//               <Route path="about" element={<About />} />
//               <Route path="contact" element={<Contact />} />
//               <Route path="blogs" element={<BlogList />} />
//               <Route path="blogs/:id" element={<BlogDetail />} />
//             </Route>
//             {/* Auth Routes */}
//             <Route path="/login" element={<UsersLogin />} />
//             <Route path="/register" element={<Register />} />
//             {/* <Route path="/register/farmerSignUp" element={<FarmerSignUp />} /> */}
//             <Route
//               path="/registration-success"
//               element={<RegistrationSuccess />}
//             />
//             {/* Farmer Routes */}
//             <Route
//               path="/farmer"
//               element={
//                 <ProtectedRoute allowedRoles={[UserRole.FARMER]}>
//                   <MainLayout />
//                 </ProtectedRoute>
//               }
//             >
//               <Route
//                 path="/farmer/profile"
//                 element={
//                   <ProtectedRoute allowedRoles={[UserRole.FARMER]}>
//                     <Profile />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/farmer/lands"
//                 element={
//                   <ProtectedRoute allowedRoles={[UserRole.FARMER]}>
//                     <LandList />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/farmer/lands/:id"
//                 element={
//                   <ProtectedRoute allowedRoles={[UserRole.FARMER]}>
//                     <LandDetail />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>
//             {/* New District Officer Routes Structure */}
//             <Route
//               path="/District_Officer"
//               element={
//                 <ProtectedRoute allowedRoles={[UserRole.AGRICULTURE_OFFICER]}>
//                   <AgricultureOfficerDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/District_Officer/:districtId"
//               element={
//                 <ProtectedRoute
//                   allowedRoles={[
//                     UserRole.AGRICULTURE_OFFICER || UserRole.DISTRICT_OFFICER]}
//                 >
//                   <DistrictOfficerDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/District_Officer/:districtId/:divisionId"
//               element={
//                 <ProtectedRoute
//                   allowedRoles={[
//                     UserRole.AGRICULTURE_OFFICER ||
//                       UserRole.DISTRICT_OFFICER ||
//                       UserRole.DIVISION_OFFICER]}
//                 >
//                   <DivisionOfficerDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/District_Officer/:districtId/new"
//               element={
//                 <ProtectedRoute
//                   allowedRoles={[
//                     UserRole.AGRICULTURE_OFFICER || UserRole.DISTRICT_OFFICER ]}
//                 >
//                   <DistrictOfficerSignUp />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/District_Officer/:districtId/:divisionId/new"
//               element={
//                 <ProtectedRoute
//                   allowedRoles={[
//                     UserRole.AGRICULTURE_OFFICER ||
//                       UserRole.DISTRICT_OFFICER ||
//                       UserRole.DIVISION_OFFICER ]}
//                 >
//                   <DivisionOffcerSignUp />
//                 </ProtectedRoute>
//               }
//             />
//             {/* 404 Route */}
            
//             //...................
//             <Route
//               path="/District_Officer/:districtId/:divisionId/:category"
//               element={
//                 <ProtectedRoute
//                   allowedRoles={[
//                     UserRole.AGRICULTURE_OFFICER ||
//                       UserRole.DISTRICT_OFFICER ||
//                       UserRole.DIVISION_OFFICER ]}
//                 >
//                   <DivisionDashboardLayout />
//                 </ProtectedRoute>
//               }
//             >
//               <Route index element={<DivisionDashboard />} />
//               <Route path="dashboard" element={<DivisionDashboard />} />
//               <Route path="active/farmers" element={<ActiveFarmers />} />
//               <Route path="active/lands" element={<ActiveLands />} />
//               <Route path="active/cultivated" element={<ActiveCultivation />} />
//               <Route path="settings" element={<Settings />} />
//               <Route path="blogs" element={<Blogs />} />
//               <Route
//                 path="approval/farmers"
//                 element={
//                   <div className="p-6">
//                     <h1 className="text-2xl font-bold">Farmer Approvals</h1>
//                     <p>Farmer approval content will be displayed here.</p>
//                   </div>
//                 }
//               />
//               <Route
//                 path="approval/lands"
//                 element={
//                   <div className="p-6">
//                     <h1 className="text-2xl font-bold">Land Approvals</h1>
//                     <p>Land approval content will be displayed here.</p>
//                   </div>
//                 }
//               />
//               <Route
//                 path="approval/cultivation"
//                 element={
//                   <div className="p-6">
//                     <h1 className="text-2xl font-bold">
//                       Cultivation Approvals
//                     </h1>
//                     <p>Cultivation approval content will be displayed here.</p>
//                   </div>
//                 }
//               />
//               <Route
//                 path="crop-category"
//                 element={
//                   <div className="p-6">
//                     <h1 className="text-2xl font-bold">Crop Categories</h1>
//                     <p>Crop category content will be displayed here.</p>
//                   </div>
//                 }
//               />
//               <Route
//                 path="paddy-land-type"
//                 element={
//                   <div className="p-6">
//                     <h1 className="text-2xl font-bold">Paddy Land Types</h1>
//                     <p>Paddy land type content will be displayed here.</p>
//                   </div>
//                 }
//               />
//               <Route path="update/farmer" element={<UpdateFarmer />} />
//               <Route
//                 path="update/lands"
//                 element={
//                   <div className="p-6">
//                     <h1 className="text-2xl font-bold">Update Lands</h1>
//                     <p>Update lands content will be displayed here.</p>
//                   </div>
//                 }
//               />
//             </Route>
//             <Route
//               path="/District_Officer/:districtId/:divisionId/:category"
//               element={<DivisionDashboardLayout />}
//             >
//               <Route index element={<DivisionDashboard />} />
//               <Route
//                 path="dashboard"
//                 element={<DivisionDashboard />
//                   // <ProtectedRoute
//                   //   allowedRoles={[
//                   //     UserRole.AGRICULTURE_OFFICER &&
//                   //       UserRole.DISTRICT_OFFICER &&
//                   //       UserRole.DIVISION_OFFICER ]}
//                   // >
//                   //   <DivisionDashboard />
//                   // </ProtectedRoute>
//                 }
//               />
//             </Route>
//             //...................
//             <Route path="/unauthorized" element={<Unauthorized />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </TooltipProvider>
//     </AuthProvider>
//   </QueryClientProvider>
// );

// export default App;

// // Admin Division Officer Pages
// // import AdminFarmers from "./pages/division-officer/Admin/AdminFarmers";
// // import AdminLands from "./pages/division-officer/Admin/AdminLands";
// // import AdminCultivations from "./pages/division-officer/Admin/AdminCultivations";
// // import AdminApprovedFarmers from "./pages/division-officer/Admin/AdminApprovedFarmers";
// // import AdminApprovedLands from "./pages/division-officer/Admin/AdminApprovedLands";
// // import AdminApprovedCultivations from "./pages/division-officer/Admin/AdminApprovedCultivations";
// // import AdminSettings from "./pages/division-officer/Admin/AdminSettings";
// // import AdminBlogs from "./pages/division-officer/Admin/AdminBlogs";
// // import DivisionOfficerDashboard from "./pages/division-officer/Dashboard";
// // import ApprovedFarmers from "./pages/division-officer/ApprovedFarmers";
// // import Farmers from "./pages/division-officer/Farmers";
// // import Settings from "./pages/division-officer/Settings";
// // import DivisionSignUp from "./pages/division-officer/SubPages/DivisionSignUp";
// {
//   /* Specific Feature Routes */
// }
// {
//   /* <Route path="/District_Officer/:districtId/:divisionId/:category/approved-farmers" element={<AdminApprovedFarmers />} />
//             <Route path="/District_Officer/:districtId/:divisionId/:category/approved-lands" element={<AdminApprovedLands />} />
//             <Route path="/District_Officer/:districtId/:divisionId/:category/approved-cultivation" element={<AdminApprovedCultivations />} />
//             <Route path="/District_Officer/:districtId/:divisionId/:category/farmers" element={<AdminFarmers />} />
//             <Route path="/District_Officer/:districtId/:divisionId/:category/Lands" element={<AdminLands />} />
//             <Route path="/District_Officer/:districtId/:divisionId/:category/cultivation" element={<AdminCultivations />} />
//             <Route path="/District_Officer/:districtId/:divisionId/:category/settings" element={<AdminSettings />} />
//             <Route path="/District_Officer/:districtId/:divisionId/:category/blogs" element={<AdminBlogs />} />
//              */
// }
// {
//   /* <Route path="/division-officer/farmers" element={<Farmers />} /> */
// }
// {
//   /* <Route path="/division-officer/approved-farmers" element={<ApprovedFarmers />} /> */
// }
// {
//   /* <Route path="/division-officer/lands" element={<div>Lands Page</div>} /> */
// }
// {
//   /* <Route path="/division-officer/approved-lands" element={<div>Approved Lands Page</div>} /> */
// }
// {
//   /* <Route path="/division-officer/cultivation" element={<div>Cultivation Page</div>} /> */
// }
// {
//   /* <Route path="/division-officer/approved-cultivation" element={<div>Approved Cultivation Page</div>} /> */
// }
// {
//   /* <Route path="/division-officer" element={<DashboardLayout />}>
//              Division Officer Routes - Original paths still available
//              <Route index element={<DivisionOfficerDashboard />} />
//               <Route path="/division-officer/dashboard" element={<DivisionOfficerDashboard />} />
//               <Route path="/division-officer/settings" element={<Settings />} />
//               <Route path="/division-officer/blogs" element={<BlogList />} />
//             </Route> */
// }