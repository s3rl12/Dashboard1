import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
// import ResizeObserver from 'resize-observer-polyfill'; // Si necesitas compatibilidad con navegadores antiguos

export default function DeadlinedependenceB() {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        // 1. Inicializar ECharts en el div
        const chartInstance = echarts.init(chartRef.current);
        chartInstanceRef.current = chartInstance;

        // Función para agrupar palabras en líneas
        const chunkWords = (arr, size) => {
            const result = [];
            for (let i = 0; i < arr.length; i += size) {
                result.push(arr.slice(i, i + size).join(" "));
            }
            return result;
        };

        // Nueva configuración de la gráfica
        const option = {
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
                data: [
                    "QUISPE YCHUHUAYTA GILMAR MARTIN",
                    "QUISPE YCHUHUAYTA MARTIN GILMAR",
                    "QUISPE MARTIN YCHUHUAYTA MARTIN",
                    "MARTIN YCHUHUAYTA GILMAR MARTIN",
                    "QUISPE GILMAR GILYCHUHUAYTAMAR MARTIN",
                    "QUISPE MARTIN GILMAR YCHUHUAYTA",
                ],
                axisLabel: {
                    fontSize: 10,
                    interval: 0, // Mostrar todas las etiquetas
                    
                },
            },
            series: [
                {
                    type: "bar",
                    data: [18, 23, 24, 10, 14, 60],
                    label: {
                        show: true,           // Muestra las etiquetas
                        position: "right",    // Ubicación de la etiqueta (al extremo derecho de la barra)
                        fontSize: 10,         // Tamaño de fuente
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
    }, []);

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
