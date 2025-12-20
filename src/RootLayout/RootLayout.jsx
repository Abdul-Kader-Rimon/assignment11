import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Loader from '../components/Loader/Loader';

const RootLayout = () => {
   const navigation = useNavigation();
    return (
      <div>
        <div className="w-11/12 mx-auto flex flex-col min-h-screen">
          {navigation.state === "loading" && <Loader />}
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