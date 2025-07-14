import { NavLink } from "react-router-dom";
import { Home, BarChart3, Users, Settings, FileText } from "lucide-react";

const adminNavigationItems = [
  { name: "View analytics", href: "/dashboard/analytics", icon: Home },
  { name: "Members management", href: "/dashboard/members", icon: BarChart3 },
  { name: "Messaging & Events", href: "/dashboard/messaging", icon: Users },
  { name: "Network management", href: "/dashboard/network", icon: Settings },
  { name: "Manage subscriptions", href: "/dashboard/subscriptions", icon: FileText },
];

const superadminNavigationItems = [
  { name: "Network Analytics", href: "/dashboard/analytics", icon: Home },
  { name: "Join request", href: "/dashboard/join-requests", icon: BarChart3 },
  { name: "Manage subscriptions", href: "/dashboard/subscriptions", icon: Users },
  { name: "Notifications (123)", href: "/dashboard/notifications", icon: Settings },
  { name: "Manage networks", href: "/dashboard/networks", icon: FileText },
];

interface SidebarProps {
  isSuperAdmin: boolean;
}

const Sidebar = ({ isSuperAdmin }: SidebarProps) => {
  return (
    <div className="w-64 bg-black text-white flex flex-col rounded-xl">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">YT</span>
          </div>
          <span className="font-semibold text-lg">YouInTown</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {(isSuperAdmin
            ? superadminNavigationItems
            : adminNavigationItems
          ).map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
