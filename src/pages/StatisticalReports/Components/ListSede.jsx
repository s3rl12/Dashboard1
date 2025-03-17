// ListSede.jsx
import React, { useEffect, useRef } from "react";
import { IconBuildings, IconMapPin, IconUser } from "@tabler/icons-react";
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
import { useListDF } from "../../../hooks/useListDF";
// Importamos useToast
import { useToast } from "../../../lib/useToast";

/**
 * Asumimos que hay un tab "Areas fiscal" o similar,
 * y que ListSede se monta solo si esa pestaña está activa.
 * Si tu lógica de pestañas es distinta, ajusta el "activeTab" o la limpieza.
 */
export default function ListSede({ activeTab = "Areas fiscal" }) {
  const { data: fetchedAreas, isLoading, error } = useListDF();
  const { toast } = useToast();

  // Referencia al toast actual y bandera para saber si ya se completó la carga
  const toastRef = useRef(null);
  const hasDataLoaded = useRef(false);

  useEffect(() => {
    // Si estamos en la pestaña "Areas fiscal" (o el nombre que uses)...
    if (activeTab === "Areas fiscal") {
      // 1. Crear toast loading si estamos cargando y aún no se ha cargado antes
      if (isLoading && !hasDataLoaded.current && !toastRef.current) {
        toastRef.current = toast({
          variant: "loading",
          title: "Cargando datos...",
          disableDismiss: true,
        });
      }
      // 2. Si ya no está cargando y existe un toastRef => actualizar a success/error
      else if (!isLoading && toastRef.current && !hasDataLoaded.current) {
        const newToast = toastRef.current.update({
          variant: error ? "error" : "success",
          title: error ? "Error" : "Éxito",
          description: error
            ? "Error al cargar datos."
            : "Datos cargados correctamente.",
          disableDismiss: false,
        });
        toastRef.current = newToast;
        hasDataLoaded.current = true; // Marcamos que ya se cargó
      }
    }
  }, [activeTab, isLoading, error, toast]);

  // Cleanup al desmontar o cambiar de pestaña
  useEffect(() => {
    return () => {
      if (toastRef.current) {
        toastRef.current.dismiss();
        toastRef.current = null;
      }
      // Reiniciamos la bandera para que al volver no se repita el success
      hasDataLoaded.current = false;
    };
  }, [activeTab]);

  // Funciones para determinar el estado y estilos según "activo"
  const getStatusLabel = (activo) => (activo === 1 ? "Activa" : "Inactiva");
  const statusColor = (activo) =>
    activo === 1
      ? "bg-blue-50 text-blue-700 ring-blue-600/20"
      : "bg-red-50 text-red-700 ring-red-600/20";

  return (
    <div className="space-y-4 pb-4">
      {fetchedAreas?.map((sede) => (
        <Dialog key={sede.id}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer">
              {/* Fila superior: Texto estático y badge de estado */}
              <div className="flex items-center justify-between space-x-4 sm:justify-start sm:space-x-2">
                <h4 className="truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Distrito fiscal Madre de Dios
                </h4>
                <span
                  className={`inline-flex items-center whitespace-nowrap rounded px-1.5 py-0.5 text-tremor-label font-medium ring-1 ring-inset ${statusColor(
                    sede.activo
                  )}`}
                  aria-hidden="true"
                >
                  {getStatusLabel(sede.activo)}
                </span>
              </div>

              {/* Fila inferior: Íconos y datos dinámicos/estáticos */}
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-3">
                {/* Nombre de la sede */}
                <div className="flex items-center space-x-1">
                  <IconBuildings
                    className="size-5 text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
                    aria-hidden="true"
                  />
                  <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    {sede.nombre}
                  </p>
                </div>
                {/* Ubicación: Madre de Dios + provincia */}
                <div className="flex items-center space-x-1.5">
                  <IconMapPin
                    className="size-5 text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
                    aria-hidden="true"
                  />
                  <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    Madre de Dios, {sede.provincia}
                  </p>
                </div>
                {/* Contacto estático */}
                <div className="flex items-center space-x-1.5">
                  <IconUser
                    className="size-5 text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
                    aria-hidden="true"
                  />
                  <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    Dr. ***
                  </p>
                </div>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dependencias de {sede.nombre}</DialogTitle>
              <DialogDescription>
                Información de las dependencias asociadas a esta sede.
              </DialogDescription>
            </DialogHeader>
            {/* Se pasa el arreglo de dependencias junto con el id de la sede */}
            <DependencyList dependencias={sede.dependencias} id_sede={sede.id} />
            <DialogFooter>
              <DialogClose asChild>
                <button className="px-4 py-2 border rounded hover:bg-gray-100">
                  Cancelar
                </button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
