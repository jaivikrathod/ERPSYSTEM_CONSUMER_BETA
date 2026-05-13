import React, { useEffect, useState } from 'react';
import { userAPI } from '../services/apiEndpoints';

export default function UserManagement() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {

            setLoading(true);

            const { data } = await userAPI.getAll();

            setUsers(data?.data || []);

        } catch (error) {

            console.error(error);

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
            email: '',
            phone: '',
            password: '',
        });

        setEditingId(null);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await userAPI.update(editingId, formData);

            } else {

                await userAPI.create(formData);
            }

            fetchUsers();

            resetForm();

        } catch (error) {

            console.error(error);
        }
    };

    const handleEdit = (user) => {

        setEditingId(user.id);

        setFormData({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            password: '',
        });
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm('Are you sure?');

        if (!confirmDelete) return;

        try {

            await userAPI.delete(id);

            fetchUsers();

        } catch (error) {

            console.error(error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    User Management
                </h2>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-4 mb-8"
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-3 rounded"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-3 rounded"
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border p-3 rounded"
                />

                <input
                    type="password"
                    name="password"
                    placeholder={
                        editingId
                            ? 'Leave blank to keep password'
                            : 'Password'
                    }
                    value={formData.password}
                    onChange={handleChange}
                    className="border p-3 rounded"
                    required={!editingId}
                />

                <div className="col-span-2 flex gap-3">

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-2 rounded"
                    >
                        {editingId ? 'Update User' : 'Add User'}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="bg-gray-500 text-white px-5 py-2 rounded"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Table */}
            {loading ? (
                <p>Loading users...</p>
            ) : (
                <div className="overflow-x-auto">

                    <table className="w-full border-collapse">

                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Phone</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {users.length > 0 ? (
                                users.map((user) => (

                                    <tr
                                        key={user.id}
                                        className="border-b"
                                    >

                                        <td className="p-3">
                                            {user.id}
                                        </td>

                                        <td className="p-3">
                                            {user.name}
                                        </td>

                                        <td className="p-3">
                                            {user.email}
                                        </td>

                                        <td className="p-3">
                                            {user.phone}
                                        </td>

                                        <td className="p-3 text-right">

                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="text-blue-600 mr-3"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="text-red-600"
                                            >
                                                Delete
                                            </button>

                                        </td>
                                    </tr>

                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center p-5"
                                    >
                                        No users found
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>
            )}
        </div>
    );
}