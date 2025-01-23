import React from 'react';
import DefaultTabs from '../../components/Tabs/DefaultTabs';
import Profile from './components/Profile';
const UserProfile = () => {
    return (
        <div className='flex flex-row h-full w-full gap-3 p-5'>
            <div className='flex w-1/6'>
                <Profile />
            </div>
            <div className='flex flex-col w-5/6 bg-white rounded-2xl p-5 gap-3 shadow-md'>
                <h1 className='text-lg text-start font-bold'>Datos Personales</h1>
                <DefaultTabs />
            </div>

        </div>
    );
};
export default UserProfile;