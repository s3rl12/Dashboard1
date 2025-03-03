// AreaListContent.jsx
import React, { useMemo, useState, useEffect } from 'react';
import { flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
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
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from '../../../components/ui/Drawer';
import { Input } from '../../../components/ui/Input';
import { Label } from '../../../components/ui/Label';
import { Divider } from '../../../components/ui/Divider';
import OptionalAlert from '../../../components/alert/OptionalAlert';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Ejemplo de badge para el estado del área
function StatusBadge({ status }) {
  let colorClasses = "";
  switch (status) {
    case "Activo":
      colorClasses = "bg-green-100 text-green-700";
      break;
    case "Inactivo":
      colorClasses = "bg-red-100 text-red-700";
      break;
    default:
      colorClasses = "bg-yellow-100 text-yellow-700";
      break;
  }
  return <span className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ${colorClasses}`}>{status}</span>;
}

export default function AreaListContent({ title }) {
  // Datos estáticos de ejemplo para la tabla (puedes ajustar según la opción)
  const staticDataSede = [
    { id: 1, area: "Sede A", supervisor: "Supervisor A", presupuesto: "$10,000", status: "Activo" },
    { id: 2, area: "Sede B", supervisor: "Supervisor B", presupuesto: "$8,000", status: "Inactivo" },
    { id: 3, area: "Sede C", supervisor: "Supervisor C", presupuesto: "$12,000", status: "Activo" },
  ];

  const staticDataDependencia = [
    { id: 1, dependencia: "Dependencia X", encargado: "Encargado X", presupuesto: "$5,000", status: "Activo" },
    { id: 2, dependencia: "Dependencia Y", encargado: "Encargado Y", presupuesto: "$7,000", status: "Activo" },
  ];

  const staticDataDespacho = [
    { id: 1, despacho: "Despacho 1", responsable: "Responsable 1", presupuesto: "$3,000", status: "Inactivo" },
    { id: 2, despacho: "Despacho 2", responsable: "Responsable 2", presupuesto: "$4,500", status: "Activo" },
  ];

  // Estado para la data de la tabla (inicialmente según "Administracion sede")
  const [tableData, setTableData] = useState(staticDataSede);

  // Actualizar columnas y datos según el título recibido
  const columns = useMemo(() => {
    if (title === "Administracion sede") {
      return [
        {
          header: "Área",
          accessorKey: "area",
          meta: { align: "text-left" },
        },
        {
          header: "Supervisor",
          accessorKey: "supervisor",
          meta: { align: "text-left" },
        },
        {
          header: "Presupuesto",
          accessorKey: "presupuesto",
          meta: { align: "text-right" },
        },
        {
          header: "Estado",
          accessorKey: "status",
          meta: { align: "text-left" },
          cell: ({ getValue }) => <StatusBadge status={getValue()} />,
        },
        {
          header: "Acciones",
          id: "acciones",
          meta: { align: "text-right" },
          cell: ({ row }) => {
            const rowData = row.original;
            return (
              <div className="inline-flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSelectedArea(rowData);
                    setIsDrawerOpen(true);
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    OptionalAlert({
                      title: "¿Estás seguro?",
                      text: "Esta acción no se puede revertir.",
                      onConfirm: async () => {
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                        setTableData((prev) => prev.filter((item) => item.id !== rowData.id));
                      },
                    });
                  }}
                >
                  Eliminar
                </Button>
              </div>
            );
          },
        },
      ];
    } else if (title === "Administracion dependencia") {
      return [
        {
          header: "Dependencia",
          accessorKey: "dependencia",
          meta: { align: "text-left" },
        },
        {
          header: "Encargado",
          accessorKey: "encargado",
          meta: { align: "text-left" },
        },
        {
          header: "Presupuesto",
          accessorKey: "presupuesto",
          meta: { align: "text-right" },
        },
        {
          header: "Estado",
          accessorKey: "status",
          meta: { align: "text-left" },
          cell: ({ getValue }) => <StatusBadge status={getValue()} />,
        },
        {
          header: "Acciones",
          id: "acciones",
          meta: { align: "text-right" },
          cell: ({ row }) => {
            const rowData = row.original;
            return (
              <div className="inline-flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSelectedArea(rowData);
                    setIsDrawerOpen(true);
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    OptionalAlert({
                      title: "¿Estás seguro?",
                      text: "Esta acción no se puede revertir.",
                      onConfirm: async () => {
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                        setTableData((prev) => prev.filter((item) => item.id !== rowData.id));
                      },
                    });
                  }}
                >
                  Eliminar
                </Button>
              </div>
            );
          },
        },
      ];
    } else if (title === "Administracion despacho") {
      return [
        {
          header: "Despacho",
          accessorKey: "despacho",
          meta: { align: "text-left" },
        },
        {
          header: "Responsable",
          accessorKey: "responsable",
          meta: { align: "text-left" },
        },
        {
          header: "Presupuesto",
          accessorKey: "presupuesto",
          meta: { align: "text-right" },
        },
        {
          header: "Estado",
          accessorKey: "status",
          meta: { align: "text-left" },
          cell: ({ getValue }) => <StatusBadge status={getValue()} />,
        },
        {
          header: "Acciones",
          id: "acciones",
          meta: { align: "text-right" },
          cell: ({ row }) => {
            const rowData = row.original;
            return (
              <div className="inline-flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSelectedArea(rowData);
                    setIsDrawerOpen(true);
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    OptionalAlert({
                      title: "¿Estás seguro?",
                      text: "Esta acción no se puede revertir.",
                      onConfirm: async () => {
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                        setTableData((prev) => prev.filter((item) => item.id !== rowData.id));
                      },
                    });
                  }}
                >
                  Eliminar
                </Button>
              </div>
            );
          },
        },
      ];
    }
    return [];
  }, [title, tableData]);

  // Estado para el Drawer y para el diálogo de edición
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });

  const totalRows = table.getFilteredRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const startIndex = pageIndex * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, totalRows);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-b border-gray-200">
              {headerGroup.headers.map((header) => (
                <TableHeaderCell
                  key={header.id}
                  className={classNames(
                    header.column.columnDef.meta.align,
                    "font-semibold text-sm text-gray-600"
                  )}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHeaderCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getPaginationRowModel().rows.map((row) => (
            <TableRow key={row.id} className="group hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={classNames(
                    cell.column.columnDef.meta.align,
                    "relative text-sm text-gray-600"
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginación */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Mostrando{" "}
          <span className="font-medium text-gray-800">
            {startIndex}-{endIndex}
          </span>{" "}
          de{" "}
          <span className="font-medium text-gray-800">{totalRows}</span>
        </p>
        <div className="inline-flex items-center rounded-lg border border-gray-200 px-1 shadow-sm">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RiArrowLeftSLine className="size-5 text-gray-600" aria-hidden />
            <span className="sr-only">Previous</span>
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RiArrowRightSLine className="size-5 text-gray-600" aria-hidden />
            <span className="sr-only">Next</span>
          </button>
        </div>
      </div>

      {/* Dialog para crear nueva área */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-fit">Nueva área</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear nueva área</DialogTitle>
            <DialogDescription>
              Completa los campos para agregar una nueva área.
            </DialogDescription>
          </DialogHeader>
          {/* Aquí se podría colocar un formulario para crear/editar área */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button type="button">Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Drawer para editar área */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Editar Área</DrawerTitle>
            <DrawerDescription>
              Modifica los datos del área seleccionada.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            {!selectedArea ? (
              <p className="text-sm text-gray-500">
                No se ha seleccionado ninguna área.
              </p>
            ) : (
              <div className="space-y-6">
                {/* Aquí se coloca el formulario para editar el área */}
                <p className="text-sm">
                  Formulario de edición para: {selectedArea.area}
                </p>
              </div>
            )}
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200">
                Cancelar
              </Button>
            </DrawerClose>
            <Button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" onClick={() => setIsDrawerOpen(false)}>
              Guardar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
