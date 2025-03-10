import React from "react";
import { Input } from "../../../../components/ui/Input";
import { DateRangePicker } from "../../../../components/ui/DatePicker";
import { Divider } from "../../../../components/ui/Divider";
export default function FilterHeader() {
    return (
        <div className="space-y-3">
            <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                REPORTES ESTADÍSTICOS
            </h3>
            <p>Se genera el reporte general de todas las areas</p>
            <div className="block md:flex md:items-center md:justify-between pt-2">
                <Input
                    placeholder="Busque sede..."
                    className="h-9 w-full rounded-tremor-small md:max-w-sm"
                    
                />
                <div className="lg:flex lg:items-center lg:space-x-3">
                    {/* Segundo Control: Date filter */}
                    <DateRangePicker
                        defaultValue={{
                            from: new Date(new Date().setDate(new Date().getDate() - 10)),
                            to: new Date(),
                        }}
                        id="date_1"
                        name="date_1"
                        className=" border-tremor-border dark:border-dark-tremor-border"
                    />
                </div>
            </div>
        </div>
    );
}
