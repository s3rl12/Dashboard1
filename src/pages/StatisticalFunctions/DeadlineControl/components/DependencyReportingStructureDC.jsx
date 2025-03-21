// src/components/reports/DependencyReportingStructureDC.jsx

import React from "react";
import Card from "../../../../components/ui/Card";
import DeadlineHeader from "./charts/DeadlineHeader";
import TaxData from "./charts/TaxData";
import DeadlineBarChartY from "./charts/DeadlineBarChartY";
import DeadlinedependenceB from "./charts/DeadlinedependenceB";
import ChartPie from "./charts/ChartPie";
import TableDeadline from "./charts/TableDeadline";
import semaforo from "../../../../assets/icons/semaforo.svg";
import { useAuth } from "../../../../context/AuthContext";

const version = import.meta.env.VITE_VERSION || "1.1.1";

/**
 * Componente que renderiza la columna derecha del dashboard.
 * Incluye:
 *  - Encabezado del reporte (DashboardHeader) con métricas extraídas de la dependencia.
 *  - Gráficos y tabla.
 *
 * Se reciben las siguientes props:
 * @param {string} containerId - Id único para el contenedor.
 * @param {Array} workspaces - Datos para el componente TaxData.
 * @param {object} dependencyData - Información específica de la dependencia.
 */
export default function DependencyReportingStructureDC({
    containerId,
    workspaces = [],
    dependencyData,
}) {
    const { user } = useAuth();
    const fullName = user ? `${user.nombre} ${user.apellido}` : "Administrador";
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    // Extraer la información del primer objeto de general_dependencia
    const generalDependencia =
        dependencyData?.data_general_carga?.general_dependencia?.[0] || {};

    // Construir el objeto generalSede para enviar a DeadlineHeader:
    const generalSede = {
        Casos_Ingresados: generalDependencia.Plazos_Registrados ?? 0,
        Total_Fiscales: generalDependencia.Total_Fiscales ?? 0,
        Total_Dependencias: generalDependencia.Total_Despachos ?? 0,
    };

    // El headerTitle se obtiene del campo Nombre de general_dependencia
    const headerTitle = generalDependencia.Nombre || "";

    return (
        <div id={containerId} className="col-span-9 space-y-3">
            {/* DashboardHeader */}
            <div className="flex items-center justify-between bg-[#274E94] px-4">
                <h2 className="text-base font-semibold text-white uppercase py-3">
                    CONTROL DE PLAZOS
                </h2>
                <div className="text-xs text-white justify-items-end">
                    <p>SERF: {version}</p>
                    <span>
                        Fecha de impresion:&nbsp;
                        <strong>{formattedDate}</strong>
                    </span>
                </div>
            </div>
            {/* Se envían los parámetros requeridos a DeadlineHeader */}
            <DeadlineHeader
                generalSede={generalSede}
                headerTitle={headerTitle}
                reportType="D"
            />

            {/* Primera fila: Gráficos principales */}
            <div className="grid grid-cols-12 gap-3">
                {/* Sección izquierda: Gráfico de Fiscales */}
                <div className="col-span-4 flex flex-col h-full">
                    <Card className="flex-1">
                        <div className="border-b border-tremor-border py-2 dark:border-dark-tremor-border">
                            <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                Fiscales
                            </h3>
                        </div>
                        <div className="py-2 h-full">
                            {/* Se utiliza el parámetro taxDataWorkspaces recibido */}
                            <TaxData workspaces={workspaces} />
                        </div>
                    </Card>
                </div>

                {/* Sección derecha: Cuadrícula de gráficos */}
                <div className="col-span-8 space-y-3">
                    {/* Gráfico: Estado de Casos por Estado Fiscal */}
                    <div className="grid grid-cols-1 gap-3">
                        <Card>
                            <div className="h-80 bg-red-200 flex justify-center items-center">
                                <div className="w-full h-full bg-white">
                                    <DeadlineBarChartY
                                        title="ESTADO DE CASOS POR ESTADO FISCAL"
                                        legendData={[
                                            "Dentro de plazos",
                                            "Plazos por vencer",
                                            "Plazos vencidos",
                                        ]}
                                        xAxisData={[
                                            "QUISPE YCHUHUAYTA GILMAR MARTIN",
                                            "QUISPE YCHUHUAYTA GILMAR MARTIN",
                                            "QUISPE YCHUHUAYTA GILMAR MARTIN",
                                            "QUISPE YCHUHUAYTA GILMAR MARTIN",
                                            "QUISPE YCHUHUAYTA GILMAR MARTIN",
                                        ]}
                                        seriesData={[
                                            {
                                                name: "Dentro de plazos",
                                                type: "bar",
                                                data: [10, 7, 5, 9, 4, 4, 6],
                                                itemStyle: { color: "#008000" },
                                            },
                                            {
                                                name: "Plazos por vencer",
                                                type: "bar",
                                                data: [2, 3, 2, 4, 3, 4, 6],
                                                itemStyle: { color: "#FFD700" },
                                            },
                                            {
                                                name: "Plazos vencidos",
                                                type: "bar",
                                                data: [1, 2, 0, 1, 2, 4, 6],
                                                itemStyle: { color: "#FF0000" },
                                            },
                                        ]}
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                    {/* Gráfico: Estado de Casos por Años */}
                    <div className="grid grid-cols-1 gap-3">
                        <Card>
                            <div className="h-80 bg-red-200 flex justify-center items-center">
                                <div className="w-full h-full bg-white">
                                    <DeadlineBarChartY
                                        title="ESTADO DE CASOS POR AÑOS"
                                        legendData={[
                                            "Dentro de plazos",
                                            "Plazos por vencer",
                                            "Plazos vencidos",
                                        ]}
                                        xAxisData={["2016", "2017", "2018", "2019", "2020"]}
                                        seriesData={[
                                            {
                                                name: "Dentro de plazos",
                                                type: "bar",
                                                data: [10, 7, 5, 9, 4, 4, 6],
                                                itemStyle: { color: "#008000" },
                                            },
                                            {
                                                name: "Plazos por vencer",
                                                type: "bar",
                                                data: [2, 3, 2, 4, 3, 4, 6],
                                                itemStyle: { color: "#FFD700" },
                                            },
                                            {
                                                name: "Plazos vencidos",
                                                type: "bar",
                                                data: [1, 2, 0, 1, 2, 4, 6],
                                                itemStyle: { color: "#FF0000" },
                                            },
                                        ]}
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Segunda fila: Gráficos 4 y 5 */}
            <div className="grid grid-cols-12 gap-3">
                {/* Gráfico 4: Total de Plazos con semáforo */}
                <Card className="col-span-6">
                    <div className="h-80 bg-red-200 flex justify-center items-center">
                        <div className="w-full h-full bg-white flex flex-col items-center justify-evenly">
                            <div className="flex flex-col items-center space-y-2">
                                <h3 className="text-center text-sm font-bold">TOTAL DE PLAZOS</h3>
                                <div className="flex flex-row items-center space-x-2">
                                    <img src={semaforo} alt="Código Reporte" className="w-32 h-auto" />
                                    <div className="flex flex-col">
                                        <h4 className="text-gray-600 text-xs">Plazo vencidos</h4>
                                        <span className="text-lg font-medium">1277</span>
                                        <h4 className="text-gray-600 text-xs">Plazo por vencer</h4>
                                        <span className="text-lg font-medium">21</span>
                                        <h4 className="text-gray-600 text-xs">Dentro del plazo</h4>
                                        <span className="text-lg font-medium">90</span>
                                    </div>
                                </div>
                            </div>
                            <ChartPie
                                seriesData={[
                                    { value: 1277, name: "Plazo vencidos", itemStyle: { color: "#FF0000" } },
                                    { value: 21, name: "Plazo por vencer", itemStyle: { color: "#FFD700" } },
                                    { value: 90, name: "Dentro del plazo", itemStyle: { color: "#008000" } },
                                ]}
                            />
                        </div>
                    </div>
                </Card>
                {/* Gráfico 5: Dependencias y Casos */}
                <Card className="col-span-6">
                    <div className="h-80 bg-red-200 flex justify-center items-center">
                        <div className="w-full h-full bg-white">
                            <DeadlinedependenceB
                                title="Dependencias y Casos"
                                yAxisData={[
                                    "QUISPE YCHUHUAYTA GILMAR MARTIN",
                                    "QUISPE YCHUHUAYTA GILMAR MARTIN",
                                    "QUISPE YCHUHUAYTA GILMAR MARTIN",
                                ]}
                                seriesData={[10, 20, 5]}
                            />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Tercera fila: Gráficos 2 y 3 */}
            <div className="grid grid-cols-12 gap-3">
                {/* Gráfico 2: Estados de Casos por Estado Fiscal */}
                <Card className="col-span-6">
                    <div className="h-80 bg-red-200 flex justify-center items-center">
                        <div className="w-full h-full bg-white">
                            <DeadlineBarChartY
                                title="ESTADOS DE CASOS POR ESTADO FISCAL"
                                legendData={[
                                    "Dentro de plazos",
                                    "Plazos por vencer",
                                    "Plazos vencidos",
                                ]}
                                xAxisData={[
                                    "ASIGNADO PNP",
                                    "CON INVESTIGACION PRELIMINAR",
                                    "CONCLUSION INV. PREPARATORIA",
                                    "EN CALIFICACION",
                                    "FORMALIZA INVESTIGACION PREPARATORIA",
                                ]}
                                seriesData={[
                                    {
                                        name: "Dentro de plazos",
                                        type: "bar",
                                        data: [10, 7, 5, 9, 4, 4, 6],
                                        itemStyle: { color: "#008000" },
                                    },
                                    {
                                        name: "Plazos por vencer",
                                        type: "bar",
                                        data: [2, 3, 2, 4, 3, 4, 6],
                                        itemStyle: { color: "#FFD700" },
                                    },
                                    {
                                        name: "Plazos vencidos",
                                        type: "bar",
                                        data: [1, 2, 0, 1, 2, 4, 6],
                                        itemStyle: { color: "#FF0000" },
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </Card>
                {/* Gráfico 3: Estados de Casos por Etapas */}
                <Card className="col-span-6">
                    <div className="h-80 bg-red-200 flex justify-center items-center">
                        <div className="w-full h-full bg-white">
                            <DeadlineBarChartY
                                title="ESTADOS DE CASOS POR ETAPAS"
                                legendData={[
                                    "Dentro de plazos",
                                    "Plazos por vencer",
                                    "Plazos vencidos",
                                ]}
                                xAxisData={[
                                    "CALIFICACION",
                                    "INVESTIGACION PRELIMINAR",
                                    "INVESTIGACION PREPARATORIA",
                                ]}
                                seriesData={[
                                    {
                                        name: "Dentro de plazos",
                                        type: "bar",
                                        data: [10, 7, 5, 9, 4, 4, 6],
                                        itemStyle: { color: "#008000" },
                                    },
                                    {
                                        name: "Plazos por vencer",
                                        type: "bar",
                                        data: [2, 3, 2, 4, 3, 4, 6],
                                        itemStyle: { color: "#FFD700" },
                                    },
                                    {
                                        name: "Plazos vencidos",
                                        type: "bar",
                                        data: [1, 2, 0, 1, 2, 4, 6],
                                        itemStyle: { color: "#FF0000" },
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Tercera fila: Tabla de contenido adicional */}
            <Card>
                <div className="border-b border-tremor-border py-2 dark:border-dark-tremor-border">
                    <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Tabla de contenido adicional
                    </h3>
                </div>
                <div className="h-72 flex justify-center items-center">
                    <div className="w-full h-full p-4">
                        <TableDeadline />
                    </div>
                </div>
            </Card>

            {/* Pie de Página */}
            <div className="flex items-center justify-between bg-[#274E94] px-4 py-2">
                <div className="text-xs text-white">
                    <p className="font-semibold">
                        Elaborado por el Área de Gestión e Indicadores
                    </p>
                    <p>Ministerio Público del Distrito Fiscal de Madre de Dios</p>
                </div>
                <div className="flex flex-col text-xs text-white justify-items-end">
                    <span>
                        Usuario:&nbsp;
                        <strong>{fullName}</strong>
                    </span>
                    <span>
                        IP:&nbsp;
                        <strong>192.168.1.56</strong>
                    </span>
                </div>
            </div>
        </div>
    );
}
