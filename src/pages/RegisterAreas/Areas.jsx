// Areas.jsx
import React, { useState } from "react";
import { TabNavigation, TabNavigationLink } from "../../pages/DocumentManager/Documents-components/TabNavigation";
import FileUpload from "../DocumentManager/Documents-components/components/FileUpload";
import { IconBuildings, IconFilePlus } from "@tabler/icons-react";
import { RiExchange2Line } from "@remixicon/react";

import AreasList from './components/AreasList';

export default function Areas() {
  const [activeTab, setActiveTab] = useState("Áreas");

  return (
    <div className="p-2 space-y-4">
      <h1 className="text-base font-semibold">GESTOR DE ÁREAS</h1>

      <TabNavigation>
        <TabNavigationLink
          className="inline-flex gap-2"
          href="#"
          active={activeTab === "Áreas"}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("Áreas");
          }}
        >
          <IconBuildings className="size-4" aria-hidden="true" />
          Áreas
        </TabNavigationLink>

        <TabNavigationLink
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
          <RiExchange2Line className="size-4" aria-hidden="true" />
          Customers
        </TabNavigationLink>
      </TabNavigation>

      {activeTab === "Áreas" && (
        <div>
          {/* Se pasa la data de áreas a ListAreas */}
          <AreasList />
        </div>
      )}

      {activeTab === "importar" && (
        <div>
          {/* Se pasa la función de importación de áreas, si existe */}
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
