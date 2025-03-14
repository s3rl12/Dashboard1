import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
// import ResizeObserver from 'resize-observer-polyfill'; // Si necesitas compatibilidad con navegadores antiguos

export default function DeadlinedependenceB({
    title = "Título por defecto",
    yAxisData = [],
    seriesData = [],
}) {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    // Función para agrupar palabras en líneas (por si necesitas dividir nombres largos)
    const chunkWords = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size).join(" "));
        }
        return result;
    };

    useEffect(() => {
        // 1. Inicializar ECharts en el div
        const chartInstance = echarts.init(chartRef.current);
        chartInstanceRef.current = chartInstance;

        // Nueva configuración de la gráfica
        const option = {
            title: {
                text: title,
                left: "center",
                textStyle: {
                    fontSize: 14,  // <-- aplicamos el nuevo prop en el tamaño de fuente
                },
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow",
                },
            },
            legend: {},
            grid: {
                top: "8%",
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
            },
            xAxis: {
                type: "value",
                boundaryGap: [0, 0.01],
            },
            yAxis: {
                type: "category",
                data: yAxisData,
                axisLabel: {
                    fontSize: 12,
                    interval: 0, // Mostrar todas las etiquetas
                    // Opcionalmente, si quieres dividir nombres muy largos:
                    formatter: (value) => {
                        const words = value.split(" ");
                        // Ejemplo: agrupar cada 3 palabras
                        return chunkWords(words, 3).join("\n");
                    },
                },
            },
            series: [
                {
                    type: "bar",
                    data: seriesData,
                    label: {
                        show: true,           // Muestra las etiquetas
                        position: "right",    // Ubicación de la etiqueta (al extremo derecho de la barra)
                        fontSize: 12,         // Tamaño de fuente
                        formatter: "{c}",     // Muestra el valor numérico
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

        // 3. Usar ResizeObserver para detectar cambios en el contenedor
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
    }, [title, yAxisData, seriesData]);

    return (
        <div
            ref={chartRef}
            style={{
                width: "100%",   // Ajuste dinámico al ancho del padre
                height: "100%",  // Ocupa todo el alto que se le asigne externamente
            }}
        />
    );
}
