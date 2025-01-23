import React, { useState, useEffect } from 'react';
import dispatchesService from '../../../services/api/dispatches-list/dispatchesService'; // Importar el servicio
import RegisterAreasDataGrid from '../../../components/RegisterAreasDataGrid/RegisterAreasDataGrid'; // Componente para la tabla

const ListDispatchData = () => {
    const [dispatches, setDispatches] = useState([]);  // Estado para almacenar los despachos
    const [loading, setLoading] = useState(true);  // Estado para controlar la carga

    // Definimos la configuración de las columnas para la tabla
    const columnsConfig = [
        { field: 'nombre_despacho', headerName: 'Nombre despacho', flex: 1 },
        { field: 'fiscalia', headerName: 'Dependencia', flex: 1 }, // Mostrar el nombre de la fiscalía (dependencia)
    ];

    // Usamos useEffect para cargar los despachos al montar el componente
    useEffect(() => {
        const fetchDispatches = async () => {
            try {
                const dispatchData = await dispatchesService.getAllDispatches();
                // Verificar que la respuesta tenga la propiedad 'data' y que sea un array
                const dispatchesArray = Array.isArray(dispatchData.data) ? dispatchData.data : [];
                
                console.log('Datos obtenidos de despachos:', dispatchData);

                // Procesamos los datos para extraer el nombre de la dependencia
                const processedDispatches = dispatchesArray.map(dispatch => ({
                    ...dispatch,
                    fiscalia: dispatch.dependencia_fk?.fiscalia || 'Sin nombre', // Extraer el nombre de la fiscalía (dependencia)
                }));

                setDispatches(processedDispatches);  // Asignamos los datos procesados al estado
            } catch (error) {
                console.error('Error al obtener los despachos:', error);
            } finally {
                setLoading(false);  // Cuando termine la carga, actualizamos el estado de loading
            }
        };

        fetchDispatches();
    }, []);  // El useEffect solo se ejecutará una vez cuando se monte el componente


    return (
        <div>
            <RegisterAreasDataGrid
                columnsConfig={columnsConfig}
                title="Lista de Despachos"
                rows={dispatches}  // Pasamos los despachos obtenidos a la tabla
                loading={loading}  // Indicamos si se está cargando la información
            />
        </div>
    );
};

export default ListDispatchData;
