import React, { useState, useMemo } from 'react';
import { 
  Search, 
  UserPlus, 
  Download, 
  MoreVertical, 
  Filter, 
  Users, 
  UserCheck, 
  UserMinus, 
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  Phone,
  Calendar,
  Shield,
  Activity,
  X,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  ChevronRight,
  Plus
} from 'lucide-react';


const INITIAL_USERS = [
  { id: 1, name: 'Alex Rivera', email: 'alex.rivera@enterprise.com', role: 'Admin', dept: 'Engineering', status: 'Active', lastActive: '2 mins ago', joinDate: 'Jan 12, 2024', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Sarah Chen', email: 's.chen@enterprise.com', role: 'Manager', dept: 'Product', status: 'Active', lastActive: '1 hour ago', joinDate: 'Feb 05, 2024', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Marcus Wright', email: 'm.wright@enterprise.com', role: 'Staff', dept: 'Design', status: 'Pending', lastActive: 'Never', joinDate: 'Mar 10, 2024', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Elena Rodriguez', email: 'elena.ro@enterprise.com', role: 'Viewer', dept: 'Marketing', status: 'Suspended', lastActive: '2 days ago', joinDate: 'Nov 22, 2023', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'Jordan Smith', email: 'j.smith@enterprise.com', role: 'Staff', dept: 'Engineering', status: 'Active', lastActive: '5 mins ago', joinDate: 'Jan 15, 2024', avatar: 'https://i.pravatar.cc/150?u=5' },
];

const ACTIVITY_LOGS = [
  { id: 1, event: 'Logged in from New York, US', time: '12:45 PM', date: 'Today', icon: <Clock className="w-3 h-3" />, color: 'text-blue-500' },
  { id: 2, event: 'Changed permission level for Marcus Wright', time: '09:20 AM', date: 'Today', icon: <Shield className="w-3 h-3" />, color: 'text-purple-500' },
  { id: 3, event: 'Failed login attempt (3x)', time: 'Yesterday', date: '6:12 PM', icon: <ShieldAlert className="w-3 h-3" />, color: 'text-red-500' },
];

// --- COMPONENTS ---

const StatusBadge = ({ status }) => {
  const styles = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Pending: 'bg-amber-50 text-amber-700 border-amber-100',
    Suspended: 'bg-rose-50 text-rose-700 border-rose-100',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
};

const StatCard = ({ title, value, trend, trendType, icon: Icon, colorClass }) => (
  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2.5 rounded-xl ${colorClass} bg-opacity-10 transition-colors group-hover:bg-opacity-20`}>
        <Icon className={`w-5 h-5 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-medium ${trendType === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
        {trend}
        {trendType === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      </div>
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
    </div>
    <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${colorClass}`} style={{ width: '65%' }}></div>
    </div>
  </div>
);

export default function UserManagement() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Logic
  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8 font-sans text-slate-900">
      
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Admin</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-indigo-600">User Management</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Users & Access</h1>
          <p className="text-slate-500 mt-1">Manage organization members, roles, and security permissions.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 rounded-xl text-sm font-semibold text-white hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"
          >
            <UserPlus className="w-4 h-4" />
            Invite Member
          </button>
        </div>
      </header>

      {/* ANALYTICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value="2,543" trend="+12.5%" trendType="up" icon={Users} colorClass="bg-indigo-600" />
        <StatCard title="Active Now" value="842" trend="+3.2%" trendType="up" icon={UserCheck} colorClass="bg-emerald-500" />
        <StatCard title="Pending" value="38" trend="-2.4%" trendType="down" icon={Clock} colorClass="bg-amber-500" />
        <StatCard title="Suspended" value="12" trend="+0.5%" trendType="up" icon={ShieldAlert} colorClass="bg-rose-500" />
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* MAIN CONTENT AREA */}
        <div className="col-span-12 xl:col-span-8 space-y-6">
          
          {/* TOOLBAR */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by name, email or department..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <select className="flex-1 md:flex-none px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 focus:outline-none cursor-pointer hover:bg-slate-50">
                <option>All Roles</option>
                <option>Admin</option>
                <option>Manager</option>
                <option>Staff</option>
              </select>
            </div>
          </div>

          {/* USER TABLE */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="p-4 w-10">
                      <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    </th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role & Dept</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Active</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((user) => (
                    <tr 
                      key={user.id} 
                      onClick={() => setSelectedUser(user)}
                      className="group hover:bg-slate-50/80 transition-colors cursor-pointer"
                    >
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img src={user.avatar} alt="" className="w-10 h-10 rounded-full border border-slate-200 shadow-sm" />
                            {user.status === 'Active' && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 leading-none">{user.name}</p>
                            <p className="text-xs text-slate-500 mt-1">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-700">{user.role}</span>
                          <span className="text-xs text-slate-400">{user.dept}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-slate-600">{user.lastActive}</span>
                          <span className="text-[10px] text-slate-400 uppercase font-bold">Joined {user.joinDate}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-slate-400 hover:text-indigo-600 transition-all">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-slate-400 hover:text-rose-600 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-slate-400 transition-all">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* PAGINATION */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <span className="text-sm text-slate-500">Showing 1 to 5 of 24 users</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-slate-200 rounded-md text-sm font-medium text-slate-400 cursor-not-allowed">Previous</button>
                <button className="px-3 py-1 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR WIDGETS */}
        <div className="col-span-12 xl:col-span-4 space-y-6">
          
          {/* PROFILE PREVIEW CARD */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-8">
            <div className="h-20 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            <div className="px-6 pb-6">
              <div className="-mt-10 mb-4 flex justify-between items-end">
                <img 
                  src={selectedUser?.avatar || INITIAL_USERS[0].avatar} 
                  className="w-20 h-20 rounded-2xl border-4 border-white shadow-md bg-white" 
                  alt="Profile"
                />
                <button className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors">
                  View Profile
                </button>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selectedUser?.name || 'Select a User'}</h2>
                <p className="text-sm text-slate-500 font-medium">{selectedUser?.email || 'Click on a row to preview'}</p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase rounded tracking-wider">
                    {selectedUser?.role || 'Admin'}
                  </span>
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded tracking-wider">
                    {selectedUser?.dept || 'Engineering'}
                  </span>
                </div>
              </div>

              <hr className="my-6 border-slate-100" />

              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent Activity</h3>
                <div className="space-y-4">
                  {ACTIVITY_LOGS.map(log => (
                    <div key={log.id} className="flex gap-3">
                      <div className={`mt-0.5 p-1.5 rounded-full ${log.color} bg-opacity-10 h-fit`}>
                        {log.icon}
                      </div>
                      <div>
                        <p className="text-sm text-slate-700 leading-tight">{log.event}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{log.time} • {log.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex flex-col items-center justify-center p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all text-slate-600">
                    <Mail className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold">Email</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all text-slate-600">
                    <Shield className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold">Permissions</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PERMISSIONS SNAPSHOT */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold">Security Overview</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">4 users have MFA disabled. We recommend enforcing security policies.</p>
            <button className="w-full py-2.5 bg-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-500 transition-colors">
              Update Security Policy
            </button>
          </div>
        </div>
      </div>

      {/* INVITE USER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Invite Team Member</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            <form className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase ml-1">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase ml-1">Email Address</label>
                  <input type="email" placeholder="john@company.com" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase ml-1">Role</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:outline-none">
                    <option>Staff</option>
                    <option>Manager</option>
                    <option>Admin</option>
                    <option>Viewer</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase ml-1">Department</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:outline-none">
                    <option>Engineering</option>
                    <option>Product</option>
                    <option>Design</option>
                    <option>Sales</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex gap-4">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Shield className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-indigo-900 leading-none mb-1">Permission Level</p>
                  <p className="text-xs text-indigo-700/70">Staff members can view analytics and edit their own projects, but cannot manage team billing.</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}