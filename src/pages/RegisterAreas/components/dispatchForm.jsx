// dispatchForm.jsx
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

const DispatchForm = ({ selectedArea }) => {
  return (
    <div className="space-y-4">
      {/* Primera fila: Nombre despacho */}
      <div>
        <Label htmlFor="nombre-despacho-edit" className="text-tremor-default font-medium">
          Nombre despacho <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          id="nombre-despacho-edit"
          name="nombreDespacho"
          defaultValue={selectedArea?.despacho || ''}
          placeholder="Ingresa el nombre del despacho"
          className="mt-2"
        />
      </div>
      {/* Segunda fila: Código despacho, Teléfono y RUC */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="codigo-despacho-edit" className="text-tremor-default font-medium">
            Código despacho <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="codigo-despacho-edit"
            name="codigoDespacho"
            placeholder="Ingresa el código del despacho"
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
      </div>
      {/* Tercera fila: Dependencia (Select con opciones "CD" y "CF") */}
      <div>
        <Label htmlFor="dependencia-edit" className="text-tremor-default font-medium">
          Dependencia <span className="text-red-500">*</span>
        </Label>
        <Select value={""} onValueChange={() => {}}>
          <SelectTrigger id="dependencia-edit" className="mt-2 w-full">
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
};

export default DispatchForm;
