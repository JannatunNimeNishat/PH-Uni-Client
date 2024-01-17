const arr = [1, 2, 3, 4];
const result = arr.reduce((acc, item) => {
  return acc + item;
}, 0);
console.log(result);

const adminPath2 = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "<AdminDashboard/>",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: " <CreateAdmin />",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: " <CreateFaculty />",
      },
      {
        name: "Create Student",
        path: "create-student",
        element: " <CreateStudent />",
      },
    ],
  },
];

const newAdminPath = adminPath2.reduce((acc, item) => {
  if (item.path && item.name) {
    acc.push({
      key: item.name,
      label: `<NavLink to='${item.path}'>${item.name}</NavLink>`,
    });
  }
  if (item.children) {
    acc.push({
      key: item.name,
      label: item.name,
      children: item.children.map((child) => {
        return {
          key: child.name,
          label: `<NavLink to='${child.path}'>${child.name}</NavLink>`,
        };
      }),
    });
  }

  return acc;
}, []);

/* const newAdminPath = adminPath2.reduce((acc,item)=>{
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

console.log(JSON.stringify(newAdminPath));
