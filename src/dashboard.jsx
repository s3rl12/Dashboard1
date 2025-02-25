// Dashboard.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
// 1. Importamos nuestro custom hook (ya creado)
//import { useCarpetasArchivos } from './hooks/useCarpetasArchivos';
import { useQueryClient } from '@tanstack/react-query';
// Importa el resto (AuthContext, Sidebar, etc.)
import { SidebarProvider } from "./components/dashboard/Sidebar";
import { AppSidebar } from "./components/dashboard/AppSidebar";
import { SidebarTrigger } from "./components/dashboard/Sidebar";
import { Breadcrumbs } from "./components/dashboard/Breadcrumbs";

import StatisticalReports from "./pages/StatisticalReports/StatisticalReports";
import UserManagement from "./pages/UserManagement/UserManagement";
import RolesPermissions from "./pages/RolesPermissions/RolesPermissions";
import DocumentManager from "./pages/DocumentManager/DocumentManager";
import RegisterAreas from "./pages/RegisterAreas/RegisterAreas";
// Ojo: Este es el componente para la ruta "documentos"
import Documents from "./pages/DocumentManager/Documents";
import Users from "./pages/UserManagement/Users";
export default function Dashboard() {
 const queryClient = useQueryClient();
  const carpetasData = queryClient.getQueryData(['carpetas-archivos']);

  

  // 4. “carpetasData” es un array con las carpetas y archivos (data: [...]).
  //    Lo pasamos a la ruta “documentos” como prop
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <Breadcrumbs />
            </div>
          </header>

          <main className="flex-1 p-4 overflow-auto">
            <Routes>
              <Route path="reportes" element={<StatisticalReports />} />
              <Route path="usuarios" element={<UserManagement />} />
              <Route path="roles" element={<RolesPermissions />} />
              <Route path="areas" element={<RegisterAreas />} />
              <Route path="archivos" element={<DocumentManager />} />

              {/* Aquí le pasamos la data al componente “Documents” */}
              <Route
                path="documentos"
                element={<Documents carpetasData={carpetasData} />}
              />
              <Route path="Agentes" element={<Users />} />
              {/* Más sub-rutas si quieres */}
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
