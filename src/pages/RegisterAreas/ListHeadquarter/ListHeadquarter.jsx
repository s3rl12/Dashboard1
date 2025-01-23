import React, { useState, useEffect } from 'react';
import sedeService from '../../../services/api/sede-list/sedeService';
import RegisterAreasDataGrid from '../../../components/RegisterAreasDataGrid/RegisterAreasDataGrid';

const ListHeadquarter = () => {
    const [headquarters, setHeadquarters] = useState([]);
    const [loading, setLoading] = useState(true);

    // Definimos la configuración de las columnas
    const columnsConfig = [
        { field: 'nombre', headerName: 'Nombre Sede', flex: 1 },  // Cambié 'name' a 'nombre'
        { field: 'provincia', headerName: 'Provincia', flex: 1 },  // Cambié 'province' a 'provincia'
        { field: 'distrito_fiscal', headerName: 'Distrito Fiscal', flex: 1 },  // 'distrito_fiscal' ya está bien
        { field: 'codigo_postal', headerName: 'Código Postal', flex: 1 },  // Cambié 'postalCode' a 'codigo_postal'
    ];

    // Usamos useEffect para cargar las sedes al montar el componente
    useEffect(() => {
        const fetchHeadquarters = async () => {
            try {
                const sedeData = await sedeService.getAllSedes(); // Obtenemos las sedes desde la API
                console.log('Datos obtenidos de sedes:', sedeData);  // Verifica los datos
                // Asignamos los datos a 'headquarters', asegurándonos de acceder a 'data' (y no 'rows')
                setHeadquarters(sedeData.data || []);  // Usamos 'data' en lugar de 'rows'
            } catch (error) {
                console.error('Error al obtener las sedes:', error);
            } finally {
                setLoading(false); // Terminamos de cargar
            }
        };

        fetchHeadquarters();
    }, []);  // Se ejecuta una sola vez al montar el componente

    return (
        <div>
            <RegisterAreasDataGrid
                columnsConfig={columnsConfig}
                title="Lista de Sedes"
                rows={headquarters} // Pasamos las sedes obtenidas a la tabla
                loading={loading} // Pasamos el estado de carga
            />
        </div>
    );
};

export default ListHeadquarter;
