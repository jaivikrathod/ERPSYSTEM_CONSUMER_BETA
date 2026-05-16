import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Mail, Lock, Eye, EyeOff, ArrowRight,
  ShieldCheck, CloudCog, KeyRound, Sparkles, LogIn,
  PlusCircle, AlertCircle, CheckCircle2,
} from "lucide-react";
import { authAPI } from "../services/apiEndpoints";

// ─── Shared Design Tokens (matches landing page) ─────────────────────
const GOOGLE_FONT = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;

const trustBadges = [
  { icon: <ShieldCheck size={13} />, label: "SOC 2 Secure" },
  { icon: <Building2 size={13} />, label: "Multi-Company" },
  { icon: <KeyRound size={13} />, label: "Role-Based Access" },
  { icon: <CloudCog size={13} />, label: "Cloud Hosted" },
];

const GradientText = ({ children, from = "#3B82F6", to = "#6366F1" }) => (
  <span className="bg-clip-text text-transparent"
    style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}>
    {children}
  </span>
);

// ─── Animated Background Orbs ─────────────────────────────────────────
function BgOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <motion.div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, #3B82F620, transparent 70%)" }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />

      <motion.div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, #6366F118, transparent 70%)" }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} />

      <motion.div className="absolute top-[40%] right-[15%] w-[300px] h-[300px] rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, #14B8A612, transparent 70%)" }}
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
    </div>
  );
}

// ─── Left Panel — Branding ────────────────────────────────────────────
function BrandPanel() {
  const features = [
    "Manage unlimited departments & roles",
    "Multi-company from a single dashboard",
    "Real-time analytics & audit logs",
    "Enterprise-grade security & SSO",
  ];

  return (
    <div className="hidden lg:flex flex-col justify-between p-12 xl:p-16 relative"
      style={{ background: "linear-gradient(145deg, #0D1628 0%, #0A1020 100%)" }}>

      {/* Decorative side glow */}
      <div className="absolute inset-y-0 right-0 w-px"
        style={{ background: "linear-gradient(180deg, transparent, #3B82F630, #6366F130, transparent)" }} />

      {/* Logo */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }}>
          <Building2 size={20} className="text-white" />
        </div>
        <span className="text-white font-bold text-xl tracking-tight">
          Nexus<GradientText>ERP</GradientText>
        </span>
      </motion.div>

      {/* Main Copy */}
      <div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold mb-6">
            <Sparkles size={11} /> Enterprise ERP Platform
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold text-white leading-[1.15] mb-5">
            Welcome back to your{" "}
            <GradientText from="#3B82F6" to="#6366F1">command center</GradientText>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-sm">
            Sign in to manage your entire organization — employees, departments, roles, and workflows — all in one place.
          </p>

          <div className="space-y-4 mb-12">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.09, duration: 0.5 }}
                className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(59,130,246,0.2)" }}>
                  <CheckCircle2 size={11} className="text-blue-400" />
                </div>
                <span className="text-slate-300 text-sm">{f}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mini Dashboard Preview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="p-5 rounded-2xl border border-white/8 relative overflow-hidden"
          style={{ background: "rgba(15,22,41,0.8)", backdropFilter: "blur(16px)" }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-white text-sm font-semibold">Quick Overview</span>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-teal-400 text-xs">Live</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Companies", value: "12", color: "#3B82F6" },
              { label: "Employees", value: "4.8K", color: "#14B8A6" },
              { label: "Roles", value: "156", color: "#6366F1" },
            ].map((s, i) => (
              <div key={i} className="p-3 rounded-xl text-center"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Trust Badges */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="flex flex-wrap gap-2">
        {trustBadges.map((b, i) => (
          <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 border border-white/8"
            style={{ background: "rgba(255,255,255,0.03)" }}>
            <span className="text-blue-400">{b.icon}</span> {b.label}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Input Component ──────────────────────────────────────────────────
function FormInput({ label, type = "text", placeholder, value, onChange, icon, rightElement, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">{icon}</div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-xl py-3.5 text-white text-sm placeholder-slate-600 outline-none transition-all duration-200
            border focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20
            ${icon ? "pl-11" : "pl-4"} ${rightElement ? "pr-12" : "pr-4"}
            ${error ? "border-red-500/60 bg-red-500/5" : "border-white/10 bg-white/5 hover:border-white/20"}`}
        />
        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

// ─── Login Form ───────────────────────────────────────────────────────
function LoginForm({ onNavigateToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    
    try {
      const res = await authAPI.login({ email, password });
      
      // Store token and user data
      if (res.data?.data?.token) {
         localStorage.setItem("token", res.data.data.token);
         localStorage.setItem("user", JSON.stringify(res.data.data.user));
         localStorage.setItem("companies", JSON.stringify(res.data.data.companies || []));
         
         // If there is only one company, we might auto-select it
         if (res.data.data.companies && res.data.data.companies.length > 0) {
           localStorage.setItem("company_id", res.data.data.companies[0].company_id);
         }
      }
      
      setLoading(false);
      setSuccess(true);
      
      // Redirect after success animation
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
      
    } catch (err) {
      console.error(err);
      setLoading(false);
      setErrors({ form: err.response?.data?.message || "Invalid credentials. Please try again." });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md mx-auto">

      {/* Mobile Logo */}
      <div className="lg:hidden flex items-center gap-2.5 mb-8">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }}>
          <Building2 size={18} className="text-white" />
        </div>
        <span className="text-white font-bold text-lg">
          Nexus<GradientText>ERP</GradientText>
        </span>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl xl:text-3xl font-bold text-white mb-2">Sign in to your account</h2>
        <p className="text-slate-500 text-sm">
          Don't have a company yet?{" "}
          <button onClick={onNavigateToRegister}
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors underline underline-offset-2">
            Register your company
          </button>
        </p>
      </div>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div key="success"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl border border-teal-500/30 bg-teal-500/10 text-center">
            <CheckCircle2 size={40} className="text-teal-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold text-lg mb-1">Login Successful!</h3>
            <p className="text-slate-400 text-sm">Redirecting to your dashboard…</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
            {/* Global form error */}
            {errors.form && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                <AlertCircle size={14} /> {errors.form}
              </div>
            )}
            <FormInput
              label="Work Email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              icon={<Mail size={16} />}
              error={errors.email}
            />

            <FormInput
              label="Password"
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              icon={<Lock size={16} />}
              error={errors.password}
              rightElement={
                <button type="button" onClick={() => setShowPass(v => !v)}
                  className="text-slate-500 hover:text-slate-300 transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            {/* Forgot password */}
            <div className="flex justify-end -mt-1">
              <button type="button" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit" disabled={loading}
              className="w-full relative flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white font-semibold text-sm overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }}>
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn size={16} /> Sign In to Dashboard
                </>
              )}
              <div className="absolute inset-0 bg-white/0 hover:bg-white/5 transition-all duration-200" />
            </motion.button>

            {/* Divider */}
            <div className="relative flex items-center gap-4 py-1">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-slate-600 text-xs">or continue with</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* SSO */}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20 text-white text-sm font-medium transition-all duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </motion.button>

            {/* Register link */}
            <p className="text-center text-xs text-slate-600 pt-2">
              New to NexusERP?{" "}
              <button type="button" onClick={onNavigateToRegister}
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                Register your company →
              </button>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Login Page (Route: /login) ───────────────────────────────────────
export default function LoginPage() {
  // In a real app, replace this with useNavigate() from react-router-dom
  const navigateToRegister = () => {
    window.location.href = "/register-company";
  };

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#0A0E1A", minHeight: "100vh" }}>
      <style>{`
        ${GOOGLE_FONT}
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px #131d35 inset !important;
          -webkit-text-fill-color: #e2e8f0 !important;
          caret-color: #e2e8f0;
        }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0A0E1A; }
        ::-webkit-scrollbar-thumb { background: #1E2D50; border-radius: 3px; }
      `}</style>

      <BgOrbs />

      <div className="relative min-h-screen grid lg:grid-cols-[1fr_1fr] xl:grid-cols-[55%_45%]" style={{ zIndex: 1 }}>
        {/* Left Brand Panel */}
        <BrandPanel />

        {/* Right Form Panel */}
        <div className="flex flex-col justify-center px-6 sm:px-12 xl:px-16 py-12 relative"
          style={{ background: "rgba(10,14,26,0.6)", backdropFilter: "blur(2px)" }}>

          {/* Top-right link */}
          <div className="absolute top-6 right-6 hidden lg:flex items-center gap-2 text-sm text-slate-500">
            No account?{" "}
            <button onClick={navigateToRegister}
              className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              <PlusCircle size={14} /> Register Company
            </button>
          </div>

          <LoginForm onNavigateToRegister={navigateToRegister} />

          {/* Footer */}
          <p className="mt-12 text-center text-xs text-slate-700">
            © 2025 NexusERP · <a href="#" className="hover:text-slate-500 transition-colors">Privacy</a> · <a href="#" className="hover:text-slate-500 transition-colors">Terms</a>
          </p>
        </div>
      </div>
    </div>
  );
}