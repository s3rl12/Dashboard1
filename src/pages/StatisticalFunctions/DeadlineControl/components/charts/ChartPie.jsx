import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
// import ResizeObserver from 'resize-observer-polyfill'; // Si necesitas compatibilidad con navegadores antiguos

export default function ChartPie() {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        // 1. Inicializar ECharts en el div
        const chartInstance = echarts.init(chartRef.current);
        chartInstanceRef.current = chartInstance;

        // Nueva configuración para el gráfico de Pie
        const option = {
            tooltip: {
                trigger: "item",
            },
            grid: {
                top: "10%",
                containLabel: true,
            },
            series: [
                {
                    name: "Access From",
                    type: "pie",
                    radius: "60%",
                    data: [
                        { value: 1048, name: "Verde", itemStyle: { color: "#008000" } },
                        { value: 735, name: "Rojo", itemStyle: { color: "#FF0000" } },
                        { value: 580, name: "Amarillo", itemStyle: { color: "#FFD700" } },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                    label: {
                        show: true,
                        fontSize: 12,
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
                width: "100%",  // Ajuste dinámico al ancho del padre
                height: "100%", // Ocupa todo el alto que se le asigne externamente
            }}
        />
    );
}
