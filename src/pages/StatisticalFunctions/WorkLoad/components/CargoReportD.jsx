import React from "react";
import Card from "../../../../components/ui/Card";
import FilterHeader from "../../DeadlineControl/components/filterHeader";
import SideContent from "../../DeadlineControl/components/SideContent";
import ChartGauge from "../../DeadlineControl/components/charts/Chartgauge";
import DeadlineBarChartY from "../../DeadlineControl/components/charts/DeadlineBarChartY"; // Se usará para gráficos
import DeadlineBarChartI from "../../DeadlineControl/components/charts/DeadlineBarChartI"; // Se usará para gráficos
import TableDeadline from "../../DeadlineControl/components/charts/TableDeadline";
import DeadlineHeader from "../../DeadlineControl/components/charts/DeadlineHeader"; // DashboardHeader
import TaxData from "../../DeadlineControl/components/charts/TaxData";
import DeadlinedependenceB from "../../DeadlineControl/components/charts/DeadlinedependenceB";
import ChartBar from '../../DeadlineControl/components/charts/ChartBar';
import ChartPie from "../../DeadlineControl/components/charts/ChartPie";

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
                        <h2 className="text-base font-semibold text-white uppercase text-gray-800 py-3">
                            CARGA LABORAL
                        </h2>
                        <span className="text-xs text-white">
                            Fecha de actualización&nbsp;
                            <strong>15/03/2025</strong>
                        </span>
                    </div>
                    {/* DashboardHeader (Header del reporte) */}
                    <DeadlineHeader />

                    {/* Primera fila: División en dos secciones horizontales */}
                    <div className="grid grid-cols-12 gap-3">

                        <div className="col-span-4 flex flex-col h-full">
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

                        <div className="col-span-8 space-y-3">
                            {/* Grafico a expandir */}
                            <div className="grid grid-cols-1 gap-3">
                                <Card >
                                    <div className="h-80 bg-red-200 flex justify-center items-center">
                                        <div className="w-full h-full bg-white">
                                            <DeadlineBarChartY
                                                title="FISCALIA PROVINCIAL ESPECIALIZADA CONTRA LA CRIMINALIDAD ORGANIZADA DE MADRE DE DIOS"
                                                legendData={["casos resueltos", "casos ingresados"]}
                                                xAxisData={["2016", "2017", "2018", "2019", "2020"]}
                                                seriesData={[
                                                    {
                                                        name: "casos resueltos",
                                                        type: "bar",
                                                        data: [10, 7, 5, 9, 4, 4, 6],
                                                        itemStyle: { color: "#5470C6" },
                                                    },
                                                    {
                                                        name: "casos ingresados",
                                                        type: "bar",
                                                        data: [2, 3, 2, 4, 3, 4, 6],
                                                        itemStyle: { color: "#91CC75" },
                                                    },

                                                ]}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Card>
                                    <div className="h-80 bg-red-200 flex justify-center items-center">
                                        <div className="w-full h-full bg-white">
                                            {/* Se puede reutilizar o cambiar el componente según el gráfico requerido */}
                                            <ChartPie
                                                title="PORCENTAJE FISCAL POR CASOS RESUELTOS DEL ULTIMO MES"
                                                seriesName="Fases"
                                                seriesData={[
                                                    { value: 80, name: "Resultado", itemStyle: { color: "#5470C6" } },
                                                    { value: 1, name: "Ejecucion de Sentencia", itemStyle: { color: "#FA9E00" } },
                                                    { value: 18, name: "En tramite", itemStyle: { color: "#91CC75" } },
                                                    { value: 1, name: "Expediente", itemStyle: { color: "#E86868" } },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </Card>
                                <Card>

                                    <div className="h-80 bg-red-200 flex justify-center items-center">
                                        <div className="w-full h-full bg-white">
                                            {/* Se puede reutilizar o cambiar el componente según el gráfico requerido */}
                                            <DeadlineBarChartY
                                                title="ESTADO DE CASOS POR ESTADO FISCAL"
                                                legendData={["casos resueltos", "casos ingresados"]}
                                                xAxisData={["2016", "2017", "2018", "2019", "2020"]}
                                                seriesData={[
                                                    {
                                                        name: "casos resueltos",
                                                        type: "bar",
                                                        data: [10, 7, 5, 9, 4, 4, 6],
                                                        itemStyle: { color: "#5470C6" },
                                                    },
                                                    {
                                                        name: "casos ingresados",
                                                        type: "bar",
                                                        data: [2, 3, 2, 4, 3, 4, 6],
                                                        itemStyle: { color: "#91CC75" },
                                                    },

                                                ]}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* SEGUNDA FILA: Se modifica para mostrar solo un gráfico */}
                    <div className="grid grid-cols-12 gap-3">
                        {/* Gráfico 2 ahora ocupará todo el ancho */}
                        <Card className="col-span-12">

                            <div className="h-96 bg-red-200 flex justify-center items-center">
                                <div className="w-full h-full bg-white">
                                    <DeadlineBarChartY
                                        title="CANTIDAD DE ESTADO POR AÑOS"
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
