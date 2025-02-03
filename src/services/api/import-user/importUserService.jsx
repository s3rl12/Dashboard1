import apiImportUser from './apiImportUser';

const importUserService = {
    importUsers: async (file) => {
        const formData = new FormData();
        formData.append('file', file); // Asegurar que el campo coincide con Postman
        
        console.log([...formData.entries()]); // Verificar qué se está enviando

        const response = await apiImportUser.post('/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Axios maneja esto automáticamente, pero lo dejamos
            },
        });

        return response.data;
    },
};

export default importUserService;
