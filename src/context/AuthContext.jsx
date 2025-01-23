import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const [workloadData, setWorkloadData] = useState(null); // Añade el estado para WorkLoad
    const [dependencyId, setDependencyId] = useState(null);
    // Obtener la fecha actual en formato `yyyy-MM-dd`
    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Devuelve la fecha en formato `yyyy-MM-dd`
    };
    // Datos del formulario de creación de usuario
    const [userData, setUserData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        dni: '',
        sexo: '',
        direccion: '',
        fecha_nacimiento: '',
        foto_perfil: null,
        extension: '',
        tipo_fiscal: '',
        activo: '1',
        fecha_ingreso: getCurrentDate(),
        password: '',
        password_confirmation: '',
        estado: '1',
        fiscal_fk: null,
        roles_fk: 'null',  // Cambiado de [] a null
        despacho_fk: 'null',  // Solo almacenamos despacho_fk
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(';').forEach((cookie) => {
            const [name] = cookie.split('=');
            document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname}`;
        });

        if (window.axios) {
            delete window.axios.defaults.headers.common['Authorization'];
        }
    };

    const isAuthenticated = () => {
        return !!user;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated,
                workloadData, // Expón los datos de WorkLoad
                setWorkloadData, // Expón el setter
                userData, // Expón los datos del formulario
                setUserData, // Expón el setter para actualizar los datos del formulario
                dependencyId,
                setDependencyId,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para acceder al contexto
export const useAuth = () => useContext(AuthContext);
