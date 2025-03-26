// FileContent.jsx
import React, { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { IconTrash, IconPencil, IconFileZip } from "@tabler/icons-react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

// Ajusta la ruta a tu Drawer
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from "../../../../components/ui/Drawer";

// Ajusta la ruta a tu formulario
import FileUploadForm from "./FileUploadForm";

// Importa OptionalAlert (sin modificarlo)
import OptionalAlert from "../../../../components/alert/OptionalAlert"; // Ajusta la ruta

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FileContent({ archivos = [] }) {
  // Mantenemos el array de archivos en un estado local (para simular cambios: eliminar, etc.)
  const [fileData, setFileData] = useState(archivos);

  // Control del Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Para “eliminar” un archivo, simulamos la acción con OptionalAlert
  const handleDelete = (file) => {
    OptionalAlert({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      onConfirm: async () => {
        // Simulamos proceso asíncrono:
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Removemos el archivo del state local
        setFileData((prev) => prev.filter((f) => f.usuario.id !== file.usuario.id));
      },
    });
  };

  // Columnas de la tabla actualizadas
  const columns = useMemo(
    () => [
      {
        header: "Nombre",
        id: "nombre",
        enableSorting: false,
        meta: { align: "text-left" },
        cell: ({ row }) => {
          const user = row.original.usuario;
          return (
            <div className="inline-flex flex-col">
              <span className="font-medium text-sm text-gray-800">{user.nombre}</span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          );
        },
      },
      {
        header: "Código de archivo",
        id: "codigo",
        enableSorting: false,
        meta: { align: "text-left" },
        cell: ({ row }) => {
          // Se asume que archivos_del_usuario es un array y se toma el primero
          const codigo = row.original.usuario.archivos_del_usuario?.[0]?.codigo || "N/A";
          return <span>{codigo}</span>;
        },
      },
      {
        header: "Tamaño",
        id: "tamanio",
        enableSorting: false,
        meta: { align: "text-left" },
        cell: ({ row }) => {
          const peso = row.original.usuario.archivos_del_usuario?.[0]?.peso_arch || "N/A";
          return <span>{peso}</span>;
        },
      },
      {
        header: "Fecha de creación",
        id: "fecha",
        enableSorting: false,
        meta: { align: "text-right" },
        cell: ({ row }) => {
          const rawDate = row.original.usuario.archivos_del_usuario?.[0]?.created_at || "";
          if (!rawDate) return "";
          const dateObj = new Date(rawDate);
          if (isNaN(dateObj.getTime())) return "Fecha inválida";
          const yyyy = dateObj.getFullYear();
          const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
          const dd = String(dateObj.getDate()).padStart(2, "0");
          return `${yyyy}-${mm}-${dd}`;
        },
      },
      {
        header: "Acciones",
        id: "actions",
        meta: { align: "text-right" },
        cell: ({ row }) => {
          const fileRow = row.original;
          return (
            <div className="inline-flex items-center space-x-1">
              {/* Botón Editar (Drawer) */}
              <button
                type="button"
                className="inline-flex items-center rounded-md px-2 py-1.5 text-gray-600 ring-1 ring-inset ring-gray-200 hover:bg-gray-100"
                onClick={() => {
                  setSelectedFile(fileRow);
                  setIsDrawerOpen(true);
                }}
              >
                <IconPencil className="size-4" aria-hidden />
              </button>
              {/* Botón Eliminar (OptionalAlert) */}
              <button
                type="button"
                className="inline-flex items-center rounded-md px-2 py-1.5 text-gray-600 ring-1 ring-inset ring-gray-200 hover:bg-gray-100"
                onClick={() => handleDelete(fileRow)}
              >
                <IconTrash className="size-4" aria-hidden />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  // Configuramos la tabla con React Table
  const table = useReactTable({
    data: fileData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 3,
      },
    },
  });

  // Indices para "Showing X - Y of Z"
  const totalRows = table.getFilteredRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const startIndex = pageIndex * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, totalRows);

  const handleSave = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex flex-col items-start space-y-2">
          <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Archivos
          </h4>
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Lista de archivos de la carpeta
          </p>
        </div>
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-b border-tremor-border dark:border-dark-tremor-border">
                  {headerGroup.headers.map((header) => (
                    <TableHeaderCell key={header.id} className={classNames(header.column.columnDef.meta.align)}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHeaderCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getPaginationRowModel().rows.map((row) => (
                <TableRow key={row.id} className="group hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={classNames(cell.column.columnDef.meta.align, "relative")}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Showing{" "}
              <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {startIndex}-{endIndex}
              </span>{" "}
              of{" "}
              <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {totalRows}
              </span>
            </p>
            <div className="inline-flex items-center rounded-lg border border-gray-200 px-1 shadow-sm dark:border-gray-200">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="p-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RiArrowLeftSLine className="size-5 text-gray-600 dark:text-gray-300" aria-hidden="true" />
                <span className="sr-only">Previous</span>
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="p-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RiArrowRightSLine className="size-5 text-gray-600 dark:text-gray-300" aria-hidden="true" />
                <span className="sr-only">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Drawer
        open={isDrawerOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsDrawerOpen(false);
            setSelectedFile(null);
          }
        }}
      >
        <DrawerContent className="sm:max-w-md">
          <DrawerHeader>
            <DrawerTitle>{selectedFile?.usuario?.nombre ?? "Editar archivo"}</DrawerTitle>
            <DrawerDescription>
              {selectedFile
                ? `Tamaño: ${selectedFile.usuario.archivos_del_usuario?.[0]?.peso_arch || ""}`
                : ""}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <FileUploadForm />
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose asChild>
              <button className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200">
                Cancelar
              </button>
            </DrawerClose>
            <button onClick={handleSave} className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Guardar
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
