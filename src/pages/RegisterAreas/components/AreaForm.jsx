// AreaForm.jsx
import React, { useState } from "react";
import { Divider } from "../../../components/ui/Divider";
import { Button } from "../../../components/ui/Button";

// Importamos los componentes refactorizados para cada tipo de área
import HeadquartersForm from "./headquartersForm";
import DependencyForm from "./dependencyForm";
import DispatchForm from "./dispatchForm";

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
    // Aquí se puede agregar lógica de validación y envío
  };

  // Renderiza el formulario según el tipo de área utilizando los nuevos componentes
  const renderFormByType = () => {
    switch (areaType) {
      case "Administracion sede":
        return (
          <HeadquartersForm
            formData={formData}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
          />
        );
      case "Administracion dependencia":
        return (
          <DependencyForm
            formData={formData}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
          />
        );
      case "Administracion despacho":
        return (
          <DispatchForm
            formData={formData}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form className="pt-5" onSubmit={handleSubmit} noValidate>
      {renderFormByType()}
      <Divider className="my-5" />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}
