import React from "react";
import { IconUser } from "@tabler/icons-react";
import logoMP from "../../../../assets/icons/logoMP.svg";
import TaxBurdenHeader from "./TaxBurdenHeader";
import DeadlineBarChartY from "../../DeadlineControl/components/charts/DeadlineBarChartY";
import ChartPie from "../../DeadlineControl/components/charts/ChartPie";

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
            <td
              className="p-2 align-top text-center border border-gray-300"
              style={{ width: "10%" }}
            >
              <div className="flex flex-col items-center gap-1">
                <IconUser className="w-12 h-12 text-gray-600" aria-hidden="true" />
                <span className="text-green-700 bg-green-100 border border-green-300 px-2 py-1 rounded text-xs font-medium">
                  activo
                </span>
              </div>
            </td>

            {/* Sección Central: Datos del fiscal (más ancha) */}
            <td
              className="align-top border border-gray-300 m-0 p-0"
              style={{ width: "70%" }}
            >
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="border-b border-r border-gray-300 p-1 font-medium align-top">
                      Nombre:
                    </td>
                    <td className="border-b border-gray-300 p-1">
                      CAMACHO CCORRA MARCOS EMERSON EMERSON
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-r border-gray-300 p-1 font-medium align-top">
                      Dependencia:
                    </td>
                    <td className="border-b border-gray-300 p-1">
                      2° FISCALÍA PENAL SUPRA/PROVINCIAL TRANSITORIA ESPECIALIZADA EN
                      DERECHOS HUMANOS E INTERCULTURALIDAD - MADRE DE DIOS
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-gray-300 p-1 font-medium align-top">
                      Despacho:
                    </td>
                    <td className="border-gray-300 p-1">1° Despacho</td>
                  </tr>
                </tbody>
              </table>
            </td>

            {/* Sección Derecha: Logo (y código de barras si aplica) */}
            <td
              className="align-top text-center border border-gray-300"
              style={{ width: "30%" }}
            >
              <div className="flex items-center justify-center mb-2">
                <img
                  src={logoMP}
                  alt="Ministerio Público"
                  className="w-24 h-24 object-contain"
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

      {/* NUEVA TABLA DEBAJO DEL "RESUMEN" */}
      <table className="w-full border-collapse">
        <tbody>
          {/* 1.ª Sección (100%) */}
          <tr>
            <td colSpan={1} className="border border-gray-300 p-2" style={{ width: "100%" }}>
              {/* Tabla anidada para la 1.ª Sección */}
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <td>
                      <TaxBurdenHeader />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* 2.ª Sección (70% / 30%) => Se incrementa la altura con h-96 */}
          <tr>
            <td colSpan={1} className="border border-gray-300 p-0 h-96">
              {/* Tabla anidada para la 2.ª Sección */}
              <table className="w-full h-full border-collapse">
                <tbody>
                  <tr>
                    <td className="p-2" style={{ width: "70%" }}>
                      <DeadlineBarChartY />
                    </td>
                    <td className="border-l border-gray-300 p-2" style={{ width: "30%" }}>
                      <ChartPie />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* 3.ª Sección (50% / 50%) */}
          <tr>
            <td colSpan={1} className="border border-gray-300 p-0">
              {/* Tabla anidada para la 3.ª Sección */}
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="p-2" style={{ width: "50%" }}>
                      <p className="text-center">Sección 3 (50%)</p>
                    </td>
                    <td className="border-l border-gray-300 p-2" style={{ width: "50%" }}>
                      <p className="text-center">Sección 3 (50%)</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="bg-gray-100 px-4 py-2">
        <strong className="uppercase text-gray-800">Lista de casos ingresados</strong>
      </div>
    </div>
  );
}
