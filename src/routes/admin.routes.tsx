import { ReactNode } from "react";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/userManagement/CreateAdmin";
import CreateFaculty from "../pages/userManagement/CreateFaculty";
import CreateStudent from "../pages/userManagement/CreateStudent";
import { NavLink } from "react-router-dom";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";

/* type TRoute = {
    path:string;
    element:ReactNode;
} */
/* type TAdminSidebarItem ={
    key:string;
    label:ReactNode; // reactNode er modde string o take so direct ReactNode deya jabe
    children?:TAdminSidebarItem[]; // children ta asole TAdminSidebarItems er akta array hobe (key,label). r children ta optional na taklao problem nai
} */

/** amra acna e dynamically adminSideBarItems r adminRoutes banasci jate kore ak jaigai change korlai (adminPaths) 2 jaiga tai update hoye jai. code maintability baranor jonno.
 *
 * 1. amra common akta array banaiya nici (adminPaths) with the common elements of both adminRoutes and  adminSidebarItems neya. jate 2 adminSideBarItems r adminRoutes tai use korte pari
 * 2. amra amader format hishabe reduce deya agar hardcoded er format ta tik rekha adminRoutes ta create korteci
 * 3. aki vabe agar format tik rekha side bar ta create korteci.
 *
 ***Note[ acon amra adminPaths e akta kore object add korbo r side bar a new item abong oi item er route o dynamically create hoye jabe ]
 */

//! 1. common array with the common elements of both adminRoutes and  adminSidebarItems
export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];

//!! 2. exported to the routesGenerators.ts under utils function to make it reusable for every routes

//! 2. pragmatical coded way of writing routes
/* export const adminRoutes = adminPaths.reduce((acc:TRoute[],item)=>{
    if(item.path && item.element){
        acc.push({
            path:item.path,
            element:item.element
        })
    }
    if(item.children){
        item.children.forEach(child =>{
            acc.push({
                path: child.path,
                element:child.element
            })
        })
    }
   
    return acc;
},[]) */

//! hard-coded way of writing routes
/*** 
export const adminRoutes = [
   //  {
   //   index: true, // '/admin e amra acon <AdminDashboard/> page dekte pabo. 
   //   element: <AdminDashboard/>,
  //  }, 
    {
      path: "dashboard",  // '/admin/dashboard eo amra acon <AdminDashboard/> page dekte pabo.
      element: <AdminDashboard/>,
    },
    {
      path: "create-student", //relative path-> so no slash infront of them 
      element: <CreateStudent />,
    },
    {
      path: "create-admin", //relative path-> so no slash infront of them 
      element: <CreateAdmin />,
    },
    {
      path: "create-faculty", //relative path-> so no slash infront of them 
      element: <CreateFaculty />,
    },
  ]*/

//!! 3. exported to the sidebarItemsGenerators.tsx under  utils function to make it reusable for every sidebar
//!3. pragmatical coded way writing  adminSidebarItems based on the adminPaths
/* export const adminSidebarItems =  adminPaths.reduce((acc:TAdminSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          return {
            key: child.name,
            label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
          };
        }),
      });
    }
  
    return acc;
  }, []); */

//* Hard Coded adminSidebarItems
/** const items: MenuProps["items"] = [
  {
    key: "Dashboard",
    label: <NavLink to="/admin/dashboard">Dashboard</NavLink>,
  },
  {
    key: "User Management",
    label: "User Management",
    children: [
      {
        key: "Create Admin",
        label: <NavLink to="/admin/create-admin">Create Admin</NavLink>,
      },
      {
        key: "Create Faculty",
        label: <NavLink to='/admin/create-faculty'>Create Faculty</NavLink>,
      },
      {
        key: "Create Student",
        label: <NavLink to='/admin/create-student'>Create Student</NavLink>,
      },
    ],
  },
]; */
