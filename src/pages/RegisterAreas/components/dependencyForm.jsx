// dependencyForm.jsx
import React from 'react';
import { Input } from '../../../components/ui/Input';
import { Label } from '../../../components/ui/Label';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '../../../components/dashboard/Select';

const DependencyForm = ({ selectedArea }) => {
  return (
    <div className="space-y-4">
      {/* Primera fila: Fiscalía */}
      <div>
        <Label htmlFor="fiscalia-edit" className="text-tremor-default font-medium">
          Fiscalía <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          id="fiscalia-edit"
          name="fiscalia"
          defaultValue={selectedArea?.dependencia || ''}
          placeholder="Ingresa la fiscalía"
          className="mt-2"
        />
      </div>
      {/* Segunda fila: Tipo de fiscalía y Nombre fiscalía */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="tipo-fiscalia-edit" className="text-tremor-default font-medium">
            Tipo de fiscalía <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="tipo-fiscalia-edit"
            name="tipoFiscalia"
            placeholder="Ingresa el tipo de fiscalía"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="nombre-fiscalia-edit" className="text-tremor-default font-medium">
            Nombre fiscalía <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="nombre-fiscalia-edit"
            name="nombreFiscalia"
            placeholder="Ingresa el nombre de la fiscalía"
            className="mt-2"
          />
        </div>
      </div>
      {/* Tercera fila: RUC y Teléfono */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ruc-edit" className="text-tremor-default font-medium">
            RUC <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="ruc-edit"
            name="ruc"
            placeholder="Ingresa el RUC"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="telefono-edit" className="text-tremor-default font-medium">
            Teléfono <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="telefono-edit"
            name="telefono"
            placeholder="Ingresa el teléfono"
            className="mt-2"
          />
        </div>
      </div>
      {/* Cuarta fila: Sede (Select con opciones "CD" y "CF") */}
      <div>
        <Label htmlFor="sede-edit" className="text-tremor-default font-medium">
          Sede <span className="text-red-500">*</span>
        </Label>
        <Select value={""} onValueChange={() => {}}>
          <SelectTrigger id="sede-edit" className="mt-2 w-full">
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
};

export default DependencyForm;
