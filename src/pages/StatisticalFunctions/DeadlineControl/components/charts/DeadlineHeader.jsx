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

export default function DeadlineHeader() {
  return (
    <div className="flex flex-row border-b border-tremor-border py-2 dark:border-dark-tremor-border">
      <div className="flex flex-row gap-3 mt-2 w-full">
        <Metric label="Cantidad de casos ingresados" value="1250" IconComponent={IconFileText} />
        <Metric label="Cantidad de fiscales" value="12" IconComponent={IconUser} />
        <Metric label="Cantidad de dependencias" value="21" IconComponent={IconBuildings} />
        <Metric
          label="Fecha registro"
          value={
            <>
              Lunes, 03 de marzo <br /> de 2025
            </>
          }
          IconComponent={IconCalendar}
          valueClassName="text-sm"
        />
        <Metric
          label="Código Reporte"
          value={<img src={logoMP} alt="Código Reporte" className="w-32 h-auto" />}
        />
        <Metric
          label=""
          value={<img src={logoMP} alt="Logo" className="w-40 h-auto" />}
        />
      </div>
    </div>
  );
}
