import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import Dashboard from './dashboard.jsx';
import ControlPanel from './pages/ControlPanel/ControlPanel';
import PrivateRoute from './routes/PrivateRoute';    // Ruta protegida
import { AuthProvider } from './context/AuthContext'; // Ajusta la ruta según tu estructura
import './index.css'
import './font.css'



const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  </StrictMode>
);
