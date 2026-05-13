import React, { useEffect, useState } from 'react';
import { customerAPI } from '../services/apiEndpoints';

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data } = await customerAPI.getAll();
      setCustomers(data?.data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Customer Management</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors text-sm font-medium">Add Customer</button>
      </div>
      
      {loading ? (
        <p className="text-gray-500">Loading customers...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-sm font-medium text-gray-600">ID</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600">Company Name</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600">Contact Person</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600">Email</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? customers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{customer.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{customer.companyName}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{customer.contactPerson}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{customer.email}</td>
                  <td className="py-3 px-4 text-sm text-right">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500 text-sm">No customers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
