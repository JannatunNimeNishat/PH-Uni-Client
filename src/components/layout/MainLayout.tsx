import { Layout, Menu, MenuProps } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { createElement } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { adminPaths, adminSidebarItems } from "../../routes/admin.routes";
import { sidebarItemsGenerators } from "../../utils/sidebarItemsGenerators";
import Sidebar from "./Sidebar";
/* import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout"; */

const { Content, Footer, Header, Sider } = Layout;

/* const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: createElement(icon),
  label: `nav ${index + 1}`,
})); */

/**Side bar buttons
 * 1. Side bar e je button gula take oigula amra items ar modde array of object akare deya dibo.
 * 2. protita object key,label props takbe.
 * 2.1 key -> unique identifier. eta active, notActive route hishbe kaj korbe
 * 2.2 label -> button er nam ta ki hobe seta dite hobe.
 * iii. nested hole children props er modde asbe. Amra jodi akta drop down cai kono akta level er under e nested obostai taile amra children pros er modde array of object akare dite hobe. agar motoi protita object key,props hold korbe.
 */

 //* Hard Coded items
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

const MainLayout = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      {/* // amra agar sider ke cut kore self contain Sidebar component e neya gasi  */}
      <Sidebar/> 
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {/* content */}
            {/* <h1>The main content should go here</h1> */}
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
