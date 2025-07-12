
import React from 'react';
import { Users, UserCheck, UserPlus } from 'lucide-react';

const AllMembersTab = () => {
  const stats = [
    { label: 'Total Members', value: '2,345', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Members', value: '1,892', icon: UserCheck, color: 'bg-green-500' },
    { label: 'Pending Invites', value: '453', icon: UserPlus, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">All members</h2>
        <p className="text-gray-600 mt-1">Overview of all members in your network</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New member joined', member: 'sarah.w@gmail.com', time: '2 hours ago' },
            { action: 'Invitation sent to', member: 'mike.j@company.com', time: '4 hours ago' },
            { action: 'Member updated profile', member: 'john.doe@business.org', time: '1 day ago' },
            { action: 'New member joined', member: 'emma.jones@outlook.com', time: '2 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">
                  <span className="text-gray-600">{activity.action}</span>
                  <span className="font-medium text-gray-900 ml-1">{activity.member}</span>
                </span>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMembersTab;
