import React from "react";
import Card from "../../../../components/ui/Card";
import FilterHeader from "../../DeadlineControl/components/filterHeader";
import SideContent from '../../DeadlineControl/components/SideContent';
import DeadlineBarChart from "../../DeadlineControl/components/charts/DeadlineBarChart";
import DeadlineBarChartY from "../../DeadlineControl/components/charts/DeadlineBarChartY";
import DeadlineBarChartI from "../../DeadlineControl/components/charts/DeadlineBarChartI";
import TableDeadline from "../../DeadlineControl/components/charts/TableDeadline";
import DeadlineHeader from '../../DeadlineControl/components/charts/DeadlineHeader';
import ChartBarLine from "../../DeadlineControl/components/charts/ChartBarLine";
import DeadlinedependenceB from "../../DeadlineControl/components/charts/DeadlinedependenceB";
import ChartBar from '../../DeadlineControl/components/charts/ChartBar';

export default function CargoReportS() {
    // Datos estáticos de ejemplo
    const dummyWorkspaces = [
        { name: "Dependencia 1", code: "SC", casos: 14, status: "active", telefono: "999 999 999" },
        { name: "Dependencia 2", code: "D2", casos: 7, status: "inactive", telefono: "999 999 999" },
        { name: "Dependencia 3", code: "D3", casos: 4, status: "active", telefono: "999 999 999" },
    ];

    return (
        <div className="p-2 space-y-2 min-h-screen">
            <FilterHeader />

            <div className="grid grid-cols-12 gap-3 h-full">
                {/* Columna izquierda: Sede y Dependencias */}
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
                        <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                            <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                Dependencias relacionadas
                            </h3>
                        </div>
                        <div className="p-2 h-full">
                            <SideContent workspaces={dummyWorkspaces} />
                        </div>
                    </Card>
                </div>

                {/* Columna derecha: DashboardHeader + Gráficos y Tabla */}
                <div className="col-span-9 space-y-3">
                    {/* DashboardHeader (Header del reporte) */}
                    <DeadlineHeader />

                    {/* Gráfico 1 */}
                    <Card>
                        <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                            <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                Control de Plazos
                            </h3>
                        </div>
                        <div className="h-72 flex justify-center items-center">
                            <div className="flex-1 w-full h-full">
                                <ChartBarLine />
                            </div>
                        </div>
                    </Card>

                    {/* Gráfico 2 y Gráfico 3 en dos columnas */}
                    <div className="grid grid-cols-12 gap-3">
                        {/* Gráfico 2 */}
                        <Card className="col-span-6">
                            <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                                <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Title
                                </h3>
                            </div>
                            <div className="h-72 bg-red-200 flex justify-center items-center">
                                <div className="w-full h-full bg-white">
                                    <ChartBar />
                                </div>
                            </div>
                        </Card>

                        {/* Gráfico 3 */}
                        <Card className="col-span-6">
                            <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                                <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Title
                                </h3>
                            </div>
                            <div className="h-72 bg-red-200 flex justify-center items-center">
                                <div className="w-full h-full bg-white">
                                    <DeadlinedependenceB />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Tabla */}
                    <Card>
                        <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
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
