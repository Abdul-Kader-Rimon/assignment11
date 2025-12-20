import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const RootLayout = () => {
    return (
      <div>
        <div className="w-11/12 mx-auto flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    );
};

export default RootLayout;