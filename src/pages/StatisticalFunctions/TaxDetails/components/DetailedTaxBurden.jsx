import React from "react";
import { IconUser } from "@tabler/icons-react";
import logoMP from "../../../../assets/icons/logoMP.svg";

export default function DetailedTaxBurden() {
    return (
        <div className="w-full bg-white shadow border border-gray-200 text-gray-700 text-sm font-sans">
            {/* Encabezado superior */}
            <div className="flex items-center justify-between bg-gray-100 px-4 py-2">
                <h2 className="text-base font-semibold uppercase text-gray-800">
                    CARGA FISCAL
                </h2>
                <span className="text-xs text-gray-600">
                    Fecha de actualización&nbsp;
                    <strong>15/03/2025</strong>
                </span>
            </div>

            {/* Contenido principal en tabla */}
            <table className="w-full border-collapse">
                <tbody>
                    <tr>
                        {/* Sección Izquierda: Ícono y estado */}
                        <td className="p-2 align-top text-center" style={{ width: "10%" }}>
                            <div className="flex flex-col items-center gap-1">
                                <IconUser className="w-12 h-12 text-gray-600" aria-hidden="true" />
                                <span className="text-green-700 bg-green-100 border border-green-300 px-2 py-1 rounded text-xs font-medium">
                                    activo
                                </span>
                            </div>
                        </td>

                        {/* Sección Central: Datos del fiscal (más ancha) */}
                        <td className="p-2 align-top" style={{ width: "60%" }}>
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td className="font-medium pr-2 align-top">Nombre:</td>
                                        <td>CAMACHO CCORRA MARCOS EMERSON EMERSON</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium pr-2 align-top">Dependencia:</td>
                                        <td>
                                            2° FISCALÍA PENAL SUPRA/PROVINCIAL TRANSITORIA ESPECIALIZADA EN
                                            DERECHOS HUMANOS E INTERCULTURALIDAD - MADRE DE DIOS
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium pr-2 align-top">Despacho:</td>
                                        <td>1° Despacho</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>

                        {/* Sección Derecha: Logo y código de barras */}
                        <td className="align-top text-center" style={{ width: "30%" }}>
                            {/* Logo del Ministerio Público */}
                            <div className="flex items-center justify-center">
                                <img
                                    src={logoMP}
                                    alt="Ministerio Público"
                                    className="w-32 h-32 object-contain"
                                />
                            </div>
                            
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Pie con "RESUMEN" */}
            <div className="bg-gray-100 px-4 py-2">
                <strong className="uppercase text-gray-800">Resumen</strong>
            </div>
        </div>
    );
}
