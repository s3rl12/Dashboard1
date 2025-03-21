import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
// import ResizeObserver from 'resize-observer-polyfill'; // Si necesitas compatibilidad con navegadores antiguos

export default function ChartPie({
  title,
  subtext,
  seriesName = "Access From",
  seriesData = [],
}) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Función para formatear el título: inserta un salto de línea cada 4 palabras
  const formatTitle = (str) => {
    if (!str) return "";
    const words = str.split(" ");
    let formatted = "";
    for (let i = 0; i < words.length; i++) {
      formatted += words[i] + (((i + 1) % 4 === 0 && (i + 1) < words.length) ? "\n" : " ");
    }
    return formatted.trim();
  };

  // Se formatea el título recibido
  const formattedTitle = formatTitle(title);

  useEffect(() => {
    // 1. Inicializar ECharts en el div
    const chartInstance = echarts.init(chartRef.current);
    chartInstanceRef.current = chartInstance;

    // Nueva configuración para el gráfico de Pie
    const option = {
      title: {
        text: formattedTitle,
        subtext: subtext,
        left: "center",
        textStyle: {
          fontSize: 14,  // <-- aplicamos el nuevo prop en el tamaño de fuente
        },
      },
      tooltip: {
        trigger: "item",
      },
      grid: {
        top: "10%",
        containLabel: true,
      },
      series: [
        {
          name: seriesName,
          type: "pie",
          radius: "30%",
          data: seriesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          label: {
            show: true,
            fontSize: 10,
            formatter: "{b} : {c}", // Muestra nombre y valor
          },
        },
      ],
    };

    // Asignar opciones
    chartInstance.setOption(option);

    // 2. Ajustar gráfica al cambiar tamaño de ventana
    const handleResize = () => {
      chartInstance.resize();
    };
    window.addEventListener("resize", handleResize);

    // 3. Usar ResizeObserver para detectar cambios en el contenedor (si lo requieres)
    const resizeObserver = new ResizeObserver(() => {
      chartInstance.resize();
    });
    resizeObserver.observe(chartRef.current);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      chartInstance.dispose();
    };
  }, [formattedTitle, subtext, seriesName, seriesData]);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",  // Ajuste dinámico al ancho del padre
        height: "100%", // Ocupa todo el alto que se le asigne externamente
      }}
    />
  );
}
