import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#F2F2F2] p-3">
      <div className="h-full flex gap-3">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="h-[calc(100vh-24px)] flex-1 flex flex-col gap-3">
          {/* Top Bar */}
          <TopBar />
          
          {/* Page Content */}
          <main className="flex-1 bg-white rounded-xl p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;