import React from "react";
import Card from "../../../../components/ui/Card";
import FilterHeader from "./filterHeader";
import SideContent from "./SideContent";
import DeadlineBarChart from "./charts/DeadlineBarChart";
import DeadlineBarChartY from "./charts/DeadlineBarChartY";
import DeadlineBarChartI from "./charts/DeadlineBarChartI";
import TableDeadline from "./charts/TableDeadline";
import DeadlineHeader from "./charts/DeadlineHeader"; // DashboardHeader

export default function DeadlineControlReport() {
    // Datos estáticos de ejemplo
    const dummyWorkspaces = [
        { name: "Dependencia 1", code: "SC", casos: 14, status: "active", telefono: "999 999 999" },
        { name: "Dependencia 2", code: "D2", casos: 7, status: "inactive", telefono: "999 999 999" },
        { name: "Dependencia 3", code: "D3", casos: 4, status: "active", telefono: "999 999 999" },
    ];

    return (
        <div className="p-2 space-y-2 min-h-screen">
            <FilterHeader pdfTargetId="DeadlineControlReport" />

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
                <div id="DeadlineControlReport" className="col-span-9 space-y-3">
                    {/* DashboardHeader (Header del reporte) */}
                    <div className="flex items-center justify-between bg-[#274E94] px-4">
                        <h2 className="text-base font-semibold text-white uppercase py-3">
                            CONTROL DE PLAZOS
                        </h2>
                        <span className="text-xs text-white">
                            Fecha de actualización&nbsp;
                            <strong>15/03/2025</strong>
                        </span>
                    </div>
                    {/* DashboardHeader (Header del reporte) */}
                    <DeadlineHeader />

                    {/* Gráfico 1 */}
                    <Card>

                        <div className="h-96 flex justify-center items-center">
                            <div className="flex-1 w-full h-full">
                                <DeadlineBarChartY
                                    title="Fiscalias por su control de plazos"
                                    legendData={["Dentro de plazos", "Plazos por vencer", "Plazos vencidos"]}
                                    xAxisData={["FISCALIA PROVINCIAL ESPECIALIZADA CONTRA LA CRIMINALIDAD ORGANIZADA DE MADRE DE DIOS", "FISCALIA PROVINCIAL ESPECIALIZADA CONTRA LA CRIMINALIDAD ORGANIZADA DE MADRE DE DIOS", "FISCALIA PROVINCIAL ESPECIALIZADA CONTRA LA CRIMINALIDAD ORGANIZADA DE MADRE DE DIOS", "FISCALIA PROVINCIAL ESPECIALIZADA CONTRA LA CRIMINALIDAD ORGANIZADA DE MADRE DE DIOS", "FISCALIA PROVINCIAL ESPECIALIZADA CONTRA LA CRIMINALIDAD ORGANIZADA DE MADRE DE DIOS", "FISCALIA PROVINCIAL ESPECIALIZADA CONTRA LA CRIMINALIDAD ORGANIZADA DE MADRE DE DIOS", "FISCALIA PROVINCIAL ESPECIALIZADA CONTRA LA CRIMINALIDAD ORGANIZADA DE MADRE DE DIOS"]}
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

                    {/* Gráfico 2 y Gráfico 3 en dos columnas */}
                    <div className="grid grid-cols-12 gap-3">
                        {/* Gráfico 2 */}
                        <Card className="col-span-6">
                            <div className="h-80 bg-red-200 flex justify-center items-center">
                                <div className="w-full h-full bg-white">
                                    <DeadlineBarChartY
                                        title="FISCALIA PROVINCIAL ESPECIALIZADA CONTRA LA CRIMINALIDAD ORGANIZADA DE MADRE DE DIOS"
                                        legendData={["Dentro de plazos", "Plazos por vencer", "Plazos vencidos"]}
                                        xAxisData={["2015", "2016", "2017", "2018", "2019"]}
                                        seriesData={[
                                            {
                                                name: "Dentro de plazos",
                                                type: "bar",
                                                data: [10, 7, 5, 9, 4],
                                                itemStyle: { color: "#008000" },
                                            },
                                            {
                                                name: "Plazos por vencer",
                                                type: "bar",
                                                data: [2, 3, 2, 4, 3],
                                                itemStyle: { color: "#FFD700" },
                                            },
                                            {
                                                name: "Plazos vencidos",
                                                type: "bar",
                                                data: [1, 2, 0, 1, 2],
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
                                        title="Fiscalias por ingreso de plazos por años"
                                        legendData={["Dentro de plazos", "Plazos por vencer", "Plazos vencidos"]}
                                        xAxisData={["FISCALIA PROVINCIAL ESPECIALIZADA CONTRA LA CRIMINALIDAD ORGANIZADA DE MADRE DE DIOS", "FISCALIA PROVINCIAL ESPECIALIZADA CONTRA LA CRIMINALIDAD ORGANIZADA DE MADRE DE DIOS", "2° FISCALIA PENAL SUPRAPROVINCIAL TRANSITORIA ESPECIALIZADA EN DERECHOS HUMANOS E INTERCULTURALIDAD-MADRE DE DIOS", "2° FISCALIA PENAL SUPRAPROVINCIAL TRANSITORIA ESPECIALIZADA EN DERECHOS HUMANOS E INTERCULTURALIDAD-MADRE DE DIOS", "2° FISCALIA PENAL SUPRAPROVINCIAL TRANSITORIA ESPECIALIZADA EN DERECHOS HUMANOS E INTERCULTURALIDAD-MADRE DE DIOS"]}
                                        seriesData={[
                                            {
                                                name: "Dentro de plazos",
                                                type: "bar",
                                                data: [10, 7, 5, 9, 4],
                                                itemStyle: { color: "#008000" },
                                            },
                                            {
                                                name: "Plazos por vencer",
                                                type: "bar",
                                                data: [2, 3, 2, 4, 3],
                                                itemStyle: { color: "#FFD700" },
                                            },
                                            {
                                                name: "Plazos vencidos",
                                                type: "bar",
                                                data: [1, 2, 0, 1, 2],
                                                itemStyle: { color: "#FF0000" },
                                            },
                                        ]}
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Tabla */}
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
