import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Mail, Lock, Eye, EyeOff, Globe, Phone, MapPin,
  Upload, Briefcase, ChevronRight, ChevronLeft, CheckCircle2,
  AlertCircle, Sparkles, LogIn, ShieldCheck, CloudCog, KeyRound,
  User, X, Image as ImageIcon, ArrowRight,
} from "lucide-react";
import { onboardingAPI } from "../services/apiEndpoints";

// ─── Shared Tokens ────────────────────────────────────────────────────
const GOOGLE_FONT = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;

const GradientText = ({ children, from = "#3B82F6", to = "#6366F1" }) => (
  <span className="bg-clip-text text-transparent"
    style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}>
    {children}
  </span>
);

const INDUSTRIES = [
  "Technology & Software", "Finance & Banking", "Healthcare & Pharma",
  "Manufacturing", "Retail & E-commerce", "Education", "Real Estate",
  "Logistics & Supply Chain", "Media & Entertainment", "Consulting",
  "Legal Services", "Energy & Utilities", "Hospitality & Tourism",
  "Agriculture", "Other",
];

// ─── Background ───────────────────────────────────────────────────────
function BgOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <motion.div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, #6366F115, transparent 70%)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, #3B82F615, transparent 70%)" }}
        animate={{ scale: [1.08, 1, 1.08] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }} />
      <motion.div className="absolute top-[35%] left-[45%] w-[280px] h-[280px] rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, #14B8A610, transparent 70%)" }}
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
    </div>
  );
}

// ─── Step Indicator ───────────────────────────────────────────────────
function StepIndicator({ current, steps }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{
                  background: done ? "linear-gradient(135deg,#10B981,#14B8A6)"
                    : active ? "linear-gradient(135deg,#3B82F6,#6366F1)"
                    : "rgba(255,255,255,0.05)",
                  borderColor: done ? "#10B981" : active ? "#3B82F6" : "#1E2D50",
                  scale: active ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-9 h-9 rounded-full flex items-center justify-center border-2 text-sm font-bold"
                style={{ color: done || active ? "#fff" : "#475569" }}>
                {done ? <CheckCircle2 size={16} /> : i + 1}
              </motion.div>
              <span className={`text-xs font-medium hidden sm:block ${active ? "text-blue-400" : done ? "text-teal-400" : "text-slate-600"}`}>
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 mt-[-14px] rounded-full"
                style={{ background: i < current ? "linear-gradient(90deg,#10B981,#14B8A6)" : "#1E2D50" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Form Field ───────────────────────────────────────────────────────
function FormInput({ label, type = "text", placeholder, value, onChange, icon, rightEl, error, required, hint }) {
  return (
    <div>
      <label className="flex items-center gap-1 text-sm font-medium text-slate-300 mb-2">
        {label} {required && <span className="text-blue-400 text-xs">*</span>}
      </label>
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">{icon}</div>}
        <input type={type} placeholder={placeholder} value={value} onChange={onChange}
          className={`w-full rounded-xl py-3.5 text-white text-sm placeholder-slate-600 outline-none transition-all duration-200
            border focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20
            ${icon ? "pl-11" : "pl-4"} ${rightEl ? "pr-12" : "pr-4"}
            ${error ? "border-red-500/60 bg-red-500/5" : "border-white/10 bg-white/5 hover:border-white/20"}`}
        />
        {rightEl && <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightEl}</div>}
      </div>
      {hint && !error && <p className="mt-1.5 text-xs text-slate-600">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    </div>
  );
}

function FormSelect({ label, value, onChange, options, icon, error, required }) {
  return (
    <div>
      <label className="flex items-center gap-1 text-sm font-medium text-slate-300 mb-2">
        {label} {required && <span className="text-blue-400 text-xs">*</span>}
      </label>
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">{icon}</div>}
        <select value={value} onChange={onChange}
          className={`w-full rounded-xl py-3.5 text-sm outline-none transition-all duration-200 appearance-none cursor-pointer
            border focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20
            ${icon ? "pl-11" : "pl-4"} pr-10
            ${error ? "border-red-500/60 bg-red-500/5 text-white" : "border-white/10 bg-white/5 hover:border-white/20 text-white"}
            `}
          style={{ background: value ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.05)" }}>
          <option value="" style={{ background: "#141D35", color: "#64748B" }}>Select industry…</option>
          {options.map(o => <option key={o} value={o} style={{ background: "#141D35", color: "#E2E8F0" }}>{o}</option>)}
        </select>
        <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none rotate-90" />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    </div>
  );
}

// ─── Logo Upload ──────────────────────────────────────────────────────
function LogoUpload({ value, onChange }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    onChange(file);
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label className="text-sm font-medium text-slate-300 mb-2 block">Company Logo <span className="text-slate-600 font-normal">(optional)</span></label>
      <motion.div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
        animate={{ borderColor: dragging ? "#3B82F6" : "rgba(255,255,255,0.1)", background: dragging ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.03)" }}
        className="relative h-28 rounded-xl border-2 border-dashed flex items-center justify-center gap-4 cursor-pointer transition-colors duration-200 group hover:border-blue-500/40 hover:bg-blue-500/5">

        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={e => handleFile(e.target.files[0])} />

        {preview ? (
          <div className="flex items-center gap-4 px-4">
            <img src={preview} alt="Logo preview" className="w-14 h-14 rounded-xl object-contain bg-white/5 p-1" />
            <div>
              <p className="text-white text-sm font-medium">{value?.name}</p>
              <p className="text-slate-500 text-xs">{value ? (value.size / 1024).toFixed(1) + " KB" : ""}</p>
            </div>
            <button type="button" onClick={e => { e.stopPropagation(); setPreview(null); onChange(null); }}
              className="ml-auto text-slate-600 hover:text-red-400 transition-colors p-1">
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform"
              style={{ background: "rgba(59,130,246,0.1)" }}>
              <Upload size={18} className="text-blue-400" />
            </div>
            <p className="text-slate-400 text-sm">Drop your logo here or <span className="text-blue-400">browse</span></p>
            <p className="text-slate-600 text-xs mt-1">PNG, JPG, SVG up to 5MB</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ─── Step 1: Company Details ──────────────────────────────────────────
function StepCompanyDetails({ data, onChange, errors }) {
  return (
    <motion.div key="step1"
      initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5">

      <div className="grid sm:grid-cols-2 gap-5">
        <FormInput label="Company Name" placeholder="Acme Corporation" value={data.name}
          onChange={e => onChange("name", e.target.value)} icon={<Building2 size={16} />}
          error={errors.name} required />
        <FormInput label="Business Email" type="email" placeholder="contact@acme.com" value={data.email}
          onChange={e => onChange("email", e.target.value)} icon={<Mail size={16} />}
          error={errors.email} required />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormInput label="Phone Number" type="tel" placeholder="+1 (800) 555-0100" value={data.phone}
          onChange={e => onChange("phone", e.target.value)} icon={<Phone size={16} />}
          error={errors.phone} required />
        <FormInput label="Website URL" placeholder="https://acme.com" value={data.website}
          onChange={e => onChange("website", e.target.value)} icon={<Globe size={16} />}
          error={errors.website} hint="Include https://" />
      </div>

      <FormInput label="Registered Address" placeholder="123 Business Ave, Suite 400, San Francisco, CA 94107" value={data.address}
        onChange={e => onChange("address", e.target.value)} icon={<MapPin size={16} />}
        error={errors.address} required />

      <FormSelect label="Industry" value={data.industry} onChange={e => onChange("industry", e.target.value)}
        options={INDUSTRIES} icon={<Briefcase size={16} />} error={errors.industry} required />

      <LogoUpload value={data.logo} onChange={file => onChange("logo", file)} />
    </motion.div>
  );
}

// ─── Step 2: Master Account ───────────────────────────────────────────
function StepMasterAccount({ data, onChange, errors }) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strength = (() => {
    const p = data.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#EF4444", "#F59E0B", "#3B82F6", "#10B981"][strength];

  return (
    <motion.div key="step2"
      initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5">

      {/* Info Banner */}
      <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/8 flex items-start gap-3">
        <ShieldCheck size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-blue-300 text-sm font-semibold mb-1">Creating Master Administrator Account</p>
          <p className="text-slate-500 text-xs leading-relaxed">
            This account will have full access to your organization. It will be used to configure departments, roles, permissions, and employees.
          </p>
        </div>
      </div>

      <FormInput label="Master Admin Email" type="email" placeholder="admin@acme.com" value={data.adminEmail}
        onChange={e => onChange("adminEmail", e.target.value)} icon={<User size={16} />}
        error={errors.adminEmail} required
        hint="Use a secure, role-based email (e.g. admin@ or erp@)" />

      <div>
        <FormInput label="Create Password" type={showPass ? "text" : "password"}
          placeholder="Create a strong password" value={data.password}
          onChange={e => onChange("password", e.target.value)} icon={<Lock size={16} />}
          error={errors.password} required
          rightEl={
            <button type="button" onClick={() => setShowPass(v => !v)}
              className="text-slate-500 hover:text-slate-300 transition-colors">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />
        {/* Strength bar */}
        {data.password && (
          <div className="mt-2.5">
            <div className="flex gap-1 mb-1.5">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
                  style={{ background: i <= strength ? strengthColor : "rgba(255,255,255,0.06)" }} />
              ))}
            </div>
            <p className="text-xs" style={{ color: strengthColor }}>{strengthLabel} password</p>
          </div>
        )}
      </div>

      <FormInput label="Confirm Password" type={showConfirm ? "text" : "password"}
        placeholder="Re-enter your password" value={data.confirmPassword}
        onChange={e => onChange("confirmPassword", e.target.value)} icon={<Lock size={16} />}
        error={errors.confirmPassword} required
        rightEl={
          <button type="button" onClick={() => setShowConfirm(v => !v)}
            className="text-slate-500 hover:text-slate-300 transition-colors">
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
      />

      {/* Password requirements */}
      <div className="p-4 rounded-xl bg-white/3 border border-white/6">
        <p className="text-slate-500 text-xs font-medium mb-2.5">Password requirements:</p>
        <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
          {[
            ["At least 8 characters", data.password?.length >= 8],
            ["One uppercase letter", /[A-Z]/.test(data.password || "")],
            ["One number", /[0-9]/.test(data.password || "")],
            ["One special character", /[^A-Za-z0-9]/.test(data.password || "")],
          ].map(([req, met]) => (
            <div key={req} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${met ? "bg-teal-500/20" : "bg-white/5"}`}>
                {met
                  ? <CheckCircle2 size={9} className="text-teal-400" />
                  : <div className="w-1 h-1 rounded-full bg-slate-600" />}
              </div>
              <span className={`text-xs transition-colors duration-200 ${met ? "text-teal-400" : "text-slate-600"}`}>{req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3 pt-1">
        <input type="checkbox" id="terms" checked={data.agreedToTerms}
          onChange={e => onChange("agreedToTerms", e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 accent-blue-500 cursor-pointer flex-shrink-0" />
        <label htmlFor="terms" className="text-xs text-slate-500 leading-relaxed cursor-pointer">
          I agree to NexusERP's{" "}
          <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a>,{" "}
          <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>, and{" "}
          <a href="#" className="text-blue-400 hover:text-blue-300">Data Processing Agreement</a>.
        </label>
      </div>
      {errors.agreedToTerms && (
        <p className="text-xs text-red-400 flex items-center gap-1 -mt-2">
          <AlertCircle size={11} /> {errors.agreedToTerms}
        </p>
      )}
    </motion.div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────
function SuccessScreen({ companyName, onLogin }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-6">
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full opacity-30 blur-xl"
          style={{ background: "radial-gradient(circle, #10B981, transparent)" }} />
        <div className="relative w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #10B981, #14B8A6)" }}>
          <CheckCircle2 size={36} className="text-white" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">Company Registered!</h2>
      <p className="text-slate-400 text-sm mb-2 max-w-sm mx-auto leading-relaxed">
        <span className="text-white font-semibold">{companyName}</span> has been successfully registered on NexusERP. Your master admin account is ready.
      </p>

      <div className="my-8 p-5 rounded-2xl border border-teal-500/20 bg-teal-500/8 text-left">
        <p className="text-teal-300 font-semibold text-sm mb-3">What happens next?</p>
        {[
          "A verification email has been sent to your admin address",
          "Verify your email to activate your account",
          "Login and complete your organization setup",
          "Create departments, roles, and invite employees",
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3 mb-2.5 last:mb-0">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: "rgba(20,184,166,0.2)" }}>
              <span className="text-teal-400 text-xs font-bold">{i + 1}</span>
            </div>
            <p className="text-slate-400 text-sm">{step}</p>
          </div>
        ))}
      </div>

      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        onClick={onLogin}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white font-semibold text-sm"
        style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }}>
        <LogIn size={16} /> Go to Login
      </motion.button>
    </motion.div>
  );
}

// ─── Side Panel ───────────────────────────────────────────────────────
function SidePanel({ step }) {
  const panels = [
    {
      badge: "Step 1 of 2",
      title: <>Tell us about your <GradientText from="#3B82F6" to="#14B8A6">company</GradientText></>,
      desc: "We'll set up your organization profile so your team can find and recognize your company across NexusERP.",
      bullets: ["Professional company profile", "Industry-specific defaults", "Custom logo & branding", "Multi-location support"],
    },
    {
      badge: "Step 2 of 2",
      title: <>Secure your <GradientText from="#3B82F6" to="#6366F1">master account</GradientText></>,
      desc: "The master admin has full organizational control. Choose a strong, unique password and keep it safe.",
      bullets: ["Full org-wide access", "Can create sub-admins", "Manages all departments", "Audit log access"],
    },
  ];

  const p = panels[step] || panels[0];

  return (
    <div className="hidden lg:flex flex-col justify-between p-12 xl:p-16 relative"
      style={{ background: "linear-gradient(145deg, #0D1628 0%, #0A1020 100%)" }}>

      <div className="absolute inset-y-0 right-0 w-px"
        style={{ background: "linear-gradient(180deg, transparent, #3B82F630, #6366F130, transparent)" }} />

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }}>
          <Building2 size={20} className="text-white" />
        </div>
        <span className="text-white font-bold text-xl tracking-tight">
          Nexus<GradientText>ERP</GradientText>
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold mb-6">
            <Sparkles size={11} /> {p.badge}
          </div>
          <h2 className="text-3xl xl:text-4xl font-bold text-white leading-[1.2] mb-5">{p.title}</h2>
          <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-sm">{p.desc}</p>

          <div className="space-y-3.5 mb-10">
            {p.bullets.map((b, i) => (
              <motion.div key={b} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(59,130,246,0.2)" }}>
                  <CheckCircle2 size={11} className="text-blue-400" />
                </div>
                <span className="text-slate-300 text-sm">{b}</span>
              </motion.div>
            ))}
          </div>

          {/* Progress illustration */}
          <div className="p-5 rounded-2xl border border-white/8"
            style={{ background: "rgba(15,22,41,0.8)", backdropFilter: "blur(16px)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-xs font-medium">Setup Progress</span>
              <span className="text-blue-400 text-xs font-semibold">{step === 0 ? "50%" : "90%"}</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2 mb-4">
              <motion.div className="h-2 rounded-full"
                animate={{ width: step === 0 ? "50%" : "90%" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ background: "linear-gradient(90deg, #3B82F6, #6366F1)" }} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Company Info", done: true },
                { label: "Master Account", done: step >= 1 },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs"
                  style={{ color: s.done ? "#3B82F6" : "#475569" }}>
                  <div className={`w-1.5 h-1.5 rounded-full ${s.done ? "bg-blue-400" : "bg-slate-700"}`} />
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {[
          { icon: <ShieldCheck size={13} />, label: "SOC 2 Secure" },
          { icon: <CloudCog size={13} />, label: "Cloud Hosted" },
          { icon: <KeyRound size={13} />, label: "RBAC Ready" },
        ].map((b, i) => (
          <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 border border-white/8"
            style={{ background: "rgba(255,255,255,0.03)" }}>
            <span className="text-blue-400">{b.icon}</span> {b.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Register Company Page (Route: /register-company) ─────────────────
export default function RegisterCompanyPage() {
  const navigateToLogin = () => { window.location.href = "/login"; };

  const STEPS = ["Company Details", "Master Account"];
  const [currentStep, setCurrentStep] = useState(0);
  const [registered, setRegistered] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [company, setCompany] = useState({
    name: "", email: "", phone: "", website: "", address: "", industry: "", logo: null,
  });
  const [master, setMaster] = useState({
    adminEmail: "", password: "", confirmPassword: "", agreedToTerms: false,
  });
  const [errors, setErrors] = useState({});

  const updateCompany = (key, val) => {
    setCompany(p => ({ ...p, [key]: val }));
    setErrors(e => { const n = { ...e }; delete n[key]; return n; });
  };
  const updateMaster = (key, val) => {
    setMaster(p => ({ ...p, [key]: val }));
    setErrors(e => { const n = { ...e }; delete n[key]; return n; });
  };

  const validateStep1 = () => {
    const e = {};
    if (!company.name.trim()) e.name = "Company name is required";
    if (!company.email.trim()) e.email = "Business email is required";
    else if (!/\S+@\S+\.\S+/.test(company.email)) e.email = "Enter a valid email address";
    if (!company.phone.trim()) e.phone = "Phone number is required";
    if (!company.address.trim()) e.address = "Address is required";
    if (!company.industry) e.industry = "Please select an industry";
    return e;
  };

  const validateStep2 = () => {
    const e = {};
    if (!master.adminEmail.trim()) e.adminEmail = "Admin email is required";
    else if (!/\S+@\S+\.\S+/.test(master.adminEmail)) e.adminEmail = "Enter a valid email address";
    if (!master.password) e.password = "Password is required";
    else if (master.password.length < 8) e.password = "Password must be at least 8 characters";
    else if (!/[A-Z]/.test(master.password)) e.password = "Include at least one uppercase letter";
    else if (!/[0-9]/.test(master.password)) e.password = "Include at least one number";
    if (!master.confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (master.password !== master.confirmPassword) e.confirmPassword = "Passwords do not match";
    if (!master.agreedToTerms) e.agreedToTerms = "You must agree to the terms to continue";
    return e;
  };

  const handleNext = () => {
    const e = validateStep1();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setCurrentStep(1);
  };

  const handleBack = () => { setErrors({}); setCurrentStep(0); };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validateStep2();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSubmitting(true);
    
    try {
      const payload = {
        company_name: company.name,
        domain: company.website,
        admin_email: master.adminEmail,
        admin_first_name: "Admin", // Provide logic to ask for first name if needed, defaulting for now
        admin_last_name: "",
        password: master.password
      };
      await onboardingAPI.registerCompany(payload);
      setSubmitting(false);
      setRegistered(true);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      setErrors({ apiError: err.response?.data?.message || "Failed to register company. Please try again." });
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#0A0E1A", minHeight: "100vh" }}>
      <style>{`
        ${GOOGLE_FONT}
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px #131d35 inset !important;
          -webkit-text-fill-color: #e2e8f0 !important;
          caret-color: #e2e8f0;
        }
        select option { background: #141D35; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0A0E1A; }
        ::-webkit-scrollbar-thumb { background: #1E2D50; border-radius: 3px; }
      `}</style>

      <BgOrbs />

      <div className="relative min-h-screen grid lg:grid-cols-[1fr_1fr] xl:grid-cols-[48%_52%]" style={{ zIndex: 1 }}>
        {/* Left Side Panel */}
        <SidePanel step={registered ? 1 : currentStep} />

        {/* Right Form Panel */}
        <div className="flex flex-col justify-start px-6 sm:px-10 xl:px-14 py-10 overflow-y-auto relative"
          style={{ background: "rgba(10,14,26,0.5)", backdropFilter: "blur(2px)" }}>

          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }}>
                <Building2 size={16} className="text-white" />
              </div>
              <span className="text-white font-bold">Nexus<GradientText>ERP</GradientText></span>
            </div>

            <div className="hidden lg:block" />

            <button onClick={navigateToLogin}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-400 transition-colors font-medium">
              <LogIn size={15} /> Already registered? <span className="text-blue-400">Sign in</span>
            </button>
          </div>

          {registered ? (
            <SuccessScreen companyName={company.name || "Your Company"} onLogin={navigateToLogin} />
          ) : (
            <div className="max-w-lg w-full mx-auto">
              {/* Header */}
              <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }} className="mb-7">
                <h1 className="text-2xl xl:text-3xl font-bold text-white mb-2">
                  {currentStep === 0 ? "Register your company" : "Create master account"}
                </h1>
                <p className="text-slate-500 text-sm">
                  {currentStep === 0
                    ? <>Already have an account? <button onClick={navigateToLogin} className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 transition-colors">Sign in</button></>
                    : "Set up your organization's super-administrator credentials."
                  }
                </p>
              </motion.div>

              {/* Step Indicator */}
              <StepIndicator current={currentStep} steps={STEPS} />

              {/* Form */}
              <form onSubmit={currentStep === 0 ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit}>
                <AnimatePresence mode="wait">
                  {currentStep === 0
                    ? <StepCompanyDetails key="s1" data={company} onChange={updateCompany} errors={errors} />
                    : <StepMasterAccount key="s2" data={master} onChange={updateMaster} errors={errors} />
                  }
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex gap-3 mt-8">
                  {currentStep === 1 && (
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      type="button" onClick={handleBack}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20 text-white text-sm font-semibold transition-all duration-200">
                      <ChevronLeft size={16} /> Back
                    </motion.button>
                  )}

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    type="submit" disabled={submitting}
                    className="flex-1 relative flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white font-semibold text-sm overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }}>
                    {submitting ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Registering…</>
                    ) : currentStep === 0 ? (
                      <> Next: Create Admin Account <ChevronRight size={16} /></>
                    ) : (
                      <> Complete Registration <ArrowRight size={16} /></>
                    )}
                    <div className="absolute inset-0 bg-white/0 hover:bg-white/5 transition-all duration-200" />
                  </motion.button>
                </div>
              </form>

              {/* Login link bottom */}
              <p className="text-center text-xs text-slate-600 mt-6">
                Have an account?{" "}
                <button onClick={navigateToLogin} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Login to your portal →
                </button>
              </p>
            </div>
          )}

          {/* Footer */}
          <p className="mt-10 text-center text-xs text-slate-700">
            © 2025 NexusERP · <a href="#" className="hover:text-slate-500 transition-colors">Privacy</a> · <a href="#" className="hover:text-slate-500 transition-colors">Terms</a>
          </p>
        </div>
      </div>
    </div>
  );
}