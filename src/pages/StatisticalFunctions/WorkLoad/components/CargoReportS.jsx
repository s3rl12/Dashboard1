import React, { useState } from "react";
import Card from "../../../../components/ui/Card";
import FilterHeader from "../../DeadlineControl/components/filterHeader";
import SideContent from '../../DeadlineControl/components/SideContent';
import DeadlineHeader from '../../DeadlineControl/components/charts/DeadlineHeader';
import TableDeadline from "../../DeadlineControl/components/charts/TableDeadline";

import ChartBarLine from "../../DeadlineControl/components/charts/ChartBarLine";
import DeadlineBarChartY from "../../DeadlineControl/components/charts/DeadlineBarChartY";
import DeadlinedependenceB from "../../DeadlineControl/components/charts/DeadlinedependenceB";

// Importar componentes Select
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "../../../../components/dashboard/Select";
import { Input } from "../../../../components/ui/Input";

// Importar el Query Client de react-query para obtener los datos en caché
import { useQueryClient } from '@tanstack/react-query';

export default function CargoReportS() {
    // Estado para el texto de búsqueda en el Select
    const [searchText, setSearchText] = useState("");

    // Lista estática de ejemplo para el select (para el filtro, se mantiene sin cambios)
    const staticOptions = ["Opción A", "Opción B", "Opción C", "Opción D", "Opción E"];
    const filteredOptions = staticOptions.filter((opt) =>
        opt.toLowerCase().includes(searchText.toLowerCase())
    );

    // Obtener los datos almacenados por la llamada useCargaFiscal mediante react-query
    const queryClient = useQueryClient();
    const cargaFiscalCache = queryClient.getQueryData(["carga-fiscal"]);
    // Como el hook useCargaFiscal retorna directamente el objeto de datos de la API,
    // usamos la data directamente sin acceder a una propiedad "data"
    const apiData = cargaFiscalCache || {};

    // Extraer la data general de la sede (se asume que es un array con un objeto)
    const generalSede = apiData.data_generalSede?.[0] || { Nombre: "Sede central", Total_Dependencias: "14" };
    console.log("datos", generalSede);

    // Extraer la lista de dependencias
    const listDependencias = apiData.list_dependencias || [];

    // Extraer la data de graf_ingreso_caso_depens
    const grafData = apiData.graf_ingreso_caso_depens || [];

    // Construir xAxisData y las series a partir de graf_ingreso_caso_depens
    const xAxisData = grafData.map((item) => item.Dependencia);
    const casosResueltosData = grafData.map((item) => item.Casos_Concluidos);
    const casosIngresadosData = grafData.map((item) => item.Casos_Ingresados);

    // Transformar los datos de la API para que SideContent reciba el formato esperado
    const transformedWorkspaces = listDependencias.map((dep) => ({
        name: dep.Nombre_Dep,
        code: dep.Codigo_Dependencia,
        casos: dep.Casos_Ingresados,
        status: dep.Estado === "activo" ? "active" : "inactive",
        telefono: dep.Telefono,
    }));

    return (
        <div className="p-2 space-y-2 min-h-screen">
            <FilterHeader pdfTargetId="CargoReportS" />

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
                            {/* Usar datos de la API para mostrar el nombre de la sede y cantidad de dependencias */}
                            <h2 className="font-medium text-base">
                                {generalSede.Nombre}
                            </h2>
                            <p className="font-medium text-base">
                                Código: <span className="font-normal text-sm">SC</span>
                            </p>
                            <p className="font-medium text-base">
                                Cantidad dependencias: <span className="font-normal text-sm">
                                    {generalSede.Total_Dependencias}
                                </span>
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
                            {/* Pasar los datos transformados al componente SideContent */}
                            <SideContent workspaces={transformedWorkspaces} />
                        </div>
                    </Card>
                </div>

                {/* Columna derecha */}
                <div id="CargoReportS" className="col-span-9 space-y-3">
                    {/* Encabezado */}
                    <div className="flex items-center justify-between bg-[#274E94] px-4">
                        <h2 className="text-base font-semibold text-white uppercase py-3">
                            CARGA LABORAL
                        </h2>
                        <span className="text-xs text-white">
                            Fecha de actualización&nbsp;
                            <strong>15/03/2025</strong>
                        </span>
                    </div>
                    {/* Se pasa generalSede a DeadlineHeader */}
                    <DeadlineHeader generalSede={generalSede} />

                    {/* Gráfico 1 */}
                    <Card>
                        <div className="h-96 flex justify-center items-center">
                            <div className="flex-1 w-full h-full">
                                <ChartBarLine
                                    title="Casos ingresados y resueltos por dependencias"
                                    legendData={["casos resueltos", "casos ingresados"]}
                                    xAxisData={xAxisData}
                                    seriesData={[
                                        {
                                            name: "casos resueltos",
                                            type: "bar",
                                            stack: "Ad",
                                            data: casosResueltosData,
                                        },
                                        {
                                            name: "casos resueltos",
                                            type: "line",
                                            data: casosResueltosData,
                                        },
                                        {
                                            name: "casos ingresados",
                                            type: "bar",
                                            data: casosIngresadosData,
                                        },
                                        {
                                            name: "casos ingresados",
                                            type: "line",
                                            data: casosIngresadosData,
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
                            <div className="py-2 w-full bg-white">
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona una dependencia" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-60 overflow-y-auto">
                                        {/* Input de búsqueda */}
                                        <div className="px-2 py-1">
                                            <Input
                                                placeholder="Search addresses"
                                                id="search"
                                                name="search"
                                                type="search"
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                            />
                                        </div>

                                        {/* Opciones filtradas */}
                                        {filteredOptions.map((option) => (
                                            <SelectItem key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="h-96 flex justify-center items-center">
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

                        {/* Gráfico 3 */}
                        <Card className="col-span-6">
                            <div className="h-96 bg-red-200 flex justify-center items-center">
                                <div className="w-full h-full bg-white">
                                    <DeadlinedependenceB
                                        title="Ranking de 5 dependencias con mayor casos resueltos *"
                                        yAxisData={[
                                            "FISCALIA PROVINCIAL ... MADRE DE DIOS",
                                            "FISCALIA PROVINCIAL ... MADRE DE DIOS",
                                            "FISCALIA PROVINCIAL ... MADRE DE DIOS",
                                        ]}
                                        seriesData={[10, 20, 5]}
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Tabla */}
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
                </div>
            </div>
        </div>
    );
}
