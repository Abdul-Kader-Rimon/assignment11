import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../components/Aside/Aside';

const DashboardLayOut = () => {
    return (
        <div className='flex'>
            
            <Aside  />
            <div className='flex-1 p-5'>
                <Outlet/>
            </div>
            
        </div>
    );
};

export default DashboardLayOut;