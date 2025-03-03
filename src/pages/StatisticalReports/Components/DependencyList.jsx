// DependencyList.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiDatabase2Line,
  RiGroupLine,
  RiSearchLine,
  RiTimeLine,
  RiArrowUpDownLine,
  RiAddLine,
} from "@remixicon/react";
import { List, ListItem, Switch } from "@tremor/react";
import { Divider } from "../../../components/ui/Divider";
import Card from "../../../components/ui/Card";
import { Label } from "../../../components/ui/Label";
import { Input } from "../../../components/ui/Input";
import { DateRangePicker } from "../../../components/ui/DatePicker";
import { IconBuildings } from "@tabler/icons-react";
import { IconClockHour3 } from "@tabler/icons-react";
import { IconUsers } from "@tabler/icons-react";
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

const data = [
  {
    region: "US-East",
    workspaces: [
      {
        name: "SC-FPPCT",
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
        name: "testing_environment_2",
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
        name: "training_environment",
        status: "active",
        type: "Test workspace",
        database: "live_data",
        href: "#",
        capacity: [
          { label: "users", value: 3 },
          { label: "storage", value: "5" },
          { label: "lastEdited", value: "4h ago" },
        ],
      },
      {
        name: "analytics_dashboard",
        status: "inactive",
        type: "API",
        database: "test_data",
        href: "#",
        capacity: [
          { label: "users", value: 3 },
          { label: "storage", value: "10" },
          { label: "lastEdited", value: "1d ago" },
        ],
      },
      {
        name: "managed_database_test",
        status: "active",
        type: "Test workspace",
        database: "live_data",
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

  // Estados para los Dropdown Menus
  const [sorting, setSorting] = useState("alphabetical");
  const [date, setDate] = useState("last-30-days");

  const radioItems = [
    { value: "alphabetical", label: "Carga laboral", hint: "A-Z" },
    {
      value: "reverse-alphabetical",
      label: "Incidencia delitos",
      hint: "Z-A",
    },
    { value: "created-at", label: "Created at", hint: "Jan-Dec" },
  ];

  const radioItems2 = [
    { value: "last-day", label: "Last day" },
    { value: "last-15-days", label: "Last 15 days" },
    { value: "last-30-days", label: "Last 30 days" },
    { value: "last-quarter", label: "Last quarter" },
  ];

  const selectedLabel = radioItems.find((item) => item.value === sorting)?.label;
  const selectedLabel2 = radioItems2.find((item) => item.value === date)?.label;

  const navigate = useNavigate();

  // Función que se llama al hacer clic en una Card
  const handleCardClick = () => {
    if (sorting === "alphabetical") {
      navigate("/dashboard/estadisticas/WorkLoad");
    } else if (sorting === "reverse-alphabetical") {
      navigate("/dashboard/estadisticas/CrimesHighestIncidence");
    }
    // Si el sorting es "created-at", se puede definir otra acción o dejarla sin navegación
  };

  return (
    <>
      {/* Barra de herramientas superior */}
      <div className="block md:flex md:items-center md:justify-between pt-4">
        <Input
          placeholder="Search workspace..."
          icon={<RiSearchLine />}
          className="h-9 w-full rounded-tremor-small md:max-w-xs"
        />
        <div className="lg:flex lg:items-center lg:space-x-3">
          {/* Primer Dropdown Menu: Sorting */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                className="flex items-center gap-x-2 rounded-tremor-small border border-tremor-border bg-tremor-background py-1 pl-3 pr-1.5 !text-tremor-default font-medium text-tremor-content-strong shadow-tremor-input transition hover:bg-tremor-background-muted hover:text-tremor-content-strong focus:z-10 focus:outline-none dark:border-dark-tremor-border dark:bg-gray-950 dark:text-dark-tremor-content-strong dark:shadow-dark-tremor-input hover:dark:bg-gray-950/50"
              >
                <RiArrowUpDownLine
                  className="-ml-px size-5 shrink-0 text-tremor-content dark:text-dark-tremor-content"
                  aria-hidden={true}
                />
                Sorted by{" "}
                <span className="rounded bg-tremor-brand-faint px-2 py-1 text-tremor-label font-semibold text-tremor-brand dark:bg-tremor-brand-subtle/10 dark:text-dark-tremor-brand">
                  {selectedLabel}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="!min-w-[calc(var(--radix-dropdown-menu-trigger-width))]"
              align="start"
            >
              <DropdownMenuRadioGroup value={sorting} onValueChange={setSorting}>
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
        {regionData.workspaces.map((workspace, index) => (
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
                  <div
                    key={item.label}
                    className="flex items-center space-x-1.5"
                  >
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
