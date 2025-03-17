import React from "react";
import Card from "../../../../components/ui/Card";
import FilterHeader from "./filterHeader";
import SideContent from "./SideContent";
import DeadlineBarChart from "./charts/DeadlineBarChart";   // Gráfico 1
import DeadlineBarChartY from "./charts/DeadlineBarChartY"; // Se usará para gráficos
import DeadlineBarChartI from "./charts/DeadlineBarChartI"; // Se usará para gráficos
import TableDeadline from "./charts/TableDeadline";
import DeadlineHeader from "./charts/DeadlineHeader"; // DashboardHeader
import TaxData from "./charts/TaxData";
import DeadlinedependenceB from "./charts/DeadlinedependenceB";
import ChartPie from "./charts/ChartPie";
import semaforo from '../../../../assets/icons/semaforo.svg';

export default function DeadlineControlE() {
    // Datos estáticos de ejemplo
    const dummyWorkspaces = [
        { name: "Dependencia 1", code: "SC", casos: 14, status: "active", telefono: "999 999 999" },
        { name: "Dependencia 2", code: "D2", casos: 7, status: "inactive", telefono: "999 999 999" },
        { name: "Dependencia 3", code: "D3", casos: 4, status: "active", telefono: "999 999 999" },
    ];

    const workspaces = [
        {
            name: "QUISPE YCHUHUAYTA GILMAR MARTIN",
            metrics: {
                dentroPlazo: {
                    percentage: 31,
                    quantity: 15,
                    label: "Dentro del plazo"
                },
                porVencer: {
                    percentage: 19,
                    quantity: 5,
                    label: "Plazo por vencer"
                },
                vencidos: {
                    percentage: 50,
                    quantity: 20,
                    label: "Plazo vencidos"

                },
                total: {
                    percentage: 100,
                    quantity: 40,
                    label: "Cantidad de plazos ingresados"
                }
            }
        },

    ];

    return (
        <div className="p-2 space-y-2 min-h-screen">
            <FilterHeader pdfTargetId="DeadlineControlE" />

            <div className="grid grid-cols-12 gap-3 h-full">
                {/* Columna izquierda: Sede y Dependencias (más estrecha) */}
                <div className="col-span-3 flex flex-col space-y-3 h-full">
                    {/* Sede Seleccionada */}
                    <Card>
                        <div className="border-b border-tremor-border dark:border-dark-tremor-border">
                            <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                Sede Seleccionada
                            </h3>
                        </div>
                        <div className="h-40 p-2">
                            <h2 className="font-medium text-base">Sede central</h2>
                            <p className="font-medium text-base">
                                Código: <span className="font-normal text-sm">SC</span>
                            </p>
                            <p className="font-medium text-base">
                                Cantidad dependencias: <span className="font-normal text-sm">14</span>
                            </p>
                        </div>
                    </Card>

                    {/* Dependencias relacionadas */}
                    <Card className="flex-1">
                        <div className="border-b border-tremor-border dark:border-dark-tremor-border">
                            <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                Dependencias relacionadas
                            </h3>
                        </div>
                        <div className="py-2 h-full">
                            <SideContent workspaces={dummyWorkspaces} />
                        </div>
                    </Card>
                </div>

                {/* Columna derecha: DashboardHeader + Gráficos y Tabla (más amplia) */}
                <div id="DeadlineControlE" className="col-span-9 space-y-3">
                    {/* DashboardHeader (Header del reporte) */}
                    <div className="flex items-center justify-between bg-[#274E94] px-4">
                        <h2 className="text-base font-semibold  uppercase text-white py-3">
                            CONTROL DE PLAZOS
                        </h2>
                        <span className="text-xs text-white">
                            Fecha de actualización&nbsp;
                            <strong>15/03/2025</strong>
                        </span>
                    </div>
                    <DeadlineHeader />
                    {/* Primera fila: División en dos secciones horizontales */}
                    <div className="grid grid-cols-12 gap-3">
                        {/* Sección izquierda: Gráfico 1 */}
                        <div className="col-span-4  flex flex-col h-full">
                            <Card className="flex-1">
                                <div className="border-b border-tremor-border py-2 dark:border-dark-tremor-border">
                                    <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                        Fiscales
                                    </h3>
                                </div>
                                <div className="py-2 h-full">
                                    <TaxData workspaces={workspaces} />
                                </div>
                            </Card>
                        </div>

                        {/* Sección derecha: Cuadrícula 2x2 de gráficos (4 gráficos) */}
                        <div className="col-span-8 space-y-3">
                            {/* Primera sub-sección (fila superior de la cuadrícula) */}
                            <div className="grid grid-cols-1 gap-3">
                                <Card>
                                    <div className="h-80 bg-red-200 flex justify-center items-center">
                                        <div className="w-full h-full bg-white">
                                            <DeadlineBarChartY
                                                title="ESTADO DE CASOS POR ESTADO FISCAL"
                                                legendData={["Dentro de plazos", "Plazos por vencer", "Plazos vencidos"]}
                                                xAxisData={["QUISPE YCHUHUAYTA GILMAR MARTIN", "QUISPE YCHUHUAYTA GILMAR MARTIN", "QUISPE YCHUHUAYTA GILMAR MARTIN", "QUISPE YCHUHUAYTA GILMAR MARTIN", "QUISPE YCHUHUAYTA GILMAR MARTIN"]}
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
                            {/* Segunda sub-sección (fila inferior de la cuadrícula) */}
                            <div className="grid grid-cols-1 gap-3">

                                <Card>
                                    <div className="h-80 bg-red-200 flex justify-center items-center">
                                        <div className="w-full h-full bg-white">
                                            {/* Se puede reutilizar o cambiar el componente según el gráfico requerido */}
                                            <DeadlineBarChartY
                                                title="ESTADO DE CASOS POR AÑOS"
                                                legendData={["Dentro de plazos", "Plazos por vencer", "Plazos vencidos"]}
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


                    {/* SEGUNDA FILA: Código proporcionado para gráficos 4 y 5 */}
                    <div className="grid grid-cols-12 gap-3">
                        {/* Gráfico 4 */}
                        <Card className="col-span-6">
                            <div className="h-80 bg-red-200 flex justify-center items-center">
                                <div className="w-full h-full bg-white flex flex-col items-center justify-evenly">
                                    {/* Sección Arriba: Título, semáforo y datos */}
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

                                    {/* Sección Abajo: ChartPie */}
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

                        {/* Gráfico 5 */}
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

                    {/* SEGUNDA FILA: Código proporcionado para gráficos 2 y 3 */}
                    <div className="grid grid-cols-12 gap-3">
                        {/* Gráfico 2 */}
                        <Card className="col-span-6">
                            <div className="h-80 bg-red-200 flex justify-center items-center">
                                <div className="w-full h-full bg-white">
                                    <DeadlineBarChartY
                                        title="ESTADOS DE CASOS POR ESTADO FISCAL"
                                        legendData={["Dentro de plazos", "Plazos por vencer", "Plazos vencidos"]}
                                        xAxisData={["ASIGNADO PNP", "CON INVESTIGACION PRELIMINAR", "CONCLUSION INV. PREPARATORIA", "EN CALIFICACION", "FORMALIZA INVESTIGACION PREPARATORIA"]}
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

                        {/* Gráfico 3 */}
                        <Card className="col-span-6">
                            <div className="h-80 bg-red-200 flex justify-center items-center">
                                <div className="w-full h-full bg-white">
                                    <DeadlineBarChartY
                                        title="ESTADOS DE CASOS POR ETAPAS"
                                        legendData={["Dentro de plazos", "Plazos por vencer", "Plazos vencidos"]}
                                        xAxisData={["CALIFICACION", "INVESTIGACION PRELIMINAR", "INVESTIGACION PREPARATORIA"]}
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



                    {/* TERCERA FILA: Tabla */}
                    <Card>
                        <div className="border-b border-tremor-border  py-2 dark:border-dark-tremor-border">
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
                </div>
            </div>
        </div>
    );
}
