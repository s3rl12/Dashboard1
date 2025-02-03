import React, { useState, useEffect } from "react";
import DefaultTabs from "../../components/Tabs/DefaultTabs";
import Profile from "./components/Profile";
import UserActivity from "./components/UserActivity";
import profileDataService from "../../services/api/profileData-list/profileDataService";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileDataService.getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col w-full h-full gap-4 font-teko p-2 text-start">
      {/* Sección de Perfil y Datos Personales */}
      <div className="flex w-full h-full gap-4">
        {/* Perfil */}
        <div className="w-1/4">
          <Profile
            userName={profile ? `${profile.nombre} ${profile.apellido}` : ""}
            userRole={profile && profile.roles_fk ? profile.roles_fk.roles : ""}
            fechaIngreso={profile ? profile.fecha_ingreso : ""}
            activo={profile ? profile.activo : 0}
          />
        </div>

        {/* Datos Personales */}
        <div className="flex flex-col w-3/4 bg-white rounded-2xl p-6 gap-4 shadow-md">
          <h1 className="text-xl font-semibold">Datos Personales</h1>
          <DefaultTabs profileData={profile} />
        </div>
      </div>

      {/* Sección de Actividad de Usuario y Datos Adicionales */}
      <div className="flex w-full gap-4">
        {/* Actividad de Usuario */}
        <div className="flex flex-col w-2/3 bg-white rounded-2xl p-6 gap-4 shadow-md">
          <h1 className="text-xl font-semibold">Actividad de Usuario</h1>
          <UserActivity />
        </div>

        {/* Datos Adicionales */}
        <div className="flex flex-col w-1/3 bg-white rounded-2xl p-6 gap-4 shadow-md">
          <h1 className="text-xl font-semibold">Datos Adicionales</h1>
          {/* Aquí puedes agregar más contenido en el futuro */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
