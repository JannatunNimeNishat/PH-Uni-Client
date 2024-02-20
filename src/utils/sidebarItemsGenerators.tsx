import { TSidebarItem, TUserPath } from "../types";
import { NavLink } from "react-router-dom";

/* type TAdminSidebarItem ={
    key:string;
    label:ReactNode; // reactNode er modde string o take so direct ReactNode deya jabe
    children?:TAdminSidebarItem[]; // children ta asole TAdminSidebarItems er akta array hobe (key,label). r children ta optional na taklao problem nai
} */

export const sidebarItemsGenerators = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name!,
        label: item.name,
        children: item.children.map((child) => {
          if (child?.name) {
            return {
              key: child.name,
              label: (
                <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
              ),
            };
          }
        }),
      });
    }

    return acc;
  }, []);
  return sidebarItems;
};
