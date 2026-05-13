import React, { useEffect, useState } from 'react';
import { permissionAPI } from '../services/apiEndpoints';

export default function PermissionManagement() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
      name: '',
      code: '',
      route: '',
      module: '',
      status: 1,
  });

  const [editingId, setEditingId] = useState(null);

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

  const handleChange = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value
      });
  };

  const resetForm = () => {
      setFormData({
          name: '',
          code: '',
          route: '',
          module: '',
          status: 1,
      });
      setEditingId(null);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          if (editingId) {
              await permissionAPI.update(editingId, formData);
          } else {
              await permissionAPI.create(formData);
          }
          fetchPermissions();
          resetForm();
      } catch (error) {
          console.error(error);
      }
  };

  const handleEdit = (perm) => {
      setEditingId(perm.id);
      setFormData({
          name: perm.name || '',
          code: perm.code || '',
          route: perm.route || '',
          module: perm.module || '',
          status: perm.status !== undefined ? perm.status : 1,
      });
  };

  const handleDelete = async (id) => {
      const confirmDelete = window.confirm('Are you sure?');
      if (!confirmDelete) return;

      try {
          await permissionAPI.delete(id);
          fetchPermissions();
      } catch (error) {
          console.error(error);
      }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Permission Management</h2>
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8">
          <input
              type="text"
              name="name"
              placeholder="Permission Name (e.g. Create Project)"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded"
              required
          />

          <input
              type="text"
              name="code"
              placeholder="Permission Code (e.g. CREATE_PROJECT)"
              value={formData.code}
              onChange={handleChange}
              className="border p-3 rounded"
              required
          />

          <input
              type="text"
              name="route"
              placeholder="Route (e.g. /projects/create)"
              value={formData.route}
              onChange={handleChange}
              className="border p-3 rounded"
          />

          <input
              type="text"
              name="module"
              placeholder="Module (e.g. project)"
              value={formData.module}
              onChange={handleChange}
              className="border p-3 rounded"
          />

          <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-3 rounded"
          >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
          </select>

          <div className="col-span-2 flex gap-3 mt-2">
              <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded">
                  {editingId ? 'Update Permission' : 'Add Permission'}
              </button>

              {editingId && (
                  <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-5 py-2 rounded">
                      Cancel
                  </button>
              )}
          </div>
      </form>

      {/* Table */}
      {loading ? (
        <p className="text-gray-500">Loading permissions...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-sm font-medium text-gray-600">ID</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600">Name</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600">Code</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600">Module</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {permissions.length > 0 ? permissions.map((perm) => (
                <tr key={perm.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{perm.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{perm.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{perm.code}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{perm.module}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{perm.status === 1 ? 'Active' : 'Inactive'}</td>
                  <td className="py-3 px-4 text-sm text-right">
                    <button onClick={() => handleEdit(perm)} className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                    <button onClick={() => handleDelete(perm.id)} className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500 text-sm">No permissions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
