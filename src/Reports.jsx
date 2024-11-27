
// src/Reports.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { Padding } from '@mui/icons-material';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css'; // Incluimos el tema
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import ReactApexChart from 'react-apexcharts'
import '/src/index.css';


const Reports = () => {
    const [series] = useState([
        {
            name: "Casos Resultos",
            data: [127, 123, 98, 92]
        },
        {
            name: "Casos Ingresados",
            data: [50, 61, 64, 43]
        }
    ]);

    const options = {
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            },
            background: '#fff',
        },
        colors: ['#4782C4', '#283692'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'CANTIDAD DE CASOS RESULTOS E INGRESADOS POR FISCALES',
            align: 'center',
            style: {
                fontSize: '13px',
                fontWeight: 'bold',
                fontFamily: 'Inter',
                color: '#11263C'
            }
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: ['CORTEGANA DEISY', 'QUISPE YCHUHUAYTA GILMER MARTIN', 'RAMOS SANCHEZ ANA MARITZA', 'PUMA OJEDA SENAIDA GISSELA'],
            labels: {
                style: {
                    fontSize: '9px',
                },
            },
            title: {
                text: '',
            },
        },
        yaxis: {
            title: {
                text: '',
            },
            min: 0,
            max: 150
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -10,
            offsetX: -5
        }
    };

    const seriesBar = [
        {
            data: [100, 100]
        }
    ];

    const optionsBar = {
        chart: {
            type: 'bar',
            height: 120,
            toolbar: {
                show: false,
            },
        },
        yaxis: {

            title: {
                text: 'FISCAL',
                style: {
                    fontSize: '10px',
                    color: '#E4E4E4', // Cambia el color del texto a #E4E4E4
                    fontWeight: '600', // Cambia a semi-bold
                    fontFamily: 'Inter', // Cambia el font a Inter
                },
            },

        },
        plotOptions: {
            bar: {
                borderRadius: 0,
                borderRadiusApplication: 'end',
                horizontal: true,
                dataLabels: {
                    position: 'top'
                },

            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '10px',
                fontWeight: 'bold',
                fontFamily: 'Inter',
            },
            align: 'center',
            offsetX: 3,
        },
        colors: ['#152B52'],
        xaxis: {
            categories: ['QUISPE CORTEGANA DEISY', 'RAMOS SANCHEZ ANA MARITZA'],
            labels: {
                style: {
                    fontSize: '10px',
                    fontWeight: '600',
                },
            }
        },
        title: {
            text: 'PRODUCTIVIDAD FISCAL POR METAS PRIMER DESPACHO',
            align: 'center',
            style: {
                fontSize: '13px',
                fontWeight: 'bold',
                fontFamily: 'Inter',
                color: '#11263C'
            }
        }
    };

    // UseEffect to render amCharts pie chart
    useEffect(() => {
        let root = am5.Root.new("chartdiv");

        root.setThemes([am5themes_Animated.new(root)]);

        // Crear el contenedor del título
        let container = root.container.children.push(am5.Container.new(root, {
            layout: root.verticalLayout
        }));

        let chart = root.container.children.push(am5percent.PieChart.new(root, {
            endAngle: 270,
            layout: root.verticalLayout,
            innerRadius: am5.percent(60)
        }));

        let series = chart.series.push(am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "category",
            endAngle: 270
        }));

        // Ajustar el tamaño del texto de los datos
        series.labels.template.setAll({
            fontSize: 9,
            fontFamily: 'Inter'
        });

        series.slices.template.setAll({
            tooltipText: "{category}: {value}"
        });

        series.set("colors", am5.ColorSet.new(root, {
            colors: [
                am5.color(0x6E56A3),
                am5.color(0xD8B427),
                am5.color(0xD74650),
                am5.color(0x4CB848)
            ]
        }));

        series.data.setAll([{
            category: "RAMOS SANCHEZ",
            value: 29
        }, {
            category: "PUMA OJEDA",
            value: 27
        }, {
            category: "QUISPE CORTEGANA",
            value: 24
        }, {
            category: "QUISPE YCHUHUAYTA",
            value: 20
        }]);

        // Remove the amCharts link
        root._logo.dispose();

        return () => {
            root.dispose();
        };
    }, []);

    ModuleRegistry.registerModules([ClientSideRowModelModule]);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '308px', width: '699px', fontSize: '11px' }), []); // Cambia la altura si lo necesitas

    const [rowData] = useState([
        { FISCALES: 'QUISPE CORTEGANA DEISY', TRAMITE_HISTORICO: 595, RESUELTO_HISTORICO_DEL_MES: 595, TRAMITE_MES: 595, RESULTADO_MES: 12, INGRESO: 50 },
        { FISCALES: 'QUISPE CORTEGANA DEISY', TRAMITE_HISTORICO: 595, RESUELTO_HISTORICO_DEL_MES: 595, TRAMITE_MES: 595, RESULTADO_MES: 12, INGRESO: 50 },
        { FISCALES: 'QUISPE CORTEGANA DEISY', TRAMITE_HISTORICO: 595, RESUELTO_HISTORICO_DEL_MES: 595, TRAMITE_MES: 595, RESULTADO_MES: 12, INGRESO: 50 },
    ]);

    const [columnDefs] = useState([
        { field: 'FISCALES', minWidth: 170, headerName: 'Fiscales', width: '100' },
        { field: 'TRAMITE_HISTORICO', headerName: 'Trámite Histórico', width: '150' },
        { field: 'RESUELTO_HISTORICO_DEL_MES', headerName: 'Resuelto Histórico del Mes', width: '200' },
        { field: 'TRAMITE_MES', headerName: 'Trámite Mes', width: '135' },
        { field: 'RESULTADO_MES', headerName: 'Resultado Mes', width: '140' },
        { field: 'INGRESO', headerName: 'Ingreso', width: '130' }
    ]);

    const defaultColDef = useMemo(() => ({
        editable: false,
        filter: true

    }), []);


    return (
        <div className='flex flex-col gap-4 pt-3 mt-0'>
            <div className='flex flex-row gap-4 w-full justify-between'> {/* Div Padre 1 */}
                <div className='flex flex-row border-[#A4A4A4] shadow-[0px_4px_4px_rgba(0,0,0,0.1)] rounded-r-lg bg-white'>
                    <div>
                        <img src="../src/Img/logodashboard.png" alt="" className='w-auto object-contain h-[70px]' />
                    </div>
                    <div className='flex flex-col justify-center pl-3 pr-3'> {/* Div Divisor 1 */}
                        <h1 className='text-left font-bold text-lg text-[#152B52]'>CARGA LABORAL</h1>
                        <p className='text-center font-bold text-base text-[#152B52]'>01 DE AGOSTO AL 31 DE AGOSTO DEL 2024</p>
                    </div>
                </div>

                <div className='flex justify-start items-center gap-4 px-5 border-[#A4A4A4] shadow-[0px_4px_4px_rgba(0,0,0,0.1)] rounded-lg bg-white'>
                    <p className='text-lg font-bold text-[#152B52]'>1º FISCALIA PROVINCIAL PENAL CORPORATIVA DE TAMBOTAPA</p>
                </div>
            </div>
            <div className='flex flex-row gap-4 w-full justify-between'> {/* Div Padre 2 */}
                <div className='flex justify-start items-start gap-4 border-[#A4A4A4] shadow-[0px_4px_4px_rgba(0,0,0,0.1)] rounded-lg bg-white px-3'> {/* Primer Div Azul */}
                    <ReactApexChart options={options} series={series} type="line" height={259} width={700} />
                </div>
                <div className='flex justify-start items-start gap-4'> {/* Segundo Div Azul */}
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-row gap-4'> {/* agrega las etiquetas a este div (divisor azul)*/}
                            <div className='card-tramite'> {/* agrega las etiquetas a este div (divisor verde) */}
                                <span className='text-lg font-semibold'>2498</span>
                                <p>CASOS EN TRAMITE</p>
                            </div>
                            <div className='card-tramite'>
                                <span className='text-lg font-semibold'>2498</span>
                                <p>CASOS EN TRAMITE</p>
                            </div> {/* agrega las etiquetas a este div (divisor verde) */}
                            <div className='card-tramite'>
                                <span className='text-lg font-semibold'>2498</span>
                                <p>CASOS EN TRAMITE</p>
                            </div> {/* agrega las etiquetas a este div (divisor verde) */}
                        </div>
                        <div className='bg-white border-[#A4A4A4] shadow-[0px_4px_4px_rgba(0,0,0,0.1)] rounded-lg'> {/* agrega las etiquetas a este div (divisor azul)*/}
                            <div><h1 className='text-sm font-bold text-center' style={{ fontSize: '13px', fontWeight: 'bold', fontFamily: 'Inter', color: '#11263C' }}>PORCENTAJE DE LA CANTIDAD DE CASOS EN TRÁMITE POR FISCALES</h1></div>
                            <div id="chartdiv" style={{ width: '500px', height: '155px' }}></div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex flex-row gap-4 justify-between w-full'> {/* Div Padre 3 */}
                <div className='flex flex-col justify-center items-center gap-4'> {/* Div Divisor 3 */}
                    <div className='flex justify-items-center bg-white pr-6 border-[#A4A4A4] shadow-[0px_4px_4px_rgba(0,0,0,0.1)] rounded-lg'>
                        <ReactApexChart options={optionsBar} series={[{ data: [100, 100] }]} type="bar" height={130} width={500} />
                    </div>
                    <div className='flex justify-items-center bg-white pr-6 border-[#A4A4A4] shadow-[0px_4px_4px_rgba(0,0,0,0.1)] rounded-lg'>
                        <ReactApexChart options={optionsBar} series={[{ data: [100, 100] }]} type="bar" height={130} width={500} />
                    </div>
                </div>
                <div className='flex gap-4 border-[#A4A4A4] shadow-[0px_4px_4px_rgba(0,0,0,0.1)] rounded-lg'>
                    {/* agrega las etiquetas a este div */}
                    <div style={containerStyle}>
                        <style>
                            {`.ag-theme-quartz-dark {
                                --ag-foreground-color: rgb(0, 0, 0); /* Texto de contenido en negro */
                                --ag-background-color: rgb(255, 255, 255); /* Fondo en blanco */
                                --ag-header-background-color: #152B52; /* Fondo de la cabecera en #152671 */
                                --ag-header-foreground-color: rgb(255, 255, 255); /* Texto de cabecera en blanco */
                                --ag-row-hover-color: rgb(238, 238, 238); /* Color de fila al pasar el ratón */
                                --ag-scrollbar-color: rgb(218, 25, 25); /* Color del scroll en blanco */
                                }
                            `}
                        </style>
                        <div className='ag-theme-quartz-dark' style={gridStyle}>
                            <AgGridReact
                                rowData={rowData}
                                columnDefs={columnDefs}
                                defaultColDef={defaultColDef}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Reports;
