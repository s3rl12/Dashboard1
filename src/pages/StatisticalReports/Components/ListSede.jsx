// ListSede.jsx
import React from "react";
import { IconUser } from "@tabler/icons-react";
import { IconBuildings } from "@tabler/icons-react";
import { IconMapPin } from "@tabler/icons-react";
import Card from "../../../components/ui/Card";
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
import DependencyList from "./DependencyList";


function ListSede() {
  // Datos específicos para el tab "In progress"
  const inProgress = {
    status: "Activa",
    orders: [
      {
        item: "Distrito fiscal Madre de Dios",
        company: "Sede Central",
        location: "Madre de Dios, Tambopata",
        contact: "Dr. Lena Stone",
      },
      {
        item: "Distrito fiscal Madre de Dios",
        company: "Sede Central",
        location: "Madre de Dios, Tambopata",
        contact: "Dr. Lena Stone",
      },
      {
        item: "Distrito fiscal Madre de Dios",
        company: "Sede Central",
        location: "Madre de Dios, Tambopata",
        contact: "Dr. Lena Stone",
      },
    ],
  };

  const statusColor =
    "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/20";

  return (
    <div className="space-y-4 pb-6 pt-2">
      {inProgress.orders.map((order, index) => (
        <Dialog key={`${order.item}-${index}`}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer">
              <div className="flex items-center justify-between space-x-4 sm:justify-start sm:space-x-2">
                <h4 className="truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {order.item}
                </h4>
                <span
                  className={`inline-flex items-center whitespace-nowrap rounded px-1.5 py-0.5 text-tremor-label font-medium ring-1 ring-inset ${statusColor}`}
                  aria-hidden="true"
                >
                  {inProgress.status}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-3">
                <div className="flex items-center space-x-1">
                  <IconBuildings
                    className="size-5 text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
                    aria-hidden="true"
                  />
                  <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    {order.company}
                  </p>
                </div>
                <div className="flex items-center space-x-1.5">
                  <IconMapPin
                    className="size-5 text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
                    aria-hidden="true"
                  />
                  <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    {order.location}
                  </p>
                </div>
                <div className="flex items-center space-x-1.5">
                  <IconUser
                    className="size-5 text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
                    aria-hidden="true"
                  />
                  <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    {order.contact}
                  </p>
                </div>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dependencias</DialogTitle>
              <DialogDescription>
                Informacion de la dependencias de la sede seleccionada
              </DialogDescription>
            </DialogHeader>
            <DependencyList/>
            <DialogFooter>
              <DialogClose asChild>
                <button className="px-4 py-2 border rounded hover:bg-gray-100">
                  Cancelar
                </button>
              </DialogClose>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Guardar
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}

export default ListSede;
