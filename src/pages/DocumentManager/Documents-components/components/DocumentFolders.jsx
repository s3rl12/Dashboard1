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

export default function DocumentFolders() {
  return (
    <div className="mx-auto max-w-full">
      <h1 className="text-md font-semibold text-gray-900 dark:text-gray-900">
        Document Folders
      </h1>

      <Accordion type="multiple" className="mt-3">
        {/* Folder A */}
        <AccordionItem value="folder-a">
          <AccordionTrigger>
            <span className="flex items-center gap-2">
              <IconFolderSymlink className="size-5 text-blue-500" />
              Folder A
            </span>
          </AccordionTrigger>
          <AccordionContent>
            {/* Aquí se incluye el componente FileContent */}
            <FileContent />
          </AccordionContent>
        </AccordionItem>

        {/* Folder B */}
        <AccordionItem value="folder-b">
          <AccordionTrigger>
            <span className="flex items-center gap-2">
              <IconFolderSymlink className="size-5 text-blue-500" />
              Folder B
            </span>
          </AccordionTrigger>
          <AccordionContent>
            
            <FileContent />
          </AccordionContent>
        </AccordionItem>

        {/* Folder C */}
        <AccordionItem value="folder-c">
          <AccordionTrigger>
            <span className="flex items-center gap-2">
              <IconFolderSymlink className="size-5 text-blue-500" />
              Folder C
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <FileContent />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
