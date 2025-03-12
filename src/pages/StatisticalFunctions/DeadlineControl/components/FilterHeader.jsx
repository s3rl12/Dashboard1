import React from "react";
import { Input } from "../../../../components/ui/Input";
import { DateRangePicker } from "../../../../components/ui/DatePicker";
import { Button } from "../../../../components/ui/Button";
import { IconFileDownload } from '@tabler/icons-react'
export default function FilterHeader() {
    return (
        <div className="space-y-2">
            <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                REPORTE GENERAL
            </h3>
            <p>Se genera el reporte general de todas las areas</p>
            <div className="block md:flex md:items-center md:justify-between">
                <div className="flex items-center w-full space-x-2 gap-2">
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
                <Button
                        
                        variant="secondary" 
                        className="flex items-center justify-center gap-x-1 rounded-tremor-small py-1.5 px-3 font-medium"
                    >
                        <IconFileDownload
                            className="size-5 shrink-0 text-tremor-content dark:text-dark-tremor-content"
                            aria-hidden={true}
                        />
                        Imprimir
                    </Button>
            </div>
        </div>
    );
}
