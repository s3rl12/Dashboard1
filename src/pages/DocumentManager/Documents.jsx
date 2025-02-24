// Documents.jsx
import React, { useState } from "react";
import { Callout } from "./Documents-components/Callout";
import { TabNavigation, TabNavigationLink } from "./Documents-components/TabNavigation";
import {
  RiErrorWarningFill,
  RiExchange2Line,
  RiCustomerService2Fill,
} from "@remixicon/react";
import { IconFilePlus, IconFolderOpen } from "@tabler/icons-react";
import FileUpload from "./Documents-components/components/FileUpload";
import DocumentFolders from "./Documents-components/components/DocumentFolders";
export default function Documents() {
  // Estado local para saber cuál pestaña está activa
  const [activeTab, setActiveTab] = useState("carpetas");

  return (
    <div className="p-4 space-y-4">
      {/* 1. Título */}
      <h1 className="text-xl font-semibold">GESTOR DE DOCUMENTOS</h1>

      {/* 2. Callout debajo del título */}
      <Callout title="AWS Credit Alert" icon={RiErrorWarningFill}>
        Warning: Your AWS credits are nearly depleted. Please review your usage and
        consider adding more credits to avoid service interruptions.
      </Callout>

      {/* 3. TabNavigation debajo del Callout */}
      <TabNavigation>
        <TabNavigationLink
          // Para la pestaña "carpetas"
          className="inline-flex gap-2"
          // Evita la navegación real (href="#") y maneja el click
          href="#"
          active={activeTab === "carpetas"}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("carpetas");
          }}
        >
          <IconFolderOpen className="size-4" aria-hidden="true" />
          Carpetas
        </TabNavigationLink>

        <TabNavigationLink
          // Para la pestaña "importar"
          className="inline-flex gap-2"
          href="#"
          active={activeTab === "importar"}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("importar");
          }}
        >
          <IconFilePlus className="size-4" aria-hidden="true" />
          Importar
        </TabNavigationLink>

        <TabNavigationLink
          className="inline-flex gap-2"
          href="#"
          active={activeTab === "transactions"}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("transactions");
          }}
        >
          <RiExchange2Line className="size-4" aria-hidden="true" />
          Transactions
        </TabNavigationLink>

        <TabNavigationLink
          className="inline-flex gap-2"
          href="#"
          active={activeTab === "customers"}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("customers");
          }}
        >
          <RiCustomerService2Fill className="size-4" aria-hidden="true" />
          Customers
        </TabNavigationLink>
      </TabNavigation>

      {/* Contenido condicional según la pestaña activa */}
      {activeTab === "carpetas" && (
        <div>
          <DocumentFolders />
        </div>
      )}

      {activeTab === "importar" && (
        <div>
          {/* Renderiza el FileUpload */}
          <FileUpload />
        </div>
      )}

      {activeTab === "transactions" && (
        <p className="text-sm text-gray-700">Contenido de Transactions</p>
      )}

      {activeTab === "customers" && (
        <p className="text-sm text-gray-700">Contenido de Customers</p>
      )}
    </div>
  );
}
