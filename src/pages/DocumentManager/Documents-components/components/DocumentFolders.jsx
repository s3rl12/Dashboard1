// DocumentFolders.jsx
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../../components/dashboard/Accordion"; // Ajusta la ruta
import { IconFolderSymlink } from "@tabler/icons-react";
import FileContent from "./FileContent"; // Ajusta la ruta a tu FileContent.jsx

export default function DocumentFolders({ carpetasData = [] }) {
  return (
    <div className="mx-auto max-w-full">
      <h1 className="text-md font-semibold text-gray-900 dark:text-gray-900">
        Document Folders
      </h1>

      <Accordion type="multiple" className="mt-3">
        {carpetasData.map((folder) => (
          <AccordionItem
            key={folder.id}
            value={folder.codigo_carp} // algo único
          >
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                <IconFolderSymlink className="size-5 text-blue-500" />
                {folder.nombre_carp}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <FileContent archivos={folder.archivos} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
