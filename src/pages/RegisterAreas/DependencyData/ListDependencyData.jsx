import React, { useState, useEffect } from 'react';
import dependencyService from '../../../services/api/dependency-list/dependencyService';  // Importar el servicio
import RegisterAreasDataGrid from '../../../components/RegisterAreasDataGrid/RegisterAreasDataGrid';

const ListDependencyData = () => {
    const [dependencies, setDependencies] = useState([]);  // Estado para almacenar las dependencias
    const [loading, setLoading] = useState(true);  // Estado para controlar la carga

    // Definimos la configuración de las columnas para la tabla
    const columnsConfig = [
        { field: 'fiscalia', headerName: 'Fiscalía', flex: 1 },
        { field: 'nombre_fiscalia', headerName: 'Nombre Fiscalía', flex: 1 },
        { field: 'nombre_sede', headerName: 'Sede', flex: 1 },  // Campo actualizado para mostrar el nombre de la sede
    ];

    // Usamos useEffect para cargar las dependencias al montar el componente
    useEffect(() => {
        const fetchDependencies = async () => {
            try {
                const dependencyData = await dependencyService.getAllDependencies();  // Obtener las dependencias desde la API
                console.log('Datos obtenidos de dependencias:', dependencyData);

                // Mapear los datos para extraer el nombre de la sede
                const processedDependencies = dependencyData.data.map(dependency => ({
                    ...dependency,
                    nombre_sede: dependency.sede_fk?.nombre || 'Sin nombre',  // Extraer el nombre de la sede o usar un valor predeterminado
                }));

                setDependencies(processedDependencies);  // Asignar los datos procesados al estado
            } catch (error) {
                console.error('Error al obtener las dependencias:', error);
            } finally {
                setLoading(false);  // Cuando termine la carga, actualizamos el estado de loading
            }
        };

        fetchDependencies();
    }, []);  // El useEffect solo se ejecutará una vez cuando se monte el componente

    return (
        <div>
            <RegisterAreasDataGrid
                columnsConfig={columnsConfig}
                title="Lista de Dependencias"
                rows={dependencies}  // Pasamos las dependencias obtenidas a la tabla
                loading={loading}  // Indicamos si se está cargando la información
            />
        </div>
    );
};

export default ListDependencyData;
