import React from 'react';
import TabsControlPanel from '../../components/Tabs/TabsControlPanel';
const ControlPanel = () => {
  return (
    <div className='flex flex-col w-full h-full gap-3 p-5'>
      <h1 className='text-lg text-start font-bold'>PANEL DE CONTROL</h1>
      <TabsControlPanel />
    </div>
  );
};

export default ControlPanel;