import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Blogs from './Pages/Blogs.jsx'
import Login from './Pages/Login.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import About from './Pages/About.jsx'
import Contact from './Pages/Contact.jsx'
import Notification from './Pages/Notification.jsx'
import PrivacyPolicy from './Pages/PrivacyPolicy.jsx'

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
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/notification",
    element: <Notification/>,
  },
  {
    path: "/policy",
    element: <PrivacyPolicy/>,
  },
]);

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <RouterProvider router={router} />
  //</StrictMode>,
)
