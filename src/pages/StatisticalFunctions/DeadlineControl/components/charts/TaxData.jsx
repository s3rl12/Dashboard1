import React from "react";
import Card from "../../../../../components/ui/Card";

/**
 * Componente que muestra la información de "plazos" tal como se ve en la imagen.
 *
 * @param {Array} workspaces - Arreglo de objetos que contienen la información de cada tarjeta.
 *   Cada objeto debería tener la forma:
 *   {
 *     name: string,
 *     metrics: {
 *       dentroPlazo: { percentage: number, quantity: number, label: string },
 *       porVencer: { percentage: number, quantity: number, label: string },
 *       vencidos: { percentage: number, quantity: number, label: string },
 *       total: { percentage: number, quantity: number, label: string }
 *     }
 *   }
 * @param {Function} [onCardClick] - (Opcional) Función que se ejecuta al hacer clic en la tarjeta.
 */
export default function TaxData({ workspaces = [], onCardClick }) {
    return (
        <div className="grid grid-cols-1 gap-4">
            {workspaces.map((workspace, index) => (
                <Card
                    key={index}
                    className="rounded-tremor-small p-4 cursor-pointer"
                    onClick={() => onCardClick?.(workspace)}
                >
                    <div className="flex flex-row">
                        {/* PRIMER DIV: Nombre + 3 métricas (Dentro del plazo, Por vencer, Vencidos) */}
                        <div className="flex flex-wrap items-center justify-between">
                            {/* Nombre */}
                            <h4 className="text-xs font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong mr-4">
                                {workspace.name}
                            </h4>

                            {/* Contenedor de las 3 métricas en una sola fila */}
                            <div className="flex items-center space-x-4">
                                {/* Métrica: Dentro del plazo */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="text-ms font-bold text-blue-900">
                                        {workspace.metrics?.dentroPlazo?.percentage}%{" "}
                                        <span className="text-base text-gray-600 ml-1">
                                            {workspace.metrics?.dentroPlazo?.quantity}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        {workspace.metrics?.dentroPlazo?.label}
                                    </div>
                                </div>

                                {/* Métrica: Plazo por vencer */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="text-ms font-bold text-blue-900">
                                        {workspace.metrics?.porVencer?.percentage}%{" "}
                                        <span className="text-base text-gray-600 ml-1">
                                            {workspace.metrics?.porVencer?.quantity}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        {workspace.metrics?.porVencer?.label}
                                    </div>
                                </div>

                                {/* Métrica: Plazo vencidos */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="text-ms font-bold text-blue-900">
                                        {workspace.metrics?.vencidos?.percentage}%{" "}
                                        <span className="text-base text-gray-600 ml-1">
                                            {workspace.metrics?.vencidos?.quantity}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        {workspace.metrics?.vencidos?.label}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SEGUNDO DIV: Cantidad de plazos ingresados (Total) */}
                        <div className="flex flex-col items-center text-center">
                            <div className="text-xs text-gray-600">
                                {workspace.metrics?.total?.label}
                            </div>
                            <div className="text-ms font-bold text-blue-900">
                                {workspace.metrics?.total?.percentage}%{" "}
                                <span className="text-base text-gray-600 ml-1">
                                    {workspace.metrics?.total?.quantity}
                                </span>
                            </div>
                        </div>
                    </div>

                </Card>
            ))}
        </div>
    );
}
