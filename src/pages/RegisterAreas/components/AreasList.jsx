// AreasList.jsx
import React, { useState } from 'react';
import { Divider } from "../../../components/ui/Divider";
import AreaListContent from './AreaListContent';

const areasData = [
  {
    title: 'Administracion sede',
    description: 'Gestiona las operaciones administrativas y recursos humanos.',
    linkText: 'Ver detalles',
    href: '#',
  },
  {
    title: 'Administracion dependencia',
    description: 'Controla las operaciones diarias y la logística de la organización.',
    linkText: 'Ver detalles',
    href: '#',
  },
  {
    title: 'Administracion despacho',
    description: 'Supervisa y mejora la infraestructura tecnológica.',
    linkText: 'Ver detalles',
    href: '#',
  },
];

export default function AreasList() {
  // Estado para almacenar el área seleccionada, por defecto la primera ("Administracion sede")
  const [selectedArea, setSelectedArea] = useState(areasData[0]);

  return (
    <div className="p-2 space-y-2">
      <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Bienvenido a la gestión de áreas
      </h3>
      <p className="text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
        Revisa y administra las áreas de tu organización.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {areasData.map((area) => (
          <div
            key={area.title}
            className="flex flex-col items-start justify-between py-1 pl-4"
          >
            <div>
              <p className="-ml-2 border-l-2 border-[#0052f5] border-tremor-brand pl-2 text-tremor-default font-medium text-tremor-content-strong dark:border-dark-tremor-brand dark:text-dark-tremor-content-strong">
                {area.title}
              </p>
              <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                {area.description}
              </p>
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSelectedArea(area);
              }}
              className="mt-4 text-tremor-default font-medium text-tremor-brand hover:text-tremor-brand-emphasis dark:text-dark-tremor-brand hover:dark:text-dark-tremor-brand-emphasis"
            >
              {area.linkText} &#8594;
            </a>
          </div>
        ))}
      </div>
      <Divider className="my-5" />
      <div>
        {/* Se renderiza el componente AreaListContent con los datos del área seleccionada */}
        <AreaListContent 
          title={selectedArea.title} 
          // Puedes pasar otros props, como datos de la tabla y configuración de encabezados
          // Por ejemplo: tableData, columns, etc.
        />
      </div>
    </div>
  );
}
