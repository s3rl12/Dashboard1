// DependencyList.jsx
import React, { useState } from "react";
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
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/dashboard/DropdownMenu";
import { Button } from "@/components/dashboard/Button";
import { useToast } from '../../../lib/useToast';
const data = [
  {
    region: "US-East",
    workspaces: [
      {
        name: "SC-FPPCT-1",
        status: "active",
        type: "1° FISCALIA PROVINCIAL PENAL COORPORATIVA DE TAMBOPATA",
        database: "RAMOS CHOQUE HAROLT OMAR",
        href: "#",
        capacity: [
          { label: "users", value: 3 },
          { label: "storage", value: "15" },
          { label: "lastEdited", value: "1d ago" },
        ],
      },
      {
        name: "SC-FPPCT-2",
        status: "inactive",
        type: "2° FISCALIA PROVINCIAL PENAL COORPORATIVA DE TAMBOPATA",
        database: "RAMOS CHOQUE HAROLT OMAR",
        href: "#",
        capacity: [
          { label: "users", value: 2 },
          { label: "storage", value: "10" },
          { label: "lastEdited", value: "2d ago" },
        ],
      },
      {
        name: "SC-FPPCT-3",
        status: "active",
        type: "3° FISCALIA PROVINCIAL PENAL COORPORATIVA DE TAMBOPATA",
        database: "RAMOS CHOQUE HAROLT OMAR",
        href: "#",
        capacity: [
          { label: "users", value: 3 },
          { label: "storage", value: "5" },
          { label: "lastEdited", value: "4h ago" },
        ],
      },
      {
        name: "SC-FPPCT-4",
        status: "inactive",
        type: "4° FISCALIA PROVINCIAL PENAL COORPORATIVA DE TAMBOPATA",
        database: "RAMOS CHOQUE HAROLT OMAR",
        href: "#",
        capacity: [
          { label: "users", value: 3 },
          { label: "storage", value: "10" },
          { label: "lastEdited", value: "1d ago" },
        ],
      },
      {
        name: "SC-FPPCT-5",
        status: "active",
        type: "5° FISCALIA PROVINCIAL PENAL COORPORATIVA DE TAMBOPATA",
        database: "RAMOS CHOQUE HAROLT OMAR",
        href: "#",
        capacity: [
          { label: "users", value: 3 },
          { label: "storage", value: "3" },
          { label: "lastEdited", value: "7d ago" },
        ],
      },
    ],
  },
];

const capacityIcon = {
  users: IconBuildings,
  storage: IconUsers,
  lastEdited: IconClockHour3,
};

export default function DependencyList() {
  // Selecciona únicamente la región 'US-East'
  const regionData = data.find((item) => item.region === "US-East");

  // Estados para los Dropdown Menus y para el Input de búsqueda
  const [sorting, setSorting] = useState("");
  const [date, setDate] = useState("last-30-days");
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para resaltar el label "Reportes"
  const [highlightReportes, setHighlightReportes] = useState(false);

  const radioItems = [
    { value: "alphabetical", label: "Carga laboral", hint: "A-Z" },
    {
      value: "reverse-alphabetical",
      label: "Incidencia delitos",
      hint: "Z-A",
    },
  ];

  const selectedLabel = sorting ? radioItems.find((item) => item.value === sorting)?.label : "Reportes";
  const navigate = useNavigate();

  // Hook de toasts
  const { toast } = useToast();

  // Maneja el clic en un card
  const handleCardClick = () => {
    if (!sorting) {
      // Resaltar label y mostrar toast
      setHighlightReportes(true);
      // Si no se seleccionó ningún reporte, muestra un toast de advertencia
      toast?.({
        variant: "warning",
        title: "No se seleccionó reporte",
        description: "Por favor, seleccione un tipo de reporte antes de continuar.",
      });
      return; // Detenemos la ejecución, no navegamos
    }

    // Si sí hay un reporte seleccionado, navega normalmente
    if (sorting === "alphabetical") {
      navigate("/dashboard/estadisticas/WorkLoad");
    } else if (sorting === "reverse-alphabetical") {
      navigate("/dashboard/estadisticas/CrimesHighestIncidence");
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
                <span className={`rounded bg-tremor-brand-faint px-2 py-1 text-tremor-label font-semibold 
                  dark:bg-tremor-brand-subtle/10 dark:text-dark-tremor-brand 
                  ${highlightReportes ? "text-blue-600" : "text-tremor-brand"}`}>
                  {selectedLabel}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="!min-w-[calc(var(--radix-dropdown-menu-trigger-width))]"
              align="start"
            >
              <DropdownMenuRadioGroup value={sorting} onValueChange={(val) => {
                setSorting(val);
                setHighlightReportes(false);
              }}>
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
            <div className="flex items-center space-x-2">
              <h4 className="truncate text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                <a href={workspace.href} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {workspace.name}
                </a>
              </h4>
              {workspace.status === "active" && (
                <span className="inline-flex items-center rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-400">
                  active
                </span>
              )}
            </div>
            <List className="mt-3 divide-none">
              <ListItem className="justify-start space-x-2 py-1">
                <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {workspace.type}
                </span>
              </ListItem>
              <ListItem className="justify-start space-x-2 py-1">
                <span className="font-medium text-sm text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Fiscal titular:
                </span>
                <span className="text-xs">{workspace.database}</span>
              </ListItem>
            </List>
            <div className="mt-5 flex flex-wrap gap-4">
              {workspace.capacity.map((item) => {
                const Icon = capacityIcon[item.label];
                return (
                  <div key={item.label} className="flex items-center space-x-1.5">
                    <Icon
                      className="size-4 text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
                      aria-hidden="true"
                    />
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
