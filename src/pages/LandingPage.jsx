import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Building2, Users, Shield, BarChart3, Settings, Bell, FileText, Workflow,
  ChevronRight, Check, Star, Menu, X, ArrowRight, Zap, Globe, Lock,
  TrendingUp, Clock, Award, Layers, Database, RefreshCw, Play, Mail, Phone, MapPin, ChevronDown,
  UserCheck, FolderKanban, KeyRound, ActivitySquare, LogIn, PlusCircle,
  Cpu, CloudCog, ShieldCheck, LayoutDashboard, MonitorDot, BriefcaseBusiness,
  Sparkles, MoveRight, CircleCheck, AlertCircle, DollarSign, Package
} from "lucide-react";

// ─── Palette & Tokens ───────────────────────────────────────────────
const BRAND = {
  dark:    "#0A0E1A",
  surface: "#0F1629",
  card:    "#141D35",
  border:  "#1E2D50",
  accent:  "#3B82F6",
  accent2: "#6366F1",
  gold:    "#F59E0B",
  teal:    "#14B8A6",
  muted:   "#64748B",
  text:    "#E2E8F0",
  textDim: "#94A3B8",
};

// ─── Utility Components ──────────────────────────────────────────────
const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue:  "bg-blue-500/10 text-blue-400 border-blue-500/20",
    teal:  "bg-teal-500/10 text-teal-400 border-teal-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    indigo:"bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${colors[color]}`}>
      {children}
    </span>
  );
};

const GradientText = ({ children, from = "#3B82F6", to = "#6366F1", className = "" }) => (
  <span className={`bg-clip-text text-transparent ${className}`}
    style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}>
    {children}
  </span>
);

const PrimaryButton = ({ children, onClick, className = "", size = "md" }) => {
  const sz = size === "lg" ? "px-8 py-4 text-base" : "px-5 py-2.5 text-sm";
  return (
    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 ${sz} font-semibold rounded-xl text-white overflow-hidden group ${className}`}
      style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
    </motion.button>
  );
};

const OutlineButton = ({ children, onClick, className = "", size = "md" }) => {
  const sz = size === "lg" ? "px-8 py-4 text-base" : "px-5 py-2.5 text-sm";
  return (
    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`inline-flex items-center gap-2 ${sz} font-semibold rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 ${className}`}>
      {children}
    </motion.button>
  );
};

const SectionHeading = ({ badge, title, subtitle, center = true }) => (
  <div className={`mb-16 ${center ? "text-center" : ""}`}>
    {badge && <div className={`mb-4 ${center ? "flex justify-center" : ""}`}><Badge color="blue">{badge}</Badge></div>}
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">{title}</h2>
    {subtitle && <p className={`text-lg text-slate-400 max-w-2xl ${center ? "mx-auto" : ""}`}>{subtitle}</p>}
  </div>
);

const FadeIn = ({ children, delay = 0, direction = "up", className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const dirs = { up: [30, 0], down: [-30, 0], left: [0, 30], right: [0, -30] };
  const [dy, dx] = [dirs[direction]?.[0] ?? 30, dirs[direction]?.[1] ?? 0];
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: dy, x: dx }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
};

// ─── Navbar ──────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Features", "Modules", "Pricing", "About", "Contact"];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 backdrop-blur-2xl bg-[#0A0E1A]/90 border-b border-white/5 shadow-xl shadow-black/30" : "py-5"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }}>
            <Building2 size={18} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Nexus<GradientText from="#3B82F6" to="#6366F1">ERP</GradientText>
          </span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-8">
          {links.map(link => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`}
                className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200">
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <OutlineButton size="sm">
            <LogIn size={15} /> Login
          </OutlineButton>
          <PrimaryButton size="sm">
            <PlusCircle size={15} /> Register Company
          </PrimaryButton>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(v => !v)}
          className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden backdrop-blur-2xl bg-[#0A0E1A]/95 border-t border-white/5">
            <div className="px-4 py-6 flex flex-col gap-4">
              {links.map(link => (
                <a key={link} href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-slate-300 hover:text-white font-medium py-2 border-b border-white/5 transition-colors">
                  {link}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <OutlineButton className="justify-center"><LogIn size={15} /> Login</OutlineButton>
                <PrimaryButton className="justify-center"><PlusCircle size={15} /> Register Company</PrimaryButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────
function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  const trustBadges = [
    { icon: <ShieldCheck size={14} />, label: "SOC 2 Secure" },
    { icon: <Building2 size={14} />, label: "Multi-Company" },
    { icon: <KeyRound size={14} />, label: "Role-Based Access" },
    { icon: <CloudCog size={14} />, label: "Cloud Hosted" },
  ];

  const stats = [
    { value: "10K+", label: "Companies" },
    { value: "500K+", label: "Employees" },
    { value: "99.9%", label: "Uptime" },
    { value: "150+", label: "Countries" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      style={{ background: `linear-gradient(160deg, #0A0E1A 0%, #0D1428 50%, #0A0E1A 100%)` }}>

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div  className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #3B82F6, transparent)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #6366F1, transparent)" }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        <motion.div className="absolute top-1/2 left-10 w-48 h-48 rounded-full opacity-10 blur-2xl"
          style={{ background: "radial-gradient(circle, #14B8A6, transparent)" }}
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 flex items-center gap-2">
              <Badge color="blue"><Sparkles size={11} /> Enterprise ERP Platform</Badge>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-6">
              Manage Your Entire{" "}
              <GradientText from="#3B82F6" to="#6366F1">Organization</GradientText>{" "}
              From One Powerful ERP
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
              NexusERP unifies multi-company operations—departments, roles, permissions, and employees—into one intelligent platform built for modern enterprises.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4 mb-10">
              <PrimaryButton size="lg">
                <PlusCircle size={18} /> Register Company
              </PrimaryButton>
              <OutlineButton size="lg">
                <LogIn size={18} /> Login to Portal
              </OutlineButton>
            </motion.div>

            {/* Trust Badges */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-3 mb-12">
              {trustBadges.map((b, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                  <span className="text-blue-400">{b.icon}</span> {b.label}
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-4 gap-4 pt-8 border-t border-white/10">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Dashboard Preview */}
          <motion.div initial={{ opacity: 0, x: 60, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block">
            <DashboardPreviewCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DashboardPreviewCard() {
  const metrics = [
    { label: "Total Employees", value: "4,827", change: "+12%", color: "#3B82F6", icon: <Users size={16} /> },
    { label: "Departments", value: "38", change: "+3", color: "#14B8A6", icon: <FolderKanban size={16} /> },
    { label: "Active Roles", value: "156", change: "+8", color: "#6366F1", icon: <Shield size={16} /> },
    { label: "Companies", value: "12", change: "+1", color: "#F59E0B", icon: <Building2 size={16} /> },
  ];
  const activities = [
    { user: "Sarah K.", action: "Assigned role: Finance Manager", time: "2m ago", dot: "#3B82F6" },
    { user: "Mark T.", action: "Created department: R&D", time: "15m ago", dot: "#14B8A6" },
    { user: "Liu W.", action: "Registered company: TechCo Asia", time: "1h ago", dot: "#6366F1" },
    { user: "Priya N.", action: "Updated permissions: HR Team", time: "2h ago", dot: "#F59E0B" },
  ];

  return (
    <div className="relative">
      {/* Glow */}
      <div className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl"
        style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }} />

      <div className="relative rounded-2xl border border-white/10 overflow-hidden"
        style={{ background: "rgba(15,22,41,0.95)", backdropFilter: "blur(20px)" }}>
        {/* Window bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-slate-500 font-mono">app.nexuserp.io/dashboard</span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white font-semibold text-sm">Organization Overview</h3>
              <p className="text-slate-500 text-xs mt-0.5">NexusCorp Global — Admin</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-teal-400 text-xs">Live</span>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {metrics.map((m, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="p-3 rounded-xl border border-white/5"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ color: m.color }} className="opacity-80">{m.icon}</span>
                  <span className="text-xs text-teal-400">{m.change}</span>
                </div>
                <div className="text-white font-bold text-lg">{m.value}</div>
                <div className="text-slate-500 text-xs">{m.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Mini bar chart */}
          <div className="mb-5 p-3 rounded-xl border border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400 font-medium">Headcount Growth</span>
              <span className="text-xs text-blue-400">Last 7 months</span>
            </div>
            <div className="flex items-end gap-1.5 h-14">
              {[40, 55, 48, 65, 72, 85, 100].map((h, i) => (
                <motion.div key={i}
                  initial={{ height: 0 }} animate={{ height: `${h}%` }}
                  transition={{ delay: 0.8 + i * 0.07, duration: 0.5 }}
                  className="flex-1 rounded-t-sm"
                  style={{ background: i === 6 ? "linear-gradient(180deg, #3B82F6, #6366F1)" : "rgba(59,130,246,0.25)" }} />
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400 font-medium">Recent Activity</span>
              <span className="text-xs text-blue-400 cursor-pointer">View all</span>
            </div>
            <div className="space-y-2.5">
              {activities.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.08 }}
                  className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.dot }} />
                  <div className="flex-1 min-w-0">
                    <span className="text-white text-xs font-medium">{a.user}</span>
                    <span className="text-slate-500 text-xs"> — {a.action}</span>
                  </div>
                  <span className="text-slate-600 text-xs flex-shrink-0">{a.time}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Features ─────────────────────────────────────────────────────────
function Features() {
  const features = [
    { icon: <Building2 size={22} />, title: "Multi-Company Support", desc: "Manage multiple legal entities from a single dashboard. Switch context instantly with unified reporting across your corporate group.", color: "#3B82F6", bg: "rgba(59,130,246,0.08)" },
    { icon: <FolderKanban size={22} />, title: "Department Management", desc: "Organize your workforce into departments with hierarchy, budget tracking, and cross-department collaboration tools.", color: "#14B8A6", bg: "rgba(20,184,166,0.08)" },
    { icon: <Shield size={22} />, title: "Role & Permission Control", desc: "Fine-grained RBAC with custom roles, permission sets, and inheritance. Enforce least-privilege access across every module.", color: "#6366F1", bg: "rgba(99,102,241,0.08)" },
    { icon: <Users size={22} />, title: "Employee Management", desc: "Full employee lifecycle — onboarding, profiles, documents, contracts, org charts, and offboarding in one place.", color: "#F59E0B", bg: "rgba(245,158,11,0.08)" },
    { icon: <BarChart3 size={22} />, title: "Analytics Dashboard", desc: "Real-time KPIs, custom reports, and executive summaries. Drill down from company level to individual performance.", color: "#EC4899", bg: "rgba(236,72,153,0.08)" },
    { icon: <Lock size={22} />, title: "Secure Authentication", desc: "Enterprise SSO, MFA, session management, and IP whitelisting. SOC 2 Type II certified with zero-trust architecture.", color: "#10B981", bg: "rgba(16,185,129,0.08)" },
    { icon: <FileText size={22} />, title: "Audit Logs", desc: "Immutable audit trails for every action across your organization. GDPR-compliant data lineage and compliance reporting.", color: "#F97316", bg: "rgba(249,115,22,0.08)" },
    { icon: <Workflow size={22} />, title: "Workflow Automation", desc: "Visual workflow builder for approvals, notifications, and process automation. Connect teams without writing a line of code.", color: "#8B5CF6", bg: "rgba(139,92,246,0.08)" },
  ];

  return (
    <section id="features" className="py-24 lg:py-32 relative" style={{ background: "#0A0E1A" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <SectionHeading
            badge="✦ Core Features"
            title={<>Everything Your Enterprise <GradientText from="#3B82F6" to="#14B8A6">Needs</GradientText></>}
            subtitle="Built for the complexity of modern multi-entity organizations, with the simplicity your teams demand."
          />
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.25 }}
                className="p-6 rounded-2xl border border-white/8 group cursor-default relative overflow-hidden"
                style={{ background: "rgba(20,29,53,0.6)", backdropFilter: "blur(10px)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${f.color}10, transparent 60%)` }} />

                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 relative"
                  style={{ background: f.bg }}>
                  <span style={{ color: f.color }}>{f.icon}</span>
                </div>
                <h3 className="text-white font-semibold mb-2 relative">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed relative">{f.desc}</p>

                <div className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: f.color }}>
                  Learn more <ChevronRight size={12} />
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Workflow ─────────────────────────────────────────────────────────
function Workflow_() {
  const steps = [
    { icon: <PlusCircle size={20} />, title: "Register Company", desc: "Create your company account with details, billing info, and initial configuration.", color: "#3B82F6" },
    { icon: <UserCheck size={20} />, title: "Create Master Admin", desc: "Set up the super-administrator with full organizational access and control.", color: "#6366F1" },
    { icon: <FolderKanban size={20} />, title: "Create Departments", desc: "Define your organizational structure with departments, teams, and cost centers.", color: "#8B5CF6" },
    { icon: <Shield size={20} />, title: "Create Permissions", desc: "Configure granular permissions for every module, action, and data scope.", color: "#14B8A6" },
    { icon: <KeyRound size={20} />, title: "Create Roles", desc: "Bundle permissions into roles that represent your real-world job functions.", color: "#10B981" },
    { icon: <Settings size={20} />, title: "Assign Permissions", desc: "Map permissions to roles and customize access per team or division.", color: "#F59E0B" },
    { icon: <Users size={20} />, title: "Create Employees", desc: "Onboard employees with profiles, contracts, documents, and contact details.", color: "#F97316" },
    { icon: <ActivitySquare size={20} />, title: "Assign Role & Dept", desc: "Complete the setup by placing employees in departments with their roles.", color: "#EC4899" },
  ];

  return (
    <section className="py-24 lg:py-32 overflow-hidden" style={{ background: "#0D1220" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <SectionHeading
            badge="⚡ Onboarding Workflow"
            title={<>Get Up & Running in <GradientText from="#3B82F6" to="#14B8A6">Minutes</GradientText></>}
            subtitle="Our guided setup flow takes you from company registration to a fully configured ERP in 8 simple steps."
          />
        </FadeIn>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Connector lines */}
          <div className="absolute top-12 left-[8.5%] right-[8.5%] h-0.5"
            style={{ background: "linear-gradient(90deg, #3B82F6, #6366F1, #14B8A6, #EC4899)" }} />

          <div className="grid grid-cols-8 gap-3 relative">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.08} direction="up">
                <div className="flex flex-col items-center text-center group">
                  <motion.div whileHover={{ scale: 1.15 }} transition={{ duration: 0.2 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4 relative z-10 border-2 cursor-default"
                    style={{ background: `${step.color}15`, borderColor: step.color }}>
                    <span style={{ color: step.color }}>{step.icon}</span>
                  </motion.div>

                  <div className="w-6 h-6 rounded-full flex items-center justify-center mb-3 text-xs font-bold text-white"
                    style={{ background: step.color }}>
                    {i + 1}
                  </div>

                  <h4 className="text-white text-sm font-semibold mb-2 leading-tight">{step.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Vertical */}
        <div className="lg:hidden relative">
          <div className="absolute left-8 top-4 bottom-4 w-0.5"
            style={{ background: "linear-gradient(180deg, #3B82F6, #6366F1, #14B8A6, #EC4899)" }} />
          <div className="space-y-8 pl-20 relative">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.06} direction="left">
                <div className="relative">
                  <div className="absolute -left-14 w-10 h-10 rounded-full flex items-center justify-center border-2"
                    style={{ background: `${step.color}15`, borderColor: step.color }}>
                    <span style={{ color: step.color }}>{step.icon}</span>
                  </div>
                  <div className="p-4 rounded-xl border border-white/8" style={{ background: "rgba(20,29,53,0.6)" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ background: step.color }}>Step {i + 1}</span>
                      <h4 className="text-white font-semibold text-sm">{step.title}</h4>
                    </div>
                    <p className="text-slate-500 text-sm">{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Dashboard Preview Section ────────────────────────────────────────
function DashboardSection() {
  const cards = [
    { title: "Total Employees", value: "4,827", sub: "+12.5% this month", icon: <Users size={18} />, color: "#3B82F6" },
    { title: "Departments", value: "38", sub: "Across 12 companies", icon: <FolderKanban size={18} />, color: "#14B8A6" },
    { title: "Monthly Revenue", value: "$2.8M", sub: "+8.3% YoY", icon: <DollarSign size={18} />, color: "#10B981" },
    { title: "Open Tasks", value: "1,293", sub: "142 due today", icon: <Package size={18} />, color: "#F59E0B" },
    { title: "Notifications", value: "48", sub: "12 unread alerts", icon: <Bell size={18} />, color: "#EC4899" },
    { title: "Audit Events", value: "22,491", sub: "Last 30 days", icon: <FileText size={18} />, color: "#8B5CF6" },
  ];

  return (
    <section className="py-24 lg:py-32" style={{ background: "#0A0E1A" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <SectionHeading
            badge="📊 Live Dashboard"
            title={<>Instant Visibility Across Your <GradientText from="#3B82F6" to="#6366F1">Entire Group</GradientText></>}
            subtitle="Real-time metrics, trends, and alerts — all in one enterprise command center."
          />
        </FadeIn>

        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl opacity-20 blur-2xl"
            style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }} />

          <div className="relative rounded-2xl border border-white/10 overflow-hidden"
            style={{ background: "rgba(15,22,41,0.97)", backdropFilter: "blur(20px)" }}>
            {/* Topbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }}>
                  <LayoutDashboard size={16} className="text-white" />
                </div>
                <span className="text-white font-semibold">NexusERP Dashboard</span>
                <Badge color="teal"><span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block animate-pulse" /> Live</Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {cards.map((c, i) => (
                  <FadeIn key={i} delay={0.1 + i * 0.07}>
                    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}
                      className="p-5 rounded-xl border border-white/5 cursor-default"
                      style={{ background: "rgba(255,255,255,0.03)" }}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: `${c.color}15` }}>
                          <span style={{ color: c.color }}>{c.icon}</span>
                        </div>
                        <TrendingUp size={14} className="text-teal-400" />
                      </div>
                      <div className="text-white font-bold text-2xl mb-1">{c.value}</div>
                      <div className="text-slate-400 text-sm mb-1">{c.title}</div>
                      <div className="text-teal-400 text-xs">{c.sub}</div>
                    </motion.div>
                  </FadeIn>
                ))}
              </div>

              {/* Bottom row */}
              <div className="grid lg:grid-cols-3 gap-4">
                {/* Org chart preview */}
                <FadeIn delay={0.5} className="lg:col-span-2">
                  <div className="p-5 rounded-xl border border-white/5 h-full" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-white text-sm font-semibold">Department Breakdown</span>
                      <span className="text-blue-400 text-xs">All Companies</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { dept: "Engineering", count: 1248, pct: 26, color: "#3B82F6" },
                        { dept: "Sales & Marketing", count: 892, pct: 18, color: "#14B8A6" },
                        { dept: "Finance & Accounting", count: 634, pct: 13, color: "#6366F1" },
                        { dept: "HR & People Ops", count: 421, pct: 9, color: "#F59E0B" },
                        { dept: "Operations", count: 389, pct: 8, color: "#EC4899" },
                      ].map((d, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-1">
                            <span className="text-slate-400 text-xs">{d.dept}</span>
                            <span className="text-white text-xs font-medium">{d.count.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-1.5">
                            <motion.div className="h-1.5 rounded-full"
                              initial={{ width: 0 }} animate={{ width: `${d.pct}%` }}
                              transition={{ delay: 0.6 + i * 0.1, duration: 0.7 }}
                              style={{ background: d.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                {/* Activity */}
                <FadeIn delay={0.55}>
                  <div className="p-5 rounded-xl border border-white/5 h-full" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white text-sm font-semibold">Activity Log</span>
                      <span className="text-xs text-slate-500">Today</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { action: "New employee onboarded", dept: "Engineering", time: "09:12", type: "success" },
                        { action: "Role updated: Analyst", dept: "Finance", time: "09:45", type: "info" },
                        { action: "Permission denied attempt", dept: "Security", time: "10:02", type: "warning" },
                        { action: "Dept budget approved", dept: "Operations", time: "10:30", type: "success" },
                        { action: "Bulk employee import", dept: "HR", time: "11:15", type: "info" },
                      ].map((a, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                            a.type === "success" ? "bg-teal-400" : a.type === "warning" ? "bg-amber-400" : "bg-blue-400"
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-slate-300 text-xs leading-tight">{a.action}</p>
                            <p className="text-slate-600 text-xs mt-0.5">{a.dept} · {a.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────
function WhyUs() {
  const points = [
    { icon: <Layers size={22} />, title: "Scalable Architecture", desc: "Built on microservices to handle from 10 to 100,000 employees without performance degradation.", color: "#3B82F6" },
    { icon: <ShieldCheck size={22} />, title: "Secure Access Control", desc: "Zero-trust security model with RBAC, ABAC, and real-time threat detection built in.", color: "#10B981" },
    { icon: <Globe size={22} />, title: "Multi-Tenant Platform", desc: "True data isolation between companies with shared infrastructure efficiency and custom branding.", color: "#6366F1" },
    { icon: <Zap size={22} />, title: "Fast Onboarding", desc: "Go from signup to fully operational in under 30 minutes with our guided setup wizard.", color: "#F59E0B" },
    { icon: <MonitorDot size={22} />, title: "Modern UI/UX", desc: "Designed for the way enterprise teams actually work — intuitive, keyboard-friendly, and fast.", color: "#EC4899" },
    { icon: <RefreshCw size={22} />, title: "Real-Time Sync", desc: "Every change propagates instantly across all connected apps, mobile clients, and integrations.", color: "#14B8A6" },
  ];

  return (
    <section id="about" className="py-24 lg:py-32" style={{ background: "#0D1220" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right">
            <div>
              <Badge color="indigo" className="mb-6">✦ Why NexusERP</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                The ERP Built for <GradientText from="#3B82F6" to="#6366F1">Modern Enterprises</GradientText>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Legacy ERP systems weren't built for today's distributed, multi-entity organizations. NexusERP was designed from the ground up for the way enterprises actually operate.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {["ISO 27001 Certified", "99.95% SLA Guarantee", "GDPR & SOC 2 Compliant", "24/7 Enterprise Support", "Custom integrations available"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(59,130,246,0.2)" }}>
                      <Check size={11} className="text-blue-400" />
                    </div>
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <PrimaryButton size="lg">
                Explore All Features <ArrowRight size={16} />
              </PrimaryButton>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-4">
            {points.map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
                  className="p-5 rounded-2xl border border-white/8 group cursor-default"
                  style={{ background: "rgba(20,29,53,0.5)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${p.color}12` }}>
                    <span style={{ color: p.color }}>{p.icon}</span>
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1.5">{p.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{p.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    { name: "Alexandra Chen", role: "CTO, ScaleOps Inc.", quote: "NexusERP consolidated 7 separate HR systems into one. The multi-company support alone saved us $400K annually in licensing fees.", avatar: "AC", company: "ScaleOps", rating: 5, color: "#3B82F6" },
    { name: "Marcus Rodriguez", role: "VP Operations, Meridian Group", quote: "The permission system is genuinely impressive. We went from a 3-week role-change process to minutes. Our compliance team loves the audit logs.", avatar: "MR", company: "Meridian", rating: 5, color: "#6366F1" },
    { name: "Priya Nair", role: "CHRO, Apex Technologies", quote: "Onboarded 1,200 employees across 4 subsidiaries in two weeks. The guided workflow made what should have been a nightmare a breeze.", avatar: "PN", company: "Apex", rating: 5, color: "#14B8A6" },
    { name: "David Kim", role: "CEO, Nexgen Holdings", quote: "Best ERP decision we've made. The real-time dashboard gives our board exactly the cross-company visibility they needed. Night and day difference.", avatar: "DK", company: "Nexgen", rating: 5, color: "#F59E0B" },
    { name: "Fatima Al-Sayed", role: "Head of HR, GlobalTech ME", quote: "Support team is world-class. They helped us configure custom workflows for our regional entities. No other vendor came close.", avatar: "FA", company: "GlobalTech", rating: 5, color: "#EC4899" },
    { name: "James Whitfield", role: "CFO, Meridian Holdings", quote: "The analytics dashboard replaced three separate BI tools. Real-time headcount costs by department changed how we budget entirely.", avatar: "JW", company: "Meridian", rating: 5, color: "#10B981" },
  ];

  return (
    <section className="py-24 lg:py-32 overflow-hidden" style={{ background: "#0A0E1A" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <SectionHeading
            badge="★ Customer Stories"
            title={<>Trusted by <GradientText from="#3B82F6" to="#14B8A6">Industry Leaders</GradientText></>}
            subtitle="Hundreds of enterprises run their most critical operations on NexusERP every day."
          />
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.25 }}
                className="p-6 rounded-2xl border border-white/8 flex flex-col gap-4 cursor-default relative overflow-hidden"
                style={{ background: "rgba(20,29,53,0.6)" }}>
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5 blur-xl"
                  style={{ background: t.color, transform: "translate(30%, -30%)" }} />

                {/* Stars */}
                <div className="flex gap-1">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} size={13} fill="#F59E0B" className="text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed flex-1">"{t.quote}"</p>

                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{t.name}</div>
                    <div className="text-slate-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────
function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      period: "/mo",
      desc: "Perfect for small businesses taking their first steps into structured ERP.",
      color: "#64748B",
      features: ["Up to 50 employees", "1 company entity", "5 departments", "Basic roles & permissions", "Standard analytics", "Email support"],
      cta: "Get Started", highlight: false,
    },
    {
      name: "Business",
      price: "$149",
      period: "/mo",
      desc: "The complete platform for growing companies needing multi-entity support.",
      color: "#3B82F6",
      features: ["Up to 500 employees", "5 company entities", "Unlimited departments", "Advanced RBAC", "Real-time analytics", "Audit logs", "Workflow automation", "Priority support"],
      cta: "Start Free Trial", highlight: true, badge: "Most Popular",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "Unlimited scale, dedicated infrastructure, and white-glove implementation.",
      color: "#6366F1",
      features: ["Unlimited employees", "Unlimited companies", "Custom integrations", "SSO / SAML / LDAP", "Dedicated account manager", "SLA guarantee", "Custom workflows", "On-premise option"],
      cta: "Contact Sales", highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 lg:py-32" style={{ background: "#0D1220" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <SectionHeading
            badge="💳 Pricing"
            title={<>Transparent Pricing, <GradientText from="#3B82F6" to="#6366F1">No Surprises</GradientText></>}
            subtitle="Start free, scale as you grow. Every plan includes a 14-day free trial."
          />
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}
                className={`p-7 rounded-2xl border relative overflow-hidden ${
                  plan.highlight ? "border-blue-500/50 shadow-2xl shadow-blue-500/20" : "border-white/8"
                }`}
                style={{ background: plan.highlight ? "rgba(20,29,80,0.9)" : "rgba(20,29,53,0.6)" }}>

                {plan.highlight && (
                  <>
                    <div className="absolute inset-0 opacity-5"
                      style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }} />
                    <div className="absolute top-4 right-4">
                      <Badge color="blue">{plan.badge}</Badge>
                    </div>
                  </>
                )}

                <div className="mb-6">
                  <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                  <p className="text-slate-500 text-sm mb-5">{plan.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-500 text-sm">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-7">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <CircleCheck size={15} style={{ color: plan.color }} className="flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{f}</span>
                    </div>
                  ))}
                </div>

                {plan.highlight ? (
                  <PrimaryButton className="w-full justify-center">{plan.cta}</PrimaryButton>
                ) : (
                  <OutlineButton className="w-full justify-center">{plan.cta}</OutlineButton>
                )}
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 lg:py-32" style={{ background: "#0A0E1A" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <FadeIn>
          <div className="relative p-12 md:p-20 rounded-3xl border border-white/10 overflow-hidden"
            style={{ background: "rgba(15,22,41,0.8)" }}>
            {/* BG effects */}
            <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl"
              style={{ background: "radial-gradient(circle, #3B82F6, transparent)" }} />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl"
              style={{ background: "radial-gradient(circle, #6366F1, transparent)" }} />

            <div className="relative">
              <Badge color="blue" className="mb-6 inline-flex">
                <Sparkles size={11} /> Ready to transform your organization?
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Start Managing Your Company{" "}
                <GradientText from="#3B82F6" to="#6366F1">Smarter</GradientText>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Join over 10,000 companies who run their operations on NexusERP. No credit card required to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PrimaryButton size="lg">
                  <PlusCircle size={18} /> Register Company Free
                </PrimaryButton>
                <OutlineButton size="lg">
                  <Play size={16} /> Book a Demo
                </OutlineButton>
              </div>
              <p className="text-slate-600 text-sm mt-6">14-day free trial · No credit card · Cancel anytime</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────
function Footer() {
  const links = {
    Product: ["Features", "Modules", "Pricing", "Changelog", "Roadmap"],
    Company: ["About Us", "Careers", "Blog", "Press Kit", "Partners"],
    Resources: ["Documentation", "API Reference", "Status Page", "Tutorials", "Community"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "Security"],
  };

  return (
    <footer style={{ background: "#070B16" }} className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }}>
                <Building2 size={18} className="text-white" />
              </div>
              <span className="text-white font-bold text-lg">Nexus<GradientText from="#3B82F6" to="#6366F1">ERP</GradientText></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
              The enterprise ERP platform that scales with your ambitions. One platform, infinite possibilities.
            </p>
            {/* <div className="flex items-center gap-3">
              {[<Twitter size={16} />].map((Icon, i) => (
                <motion.a key={i} whileHover={{ scale: 1.15, color: "#3B82F6" }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-white border border-white/10 hover:border-blue-500/50 transition-all duration-200 cursor-pointer">
                  {Icon}
                </motion.a>
              ))}
            </div> */}
          </div>

          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <h4 className="text-white text-sm font-semibold mb-4">{cat}</h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6 text-sm text-slate-500">
            <a href="mailto:hello@nexuserp.io" className="flex items-center gap-2 hover:text-slate-300 transition-colors">
              <Mail size={14} /> hello@nexuserp.io
            </a>
            <a href="tel:+18005551234" className="flex items-center gap-2 hover:text-slate-300 transition-colors">
              <Phone size={14} /> +1 800 555 1234
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={14} /> San Francisco, CA
            </span>
          </div>
          <p className="text-slate-600 text-sm">© 2025 NexusERP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Modules Section ──────────────────────────────────────────────────
function Modules() {
  const modules = [
    { icon: <BriefcaseBusiness size={24} />, name: "HRM Suite", desc: "Full employee lifecycle management", color: "#3B82F6" },
    { icon: <BarChart3 size={24} />, name: "Finance Module", desc: "Budgets, expenses, payroll & reporting", color: "#10B981" },
    { icon: <Cpu size={24} />, name: "IT Asset Manager", desc: "Track hardware, software, and licenses", color: "#6366F1" },
    { icon: <Workflow size={24} />, name: "Process Automation", desc: "No-code workflow builder & triggers", color: "#F59E0B" },
    { icon: <Globe size={24} />, name: "Multi-Region", desc: "Currency, compliance & locale support", color: "#EC4899" },
    { icon: <Database size={24} />, name: "Data Warehouse", desc: "Centralized data lake for all entities", color: "#14B8A6" },
  ];

  return (
    <section id="modules" className="py-24 lg:py-32" style={{ background: "#0D1220" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <SectionHeading
            badge="📦 ERP Modules"
            title={<>Plug-and-Play <GradientText from="#3B82F6" to="#14B8A6">Modules</GradientText> for Every Function</>}
            subtitle="Enable only what you need. Every module integrates seamlessly with your existing workflow."
          />
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <motion.div whileHover={{ scale: 1.03, y: -4 }} transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl border border-white/8 flex items-start gap-4 group cursor-default"
                style={{ background: "rgba(20,29,53,0.5)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${m.color}15` }}>
                  <span style={{ color: m.color }}>{m.icon}</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{m.name}</h3>
                  <p className="text-slate-500 text-sm">{m.desc}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: m.color }}>
                    Explore module <MoveRight size={12} />
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', 'Outfit', system-ui, sans-serif", background: "#0A0E1A" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0A0E1A; }
        ::-webkit-scrollbar-thumb { background: #1E2D50; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #3B82F6; }
      `}</style>
      <Navbar />
      <Hero />
      <Features />
      <Modules />
      <Workflow_ />
      <DashboardSection />
      <WhyUs />
      <Testimonials />
      <Pricing />
      <CTASection />
      <Footer />
    </div>
  );
}