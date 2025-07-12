const Notifications = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">123</span>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Notification Center</h2>
        <p className="text-gray-600">
          This page will display system notifications and alerts for super admins.
        </p>
      </div>
    </div>
  );
};

export default Notifications;