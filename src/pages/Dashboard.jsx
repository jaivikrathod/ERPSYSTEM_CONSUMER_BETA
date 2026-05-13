import React from 'react';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Dashboard Area</h2>
      <p className="text-gray-600">Welcome back, {user?.name || 'User'}! This is your protected dashboard area.</p>
    </div>
  );
}
