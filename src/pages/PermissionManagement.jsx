import React, { useEffect, useState } from 'react';
import { permissionAPI } from '../services/apiEndpoints';

export default function PermissionManagement() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const { data } = await permissionAPI.getAll();
      setPermissions(data?.data || []);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Permission Management</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors text-sm font-medium">Add Permission</button>
      </div>
      
      {loading ? (
        <p className="text-gray-500">Loading permissions...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-sm font-medium text-gray-600">ID</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600">Module</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600">Actions Allowed</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {permissions.length > 0 ? permissions.map((perm) => (
                <tr key={perm.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{perm.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{perm.module}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{perm.actionsAllowed}</td>
                  <td className="py-3 px-4 text-sm text-right">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500 text-sm">No permissions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
