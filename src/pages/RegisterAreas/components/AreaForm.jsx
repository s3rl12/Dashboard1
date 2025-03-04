import React, { useState } from "react";
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
import { Button } from "../../../components/ui/Button";

export default function AreaForm({ areaType, onSubmit, onCancel }) {
  // Estado local para almacenar los datos del formulario
  const [formData, setFormData] = useState({});

  // Función genérica para actualizar el estado de los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Función para manejar los cambios en los componentes Select
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    // Aquí puedes agregar la lógica de validación y envío
  };

  // Formulario para "Administracion sede"
  const renderSedeForm = () => (
    <div className="space-y-4">
      {/* Primera fila: Nombre sede */}
      <div>
        <Label htmlFor="nombre-sede" className="text-tremor-default font-medium">
          Nombre sede <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          id="nombre-sede"
          name="nombreSede"
          placeholder="Ingresa el nombre de la sede"
          onChange={handleChange}
          className="mt-2"
        />
      </div>
      {/* Segunda fila: Telefono y RUC */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="telefono" className="text-tremor-default font-medium">
            Telefono <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="telefono"
            name="telefono"
            placeholder="Ingresa el telefono"
            onChange={handleChange}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="ruc" className="text-tremor-default font-medium">
            RUC <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="ruc"
            name="ruc"
            placeholder="Ingresa el RUC"
            onChange={handleChange}
            className="mt-2"
          />
        </div>
      </div>
      {/* Tercera fila: Provincia, Distrito fiscal y Region */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="provincia" className="text-tremor-default font-medium">
            Provincia <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="provincia"
            name="provincia"
            placeholder="Ingresa la provincia"
            onChange={handleChange}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="distrito-fiscal" className="text-tremor-default font-medium">
            Distrito fiscal <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="distrito-fiscal"
            name="distritoFiscal"
            placeholder="Ingresa el distrito fiscal"
            onChange={handleChange}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="region" className="text-tremor-default font-medium">
            Region <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.region || ""}
            onValueChange={(value) => handleSelectChange("region", value)}
          >
            <SelectTrigger id="region" className="mt-2 w-full">
              <SelectValue placeholder="Selecciona la region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">M</SelectItem>
              <SelectItem value="C">C</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Cuarta fila: Codigo postal */}
      <div>
        <Label htmlFor="codigo-postal" className="text-tremor-default font-medium">
          Codigo postal <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          id="codigo-postal"
          name="codigoPostal"
          placeholder="Ingresa el codigo postal"
          onChange={handleChange}
          className="mt-2"
        />
      </div>
    </div>
  );

  // Formulario para "Administracion dependencia"
  const renderDependenciaForm = () => (
    <div className="space-y-4">
      {/* Primera fila: Fiscalia */}
      <div>
        <Label htmlFor="fiscalia" className="text-tremor-default font-medium">
          Fiscalia <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          id="fiscalia"
          name="fiscalia"
          placeholder="Ingresa la fiscalia"
          onChange={handleChange}
          className="mt-2"
        />
      </div>
      {/* Segunda fila: Tipo de fiscalia y Nombre fiscalia */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="tipo-fiscalia" className="text-tremor-default font-medium">
            Tipo de fiscalia <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="tipo-fiscalia"
            name="tipoFiscalia"
            placeholder="Ingresa el tipo de fiscalia"
            onChange={handleChange}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="nombre-fiscalia" className="text-tremor-default font-medium">
            Nombre fiscalia <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="nombre-fiscalia"
            name="nombreFiscalia"
            placeholder="Ingresa el nombre fiscalia"
            onChange={handleChange}
            className="mt-2"
          />
        </div>
      </div>
      {/* Tercera fila: RUC y Telefono */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ruc" className="text-tremor-default font-medium">
            RUC <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="ruc"
            name="ruc"
            placeholder="Ingresa el RUC"
            onChange={handleChange}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="telefono" className="text-tremor-default font-medium">
            Telefono <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="telefono"
            name="telefono"
            placeholder="Ingresa el telefono"
            onChange={handleChange}
            className="mt-2"
          />
        </div>
      </div>
      {/* Cuarta fila: Sede (Select con opciones "CD" y "CF") */}
      <div>
        <Label htmlFor="sede" className="text-tremor-default font-medium">
          Sede <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.sede || ""}
          onValueChange={(value) => handleSelectChange("sede", value)}
        >
          <SelectTrigger id="sede" className="mt-2 w-full">
            <SelectValue placeholder="Selecciona la sede" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CD">CD</SelectItem>
            <SelectItem value="CF">CF</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  // Formulario para "Administracion despacho"
  const renderDespachoForm = () => (
    <div className="space-y-4">
      {/* Primera fila: Nombre despacho */}
      <div>
        <Label htmlFor="nombre-despacho" className="text-tremor-default font-medium">
          Nombre despacho <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          id="nombre-despacho"
          name="nombreDespacho"
          placeholder="Ingresa el nombre del despacho"
          onChange={handleChange}
          className="mt-2"
        />
      </div>
      {/* Segunda fila: Codigo despacho, Telefono y RUC */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="codigo-despacho" className="text-tremor-default font-medium">
            Codigo despacho <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="codigo-despacho"
            name="codigoDespacho"
            placeholder="Ingresa el codigo despacho"
            onChange={handleChange}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="telefono" className="text-tremor-default font-medium">
            Telefono <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="telefono"
            name="telefono"
            placeholder="Ingresa el telefono"
            onChange={handleChange}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="ruc" className="text-tremor-default font-medium">
            RUC <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="ruc"
            name="ruc"
            placeholder="Ingresa el RUC"
            onChange={handleChange}
            className="mt-2"
          />
        </div>
      </div>
      {/* Tercera fila: Dependencia (Select con opciones "CD" y "CF") */}
      <div>
        <Label htmlFor="dependencia" className="text-tremor-default font-medium">
          Dependencia <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.dependencia || ""}
          onValueChange={(value) => handleSelectChange("dependencia", value)}
        >
          <SelectTrigger id="dependencia" className="mt-2 w-full">
            <SelectValue placeholder="Selecciona la dependencia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CD">CD</SelectItem>
            <SelectItem value="CF">CF</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  // Renderizado condicional según el tipo de área
  const renderFormByType = () => {
    switch (areaType) {
      case "Administracion sede":
        return renderSedeForm();
      case "Administracion dependencia":
        return renderDependenciaForm();
      case "Administracion despacho":
        return renderDespachoForm();
      default:
        return null;
    }
  };

  return (
    <form className="pt-5" onSubmit={handleSubmit} noValidate>
      {renderFormByType()}
      <Divider className="my-5" />
      <div className="flex justify-end gap-2">
        {/* Al hacer clic en Cancelar se invoca el callback para cerrar el Dialog */}
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}
