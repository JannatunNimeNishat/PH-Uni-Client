import { Layout, Menu } from "antd";
import { sidebarItemsGenerators } from "../../utils/sidebarItemsGenerators";
import { adminPaths } from "../../routes/admin.routes";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

/**sidebar components
 * i. amra MainLayout teka <Sider part tuku ke cut kore acan e ana hoyce easy maintenatibility r jonno.
 * ii. amra user er role er upor base kora take content dekhabo oi joono rolte ta ke alada alada kore define kore neya hosce
 * 
 */


const { Sider } = Layout;

// defining the roles
const userRole = {
    ADMIN:'admin',
    FACULTY:'faculty',
    STUDENT:'student'
}

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);
   // const role = 'admin';
    let sidebarItems;

    switch (user!.role) { // ! to avoid the error
        case userRole.ADMIN:
            sidebarItems= sidebarItemsGenerators(adminPaths,userRole.ADMIN)
            break;
    
        case userRole.FACULTY:
            sidebarItems= sidebarItemsGenerators(adminPaths,userRole.FACULTY)
            break;
    
        case userRole.STUDENT:
            sidebarItems= sidebarItemsGenerators(adminPaths,userRole.STUDENT)
            break;
    
        default:
            break;
    }

    return (
        <Sider
        breakpoint="lg"
        collapsedWidth="0"
        /* onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }} */
      >
        <div
          style={{
            color: "white",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>PH University</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          // items={adminSidebarItems} //! pragmatical items
          items={sidebarItems} //! pragmatical items
        />
      </Sider>
    );
};

export default Sidebar;