// src/Dashboard.jsx
import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAuth } from "./context/AuthContext";
import RegisterAreas from './pages/RegisterAreas/RegisterAreas';
import UserProfile from './pages/UserProfile/UserProfile';
import UserManagement from './pages/UserManagement/UserManagement';
import StatisticalReports from './pages/StatisticalReports/StatisticalReports';
import DocumentManager from './pages/DocumentManager/DocumentManager';
import CrimesHighestIncidence from './pages/StatisticalFunctions/CrimesHighestIncidence/CrimesHighestIncidence';
import RolesPermissions from './pages/RolesPermissions/RolesPermissions';
import ControlPanel from './pages/ControlPanel/ControlPanel';
import WorkLoad from './pages/StatisticalFunctions/WorkLoad/WorkLoad';
import mpSVG from './assets/icons/mp.svg';
import './index.css';

// Definir la navegación con íconos pequeños y títulos reducidos
const NAVIGATION = [
    { segment: 'dashboard', title: 'Panel', icon: <DashboardIcon fontSize="small" /> },
    { segment: 'statisticalreports', title: 'Informes', icon: <BarChartIcon fontSize="small" /> },
    { segment: 'documentmanager', title: 'Docs', icon: <DescriptionIcon fontSize="small" /> },
    { segment: 'rolespermissions', title: 'Roles', icon: <AdminPanelSettingsIcon fontSize="small" /> },
    { segment: 'userprofile', title: 'Perfil', icon: <PersonIcon fontSize="small" /> },
    { segment: 'usermanagement', title: 'Usuarios', icon: <SupervisorAccountIcon fontSize="small" /> },
    {
        segment: 'gestion',
        title: 'Gestión',
        icon: <ApartmentIcon fontSize="small" />,
        children: [
            { segment: 'lista-areas', title: 'Áreas', icon: <DescriptionIcon fontSize="small" /> },
            { segment: 'Listas-de-fiscales', title: 'Fiscales', icon: <DescriptionIcon fontSize="small" /> },
            { segment: 'logistica', title: 'Logística', icon: <DescriptionIcon fontSize="small" /> },
        ],
    },
];

function DemoPageContent({ pathname, navigate }) {
    let content;
    switch (pathname) {
        case '/dashboard':
            content = <ControlPanel />;
            break;
        case '/workload':
            content = <WorkLoad />;
            break;
        case '/crimeshighestincidence':
            content = <CrimesHighestIncidence />;
            break;
        case '/statisticalreports':
            content = <StatisticalReports navigate={navigate} />;
            break;
        case '/documentmanager':
            content = <DocumentManager />;
            break;
        case '/rolespermissions':
            content = <RolesPermissions />;
            break;
        case '/gestion/lista-areas':
            content = <RegisterAreas />;
            break;
        case '/gestion/Listas-de-fiscales':
            content = <div className="text-center text-sm">Contenido por defecto para Fiscales</div>;
            break;
        case '/gestion/logistica':
            content = <div className="text-center text-sm">Contenido por defecto para Logística</div>;
            break;
        case '/userprofile':
            content = <UserProfile />;
            break;
        case '/usermanagement':
            content = <UserManagement />;
            break;
        case '/reports':
            content = <Reports navigate={navigate} />;
            break;
        default:
            content = <div className="text-center text-xl font-teko">Welcome to the Dashboard</div>;
    }
    return (
        <div className="py-2 flex flex-col items-center text-center bg-gray-100">
            {content}
        </div>
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
};

function Search() {
    return (
        <div className="flex items-center gap-4">
            <Tooltip title="Search" enterDelay={1000}>
                <div>
                    <IconButton type="button" aria-label="search" className="inline md:hidden text-gray-500">
                        <SearchIcon fontSize="small" />
                    </IconButton>
                </div>
            </Tooltip>
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{
                    style: {
                        color: '#fff',
                        backgroundColor: '#15315C',
                        borderRadius: '15px',
                    },
                    endAdornment: (
                        <IconButton type="button" aria-label="search" size="small" className="text-white">
                            <SearchIcon fontSize="small" />
                        </IconButton>
                    ),
                }}
                className="hidden md:inline-block mr-1"
            />
        </div>
    );
}

function Dashboard() {
    const [pathname, setPathname] = useState('/dashboard');
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isExpanded, setIsExpanded] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); //nuevo
    const [openMenus, setOpenMenus] = useState({});

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (windowWidth < 768) {
            setIsExpanded(false);
        }
    }, [windowWidth]);

    const toggleMenu = (segment, children) => {
        if (!isExpanded) {
            setPathname(`/gestion/${children[0].segment}`);
        } else {
            setOpenMenus(prev => ({ ...prev, [segment]: !prev[segment] }));
        }
    };

    // Actualizamos el estado 'pathname' para la navegación
    const router = useMemo(() => ({
        pathname,
        navigate: setPathname,
        searchParams: new URLSearchParams(),
    }), [pathname]);

    const [session, setSession] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? { user: JSON.parse(storedUser) } : null;
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
                logout();
                navigate('/');
            }
        },
    }), [logout, navigate]);

    useEffect(() => {
        if (!session) {
            navigate('/');
        }
    }, [session, navigate]);

    const userRole = session?.user?.rol?.roles || null;
    const storedRoles = useMemo(() => {
        const roles = localStorage.getItem('roles');
        return roles ? JSON.parse(roles) : [];
    }, []);

    const getNavigation = () => {
        if (!session) return [];
        if (!storedRoles.length) {
            console.warn('No se encontraron roles en localStorage.');
            return [];
        }
        const availableRoles = storedRoles.map(role => role.roles.toLowerCase().trim());
        const normalizedUserRole = userRole?.toLowerCase().trim();
        if (!availableRoles.includes(normalizedUserRole)) {
            console.warn(`El rol del usuario (${userRole}) no coincide con los roles disponibles.`);
            return [];
        }
        switch (normalizedUserRole) {
            case 'administrador':
                return NAVIGATION;
            case 'sub administrador':
                return NAVIGATION.filter(item =>
                    ['dashboard', 'ReportGE', 'ReportManagement', 'user'].includes(item.segment)
                );
            case 'usuario estadístico':
                return NAVIGATION.filter(item =>
                    ['dashboard', 'ReportGE', 'ReportManagement'].includes(item.segment)
                );
            case 'usuario':
                return NAVIGATION.filter(item =>
                    ['dashboard', 'ReportGE'].includes(item.segment)
                );
            default:
                console.warn('Rol desconocido:', normalizedUserRole);
                return [];
        }
    };

    const navigation = getNavigation();

    if (!session) {
        return null;
    }

    return (
        <div className="font-teko h-screen flex flex-col">
            {/* Barra superior */}
            <div className="fixed top-0 left-0 z-50 flex items-center gap-4 py-2 px-4 bg-[#183466] shadow-md w-full">
                <IconButton onClick={toggleSidebar} className="text-white">
                    <MenuIcon style={{ color: '#FFFFFF' }} />
                </IconButton>
                <img src={mpSVG} alt="Logo" className="h-12 w-auto" />
            </div>

            <div className="flex flex-1">
                <motion.div
                    initial={{ width: isExpanded ? 208 : 66.5 }}
                    animate={{ width: isExpanded ? 208 : 66.5 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed left-0 z-40 bg-[#183466] p-4 shadow-md overflow-y-auto"
                    style={{ 
                        top: '64px', // Height of the top bar (4rem = 64px)
                        height: 'calc(100vh - 64px)', // Full height minus top bar
                    }}
                >
                    <ul className="space-y-2">
                        {NAVIGATION.map((item, index) => {
                            const isSelected = `/${item.segment}` === pathname;
                            return (
                                <li key={index} className="text-white">
                                    <div
                                        className={`flex items-center px-2 py-1 rounded cursor-pointer ${isSelected ? 'bg-[#1F3F77]' : 'hover:bg-[#1F3F77]'}`}
                                        onClick={() => item.children ? toggleMenu(item.segment, item.children) : setPathname('/' + item.segment)}
                                    >
                                        <div>{item.icon}</div>
                                        {isExpanded && <span className="font-teko text-lg font-extralight ml-2">{item.title}</span>}
                                        {item.children && isExpanded && (
                                            <div className="ml-auto"> {/* Esto empuja el icono a la derecha */}
                                                {openMenus[item.segment] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                            </div>
                                        )}
                                    </div>
                                    {item.children && openMenus[item.segment] && isExpanded && (
                                        <ul className="pl-6 space-y-1">
                                            {item.children.map((subItem, subIndex) => (
                                                <li key={subIndex} className="text-white cursor-pointer hover:bg-[#1F3F77] px-2 py-1 rounded" onClick={() => setPathname(`/gestion/${subItem.segment}`)}>
                                                    {subItem.icon} <span className="ml-2">{subItem.title}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>

                            );
                        })}
                    </ul>
                </motion.div>
                {/* Contenido principal */}
                <div className="flex-1 overflow-y-auto" style={{ 
    marginTop: '64px', // Avoid top bar overlap
    marginLeft: isExpanded ? '208px' : '66.5px', // Avoid sidebar overlap
    height: 'calc(100vh - 64px)', // Fill remaining vertical space
  }}>
                    <DemoPageContent pathname={pathname} navigate={navigate} />
                </div>
            </div>
        </div>
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
};

export default Dashboard;
