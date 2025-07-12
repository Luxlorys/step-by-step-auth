
import React from 'react';

const MembershipRequestsTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Membership requests</h2>
        <p className="text-gray-600 mt-1">Review and manage pending membership requests</p>
      </div>
      
      <div className="border border-dashed border-gray-300 rounded-lg p-12 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">No membership requests</h3>
            <p className="text-gray-500 mt-1">When people apply to join your network, their requests will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipRequestsTab;
