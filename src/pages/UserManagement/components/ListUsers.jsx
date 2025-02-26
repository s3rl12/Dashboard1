// src/pages/Users/components/ListUsers.jsx
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
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { IconUserCircle, IconTrash, IconPencil } from "@tabler/icons-react";
import UserForm from "./UserForm";
import { Button } from '../../../components/ui/Button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../../../components/ui/Dialog';
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ListUsers() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Datos estáticos de ejemplo
  const [usersData] = useState([
    {
      nombre: "John Doe",
      email: "john@example.com",
      rol: "Administrador",
      despacho: "Ventas",
      estado: "Activo",
    },
    {
      nombre: "Jane Smith",
      email: "jane@example.com",
      rol: "Usuario",
      despacho: "Compras",
      estado: "Inactivo",
    },
    {
      nombre: "Bob Johnson",
      email: "bob@example.com",
      rol: "Usuario",
      despacho: "Finanzas",
      estado: "Pendiente",
    },
  ]);

  // Definición de columnas
  const columns = useMemo(
    () => [
      {
        header: "Nombre/Email",
        id: "nombreEmail",
        enableSorting: false,
        meta: { align: "text-left" },
        cell: ({ row }) => {
          const { nombre, email } = row.original;
          return (
            <div className="inline-flex items-start gap-2">
              <IconUserCircle className="size-5 text-gray-600" aria-hidden />
              <div className="flex flex-col">
                <span className="font-medium text-gray-800 dark:text-gray-600">
                  {nombre}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-600">
                  {email}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        header: "Rol",
        accessorKey: "rol",
        enableSorting: false,
        meta: { align: "text-left" },
      },
      {
        header: "Despacho",
        accessorKey: "despacho",
        enableSorting: false,
        meta: { align: "text-left" },
      },
      {
        header: "Estado",
        accessorKey: "estado",
        enableSorting: false,
        meta: { align: "text-left" },
      },
      {
        header: "Acciones",
        id: "acciones",
        meta: { align: "text-right" },
        cell: () => {
          // Botones Editar / Eliminar
          return (
            <div className="inline-flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center rounded-md px-2 py-1.5 text-gray-600 ring-1 ring-inset ring-gray-200 hover:bg-gray-100"
              >
                <IconPencil className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-md px-2 py-1.5 text-gray-600 ring-1 ring-inset ring-gray-200 hover:bg-gray-100"
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

  // Configuración de la tabla con react-table
  const table = useReactTable({
    data: usersData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5, // Muestra 5 usuarios por página
      },
    },
  });

  // Lógica para "Showing X - Y of Z"
  const totalRows = table.getFilteredRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const startIndex = pageIndex * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, totalRows);

  return (
    <div className="flex items-start">
      {/* Div con título y texto (lado izquierdo) */}
      <div className="w-1/4 flex flex-col space-y-1">
        <h4 className="font-semibold text-base text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Lista de Usuarios
        </h4>
        <p className="text-tremor-default text-sm text-tremor-content dark:text-dark-tremor-content pb-1">
          Ejemplo de tabla con datos estáticos.
        </p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-fit">Nuevo usuario</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear nuevo usuario</DialogTitle>
              <DialogDescription>
                Completa los campos para agregar un usuario.
              </DialogDescription>
            </DialogHeader>
            <UserForm />
            {/* Botones de acción */}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancelar</Button>
              </DialogClose>
              <Button type="button">Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Contenedor de la tabla (lado derecho) */}
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
                    className={classNames(
                      header.column.columnDef.meta.align,
                      // Estilos para el TableHead
                      "font-semibold text-sm text-gray-600"
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
                    className={classNames(
                      cell.column.columnDef.meta.align,
                      "relative",
                      // Estilos para el TableBody
                      "text-sm text-gray-600"
                    )}
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
  );
}
