import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import About from './pages/public/About.jsx'
import Blogs from './pages/public/Blogs.jsx'
import Contact from './pages/public/Contact.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import Notification from './pages/farmer/Notification.jsx'
import PrivacyPolicy from './pages/public/PrivacyPolicy.jsx'
import DistrictDashboard from './pages/district/DistrictDashboard.jsx';
import DivisionDashboard from './pages/division/DivisionDashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/blogs",
    element: <Blogs/>,
  },{
    path: "/about",
    element: <About/>,
  },
  {
    path: "/contact",
    element: <Contact/>,
  },
  {
    path: "/auth/login",
    element: <Login/>,
  },
  {
    path: "/farmer/notification",
    element: <Notification/>,
  },
  {
    path: "/policy",
    element: <PrivacyPolicy/>,
  },
  {
    path: "/auth/register",
    element: <Register/>,
  },
  {
    path: "/district/dashboard",
    element: <DistrictDashboard/>,
  },
  {
    path: "/division/dashboard",
    element: <DivisionDashboard/>,
  },
]);

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <RouterProvider router={router} />
  //</StrictMode>,
)
