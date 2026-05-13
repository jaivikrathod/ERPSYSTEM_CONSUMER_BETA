import React, { useEffect, useState } from 'react';
import { moduleAPI } from '../services/apiEndpoints';

export default function ModuleManagement() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
      name: '',
      description: '',
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const { data } = await moduleAPI.getAll();
      setModules(data || []);
    } catch (error) {
      console.error("Error fetching modules:", error);
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
          description: '',
      });
      setEditingId(null);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          if (editingId) {
              await moduleAPI.update(editingId, formData);
          } else {
              await moduleAPI.create(formData);
          }
          fetchModules();
          resetForm();
      } catch (error) {
          console.error(error);
      }
  };

  const handleEdit = (mod) => {
      setEditingId(mod.id);
      setFormData({
          name: mod.name || '',
          description: mod.description || '',
      });
  };

  const handleDelete = async (id) => {
      const confirmDelete = window.confirm('Are you sure?');
      if (!confirmDelete) return;

      try {
          await moduleAPI.delete(id);
          fetchModules();
      } catch (error) {
          console.error(error);
      }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Module Management</h2>
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8">
          <input
              type="text"
              name="name"
              placeholder="Module Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded"
              required
          />

          <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-3 rounded"
          />

          <div className="col-span-2 flex gap-3">
              <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded">
                  {editingId ? 'Update Module' : 'Add Module'}
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
        <p className="text-gray-500">Loading modules...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-sm font-medium text-gray-600">ID</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600">Module Name</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600">Description</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {modules.length > 0 ? modules.map((mod) => (
                <tr key={mod.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{mod.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{mod.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{mod.description}</td>
                  <td className="py-3 px-4 text-sm text-right">
                    <button onClick={() => handleEdit(mod)} className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                    <button onClick={() => handleDelete(mod.id)} className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500 text-sm">No modules found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
