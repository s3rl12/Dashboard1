import React, { useState } from 'react';
import userListService from '../../../services/api/user-list/userListService';
import OptionalAlert from '../../../components/alert/OptionalAlert';

export default function DeleteUser({ userId, onUserDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [alertVisible, setAlertVisible] = useState(true);  // Controla la visibilidad de la alerta

  // Función que manejará la eliminación del usuario
  const handleDelete = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await userListService.deleteUser(userId);  // Llamada al servicio deleteUser
      if (result.status === 200) {
        onUserDeleted(userId);  // Notifica al componente padre (UserDataGrid) que se eliminó el usuario
      }
    } catch (err) {
      setError("Hubo un error al eliminar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = () => {
    // Llamamos a la función que ejecutará la eliminación después de la confirmación de la alerta
    handleDelete();
    setAlertVisible(false);  // Después de confirmar, deshabilitamos la alerta
  };

  return (
    <div>
      {/* Mostrar la alerta solo si no se ha confirmado previamente */}
      {alertVisible && (
        <OptionalAlert
          title="¿Estás seguro de que deseas eliminar este usuario?"
          text="¡Esta acción no se puede deshacer!"
          onConfirm={handleConfirmDelete}  // Pasamos la función de eliminación al confirmar
        />
      )}
      {loading && <p>Eliminando usuario...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
