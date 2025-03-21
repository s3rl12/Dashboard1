import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function DeadlineBarChartY({
  title = "Título por defecto",
  legendData = [],
  xAxisData = [],
  seriesData = [],
  orientation = "horizontal", // <-- por defecto "horizontal"
}) {
  const chartRef = useRef(null);

  // Función para agrupar palabras en caso de ejes largos
  const chunkWords = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size).join(" "));
    }
    return result;
  };

  // Función para dividir el título en varias líneas (cada 8 palabras)
  const chunkTitle = (text) => {
    const words = text.split(" ");
    const chunked = chunkWords(words, 8);
    return chunked.join("\n");
  };

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    // Título multiline
    const multilineTitle = chunkTitle(title);

    // Configurar ejes dependiendo de la orientación
    let xAxisConfig = {};
    let yAxisConfig = {};

    if (orientation === "vertical") {
      // Gráfico “vertical”: el eje categórico va en Y
      // xAxis => value, yAxis => category
      xAxisConfig = { type: "value" };
      yAxisConfig = {
        type: "category",
        data: xAxisData,
        axisLabel: {
          fontSize: 10,
          interval: 0,
          formatter: (value) => {
            // Dividir el label en bloques de 4 palabras y usar salto de línea
            const words = value.split(" ");
            const chunked = chunkWords(words, 15); // agrupa cada 4 palabras
            return chunked.join("\n");            // une con salto de línea
          },
        },
      };
    } else {
      // Gráfico “horizontal”: el eje categórico va en X
      // xAxis => category, yAxis => value
      xAxisConfig = {
        type: "category",
        data: xAxisData,
        axisLabel: {
          fontSize: 10,
          interval: 0,
          formatter: (value) => {
            // Ejemplo para recortar a 5 palabras + "..."
            const words = value.split(" ");
            if (words.length <= 2) {
              return chunkWords(words, 1).join("\n");
            }
            const firstFive = words.slice(0, 5);
            return chunkWords(firstFive, 1).join("\n") + "...";
          },
        },
      };
      yAxisConfig = { type: "value" };
    }

    const option = {
      title: {
        text: multilineTitle,
        left: "center",
        textStyle: {
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      legend: {
        data: legendData,
        top: 20,
      },
      grid: {
        top: "15%",
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: xAxisConfig,
      yAxis: yAxisConfig,
      series: seriesData.map((serie) => ({
        ...serie,
        label: {
          show: true,
          // Para “vertical” es mejor que la etiqueta vaya a la derecha (“right”),
          // para “horizontal” en la parte superior (“top”).
          position: orientation === "vertical" ? "right" : "top",
          fontSize: 10,
          formatter: "{c}",
          ...serie.label,
        },
      })),
    };

    chartInstance.setOption(option);

    const handleResize = () => chartInstance.resize();
    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      chartInstance.resize();
    });
    resizeObserver.observe(chartRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      chartInstance.dispose();
    };
  }, [title, legendData, xAxisData, seriesData, orientation]);

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
