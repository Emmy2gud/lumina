

import React from 'react';


import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import Navbar from '../common/Navbar';
import DashNav from '../common/DashNav';


const Layout = ({ children}) => {
  return (
    <div className="min-h-screen bg-gray-50">

      <DashNav/>
      <div className="flex pt-16">
        <Sidebar/>
        <main className="flex-1 ">
          {children}
        </main>

      </div>

    </div>
  );
};

export default Layout;
