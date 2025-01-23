import React from 'react';
import Swal from 'sweetalert2';
//import '../../assets/styles/OptionalAlert.css';
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const OptionalAlert = ({ title, text, onConfirm }) => {
    MySwal.fire({
        title: title || "¿Estás seguro?",  // Usar prop 'title' o valor por defecto
        text: text || "¡No podrás revertir esto!",  // Usar prop 'text' o valor por defecto
        icon: "warning",
        draggable: true,
        showCancelButton: true,
        confirmButtonText: "Yes, confirm it!",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();  // Llama a la función onConfirm cuando el usuario confirma
            Swal.fire({
                title: "¡Eliminado!",
                text: "El usuario ha sido eliminado.",
                icon: "success",
            });
        }
    });
};

export default OptionalAlert;
