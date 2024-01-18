import { ReactNode } from "react";

type TUserPath = {
    name:string;
    path?:string;
    element?:ReactNode;
    children?:TUserPath[];
}

type TRoute = {
    path:string;
    element:ReactNode;
}

export const routeGenerator = (items:TUserPath[])=>{
     const routes = items.reduce((acc:TRoute[],item)=>{
        if(item.path && item.element){
            acc.push({
                path:item.path,
                element:item.element
            })
        }
        if(item.children){
            item.children.forEach(child =>{
                acc.push({
                    // path: child.path as string,
                    path: child.path!,
                    element:child.element
                })
            })
        }
       
        return acc;
    },[])
    return routes;
}