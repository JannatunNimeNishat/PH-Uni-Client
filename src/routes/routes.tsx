import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateStudent from "../pages/admin/CreateStudent";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";

const router = createBrowserRouter([
  {
    path: "/", // absolute path
    element: <App />,
    children: [
      {
        path: "about", //relative path-> so no slash infront of them 
        element: <About />,
      },
      {
        path: "contact", //relative path-> so no slash infront of them 
        element: <Contact />,
      },
    ],
  },
  {
    path: "/admin", 
    element: <App />,
    children: [
      /* {
        index: true, // '/admin e amra acon <AdminDashboard/> page dekte pabo. 
        element: <AdminDashboard/>,
      }, */
      {
        path: "dashboard",  // '/admin/dashboard eo amra acon <AdminDashboard/> page dekte pabo.
        element: <AdminDashboard/>,
      },
      {
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        path: "create-faculty",
        element: <CreateFaculty />,
      },
    ],
  },
  {
    path: "/login", // absolute path
    element: <Login />,
  },
  {
    path: "/register", // absolute path
    element: <Register />,
  },
]);

export default router;
