import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import {
  LayoutDashboard, CheckSquare, FolderKanban, BarChart3,
  Users, Calendar, MessageSquare, FileText, Settings,
  Search, Bell, ChevronLeft, ChevronRight, Menu, X,
  Zap, LogOut, Plus, Moon, Sun, ChevronDown, Dot,
  Activity, Star, Hash
} from 'lucide-react';

// ─── Nav Config ────────────────────────────────────────────────────────────────
const navSections = [
  {
    label: 'Workspace',
    items: [
      { name: 'Dashboard',  path: '/dashboard',             icon: LayoutDashboard, badge: null },
      { name: 'Tasks',      path: '/task-management',       icon: CheckSquare,     badge: '12' },
      { name: 'Projects',   path: '/projects',              icon: FolderKanban,    badge: null },
      { name: 'Analytics',  path: '/analytics',             icon: BarChart3,       badge: null },
    ],
  },
  {
    label: 'Collaborate',
    items: [
      { name: 'Team',       path: '/user-management',       icon: Users,           badge: '3' },
      { name: 'Calendar',   path: '/calendar',              icon: Calendar,        badge: null },
      { name: 'Messages',   path: '/messages',              icon: MessageSquare,   badge: '5' },
    ],
  },
  {
    label: 'Manage',
    items: [
      { name: 'Reports',    path: '/reports',               icon: FileText,        badge: null },
      { name: 'Roles',      path: '/role-management',       icon: Hash,            badge: null },
      { name: 'Permissions',path: '/permission-management', icon: Star,            badge: null },
      { name: 'Customers',  path: '/customer-management',   icon: Activity,        badge: null },
      { name: 'Settings',   path: '/settings',              icon: Settings,        badge: null },
    ],
  },
];

// ─── Notification Mock Data ─────────────────────────────────────────────────────
const notifications = [
  { id: 1, title: 'New task assigned',    desc: 'Design system review',    time: '2m ago',  dot: '#6366f1' },
  { id: 2, title: 'Comment on #Task-42', desc: 'Looks great, ship it!',   time: '18m ago', dot: '#10b981' },
  { id: 3, title: 'Deadline tomorrow',   desc: 'Landing page redesign',   time: '1h ago',  dot: '#f59e0b' },
  { id: 4, title: 'PR merged',           desc: 'feat/onboarding-flow',    time: '3h ago',  dot: '#8b5cf6' },
];

export default function MainLayout() {
  const { user }   = useSelector((state) => state.auth);
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const location   = useLocation();

  const [collapsed,      setCollapsed]      = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [dark,           setDark]           = useState(true);
  const [notifOpen,      setNotifOpen]      = useState(false);
  const [searchFocused,  setSearchFocused]  = useState(false);
  const [searchVal,      setSearchVal]      = useState('');

  const handleLogout = () => { dispatch(logout()); navigate('/login'); };

  // Close mobile drawer on route change
  useEffect(() => { setMobileOpen(false); setNotifOpen(false); }, [location.pathname]);
  // Close notif on outside click
  useEffect(() => {
    const close = (e) => { if (!e.target.closest('#notif-zone')) setNotifOpen(false); };
    if (notifOpen) document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [notifOpen]);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const sidebarW  = collapsed ? 'w-[72px]' : 'w-[240px]';
  const bg        = dark ? 'bg-[#0d0d12]' : 'bg-[#f5f5f7]';
  const sidebarBg = dark ? 'bg-[#111118] border-white/[0.06]' : 'bg-white border-black/[0.06]';
  const headerBg  = dark ? 'bg-[#0d0d12]/80 border-white/[0.06]' : 'bg-white/80 border-black/[0.06]';
  const text      = dark ? 'text-white' : 'text-gray-900';
  const subtext   = dark ? 'text-white/40' : 'text-gray-400';
  const hoverBg   = dark ? 'hover:bg-white/[0.05]' : 'hover:bg-black/[0.04]';
  const activeBg  = dark ? 'bg-white/[0.08] text-white' : 'bg-black/[0.06] text-gray-900';
  const inputBg   = dark ? 'bg-white/[0.05] border-white/[0.08] text-white placeholder:text-white/30' : 'bg-black/[0.04] border-black/[0.08] text-gray-900 placeholder:text-gray-400';

  // ── Sidebar content (shared between desktop & mobile drawer) ──────────────────
  const SidebarContent = ({ forMobile = false }) => (
    <div className={`flex flex-col h-full ${sidebarBg} border-r transition-all duration-300 ${forMobile ? 'w-[260px]' : sidebarW}`}>

      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b ${dark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}>
        <div className="relative flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Zap size={15} className="text-white" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#111118]" />
        </div>
        {(!collapsed || forMobile) && (
          <div className="flex flex-col leading-none overflow-hidden">
            <span className={`text-[13px] font-semibold tracking-tight ${text}`} style={{ fontFamily: '"DM Sans", sans-serif' }}>FlowTask</span>
            <span className={`text-[10px] ${subtext} mt-0.5`}>Pro Workspace</span>
          </div>
        )}
      </div>

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-5 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
        {navSections.map((section) => (
          <div key={section.label}>
            {(!collapsed || forMobile) && (
              <p className={`text-[9px] font-semibold uppercase tracking-[0.12em] ${subtext} px-2.5 mb-1.5`}>{section.label}</p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.path);
                const Icon   = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    title={collapsed && !forMobile ? item.name : undefined}
                    className={`group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-150
                      ${active ? activeBg : `${subtext} ${hoverBg}`}
                      ${collapsed && !forMobile ? 'justify-center' : ''}`}
                  >
                    {/* Active pill */}
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-violet-500" />
                    )}
                    <Icon size={16} className={`flex-shrink-0 ${active ? 'text-violet-400' : `${subtext} group-hover:text-white/70`} transition-colors`} />
                    {(!collapsed || forMobile) && (
                      <>
                        <span className={`flex-1 truncate ${active ? text : ''}`}>{item.name}</span>
                        {item.badge && (
                          <span className="flex-shrink-0 text-[10px] font-semibold bg-violet-500/20 text-violet-400 rounded-full px-1.5 py-0.5 leading-none">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {/* Tooltip when collapsed */}
                    {collapsed && !forMobile && (
                      <span className={`absolute left-full ml-3 whitespace-nowrap text-xs px-2.5 py-1.5 rounded-lg shadow-xl
                        ${dark ? 'bg-[#1e1e2e] text-white border border-white/10' : 'bg-white text-gray-900 border border-black/10'}
                        opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50`}>
                        {item.name}
                        {item.badge && <span className="ml-1.5 text-violet-400">({item.badge})</span>}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User card */}
      <div className={`border-t p-3 ${dark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}>
        <div className={`flex items-center gap-2.5 rounded-lg p-2 cursor-pointer ${hoverBg} transition-all`} onClick={handleLogout} title="Logout">
          <div className="relative flex-shrink-0">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-[11px] font-bold text-white">
              {(user?.name || 'U')[0].toUpperCase()}
            </div>
            <span className="absolute -bottom-0 -right-0 w-2 h-2 rounded-full bg-emerald-400 border-2 border-[#111118]" />
          </div>
          {(!collapsed || forMobile) && (
            <>
              <div className="flex-1 min-w-0">
                <p className={`text-[12px] font-semibold truncate ${text}`}>{user?.name || 'User'}</p>
                <p className={`text-[10px] ${subtext} truncate`}>{user?.email || 'user@app.com'}</p>
              </div>
              <LogOut size={13} className={`${subtext} flex-shrink-0`} />
            </>
          )}
        </div>
      </div>

      {/* Collapse toggle (desktop only) */}
      {!forMobile && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`absolute -right-3 top-[72px] w-6 h-6 rounded-full border flex items-center justify-center shadow-lg z-10
            ${dark ? 'bg-[#1a1a24] border-white/10 text-white/50 hover:text-white' : 'bg-white border-black/10 text-gray-400 hover:text-gray-700'}
            transition-all duration-200`}
        >
          {collapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
        </button>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen flex ${bg} ${text} relative`} style={{ fontFamily: '"DM Sans", sans-serif' }}>

      {/* ── Google Font (DM Sans) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap');
        .scrollbar-none::-webkit-scrollbar { display: none; }
        * { box-sizing: border-box; }
      `}</style>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* ── Mobile Drawer ── */}
      <div className={`fixed inset-y-0 left-0 z-50 flex flex-col shadow-2xl transform transition-transform duration-300 lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent forMobile />
        <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-white/40 hover:text-white">
          <X size={18} />
        </button>
      </div>

      {/* ── Desktop Sidebar ── */}
      <div className="hidden lg:flex relative flex-shrink-0">
        <SidebarContent />
      </div>

      {/* ── Main column ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ── Sticky Header ── */}
        <header className={`sticky top-0 z-30 flex items-center gap-4 px-5 h-14 border-b backdrop-blur-xl ${headerBg} transition-all duration-200`}>

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(true)} className={`lg:hidden p-1.5 rounded-lg ${hoverBg} ${subtext}`}>
            <Menu size={18} />
          </button>

          {/* Search */}
          <div className={`relative flex-1 max-w-[380px] transition-all duration-200 ${searchFocused ? 'max-w-[500px]' : ''}`}>
            <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${subtext} pointer-events-none transition-colors`} />
            <input
              type="text"
              placeholder="Search tasks, projects, people…"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`w-full pl-9 pr-4 py-2 text-[13px] rounded-lg border outline-none transition-all duration-200 ${inputBg}
                ${searchFocused ? (dark ? 'border-violet-500/50 bg-violet-500/5' : 'border-violet-400/50') : ''}`}
            />
            {searchFocused && (
              <kbd className={`absolute right-3 top-1/2 -translate-y-1/2 text-[10px] px-1.5 py-0.5 rounded border ${dark ? 'border-white/10 text-white/30 bg-white/5' : 'border-black/10 text-gray-400 bg-black/5'}`}>⌘K</kbd>
            )}
          </div>

          <div className="flex-1" />

          {/* Actions */}
          <div className="flex items-center gap-1">

            {/* New Task */}
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-all duration-150 shadow-lg shadow-violet-500/20 active:scale-95">
              <Plus size={13} />
              <span>New Task</span>
            </button>

            {/* Dark mode */}
            <button
              onClick={() => setDark(!dark)}
              className={`p-2 rounded-lg ${hoverBg} ${subtext} hover:text-current transition-all ml-1`}
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Notifications */}
            <div id="notif-zone" className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className={`relative p-2 rounded-lg ${hoverBg} ${subtext} hover:text-current transition-all`}
              >
                <Bell size={15} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500" />
              </button>

              {notifOpen && (
                <div className={`absolute right-0 top-full mt-2 w-[300px] rounded-xl border shadow-2xl overflow-hidden z-50
                  ${dark ? 'bg-[#16161f] border-white/[0.08]' : 'bg-white border-black/[0.08]'}`}>
                  <div className={`flex items-center justify-between px-4 py-3 border-b ${dark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}>
                    <p className={`text-[13px] font-semibold ${text}`}>Notifications</p>
                    <span className="text-[10px] text-violet-400 font-semibold cursor-pointer hover:text-violet-300">Mark all read</span>
                  </div>
                  <div className="divide-y divide-white/[0.04]">
                    {notifications.map((n) => (
                      <div key={n.id} className={`flex gap-3 px-4 py-3 cursor-pointer ${hoverBg} transition-all`}>
                        <div className="flex-shrink-0 mt-1">
                          <Dot size={18} style={{ color: n.dot }} />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-[12px] font-medium ${text}`}>{n.title}</p>
                          <p className={`text-[11px] ${subtext} truncate mt-0.5`}>{n.desc}</p>
                          <p className={`text-[10px] mt-1 ${subtext}`}>{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={`px-4 py-2.5 text-center border-t ${dark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}>
                    <span className={`text-[11px] ${subtext} cursor-pointer hover:text-violet-400 transition-colors`}>View all notifications</span>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-2 pl-2 ml-1 cursor-pointer group" onClick={handleLogout}>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
                {(user?.name || 'U')[0].toUpperCase()}
              </div>
              <ChevronDown size={12} className={`${subtext} hidden sm:block group-hover:text-current transition-colors`} />
            </div>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}