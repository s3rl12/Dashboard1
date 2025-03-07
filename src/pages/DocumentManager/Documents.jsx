// Documents.jsx
import React, { useState } from "react";
import { Callout } from "./Documents-components/Callout";
import { TabNavigation, TabNavigationLink } from "./Documents-components/TabNavigation";
import { useCarpetasArchivos } from "../../hooks/useCarpetasArchivos";
import { IconFilePlus, IconFolderOpen } from "@tabler/icons-react";
import FileUpload from "./Documents-components/components/FileUpload";
import DocumentFolders from "./Documents-components/components/DocumentFolders";
export default function Documents() {
  // Estado local para saber cuál pestaña está activa
  const [activeTab, setActiveTab] = useState("carpetas");
const { 
    data: carpetasData, 
  } = useCarpetasArchivos();
  return (
    <div className="p-2 space-y-4">
      {/* 1. Título */}
      <h1 className="text-base font-semibold">GESTOR DE DOCUMENTOS</h1>
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
  
      </TabNavigation>

      {/* Contenido condicional según la pestaña activa */}
      {activeTab === "carpetas" && (
        <div>
          <DocumentFolders carpetasData={carpetasData} />
        </div>
      )}

      {activeTab === "importar" && (
        <div>
          {/* Renderiza el FileUpload */}
          <FileUpload />
        </div>
      )}
    </div>
  );
}
