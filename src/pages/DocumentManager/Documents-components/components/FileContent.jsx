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
import {
  RiDeleteBin7Line,
  RiPencilLine,
  RiFileLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "@remixicon/react";
import { IconFileZip, IconTrash, IconEye, IconPencil } from "@tabler/icons-react";

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

export default function FileContent() {
  const [tableData, setTableData] = useState([
    {
      workspace: "sales_by_day_api",
      owner: "John Doe",
      status: "aprobado",
      lastEdited: "23/09/2023 13:00",
    },
    {
      workspace: "marketing_campaign",
      owner: "Jane Smith",
      status: "editado",
      lastEdited: "22/09/2023 10:45",
    },
    {
      workspace: "sales_campaign",
      owner: "Jane Smith",
      status: "eliminado",
      lastEdited: "22/09/2023 10:45",
    },
  ]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Renderiza el badge del estado
  function renderStatusBadge(statusValue) {
    let colorClasses = "";
    let label = statusValue;

    switch (statusValue) {
      case "aprobado":
        colorClasses = "text-green-700 bg-green-50 border border-green-600/20";
        label = "Aprobado";
        break;
      case "editado":
        colorClasses = "text-orange-700 bg-orange-50 border border-orange-600/20";
        label = "Editado";
        break;
      case "eliminado":
        colorClasses = "text-red-700 bg-red-50 border border-red-600/20";
        label = "Eliminado";
        break;
      default:
        colorClasses = "text-gray-700 bg-gray-50 border border-gray-300/20";
        break;
    }

    return (
      <span
        className={classNames(
          "inline-flex items-center px-2 py-1 text-sm font-medium rounded-md",
          colorClasses
        )}
      >
        {label}
      </span>
    );
  }

  // Aquí es donde invocamos OptionalAlert
  const handleDelete = (rowData) => {
    OptionalAlert({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      onConfirm: async () => {
        // Simulamos un proceso asíncrono para que se vea el “Procesando...”
        // (en tu caso podrías usar un await a tu API de borrado real)
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Marcamos como "eliminado"
        setTableData((prev) =>
          prev.map((item) =>
            item.workspace === rowData.workspace
              ? { ...item, status: "eliminado" }
              : item
          )
        );
      },
    });
  };

  const columns = useMemo(
    () => [
      {
        header: "Nombre",
        accessorKey: "workspace",
        enableSorting: true,
        meta: { align: "text-left" },
        cell: ({ getValue }) => (
          <div className="inline-flex items-center gap-2">
            <IconFileZip className="size-4 text-gray-600" aria-hidden />
            <span>{getValue()}</span>
          </div>
        ),
      },
      {
        header: "Usuario",
        accessorKey: "owner",
        enableSorting: true,
        meta: { align: "text-left" },
      },
      {
        header: "Estado",
        accessorKey: "status",
        enableSorting: false,
        meta: { align: "text-left" },
        cell: ({ getValue }) => renderStatusBadge(getValue()),
      },
      {
        header: "Fecha de creación",
        accessorKey: "lastEdited",
        enableSorting: false,
        meta: { align: "text-right" },
      },
      {
        header: "Acciones",
        id: "actions",
        meta: { align: "text-right" },
        cell: ({ row }) => {
          const rowData = row.original;
          const isDisabled = rowData.status === "eliminado";

          return (
            <div className="inline-flex items-center space-x-1">
              <button
                type="button"
                className="inline-flex items-center rounded-md px-2 py-1.5 text-gray-600 ring-1 ring-inset ring-gray-200 hover:bg-gray-100 disabled:opacity-50"
                onClick={() => {
                  setSelectedRow(rowData);
                  setIsDrawerOpen(true);
                }}
                disabled={isDisabled}
              >
                <IconPencil className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-md px-2 py-1.5 text-gray-600 ring-1 ring-inset ring-gray-200 hover:bg-gray-100 disabled:opacity-50"
                onClick={() => handleDelete(rowData)}
                disabled={isDisabled}
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

  const table = useReactTable({
    data: tableData,
    columns,
    enableRowSelection: false,
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
        {/* Sección izquierda: Título y texto */}
        <div className="flex flex-col items-start space-y-2">
          <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Documentos
          </h4>
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Listado de documentos con estados y acciones
          </p>
        </div>

        {/* Sección derecha: Tabla */}
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-tremor-border dark:border-dark-tremor-border"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHeaderCell
                      key={header.id}
                      className={classNames(header.column.columnDef.meta.align)}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHeaderCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <TableBody>
              {table.getPaginationRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="group hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={classNames(cell.column.columnDef.meta.align, "relative")}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Controles de paginación */}
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
                <RiArrowLeftSLine
                  className="size-5 text-gray-600 dark:text-gray-300"
                  aria-hidden="true"
                />
                <span className="sr-only">Previous</span>
              </button>

              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="p-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RiArrowRightSLine
                  className="size-5 text-gray-600 dark:text-gray-300"
                  aria-hidden="true"
                />
                <span className="sr-only">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer para editar */}
      <Drawer
        open={isDrawerOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsDrawerOpen(false);
            setSelectedRow(null);
          }
        }}
      >
        <DrawerContent className="sm:max-w-md">
          <DrawerHeader>
            <DrawerTitle>
              {selectedRow?.workspace ?? "Editar documento"}
            </DrawerTitle>
            <DrawerDescription>
              {selectedRow
                ? `Usuario: ${selectedRow.owner} | Estado: ${selectedRow.status}`
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
            <button
              onClick={handleSave}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Guardar
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
