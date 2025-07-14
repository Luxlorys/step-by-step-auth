
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';

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
      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>

      {/* Profile Button */}
      <Button
        variant="outline"
        onClick={handleProfile}
        className="flex items-center gap-2 bg-white hover:bg-gray-50"
      >
        <User className="w-4 h-4" />
        Profile
      </Button>
    </div>
  );
};

export default TopBar;
