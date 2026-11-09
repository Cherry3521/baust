import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { DemoRoleSwitcher } from './DemoRoleSwitcher';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] text-slate-900 font-sans">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <DemoRoleSwitcher />
    </div>
  );
};
