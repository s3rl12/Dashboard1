import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import RegisterAreasDataGrid from '../../../components/RegisterAreasDataGrid/RegisterAreasDataGrid';
import ListDependencies from '../DependencyData/ListDependencies';
import CreateDispatch from '../DispatchData/CreateDispatch';
import ListDispatchData from '../DispatchData/ListDispatchData';
import dispatchesService from '../../../services/api/dispatches-list/dispatchesService'; // Se asume que existe este servicio

const RegisterDispatch = () => {
    // Configuración de columnas para la data grid (usada en ListDispatchData)
    const columnsConfig = [
        { field: 'nombre_despacho', headerName: 'Nombre despacho', flex: 1 },
        { field: 'fiscalia', headerName: 'Dependencia', flex: 1 },
    ];

    // Estado para el formulario de despacho
    const [dispatchData, setDispatchData] = useState({
        id: null,        // Se usará en modo edición
        code: '',        // cod_despa
        name: '',
        phone: '',
        ruc: '',
        dependence: '',  // ID de la dependencia seleccionada
    });
    // Estado para saber si se está en modo edición
    const [editing, setEditing] = useState(false);

    // Estados para la lista de dependencias (para el Select)
    // Se obtiene mediante ListDependencies; en este ejemplo se invoca la función y se extraen los datos
    const { dependencies, loading } = ListDependencies();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDispatchData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDependenceChange = (event) => {
        setDispatchData((prevData) => ({
            ...prevData,
            dependence: event.target.value,  // Almacenar solo el ID de la dependencia
        }));
    };

    // Función para enviar el formulario (crear o actualizar despacho)
    const handleSubmit = async () => {
        try {
            if (editing && dispatchData.id) {
                // Modo edición: se actualiza el despacho sin enviar "id" ni "cod_despa"
                const payload = {
                    nombre_despacho: dispatchData.name,
                    telefono: dispatchData.phone,
                    ruc: dispatchData.ruc,
                    dependencia_fk: dispatchData.dependence,
                };
                console.log('Payload de actualización:', payload);
                await dispatchesService.updateDispatch(dispatchData.id, payload);
                alert('Despacho actualizado exitosamente');
            } else {
                // Modo creación: se crea el despacho con el código ingresado
                const payload = {
                    cod_despa: dispatchData.code,
                    nombre_despacho: dispatchData.name,
                    telefono: dispatchData.phone,
                    ruc: dispatchData.ruc,
                    dependencia_fk: dispatchData.dependence,
                };
                console.log('Payload de creación:', payload);
                const response = await CreateDispatch(payload);
                console.log('Respuesta del servidor:', response);
                alert('Despacho creado exitosamente');
            }
            // Limpiar formulario y salir del modo edición
            setDispatchData({
                id: null,
                code: '',
                name: '',
                phone: '',
                ruc: '',
                dependence: '',
            });
            setEditing(false);
        } catch (error) {
            console.error('Error al guardar el despacho:', error);
            alert('Hubo un error al guardar el despacho');
        }
    };

    // Callback para editar: se invoca desde el listado
    const handleEditDispatch = (data) => {
        setDispatchData({
            id: data.id,
            code: data.cod_despa, // Se carga el código original (para visualización, pero no se modificará)
            name: data.nombre_despacho,
            phone: data.telefono,
            ruc: data.ruc,
            dependence: data.dependencia_fk?.id ? data.dependencia_fk.id : data.dependencia_fk,
        });
        setEditing(true);
    };

    // Callback para eliminar: se invoca desde el listado
    const handleDeleteDispatch = async (id) => {
        try {
            await dispatchesService.deleteDispatch(id);
            alert('Despacho eliminado exitosamente');
            // Se recomienda refrescar la lista o notificar al componente listado para que haga un nuevo fetch
        } catch (error) {
            console.error('Error al eliminar el despacho:', error);
            alert('Hubo un error al eliminar el despacho');
        }
    };

    return (
        <Box className="flex flex-col w-full gap-6">
            {/* Sección del formulario de registro/edición */}
            <Box className="flex flex-col w-full bg-white rounded-2xl gap-4 shadow-md" sx={{ p: 5, boxShadow: 2 }}>
                <Box className="flex items-start">
                    <Typography variant="h6" component="h1" fontWeight="semibold" fontFamily={'Teko, sans-serif'}>
                        {editing ? 'EDITAR DESPACHO' : 'REGISTRAR DESPACHO'}
                    </Typography>
                </Box>

                <Box>
                    <TextField
                        label="Nombre despacho*"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="name"
                        value={dispatchData.name}
                        onChange={handleInputChange}
                    />
                </Box>
                <Box className="flex gap-4">
                    <TextField
                        label="Código Despacho*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="code"
                        value={dispatchData.code}
                        onChange={handleInputChange}
                        disabled={editing}  // En modo edición, no se permite cambiar el código
                    />
                    <TextField
                        label="Teléfono*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="phone"
                        value={dispatchData.phone}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="RUC*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="ruc"
                        value={dispatchData.ruc}
                        onChange={handleInputChange}
                    />
                </Box>
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="dependence-select-label" size="small">Dependencia*</InputLabel>
                        <Select
                            labelId="dependence-select-label"
                            id="dependence-select"
                            value={dispatchData.dependence}
                            onChange={handleDependenceChange}
                            size="small"
                            label="Dependencia*"
                        >
                            {loading ? (
                                <MenuItem disabled>
                                    <CircularProgress size={24} />
                                </MenuItem>
                            ) : (
                                dependencies.map((dependency) => (
                                    <MenuItem key={dependency.id} value={dependency.id}>
                                        {dependency.fiscalia}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>
                </Box>

                <Box className="flex justify-end gap-4 mt-6">
                    <Button variant="outlined" sx={{ width: '120px', borderColor: '#183466', color: '#183466' }}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="primary" sx={{ width: '120px', backgroundColor: '#183466' }} onClick={handleSubmit}>
                        Guardar
                    </Button>
                </Box>
            </Box>

            {/* Sección del listado */}
            <Box className="bg-white rounded-2xl shadow-md" sx={{ p: 5, boxShadow: 2 }}>
                <ListDispatchData onEditRow={handleEditDispatch} onDeleteRow={handleDeleteDispatch} />
            </Box>
        </Box>
    );
};

export default RegisterDispatch;
