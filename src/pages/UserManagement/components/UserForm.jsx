import { useState } from "react";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "../../../components/dashboard/Select";
import { Divider } from "../../../components/ui/Divider";
import { RadioGroup } from "@headlessui/react";
import { RiCheckboxCircleFill, RiCheckLine } from "@remixicon/react";
import { DatePicker } from "../../../components/ui/DatePicker";
import { useAuth } from "../../../context/AuthContext";

const featureMapping = {
  panel_control: "Panel de control",
  ges_user: "Gestión usuario",
  ges_areas: "Gestión áreas",
  ges_fiscal: "Gestión usuarios fiscal",
  ges_reportes: "Reportes estadísticos",
  ges_archivos: "Gestión archivos",
};

const PackageDetails = ({ workspace }) => {
  // Generar features basados en los permisos activos
  const features = Object.keys(featureMapping)
    .filter((key) => workspace.permissions && workspace.permissions[key] === 1)
    .map((key) => featureMapping[key]);

  return (
    <div className="mt-6">
      <p className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Incluye:
      </p>
      {features.length > 0 ? (
        <ul role="list" className="mt-2 space-y-2">
          {features.map((feature, idx) => (
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
      ) : (
        <p className="mt-2 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Sin permisos asignados
        </p>
      )}
    </div>
  );
};

// Función para generar workspaces dinámicos a partir de rolesData
const dynamicWorkspaces = (rolesData) =>
  rolesData.map((role) => {
    const permissionKeys = Object.keys(featureMapping);
    const activeCount = permissionKeys.reduce(
      (acc, key) =>
        acc + (role.permisos_fk && role.permisos_fk[key] === 1 ? 1 : 0),
      0
    );
    return {
      id: role.id,
      title: role.roles,
      description: role.descripcion,
      permissions: role.permisos_fk,
      users: `${activeCount} permisos activos`,
    };
  });

export default function UserForm({ rolesData = [], areasData = [], onCancel, }) {
  // Generar workspaces dinámicos a partir de rolesData
  const workspaces = dynamicWorkspaces(rolesData);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica de validación o guardado
    console.log("Formulario enviado");
  };

  // Estado para seleccionar workspace (roles)
  const [selectedWorkspace, setSelectedWorkspace] = useState(
    workspaces[0] || {}
  );



  // Estados para manejar la selección de áreas (sede, dependencia y despacho)
  // Estados actualizados
  const [selectedSede, setSelectedSede] = useState("");
  const [selectedDependencia, setSelectedDependencia] = useState("");
  const [selectedDespacho, setSelectedDespacho] = useState("");

  const { userFormData, setUserFormData } = useAuth();

  // Actualizado en la sección de manejo de estados
  const handleSedeChange = (value) => {
    const sedeId = value ? Number(value) : null;
    setSelectedSede(sedeId);
    setSelectedDependencia(null);
    setSelectedDespacho(null);
    setUserFormData(prev => ({
      ...prev,
      sede_fk: sedeId,
      dependencia_fk: null,
      despacho_fk: null
    }));
  };

  const handleDependenciaChange = (value) => {
    const dependenciaId = value ? Number(value) : null;
    setSelectedDependencia(dependenciaId);
    setSelectedDespacho(null);
    setUserFormData(prev => ({
      ...prev,
      dependencia_fk: dependenciaId,
      despacho_fk: null
    }));
  };

  const handleDespachoChange = (value) => {
    const despachoId = value ? Number(value) : null;

    setSelectedDespacho(despachoId);
    setUserFormData(prev => ({ ...prev, despacho_fk: despachoId }));
  };

  const currentSede = areasData.find(sede => sede.id === selectedSede);
  const currentDependencia = currentSede?.dependencias?.find(
    dep => dep.id === selectedDependencia
  );

  return (
    <form className="pt-5" onSubmit={handleSubmit} noValidate>
      {/* Sección: Personal information */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <h2 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Informacion personal
          </h2>
          <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            Ingrese la información personal del usuario y otros datos de identificación.
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
            Configuración del Espacio de Trabajo
          </h2>
          <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            Selecciona las areas al que estarás asignado dentro de la organización.
          </p>
        </div>

        {/* Campos para Sede, Dependencia y Despacho */}
        <div className="sm:max-w-3xl md:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            {/* Sede */}
            <div className="col-span-full">
              <Label htmlFor="sede" className="text-tremor-default font-medium">
                Sede <span className="text-red-500">*</span>
              </Label>
              <Select
                value={selectedSede ? String(selectedSede) : ""}
                onValueChange={handleSedeChange}
              >
                <SelectTrigger id="sede" className="mt-2 w-full">
                  <SelectValue placeholder="Selecciona la sede" />
                </SelectTrigger>
                <SelectContent>
                  {areasData.map((sede) => (
                    <SelectItem key={sede.id} value={String(sede.id)}>
                      {sede.nombre} ({sede.cod_sede})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dependencia */}
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="dependencia" className="text-tremor-default font-medium">
                Dependencia <span className="text-red-500">*</span>
              </Label>
              <Select
                value={selectedDependencia ? String(selectedDependencia) : ""}
                onValueChange={handleDependenciaChange}
                disabled={!selectedSede}
              >
                <SelectTrigger id="dependencia" className="mt-2 w-full">
                  <SelectValue placeholder="Selecciona dependencia" />
                </SelectTrigger>
                <SelectContent>
                  {currentSede?.dependencias?.map((dep) => (
                    <SelectItem key={dep.id} value={String(dep.id)}>
                      {dep.nombre_fiscalia} ({dep.cod_depen})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Despacho */}
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="despacho" className="text-tremor-default font-medium">
                Despacho <span className="text-red-500">*</span>
              </Label>
              <Select
                value={String(selectedDespacho)}
                onValueChange={handleDespachoChange}
                disabled={!selectedDependencia}
              >
                <SelectTrigger id="despacho" className="mt-2 w-full">
                  <SelectValue placeholder="Selecciona despacho" />
                </SelectTrigger>
                <SelectContent>
                  {currentDependencia?.despachos?.map((despacho) => (
                    <SelectItem key={despacho.id} value={String(despacho.id)}>
                      {despacho.nombre_despacho} ({despacho.cod_despa})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <Divider className="my-5" />

      {/* Sección: Roles y Permisos */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <h2 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Roles y Permisos
          </h2>
          <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            Selecciona los permisos y nivel de acceso para tu cuenta dentro del sistema.
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
                    `relative flex cursor-pointer rounded-lg border p-4 transition ${active
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
                        className={`size-5 shrink-0 text-tremor-brand dark:text-dark-tremor-brand ${!checked ? "invisible" : ""
                          }`}
                        aria-hidden={true}
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
            <PackageDetails workspace={selectedWorkspace} />
          </RadioGroup>
        </div>
      </div>
      <Divider className="my-5" />
      <div className="flex justify-end gap-2">
        {/* Botón Cancelar: invoca onCancel para cerrar el diálogo */}
        <button
          type="button"
          className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
          onClick={onCancel}
        >
          Cancelar
        </button>

        {/* Botón Guardar: disparará handleSubmit */}
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}