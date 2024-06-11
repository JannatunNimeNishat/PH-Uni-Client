import { Layout, Menu } from "antd";
import { sidebarItemsGenerators } from "../../utils/sidebarItemsGenerators";
import { adminPaths } from "../../routes/admin.routes";
import { useAppSelector } from "../../redux/hooks";
import { TUser, selectCurrentUser, userCurrentToken } from "../../redux/features/auth/authSlice";
import { studentPaths } from "../../routes/student.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { verifyToken } from "../../utils/verifyToken";



const { Sider } = Layout;


const userRole = {
    ADMIN:'admin',
    FACULTY:'faculty',
    STUDENT:'student'
}

const Sidebar = () => {
 const token = useAppSelector(userCurrentToken);
  let user;
  if(token){
    user = verifyToken(token);
  }
    let sidebarItems;

    switch ((user as TUser)!.role) { 
        case userRole.ADMIN:
          
            sidebarItems= sidebarItemsGenerators(adminPaths,userRole.ADMIN)
            break;
    
        case userRole.FACULTY:
            sidebarItems= sidebarItemsGenerators(facultyPaths,userRole.FACULTY)
            break;
    
        case userRole.STUDENT:
         
            sidebarItems= sidebarItemsGenerators(studentPaths,userRole.STUDENT)
            break;
    
        default:
            break;
    }

    return (
        <Sider
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
        style={{height:"100vh", position:'sticky', top:'0', left:'0',
        display: 'flex',
        flexDirection: 'column',

        }}
      >
       <div
          style={{
           // color: "white",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>PH University</h1>
        </div>
        <div
        style={{flexGrow:1,border:"1px solid red",
          minHeight:"100%"

        }}
        >
        <Menu
       
          theme="light"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={sidebarItems} //! pragmatical items
        />
           </div>
        <div style={{ borderTop: "1px solid red", padding: '1rem 0', textAlign: 'center' }}>
          <h1>PH Corporation</h1>
        </div>
     
      </Sider>
    );
};

export default Sidebar;