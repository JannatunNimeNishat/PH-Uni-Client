import { ReactNode } from "react";

export type TUserPath = {
    name:string;
    path?:string;
    element?:ReactNode;
    children?:TUserPath[];
}

export type TRoute = {
    path:string;
    element:ReactNode;
}


export type TSidebarItem ={
    key:string;
    label:ReactNode; // reactNode er modde string o take so direct ReactNode deya jabe
    children?:TSidebarItem[]; // children ta asole TAdminSidebarItems er akta array hobe (key,label). r children ta optional na taklao problem nai
}