import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
  adminName?: string;
}

const menuItems = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Live Services', href: '/admin/live-services' },
  { label: 'Prayers', href: '/admin/prayers' },
  { label: 'Gallery', href: '/admin/gallery' },
  { label: 'Events', href: '/admin/events' },
  { label: 'Sermons', href: '/admin/sermons' },
  { label: 'Leaders', href: '/admin/leaders' },
  { label: 'Settings', href: '/admin/settings' },
];

export function AdminLayout({ children, adminName = 'Admin' }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        className="bg-primary-900 text-white w-64 overflow-y-auto hidden lg:block"
        initial={{ x: -256 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6">
          <h1 className="text-2xl font-poppins font-bold">Admin Panel</h1>
          <p className="text-primary-200 text-sm mt-2">{adminName}</p>
        </div>

        <nav className="mt-8 space-y-2 px-4">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-4 py-3 rounded-lg hover:bg-primary-800 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary-800">
          <motion.button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <LogOut size={20} />
            Logout
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between lg:hidden">
          <h1 className="text-xl font-bold text-gray-900">Admin</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
