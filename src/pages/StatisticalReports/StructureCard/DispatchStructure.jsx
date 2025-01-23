import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import DispatchCardList from './DispatchCardList';
import dispatchesDependencyService from '../../../services/api/dispatchesDependency-list/dispatchesDependencyService';

const DispatchStructure = ({ open, onClose, dependencyId, navigate }) => { // Agregamos navigate como prop
  const [dispatches, setDispatches] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchDispatches = async () => {
      if (dependencyId) {
        setLoading(true);
        try {
          const response = await dispatchesDependencyService.getDispatchesByDependency(dependencyId);
          if (response.data && response.data.despachos.length > 0) {
            setDispatches(response.data.despachos);
          } else {
            setDispatches([]); // Si no hay despachos, asegurarse de que esté vacío
          }
        } catch (error) {
          console.error(`Error fetching dispatches for dependency ${dependencyId}:`, error);
          setDispatches([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDispatches();
  }, [dependencyId]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '900px', borderRadius: '10px' } }}
    >
      <DialogTitle>Despachos Asociados</DialogTitle>
      <DialogContent>
        {loading ? (
          <Typography>Cargando despachos...</Typography>
        ) : dispatches.length > 0 ? (
          <DispatchCardList  navigate={navigate} dependencyId={dependencyId} /> 
        ) : (
          <Typography>No hay despachos disponibles</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DispatchStructure;
