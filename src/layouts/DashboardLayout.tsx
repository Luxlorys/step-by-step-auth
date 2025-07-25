import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import { useAuth } from '@/contexts/AuthContext';

const DashboardLayout = () => {
  const { isSuperAdmin } = useAuth();
  
  return (
    <div className="h-screen bg-[#F2F2F2] p-3 overflow-hidden"> {/* Changed to overflow-hidden */}
      <div className="h-full flex gap-3">
        {/* Sidebar */}
        <Sidebar isSuperAdmin={isSuperAdmin} />
        
        {/* Main Content */}
        <div className="h-full flex-1 flex flex-col gap-3 min-w-0"> {/* Added min-w-0 */}
          {/* Top Bar */}
          <TopBar />
          
          {/* Page Content */}
          <main className="flex-1 bg-white rounded-xl p-6 overflow-auto"> {/* This stays overflow-auto */}
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;