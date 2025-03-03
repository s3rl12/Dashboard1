// src/pages/Users/components/ListUsers.jsx
import React, { useMemo, useState, useEffect } from "react";
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

import { Button } from "../../../components/ui/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../../../components/ui/Dialog";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from "../../../components/ui/Drawer";

import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import { Divider } from "../../../components/ui/Divider";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../../../components/dashboard/Select";
import { RadioGroup } from "@headlessui/react";
import { RiCheckboxCircleFill } from "@remixicon/react";
import { DatePicker } from "../../../components/ui/DatePicker";

import OptionalAlert from "../../../components/alert/OptionalAlert";
import UserForm from "./UserForm";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Ejemplo de “status” badge
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
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ${colorClasses}`}>
      {status}
    </span>
  );
}

export default function ListUsers({ usersData: propUsersData = [], rolesData = [], areasData= [] }) {
  // Se usa un estado local para manejar modificaciones (como eliminación)
  const [tableData, setTableData] = useState(propUsersData);

  // Actualizar el estado local si la prop cambia
  useEffect(() => {
    setTableData(propUsersData);
  }, [propUsersData]);

  // Transformar rolesData en workspaces
  const workspaces = rolesData.map((role) => {
    const activePermissions = Object.values(role.permisos_fk || {}).filter(value => value === 1).length;
    return {
      id: role.id,
      title: role.roles,
      description: role.descripcion,
      users: `${activePermissions} permisos activos`,
    };
  });

  // Control del Drawer de edición
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0] || {});

  // Función para “eliminar” un usuario (actualiza su estado a “Inactivo”)
  const handleDeleteUser = (rowData) => {
    OptionalAlert({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      onConfirm: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setTableData((prev) =>
          prev.map((user) =>
            user.id === rowData.id ? { ...user, estado: 0 } : user
          )
        );
      },
    });
  };

  // Columnas de la tabla
  const columns = useMemo(
    () => [
      {
        header: "Nombre/Email",
        id: "nombreEmail",
        enableSorting: false,
        meta: { align: "text-left" },
        cell: ({ row }) => {
          const { nombre, apellido, email } = row.original;
          return (
            <div className="inline-flex items-start gap-2">
              <IconUserCircle className="size-5 text-gray-600" aria-hidden />
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">
                  {nombre} {apellido}
                </span>
                <span className="text-sm text-gray-500">{email}</span>
              </div>
            </div>
          );
        },
      },
      {
        header: "Rol",
        // Se extrae el rol del objeto anidado roles_fk
        accessorFn: (row) => row.roles_fk?.roles || "Sin rol",
        enableSorting: false,
        meta: { align: "text-left" },
      },
      {
        header: "Despacho",
        // Se muestra despacho_fk o un valor por defecto
        accessorFn: (row) => row.despacho_fk || "Sin despacho",
        enableSorting: false,
        meta: { align: "text-left" },
      },
      {
        header: "Estado",
        accessorKey: "estado",
        enableSorting: false,
        meta: { align: "text-left" },
        cell: ({ getValue }) => {
          const statusValue = getValue();
          // Convertir el valor numérico en texto
          const statusText = statusValue === 1 ? "Activo" : "Inactivo";
          return <StatusBadge status={statusText} />;
        },
      },
      {
        header: "Acciones",
        id: "acciones",
        meta: { align: "text-right" },
        cell: ({ row }) => {
          const rowData = row.original;
          return (
            <div className="inline-flex items-center gap-2">
              {/* Botón Editar -> abre Drawer */}
              <button
                type="button"
                className="inline-flex items-center rounded-md px-2 py-1.5 text-gray-600 ring-1 ring-inset ring-gray-200 hover:bg-gray-100"
                onClick={() => {
                  setSelectedUser(rowData);
                  setIsDrawerOpen(true);
                }}
              >
                <IconPencil className="size-4" aria-hidden />
              </button>
              {/* Botón Eliminar */}
              <button
                type="button"
                className="inline-flex items-center rounded-md px-2 py-1.5 text-gray-600 ring-1 ring-inset ring-gray-200 hover:bg-gray-100"
                onClick={() => handleDeleteUser(rowData)}
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
    <div className="flex items-start">
      {/* Panel Izquierdo */}
      <div className="w-1/4 flex flex-col space-y-1">
        <h4 className="font-semibold text-base text-gray-800">
          Lista de Usuarios
        </h4>
        <p className="text-sm text-gray-600 pb-1">
          Ejemplo de tabla generada a partir de datos recibidos.
        </p>

        {/* Dialog para crear nuevo usuario */}
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
            <UserForm rolesData={rolesData} areasData={areasData}  />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancelar</Button>
              </DialogClose>
              <Button type="button">Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabla de usuarios */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-200"
              >
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    className={classNames(
                      header.column.columnDef.meta.align,
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
            Showing{" "}
            <span className="font-medium text-gray-800">
              {startIndex}-{endIndex}
            </span>{" "}
            of{" "}
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
      </div>

      {/* Drawer para Editar Usuario */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Editar Usuario</DrawerTitle>
            <DrawerDescription>
              Modifica los datos del usuario seleccionado
            </DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            {!selectedUser ? (
              <p className="text-sm text-gray-500">
                No se ha seleccionado ningún usuario.
              </p>
            ) : (
              <div className="space-y-6">
                {/* Sección de edición de información personal */}
                <section>
                  <h2 className="font-semibold text-gray-800 text-base">
                    Personal information
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                        Nombre <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="mt-1"
                        value={selectedUser.nombre}
                        onChange={() => { }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="apellido" className="text-sm font-medium text-gray-700">
                        Apellido <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="apellido"
                        name="apellido"
                        className="mt-1"
                        value={selectedUser.apellido}
                        onChange={() => { }}
                      />
                    </div>
                    <div className="col-span-full">
                      <Label htmlFor="correo" className="text-sm font-medium text-gray-700">
                        Correo <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="email"
                        id="correo"
                        name="correo"
                        className="mt-1"
                        value={selectedUser.email}
                        onChange={() => { }}
                      />
                    </div>
                    {/* ... Resto de campos para edición */}
                    {/* Row 3: DNI, Fecha */}
                    <div>
                      <Label htmlFor="dni" className="text-sm font-medium text-gray-700">
                        DNI <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="dni"
                        name="dni"
                        className="mt-1"
                        value={selectedUser.dni}
                        onChange={() => { }}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Fecha de nacimiento <span className="text-red-500">*</span>
                      </Label>
                      <DatePicker
                        placeholder="Selecciona la fecha"
                        className="mt-1"

                      // Podrías setear un value, si tuviéramos la info
                      />
                    </div>

                    {/* Row 4: Teléfono */}
                    <div className="col-span-full">
                      <Label htmlFor="telefono" className="text-sm font-medium text-gray-700">
                        Teléfono <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="telefono"
                        name="telefono"
                        className="mt-1"
                        value={selectedUser.telefono}
                        onChange={() => { }}
                      />
                    </div>

                    {/* Row 5: Dirección */}
                    <div className="col-span-full">
                      <Label htmlFor="direccion" className="text-sm font-medium text-gray-700">
                        Dirección
                      </Label>
                      <Input
                        type="text"
                        id="direccion"
                        name="direccion"
                        className="mt-1"
                        value={selectedUser.direccion}
                        onChange={() => { }}
                      />
                    </div>

                    {/* Row 6: Género*, Extensión*, Tipo Fiscal* (pero 2 col máx) */}
                    <div>
                      <Label htmlFor="genero" className="text-sm font-medium text-gray-700">
                        Género <span className="text-red-500">*</span>
                      </Label>
                      <Select>
                        <SelectTrigger id="genero" className="mt-1 w-full">
                          Selecciona
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="varon">Varón</SelectItem>
                          <SelectItem value="mujer">Mujer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="extension" className="text-sm font-medium text-gray-700">
                        Extensión <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="extension"
                        name="extension"
                        className="mt-1"
                        value={selectedUser.extension}
                        onChange={() => { }}
                      />
                    </div>
                    {/* Siguiente fila */}
                    <div className="col-span-full">
                      <Label htmlFor="tipo-fiscal" className="text-sm font-medium text-gray-700">
                        Tipo Fiscal <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="tipo-fiscal"
                        name="tipo-fiscal"
                        className="mt-1"
                        value={selectedUser.tipo_fiscal}
                        onChange={() => { }}
                      />
                    </div>

                    {/* Row 7: Password*, Confirmar Password* */}
                    <div>
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1"
                        placeholder="********"
                        value="(sin data)"
                        onChange={() => { }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                        Confirmar Password <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        className="mt-1"
                        placeholder="********"
                        value="(sin data)"
                        onChange={() => { }}
                      />
                    </div>
                  </div>
                </section>
                <Divider className="my-5" />

                {/* === Sección: Workspace settings (vertical) === */}
                <section>
                  <h2 className="font-semibold text-gray-800 text-base">
                    Workspace settings
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                  </p>

                  {/* Todo en vertical: 1 col => grid-cols-1 */}
                  <div className="mt-3 grid grid-cols-1 gap-4">
                    {/* Sede* */}
                    <div>
                      <Label htmlFor="sede" className="text-sm font-medium text-gray-700">
                        Sede <span className="text-red-500">*</span>
                      </Label>
                      <Select>
                        <SelectTrigger id="sede" className="mt-1 w-full">
                          Selecciona la sede
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sede1">Sede 1</SelectItem>
                          <SelectItem value="sede2">Sede 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Dependencia* */}
                    <div>
                      <Label htmlFor="dependencia" className="text-sm font-medium text-gray-700">
                        Dependencia <span className="text-red-500">*</span>
                      </Label>
                      <Select>
                        <SelectTrigger id="dependencia" className="mt-1 w-full">
                          Selecciona la dependencia
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dep1">Dependencia 1</SelectItem>
                          <SelectItem value="dep2">Dependencia 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Despacho* */}
                    <div>
                      <Label htmlFor="despacho" className="text-sm font-medium text-gray-700">
                        Despacho <span className="text-red-500">*</span>
                      </Label>
                      <Select>
                        <SelectTrigger id="despacho" className="mt-1 w-full">
                          Selecciona el despacho
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="desp1">Despacho 1</SelectItem>
                          <SelectItem value="desp2">Despacho 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </section>

                <Divider className="my-5" />

                {/* Sección de Roles y Permisos */}
                <section>
                  <h2 className="font-semibold text-gray-800 text-base">
                    Roles y Permisos
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Selecciona tu preferencia de acceso
                  </p>
                  <RadioGroup
                    value={selectedWorkspace}
                    onChange={setSelectedWorkspace}
                    name="notificationSettings"
                    className="mt-4 space-y-4"
                  >
                    <RadioGroup.Label className="text-sm font-semibold text-gray-700">
                      Configuración de acceso al sistema
                    </RadioGroup.Label>
                    <div className="grid grid-cols-1 gap-4">
                      {workspaces.map((item) => (
                        <RadioGroup.Option
                          key={item.id}
                          value={item}
                          className={({ active }) =>
                            `relative flex cursor-pointer rounded-lg border p-4 transition ${active
                              ? "border-blue-500 ring-2 ring-blue-200"
                              : "border-gray-200"
                            } bg-white`
                          }
                        >
                          {({ checked }) => (
                <>
                  <div className="flex w-full flex-col justify-between">
                    <div>
                      <RadioGroup.Label className="block text-sm font-medium text-gray-700">
                        {item.title}
                      </RadioGroup.Label>
                      <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                    </div>
                    <span className="mt-4 text-sm font-medium text-gray-700">{item.users}</span>
                  </div>
                  <RiCheckboxCircleFill className={`size-5 shrink-0 text-blue-500 ${!checked ? "invisible" : ""}`} aria-hidden={true} />
                </>
              )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </section>
              </div>
            )}
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose asChild>
              <button className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200">
                Cancelar
              </button>
            </DrawerClose>
            <button
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              onClick={() => setIsDrawerOpen(false)}
            >
              Guardar
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
