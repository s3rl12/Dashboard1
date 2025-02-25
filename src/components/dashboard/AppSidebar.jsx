// AppSidebar.jsx
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarLink,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarSubLink,
} from "./Sidebar";
import { RiArrowDownSFill } from "@remixicon/react";
import { IconUser } from '@tabler/icons-react';
import { IconHome } from '@tabler/icons-react'
import { IconFolder } from '@tabler/icons-react'
import { IconChartCandle } from '@tabler/icons-react'
import { IconBuildings } from '@tabler/icons-react'
import { IconAlignBoxBottomCenter } from '@tabler/icons-react'
import { UserProfile } from "./UserProfile";
import { Divider } from "./Divider";
import { Link, useLocation } from "react-router-dom";
import escudoSVG from '../../assets/icons/escudo.svg';
// EJEMPLO de Input si lo tienes
// import { Input } from "./Input";
function LogoIcon() {
  return (
    <img
      src={escudoSVG}
      alt="Escudo"
      className="w-10 h-10" // Ajusta el tamaño según necesites
    />
  );
}
const navigation = [
  { name: "Home", href: "/", icon: IconHome },
  { name: "Inbox", href: "/inbox", icon: IconChartCandle, notifications: 2 },

];

const navigation2 = [
  {
    name: "Reportes estadisticos",
    href: "/Reporte",
    icon: IconAlignBoxBottomCenter,
    children: [
      { name: "Reporte despachos", href: "/dashboard/reportes" },
      { name: "Reporte fiscales", href: "/dashboard/reportes" },
    ],
  },
  {
    name: "Gestion usuarios",
    href: "/Gestion",
    icon: IconUser,
    children: [
      { name: "Lista de usuarios", href: "/dashboard/usuarios" },
      { name: "Usuarios", href: "/dashboard/Agentes" },
      { name: "Roles y permisos", href: "/dashboard/roles" },
      { name: "Historial de actividad", href: "/sales/insights" },
    ],
  },
  {
    name: "Gestion areas",
    href: "/Gestion",
    icon: IconBuildings,
    children: [
      { name: "Lista de areas", href: "/dashboard/areas" },
      { name: "Lista de fiscales", href: "/products/variants" },
      { name: "Logistica", href: "/products/suppliers" },
    ],
  },
  {
    name: "Gestion archivos",
    href: "/Gestion",
    icon: IconFolder,
    children: [
      { name: "Lista de archivos", href: "/dashboard/archivos" },
      { name: "Lista de reportes", href: "/dashboard/documentos" },
    ],
  },
];

export function AppSidebar({ ...props }) {
  const location = useLocation();
  //const [openMenus, setOpenMenus] = React.useState([navigation2[0].name, navigation2[1].name]);
  const [openMenus, setOpenMenus] = React.useState([]);
  const toggleMenu = (name) => {
    setOpenMenus((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  return (
    <Sidebar {...props} className="bg-gray-50">
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md bg-white p-1 shadow-sm ring-1 ring-gray-200">
            {/* Reemplaza <LogoIcon /> por tu <Logo /> real */}
            <LogoIcon />
          </span>
          <div>
            <span className="block text-sm font-semibold text-gray-900">
              Ministerio Publico
            </span>
            <span className="block text-xs text-gray-900">
              Madre de Dios
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {/* <Input type="search" placeholder="Search items..." /> */}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <Link to={item.href}>
                      <SidebarLink isActive={isActive} icon={item.icon} notifications={item.notifications}>
                        {item.name}
                      </SidebarLink>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-3">
          <Divider className="my-0 py-0" />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              {navigation2.map((item) => {
                const isOpen = openMenus.includes(item.name);
                return (
                  <SidebarMenuItem key={item.name}>
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className="flex w-full items-center justify-between gap-x-2.5 rounded-md p-2 text-base text-gray-900 hover:bg-gray-200/50 sm:text-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className="size-[18px] shrink-0" aria-hidden="true" />
                        {item.name}
                      </div>
                      <RiArrowDownSFill
                        className={`size-5 shrink-0 transform text-gray-400 transition-transform ${isOpen ? "rotate-0" : "-rotate-90"
                          }`}
                        aria-hidden="true"
                      />
                    </button>
                    {item.children && isOpen && (
                      <SidebarMenuSub>
                        <div className="absolute inset-y-0 left-4 w-px bg-gray-300" />
                        {item.children.map((child) => {
                          const childActive = location.pathname === child.href;
                          return (
                            <SidebarMenuItem key={child.name}>
                              <Link to={child.href}>
                                <SidebarSubLink isActive={childActive}>{child.name}</SidebarSubLink>
                              </Link>
                            </SidebarMenuItem>
                          );
                        })}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="border-t border-gray-200" />
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  );
}
