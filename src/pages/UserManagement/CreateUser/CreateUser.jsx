import React, { useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import VerticalTabs from '../../../components/Tabs/VerticalTabs';
import { useAuth } from '../../../context/AuthContext'; // Importar el contexto
import userListService from '../../../services/api/user-list/userListService'; // Importar el servicio de usuario

const CreateUser = () => {
    const { userData } = useAuth(); // Obtener los datos del usuario desde el contexto
    const [loading, setLoading] = useState(false); // Estado de carga
    const [error, setError] = useState(null); // Estado para manejar errores
    const [success, setSuccess] = useState(false); // Estado para manejar éxito

    

    const handleSave = async () => {
        setLoading(true); // Activar la carga
        setError(null); // Limpiar cualquier error previo
        setSuccess(false); // Limpiar el estado de éxito
        console.log('los datos recopilados son:', userData);
        try {
            
            const response = await userListService.createUser(userData); // Llamar a la API para crear el usuario
            
            setSuccess(true); // Si la creación es exitosa, actualizar el estado de éxito
            console.log('Usuario creado con éxito:', response);
        } catch (error) {
            setError('Error al crear el usuario.'); // Mostrar un mensaje de error
            console.error('Error al crear el usuario:', error);
        } finally {
            setLoading(false); // Desactivar la carga
        }
    };

    return (
        <Box className="flex flex-col w-full gap-4 px-6 py-6 bg-white shadow-md" sx={{ flex: 1 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" sx={{ textAlign: 'start' }}>
                Agregar nuevo usuario
            </Typography>
            <Box className="flex" sx={{ flex: 1 }}>
                <VerticalTabs />
            </Box>

            {/* Mensaje de éxito o error */}
            {error && (
                <Box sx={{ marginTop: 2, color: 'red', textAlign: 'center' }}>
                    <Typography variant="body1">{error}</Typography>
                </Box>
            )}
            {success && (
                <Box sx={{ marginTop: 2, color: 'green', textAlign: 'center' }}>
                    <Typography variant="body1">Usuario creado con éxito!</Typography>
                </Box>
            )}

            <Box className="flex justify-end gap-4 mt-6">
                <Button variant="outlined" sx={{ width: '120px' }}>
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: '120px' }}
                    onClick={handleSave} // Al hacer clic en "Guardar", ejecuta la función handleSave
                    disabled={loading} // Desactivar el botón mientras se está cargando
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Guardar'}
                </Button>
            </Box>
        </Box>
    );
};

export default CreateUser;
