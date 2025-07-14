
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User, ChevronDown, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const getPageTitle = (pathname: string) => {
  const titleMap: Record<string, string> = {
    '/dashboard/analytics': 'Analytics',
    '/dashboard/members': 'Members management',
    '/dashboard/messaging': 'Messaging & Events',
    '/dashboard/network': 'Network management',
    '/dashboard/subscriptions': 'Manage subscriptions',
    '/dashboard/my-profile': 'My Profile',
    '/dashboard/join-requests': 'Join Requests',
    '/dashboard/notifications': 'Notifications',
    '/dashboard/networks': 'Networks',
  };
  return titleMap[pathname] || 'Analytics';
};

const TopBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfile = () => {
    navigate('/dashboard/my-profile');
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="h-16 bg-white rounded-xl flex items-center justify-between px-6 flex-shrink-0">
      {/* Title with Back Icon */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="p-1"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
      </div>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Profile
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className='px-4'>
          <DropdownMenuItem onClick={handleProfile}>
            <User className="w-4 h-4 mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TopBar;
