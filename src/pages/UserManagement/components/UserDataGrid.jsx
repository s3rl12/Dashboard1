import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import { GridRowModes, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import CustomFilterUser from '../../../components/UserManagement/CustomFilterUser';
import QuickFilter from '../../../components/DocumentDataGrid/components/QuickFilter';
import userListService from '../../../services/api/user-list/userListService';  // Asegúrate de importar tu servicio de la API
import DeleteUser from '../DeleteUser/DeleteUser';

export default function UserDataGrid({ columnsConfig = [], title = "Lista de usuarios" }) {
  const [filterModel, setFilterModel] = useState({
    role: '',
    office: '',
    status: '',
    user: '', // Se añade el filtro para 'user'
  });

  const [rowModesModel, setRowModesModel] = useState({});
  const [users, setUsers] = useState([]); // Estado para los usuarios obtenidos de la API
  const [userToDelete, setUserToDelete] = useState(null);  // Estado para almacenar el usuario que será eliminado

  // Cargar los datos de la API cuando el componente se monte
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userListService.getAllUsers(); // Asegúrate de que el servicio esté correctamente configurado
        setUsers(response.data); // Ajusta según la estructura de la respuesta de tu API
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchData();
  }, []); // Solo se ejecuta al montar el componente

  const data = useMemo(() => {
    const columns = [
      { field: 'user', headerName: 'Usuario', flex: 1 },
      { field: 'role', headerName: 'Rol', flex: 1 },
      { field: 'office', headerName: 'Despacho', flex: 1 },
      { field: 'status', headerName: 'Estado', flex: 1 },
      {
        field: 'actions',
        headerName: 'Acciones',
        type: 'actions',
        width: 100,
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Guardar"
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancelar"
                onClick={handleCancelClick(id)}
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Editar"
              onClick={handleEditClick(id)}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Eliminar"
              onClick={handleDeleteClick(id)}
            />,
          ];
        },
      }
    ];

    // Mapear los datos de la API para adaptarlos a la estructura que necesita el DataGrid
    const rows = users.map(user => ({
      id: user.id,              // Asigna un ID único para cada usuario
      user: `${user.nombre} ${user.apellido}`, // Concatenar el nombre y apellido
      role: user.roles_fk?.roles || 'Sin rol', // Asigna el rol del usuario (ajusta según la respuesta de la API)
      office: user.despacho_fk || 'Sin despacho', // Asigna el despacho
      status: user.estado === 1 ? 'Activo' : 'Inactivo', // Convertir el estado numérico a texto
    }));

    return { columns, rows };
  }, [users, rowModesModel]);

  const filteredRows = useMemo(() => {
    return data.rows.filter((row) => {
      // Evalúa cada filtro activo
      return (
        (!filterModel.role || row.role === filterModel.role) &&
        (!filterModel.office || row.office === filterModel.office) &&
        (!filterModel.status || row.status === filterModel.status) &&
        (!filterModel.user || row.user.toLowerCase().includes(filterModel.user.toLowerCase())) // Filtro solo por 'user'
      );
    });
  }, [filterModel, data.rows]);

  const handleFilterChange = useCallback((filters) => {
    setFilterModel(filters);
  }, []);

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = users.find((user) => user.id === id);
    if (editedRow?.isNew) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleDeleteClick = (id) => () => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setUserToDelete(user);  // Establecer el usuario que se eliminará
    }
  };

  const handleUserDeleted = (id) => {
    setUsers(users.filter((user) => user.id !== id)); // Eliminar el usuario de la lista
    setUserToDelete(null);  // Limpiar el usuario a eliminar para evitar que el alert vuelva a aparecer
  };



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Primera fila: CustomFilterUser */}
      <Box sx={{ mb: 2 }}>
        <CustomFilterUser onFilterChange={handleFilterChange} />
      </Box>

      {/* Segunda fila: Título y QuickFilter */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <QuickFilter
            onChange={(value) => setFilterModel({ ...filterModel, user: value })} // Filtro solo la columna 'user'
          />
        </Box>
      </Box>

      {/* DataGrid */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <DataGrid
          rows={filteredRows}
          columns={data.columns}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          pageSize={5}
          sx={{
            height: '100%',
            '& .MuiDataGrid-footer': {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1,
            },
          }}
        />
      </Box>

      {/* Mostrar el componente de eliminGación si se seleccionó un usuario para eliminar */}
      {userToDelete && (
        <DeleteUser
          userId={userToDelete.id}
          onUserDeleted={handleUserDeleted}
        />
      )}

    </Box>
  );
}
