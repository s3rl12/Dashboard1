import { useState } from "react";
import { Textarea } from "@tremor/react";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "../../../components/dashboard/Select";
import { Divider } from "../../../components/ui/Divider";
import { RadioGroup } from "@headlessui/react";
import { RiCheckboxCircleFill, RiCheckLine } from "@remixicon/react";
import { DatePicker } from "../../../components/ui/DatePicker";

/* RadioGroup data y componente de ejemplo */
const workspaces = [
  {
    id: 1,
    title: "Notificaciones Diarias",
    description: "Recibe actualizaciones diarias de todas las actividades",
    users: "Básico",
  },
  {
    id: 2,
    title: "Notificaciones en Tiempo Real",
    description: "Alertas inmediatas para acciones críticas",
    users: "Premium",
  },
  {
    id: 3,
    title: "Sin Notificaciones",
    description: "Solo notificaciones esenciales del sistema",
    users: "Minimalista",
  },
];

const PackageDetails = ({ workspaceId }) => {
  const features = {
    1: ["Resumen matutino", "Reporte de actividad diaria", "Alertas de seguridad"],
    2: ["Alertas de acceso", "Notificaciones de transacciones", "Monitoreo en vivo"],
    3: ["Actualizaciones del sistema", "Mantenimiento programado"],
  };

  return (
    <div className="mt-6">
      <p className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Incluye:
      </p>
      <ul role="list" className="mt-2 space-y-2">
        {features[workspaceId].map((feature, idx) => (
          <li key={idx} className="flex items-center space-x-2">
            <RiCheckLine
              className="size-5 text-tremor-content dark:text-dark-tremor-content"
              aria-hidden={true}
            />
            <span className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function UserForm() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);

  return (
    <form className="pt-5">
      {/* Sección: Personal information */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <h2 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Personal information
          </h2>
          <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
          </p>
        </div>

        <div className="sm:max-w-3xl md:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            {/* Row 1: Nombre*, Apellido* */}
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="nombre" className="text-tremor-default font-medium">
                Nombre <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Ingresa tu nombre"
                className="mt-2"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="apellido" className="text-tremor-default font-medium">
                Apellido <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="apellido"
                name="apellido"
                placeholder="Ingresa tu apellido"
                className="mt-2"
              />
            </div>

            {/* Row 2: Correo* */}
            <div className="col-span-full">
              <Label htmlFor="correo" className="text-tremor-default font-medium">
                Correo <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                id="correo"
                name="correo"
                placeholder="tucorreo@ejemplo.com"
                className="mt-2"
              />
            </div>

            {/* Row 3: DNI*, Fecha nac.*, Teléfono* */}
            <div className="col-span-full sm:col-span-2">
              <Label htmlFor="dni" className="text-tremor-default font-medium">
                DNI <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="dni"
                name="dni"
                placeholder="Ingresa tu DNI"
                className="mt-2"
              />
            </div>
            <div className="col-span-full sm:col-span-2">
              <Label className="text-tremor-default font-medium">
                Fecha de nacimiento <span className="text-red-500">*</span>
              </Label>
              <DatePicker placeholder="Selecciona la fecha" className="mt-2" />
            </div>
            <div className="col-span-full sm:col-span-2">
              <Label htmlFor="telefono" className="text-tremor-default font-medium">
                Teléfono <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="telefono"
                name="telefono"
                placeholder="999-999-999"
                className="mt-2"
              />
            </div>

            {/* Row 4: Dirección */}
            <div className="col-span-full">
              <Label htmlFor="direccion" className="text-tremor-default font-medium">
                Dirección
              </Label>
              <Input
                type="text"
                id="direccion"
                name="direccion"
                placeholder="Ej. Calle 123, Ciudad"
                className="mt-2"
              />
            </div>

            {/* Row 5: Género*, Extensión*, Tipo Fiscal* */}
            <div className="col-span-full sm:col-span-2">
              <Label htmlFor="genero" className="text-tremor-default font-medium">
                Género <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger id="genero" className="mt-2 w-full">
                  Selecciona
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="varon">Varón</SelectItem>
                  <SelectItem value="mujer">Mujer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-full sm:col-span-2">
              <Label htmlFor="extension" className="text-tremor-default font-medium">
                Extensión <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="extension"
                name="extension"
                placeholder="Ej. 105"
                className="mt-2"
              />
            </div>
            <div className="col-span-full sm:col-span-2">
              <Label htmlFor="tipo-fiscal" className="text-tremor-default font-medium">
                Tipo Fiscal <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="tipo-fiscal"
                name="tipo-fiscal"
                placeholder="Ej. Tipo A"
                className="mt-2"
              />
            </div>

            {/* Row 6: Password*, Confirmar Password* */}
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="password" className="text-tremor-default font-medium">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                className="mt-2"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="confirm-password" className="text-tremor-default font-medium">
                Confirmar Password <span className="text-red-500">*</span>
              </Label>
              <Input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="********"
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </div>

      <Divider className="my-5" />

      {/* Sección: Workspace settings */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <h2 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Workspace settings
          </h2>
          <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
          </p>
        </div>

        {/* Nueva disposición de campos: Sede*, dependencia*, despacho* */}
        <div className="sm:max-w-3xl md:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            {/* Row 1: Sede* */}
            <div className="col-span-full">
              <Label htmlFor="sede" className="text-tremor-default font-medium">
                Sede <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger id="sede" className="mt-2 w-full">
                  Selecciona la sede
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sede1">Sede 1</SelectItem>
                  <SelectItem value="sede2">Sede 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Row 2: dependencia*, despacho* */}
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="dependencia" className="text-tremor-default font-medium">
                Dependencia <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger id="dependencia" className="mt-2 w-full">
                  Selecciona la dependencia
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dep1">Dependencia 1</SelectItem>
                  <SelectItem value="dep2">Dependencia 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="despacho" className="text-tremor-default font-medium">
                Despacho <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger id="despacho" className="mt-2 w-full">
                  Selecciona el despacho
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desp1">Despacho 1</SelectItem>
                  <SelectItem value="desp2">Despacho 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <Divider className="my-5" />

      {/* Sección: Notification settings (RadioGroup) */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <h2 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Notification settings
          </h2>
          <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            Selecciona tu preferencia de notificaciones
          </p>
        </div>

        <div className="sm:max-w-3xl md:col-span-2">
          <RadioGroup
            value={selectedWorkspace}
            onChange={setSelectedWorkspace}
            name="notificationSettings"
          >
            <RadioGroup.Label className="text-tremor-default font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Configuración de notificaciones
            </RadioGroup.Label>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {workspaces.map((item) => (
                <RadioGroup.Option
                  key={item.id}
                  value={item}
                  className={({ active }) =>
                    `relative flex cursor-pointer rounded-lg border p-4 transition ${
                      active
                        ? "border-tremor-brand ring-2 ring-tremor-brand-muted dark:border-dark-tremor-brand-subtle"
                        : "border-tremor-border dark:border-dark-tremor-border"
                    } bg-tremor-background dark:bg-dark-tremor-background`
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full flex-col justify-between">
                        <div>
                          <RadioGroup.Label className="block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            {item.title}
                          </RadioGroup.Label>
                          <p className="mt-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                            {item.description}
                          </p>
                        </div>
                        <span className="mt-4 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                          {item.users}
                        </span>
                      </div>
                      <RiCheckboxCircleFill
                        className={`size-5 shrink-0 text-tremor-brand dark:text-dark-tremor-brand ${
                          !checked ? "invisible" : ""
                        }`}
                        aria-hidden={true}
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
            <PackageDetails workspaceId={selectedWorkspace.id} />
          </RadioGroup>
        </div>
      </div>
    </form>
  );
}
