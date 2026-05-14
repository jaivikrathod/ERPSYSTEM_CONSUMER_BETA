import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CheckSquare, Clock, AlertTriangle, Layers, TrendingUp, TrendingDown,
  Users, Plus, MoreHorizontal, ArrowRight, Flame, Calendar,
  ChevronRight, Circle, CheckCircle2, BarChart2, Target,
  Sparkles, Activity, Zap, Star
} from 'lucide-react';

// ─── Static Data ───────────────────────────────────────────────────────────────

const statCards = [
  {
    label: 'Total Tasks',      value: '248',  delta: '+12%', up: true,
    icon: Layers,              color: 'from-violet-500/20 to-indigo-500/10',
    iconColor: 'text-violet-400', border: 'border-violet-500/20',
    progress: 78,
  },
  {
    label: 'Completed',        value: '164',  delta: '+8%',  up: true,
    icon: CheckSquare,         color: 'from-emerald-500/20 to-teal-500/10',
    iconColor: 'text-emerald-400', border: 'border-emerald-500/20',
    progress: 66,
  },
  {
    label: 'In Progress',      value: '57',   delta: '-3%',  up: false,
    icon: Clock,               color: 'from-amber-500/20 to-orange-500/10',
    iconColor: 'text-amber-400', border: 'border-amber-500/20',
    progress: 42,
  },
  {
    label: 'Overdue',          value: '27',   delta: '+5%',  up: false,
    icon: AlertTriangle,       color: 'from-rose-500/20 to-pink-500/10',
    iconColor: 'text-rose-400',   border: 'border-rose-500/20',
    progress: 22,
  },
  {
    label: 'Team Productivity', value: '91%', delta: '+4%',  up: true,
    icon: TrendingUp,          color: 'from-cyan-500/20 to-sky-500/10',
    iconColor: 'text-cyan-400',   border: 'border-cyan-500/20',
    progress: 91,
  },
  {
    label: 'Active Projects',  value: '18',   delta: '+2',   up: true,
    icon: Target,              color: 'from-purple-500/20 to-fuchsia-500/10',
    iconColor: 'text-purple-400', border: 'border-purple-500/20',
    progress: 60,
  },
];

const priorities = {
  Critical: { cls: 'bg-rose-500/15 text-rose-400 border border-rose-500/20',    dot: 'bg-rose-400' },
  High:     { cls: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',  dot: 'bg-amber-400' },
  Medium:   { cls: 'bg-blue-500/15 text-blue-400 border border-blue-500/20',     dot: 'bg-blue-400' },
  Low:      { cls: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20', dot: 'bg-emerald-400' },
};
const statuses  = {
  'Completed':   { cls: 'bg-emerald-500/15 text-emerald-400' },
  'In Progress': { cls: 'bg-violet-500/15 text-violet-400' },
  'Review':      { cls: 'bg-amber-500/15 text-amber-400' },
  'Todo':        { cls: 'bg-white/10 text-white/50' },
  'Blocked':     { cls: 'bg-rose-500/15 text-rose-400' },
};

const tasks = [
  { id: 'T-001', name: 'Redesign onboarding flow',    member: 'Aria K.',  avatar: 'AK', color: 'from-violet-400 to-purple-500',  priority: 'Critical', deadline: 'May 16', progress: 75, status: 'In Progress' },
  { id: 'T-002', name: 'API rate-limit audit',        member: 'Sam L.',   avatar: 'SL', color: 'from-cyan-400 to-blue-500',      priority: 'High',     deadline: 'May 17', progress: 40, status: 'In Progress' },
  { id: 'T-003', name: 'Dark mode design tokens',     member: 'Mia J.',   avatar: 'MJ', color: 'from-emerald-400 to-teal-500',   priority: 'Medium',   deadline: 'May 20', progress: 90, status: 'Review' },
  { id: 'T-004', name: 'Performance benchmark Q2',    member: 'Dev P.',   avatar: 'DP', color: 'from-amber-400 to-orange-500',   priority: 'High',     deadline: 'May 15', progress: 100,status: 'Completed' },
  { id: 'T-005', name: 'Write integration test suite',member: 'Yuki T.',  avatar: 'YT', color: 'from-pink-400 to-rose-500',      priority: 'Low',      deadline: 'May 22', progress: 20, status: 'Todo' },
  { id: 'T-006', name: 'Customer feedback analysis',  member: 'Aria K.',  avatar: 'AK', color: 'from-violet-400 to-purple-500',  priority: 'Medium',   deadline: 'May 19', progress: 55, status: 'In Progress' },
];

const kanbanCols = [
  {
    title: 'To Do', color: 'text-white/40', accent: 'bg-white/10',
    cards: [
      { title: 'Accessibility audit',        tags: ['UX', 'A11y'],     priority: 'Medium',   avatars: ['AK'], due: 'May 22' },
      { title: 'Email digest templates',     tags: ['Email'],          priority: 'Low',      avatars: ['MJ'], due: 'May 25' },
    ],
  },
  {
    title: 'In Progress', color: 'text-violet-400', accent: 'bg-violet-500/10',
    cards: [
      { title: 'Redesign onboarding flow',   tags: ['Design', 'UX'],   priority: 'Critical', avatars: ['AK', 'SL'], due: 'May 16' },
      { title: 'API rate-limit audit',       tags: ['Backend'],        priority: 'High',     avatars: ['DP'], due: 'May 17' },
    ],
  },
  {
    title: 'Review', color: 'text-amber-400', accent: 'bg-amber-500/10',
    cards: [
      { title: 'Dark mode design tokens',    tags: ['Design'],         priority: 'Medium',   avatars: ['MJ', 'YT'], due: 'May 20' },
    ],
  },
  {
    title: 'Completed', color: 'text-emerald-400', accent: 'bg-emerald-500/10',
    cards: [
      { title: 'Performance benchmark Q2',   tags: ['Dev', 'QA'],      priority: 'High',     avatars: ['DP'], due: 'May 15' },
      { title: 'Release notes v2.4',         tags: ['Docs'],           priority: 'Low',      avatars: ['SL'], due: 'May 14' },
    ],
  },
];

const deadlines = [
  { name: 'Performance benchmark Q2', due: 'Today',    priority: 'High',     done: true },
  { name: 'Redesign onboarding flow', due: 'Tomorrow', priority: 'Critical', done: false },
  { name: 'API rate-limit audit',     due: 'May 17',   priority: 'High',     done: false },
  { name: 'Dark mode design tokens',  due: 'May 20',   priority: 'Medium',   done: false },
  { name: 'Customer feedback report', due: 'May 21',   priority: 'Medium',   done: false },
];

const activity = [
  { user: 'Aria K.',  avatar: 'AK', color: 'from-violet-400 to-purple-500',  action: 'moved',      subject: 'Onboarding flow',       dest: 'In Progress', time: '2m ago' },
  { user: 'Sam L.',   avatar: 'SL', color: 'from-cyan-400 to-blue-500',      action: 'commented on',subject: 'API audit',             dest: null,          time: '18m ago' },
  { user: 'Dev P.',   avatar: 'DP', color: 'from-amber-400 to-orange-500',   action: 'completed',  subject: 'Performance benchmark', dest: null,          time: '1h ago' },
  { user: 'Mia J.',   avatar: 'MJ', color: 'from-emerald-400 to-teal-500',   action: 'created',    subject: 'Dark mode tokens',      dest: null,          time: '2h ago' },
  { user: 'Yuki T.',  avatar: 'YT', color: 'from-pink-400 to-rose-500',      action: 'assigned to', subject: 'Mia J.',               dest: 'Test suite',  time: '3h ago' },
];

const team = [
  { name: 'Aria K.',  role: 'UX Lead',        avatar: 'AK', color: 'from-violet-400 to-purple-500',  online: true,  tasks: 8,  perf: 94 },
  { name: 'Sam L.',   role: 'Backend Eng.',   avatar: 'SL', color: 'from-cyan-400 to-blue-500',      online: true,  tasks: 5,  perf: 88 },
  { name: 'Mia J.',   role: 'Designer',       avatar: 'MJ', color: 'from-emerald-400 to-teal-500',   online: true,  tasks: 6,  perf: 96 },
  { name: 'Dev P.',   role: 'Full-stack',     avatar: 'DP', color: 'from-amber-400 to-orange-500',   online: false, tasks: 4,  perf: 91 },
  { name: 'Yuki T.',  role: 'QA Engineer',    avatar: 'YT', color: 'from-pink-400 to-rose-500',      online: true,  tasks: 3,  perf: 85 },
];

const weekDays  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weekBars  = [62, 80, 55, 91, 73, 38, 20];

// ─── Avatar helper ──────────────────────────────────────────────────────────────
const Avatar = ({ label, gradient, size = 'w-7 h-7', text = 'text-[11px]' }) => (
  <div className={`${size} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-white ${text} flex-shrink-0 ring-2 ring-[#0d0d12]`}>
    {label}
  </div>
);

// ─── Section header ─────────────────────────────────────────────────────────────
const SectionHeader = ({ title, action, actionLabel = 'View all' }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-[15px] font-semibold text-white">{title}</h2>
    {action && (
      <button onClick={action} className="flex items-center gap-1 text-[12px] text-white/40 hover:text-violet-400 transition-colors">
        {actionLabel} <ChevronRight size={13} />
      </button>
    )}
  </div>
);

// ─── Dashboard ──────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [activeTask, setActiveTask] = useState(null);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-full px-5 pt-6 pb-12 space-y-8 max-w-[1400px] mx-auto" style={{ fontFamily: '"DM Sans", sans-serif' }}>

      {/* ── Hero / Welcome ── */}
      <section className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#16132b] via-[#12112a] to-[#0d0d12] p-7 shadow-xl">
        {/* Decorative blobs */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={14} className="text-violet-400" />
              <span className="text-[12px] text-violet-400 font-medium tracking-wide">FlowTask Pro</span>
            </div>
            <h1 className="text-[22px] md:text-[26px] font-bold text-white leading-tight">
              {greeting}, {user?.name?.split(' ')[0] || 'there'} 👋
            </h1>
            <p className="mt-1.5 text-[13px] text-white/40 max-w-md">
              You have <span className="text-amber-400 font-semibold">5 tasks due this week</span> and your team is at peak productivity. Keep the momentum!
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-[13px] font-semibold transition-all shadow-lg shadow-violet-500/25 active:scale-95">
                <Plus size={14} /> New Task
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-[13px] font-medium transition-all">
                View Report <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Quick metrics */}
          <div className="flex gap-3 md:flex-col md:items-end">
            {[
              { label: 'Sprint Progress', val: '72%', color: 'text-violet-400' },
              { label: 'On-time Delivery', val: '91%', color: 'text-emerald-400' },
              { label: 'Active Members', val: '4/5',  color: 'text-cyan-400' },
            ].map((m) => (
              <div key={m.label} className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-2.5 text-right">
                <p className={`text-[18px] font-bold ${m.color}`}>{m.val}</p>
                <p className="text-[10px] text-white/35 mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Grid ── */}
      <section>
        <SectionHeader title="Overview" />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {statCards.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`relative group rounded-xl border ${s.border} bg-gradient-to-br ${s.color} p-4 cursor-pointer
                  hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200 hover:shadow-lg hover:shadow-black/30`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-white/5 ${s.iconColor}`}>
                    <Icon size={14} />
                  </div>
                  <span className={`text-[10px] font-semibold flex items-center gap-0.5 ${s.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {s.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {s.delta}
                  </span>
                </div>
                <p className="text-[22px] font-bold text-white leading-none">{s.value}</p>
                <p className="text-[10px] text-white/40 mt-1">{s.label}</p>
                {/* Mini progress bar */}
                <div className="mt-3 h-0.5 rounded-full bg-white/10 overflow-hidden">
                  <div className={`h-full rounded-full bg-current ${s.iconColor}`} style={{ width: `${s.progress}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Two-column: Activity chart + Weekly bars ── */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* Weekly Activity */}
        <div className="lg:col-span-3 rounded-xl border border-white/[0.06] bg-[#111118] p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[14px] font-semibold text-white">Weekly Activity</p>
              <p className="text-[11px] text-white/35 mt-0.5">Tasks completed per day</p>
            </div>
            <div className="flex gap-1.5">
              {['Week', 'Month', 'Quarter'].map((t, i) => (
                <button key={t} className={`text-[11px] px-2.5 py-1 rounded-md transition-all ${i === 0 ? 'bg-violet-500/20 text-violet-400' : 'text-white/30 hover:text-white/60'}`}>{t}</button>
              ))}
            </div>
          </div>
          {/* Bar chart */}
          <div className="flex items-end gap-2 h-32">
            {weekDays.map((d, i) => (
              <div key={d} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full rounded-t-md bg-violet-500/15 hover:bg-violet-500/25 transition-all cursor-pointer relative group"
                  style={{ height: `${weekBars[i]}%` }}>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1e1e2e] border border-white/10 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {weekBars[i]}%
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-[60%] rounded-t-md bg-violet-500/30" />
                </div>
                <span className="text-[10px] text-white/30">{d}</span>
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-5">
            {[
              { c: 'bg-violet-500', l: 'Completed' },
              { c: 'bg-violet-500/30', l: 'Planned' },
            ].map((x) => (
              <div key={x.l} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-sm ${x.c}`} />
                <span className="text-[11px] text-white/40">{x.l}</span>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-1 text-emerald-400 text-[12px] font-semibold">
              <TrendingUp size={13} /> +14% vs last week
            </div>
          </div>
        </div>

        {/* Progress targets */}
        <div className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-[#111118] p-5">
          <p className="text-[14px] font-semibold text-white mb-1">Sprint Goals</p>
          <p className="text-[11px] text-white/35 mb-5">Current sprint · May 13–27</p>
          <div className="space-y-4">
            {[
              { label: 'Feature delivery',    val: 72, color: 'bg-violet-500' },
              { label: 'Bug fix rate',        val: 88, color: 'bg-emerald-500' },
              { label: 'Code review speed',   val: 55, color: 'bg-amber-500' },
              { label: 'Docs coverage',       val: 40, color: 'bg-cyan-500' },
              { label: 'Test coverage',       val: 63, color: 'bg-pink-500' },
            ].map((g) => (
              <div key={g.label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[12px] text-white/60">{g.label}</span>
                  <span className="text-[12px] font-semibold text-white">{g.val}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className={`h-full rounded-full ${g.color} transition-all duration-700`} style={{ width: `${g.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Tasks Table ── */}
      <section>
        <SectionHeader title="Recent Tasks" actionLabel="View all tasks" />
        <div className="rounded-xl border border-white/[0.06] bg-[#111118] overflow-hidden">
          {/* Table head */}
          <div className="grid grid-cols-[1fr_110px_90px_90px_90px_80px_36px] gap-3 px-5 py-3 border-b border-white/[0.05] text-[10px] font-semibold uppercase tracking-widest text-white/25">
            <span>Task</span>
            <span>Assignee</span>
            <span>Priority</span>
            <span>Deadline</span>
            <span>Progress</span>
            <span>Status</span>
            <span />
          </div>
          {/* Rows */}
          {tasks.map((t) => {
            const pri = priorities[t.priority];
            const sta = statuses[t.status];
            return (
              <div
                key={t.id}
                onClick={() => setActiveTask(activeTask === t.id ? null : t.id)}
                className="grid grid-cols-[1fr_110px_90px_90px_90px_80px_36px] gap-3 items-center px-5 py-3.5 border-b border-white/[0.04] last:border-0 cursor-pointer hover:bg-white/[0.025] transition-all duration-150 group"
              >
                {/* Task name */}
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-white truncate">{t.name}</p>
                  <p className="text-[10px] text-white/30 font-mono mt-0.5">{t.id}</p>
                </div>
                {/* Member */}
                <div className="flex items-center gap-2">
                  <Avatar label={t.avatar} gradient={t.color} size="w-6 h-6" text="text-[9px]" />
                  <span className="text-[12px] text-white/50 truncate">{t.member}</span>
                </div>
                {/* Priority badge */}
                <div>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${pri.cls}`}>
                    <span className={`w-1 h-1 rounded-full ${pri.dot}`} />{t.priority}
                  </span>
                </div>
                {/* Deadline */}
                <span className="text-[12px] text-white/45">{t.deadline}</span>
                {/* Progress bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full bg-violet-500" style={{ width: `${t.progress}%` }} />
                  </div>
                  <span className="text-[10px] text-white/35 w-7 text-right">{t.progress}%</span>
                </div>
                {/* Status */}
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-md ${sta.cls}`}>{t.status}</span>
                {/* Menu */}
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-white/30 hover:text-white">
                  <MoreHorizontal size={15} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Two-column: Kanban + Deadlines ── */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Kanban preview */}
        <div className="xl:col-span-2 rounded-xl border border-white/[0.06] bg-[#111118] p-5">
          <SectionHeader title="Board Preview" actionLabel="Open Board" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {kanbanCols.map((col) => (
              <div key={col.title} className="space-y-2">
                {/* Column header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2 h-2 rounded-full ${col.accent} ring-1 ring-white/10`} />
                  <span className={`text-[11px] font-semibold ${col.color}`}>{col.title}</span>
                  <span className="ml-auto text-[10px] text-white/25">{col.cards.length}</span>
                </div>
                {col.cards.map((c) => {
                  const pri = priorities[c.priority];
                  return (
                    <div key={c.title} className="rounded-lg border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.05] p-3 cursor-pointer transition-all group">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {c.tags.map((tag) => (
                          <span key={tag} className="text-[9px] bg-white/5 text-white/35 px-1.5 py-0.5 rounded">{tag}</span>
                        ))}
                      </div>
                      <p className="text-[12px] font-medium text-white/80 leading-snug">{c.title}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${pri.cls}`}>{c.priority}</span>
                        <div className="flex items-center gap-1">
                          <Calendar size={9} className="text-white/20" />
                          <span className="text-[9px] text-white/25">{c.due}</span>
                        </div>
                      </div>
                      {/* Avatars */}
                      <div className="mt-2 flex -space-x-1">
                        {c.avatars.map((a) => {
                          const member = team.find((m) => m.avatar === a);
                          return <Avatar key={a} label={a} gradient={member?.color || 'from-violet-400 to-indigo-500'} size="w-5 h-5" text="text-[8px]" />;
                        })}
                      </div>
                    </div>
                  );
                })}
                {/* Add card */}
                <button className="w-full flex items-center gap-1.5 text-[11px] text-white/20 hover:text-white/40 py-1.5 rounded-lg hover:bg-white/[0.03] transition-all px-2">
                  <Plus size={12} /> Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="rounded-xl border border-white/[0.06] bg-[#111118] p-5">
          <SectionHeader title="Deadlines" />
          <div className="space-y-1">
            {deadlines.map((d, i) => {
              const pri = priorities[d.priority];
              return (
                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0 group cursor-pointer">
                  {/* Check */}
                  <div className={`flex-shrink-0 transition-all ${d.done ? 'text-emerald-400' : 'text-white/15 group-hover:text-white/30'}`}>
                    {d.done ? <CheckCircle2 size={15} /> : <Circle size={15} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[12px] font-medium truncate ${d.done ? 'line-through text-white/25' : 'text-white/70'}`}>{d.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[9px] font-semibold flex items-center gap-0.5 ${d.done ? 'text-white/20' : d.due === 'Today' ? 'text-rose-400' : d.due === 'Tomorrow' ? 'text-amber-400' : 'text-white/30'}`}>
                        <Flame size={8} className={d.due === 'Today' ? 'text-rose-400' : 'opacity-0'} />
                        {d.due}
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${pri.cls}`}>{d.priority}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Two-column: Activity + Team ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Activity Timeline */}
        <div className="rounded-xl border border-white/[0.06] bg-[#111118] p-5">
          <SectionHeader title="Activity Feed" />
          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <Avatar label={a.avatar} gradient={a.color} size="w-7 h-7" text="text-[10px]" />
                  {i < activity.length - 1 && <div className="flex-1 w-px bg-white/[0.05] mt-1.5" />}
                </div>
                <div className="pb-4 last:pb-0 min-w-0">
                  <p className="text-[12px] text-white/70 leading-relaxed">
                    <span className="font-semibold text-white">{a.user}</span>{' '}
                    <span className="text-white/40">{a.action}</span>{' '}
                    <span className="text-violet-400 font-medium">{a.subject}</span>
                    {a.dest && <> → <span className="text-emerald-400 font-medium">{a.dest}</span></>}
                  </p>
                  <p className="text-[10px] text-white/25 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Collaboration */}
        <div className="rounded-xl border border-white/[0.06] bg-[#111118] p-5">
          <SectionHeader title="Team" actionLabel="Manage" />
          <div className="space-y-2">
            {team.map((m) => (
              <div key={m.name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.03] transition-all cursor-pointer group">
                <div className="relative flex-shrink-0">
                  <Avatar label={m.avatar} gradient={m.color} size="w-8 h-8" text="text-[11px]" />
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#111118] ${m.online ? 'bg-emerald-400' : 'bg-white/20'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-medium text-white">{m.name}</p>
                    <p className="text-[11px] font-bold text-white/70">{m.perf}%</p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-[11px] text-white/30">{m.role}</p>
                    <div className="flex items-center gap-1 text-white/25">
                      <CheckSquare size={10} />
                      <span className="text-[10px]">{m.tasks} tasks</span>
                    </div>
                  </div>
                  {/* Perf bar */}
                  <div className="mt-2 h-0.5 rounded-full bg-white/5 overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r ${m.color} opacity-70`} style={{ width: `${m.perf}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Add member */}
          <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-dashed border-white/[0.08] text-[12px] text-white/25 hover:text-violet-400 hover:border-violet-500/30 transition-all">
            <Plus size={13} /> Invite team member
          </button>
        </div>
      </section>

    </div>
  );
}