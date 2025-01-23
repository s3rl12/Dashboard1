import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import LoadingBackdrop from './components/LoadingBackdrop';
import RecoverPassword from './components/recoverpassword';

import { useAuth } from "./context/AuthContext"; // Importa el hook de autenticación
const apiIp = import.meta.env.VITE_API;
function App() {
  const { login } = useAuth(); // Llamada al hook al inicio del componente
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRecoverDialogOpen, setIsRecoverDialogOpen] = useState(false);
  const navigate = useNavigate(); // Inicializa useNavigate
  const [alertVisible, setAlertVisible] = useState(false); // Estado para el Alert
  const [loading, setLoading] = useState(false); // Estado para mostrar el LoadingBackdrop
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    setLoading(true); // Mostrar el spinner de carga
    setAlertVisible(false); // Restablecer el estado de alertVisible al inicio

    // Limpia cualquier token residual antes de la solicitud
    localStorage.removeItem('token');

    try {
      const loginData = {
        email: email,
        password: password,
      };

      const response = await fetch(`http://${apiIp}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cache-Control': 'no-store',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        // Si la respuesta no es exitosa, mostrar el Alert
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 5000); // Ocultar después de 3 segundos
        throw new Error('Error en la solicitud: ' + response.status);
      }

      const data = await response.json();
      const { token, data: userData } = data;

      // Guardar datos de usuario y token
      const fullUserData = {
        name: `${userData.nombre} ${userData.apellido}`,
        email: userData.email,
        token,
        rol: userData.roles_fk,
        uuid: userData.uuid,
      };
      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(fullUserData));
      localStorage.setItem('token', token);

      // Solicitar roles desde la API
      const rolesResponse = await fetch(`http://${apiIp}/api/ges_user/roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!rolesResponse.ok) {
        throw new Error('Error al obtener los roles');
      }

      const rolesData = await rolesResponse.json();

      // Guardar roles en localStorage
      localStorage.setItem('roles', JSON.stringify(rolesData.data));

      // Actualizar contexto de autenticación
      login(fullUserData); // Actualizar contexto

      console.log('Token de autenticación:', token);
      alert("¡Inicio de sesión exitoso! Redirigiendo...");



      navigate('/dashboard'); // Redirige al dashboard


    } catch (error) {
      console.log('Error:', error.message);
    } finally {
      setLoading(false); // Ocultar el spinner de carga
    }

    /*Verifica las credenciales
    if (email === 'rbenitot@gmail.com' && password === '123456') {
      navigate('/dashboard'); // Redirige a la página de dashboard
    } else {
      setAlertVisible(true); // Muestra el Alert
      setTimeout(() => setAlertVisible(false), 3000);
      //alert('Credenciales incorrectas');
    }
    */
  };

  return (
    <>
      {/* Componente de carga */}
      <LoadingBackdrop open={loading} />
      {/* Diálogo de recuperación de contraseña */}
      <RecoverPassword
        open={isRecoverDialogOpen}
        onClose={() => setIsRecoverDialogOpen(false)}
      />
      <div
        className="flex items-center justify-center h-screen"
        style={{
          backgroundImage: 'url("../src/Img/fondoderecho.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div>
          {alertVisible && (
            <Stack sx={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              maxWidth: '300px'
            }}>
              <Alert variant="filled" severity="error">
                Credenciales incorrectas
              </Alert>
            </Stack>
          )}
        </div>
        <div className="flex flex-row bg-white rounded-3xl shadow-md w-5/6 h-5/6 mx-auto items-center justify-center">
          <div className="flex flex-col items-center rounded-l-2xl justify-center bg-[#152B52] w-1/2 h-full text-white px-8 py-16">
            <h1 className="text-9xl font-semibold mb-6 text-[#ACC8FA]">SIEF</h1>
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Sistema de Información <br />Estadística Fiscal (SIEF)
            </h3>
            <p className="text-center leading-relaxed max-w-sm text-xs">
              El Sistema de Información y Estadística Fiscal (SIEF) es una herramienta desarrollada para el análisis y
              seguimiento del desempeño en la fiscalía. Facilita la generación de reportes detallados y rankings que
              permiten evaluar el rendimiento de fiscales, despachos y dependencias.
            </p>
          </div>

          <div className='flex flex-col items-center justify-center w-1/2 h-full rounded-r-2xl bg-white p-8' >
            <div className="h-28 w-80 mb-4">
              <img src="../src/Img/LOGO.webp" alt="" className="mx-auto" />
            </div>
            <div className="login-content flex flex-col items-center justify-center w-full">
              <form onSubmit={handleLogin} action="" method="get" className="w-full max-w-xs">
                <h2 className="text-2xl font-inter font-semibold mb-4 text-center text-[#616161]">Iniciar sesión</h2>
                <p className="font-inter mb-4 text-sm text-center text-[#616161]">Por favor, ingrese sus credenciales correctamente para acceder al sistema.</p>

                <div className="flex items-center justify-center mb-2 p-2 rounded-2xl w-full">
                  <Box
                    sx={{
                      borderRadius: '10px',
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      backgroundColor: 'white',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      fontSize: '12px',
                      color: '#616161',
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-basic"
                      label="Correo electrónico*."
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{
                        borderRadius: '10px',
                        '& fieldset': { borderRadius: '10px', borderColor: '#A4A4A4' },
                        '& .MuiInputLabel-root': { color: '#616161', fontFamily: 'Inter, sans-serif', fontWeight: '500', fontSize: '12px' },
                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#A4A4A4' },
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#A4A4A4' },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#A4A4A4' },
                        '& .MuiInputBase-input': { fontFamily: 'Inter, sans-serif', fontWeight: '500', fontSize: '12px', color: '#616161' },
                      }}
                    />
                  </Box>
                </div>

                <div className="flex items-center justify-center mb-2 p-2 rounded-2xl w-full">
                  <Box
                    sx={{
                      borderRadius: '10px',
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      backgroundColor: 'white',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      fontSize: '12px',
                      color: '#616161',
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password" size="small" sx={{
                        color: '#616161',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '500',
                        fontSize: '12px',
                      }}>Contraseña</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        size="small"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              sx={{ fontSize: '20px' }}
                            >
                              {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Contraseña"
                        sx={{
                          borderRadius: '10px',
                          '& fieldset': { borderRadius: '10px', borderColor: '#A4A4A4' },
                          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#A4A4A4' },
                          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#A4A4A4' },
                          '& .MuiInputBase-input': { fontFamily: 'Inter, sans-serif', fontWeight: '500', fontSize: '12px', color: '#616161' },
                        }}
                      />
                    </FormControl>
                  </Box>
                </div>
                <div className="flex items-center justify-center mb-2 p-2 rounded-2xl w-full">
                  <Stack spacing={2} sx={{ width: '100%' }}>
                    <Button variant="contained" endIcon={<SendIcon />} type='submit'
                      sx={{
                        backgroundColor: '#152B52',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '0.5rem',
                        width: '100%',
                        boxSizing: 'border-box',
                        marginTop: '0.5rem'
                      }}
                    >
                      Ingresar
                    </Button>
                  </Stack>
                </div>

                <div className="mb-4 text-right mt-3">
                  <p className="text-[#616161] text-xs">¿Olvidó su contraseña? <a className="text-xs recover-password text-blue-600 hover:underline" onClick={() => setIsRecoverDialogOpen(true)}>Recuperar</a></p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
