import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import RoleCard from './RoleCard';
import CreateRoleCard from './CreateRoleCard';
import rsaSVG from '../../../assets/icons/rsa.svg';
import raSVG from '../../../assets/icons/ra.svg';
import rusSVG from '../../../assets/icons/rus.svg';
import ruSVG from '../../../assets/icons/ru.svg';
import RoleInfoDataGrid from './RoleInfoDataGrid';

const RoleManagement = () => {
    // Combinar todos los documentos de las tarjetas
    const roleData = [
        {
            Icon_Rol: rsaSVG,
            Rol_Asignado: 'Super administrador',
            Total_rol: 4,
            documentos: [
                { id: 1, roles: 'Super administrador', descripcion: 'Acceso total', correoVinculados: 'superadmin@example.com' },
                { id: 2, roles: 'Super administrador', descripcion: 'Gestión avanzada', correoVinculados: 'admin@example.com' },
            ],
        },
        {
            Icon_Rol: raSVG,
            Rol_Asignado: 'Administrador',
            Total_rol: 5,
            documentos: [
                { id: 3, roles: 'Administrador', descripcion: 'Control de usuarios', correoVinculados: 'admin1@example.com' },
                { id: 4, roles: 'Administrador', descripcion: 'Supervisión', correoVinculados: 'admin2@example.com' },
            ],
        },
        {
            Icon_Rol: rusSVG,
            Rol_Asignado: 'Usuario estadístico',
            Total_rol: 7,
            documentos: [
                { id: 5, roles: 'Usuario estadístico', descripcion: 'Visualización de reportes', correoVinculados: 'stats1@example.com' },
                { id: 6, roles: 'Usuario estadístico', descripcion: 'Generación de gráficos', correoVinculados: 'stats2@example.com' },
            ],
        },
        {
            Icon_Rol: ruSVG,
            Rol_Asignado: 'Usuarios',
            Total_rol: 1,
            documentos: [
                { id: 7, roles: 'Usuarios', descripcion: 'Acceso básico', correoVinculados: 'user@example.com' },
            ],
        },
    ];

    const allDocuments = roleData.flatMap((role) => role.documentos);

    // Estado inicial con todos los datos combinados
    const [dataGridRows, setDataGridRows] = useState(allDocuments);

    // Maneja clics en las tarjetas de roles
    const handleCardClick = (documentos) => {
        setDataGridRows(documentos); // Mostrar documentos específicos
    };

    const handleDoubleClick = () => {
        setDataGridRows(allDocuments); // Restaurar todos los documentos
    };

    const handleEdit = (row) => {
        alert(`Editar rol: ${row.roles}`);
    };

    const handleDelete = (id) => {
        alert(`Eliminar rol con ID: ${id}`);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 3,
                textAlign: 'start',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                }}
            >
                <Typography variant="h6" component="h2" fontWeight="bold">
                    Roles de Usuario
                </Typography>
                <Typography variant="h6" component="h2">
                    Un rol proporciona acceso a menús y funciones predefinidos para que, dependiendo del rol asignado, un administrador pueda tener acceso a lo que el usuario necesita.
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                }}
            >
                {roleData.map((role, index) => (
                    <RoleCard
                        key={index}
                        Icon_Rol={role.Icon_Rol}
                        Rol_Asignado={role.Rol_Asignado}
                        Total_rol={role.Total_rol}
                        onClick={() => handleCardClick(role.documentos)}
                        onDoubleClick={handleDoubleClick} // Restaura todos los datos
                    />
                ))}
                <CreateRoleCard />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    borderRadius: '12px',
                    backgroundColor: 'white',
                    padding: 3,
                    boxShadow: 3,
                    justifyContent: 'flex-start',
                    width: '100%',
                }}
            >
                <RoleInfoDataGrid
                    rows={dataGridRows}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Box>
        </Box>
    );
};

export default RoleManagement;
