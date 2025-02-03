import React from "react";
import { TextField } from "@mui/material";

const ResetUserPassword = () => {
  return (
    <div className="flex flex-col w-full pt-8 gap-8 bg-white font-teko font-normal">
      {/* Sección Cambiar Contraseña */}
      <div className="flex flex-col w-full gap-6 px-5">
        <div className="flex flex-col gap-4 w-full text-start">
          {/* Contraseña Actual */}
          <div className="flex items-center gap-4">
            <label className="text-lg w-40">Contraseña actual:</label>
            <TextField
              placeholder="Ingresa tu contraseña actual"
              type="password"
              variant="outlined"
              size="small"
              fullWidth
            />
          </div>

          {/* Nueva Contraseña */}
          <div className="flex items-center gap-4">
            <label className="text-lg w-40">Nueva contraseña:</label>
            <TextField
              placeholder="Ingresa tu nueva contraseña"
              type="password"
              variant="outlined"
              size="small"
              fullWidth
            />
          </div>

          {/* Confirmar Contraseña */}
          <div className="flex items-center gap-4">
            <label className="text-lg w-40">Confirmar contraseña:</label>
            <TextField
              placeholder="Confirma tu nueva contraseña"
              type="password"
              variant="outlined"
              size="small"
              fullWidth
            />
          </div>
        </div>

        {/* Requisitos de Contraseña */}
        <div className="flex flex-col bg-gray-100 p-6 rounded-md items-start">
          <p className="text-base text-gray-700">La contraseña debe cumplir con los siguientes requisitos:</p>
          <ul className="text-sm text-gray-600 list-disc ml-6 text-start">
            <li>Mínimo 8 caracteres</li>
            <li>Al menos una letra mayúscula</li>
            <li>Al menos un número</li>
            <li>Un carácter especial (por ejemplo, @, #, $, %)</li>
          </ul>
        </div>

        {/* Botón Guardar */}
        <div className="flex justify-end gap-4 mt-6">
          <button className="w-[120px] text-xl bg-[#183466] text-white rounded-md shadow-md hover:bg-[#152B52] px-4 py-1 transition duration-300">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetUserPassword;
