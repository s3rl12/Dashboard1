// src/Dashboard.jsx
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import LayersIcon from '@mui/icons-material/Layers';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Reports from './Reports';  // Importa el componente Reports
import Documents from './Documents';
import User from './User';
import DashboardAdmin from './dashboardAdmin';
import { useAuth } from "./context/AuthContext";
import ReportGE from './ReportGE';
import CustomAccordion from './Cargalaboral'; // Importa el componente CustomAccordion
import RegisterAreas from './pages/RegisterAreas/RegisterAreas';
import ReportManagement from './pages/ReportManagement/ReportManagement';
import UserProfile from './pages/UserProfile/UserProfile';
import UserManagement from './pages/UserManagement/UserManagement';
import StatisticalReports from './pages/StatisticalReports/StatisticalReports';
import DocumentManager from './pages/DocumentManager/DocumentManager';
import CrimesHighestIncidence from './pages/StatisticalFunctions/CrimesHighestIncidence/CrimesHighestIncidence';
import RolesPermissions from './pages/RolesPermissions/RolesPermissions';
import ControlPanel from './pages/ControlPanel/ControlPanel';
import WorkLoad from './pages/StatisticalFunctions/WorkLoad/WorkLoad';

const apiIp = import.meta.env.VITE_API;
const token = localStorage.getItem('token');

import './index.css';


const NAVIGATION = [
    { segment: 'dashboard', title: 'Panel de control', icon: <DashboardIcon /> },
    //{ segment: 'workload', title: 'Work Load', icon: <LayersIcon /> },
    //{ segment: 'crimeshighestincidence', title: 'Reporte CMI', icon: <BarChartIcon /> },
    { segment: 'statisticalreports', title: 'Informes estadísticos', icon: <BarChartIcon /> },
    //{ segment: 'reportmanagement', title: 'Report Management', icon: <DescriptionIcon /> },
    { segment: 'documentmanager', title: 'Administrador de documentos', icon: <DescriptionIcon /> },
    { segment: 'rolespermissions', title: 'Roles y permisos', icon: <LayersIcon /> },
    //{ segment: 'registerareas', title: 'Registro de áreas', icon: <LayersIcon /> },
    { segment: 'userprofile', title: 'Perfil de usuario', icon: <PersonIcon /> },
    { segment: 'usermanagement', title: 'Gestión de usuarios', icon: <PersonIcon /> },
    {
        segment: 'gestion',
        title: 'Gestión de Áreas',
        icon: <LayersIcon />,
        children: [
            {
                segment: 'lista-areas',
                title: 'Lista de Áreas',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'Listas-de-fiscales',
                title: 'Listas de fiscales',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'logistica',
                title: 'Logística',
                icon: <DescriptionIcon />,
            },
            
        ],
    },
];

const demoTheme = createTheme({
    palette: {
        mode: 'light', // Aseguramos que el tema esté en modo claro
        primary: {
            main: '#152B52', // Azul principal
        },
        secondary: {
            main: '#ff4081', // Color secundario
        },
        background: {
            default: '#f5f5f5', // Fondo claro
            paper: '#ffffff', // Fondo de los componentes
        },
        text: {
            primary: '#000000', // Texto principal negro
            secondary: '#666666', // Texto secundario gris
        },
        checkbox: {
            main: '#1976d2', // Azul claro personalizado
            checked: '#152B52', // Color al estar seleccionado
            hover: '#1e88e5', // Color al pasar el cursor
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme', // Permite cambiar entre esquemas de color
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});


function DemoPageContent({ pathname, navigate }) {
    let content;

    switch (pathname) {
        case '/dashboard':
            content = <ControlPanel />;
            break;
        case '/workload':  // Nuevo caso para WorkLoad
            content = <WorkLoad />;  // Este es el componente que se renderiza cuando se navega a 'workload'
            break;
        case '/crimeshighestincidence': // Nuevo caso
            content = <CrimesHighestIncidence />;
            break;
        case '/statisticalreports':  // Nueva ruta para StatisticalReports
            content = <StatisticalReports navigate={navigate} />;
            break;
        /*
            case '/reportmanagement':
            content = <ReportManagement />;
            break;
        */
        case '/documentmanager':
            content = <DocumentManager />;
            break;
        case '/rolespermissions': // Nuevo caso
            content = <RolesPermissions />;
            break;
        case '/gestion/lista-areas': // Nuevo caso
            content = <RegisterAreas />;
            break;
        case '/gestion/Listas-de-fiscales': // Nuevo caso
            content = <Typography>Contenido por defecto para Listas de fiscales</Typography>;
            break;
        case '/gestion/logistica': // Nuevo caso
            content = <Typography>Contenido por defecto para Logística</Typography>;
            break;
        case '/userprofile': // Caso para UserProfile
            content = <UserProfile />;
            break;
        case '/usermanagement':  // Nuevo caso para UserManagement
            content = <UserManagement />;
            break;
        case '/reports': // Renderiza Reports.jsx sin incluir en NAVIGATION
            content = <Reports navigate={navigate} />;
            break;
        default:
            content = <Typography>Welcome to the Dashboard</Typography>;
    }

    return (
        <Box
            sx={{
                py: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                background: 'rgb(245 245 244)',
            }}
        >
            {content}
        </Box>
    );
}


DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function Search() {
    return (
        <React.Fragment>
            <Tooltip title="Search" enterDelay={1000}>
                <div>
                    <IconButton
                        type="button"
                        aria-label="search"
                        sx={{
                            display: { xs: 'inline', md: 'none' },
                            color: '#666666', // Cambia el color del ícono en la vista móvil
                        }}
                    >
                        <SearchIcon />
                    </IconButton>
                </div>
            </Tooltip>
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                InputLabelProps={{
                    style: { color: '#fff' }, // Cambia el color del texto del label
                }}
                InputProps={{
                    style: {
                        color: '#fff', // Cambia el color del texto dentro del input
                        backgroundColor: '#15315C', // Cambia el color de fondo del input
                        borderRadius: '15px', // Aplica el border-radius
                    },
                    endAdornment: (
                        <IconButton
                            type="button"
                            aria-label="search"
                            size="small"
                            sx={{
                                color: '#fff', // Cambia el color del ícono de búsqueda
                            }}
                        >
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: '#1976d2', // Fondo blanco para todo el input
                        borderRadius: '15px', // Border-radius del contenedor principal
                        '& fieldset': {
                            borderColor: '#15315C', // Cambia el color del borde
                            borderRadius: '15px', // Border-radius del borde
                        },
                        '&:hover fieldset': {
                            borderColor: '#15315C', // Cambia el borde al pasar el mouse
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#15315C', // Cambia el borde al hacer foco
                        },
                    },
                    display: { xs: 'none', md: 'inline-block' },
                    mr: 1,
                }}
            />
        </React.Fragment>
    );
}



function Dashboard() {
    const [pathname, setPathname] = useState('/dashboard');
    const navigate = useNavigate(); // Usar useNavigate directamente
    // Extrae `logout` del contexto de autenticación
    const { logout } = useAuth();
    const router = useMemo(() => ({
        pathname,
        navigate: setPathname,
        searchParams: new URLSearchParams(),
    }), [pathname]);

    const [session, setSession] = useState(() => {
        // Cargar datos del usuario desde localStorage al inicializar
        const storedUser = localStorage.getItem('user');
        return storedUser ? { user: JSON.parse(storedUser) } : null; // Cambiar a null si no existe
    });

    const authentication = useMemo(() => ({
        signIn: (userData) => {
            const userWithImage = {
                ...userData,
                image: 'https://avatars.githubusercontent.com/u/19550456',
            };

            localStorage.setItem('user', JSON.stringify(userWithImage));
            setSession({ user: userWithImage });
        },
        signOut: async () => {
            try {
                const storedToken = localStorage.getItem('token');
                if (!storedToken) {
                    throw new Error('No token found for logout');
                }

                const response = await fetch(`http://${apiIp}/api/logout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`,
                    },
                });

                if (!response.ok) {
                    console.warn('Error during API logout');
                }
            } catch (error) {
                console.error('Logout error:', error);
            } finally {
                logout(); // Limpieza centralizada
                navigate('/'); // Redirige al login tras cerrar sesión
            }
        },
    }), [logout, navigate]);



    // Redirigir al login si la sesión es nula
    useEffect(() => {
        if (!session) {
            navigate('/'); // Redirige al login
        }
    }, [session, navigate]);

    // Validar si la sesión es nula antes de intentar acceder a sus propiedades
    const userRole = session?.user?.rol?.roles || null;
    // Obtener roles desde localStorage
    const storedRoles = useMemo(() => {
        const roles = localStorage.getItem('roles');
        return roles ? JSON.parse(roles) : [];
    }, []);

    // Filtrar las rutas disponibles según el rol del usuario y roles almacenados
    const getNavigation = () => {
        if (!session) {
            return []; // Si la sesión es nula, no muestra rutas
        }
        if (!storedRoles.length) {
            console.warn('No se encontraron roles en localStorage.');
            return []; // Si no hay roles, no muestra rutas
        }

        // Normaliza los nombres de roles devueltos por la API
        const availableRoles = storedRoles.map(role => role.roles.toLowerCase().trim());

        // Normaliza el rol del usuario para la comparación
        const normalizedUserRole = userRole?.toLowerCase().trim();

        if (!availableRoles.includes(normalizedUserRole)) {
            console.warn(`El rol del usuario (${userRole}) no coincide con los roles disponibles.`);
            return []; // Si el rol del usuario no está en la lista, devuelve vacío
        }

        // Filtra las rutas según el rol normalizado
        switch (normalizedUserRole) {
            case 'administrador':
                return NAVIGATION; // Acceso completo
            case 'sub administrador':
                return NAVIGATION.filter(item =>
                    ['dashboard', 'ReportGE', 'ReportManagement', 'user'].includes(item.segment)
                );
            case 'usuario estadístico': // Usuario estadístico tiene acceso limitado
                return NAVIGATION.filter(item =>
                    ['dashboard', 'ReportGE', 'ReportManagement'].includes(item.segment)
                );
            case 'usuario':
                return NAVIGATION.filter(item =>
                    ['dashboard', 'ReportGE'].includes(item.segment)
                );
            default:
                console.warn('Rol desconocido:', normalizedUserRole);
                return []; // Rol desconocido
        }
    };

    const navigation = getNavigation(); // Rutas disponibles según el rol

    if (!session) {
        return null; // No renderiza nada si la sesión no está inicializada
    }

    return (
        <AppProvider session={session} authentication={authentication} navigation={navigation} router={router} theme={demoTheme}>
            <DashboardLayout
                slots={{
                    toolbarActions: () => (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                            }}
                        >
                            <Search />
                        </div>
                    ),
                }}
            >
                <DemoPageContent pathname={pathname} navigate={router.navigate} />
            </DashboardLayout>
        </AppProvider>
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
};


export default Dashboard;