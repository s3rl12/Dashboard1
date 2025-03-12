// Dashboard.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
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

              {/* Rutas nuevas para Estadísticas */}
              <Route path="estadisticas/WorkLoad" element={<WorkLoad />} />
              <Route path="estadisticas/CrimesHighestIncidence" element={<CrimesHighestIncidence />} />
              <Route path="estadisticas/DeadlineControl" element={<DeadlineControl/>} />
              <Route path="roles" element={<RolesPermissions />} />
              <Route path="areas" element={<RegisterAreas />} />
              <Route path="Area" element={<Areas />} />
              <Route path="Grafico" element={<DeadlineControl/>}/>
              <Route path="Grafico2" element={<TaxBurden/>}/>
              <Route path="Grafico3" element={<TaxDetails/>}/>
              {/* Se pasa la data de carpetas al componente “Documents” */}
              <Route
                path="documentos"
                element={<Documents />}
              />
              {/* Se pasan roles y áreas; la data de usuarios se obtendrá internamente en Users */}
              <Route 
                path="Agentes" 
                element={<Users />} 
              />
              {/* Más sub-rutas si se requieren */}
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
