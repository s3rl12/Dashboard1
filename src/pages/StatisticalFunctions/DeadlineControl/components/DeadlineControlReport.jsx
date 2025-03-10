import React from "react";
import Card from "../../../../components/ui/Card";
import FilterHeader from "./filterHeader";
import SideContent from "./SideContent";
// Importa el nuevo archivo de la gráfica
import DeadlineBarChart from "./charts/DeadlineBarChart";

export default function DeadlineControlReport() {
    // Datos estáticos de ejemplo
    const dummyWorkspaces = [
        {
            name: "Dependencia 1",
            code: "SC",
            casos: 14,
            status: "active",
            telefono: "999 999 99",
        },
        {
            name: "Dependencia 2",
            code: "D2",
            casos: 7,
            status: "inactive",
            telefono: "999 999 999",
        },
        {
            name: "Dependencia 3",
            code: "D3",
            casos: 4,
            status: "active",
            telefono: "999 999 999",
        },
    ];

    return (
        <div className="p-2 space-y-2 ">
            <FilterHeader />

            <div className="grid grid-cols-12 grid-rows-12 gap-3">
                {/* Div 1 */}
                <Card className="col-start-1 col-end-4 row-start-1 row-end-4">
                    <div className="border-b border-tremor-border px-1 py-2 dark:border-dark-tremor-border">
                        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Sede Seleccionada
                        </h3>
                    </div>
                    <div className="h-40 p-2">
                        <h2>Sede central</h2>
                        <p>Código: <span>SC</span></p>
                        <p>Cantidad dependencias: <span>14</span></p>
                    </div>
                </Card>

                {/* Div 2: Dependencias relacionadas */}
                <Card className="col-start-1 col-end-4 row-start-4 row-end-13">
                    <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Dependencias relacionadas
                        </h3>
                    </div>
                    <div className="p-2">
                        <SideContent workspaces={dummyWorkspaces} />
                    </div>
                </Card>

                {/* Div 3: Aquí va tu gráfica */}
                <Card className="col-start-4 col-end-13 row-start-1 row-end-6">
                    <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Control de Plazos
                        </h3>
                    </div>
                    {/* Ajusta la altura para que la gráfica se vea bien */}
                    <div className="h-72 bg-red-200 flex justify-center items-center">
                        <div className="w-full  h-full bg-white">
                            <DeadlineBarChart />
                        </div>
                    </div>
                </Card>

                {/* Div 4 */}
                <Card className="col-start-4 col-end-8 row-start-6 row-end-9">
                    <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Title
                        </h3>
                    </div>
                    <div className="h-40 p-2">
                        {/* Contenido Div 4 */}
                    </div>
                </Card>

                {/* Div 5 */}
                <Card className="col-start-8 col-end-13 row-start-6 row-end-9">
                    <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Title
                        </h3>
                    </div>
                    <div className="h-40 p-2">
                        {/* Contenido Div 5 */}
                    </div>
                </Card>

                {/* Div 6 */}
                <Card className="col-start-4 col-end-13 row-start-9 row-end-13">
                    <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Title
                        </h3>
                    </div>
                    <div className="h-40 p-2">
                        {/* Contenido Div 6 */}
                    </div>
                </Card>
            </div>
        </div>
    );
}
