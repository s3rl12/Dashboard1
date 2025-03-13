import React from "react";
import { IconUser } from "@tabler/icons-react";

// Helper: Divide el texto en grupos de 3 palabras y retorna con saltos de línea
function chunkLabel(label) {
  if (!label) return "";
  const words = label.split(" ");
  const lines = [];

  for (let i = 0; i < words.length; i += 3) {
    lines.push(words.slice(i, i + 3).join(" "));
  }

  // Une cada grupo con un salto de línea
  return lines.join("\n");
}

// Subcomponente para cada métrica
const Metric = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Etiqueta de la métrica (dividida en grupos de 3 palabras) */}
      <p className="text-sm text-gray-500 mb-1 whitespace-pre-line">
        {chunkLabel(label)}
      </p>

      {/* Contenido principal (icono + valor), centrado */}
      <div className="flex items-center space-x-2">
        <IconUser className="w-6 h-6 text-gray-700" aria-hidden="true" />
        <span className="text-xl font-semibold text-gray-700">{value}</span>
      </div>
    </div>
  );
};

export default function TaxBurdenHeader() {
  return (
    <div className="border-tremor-border dark:border-dark-tremor-border py-2">
      <div className="flex flex-row w-full justify-around items-center">
        {/* Métricas alineadas en una sola fila */}
        <Metric label="Cantidad total de casos ingresados" value="1250" />
        <Metric label="Cantidad de casos ingresados del mes" value="1250" />
        <Metric label="Cantidad total de casos resueltos" value="1250" />
        <Metric label="Cantidad de casos resueltos del mes" value="1250" />
        <Metric label="Meta del mes" value="12" />
      </div>
    </div>
  );
}
