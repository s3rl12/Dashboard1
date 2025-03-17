// DeadlineHeader.jsx
import React from "react";
import { IconUser, IconBuildings, IconCalendar, IconFileText } from "@tabler/icons-react";
import logoMP from '../../../../../assets/icons/logoMP.svg';

// Componente reutilizable para cada métrica
const Metric = ({ label, value, IconComponent, valueClassName = "text-xl" }) => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center border-r-2 border-tremor-border dark:border-dark-tremor-border pr-3">
      {label && <p className="text-sm text-center py-2">{label}</p>}
      {IconComponent ? (
        <div className="flex items-center justify-center space-x-1.5">
          <IconComponent className="size-8 text-gray-600" aria-hidden="true" />
          <span className={`font-medium ${valueClassName} text-gray-600 text-center`}>
            {value}
          </span>
        </div>
      ) : (
        <span className={`font-medium ${valueClassName} text-gray-600 text-center`}>
          {value}
        </span>
      )}
    </div>
  );
};

export default function DeadlineHeader({ generalSede }) {
  console.log("datos:", generalSede?.Total_Fiscales);
  console.log("datos:", generalSede?.Total_Dependencias);
  // Obtener la fecha actual y formatearla en español
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-row border-b border-tremor-border py-2 dark:border-dark-tremor-border">
      <div className="flex flex-row gap-3 mt-2 w-full">
        <Metric 
          label="Cantidad de casos ingresados" 
          value={generalSede?.Casos_Ingresados ?? 0} 
          IconComponent={IconFileText} 
        />
        <Metric 
          label="Cantidad de fiscales" 
          value={generalSede?.Total_Fiscales ?? 0} 
          IconComponent={IconUser} 
        />
        <Metric 
          label="Cantidad de dependencias" 
          value={generalSede?.Total_Dependencias ?? 0} 
          IconComponent={IconBuildings} 
        />
        <Metric
          label="Fecha registro"
          value={formattedDate}
          IconComponent={IconCalendar}
          valueClassName="text-sm"
        />
        <Metric
          label="Código Reporte"
          value={<img src={logoMP} alt="Código Reporte" className="w-32 h-auto" />}
        />
        <Metric
          value={<img src={logoMP} alt="Logo" className="w-40 h-auto" />}
        />
      </div>
    </div>
  );
}
