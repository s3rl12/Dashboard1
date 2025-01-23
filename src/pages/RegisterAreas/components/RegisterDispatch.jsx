import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import RegisterAreasDataGrid from '../../../components/RegisterAreasDataGrid/RegisterAreasDataGrid';
import ListDependencies from '../DependencyData/ListDependencies';
import CreateDispatch from '../DispatchData/CreateDispatch';
import ListDispatchData from '../DispatchData/ListDispatchData';

const RegisterDispatch = () => {
    // Configuración de columnas específicas para la opción "Despachos"
    const columnsConfig = [
        { field: 'name', headerName: 'Nombre despacho', flex: 1 },
        { field: 'Dependence', headerName: 'Dependencia', flex: 1 },
    ];

    // Estado para el despacho y la dependencia seleccionada
    const [dispatchData, setDispatchData] = useState({
        name: '',
        code: '',
        phone: '',
        ruc: '',
        dependence: '', // ID de la dependencia seleccionada
    });

    const { dependencies, loading } = ListDependencies();

    // Manejar cambios en los campos de texto
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDispatchData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Manejar selección de dependencia
    const handleDependenceChange = (event) => {
        setDispatchData((prevData) => ({
            ...prevData,
            dependence: event.target.value,  // Almacenar solo el ID de la dependencia
        }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async () => {
        try {
            // Asegúrate de que los nombres de los campos coincidan con la API
            const response = await CreateDispatch({
                cod_despa: dispatchData.code, // Mapeo de 'code' a 'cod_despa'
                nombre_despacho: dispatchData.name, // Mapeo de 'name' a 'nombre_despacho'
                telefono: dispatchData.phone, // Mapeo de 'phone' a 'telefono'
                ruc: dispatchData.ruc, // 'ruc' sin cambios
                dependencia_fk: dispatchData.dependence, // 'dependence' debe ser el ID de la dependencia
            });

            if (response) {
                // Si la creación fue exitosa, puedes manejar la respuesta (mostrar mensaje, limpiar formulario, etc.)
                alert('Despacho creado exitosamente');
                setDispatchData({
                    name: '',
                    code: '',
                    phone: '',
                    ruc: '',
                    dependence: '',
                });
            }
        } catch (error) {
            console.error('Error al guardar el despacho:', error);
            alert('Hubo un error al crear el despacho');
        }
    };


    return (
        <Box className="flex flex-col w-full pt-8 gap-8">
            {/* Sección Registrar Despacho */}
            <Box className="flex flex-col w-full bg-white rounded-2xl gap-6" sx={{ p: 5, boxShadow: 2 }}>
                <Box className="flex items-start">
                    <Typography variant="h6" component="h1" fontWeight="bold" color="textPrimary">
                        REGISTRAR DESPACHO
                    </Typography>
                </Box>

                {/* Campos para registrar despacho */}
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

                {/* Campo Select para Dependencia */}
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="dependence-select-label" size="small">Dependencia*</InputLabel>
                        <Select
                            labelId="dependence-select-label"
                            id="headquarter-select"
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
                                        {dependency.fiscalia}  {/* Se muestra el nombre de la dependencia */}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>
                </Box>

                {/* Botones de Cancelar y Guardar */}
                <Box className="flex justify-end gap-4 mt-6">
                    <Button variant="outlined" sx={{ width: '120px' }}>
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: '120px' }}
                        onClick={handleSubmit}  // Llamar a handleSubmit para guardar
                    >
                        Guardar
                    </Button>
                </Box>
            </Box>

            {/* Tabla para mostrar los datos */}
            <Box className="bg-white rounded-2xl" sx={{ p: 5, boxShadow: 2 }}>
                <ListDispatchData />
            </Box>
        </Box>
    );
};

export default RegisterDispatch;
