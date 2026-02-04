

import React from 'react';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import Navbar from '../common/Navbar';
import DashNav from '../common/DashNav';
import { SidebarProvider, useSidebar } from '../../contexts/SidebarContext';

const LayoutContent = ({ children }) => {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashNav />
      <div className="flex pt-16">
        <Sidebar />
        <main className={`flex-1 transition-all duration-200 ${collapsed ? 'ml-20' : 'md:ml-72'} m-0`}>
          {children}
        </main>
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
};

export default Layout;
