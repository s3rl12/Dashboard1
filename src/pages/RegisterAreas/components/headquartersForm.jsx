// headquartersForm.jsx
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

const HeadquartersForm = ({ selectedArea }) => {
  return (
    <div className="space-y-4">
      {/* Primera fila: Nombre sede */}
      <div>
        <Label htmlFor="nombre-sede-edit" className="text-tremor-default font-medium">
          Nombre sede <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          id="nombre-sede-edit"
          name="nombreSede"
          defaultValue={selectedArea?.area || ''}
          placeholder="Ingresa el nombre de la sede"
          className="mt-2"
        />
      </div>
      {/* Segunda fila: Teléfono y RUC */}
      <div className="grid grid-cols-2 gap-4">
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
      {/* Tercera fila: Provincia, Distrito fiscal y Región */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="provincia-edit" className="text-tremor-default font-medium">
            Provincia <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="provincia-edit"
            name="provincia"
            placeholder="Ingresa la provincia"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="distrito-fiscal-edit" className="text-tremor-default font-medium">
            Distrito fiscal <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="distrito-fiscal-edit"
            name="distritoFiscal"
            placeholder="Ingresa el distrito fiscal"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="region-edit" className="text-tremor-default font-medium">
            Región <span className="text-red-500">*</span>
          </Label>
          <Select value={""} onValueChange={() => {}}>
            <SelectTrigger id="region-edit" className="mt-2 w-full">
              <SelectValue placeholder="Selecciona la región" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">M</SelectItem>
              <SelectItem value="C">C</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Cuarta fila: Código postal */}
      <div>
        <Label htmlFor="codigo-postal-edit" className="text-tremor-default font-medium">
          Código postal <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          id="codigo-postal-edit"
          name="codigoPostal"
          placeholder="Ingresa el código postal"
          className="mt-2"
        />
      </div>
    </div>
  );
};

export default HeadquartersForm;
