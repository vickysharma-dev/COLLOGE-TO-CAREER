import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  Bot, 
  Briefcase, 
  GraduationCap, 
  Building2, 
  Calendar, 
  Clock, 
  Search, 
  Compass, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Zap, 
  ChevronRight, 
  RefreshCw, 
  Bell, 
  ExternalLink,
  Code2,
  Database,
  Layers,
  FileText,
  UserCheck,
  Check,
  X,
  Maximize2,
  Lock,
  Target
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function PosterMasterView({ 
  student, 
  collegeData, 
  opportunities, 
  applications, 
  onOpenPortal, 
  onOpenChat,
  onApplyJob
}) {
  const [activePortalTab, setActivePortalTab] = useState('all'); // 'all' (side-by-side as in poster) or specific
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(0);
  const [showApplyAlert, setShowApplyAlert] = useState(null);

  const topCandidates = [
    { name: "Rahul Sharma", match: "92%", score: 78, skills: ["Java", "Spring Boot", "SQL"], role: "Backend Developer" },
    { name: "Priya Singh", match: "88%", score: 84, skills: ["React", "Node.js", "TypeScript"], role: "Full Stack" },
    { name: "Amit Kumar", match: "85%", score: 81, skills: ["Python", "Django", "PostgreSQL"], role: "Python Dev" },
    { name: "Neha Gupta", match: "82%", score: 79, skills: ["Java", "Microservices", "Docker"], role: "Cloud Backend" }
  ];

  const handleQuickApply = (company, role) => {
    setShowApplyAlert(`Applied successfully to ${company} for ${role}!`);
    setTimeout(() => setShowApplyAlert(null), 3500);
  };

  return (
    <div className="w-full bg-[#f4f6fb] min-h-screen p-3 sm:p-6 lg:p-8 font-sans text-slate-800">
      
      {/* Toast Notification */}
      {showApplyAlert && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 className="h-4 w-4" />
          <span>{showApplyAlert}</span>
        </div>
      )}

      {/* Outer Poster Frame */}
      <div className="max-w-[1440px] mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-4 sm:p-8 lg:p-10 space-y-8">
        
        {/* ============================================================ */}
        {/* SECTION 1: POSTER HEADER & HERO BANNER                       */}
        {/* ============================================================ */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pb-6 border-b border-slate-100">
          
          {/* Logo & Title */}
          <div className="lg:col-span-4 space-y-2">
            <div className="flex items-center gap-3">
              {/* Blue Bridge Icon Logo */}
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19V9a8 8 0 0 1 16 0v10" />
                  <path d="M2 19h20" />
                  <path d="M9 19v-6a3 3 0 0 1 6 0v6" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1e293b]">
                  Career<span className="text-blue-600">Bridge</span>
                </h1>
                <p className="text-xs sm:text-sm font-bold text-slate-500">From Campus to Career, Smarter.</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm pt-1">
              A unified platform that connects <strong className="text-slate-900">Students</strong>, <strong className="text-slate-900">Colleges</strong> and <strong className="text-slate-900">Companies</strong> to make campus placement and hiring smarter, transparent and skill-based.
            </p>
          </div>

          {/* Center: Hero Illustration Banner ("Your Career Our Mission") */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 text-white p-6 shadow-md shadow-blue-500/20 text-center min-h-[160px] flex flex-col justify-between">
            {/* Background city silhouette glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/30 pointer-events-none" />
            
            {/* 3 Step Badges */}
            <div className="relative z-10 flex items-center justify-center gap-2 text-[11px] font-bold">
              <span className="px-3 py-1 rounded-lg bg-blue-500/40 border border-white/20 backdrop-blur-sm">Learn</span>
              <span className="text-white/60">→</span>
              <span className="px-3 py-1 rounded-lg bg-blue-500/40 border border-white/20 backdrop-blur-sm">Build Skills</span>
              <span className="text-white/60">→</span>
              <span className="px-3 py-1 rounded-lg bg-blue-500/40 border border-white/20 backdrop-blur-sm">Get Hired</span>
            </div>

            {/* Glowing Highway & Student Silhouette */}
            <div className="relative z-10 my-2">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white text-blue-900 font-extrabold text-xs shadow-lg shadow-black/20 tracking-wide uppercase">
                Your Career, Our Mission
              </div>
            </div>

            <p className="relative z-10 text-[11px] text-blue-100 font-medium">
              Skill Verification • AI Readiness • Automated Placement
            </p>
          </div>

          {/* Right: 3 Audience Pillars */}
          <div className="lg:col-span-3 space-y-2.5 text-xs">
            <div 
              onClick={() => onOpenPortal('student')}
              className="group cursor-pointer p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition flex items-center gap-3 bg-white"
            >
              <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-slate-900 text-xs flex items-center justify-between">
                  <span>For Students</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 transition" />
                </h4>
                <p className="text-[10px] text-slate-500 truncate">Get guidance, verify skills, find opportunities.</p>
              </div>
            </div>

            <div 
              onClick={() => onOpenPortal('college')}
              className="group cursor-pointer p-2.5 rounded-xl border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/40 transition flex items-center gap-3 bg-white"
            >
              <div className="h-9 w-9 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-slate-900 text-xs flex items-center justify-between">
                  <span>For Colleges</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-cyan-700 transition" />
                </h4>
                <p className="text-[10px] text-slate-500 truncate">Manage students, placement drives and track success.</p>
              </div>
            </div>

            <div 
              onClick={() => onOpenPortal('company')}
              className="group cursor-pointer p-2.5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 transition flex items-center gap-3 bg-white"
            >
              <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-slate-900 text-xs flex items-center justify-between">
                  <span>For Companies</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-700 transition" />
                </h4>
                <p className="text-[10px] text-slate-500 truncate">Find verified talent and hire smarter.</p>
              </div>
            </div>
          </div>

        </header>

        {/* ============================================================ */}
        {/* SECTION 2: THE PROBLEM, SOLUTION, HOW IT WORKS, TECH STACK   */}
        {/* ============================================================ */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 text-xs">
          
          {/* 1. The Problem */}
          <div className="lg:col-span-3 rounded-2xl border border-rose-200 bg-rose-50/20 p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="p-1 rounded-lg bg-rose-100 text-rose-600 font-bold">⚠️</span>
                <h3 className="font-bold text-sm text-slate-900">The Problem</h3>
              </div>
              <ul className="space-y-2 text-[11px] text-slate-600">
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold mt-0.5">!</span>
                  <span>Students don't know which jobs they are eligible for.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold mt-0.5">!</span>
                  <span>Lack of clarity on missing skills.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold mt-0.5">!</span>
                  <span>Certificates are not trusted blindly.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold mt-0.5">!</span>
                  <span>No feedback after rejection.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold mt-0.5">!</span>
                  <span>Colleges struggle to manage students & drives.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold mt-0.5">!</span>
                  <span>Companies find it hard to get the right talent.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 2. Our Solution */}
          <div className="lg:col-span-3 rounded-2xl border border-emerald-200 bg-emerald-50/20 p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="p-1 rounded-lg bg-emerald-100 text-emerald-700 font-bold">💡</span>
                <h3 className="font-bold text-sm text-slate-900">Our Solution</h3>
              </div>
              <ul className="space-y-2 text-[11px] text-slate-700">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>Unified platform for Students, Colleges & Companies.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>Skill verification (certificates + experience + assessment).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>AI-powered career analyzer & roadmap.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>Application tracking with feedback.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>Placement management for colleges.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>Verified, skill-based hiring for companies.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 3. How It Works Flowchart */}
          <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-4 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 mb-3">How It Works</h3>
              
              {/* Row 1 */}
              <div className="grid grid-cols-4 gap-1 text-center items-center">
                <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <Briefcase className="h-4 w-4 mx-auto text-blue-600 mb-1" />
                  <span className="text-[9px] font-semibold block leading-tight text-slate-700">Company creates hiring</span>
                </div>
                <div className="text-slate-400 font-bold text-center">→</div>
                <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <Building2 className="h-4 w-4 mx-auto text-indigo-600 mb-1" />
                  <span className="text-[9px] font-semibold block leading-tight text-slate-700">College approves</span>
                </div>
                <div className="text-slate-400 font-bold text-center">→</div>
              </div>

              <div className="grid grid-cols-4 gap-1 text-center items-center mt-2">
                <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs col-start-1">
                  <GraduationCap className="h-4 w-4 mx-auto text-emerald-600 mb-1" />
                  <span className="text-[9px] font-semibold block leading-tight text-slate-700">Students see opportunity</span>
                </div>
                <div className="text-slate-400 font-bold text-center">→</div>
                <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs col-start-3">
                  <Zap className="h-4 w-4 mx-auto text-amber-500 mb-1" />
                  <span className="text-[9px] font-semibold block leading-tight text-slate-700">Student applies</span>
                </div>
                <div className="text-slate-400 font-bold text-center">↓</div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-4 gap-1 text-center items-center mt-2">
                <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <Briefcase className="h-4 w-4 mx-auto text-teal-600 mb-1" />
                  <span className="text-[9px] font-semibold block leading-tight text-slate-700">Company receives app</span>
                </div>
                <div className="text-slate-400 font-bold text-center">→</div>
                <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <Bot className="h-4 w-4 mx-auto text-purple-600 mb-1" />
                  <span className="text-[9px] font-semibold block leading-tight text-slate-700">AI ranking & shortlist</span>
                </div>
                <div className="text-slate-400 font-bold text-center">→</div>
              </div>

              <div className="grid grid-cols-4 gap-1 text-center items-center mt-2">
                <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs col-start-1">
                  <Calendar className="h-4 w-4 mx-auto text-indigo-600 mb-1" />
                  <span className="text-[9px] font-semibold block leading-tight text-slate-700">Interview scheduled</span>
                </div>
                <div className="text-slate-400 font-bold text-center">→</div>
                <div className="p-1.5 rounded-lg bg-white border border-emerald-200 shadow-2xs col-start-3 bg-emerald-50">
                  <CheckCircle2 className="h-4 w-4 mx-auto text-emerald-600 mb-1" />
                  <span className="text-[9px] font-bold block leading-tight text-emerald-800">Selected / Feedback</span>
                </div>
              </div>

            </div>
          </div>

          {/* 4. Tech Stack */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 mb-3">Tech Stack</h3>
              <div className="space-y-2 text-[11px] font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 font-bold">⚛</span>
                  <span>React <span className="text-slate-400 text-[10px]">(Frontend)</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sky-500 font-bold">🌊</span>
                  <span>Tailwind CSS <span className="text-slate-400 text-[10px]">(Styling)</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">🟢</span>
                  <span>Node.js / Express</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-700 font-bold">🍃</span>
                  <span>MongoDB <span className="text-slate-400 text-[10px]">(Database)</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-600 font-bold">✨</span>
                  <span>Framer Motion</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">📊</span>
                  <span>Recharts <span className="text-slate-400 text-[10px]">(Analytics)</span></span>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* ============================================================ */}
        {/* ============================================================ */}
        {/* SECTION 3: THE THREE ANIMATED LOGIN PAGE POSTERS             */}
        {/* ============================================================ */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black tracking-wide uppercase flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                  Animated Portal Sign-In Gateways
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Interactive Preview
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                The 3 Unified Portal Login Gateways
              </h2>
              <p className="text-xs text-slate-500">
                High-fidelity, animated showcases of the Student, College, and Corporate Recruiter login experiences. Click any poster to launch that portal directly!
              </p>
            </div>
            
            {/* Quick Filter Switcher Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-bold shrink-0">
              <button
                onClick={() => setActivePortalTab('all')}
                className={`px-3 py-1.5 rounded-xl transition ${activePortalTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
              >
                All 3 Posters
              </button>
              <button
                onClick={() => setActivePortalTab('student')}
                className={`px-3 py-1.5 rounded-xl transition ${activePortalTab === 'student' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-blue-600'}`}
              >
                🎓 Student Login
              </button>
              <button
                onClick={() => setActivePortalTab('college')}
                className={`px-3 py-1.5 rounded-xl transition ${activePortalTab === 'college' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500 hover:text-indigo-600'}`}
              >
                🏛️ College Login
              </button>
              <button
                onClick={() => setActivePortalTab('company')}
                className={`px-3 py-1.5 rounded-xl transition ${activePortalTab === 'company' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-emerald-600'}`}
              >
                🏢 Company Login
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* -------------------------------------------------------- */}
            {/* POSTER 1: STUDENT LOGIN PAGE POSTER                      */}
            {/* -------------------------------------------------------- */}
            {(activePortalTab === 'all' || activePortalTab === 'student') && (
              <div 
                className="group relative rounded-3xl border border-blue-200/90 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Glowing Aura Accent */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-blue-500/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition duration-500" />
                <div className="absolute bottom-10 left-0 -ml-10 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Top Poster Header */}
                <div className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white p-4 sm:p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-sm ring-2 ring-white/30">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-sm">Student Portal</h3>
                        <span className="text-[9px] bg-emerald-400 text-slate-950 font-black px-2 py-0.2 rounded-full uppercase tracking-wider">
                          Verified Sign-In
                        </span>
                      </div>
                      <p className="text-[11px] text-blue-100">Enrollment & Placement Login Gateway</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onOpenPortal('student')}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
                    title="Launch Fullscreen"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Main Animated Login Mockup Card */}
                <div className="relative z-10 p-5 space-y-4">
                  
                  {/* Floating Live Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200/80 shadow-2xs animate-pulse">
                      <Sparkles className="h-3 w-3 text-blue-600" />
                      AI Readiness: 78/100
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      College Verified
                    </span>
                  </div>

                  {/* Glassmorphic Login Form Simulation */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-4 shadow-sm space-y-3">
                    <div className="text-center pb-2 border-b border-slate-100">
                      <div className="h-8 w-8 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-1.5 shadow-md shadow-blue-500/30">
                        <GraduationCap className="h-4 w-4" />
                      </div>
                      <h4 className="font-black text-xs text-slate-900">Sign In to Student Dashboard</h4>
                      <p className="text-[10px] text-slate-500">Access verified drives, skills & AI roadmaps</p>
                    </div>

                    {/* Simulated Input 1: Enrollment Number */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-700 flex justify-between">
                        <span>Enrollment / Roll Number</span>
                        <span className="text-blue-600 font-bold">Verified</span>
                      </label>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-blue-300 ring-2 ring-blue-500/10 text-xs font-bold text-slate-900">
                        <UserCheck className="h-3.5 w-3.5 text-blue-600" />
                        <span className="flex-1 font-mono tracking-wide">EN2022CS089</span>
                        <span className="h-3.5 w-0.5 bg-blue-600 animate-pulse" />
                      </div>
                    </div>

                    {/* Simulated Input 2: College Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-700">College / Institution</label>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                        <Building2 className="h-3.5 w-3.5 text-slate-400" />
                        <span className="truncate text-[11px]">Apex Institute of Technology</span>
                      </div>
                    </div>

                    {/* Simulated Input 3: Academic Year */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-700">Academic Year</label>
                      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                        <span className="text-[11px]">2022-2026 (4th Year / Final Year)</span>
                        <span className="text-[9px] bg-slate-200 text-slate-600 font-bold px-1.5 py-0.2 rounded">B.Tech</span>
                      </div>
                    </div>

                    {/* Simulated ID Card Verified Proof */}
                    <div className="p-2 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-emerald-600" />
                        <div>
                          <p className="text-[10px] font-extrabold text-slate-900">College ID Card</p>
                          <p className="text-[9px] text-slate-500">Document approved by TPO</p>
                        </div>
                      </div>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded-full">
                        ✓ Verified
                      </span>
                    </div>

                    {/* Simulated Animated Sign-In Button */}
                    <button
                      onClick={() => onOpenPortal('student')}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/25 transition duration-200 flex items-center justify-center gap-1.5 group-hover:scale-[1.02]"
                    >
                      <span>Sign In to Student Dashboard</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
                    </button>
                  </div>

                  {/* Key Feature Pills */}
                  <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold text-slate-600 pt-1">
                    <div className="p-2 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-blue-600" />
                      <span>Skill Verification</span>
                    </div>
                    <div className="p-2 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-center gap-1.5">
                      <Compass className="h-3.5 w-3.5 text-indigo-600" />
                      <span>AI Career Roadmap</span>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Approved Drives</span>
                    </div>
                    <div className="p-2 rounded-xl bg-purple-50/60 border border-purple-100 flex items-center gap-1.5">
                      <Bot className="h-3.5 w-3.5 text-purple-600" />
                      <span>AI Assistant</span>
                    </div>
                  </div>

                </div>

                {/* Bottom Action Footer */}
                <div className="relative z-10 p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[10px] text-slate-500">
                    Demo Roll: <strong className="text-slate-800">EN2022CS089</strong>
                  </div>
                  <button
                    onClick={() => onOpenPortal('student')}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-sm transition flex items-center gap-1.5"
                  >
                    <span>Launch Student Portal</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* POSTER 2: COLLEGE / TPO LOGIN PAGE POSTER                */}
            {/* -------------------------------------------------------- */}
            {(activePortalTab === 'all' || activePortalTab === 'college') && (
              <div 
                className="group relative rounded-3xl border border-indigo-200/90 bg-gradient-to-b from-white via-indigo-50/30 to-white overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-indigo-500/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Glowing Aura Accent */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition duration-500" />
                <div className="absolute bottom-10 left-0 -ml-10 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Top Poster Header */}
                <div className="relative z-10 bg-gradient-to-r from-indigo-700 via-purple-700 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-sm ring-2 ring-white/30">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-sm">College Portal</h3>
                        <span className="text-[9px] bg-purple-400 text-slate-950 font-black px-2 py-0.2 rounded-full uppercase tracking-wider">
                          TPO & Admin ERP
                        </span>
                      </div>
                      <p className="text-[11px] text-indigo-100">Institutional Placement Suite Login</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onOpenPortal('college')}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
                    title="Launch Fullscreen"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Main Animated Login Mockup Card */}
                <div className="relative z-10 p-5 space-y-4">
                  
                  {/* Floating Live Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200/80 shadow-2xs animate-pulse">
                      <TrendingUp className="h-3 w-3 text-indigo-600" />
                      86% Placement Rate
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs">
                      <UserCheck className="h-3 w-3 text-purple-600" />
                      1,240 Students Enrolled
                    </span>
                  </div>

                  {/* Glassmorphic Login Form Simulation */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-4 shadow-sm space-y-3">
                    <div className="text-center pb-2 border-b border-slate-100">
                      <div className="h-8 w-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center mx-auto mb-1.5 shadow-md shadow-indigo-500/30">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <h4 className="font-black text-xs text-slate-900">Institutional Officer Sign-In</h4>
                      <p className="text-[10px] text-slate-500">Placement Cell & TPO Coordinator Access</p>
                    </div>

                    {/* Simulated Input 1: AISHE / Institutional Code */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-700 flex justify-between">
                        <span>Institution / AISHE Code</span>
                        <span className="text-indigo-600 font-bold">AICTE Approved</span>
                      </label>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-indigo-300 ring-2 ring-indigo-500/10 text-xs font-bold text-slate-900">
                        <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
                        <span className="flex-1 font-mono tracking-wide">C-49210</span>
                        <span className="h-3.5 w-0.5 bg-indigo-600 animate-pulse" />
                      </div>
                    </div>

                    {/* Simulated Input 2: Official TPO Email */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-700">Official TPO Email</label>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                        <Lock className="h-3.5 w-3.5 text-slate-400" />
                        <span className="truncate text-[11px]">tpo.officer@apex.edu.in</span>
                      </div>
                    </div>

                    {/* Simulated Input 3: Placement Cell Role */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-700">Administrative Role</label>
                      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                        <span className="text-[11px]">Director of Training & Placement</span>
                        <span className="text-[9px] bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.2 rounded">Admin Level</span>
                      </div>
                    </div>

                    {/* Simulated Security Clearance Box */}
                    <div className="p-2 rounded-xl bg-indigo-50/80 border border-indigo-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-indigo-600" />
                        <div>
                          <p className="text-[10px] font-extrabold text-slate-900">Institutional Clearance</p>
                          <p className="text-[9px] text-slate-500">2FA Verified Domain Security</p>
                        </div>
                      </div>
                      <span className="text-[9px] bg-indigo-100 text-indigo-800 font-black px-2 py-0.5 rounded-full">
                        ✓ Authorized
                      </span>
                    </div>

                    {/* Simulated Animated Sign-In Button */}
                    <button
                      onClick={() => onOpenPortal('college')}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs shadow-md shadow-indigo-500/25 transition duration-200 flex items-center justify-center gap-1.5 group-hover:scale-[1.02]"
                    >
                      <span>Access Placement ERP Suite</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
                    </button>
                  </div>

                  {/* Key Feature Pills */}
                  <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold text-slate-600 pt-1">
                    <div className="p-2 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-center gap-1.5">
                      <UserCheck className="h-3.5 w-3.5 text-indigo-600" />
                      <span>Student Verification</span>
                    </div>
                    <div className="p-2 rounded-xl bg-purple-50/60 border border-purple-100 flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-purple-600" />
                      <span>Company Requests</span>
                    </div>
                    <div className="p-2 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                      <span>Auto Eligibility</span>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Placement Trends</span>
                    </div>
                  </div>

                </div>

                {/* Bottom Action Footer */}
                <div className="relative z-10 p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[10px] text-slate-500">
                    Demo TPO: <strong className="text-slate-800">tpo.officer@apex.edu.in</strong>
                  </div>
                  <button
                    onClick={() => onOpenPortal('college')}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-sm transition flex items-center gap-1.5"
                  >
                    <span>Launch College Portal</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* POSTER 3: COMPANY / RECRUITER LOGIN PAGE POSTER          */}
            {/* -------------------------------------------------------- */}
            {(activePortalTab === 'all' || activePortalTab === 'company') && (
              <div 
                className="group relative rounded-3xl border border-emerald-200/90 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-500/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Glowing Aura Accent */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition duration-500" />
                <div className="absolute bottom-10 left-0 -ml-10 w-36 h-36 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Top Poster Header */}
                <div className="relative z-10 bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-sm ring-2 ring-white/30">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-sm">Company Portal</h3>
                        <span className="text-[9px] bg-teal-300 text-slate-950 font-black px-2 py-0.2 rounded-full uppercase tracking-wider">
                          Corporate ATS
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-100">Enterprise Recruiter Suite Sign-In</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onOpenPortal('company')}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
                    title="Launch Fullscreen"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Main Animated Login Mockup Card */}
                <div className="relative z-10 p-5 space-y-4">
                  
                  {/* Floating Live Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200/80 shadow-2xs animate-pulse">
                      <Target className="h-3 w-3 text-emerald-600" />
                      95% Skill Match ATS
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 shadow-2xs">
                      <CheckCircle2 className="h-3 w-3 text-teal-600" />
                      1,080 Verified Candidates
                    </span>
                  </div>

                  {/* Glassmorphic Login Form Simulation */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-4 shadow-sm space-y-3">
                    <div className="text-center pb-2 border-b border-slate-100">
                      <div className="h-8 w-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-1.5 shadow-md shadow-emerald-500/30">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <h4 className="font-black text-xs text-slate-900">Corporate Hiring Portal Sign-In</h4>
                      <p className="text-[10px] text-slate-500">Access student dossiers, CGPA & verified resumes</p>
                    </div>

                    {/* Simulated Input 1: Corporate Work Email */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-700 flex justify-between">
                        <span>Corporate Work Email</span>
                        <span className="text-emerald-600 font-bold">Enterprise SSO</span>
                      </label>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-emerald-300 ring-2 ring-emerald-500/10 text-xs font-bold text-slate-900">
                        <Lock className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="flex-1 font-mono tracking-wide truncate">talent.campus@accenture.com</span>
                        <span className="h-3.5 w-0.5 bg-emerald-600 animate-pulse" />
                      </div>
                    </div>

                    {/* Simulated Input 2: Company Domain */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-700">Company / Enterprise</label>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                        <Building2 className="h-3.5 w-3.5 text-slate-400" />
                        <span className="truncate text-[11px]">Accenture Global Services</span>
                      </div>
                    </div>

                    {/* Simulated Input 3: Recruitment Scope */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-700">Hiring Scope</label>
                      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                        <span className="text-[11px]">Campus Placement Drives & Off-Campus</span>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">Active Partner</span>
                      </div>
                    </div>

                    {/* Simulated ATS Clearance Box */}
                    <div className="p-2 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                        <div>
                          <p className="text-[10px] font-extrabold text-slate-900">Recruiter Clearance</p>
                          <p className="text-[9px] text-slate-500">Verified AICTE Corporate License</p>
                        </div>
                      </div>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded-full">
                        ✓ Verified
                      </span>
                    </div>

                    {/* Simulated Animated Sign-In Button */}
                    <button
                      onClick={() => onOpenPortal('company')}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-md shadow-emerald-500/25 transition duration-200 flex items-center justify-center gap-1.5 group-hover:scale-[1.02]"
                    >
                      <span>Enter Corporate Talent ATS</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
                    </button>
                  </div>

                  {/* Key Feature Pills */}
                  <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold text-slate-600 pt-1">
                    <div className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-1.5">
                      <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Candidate Dossiers</span>
                    </div>
                    <div className="p-2 rounded-xl bg-teal-50/60 border border-teal-100 flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-teal-600" />
                      <span>ATS Resume Viewer</span>
                    </div>
                    <div className="p-2 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-indigo-600" />
                      <span>Proctored Skills</span>
                    </div>
                    <div className="p-2 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-blue-600" />
                      <span>Interview Pipeline</span>
                    </div>
                  </div>

                </div>

                {/* Bottom Action Footer */}
                <div className="relative z-10 p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[10px] text-slate-500">
                    Demo HR: <strong className="text-slate-800">talent.campus@accenture.com</strong>
                  </div>
                  <button
                    onClick={() => onOpenPortal('company')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm transition flex items-center gap-1.5"
                  >
                    <span>Launch Company Portal</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            )}

          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 4: KEY FEATURES & COMPLETE ECOSYSTEM                 */}
        {/* ============================================================ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-200 text-xs">
          
          {/* Key Features (5 Items) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <h3 className="font-black text-sm text-slate-900 uppercase tracking-wide">Key Features</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
              
              <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-1.5 text-blue-600 font-bold mb-1">
                  <span>🎯</span>
                  <span>AI Career Analyzer</span>
                </div>
                <p className="text-[10px] text-slate-500">Know your strengths & gaps</p>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-1.5 text-indigo-600 font-bold mb-1">
                  <span>🗺️</span>
                  <span>Career Roadmap</span>
                </div>
                <p className="text-[10px] text-slate-500">Personalized learning path</p>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-1.5 text-purple-600 font-bold mb-1">
                  <span>💬</span>
                  <span>Application Feedback</span>
                </div>
                <p className="text-[10px] text-slate-500">Understand & improve</p>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-1.5 text-emerald-600 font-bold mb-1">
                  <span>🛡️</span>
                  <span>Skill Verification</span>
                </div>
                <p className="text-[10px] text-slate-500">Certificates + Experience + Assessment</p>
              </div>

              <div 
                onClick={onOpenChat}
                className="p-2.5 rounded-xl border border-blue-300 bg-blue-50/60 cursor-pointer hover:bg-blue-100/60 transition"
              >
                <div className="flex items-center gap-1.5 text-blue-700 font-bold mb-1">
                  <Bot className="h-3.5 w-3.5" />
                  <span>AI Assistant</span>
                </div>
                <p className="text-[10px] text-blue-600 font-medium">Your personal career coach (Click to Chat)</p>
              </div>

            </div>
          </div>

          {/* Complete Ecosystem (Student -> College -> Company -> AI) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-purple-600" />
              <h3 className="font-black text-sm text-slate-900 uppercase tracking-wide">Complete Ecosystem</h3>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-100 flex items-center justify-between text-center text-[10px]">
              
              <div>
                <div className="h-10 w-10 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center mb-1 shadow-sm">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <strong className="block text-slate-900 text-xs">Student</strong>
                <span className="text-slate-500">(Seeks Growth)</span>
              </div>

              <span className="text-slate-400 font-bold text-sm">→</span>

              <div>
                <div className="h-10 w-10 mx-auto rounded-full bg-indigo-600 text-white flex items-center justify-center mb-1 shadow-sm">
                  <Building2 className="h-5 w-5" />
                </div>
                <strong className="block text-slate-900 text-xs">College</strong>
                <span className="text-slate-500">(Provides Support)</span>
              </div>

              <span className="text-slate-400 font-bold text-sm">→</span>

              <div>
                <div className="h-10 w-10 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center mb-1 shadow-sm">
                  <Briefcase className="h-5 w-5" />
                </div>
                <strong className="block text-slate-900 text-xs">Company</strong>
                <span className="text-slate-500">(Finds Talent)</span>
              </div>

              <span className="text-slate-400 font-bold text-sm">→</span>

              <div>
                <div className="h-10 w-10 mx-auto rounded-full bg-purple-600 text-white flex items-center justify-center mb-1 shadow-sm">
                  <Bot className="h-5 w-5" />
                </div>
                <strong className="block text-slate-900 text-xs">AI</strong>
                <span className="text-slate-500">(Connects Everyone)</span>
              </div>

            </div>
          </div>

        </section>

        {/* ============================================================ */}
        {/* SECTION 5: BOTTOM BRAND BANNER                               */}
        {/* ============================================================ */}
        <footer className="rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-blue-900/20">
          
          <div className="flex items-center gap-3 text-left">
            <div className="h-9 w-9 rounded-xl bg-white/15 flex items-center justify-center text-white border border-white/20">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <div className="font-black text-base tracking-tight leading-tight">CareerBridge</div>
              <p className="text-[11px] text-blue-100">
                Because every student deserves the right opportunity, and every company deserves the right talent.
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="font-serif italic text-lg sm:text-xl font-bold text-sky-200 tracking-wide block">
              Build Your Future ✨
            </span>
          </div>

        </footer>

      </div>
    </div>
  );
}
