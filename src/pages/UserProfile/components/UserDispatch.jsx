import React from "react";
import { TextField, Button } from "@mui/material";

const UserDispatch = () => {
  return (
    <div className="flex flex-col w-full pt-8 gap-8 bg-white font-teko font-normal">
      {/* Sección Registrar Sede */}
      <div className="flex flex-col w-full gap-6 px-5">
        {/* Campos para registrar sede */}
        <div className="flex gap-6 w-full">
          {/* Primera columna */}
          <div className="flex flex-col w-full gap-4 text-start">
            {/* Campo Sede */}
            <div className="flex gap-4 items-center">
              <label className="text-lg w-36">Sede:</label>
              <TextField
                placeholder="Sede"
                variant="outlined"
                size="small"
                fullWidth
                slotProps={{
                  inputLabel: { shrink: false },
                }}
              />
            </div>

            {/* Campo Dependencia */}
            <div className="flex gap-4 items-center">
              <label className="text-lg w-36">Dependencia:</label>
              <TextField
                placeholder="Dependencia"
                variant="outlined"
                size="small"
                fullWidth
                slotProps={{
                  inputLabel: { shrink: false },
                }}
              />
            </div>

            {/* Campo Despacho */}
            <div className="flex gap-4 items-center">
              <label className="text-lg w-36">Despacho:</label>
              <TextField
                placeholder="Despacho"
                variant="outlined"
                size="small"
                fullWidth
                slotProps={{
                  inputLabel: { shrink: false },
                }}
              />
            </div>
          </div>
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

export default UserDispatch;
