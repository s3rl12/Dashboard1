import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import RegisterAreasDataGrid from '../../../components/RegisterAreasDataGrid/RegisterAreasDataGrid';
import sedeService from '../../../services/api/sede-list/sedeService';
import CreateDependency from '../DependencyData/CreateDependency';
import ListDependencyData from '../DependencyData/ListDependencyData';

const RegisterDependencies = () => {
    const columnsConfig = [
        { field: 'Dependencies', headerName: 'Dependencias', flex: 1 },
        { field: 'name', headerName: 'Nombre fiscalía', flex: 1 },
        { field: 'Headquarters', headerName: 'Sede', flex: 1 },
    ];

    const [headquarters, setHeadquarters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedHeadquarter, setSelectedHeadquarter] = useState('');
    const [dependencyData, setDependencyData] = useState({
        fiscalia: '',
        tipoFiscalia: '',
        nombreFiscalia: '',
        ruc: '',
        telefono: '', // Nuevo campo
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDependencyData((prev) => ({ ...prev, [name]: value }));
    };

    const handleHeadquarterChange = (event) => {
        setSelectedHeadquarter(event.target.value);
    };

    useEffect(() => {
        const fetchHeadquarters = async () => {
            try {
                const sedeData = await sedeService.getAllSedes();
                setHeadquarters(sedeData.data || []);
            } catch (error) {
                console.error('Error al cargar las sedes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHeadquarters();
    }, []);

    const handleSave = async () => {
        if (!selectedHeadquarter) {
            alert('Por favor, seleccione una sede.');
            return;
        }

        const newDependency = {
            cod_depen: "R001-SC001-1FPPCT", // Se asigna el valor estático "CD"
            fiscalia: dependencyData.fiscalia,
            tipo_fiscalia: dependencyData.tipoFiscalia,
            nombre_fiscalia: dependencyData.nombreFiscalia,
            ruc: dependencyData.ruc,
            telefono: dependencyData.telefono, // Incluir teléfono
            sede_fk: selectedHeadquarter, // Este campo es correcto
        };

        console.log(newDependency);

        try {
            const response = await CreateDependency(newDependency);
            console.log('Respuesta del servidor:', response);

            alert('Dependencia registrada exitosamente.');

            setDependencyData({
                fiscalia: '',
                tipoFiscalia: '',
                nombreFiscalia: '',
                ruc: '',
                telefono: '', // Resetear campo teléfono
            });
            setSelectedHeadquarter('');
        } catch (error) {
            console.error('Error al registrar la dependencia:', error);
            alert('Ocurrió un error al registrar la dependencia. Intente nuevamente.');
        }
    };

    return (
        <Box className="flex flex-col w-full pt-8 gap-8">
            <Box className="flex flex-col w-full bg-white rounded-2xl gap-6 shadow-md" sx={{ p: 5, boxShadow: 2 }}>
                <Box className="flex items-start">
                    <Typography variant="h6" component="h1" fontWeight="bold" color="textPrimary">
                        REGISTRAR DEPENDENCIAS
                    </Typography>
                </Box>

                <Box>
                    <TextField
                        label="Fiscalía*"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="fiscalia"
                        value={dependencyData.fiscalia}
                        onChange={handleInputChange}
                    />
                </Box>
                <Box className="flex gap-4">
                    <TextField
                        label="Tipo de fiscalía*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="tipoFiscalia"
                        value={dependencyData.tipoFiscalia}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Nombre fiscalía*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="nombreFiscalia"
                        value={dependencyData.nombreFiscalia}
                        onChange={handleInputChange}
                    />
                </Box>
                <Box className="flex gap-4">
                    <TextField
                        label="RUC*"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="ruc"
                        value={dependencyData.ruc}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Teléfono"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="telefono"
                        value={dependencyData.telefono}
                        onChange={handleInputChange}
                    />
                </Box>
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="headquarter-select-label" size="small">Sede*</InputLabel>
                        <Select
                            labelId="headquarter-select-label"
                            id="headquarter-select"
                            value={selectedHeadquarter}
                            onChange={handleHeadquarterChange}
                            size="small"
                            label="Sede*"
                        >
                            {loading ? (
                                <MenuItem disabled>Cargando...</MenuItem>
                            ) : (
                                headquarters.map((headquarter) => (
                                    <MenuItem key={headquarter.id} value={headquarter.id}>
                                        {headquarter.nombre}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>
                </Box>

                <Box className="flex justify-end gap-4 mt-6">
                    <Button variant="outlined" sx={{ width: '120px' }}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="primary" sx={{ width: '120px' }} onClick={handleSave}>
                        Guardar
                    </Button>
                </Box>
            </Box>

            <Box className="bg-white rounded-2xl shadow-md" sx={{ p: 5, boxShadow: 2 }}>
                {/* Aquí se inserta el componente ListDependencyData */}
                <ListDependencyData />
            </Box>
        </Box>
    );
};

export default RegisterDependencies;
