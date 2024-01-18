import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "../utils/routesGenerators";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";



const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
  },
  {
    path: "/admin", // absolute path
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/faculty", // absolute path
    element: <App />,
    children: routeGenerator(facultyPaths),
  },
  {
    path: "/student", // absolute path
    element: <App />,
    children: routeGenerator(studentPaths),
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
