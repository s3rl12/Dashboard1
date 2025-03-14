import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";


// Si requieres compatibilidad con navegadores antiguos:
// import ResizeObserver from 'resize-observer-polyfill';

export default function DeadlineBarChartY({
  title = "Título por defecto",
  legendData = [],
  xAxisData = [],
  seriesData = [],
}) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Función para agrupar palabras en caso de ejes largos
  const chunkWords = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size).join(" "));
    }
    return result;
  };

  /**
   * Toma el 'title' y cada 4 palabras hace un salto de línea
   */
  const chunkTitle = (text) => {
    const words = text.split(" ");
    // Agrupar cada 4 palabras
    const chunked = chunkWords(words, 8);
    // Unir con saltos de línea
    return chunked.join("\n");
  };

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);
    chartInstanceRef.current = chartInstance;

    // Dividir el título en líneas cada 4 palabras
    const multilineTitle = chunkTitle(title);

    // Construir opciones
    const option = {
      title: {
        text: multilineTitle,
        left: 'center',
        textStyle: {
          fontSize: 14,  // <-- aplicamos el nuevo prop en el tamaño de fuente
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      legend: {
        data: legendData,
        top: 30,
      },
      grid: {
        top: "20%",
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: xAxisData,
        axisLabel: {
          fontSize: 12,
          
          interval: 0,
          formatter: (value) => {
            // Dividir el label del eje X si es muy largo
            const words = value.split(" ");
            if (words.length <= 2) {
              return chunkWords(words, 1).join("\n");
            }
            const firstFive = words.slice(0, 5);
            return chunkWords(firstFive, 1).join("\n") + "...";
          },
        },
      },
      yAxis: {
        type: "value",
      },
      series: seriesData.map((serie) => ({
        ...serie,
        label: {
          show: true,
          position: "top",
          fontSize: 12,
          formatter: "{c}",
          ...serie.label, // Permite sobrescribir label si se desea
        },
      })),
    };

    chartInstance.setOption(option);

    // Manejar resize
    const handleResize = () => chartInstance.resize();
    window.addEventListener("resize", handleResize);

    // ResizeObserver si es necesario
    const resizeObserver = new ResizeObserver(() => {
      chartInstance.resize();
    });
    resizeObserver.observe(chartRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      chartInstance.dispose();
    };
  }, [title, legendData, xAxisData, seriesData]);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
