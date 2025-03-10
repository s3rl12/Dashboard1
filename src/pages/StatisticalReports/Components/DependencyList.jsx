// DependencyList.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItem } from "@tremor/react";
import { Divider } from "../../../components/ui/Divider";
import Card from "../../../components/ui/Card";
import { Label } from "../../../components/ui/Label";
import { Input } from "../../../components/ui/Input";
import { DateRangePicker } from "../../../components/ui/DatePicker";
import { IconBuildings } from "@tabler/icons-react";
import { IconClockHour3 } from "@tabler/icons-react";
import { IconUsers } from "@tabler/icons-react";
import { IconArrowsUpDown } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../../components/dashboard/DropdownMenu";
import { Button } from "@/components/dashboard/Button";
import { useToast } from "../../../lib/useToast";

// Diccionario de íconos para capacity
const capacityIcon = {
  users: IconBuildings,       // Ícono para la cantidad de despachos
  storage: IconUsers,         // Ícono con valor estático 1
  lastEdited: IconClockHour3, // Ícono para la fecha de actualización
};

// Función para formatear el tiempo relativo desde updated_at
function getRelativeTime(dateStr) {
  if (!dateStr) return "";
  const updated = new Date(dateStr);
  const now = new Date();
  const diff = now - updated; // Diferencia en milisegundos

  const diffInMinutes = Math.floor(diff / (1000 * 60));
  if (diffInMinutes < 60) {
    return `Hace ${diffInMinutes}m`;
  }
  const diffInHours = Math.floor(diff / (1000 * 60 * 60));
  if (diffInHours < 24) {
    return `Hace ${diffInHours}h`;
  }
  const days = Math.floor(diffInHours / 24);
  return `Hace ${days}d`;
}

/**
 * Transforma cada dependencia a la estructura usada en el UI original (workspaces).
 * @param {Object} dependency - Objeto con {cod_depen, fiscalia, activo, despachos, updated_at}
 * @returns {Object} workspace - Objeto adaptado para la UI original
 */
function transformDependencyToWorkspace(dependency) {
  return {
    // Se usa cod_depen como "name" para mostrar en la tarjeta
    name: dependency.cod_depen,
    // Estado: "active" o "inactive"
    status: dependency.activo === 1 ? "active" : "inactive",
    // type: fiscalia
    type: dependency.fiscalia,
    // "database": se asigna el texto estático "Fiscal titular"
    database: "Fiscal titular",
    // Se construye la capacidad con 3 items:
    // "users": # de despachos, "storage": valor fijo 1, "lastEdited": tiempo relativo
    capacity: [
      {
        label: "users",
        value: dependency.despachos ? dependency.despachos.length : 0,
      },
      {
        label: "storage",
        value: 1, // Valor estático para mostrar IconUsers con "1"
      },
      {
        label: "lastEdited",
        value: getRelativeTime(dependency.updated_at),
      },
    ],
  };
}

/**
 * 
 * @param {Object} props
 * @param {Array} props.dependencias - Lista de dependencias proveniente de la sede seleccionada
 * @param {boolean} props.isLoading - Indica si se están cargando las dependencias
 * @param {Error|null} props.error - Error en la carga (si existe)
 * @param {string} props.activeTab - Nombre del tab actual (por ej. "Reports")
 */
export default function DependencyList({
  dependencias = [],
  isLoading = false,
  error = null,
  activeTab = "Reports",
}) {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Referencia para el toast actual y un flag para saber si ya se cargó la data
  const toastRef = useRef(null);
  const hasDataLoaded = useRef(false);

  // Efecto para manejar la lógica de toasts al estilo "Users.jsx"
  useEffect(() => {
    if (activeTab === "Reports") {
      // Si estamos en la pestaña "Reports"
      if (isLoading && !hasDataLoaded.current) {
        // Crear un toast de "loading" solo si no se ha cargado antes
        if (!toastRef.current) {
          toastRef.current = toast({
            variant: "loading",
            title: "Cargando dependencias...",
            disableDismiss: true,
          });
        }
      } else if (!isLoading && toastRef.current) {
        // Si finalizó la carga y hay un toastRef => actualizarlo a success o error
        const newToast = toastRef.current.update({
          variant: error ? "error" : "success",
          title: error ? "Error" : "Éxito",
          description: error
            ? "Error al cargar dependencias."
            : "Dependencias cargadas correctamente.",
          disableDismiss: false,
        });
        toastRef.current = newToast;
        hasDataLoaded.current = true;
      }
    }
  }, [isLoading, error, activeTab, toast]);

  // Cleanup para descartar el toast al cambiar de pestaña o desmontar
  useEffect(() => {
    return () => {
      if (toastRef.current) {
        toastRef.current.dismiss();
        toastRef.current = null;
      }
    };
  }, [activeTab]);

  // Creamos un "regionData" ficticio con un arreglo "workspaces" mapeado desde dependencias
  const regionData = {
    region: "Dependencies",
    workspaces: dependencias.map(transformDependencyToWorkspace),
  };

  // Estados para los Dropdown Menus y para el Input de búsqueda
  const [sorting, setSorting] = useState("");
  const [date, setDate] = useState("last-30-days");
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para resaltar el label "Reportes"
  const [highlightReportes, setHighlightReportes] = useState(false);

  // Items del menú de reporte
  const radioItems = [
    { value: "alphabetical", label: "Carga laboral", hint: "A-Z" },
    { value: "reverse-alphabetical", label: "Incidencia delitos", hint: "Z-A" },
    { value: "control-plazos", label: "Control plazos", hint: "Z-A" },
  ];

  const selectedLabel = sorting
    ? radioItems.find((item) => item.value === sorting)?.label
    : "Reportes";

  // Maneja el clic en un card
  const handleCardClick = () => {
    if (!sorting) {
      setHighlightReportes(true);
      toast?.({
        variant: "warning",
        title: "No se seleccionó reporte",
        description: "Por favor, seleccione un tipo de reporte antes de continuar.",
      });
      return;
    }

    if (sorting === "alphabetical") {
      navigate("/dashboard/estadisticas/WorkLoad");
    } else if (sorting === "reverse-alphabetical") {
      navigate("/dashboard/estadisticas/CrimesHighestIncidence");
    } else if (sorting === "control-plazos"){
      navigate("/dashboard/estadisticas/DeadlineControl");
    }

  };

  // Filtrado de workspaces basado en el término ingresado en el Input (buscando en "type")
  const filteredWorkspaces = regionData.workspaces.filter((workspace) =>
    workspace.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Barra de herramientas superior */}
      <div className="block md:flex md:items-center md:justify-between pt-4">
        <Input
          placeholder="Search workspace..."
          className="h-9 w-full rounded-tremor-small md:max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="lg:flex lg:items-center lg:space-x-3">
          {/* Dropdown Menu: Tipo de reporte */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                className="flex items-center gap-x-2 rounded-tremor-small border border-tremor-border bg-tremor-background py-1 pl-3 pr-1.5 !text-tremor-default font-medium text-tremor-content-strong shadow-tremor-input transition hover:bg-tremor-background-muted hover:text-tremor-content-strong focus:z-10 focus:outline-none dark:border-dark-tremor-border dark:bg-gray-950 dark:text-dark-tremor-content-strong dark:shadow-dark-tremor-input hover:dark:bg-gray-950/50"
              >
                <IconArrowsUpDown
                  className="-ml-px size-5 shrink-0 text-tremor-content dark:text-dark-tremor-content"
                  aria-hidden={true}
                />
                Tipo de reporte:{" "}
                <span
                  className={`rounded bg-tremor-brand-faint px-2 py-1 text-tremor-label font-semibold 
                  dark:bg-tremor-brand-subtle/10 dark:text-dark-tremor-brand 
                  ${highlightReportes ? "text-blue-600" : "text-tremor-brand"}`}
                >
                  {selectedLabel}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="!min-w-[calc(var(--radix-dropdown-menu-trigger-width))]"
              align="start"
            >
              <DropdownMenuRadioGroup
                value={sorting}
                onValueChange={(val) => {
                  setSorting(val);
                  setHighlightReportes(false);
                }}
              >
                {radioItems.map((item) => (
                  <DropdownMenuRadioItem
                    key={item.value}
                    value={item.value}
                    hint={item.hint}
                  >
                    {item.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Segundo Control: Date filter */}
          <DateRangePicker
            defaultValue={{
              from: new Date(new Date().setDate(new Date().getDate() - 10)),
              to: new Date(),
            }}
            id="date_1"
            name="date_1"
            className=" border-tremor-border dark:border-dark-tremor-border"
          />
        </div>
      </div>

      <Divider />

      {/* Grid de workspaces */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {filteredWorkspaces.map((workspace, index) => (
          <Card
            key={`${workspace.name}-${index}`}
            className="rounded-tremor-small p-4 cursor-pointer"
            onClick={handleCardClick}
          >
            {/* Nombre y estado */}
            <div className="flex items-center space-x-2">
              <h4 className="truncate text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                <a href={workspace.href} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {workspace.name}
                </a>
              </h4>
              {workspace.status === "active" && (
                <span className="inline-flex items-center rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-400/10 dark:text-blue-400">
                  active
                </span>
              )}
              {workspace.status === "inactive" && (
                <span className="inline-flex items-center rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-400/10 dark:text-red-400">
                  inactive
                </span>
              )}
            </div>

            {/* Descripción: fiscalía (type) y "Fiscal titular" (database) */}
            <List className="mt-3 divide-none">
              <ListItem className="justify-start space-x-2 py-1">
                <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {workspace.type}
                </span>
              </ListItem>
              <ListItem className="justify-start space-x-2 py-1">
                <span className="font-medium text-base text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Fiscal titular:
                </span>
                <span className="text-sm">{workspace.database}</span>
              </ListItem>
            </List>

            {/* Capacidad: # despachos (users), valor estático 1 (storage) y tiempo de actualización (lastEdited) */}
            <div className="mt-5 flex flex-wrap gap-4">
              {workspace.capacity.map((item) => {
                const Icon = capacityIcon[item.label];
                return (
                  <div key={item.label} className="flex items-center space-x-1.5">
                    {Icon && (
                      <Icon
                        className="size-4 text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
                        aria-hidden="true"
                      />
                    )}
                    <span className="text-xs font-medium text-tremor-content dark:text-dark-tremor-content">
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
