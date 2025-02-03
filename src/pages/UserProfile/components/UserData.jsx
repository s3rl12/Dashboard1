import React from "react";
import { TextField } from "@mui/material";

const FormField = ({ label, value }) => {
  return (
    <div className="flex gap-4 items-center">
      <label className="text-lg w-36">{label}:</label>
      <TextField
        value={value}
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          readOnly: true, // Si no se va a editar
        }}
      />
    </div>
  );
};

const UserData = ({ profileData }) => {
  // Si profileData aún no está definido, renderizamos un loader o nada.
  if (!profileData) {
    return <div>Cargando datos...</div>;
  }

  return (
    <form className="flex flex-col w-full pt-8 gap-8 bg-white font-teko font-normal px-5">
      <fieldset className="flex flex-col w-full gap-6">
        <div className="flex gap-6 w-full text-start">
          {/* Primera columna */}
          <div className="flex flex-col w-1/2 gap-4">
            <FormField label="Nombres" value={profileData.nombre ?? ""} />
            <FormField label="Teléfono" value={profileData.telefono ?? ""} />
            <FormField label="DNI" value={profileData.dni ?? ""} />
            <FormField label="Tipo de fiscal" value={profileData.tipo_fiscal ?? ""} />
          </div>

          {/* Segunda columna */}
          <div className="flex flex-col w-1/2 gap-4">
            <FormField label="Apellidos" value={profileData.apellido ?? ""} />
            <FormField label="Correo" value={profileData.email ?? ""} />
            <FormField label="Dirección" value={profileData.direccion ?? ""} />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            aria-label="Guardar información del usuario"
            className="w-[120px] text-xl bg-[#183466] text-white rounded-md shadow-md hover:bg-[#152B52] py-1 transition duration-300"
          >
            Guardar
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default UserData;
