import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import RegisterAreasDataGrid from '../../../components/RegisterAreasDataGrid/RegisterAreasDataGrid';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import regionService from '../../../services/api/region-list/regionService';
import createHeadquarter from '../../../pages/RegisterAreas/CreateHeadquarters/CreateHeadquarters';
import ListHeadquarter from '../../../pages/RegisterAreas/ListHeadquarter/ListHeadquarter';

const RegisterHeadquarter = () => {
    const columnsConfig = [
        { field: 'name', headerName: 'Nombre Sede', flex: 1 },
        { field: 'province', headerName: 'Provincia', flex: 1 },
        { field: 'district', headerName: 'Distrito', flex: 1 },
        { field: 'postalCode', headerName: 'Código Postal', flex: 1 },
    ];

    const [selectedRegion, setSelectedRegion] = useState('');
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [headquarterData, setHeadquarterData] = useState({
        name: '',
        phone: '',
        ruc: '',
        province: '',
        distrito_fiscal: '',
        postalCode: '',
    });

    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setHeadquarterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const regionsData = await regionService.getAllRegions();
                if (regionsData && Array.isArray(regionsData.data)) {
                    setRegions(regionsData.data);
                } else {
                    setRegions([]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar las regiones:', error);
                setRegions([]);
                setLoading(false);
            }
        };

        fetchRegions();
    }, []);

    const handleSave = async () => {
        try {
            const newHeadquarter = {
                codSede: 'SC',
                ...headquarterData,
                regional_fk: selectedRegion,
            };
            console.log('Datos de la sede:', newHeadquarter);
            await createHeadquarter(newHeadquarter);

            // Limpiar campos
            setHeadquarterData({
                name: '',
                phone: '',
                ruc: '',
                province: '',
                distrito_fiscal: '',
                postalCode: '',
            });
            setSelectedRegion('');

            alert('Sede creada con éxito');
        } catch (error) {
            alert('Hubo un error al crear la sede');
        }
    };

    return (
        <Box className="flex flex-col w-full pt-8 gap-8">
            <Box className="flex flex-col w-full bg-white rounded-2xl gap-6" sx={{ p: 5, boxShadow: 2 }}>
                <Box className="flex items-start">
                    <Typography variant="h6" component="h1" fontWeight="bold" color="textPrimary">
                        REGISTRAR SEDE
                    </Typography>
                </Box>

                <Box>
                    <TextField
                        label="Nombre Sede*"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="name"
                        value={headquarterData.name}
                        onChange={handleInputChange}
                    />
                </Box>
                <Box className="flex gap-4">
                    <TextField
                        label="Teléfono*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="phone"
                        value={headquarterData.phone}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="RUC*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="ruc"
                        value={headquarterData.ruc}
                        onChange={handleInputChange}
                    />
                </Box>
                <Box className="flex gap-4">
                    <TextField
                        label="Provincia*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="province"
                        value={headquarterData.province}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Distrito Fiscal*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="distrito_fiscal"
                        value={headquarterData.distrito_fiscal}
                        onChange={handleInputChange}
                    />
                    <Box className="flex-1">
                        <FormControl fullWidth>
                            <InputLabel id="region-select-label" size="small">Región*</InputLabel>
                            <Select
                                labelId="region-select-label"
                                id="region-select"
                                value={selectedRegion}
                                label="Región"
                                size="small"
                                onChange={handleRegionChange}
                            >
                                {loading ? (
                                    <MenuItem disabled>Cargando...</MenuItem>
                                ) : (
                                    regions.map((region) => (
                                        <MenuItem key={region.id} value={region.id}>
                                            {region.nombre}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box className="flex items-start">
                    <TextField
                        label="Código Postal*"
                        variant="outlined"
                        className="w-2/5"
                        size="small"
                        name="postalCode"
                        value={headquarterData.postalCode}
                        onChange={handleInputChange}
                    />
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

            <Box className="bg-white rounded-2xl" sx={{ p: 5, boxShadow: 2 }}>
                <ListHeadquarter /> {/* Aquí se integra el componente ListHeadquarter */}
            </Box>
        </Box>
    );
};

export default RegisterHeadquarter;
