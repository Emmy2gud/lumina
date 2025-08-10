

import React from 'react';


import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import Navbar from '../common/Navbar';


const Layout = ({ children}) => {
  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />
      <div className="flex pt-16">
        <Sidebar/>
        <main className="flex-1  ">
          {children}
        </main>

      </div>

    </div>
  );
};

export default Layout;
