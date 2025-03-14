// Dashboard.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useQueryClient } from '@tanstack/react-query';
// Importa el resto (AuthContext, Sidebar, etc.)
import { SidebarProvider } from "./components/dashboard/Sidebar";
import { AppSidebar } from "./components/dashboard/AppSidebar";
import { SidebarTrigger } from "./components/dashboard/Sidebar";
import { Breadcrumbs } from "./components/dashboard/Breadcrumbs";
import RolesPermissions from "./pages/RolesPermissions/RolesPermissions";
import Reports from "./pages/StatisticalReports/Reports";
// Componente para la ruta "documentos"
import Documents from "./pages/DocumentManager/Documents";
import Users from "./pages/UserManagement/Users";
import Areas from "./pages/RegisterAreas/Areas";
// Componentes para las rutas específicas de Estadísticas
import WorkLoad from './pages/StatisticalFunctions/WorkLoad/WorkLoad';
import CrimesHighestIncidence from './pages/StatisticalFunctions/CrimesHighestIncidence/CrimesHighestIncidence';
import DeadlineControl from "./pages/StatisticalFunctions/DeadlineControl/DeadlineControl";
import TaxBurden from "./pages/StatisticalFunctions/WorkLoad/components/TaxBurden";
import TaxDetails from "./pages/StatisticalFunctions/TaxDetails/TaxDetails";

export default function Dashboard() {
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
              <Route path="estadisticas" element={<Reports />} />
              <Route path="estadisticas/WorkLoad" element={<WorkLoad />} />
              <Route path="estadisticas/CrimesHighestIncidence" element={<CrimesHighestIncidence />} />
              <Route path="estadisticas/DeadlineControl" element={<DeadlineControl/>} />
              <Route path="estadisticas/TaxBurden" element={<TaxBurden/>} />
              <Route path="estadisticas/TaxDetails" element={<TaxDetails/>} />
              <Route path="roles" element={<RolesPermissions />} />
              <Route path="Area" element={<Areas />} />
              <Route
                path="documentos"
                element={<Documents />}
              />
              <Route 
                path="Agentes" 
                element={<Users />} 
              />
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
