import React from "react";
import { IconUser } from "@tabler/icons-react";
import logoMP from "../../../../assets/icons/logoMP.svg";
import TaxBurdenHeader from "./TaxBurdenHeader";
// Versión dinámica de DeadlineBarChartY
import DeadlineBarChartY from "../../DeadlineControl/components/charts/DeadlineBarChartY";
// Versión dinámica de ChartPie
import ChartPie from "../../DeadlineControl/components/charts/ChartPie";
import ChartGauge from "../../DeadlineControl/components/charts/Chartgauge";
export default function DetailedTaxBurden() {
  return (
    <div
      id="detailedTaxBurden"
      className="w-full bg-white shadow border border-gray-200 text-gray-700 text-sm font-sans"
    >
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

            {/* Sección Central: Datos del fiscal */}
            <td
              className="align-top border border-gray-300 m-0 p-0"
              style={{ width: "75%" }}
            >
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="border-b border-r border-gray-300 p-1 py-2 font-medium align-top">
                      Nombre:
                    </td>
                    <td className="border-b border-gray-300 p-1 py-2">
                      CAMACHO CCORRA MARCOS EMERSON EMERSON
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-r border-gray-300 p-1 py-2 font-medium align-top">
                      Dependencia:
                    </td>
                    <td className="border-b border-gray-300 p-1 py-2">
                      2° FISCALÍA PENAL SUPRA/PROVINCIAL TRANSITORIA ESPECIALIZADA EN
                      DERECHOS HUMANOS E INTERCULTURALIDAD - MADRE DE DIOS
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-gray-300 p-1 py-2 font-medium align-top">
                      Despacho:
                    </td>
                    <td className="border-gray-300 p-1 py-2">1° Despacho</td>
                  </tr>
                </tbody>
              </table>
            </td>

            {/* Sección Derecha: Logo */}
            <td
              className="align-top text-center border border-gray-300"
              style={{ width: "25%" }}
            >
              <div className="flex items-center justify-center">
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
              <table className="w-full h-full border-collapse">
                <tbody>
                  <tr>
                    {/* Casos de condición por años */}
                    <td className="p-2" style={{ width: "70%" }}>
                      <DeadlineBarChartY
                        title="Casos de condición por años"
                        legendData={["Casos Ingresados", "Casos resueltos", "Casos en trámites"]}
                        xAxisData={["2015", "2016", "2017", "2018", "2019"]}
                        seriesData={[
                          {
                            name: "Casos Ingresados",
                            type: "bar",
                            data: [10, 7, 5, 9, 4],
                            itemStyle: { color: "#1E87F0" },
                          },
                          {
                            name: "Casos resueltos",
                            type: "bar",
                            data: [2, 3, 2, 4, 3],
                            itemStyle: { color: "#FA9E00" },
                          },
                          {
                            name: "Casos en trámites",
                            type: "bar",
                            data: [1, 2, 0, 1, 2],
                            itemStyle: { color: "#08B714" },
                          },
                        ]}
                      />
                    </td>

                    {/* Productividad fiscal (Pie) */}
                    <td className="border-l border-gray-300 p-2" style={{ width: "30%" }}>
                      <ChartGauge
                        title="Productividad fiscal"
                        value={90}
                        progressWidth={20}
                        axisLineWidth={20}
                        detailFontSize={50}                     
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* 3.ª Sección (50% / 50%) */}
          <tr>
            <td colSpan={1} className="border border-gray-300 p-0 h-96">
              <table className="w-full h-full border-collapse">
                <tbody>
                  <tr>
                    <td className="p-2" style={{ width: "50%" }}>
                      <ChartPie
                        title="Total de casos por condición"
                        seriesName="Fases"
                        seriesData={[
                          { value: 80, name: "Rsultado", itemStyle: { color: "#1E87F0" } },
                          { value: 1, name: "Ejecucion de Sentencia", itemStyle: { color: "#FA9E00" } },
                          { value: 18, name: "En tramite", itemStyle: { color: "#08B714" } },
                          { value: 1, name: "Expediente", itemStyle: { color: "#E86868" } },
                        ]}
                      />
                    </td>
                    <td className="border-l border-gray-300 p-2" style={{ width: "50%" }}>
                      <ChartPie
                        title="Casos por mes actual"
                        seriesName="Fases"
                        seriesData={[
                          { value: 50, name: "Rsultado", itemStyle: { color: "#1E87F0" } },
                          { value: 20, name: "Ejecucion de Sentencia", itemStyle: { color: "#FA9E00" } },
                          { value: 20, name: "En tramite", itemStyle: { color: "#08B714" } },
                          { value: 10, name: "Expediente", itemStyle: { color: "#E86868" } },
                        ]}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Ejemplo extra de DeadlineBarChartY */}
          <tr>
            <td colSpan={1} className="border border-gray-300 p-0 h-96">
              <table className="w-full h-full border-collapse">
                <tbody>
                  <tr>
                    <td className="p-2" style={{ width: "100%" }}>
                      <DeadlineBarChartY
                        title="Casos de condición por años"
                        legendData={["Casos Ingresados", "Casos resueltos", "Casos en trámites"]}
                        xAxisData={[
                          "enero", "febrero", "marzo", "abril", "mayo", "junio",
                          "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
                        ]}
                        seriesData={[
                          {
                            name: "Casos Ingresados",
                            type: "bar",
                            data: [10, 7, 5, 9, 4, 3, 5, 6, 7, 8, 2, 4],
                            itemStyle: { color: "#1E87F0" },
                          },
                          {
                            name: "Casos resueltos",
                            type: "bar",
                            data: [2, 3, 2, 4, 3, 3, 5, 6, 7, 6, 7, 1],
                            itemStyle: { color: "#FA9E00" },
                          },
                          {
                            name: "Casos en trámites",
                            type: "bar",
                            data: [1, 2, 0, 1, 2, 3, 2, 4, 3, 3, 2, 5],
                            itemStyle: { color: "#08B714" },
                          },
                        ]}
                      />
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
