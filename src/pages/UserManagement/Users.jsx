// Users.jsx
import React, { useState } from "react";

// 1. Importamos el servicio que sube usuarios
import importUserService from '../../services/api/import-user/importUserService';
// (Ajusta la ruta según tu estructura)

import { TabNavigation, TabNavigationLink } from "../../pages/DocumentManager/Documents-components/TabNavigation";
import FileUpload from "../DocumentManager/Documents-components/components/FileUpload";

import {
  RiExchange2Line,
  RiCustomerService2Fill,
} from "@remixicon/react";
import { IconUsersPlus, IconFilePlus } from "@tabler/icons-react";
import ListUsers from "./components/ListUsers";

export default function Users() {
  const [activeTab, setActiveTab] = useState("Usuarios");

  return (
    <div className="p-2 space-y-4">
      <h1 className="text-base font-semibold">GESTOR DE USUARIOS</h1>

      <TabNavigation>
        <TabNavigationLink
          className="inline-flex gap-2"
          href="#"
          active={activeTab === "Usuarios"}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("Usuarios");
          }}
        >
          <IconUsersPlus className="size-4" aria-hidden="true" />
          Usuarios
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
          <RiCustomerService2Fill className="size-4" aria-hidden="true" />
          Customers
        </TabNavigationLink>
      </TabNavigation>

      {activeTab === "Usuarios" && (
        <div>
          <ListUsers />
        </div>
      )}

      {activeTab === "importar" && (
        <div>
          {/*
            2. Pasamos la función "importUserService.importUsers" 
               como prop a FileUpload (ej. "onUploadFile" o "uploadService")
          */}
          <FileUpload
            uploadService={importUserService.importUsers}
          />
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
