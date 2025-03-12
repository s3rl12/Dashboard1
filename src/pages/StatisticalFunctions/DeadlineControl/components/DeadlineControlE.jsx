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
            <FilterHeader />

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
                <div className="col-span-9 space-y-3">
                    {/* DashboardHeader (Header del reporte) */}
                    <DeadlineHeader />

                    {/* Primera fila: División en dos secciones horizontales */}
                    <div className="grid grid-cols-12 gap-3">
                        {/* Sección izquierda: Gráfico 1 */}
                        <div className="col-span-4  flex flex-col h-full">
                            <Card className="flex-1">
                                <div className="border-b border-tremor-border dark:border-dark-tremor-border">
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
                            <div className="grid grid-cols-2 gap-3">
                                <Card>
                                    <div className="border-b border-tremor-border dark:border-dark-tremor-border">
                                        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                            Title 2
                                        </h3>
                                    </div>
                                    <div className="h-80 bg-red-200 flex justify-center items-center">
                                        <div className="w-full h-full bg-white">

                                            <DeadlineBarChartY />
                                        </div>
                                    </div>
                                </Card>
                                <Card>
                                    <div className="border-b border-tremor-border dark:border-dark-tremor-border">
                                        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                            Title 3
                                        </h3>
                                    </div>
                                    <div className="h-80 bg-red-200 flex justify-center items-center">
                                        {/* Contenedor principal en blanco, con distribución vertical */}
                                        <div className="w-full h-full bg-white flex flex-col items-center justify-evenly">

                                            {/* Sección Arriba: Título, semáforo y datos */}
                                            <div className="flex flex-col items-center space-y-2">
                                                <h3 className="text-center text-lg font-medium">TOTAL DE PLAZOS</h3>
                                                <div className="flex flex-row items-center space-x-2">
                                                    <img src={semaforo} alt="Código Reporte" className="w-32 h-auto" />
                                                    <div className="flex flex-col">
                                                        <h4 className="text-gray-600 text-xs">Plazo vencidos</h4>
                                                        <span className="text-lg font-medium">1277</span>
                                                        <h4 className="text-gray-600 text-xs">Plazo vencidos</h4>
                                                        <span className="text-lg font-medium">1277</span>
                                                        <h4 className="text-gray-600 text-xs">Plazo vencidos</h4>
                                                        <span className="text-lg font-medium">1277</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Sección Abajo: ChartPie */}
                                            <ChartPie />

                                        </div>
                                    </div>

                                </Card>
                            </div>
                            {/* Segunda sub-sección (fila inferior de la cuadrícula) */}
                            <div className="grid grid-cols-2 gap-3">
                                <Card>
                                    <div className="border-b border-tremor-border dark:border-dark-tremor-border">
                                        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                            Title 4
                                        </h3>
                                    </div>
                                    <div className="h-80 bg-red-200 flex justify-center items-center">
                                        <div className="w-full h-full bg-white">
                                            {/* Se puede reutilizar o cambiar el componente según el gráfico requerido */}
                                            <DeadlinedependenceB />
                                        </div>
                                    </div>
                                </Card>
                                <Card>
                                    <div className="border-b border-tremor-border dark:border-dark-tremor-border">
                                        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                            Title 5
                                        </h3>
                                    </div>
                                    <div className="h-80 bg-red-200 flex justify-center items-center">
                                        <div className="w-full h-full bg-white">
                                            {/* Se puede reutilizar o cambiar el componente según el gráfico requerido */}
                                            <DeadlineBarChartI />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* SEGUNDA FILA: Código proporcionado para gráficos 2 y 3 */}
                    <div className="grid grid-cols-12 gap-3">
                        {/* Gráfico 2 */}
                        <Card className="col-span-6">
                            <div className="border-b border-tremor-border dark:border-dark-tremor-border">
                                <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Title
                                </h3>
                            </div>
                            <div className="h-72 bg-red-200 flex justify-center items-center">
                                <div className="w-full h-full bg-white">
                                    <DeadlineBarChartI />
                                </div>
                            </div>
                        </Card>

                        {/* Gráfico 3 */}
                        <Card className="col-span-6">
                            <div className="border-b border-tremor-border dark:border-dark-tremor-border">
                                <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Title
                                </h3>
                            </div>
                            <div className="h-72 bg-red-200 flex justify-center items-center">
                                <div className="w-full h-full bg-white">
                                    <DeadlineBarChartI />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* TERCERA FILA: Tabla */}
                    <Card>
                        <div className="border-b border-tremor-border dark:border-dark-tremor-border">
                            <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                Title
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
