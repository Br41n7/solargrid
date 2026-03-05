import { Link, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  FileText, 
  UserCircle, 
  MessageSquare, 
  LogOut,
  Menu,
  X,
  HardHat,
  FolderOpen,
  Activity
} from 'lucide-react';
import { useState } from 'react';

interface AdminLayoutProps {
  user: any;
  onLogout: () => void;
}

export default function AdminLayout({ user, onLogout }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Clients', path: '/admin/clients', icon: Users },
    { name: 'Invoices', path: '/admin/invoices', icon: FileText },
    { name: 'Staff', path: '/admin/staff', icon: UserCircle },
    { name: 'Quote Requests', path: '/admin/quotes', icon: MessageSquare },
    { name: 'Documents', path: '/admin/documents', icon: FolderOpen },
    { name: 'Audit Logs', path: '/admin/logs', icon: Activity },
  ];

  const handleLogoutClick = () => {
    onLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-blue-900 text-white transition-all duration-300 flex flex-col fixed h-full z-30`}
      >
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center space-x-2">
              <HardHat className="h-8 w-8 text-orange-500" />
              <span className="font-bold text-lg">SolaceGrid</span>
            </div>
          )}
          {!isSidebarOpen && <HardHat className="h-8 w-8 text-orange-500 mx-auto" />}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-blue-800 rounded"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center p-4 hover:bg-blue-800 transition-colors group"
            >
              <item.icon size={24} className="shrink-0" />
              {isSidebarOpen && <span className="ml-4">{item.name}</span>}
              {!isSidebarOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-800">
          <button
            onClick={handleLogoutClick}
            className="flex items-center w-full p-2 hover:bg-red-600 rounded transition-colors group"
          >
            <LogOut size={24} className="shrink-0" />
            {isSidebarOpen && <span className="ml-4">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800 uppercase tracking-wider text-sm">
            {user.role} Portal
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user.full_name}</span>
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
              {user.full_name.charAt(0)}
            </div>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
