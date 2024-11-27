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
function App() {

  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate
  const [alertVisible, setAlertVisible] = useState(false); // Estado para el Alert
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    try {
      const loginData = {
        email: email,
        password: password,
      };

      const response = await fetch("http://192.168.181.96/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.status);
      }

      const data = await response.json();


      // Manejo de respuesta exitosa
      console.log('Inicio de sesión exitoso:', data);
      // Asegúrate de que estos campos existan en la respuesta
      // Extraer los datos relevantes
      const { token } = data;
      const { nombre, apellido, email: userEmail } = data.data;

      const userData = {
        name: `${nombre} ${apellido}`,
        email: userEmail,
        token
      };
      console.log('Datos del usuario extraídos:', userData);

      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('Token de autenticación:', token);
      alert("¡Inicio de sesión exitoso! Redirigiendo...");



      navigate('/dashboard'); // Redirige al dashboard


    } catch (error) {
      console.log('Error:', error.message);
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
      <div
        className="flex items-start justify-start h-screen"
        style={{
          backgroundImage: 'url("../src/Img/fondoderecho.jpg")',
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
        <div className="container bg-white p-6 rounded-md shadow-md w-2/6 h-full max-h-full pt-16">
          <div className="h-28 w-80 mb-4 ml-9">
            <img src="../src/Img/LOGO.PNG" alt="" className="mx-auto" />
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
                <p className="text-[#616161] text-xs">¿Olvidó su contraseña? <a className="text-xs recover-password text-blue-600 hover:underline" href="#">Recuperar</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
