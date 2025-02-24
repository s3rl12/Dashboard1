// dashboard.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from './components/dashboard/Sidebar';
import { AppSidebar } from "./components/dashboard/AppSidebar";   // Ajusta ruta
import { SidebarTrigger } from "./components/dashboard/Sidebar";  // Ajusta ruta
import { Breadcrumbs } from "./components/dashboard/Breadcrumbs";
import { Button } from "./components/dashboard/Button";
import StatisticalReports from './pages/StatisticalReports/StatisticalReports';
import UserManagement from "./pages/UserManagement/UserManagement";
import RolesPermissions from './pages/RolesPermissions/RolesPermissions';
import DocumentManager from './pages/DocumentManager/DocumentManager';
import RegisterAreas from './pages/RegisterAreas/RegisterAreas';
import Documents from "./pages/DocumentManager/Documents";


export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />

        {/* Sección principal (barra superior + contenido) */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
            <div className="flex items-center space-x-4">
              {/* Botón para ocultar/mostrar la barra lateral */}
              <SidebarTrigger />
              {/* Breadcrumbs */}
              <Breadcrumbs />
            </div>
          </header>

          {/* Contenido principal */}
          <main className="flex-1 p-4 overflow-auto">
          <Routes>
              <Route path="reportes" element={<StatisticalReports />} />
              <Route path="usuarios" element={<UserManagement />} />
              <Route path="roles" element={<RolesPermissions />} />
              <Route path="areas" element={<RegisterAreas />} />
              <Route path="archivos" element={<DocumentManager />} />
              <Route path="documentos" element={<Documents />} />
              {/* Más sub-rutas si quieres */}
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
