import React, { useState, useEffect } from 'react';
import DocumentCard from './DocumentCard';
import DocumentInformationDataGrid from './DocumentInformationDataGrid';
import folderService from '../../../services/api/folder-list/folderService';
import fileFolderService from '../../../services/api/fileFolder-list/fileFolderService';
import CreateFolder from '../../DocumentManager/components/CreateFolder';

const Documentfolders = () => {
    const [folders, setFolders] = useState([]);
    const [dataGridRows, setDataGridRows] = useState([]);

    // Fetch folders on mount
    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await folderService.getFolder();
                if (response.data && Array.isArray(response.data)) {
                    setFolders(response.data);
                    console.log("Datos registrados:", response.data);
                } else {
                    console.error('Invalid folder structure:', response);
                    setFolders([]);
                }
            } catch (error) {
                console.error('Error fetching folders:', error);
                setFolders([]);
            }
        };
        fetchFolders();
    }, []);

    // Handle folder click
    const handleCardClick = async (folderCode) => {
        try {
            const response = await fileFolderService.getFiles();
            // Filtramos por folderCode y luego mapeamos los archivos correctamente
            const mappedFiles = response.data
                .filter(folder => folder.codigo_carp === folderCode) // Filtramos las carpetas por el código
                .flatMap(folder => folder.archivos.map(file => ({
                    id: file.id,
                    nombre_carp: folder.nombre_carp, // Añadimos el nombre de la carpeta
                    file_name: file.nombre, // Accedemos correctamente a la propiedad 'nombre'
                    file_type: file.tipo_arch, // Accedemos correctamente a la propiedad 'tipo_arch'
                    created_at: new Date(file.created_at).toLocaleDateString(), // Formateamos la fecha de creación
                })));
            console.log("Datos capturados:", mappedFiles);
            setDataGridRows(mappedFiles);
        } catch (error) {
            console.error('Error fetching files:', error);
            setDataGridRows([]);
        }
    };
    

    return (
        <div className="flex flex-col w-full gap-3 text-start font-teko">
            <h2 className="text-xl font-medium">Mis Documentos</h2>

            <div className="flex flex-wrap gap-4 justify-start">
                {folders.map((folder) => (
                    <DocumentCard
                        key={folder.codigo_carp}
                        file_name={folder.nombre_carp}
                        file_code={folder.codigo_carp}
                        file_quantity={folder.cant_archivos}
                        onClick={() => handleCardClick(folder.codigo_carp)}
                    />
                ))}
                <CreateFolder />
            </div>

            <div className="flex rounded-xl bg-white p-6 shadow-lg">
                <DocumentInformationDataGrid 
                    rows={dataGridRows}
                    columns={[
                        { field: 'id', headerName: 'ID', width: 90 },
                        { field: 'file_name', headerName: 'File Name', flex: 1 },
                        { field: 'file_type', headerName: 'File Type', flex: 1 },
                        { field: 'created_at', headerName: 'Creation Date', flex: 1 }
                    ]}
                />
            </div>
        </div>
    );
};

export default Documentfolders;
