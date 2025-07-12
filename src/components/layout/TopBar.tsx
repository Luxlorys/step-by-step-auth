
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';

const getPageTitle = (pathname: string) => {
  const titleMap: Record<string, string> = {
    '/analytics': 'Analytics',
    '/members': 'Members management',
    '/messaging': 'Messaging & Events',
    '/network': 'Network management',
    '/subscriptions': 'Manage subscriptions',
    '/my-profile': 'My Profile',
  };
  return titleMap[pathname] || 'Analytics';
};

const TopBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfile = () => {
    navigate('/my-profile');
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
