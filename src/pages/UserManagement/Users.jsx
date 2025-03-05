// Users.jsx
import React, { useState } from "react";
import importUserService from '../../services/api/import-user/importUserService';
import { TabNavigation, TabNavigationLink } from "../../pages/DocumentManager/Documents-components/TabNavigation";
import FileUpload from "../DocumentManager/Documents-components/components/FileUpload";
import { IconUsersPlus, IconFilePlus } from "@tabler/icons-react";
import ListUsers from "./components/ListUsers";

export default function Users({ usersData, rolesData, areasData }) {
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
      </TabNavigation>

      {activeTab === "Usuarios" && (
        <div>
          {/* Se pasan los tres parámetros a ListUsers */}
          <ListUsers 
            usersData={usersData} 
            rolesData={rolesData} 
            areasData={areasData} 
          />
        </div>
      )}

      {activeTab === "importar" && (
        <div>
          {/* Se pasa la función "importUserService.importUsers" como prop a FileUpload */}
          <FileUpload uploadService={importUserService.importUsers} />
        </div>
      )}
    </div>
  );
}
