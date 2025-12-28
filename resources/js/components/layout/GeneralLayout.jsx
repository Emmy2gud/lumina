
import React from 'react';

import Navbar from '../common/Navbar';
import Footer from '../common/Footer';


const Layout = ({ children}) => {
  return (
    <div className="min-h-screen ">

      <Navbar />
      <div className="flex pt-16">
        <main className="flex-1   ">
          {children}
        </main>

      </div>


      <Footer/>
    </div>
  );
};

export default Layout;
