import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  User, 
  Award, 
  Building2, 
  Globe, 
  Briefcase, 
  Sparkles, 
  Map, 
  Bot, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  Bookmark, 
  BookmarkCheck, 
  ArrowRight, 
  ExternalLink, 
  Upload, 
  FileText, 
  ChevronRight, 
  Search, 
  Filter, 
  Star, 
  TrendingUp, 
  Check, 
  X, 
  Info, 
  ShieldCheck, 
  Lock, 
  GraduationCap, 
  LogOut, 
  Bell, 
  Send,
  Zap,
  Target,
  PlayCircle,
  Tv,
  Compass,
  BookOpen,
  Code2,
  Terminal,
  CheckSquare,
  Layers,
  FolderGit2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  popularJobRoles, 
  predefinedRoadmaps, 
  getRoadmapForRole, 
  generateCustomRoadmap 
} from '../../data/careerRoadmapsData';

export default function StudentPortal({ 
  student, 
  opportunities, 
  applications, 
  onApply, 
  onToggleRoadmap, 
  onToggleSaveJob,
  onUpdateProfile,
  onRequestSkillVerify,
  onSendChatQuery
}) {
  // Navigation tabs matching requested Student Flow
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    enrollmentNo: 'EN2022CS089',
    collegeName: 'Apex Institute of Technology & Engineering',
    academicYear: '2022-2026 (4th Year)',
    idCardUploaded: true
  });

  // Local state for interactive features
  const [savedJobs, setSavedJobs] = useState(student.savedJobs || []);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [internshipTypeFilter, setInternshipTypeFilter] = useState('all'); // all | paid | unpaid
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Career Roadmap Interactive State & Dynamic Roles
  const [targetJobRole, setTargetJobRole] = useState(student.targetRole || "Java Backend Developer");
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [customRoleInput, setCustomRoleInput] = useState('');
  const [activeRoadmapResourceFilter, setActiveRoadmapResourceFilter] = useState('all'); // 'all' | 'free' | 'paid' | 'projects'
  const [currentRoadmap, setCurrentRoadmap] = useState(() => getRoadmapForRole(student.targetRole || "Java Backend Developer"));
  const [expandedStages, setExpandedStages] = useState({ 1: true, 2: true, 3: true, 4: true, 5: true, 6: true });

  const handleSelectTargetRole = (roleTitle) => {
    const newRoadmap = getRoadmapForRole(roleTitle);
    setTargetJobRole(roleTitle);
    setCurrentRoadmap(newRoadmap);
    setIsRoleModalOpen(false);
    if (onUpdateProfile) {
      onUpdateProfile({ targetRole: roleTitle });
    }
    confetti({ particleCount: 70, spread: 60 });
    triggerToast(`Target Job updated to "${roleTitle}"! Custom AI Roadmap generated.`);
  };

  const handleCustomRoleSubmit = (e) => {
    e.preventDefault();
    if (!customRoleInput.trim()) return;
    const customRoleName = customRoleInput.trim();
    const newRoadmap = generateCustomRoadmap(customRoleName);
    setTargetJobRole(customRoleName);
    setCurrentRoadmap(newRoadmap);
    setIsRoleModalOpen(false);
    setCustomRoleInput('');
    if (onUpdateProfile) {
      onUpdateProfile({ targetRole: customRoleName });
    }
    confetti({ particleCount: 80, spread: 70 });
    triggerToast(`AI Roadmap generated for "${customRoleName}" with curated learning resources!`);
  };

  const handleToggleStageStatus = (stageId) => {
    setCurrentRoadmap(prev => {
      const updatedStages = prev.stages.map(stage => {
        if (stage.id === stageId) {
          if (stage.status === 'completed') {
            return { ...stage, status: 'pending', progress: 0 };
          } else if (stage.status === 'in_progress') {
            return { ...stage, status: 'completed', progress: 100 };
          } else {
            return { ...stage, status: 'in_progress', progress: 50 };
          }
        }
        return stage;
      });
      return { ...prev, stages: updatedStages };
    });
    triggerToast("Stage progress updated!");
  };

  const toggleStageExpand = (stageId) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  // Skill verification modal
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verifyForm, setVerifyForm] = useState({
    skillName: 'AWS / Cloud',
    evidenceType: 'Certificate PDF',
    evidenceText: 'AWS Certified Cloud Practitioner - Scored 860/1000'
  });

  // AI Chat state
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${student.name.split(' ')[0]}! Main aapka **CareerBridge AI Assistant** hoon. \n\nAap mujhse DSA prep, resume tips, college placement eligibility, ya matching internships ke baare me pooch sakte hain!`,
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Quick show toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveToggle = async (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      triggerToast("Job removed from saved items");
    } else {
      setSavedJobs([...savedJobs, jobId]);
      triggerToast("Job bookmarked to Saved Jobs!");
    }
    if (onToggleSaveJob) onToggleSaveJob(jobId);
  };

  const handleApplyJob = async (job) => {
    try {
      await onApply(student.id, job.id);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.65 } });
      triggerToast(`Application submitted to ${job.company} for ${job.title}!`);
    } catch (err) {
      alert("Application status: Already submitted or in review.");
    }
  };

  const handleSkillVerificationSubmit = async (e) => {
    e.preventDefault();
    if (!verifyForm.skillName) return;
    await onRequestSkillVerify(verifyForm.skillName, verifyForm.evidenceText);
    setIsVerifyModalOpen(false);
    confetti({ particleCount: 60, spread: 50 });
    triggerToast(`Skill "${verifyForm.skillName}" verified successfully via assessment evidence!`);
  };

  const handleSendChat = async (presetText) => {
    const textToSend = presetText || chatInput;
    if (!textToSend.trim() || chatLoading) return;

    const userMsg = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setChatLoading(true);

    try {
      const res = await onSendChatQuery(textToSend, student);
      const aiMsg = {
        sender: 'ai',
        text: res.reply,
        time: res.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      setChatMessages(prev => [
        ...prev, 
        { sender: 'ai', text: "I'm analyzing your profile. Please ask another question!", time: 'Now' }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // -------------------------------------------------------------
  // 1. STUDENT LOGIN SCREEN (If logged out)
  // -------------------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-8 space-y-6 animate-scale-in">
          
          <div className="text-center space-y-2">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 mx-auto flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Student Portal Login</h2>
            <p className="text-xs text-slate-500">Access your verified profile, placement drives & AI readiness score</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Enrollment / University Roll Number</label>
              <input 
                type="text" 
                value={loginForm.enrollmentNo}
                onChange={(e) => setLoginForm({ ...loginForm, enrollmentNo: e.target.value })}
                placeholder="e.g. EN2022CS089"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">College Name</label>
              <input 
                type="text" 
                value={loginForm.collegeName}
                onChange={(e) => setLoginForm({ ...loginForm, collegeName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Academic Year</label>
              <select 
                value={loginForm.academicYear}
                onChange={(e) => setLoginForm({ ...loginForm, academicYear: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
              >
                <option value="2022-2026 (4th Year)">2022-2026 (4th Year / Final Year)</option>
                <option value="2023-2027 (3rd Year)">2023-2027 (3rd Year)</option>
                <option value="2024-2028 (2nd Year)">2024-2028 (2nd Year)</option>
              </select>
            </div>

            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-bold text-slate-900 text-[11px]">College ID Card Verification</p>
                  <p className="text-[10px] text-slate-500">Document verified by TPO</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                ✓ Verified
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-500/30 transition duration-200"
            >
              Sign In to Student Dashboard →
            </button>
          </form>

          <div className="text-center text-[11px] text-slate-400">
            CareerBridge • Powered by Skill Verification Engine
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN STUDENT PORTAL INTERFACE
  // -------------------------------------------------------------
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'skills', label: 'Skill Verification', icon: Award, count: student.verifiedSkillsCount },
    { id: 'college_placements', label: 'College Placements', icon: Building2, badge: 'Approved' },
    { id: 'off_campus', label: 'Off-Campus Jobs', icon: Globe },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'analyzer', label: 'AI Career Analyzer', icon: Sparkles, highlight: true },
    { id: 'roadmap', label: 'Career Roadmap', icon: Map },
    { id: 'ai_assistant', label: 'AI Assistant', icon: Bot },
    { id: 'applications', label: 'Application Feedback', icon: MessageSquare, count: applications.length }
  ];

  // Opportunities subsets
  const collegeApprovedJobs = opportunities.filter(j => j.isCollegeApproved || j.category === 'College Placement');
  const offCampusJobs = opportunities.filter(j => j.category === 'Off-Campus');
  const internshipJobs = opportunities.filter(j => j.category === 'Internship');
  const savedOpportunities = opportunities.filter(j => savedJobs.includes(j.id));

  return (
    <div className="space-y-6">

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce border border-slate-700">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <img 
            src={student.avatar} 
            alt={student.name}
            className="h-12 w-12 rounded-xl object-cover ring-2 ring-blue-500/30 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-slate-900">{student.name}</h2>
              <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
                {student.enrollmentNo}
              </span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-200">
                <CheckCircle2 className="h-3 w-3" /> College Verified
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {student.degree} • {student.college} • CGPA: <strong className="text-slate-800">{student.cgpa}</strong>
            </p>
          </div>
        </div>

        {/* Action icons & Logout */}
        <div className="flex items-center gap-2">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600" />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 text-xs space-y-2">
                <div className="font-bold text-slate-900 pb-1 border-b border-slate-100 flex justify-between">
                  <span>Notifications</span>
                  <span className="text-blue-600 cursor-pointer text-[10px]">Mark all read</span>
                </div>
                {student.notifications.map(n => (
                  <div key={n.id} className="p-2 bg-slate-50 rounded-lg">
                    <p className="font-semibold text-slate-800 text-[11px]">{n.title}</p>
                    <span className="text-[9px] text-slate-400">{n.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => setActiveTab('profile')}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
          >
            <User className="h-3.5 w-3.5" />
            <span>Edit Profile</span>
          </button>

          <button 
            onClick={() => setIsLoggedIn(false)}
            className="p-2 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

      </div>

      {/* Main App Grid with Modern Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 sticky top-20 space-y-1">
            <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 px-3 py-1">Student Portal</p>
            
            {navigationItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25' 
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : item.highlight ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Quick AI Help card */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div 
                onClick={() => setActiveTab('ai_assistant')}
                className="p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 cursor-pointer hover:shadow-xs transition"
              >
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs mb-1">
                  <Bot className="h-4 w-4" />
                  <span>AI Career Coach</span>
                </div>
                <p className="text-[10px] text-slate-600 leading-tight">
                  Instant guidance for interview rounds, resume scan & skill gaps.
                </p>
              </div>
            </div>

          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-9 space-y-6">

          {/* ============================================================ */}
          {/* TAB 1: DASHBOARD                                             */}
          {/* ============================================================ */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Hero Readiness & Greeting Card */}
              <div className="bg-gradient-to-br from-white to-blue-50/40 rounded-3xl border border-slate-200 p-6 shadow-sm">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100/80 text-blue-800 text-[11px] font-bold">
                      <Sparkles className="h-3 w-3 text-blue-600" />
                      <span>Placement Season 2026</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      Welcome back, {student.name.split(' ')[0]} 👋
                    </h2>
                    <p className="text-xs text-slate-500 max-w-lg leading-relaxed">
                      Targeting <strong className="text-slate-800">{student.targetRole}</strong>. Your verified skills & certifications prioritize your profile in company shortlists.
                    </p>
                  </div>

                  {/* Circular Readiness Score Gauge */}
                  <div className="flex items-center gap-4 bg-white p-3.5 rounded-2xl border border-blue-100 shadow-sm">
                    <div className="relative flex items-center justify-center shrink-0">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle cx="40" cy="40" r="32" stroke="#e2e8f0" strokeWidth="6" fill="transparent" />
                        <circle 
                          cx="40" 
                          cy="40" 
                          r="32" 
                          stroke="#2563eb" 
                          strokeWidth="6" 
                          strokeDasharray={2 * Math.PI * 32}
                          strokeDashoffset={2 * Math.PI * 32 * (1 - student.aiReadinessScore / 100)}
                          strokeLinecap="round" 
                          fill="transparent" 
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute text-center leading-none">
                        <span className="text-xl font-black text-slate-900 block">{student.aiReadinessScore}</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase">/ 100</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">AI Career Readiness</span>
                      <span className="inline-block mt-0.5 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Good Progress
                      </span>
                      <p className="text-[10px] text-slate-500 mt-1 max-w-[130px]">Top 10% in CSE batch</p>
                    </div>
                  </div>

                </div>

                {/* 4 Stat KPI Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
                  <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Profile Completion</p>
                    <p className="text-lg font-black text-slate-900 mt-0.5">{student.profileCompletion}%</p>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${student.profileCompletion}%` }} />
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Verified Skills</p>
                    <p className="text-lg font-black text-emerald-600 mt-0.5">{student.verifiedSkillsCount} Skills</p>
                    <span className="text-[10px] text-slate-500 font-medium">Java, Spring Boot, SQL</span>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Active Applications</p>
                    <p className="text-lg font-black text-blue-600 mt-0.5">{applications.length} Drives</p>
                    <span className="text-[10px] text-slate-500 font-medium">2 Interview rounds</span>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Saved Opportunities</p>
                    <p className="text-lg font-black text-purple-600 mt-0.5">{savedJobs.length} Saved</p>
                    <span className="text-[10px] text-slate-500 font-medium">TCS, Wipro, Accenture</span>
                  </div>
                </div>

              </div>

              {/* Recommended Opportunities Carousel / Grid */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Recommended Opportunities</h3>
                    <p className="text-xs text-slate-500">Filtered for your branch and verified skill compatibility</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('college_placements')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    View All Opportunities ({opportunities.length}) <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {opportunities.slice(0, 4).map(job => (
                    <div 
                      key={job.id}
                      className="border border-slate-200 rounded-2xl p-4 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between bg-white"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img src={job.companyLogo} alt={job.company} className="h-10 w-10 rounded-xl object-cover border border-slate-100 bg-slate-50 p-1" />
                            <div>
                              <h4 className="font-bold text-sm text-slate-900">{job.title}</h4>
                              <p className="text-xs text-slate-500">{job.company} • {job.location}</p>
                            </div>
                          </div>
                          <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                            {job.matchScore}% Match
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-xs font-bold">
                          <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg">{job.salary}</span>
                          <span className="text-slate-400 font-medium text-[11px]">{job.category}</span>
                        </div>

                        {/* Skill indicators */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {job.requiredSkills.map(skill => {
                            const isVerified = student.skills.some(s => s.name.toLowerCase().includes(skill.toLowerCase()) && s.status === 'verified');
                            return (
                              <span 
                                key={skill}
                                className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                                  isVerified ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {isVerified ? '✓' : '○'} {skill}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <button 
                          onClick={() => handleSaveToggle(job.id)}
                          className={`p-1.5 rounded-lg border transition ${
                            savedJobs.includes(job.id) ? 'bg-purple-50 text-purple-600 border-purple-200' : 'border-slate-200 text-slate-400 hover:text-slate-700'
                          }`}
                          title="Save Job"
                        >
                          <Bookmark className={`h-4 w-4 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                        </button>

                        <button 
                          onClick={() => handleApplyJob(job)}
                          className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Saved Jobs Quick Shelf (if any saved) */}
              {savedOpportunities.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <BookmarkCheck className="h-4 w-4 text-purple-600" />
                    <h3 className="text-sm font-black text-slate-900">Bookmarked / Saved Jobs ({savedOpportunities.length})</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {savedOpportunities.map(job => (
                      <div key={job.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs">
                        <div>
                          <h5 className="font-bold text-slate-900">{job.title}</h5>
                          <p className="text-slate-500">{job.company} • {job.salary}</p>
                        </div>
                        <button 
                          onClick={() => handleApplyJob(job)}
                          className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold text-[11px]"
                        >
                          Apply
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: PROFILE                                               */}
          {/* ============================================================ */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fade-in">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Student Profile & Credentials</h3>
                  <p className="text-xs text-slate-500">Keep your details up-to-date for automatic eligibility matching</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Profile Completion:</span>
                  <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                    {student.profileCompletion}% Complete
                  </span>
                </div>
              </div>

              {/* Personal Information & Education */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                
                {/* Personal Info Card */}
                <div className="space-y-3 p-4 rounded-2xl border border-slate-200 bg-slate-50/40">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    <span>Personal Information</span>
                  </h4>
                  <div className="space-y-2 text-slate-600">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Full Name</span>
                      <strong className="text-slate-900">{student.name}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Enrollment No</span>
                      <strong className="text-slate-900">{student.enrollmentNo}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Official Email</span>
                      <strong className="text-slate-900">{student.email}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Contact Number</span>
                      <strong className="text-slate-900">{student.phone}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Target Role</span>
                      <strong className="text-blue-600">{student.targetRole}</strong>
                    </div>
                  </div>
                </div>

                {/* Academic & Education Card */}
                <div className="space-y-3 p-4 rounded-2xl border border-slate-200 bg-slate-50/40">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-indigo-600" />
                    <span>Academic Records</span>
                  </h4>
                  <div className="space-y-2 text-slate-600">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">College</span>
                      <strong className="text-slate-900 text-right">{student.college}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Branch</span>
                      <strong className="text-slate-900">{student.branch}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Batch / Year</span>
                      <strong className="text-slate-900">{student.year}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Cumulative CGPA</span>
                      <strong className="text-emerald-600 font-bold">{student.cgpa} / 10.0</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Active Backlogs</span>
                      <strong className="text-emerald-700 font-bold">0 Active</strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* Resume Section */}
              <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{student.resume.fileName}</h4>
                    <p className="text-[11px] text-slate-500">Updated {student.resume.lastUpdated} • {student.resume.fileSize}</p>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full">
                      ATS Compatibility Score: {student.resume.atsScore}%
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => alert("Resume Viewer: Download or view parsed ATS keywords.")}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold shadow-2xs"
                >
                  View / Replace Resume
                </button>
              </div>

              {/* Projects & Internships */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-slate-900">Featured Projects & Internships</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {student.projects.map(proj => (
                    <div key={proj.id} className="p-4 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-slate-900">{proj.title}</h5>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full">✓ Verified</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">{proj.desc}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {proj.tech.map(t => (
                          <span key={t} className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bold">{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Internship Experience */}
                {student.internships.map(int => (
                  <div key={int.id} className="p-4 rounded-2xl border border-purple-200 bg-purple-50/20 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-slate-900">{int.role} @ {int.company}</h5>
                        <p className="text-[11px] text-slate-500">{int.duration} • {int.location}</p>
                      </div>
                      <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
                        Stipend: {int.stipend}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{int.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 3: SKILL VERIFICATION                                    */}
          {/* ============================================================ */}
          {activeTab === 'skills' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fade-in">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Skill Verification Engine</h3>
                  <p className="text-xs text-slate-500">Skills are backed by certificates, coding evidence, and proctored assessments</p>
                </div>
                <button
                  onClick={() => setIsVerifyModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                >
                  <Award className="h-4 w-4" />
                  <span>+ Verify New Skill</span>
                </button>
              </div>

              {/* Skills List with Detailed Why It Is Verified */}
              <div className="space-y-3">
                {student.skills.map(skill => {
                  const isVerified = skill.status === 'verified';
                  const needsAssess = skill.status === 'needs_assessment';
                  return (
                    <div 
                      key={skill.name}
                      className={`p-4 rounded-2xl border transition ${
                        isVerified 
                          ? 'border-emerald-200 bg-emerald-50/20' 
                          : needsAssess 
                          ? 'border-amber-200 bg-amber-50/20' 
                          : 'border-slate-200 bg-slate-50/40'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold ${
                            isVerified ? 'bg-emerald-100 text-emerald-700' : needsAssess ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-500'
                          }`}>
                            {isVerified ? <CheckCircle2 className="h-5 w-5" /> : needsAssess ? <Clock className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-slate-900">{skill.name}</h4>
                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                isVerified 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : needsAssess 
                                  ? 'bg-amber-100 text-amber-800' 
                                  : 'bg-rose-100 text-rose-800'
                              }`}>
                                {isVerified ? 'Verified' : needsAssess ? 'Needs Assessment' : 'Not Verified'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">{skill.level} Proficiency • Verified Score: {skill.score}%</p>
                          </div>
                        </div>

                        {/* Action if needs assessment */}
                        {needsAssess && (
                          <button
                            onClick={() => {
                              verifyForm.skillName = skill.name;
                              setIsVerifyModalOpen(true);
                            }}
                            className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-2xs"
                          >
                            Take Assessment
                          </button>
                        )}
                      </div>

                      {/* Exact Reason Why It's Verified */}
                      <div className="mt-3 p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700">
                        <strong className="text-slate-900 font-bold">Verification Rationale: </strong>
                        <span>{skill.verifiedReason}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Uploaded Certificates List */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="font-bold text-sm text-slate-900">Uploaded Certificates & Evidence</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {student.certificates.map(c => (
                    <div key={c.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between">
                      <div>
                        <h5 className="font-bold text-slate-900">{c.title}</h5>
                        <p className="text-[11px] text-slate-500">{c.issuer} • {c.date}</p>
                        <p className="text-[10px] text-slate-600 mt-1">{c.evidence}</p>
                      </div>
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {c.status === 'verified' ? 'Verified' : 'Under Review'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 4: COLLEGE PLACEMENTS (Approved by College Only)        */}
          {/* ============================================================ */}
          {activeTab === 'college_placements' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fade-in">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-black text-slate-900">College Approved Placement Drives</h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Official drives authorized by <strong>{student.college}</strong> TPO Cell
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {collegeApprovedJobs.length} Drives Approved
                </span>
              </div>

              <div className="space-y-4">
                {collegeApprovedJobs.map(job => (
                  <div key={job.id} className="border border-slate-200 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md transition bg-white flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <img src={job.companyLogo} alt={job.company} className="h-12 w-12 rounded-xl object-cover border border-slate-100 p-1" />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-base text-slate-900">{job.title}</h4>
                              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.2 rounded-full border border-blue-200">
                                Campus Drive
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 font-semibold">{job.company} • {job.location}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                            {job.matchScore}% Compatibility
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 p-3 bg-slate-50 rounded-xl text-xs">
                        <div>
                          <span className="text-slate-400 text-[10px] block font-bold">Package</span>
                          <strong className="text-slate-900">{job.salary}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block font-bold">Eligibility</span>
                          <strong className="text-indigo-600">{job.eligibilityText}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block font-bold">Drive / Test Date</span>
                          <strong className="text-slate-800">{job.driveDate}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block font-bold">Registration Deadline</span>
                          <strong className="text-rose-600">{job.deadline}</strong>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="font-bold text-slate-500 text-[11px]">Required Skills:</span>
                        {job.requiredSkills.map(skill => (
                          <span key={skill} className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button 
                        onClick={() => handleSaveToggle(job.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
                          savedJobs.includes(job.id) ? 'bg-purple-50 text-purple-700 border-purple-200' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Bookmark className="h-3.5 w-3.5" />
                        <span>{savedJobs.includes(job.id) ? 'Saved' : 'Save Drive'}</span>
                      </button>

                      <button
                        onClick={() => handleApplyJob(job)}
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition"
                      >
                        Apply for Placement Drive →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 5: OFF-CAMPUS JOBS                                       */}
          {/* ============================================================ */}
          {activeTab === 'off_campus' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fade-in">
              <div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-indigo-600" />
                  <h3 className="text-lg font-black text-slate-900">Off-Campus Job Opportunities</h3>
                </div>
                <p className="text-xs text-slate-500">Independent hiring directly from tech startups & global firms</p>
              </div>

              <div className="space-y-4">
                {offCampusJobs.map(job => (
                  <div key={job.id} className="p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 transition bg-white flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">
                            Off-Campus Direct
                          </span>
                          <h4 className="font-bold text-base text-slate-900 mt-1">{job.title}</h4>
                          <p className="text-xs text-slate-500">{job.company} • {job.location}</p>
                        </div>
                        <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          {job.matchScore}% Match
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 mt-3">{job.description}</p>
                      
                      <div className="mt-3 flex items-center justify-between text-xs font-bold text-slate-800">
                        <span className="text-blue-600">{job.salary}</span>
                        <span className="text-slate-400 font-normal text-[11px]">Due: {job.deadline}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button 
                        onClick={() => handleSaveToggle(job.id)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                          savedJobs.includes(job.id) ? 'bg-purple-50 text-purple-700 border-purple-200' : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        {savedJobs.includes(job.id) ? 'Bookmarked' : 'Save'}
                      </button>
                      <button 
                        onClick={() => handleApplyJob(job)}
                        className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition"
                      >
                        Apply Off-Campus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 6: INTERNSHIPS (Paid / Unpaid, City, Stipend)            */}
          {/* ============================================================ */}
          {activeTab === 'internships' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-emerald-600" />
                    <h3 className="text-lg font-black text-slate-900">Internship Portal</h3>
                  </div>
                  <p className="text-xs text-slate-500">Paid and academic internships with PPO evaluation</p>
                </div>

                {/* Filter Paid / Unpaid */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  <button 
                    onClick={() => setInternshipTypeFilter('all')}
                    className={`px-3 py-1 rounded-lg transition ${internshipTypeFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'}`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setInternshipTypeFilter('paid')}
                    className={`px-3 py-1 rounded-lg transition ${internshipTypeFilter === 'paid' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-500'}`}
                  >
                    Paid
                  </button>
                  <button 
                    onClick={() => setInternshipTypeFilter('unpaid')}
                    className={`px-3 py-1 rounded-lg transition ${internshipTypeFilter === 'unpaid' ? 'bg-white text-purple-700 shadow-2xs' : 'text-slate-500'}`}
                  >
                    Free / Unpaid
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {internshipJobs
                  .filter(job => {
                    if (internshipTypeFilter === 'paid') return job.type.includes('Paid');
                    if (internshipTypeFilter === 'unpaid') return job.type.includes('Unpaid');
                    return true;
                  })
                  .map(job => (
                    <div key={job.id} className="p-5 rounded-2xl border border-slate-200 hover:border-emerald-400 transition bg-white flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img src={job.companyLogo} alt={job.company} className="h-10 w-10 rounded-xl object-cover border p-1" />
                            <div>
                              <h4 className="font-bold text-sm text-slate-900">{job.title}</h4>
                              <p className="text-xs text-slate-500">{job.company} • {job.city} ({job.workMode})</p>
                            </div>
                          </div>
                          <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            {job.matchScore}% Match
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 p-2.5 bg-slate-50 rounded-xl text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block">Type</span>
                            <strong className="text-slate-900">{job.type}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block">Stipend</span>
                            <strong className="text-emerald-600">{job.stipend}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block">Duration</span>
                            <strong className="text-slate-800">{job.duration}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block">Deadline</span>
                            <strong className="text-slate-600">{job.deadline}</strong>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1">
                          {job.requiredSkills.map(s => (
                            <span key={s} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <button 
                          onClick={() => handleSaveToggle(job.id)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                            savedJobs.includes(job.id) ? 'bg-purple-50 text-purple-700 border-purple-200' : 'border-slate-200 text-slate-600'
                          }`}
                        >
                          {savedJobs.includes(job.id) ? 'Bookmarked' : 'Save'}
                        </button>
                        <button 
                          onClick={() => handleApplyJob(job)}
                          className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                        >
                          Apply for Internship
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 7: AI CAREER ANALYZER                                    */}
          {/* ============================================================ */}
          {activeTab === 'analyzer' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-lg font-black text-slate-900">AI Career Analyzer & Gap Diagnostics</h3>
                  </div>
                  <p className="text-xs text-slate-500">Comprehensive analysis of Skills, Projects, Certificates & Target Role</p>
                </div>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  Target: {student.targetRole}
                </span>
              </div>

              {/* Top Score Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Career Readiness Score</span>
                  <p className="text-3xl font-black text-blue-600 mt-1">{student.aiReadinessScore}/100</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Top 10% in cohort</p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Role Compatibility</span>
                  <p className="text-3xl font-black text-emerald-600 mt-1">92%</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">For Java Backend Roles</p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">ATS Resume Benchmark</span>
                  <p className="text-3xl font-black text-purple-600 mt-1">{student.resume.atsScore}%</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">High keyword match</p>
                </div>
              </div>

              {/* Strengths vs Skill Gaps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                
                {/* Strengths */}
                <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/30 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Identified Strengths (Competitive Edge)</span>
                  </div>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Java Core & OOP:</strong> Oracle certified SE 17 credentials boost screening pass rate.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Relational Databases:</strong> SQL 5-star rating and indexed queries.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Work Experience:</strong> 3-month verified internship at DevSprint.</span>
                    </li>
                  </ul>
                </div>

                {/* Gaps */}
                <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/30 space-y-3">
                  <div className="flex items-center gap-2 text-rose-800 font-bold">
                    <AlertTriangle className="h-4 w-4 text-rose-600" />
                    <span>Skill Gaps Impacting Shortlists</span>
                  </div>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold">!</span>
                      <span><strong>DSA Dynamic Programming & Trees:</strong> Current score 55%. Weakness in online assessment rounds.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold">!</span>
                      <span><strong>Cloud Deployment:</strong> No active AWS or containerized deployment project on GitHub.</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Improvement Suggestions */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span>Actionable AI Improvement Suggestions</span>
                </h4>
                <div className="space-y-1.5 text-slate-600">
                  <p>1. Solve 15 Trees & 15 Dynamic Programming problems on LeetCode to raise readiness to 88+.</p>
                  <p>2. Complete Docker containerization of your Banking API and deploy to AWS App Runner.</p>
                  <p>3. Request mock interview feedback for System Design fundamentals.</p>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 8: CAREER ROADMAP (Target Job Selection + Free YouTube & Paid Resources) */}
          {/* ============================================================ */}
          {activeTab === 'roadmap' && (() => {
            const stages = currentRoadmap?.stages || [];
            const completedStagesCount = stages.filter(s => s.status === 'completed').length;
            const inProgressStagesCount = stages.filter(s => s.status === 'in_progress').length;
            const overallCompletionPct = stages.length > 0 
              ? Math.round((completedStagesCount / stages.length) * 100) 
              : 0;

            return (
              <div className="space-y-6 animate-fade-in">
                
                {/* 1. Target Job Hero & Path Selector Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 md:p-8 text-white shadow-xl">
                  {/* Decorative background glow */}
                  <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-3 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-extrabold tracking-wide uppercase flex items-center gap-1.5">
                          <Target className="h-3.5 w-3.5 text-blue-400" />
                          Target Career Track
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          {currentRoadmap.aiCompatibilityScore || 90}% AI Role Compatibility
                        </span>
                        <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700">
                          ⏱️ {currentRoadmap.estimatedDuration || "6 Months"}
                        </span>
                      </div>

                      <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                          {currentRoadmap.roleName}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                          {currentRoadmap.tagline}
                        </p>
                      </div>

                      {/* Targeted Companies */}
                      {currentRoadmap.targetCompanies && (
                        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 pt-1">
                          <span className="font-semibold text-slate-300">Target Companies:</span>
                          {currentRoadmap.targetCompanies.map(comp => (
                            <span key={comp} className="px-2 py-0.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-[11px] text-slate-200">
                              {comp}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right Side: Progress Gauge & Change Role CTA */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 bg-slate-800/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-700/80 min-w-[260px]">
                      <div className="w-full space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-slate-300">Roadmap Progress</span>
                          <span className="text-blue-400 font-extrabold text-sm">{overallCompletionPct}%</span>
                        </div>
                        <div className="w-full bg-slate-700/80 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                            style={{ width: `${overallCompletionPct}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {completedStagesCount} of {stages.length} phases finished • {inProgressStagesCount} in progress
                        </p>
                      </div>

                      <button
                        onClick={() => setIsRoleModalOpen(true)}
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black shadow-lg shadow-blue-500/25 transition duration-200 flex items-center justify-center gap-2"
                      >
                        <Compass className="h-4 w-4" />
                        <span>Change Target Job Role</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Target Job Role Selection Modal */}
                {isRoleModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 animate-scale-in">
                      
                      <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                              <Target className="h-5 w-5" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">
                              Select Your Target Job Role (Pehle Target Job Chunein)
                            </h3>
                          </div>
                          <p className="text-xs text-slate-500">
                            Aapki target job ke hisaab se customized phase-by-phase roadmap, verified free YouTube channels & playlists with links, aur top paid courses unlock honge.
                          </p>
                        </div>
                        <button 
                          onClick={() => setIsRoleModalOpen(false)}
                          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Custom Role Input Form */}
                      <form onSubmit={handleCustomRoleSubmit} className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border border-blue-200 space-y-2">
                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Sparkles className="h-4 w-4 text-blue-600" />
                          <span>Custom Dream Role? Type here for Instant AI Roadmap:</span>
                        </label>
                        <div className="flex gap-2">
                          <input 
                            type="text"
                            value={customRoleInput}
                            onChange={(e) => setCustomRoleInput(e.target.value)}
                            placeholder="e.g. Flutter Mobile Developer, Cybersecurity Analyst, Game Developer, Cloud Architect..."
                            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                          <button
                            type="submit"
                            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5 whitespace-nowrap"
                          >
                            <span>Generate AI Roadmap</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </form>

                      {/* Popular High-Demand Roles Grid */}
                      <div className="space-y-3">
                        <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                          Or Choose from Popular High-Demand Career Tracks:
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                          {popularJobRoles.map(role => {
                            const isSelected = targetJobRole.toLowerCase().includes(role.title.toLowerCase().split(' ')[0]);
                            return (
                              <div 
                                key={role.id}
                                onClick={() => handleSelectTargetRole(role.title)}
                                className={`p-4 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                                  isSelected 
                                    ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-500/20 shadow-sm' 
                                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
                                }`}
                              >
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${role.badgeColor}`}>
                                      {role.category}
                                    </span>
                                    <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                      CTC: {role.avgSalary}
                                    </span>
                                  </div>

                                  <div>
                                    <h5 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-600 transition flex items-center justify-between">
                                      <span>{role.title}</span>
                                      {isSelected && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
                                    </h5>
                                    <p className="text-[11px] text-slate-500 mt-0.5">{role.subtitle}</p>
                                  </div>

                                  <div className="flex flex-wrap gap-1 pt-1">
                                    {role.tags.map(t => (
                                      <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                                  <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-700">
                                    {role.demand}
                                  </span>
                                  <span className="text-blue-600 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition text-[11px]">
                                    Select Path →
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 3. Resource Filter & Guide Controls */}
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <h3 className="font-black text-sm text-slate-900 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-indigo-600" />
                      <span>Curriculum Phases & Curated Learning Vault</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Phase-wise topics, verified free YouTube playlists, and industry-grade paid certifications
                    </p>
                  </div>

                  {/* Resource Filter Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
                    <button
                      onClick={() => setActiveRoadmapResourceFilter('all')}
                      className={`px-3 py-1.5 rounded-xl border transition ${
                        activeRoadmapResourceFilter === 'all'
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      All Resources
                    </button>
                    <button
                      onClick={() => setActiveRoadmapResourceFilter('free')}
                      className={`px-3 py-1.5 rounded-xl border transition flex items-center gap-1.5 ${
                        activeRoadmapResourceFilter === 'free'
                          ? 'bg-red-600 text-white border-red-600 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-red-50 hover:text-red-700'
                      }`}
                    >
                      <PlayCircle className="h-3.5 w-3.5" />
                      <span>Free (YouTube Links)</span>
                    </button>
                    <button
                      onClick={() => setActiveRoadmapResourceFilter('paid')}
                      className={`px-3 py-1.5 rounded-xl border transition flex items-center gap-1.5 ${
                        activeRoadmapResourceFilter === 'paid'
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-indigo-50 hover:text-indigo-700'
                      }`}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Paid Courses</span>
                    </button>
                    <button
                      onClick={() => setActiveRoadmapResourceFilter('projects')}
                      className={`px-3 py-1.5 rounded-xl border transition flex items-center gap-1.5 ${
                        activeRoadmapResourceFilter === 'projects'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700'
                      }`}
                    >
                      <Code2 className="h-3.5 w-3.5" />
                      <span>Projects to Build</span>
                    </button>
                  </div>
                </div>

                {/* 4. Phase-by-Phase Roadmap Timeline */}
                <div className="space-y-6">
                  {stages.map((stage) => {
                    const isDone = stage.status === 'completed';
                    const isInProgress = stage.status === 'in_progress';
                    const isExpanded = expandedStages[stage.id] ?? true;

                    return (
                      <div 
                        key={stage.id}
                        className={`rounded-3xl border transition-all duration-200 overflow-hidden shadow-sm bg-white ${
                          isDone 
                            ? 'border-emerald-300 ring-1 ring-emerald-400/20' 
                            : isInProgress 
                              ? 'border-blue-300 ring-2 ring-blue-500/15 shadow-md' 
                              : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {/* Stage Card Header */}
                        <div className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b ${
                          isDone 
                            ? 'bg-emerald-50/40 border-emerald-100' 
                            : isInProgress 
                              ? 'bg-blue-50/50 border-blue-100' 
                              : 'bg-slate-50/50 border-slate-100'
                        }`}>
                          <div className="flex items-start sm:items-center gap-3.5">
                            {/* Step Indicator Badge */}
                            <div 
                              onClick={() => handleToggleStageStatus(stage.id)}
                              title="Click to toggle status"
                              className={`h-9 w-9 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm cursor-pointer transition transform hover:scale-105 ${
                                isDone 
                                  ? 'bg-emerald-500 text-white ring-4 ring-emerald-100' 
                                  : isInProgress 
                                    ? 'bg-blue-600 text-white ring-4 ring-blue-100' 
                                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                              }`}
                            >
                              {isDone ? '✓' : stage.id}
                            </div>

                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
                                  {stage.phase}
                                </span>
                                <span className="text-[10px] font-bold bg-white text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                                  {stage.category}
                                </span>
                              </div>
                              <h4 className="text-base font-black text-slate-900 mt-0.5">
                                {stage.title}
                              </h4>
                            </div>
                          </div>

                          {/* Action Controls: Status Toggles & Accordion Chevron */}
                          <div className="flex items-center gap-2 shrink-0">
                            {/* Interactive Status Switcher */}
                            <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-2xs text-[11px] font-bold">
                              <button
                                onClick={() => {
                                  setCurrentRoadmap(prev => ({
                                    ...prev,
                                    stages: prev.stages.map(s => s.id === stage.id ? { ...s, status: 'completed', progress: 100 } : s)
                                  }));
                                  confetti({ particleCount: 40, spread: 40 });
                                  triggerToast(`${stage.phase} marked Completed!`);
                                }}
                                className={`px-2.5 py-1 rounded-lg transition ${
                                  isDone ? 'bg-emerald-500 text-white font-black shadow-xs' : 'text-slate-500 hover:text-emerald-700'
                                }`}
                              >
                                ✓ Done
                              </button>
                              <button
                                onClick={() => {
                                  setCurrentRoadmap(prev => ({
                                    ...prev,
                                    stages: prev.stages.map(s => s.id === stage.id ? { ...s, status: 'in_progress', progress: 50 } : s)
                                  }));
                                  triggerToast(`${stage.phase} set to In Progress`);
                                }}
                                className={`px-2.5 py-1 rounded-lg transition ${
                                  isInProgress ? 'bg-blue-600 text-white font-black shadow-xs' : 'text-slate-500 hover:text-blue-700'
                                }`}
                              >
                                ⏳ Doing ({stage.progress}%)
                              </button>
                              <button
                                onClick={() => {
                                  setCurrentRoadmap(prev => ({
                                    ...prev,
                                    stages: prev.stages.map(s => s.id === stage.id ? { ...s, status: 'pending', progress: 0 } : s)
                                  }));
                                  triggerToast(`${stage.phase} reset to Pending`);
                                }}
                                className={`px-2.5 py-1 rounded-lg transition ${
                                  !isDone && !isInProgress ? 'bg-slate-700 text-white font-black shadow-xs' : 'text-slate-400 hover:text-slate-700'
                                }`}
                              >
                                Pending
                              </button>
                            </div>

                            {/* Collapse / Expand Button */}
                            <button
                              onClick={() => toggleStageExpand(stage.id)}
                              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 transition"
                              title={isExpanded ? "Collapse Stage" : "Expand Stage"}
                            >
                              <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                            </button>
                          </div>
                        </div>

                        {/* Collapsible Content Body */}
                        {isExpanded && (
                          <div className="p-6 space-y-6">
                            
                            {/* Summary & Key Topics */}
                            <div className="space-y-3">
                              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                {stage.desc}
                              </p>

                              {stage.keyTopics && stage.keyTopics.length > 0 && (
                                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                                  <span className="text-[11px] font-extrabold uppercase tracking-wide text-slate-500 block">
                                    Key Topics & Concepts to Master:
                                  </span>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {stage.keyTopics.map((topic, idx) => (
                                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                                        <span>{topic}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Capstone Project to Build */}
                            {(activeRoadmapResourceFilter === 'all' || activeRoadmapResourceFilter === 'projects') && stage.project && (
                              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/90 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs">
                                    <Code2 className="h-4 w-4 text-emerald-600" />
                                    <span>Hands-On Capstone Project for Resume:</span>
                                  </div>
                                  <span className="text-[10px] bg-emerald-200/80 text-emerald-900 font-bold px-2 py-0.5 rounded-md">
                                    Push to GitHub
                                  </span>
                                </div>
                                <h5 className="font-extrabold text-sm text-slate-900">
                                  {stage.project.title}
                                </h5>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                  {stage.project.desc}
                                </p>
                              </div>
                            )}

                            {/* Learning Resources Grid: FREE (YouTube) and PAID */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
                              
                              {/* 📺 FREE RESOURCES (YouTube Channels & Playlists with Direct Links) */}
                              {(activeRoadmapResourceFilter === 'all' || activeRoadmapResourceFilter === 'free') && (
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                      <div className="h-6 w-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold">
                                        <PlayCircle className="h-3.5 w-3.5" />
                                      </div>
                                      <h5 className="font-black text-xs text-slate-900 uppercase tracking-wide">
                                        Free Resources (YouTube Links)
                                      </h5>
                                    </div>
                                    <span className="text-[10px] font-bold bg-red-50 text-red-700 px-2 py-0.5 rounded-full border border-red-200">
                                      100% Free
                                    </span>
                                  </div>

                                  <div className="space-y-2.5">
                                    {stage.freeResources && stage.freeResources.map((res, rIdx) => (
                                      <div 
                                        key={rIdx}
                                        className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-red-300 hover:shadow-sm transition space-y-2"
                                      >
                                        <div className="flex items-start justify-between gap-2">
                                          <div>
                                            <div className="flex items-center gap-1.5">
                                              <span className="text-xs font-black text-slate-900">
                                                📺 {res.channel}
                                              </span>
                                              {res.language && (
                                                <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.2 rounded">
                                                  {res.language}
                                                </span>
                                              )}
                                            </div>
                                            <p className="text-xs font-bold text-red-600 mt-0.5">
                                              {res.title}
                                            </p>
                                          </div>
                                        </div>

                                        <p className="text-[11px] text-slate-500 leading-normal">
                                          {res.desc}
                                        </p>

                                        <div className="pt-1 flex justify-end">
                                          <a
                                            href={res.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] shadow-xs transition flex items-center gap-1.5"
                                          >
                                            <PlayCircle className="h-3.5 w-3.5" />
                                            <span>Open YouTube Channel ↗</span>
                                          </a>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* 💎 PAID RESOURCES (Curated Top-Tier Courses & Certifications) */}
                              {(activeRoadmapResourceFilter === 'all' || activeRoadmapResourceFilter === 'paid') && (
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                      <div className="h-6 w-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                                        <Sparkles className="h-3.5 w-3.5" />
                                      </div>
                                      <h5 className="font-black text-xs text-slate-900 uppercase tracking-wide">
                                        Paid Resources & Certifications
                                      </h5>
                                    </div>
                                    <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">
                                      Top Industry Rating
                                    </span>
                                  </div>

                                  <div className="space-y-2.5">
                                    {stage.paidResources && stage.paidResources.map((res, pIdx) => (
                                      <div 
                                        key={pIdx}
                                        className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm transition space-y-2"
                                      >
                                        <div className="flex items-start justify-between gap-2">
                                          <div>
                                            <div className="flex items-center gap-1.5">
                                              <span className="text-xs font-black text-indigo-900">
                                                💎 {res.platform}
                                              </span>
                                              {res.rating && (
                                                <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.2 rounded border border-amber-200">
                                                  {res.rating}
                                                </span>
                                              )}
                                            </div>
                                            <p className="text-xs font-bold text-slate-900 mt-0.5">
                                              {res.title}
                                            </p>
                                          </div>
                                          <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                                            {res.price}
                                          </span>
                                        </div>

                                        {res.instructor && (
                                          <p className="text-[10px] text-slate-500 font-medium">
                                            Instructor: <strong className="text-slate-700">{res.instructor}</strong>
                                          </p>
                                        )}

                                        <p className="text-[11px] text-slate-500 leading-normal">
                                          {res.desc}
                                        </p>

                                        <div className="pt-1 flex justify-end">
                                          <a
                                            href={res.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] shadow-xs transition flex items-center gap-1.5"
                                          >
                                            <ExternalLink className="h-3.5 w-3.5" />
                                            <span>View Paid Course ↗</span>
                                          </a>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                            </div>

                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })()}

          {/* ============================================================ */}
          {/* TAB 9: AI ASSISTANT                                          */}
          {/* ============================================================ */}
          {activeTab === 'ai_assistant' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[650px] animate-fade-in">
              
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">CareerBridge AI Coach</h3>
                    <p className="text-[11px] text-blue-100">Bilingual assistance for preparation, roadmaps & job matches</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-emerald-400 text-slate-950 px-2 py-0.5 rounded-full">
                  Live Coach
                </span>
              </div>

              {/* 5 Quick Action Chips */}
              <div className="bg-slate-50 border-b border-slate-200 p-2.5 flex flex-wrap gap-1.5 text-xs">
                {[
                  "Improve Resume",
                  "Find Skill Gaps",
                  "Prepare Interview",
                  "My Roadmap",
                  "Find Jobs"
                ].map(action => (
                  <button
                    key={action}
                    onClick={() => handleSendChat(action)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-blue-50 hover:text-blue-700 transition text-[11px] shadow-2xs"
                  >
                    ⚡ {action}
                  </button>
                ))}
              </div>

              {/* Message Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40 text-xs">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3.5 rounded-2xl max-w-[85%] ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs'
                    }`}>
                      <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                      <span className={`block text-[9px] mt-1.5 ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <Bot className="h-4 w-4 animate-spin text-blue-600" />
                    <span>AI Career Coach is typing advice...</span>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-3 bg-white border-t border-slate-200">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSendChat(); }}
                  className="flex items-center gap-2 text-xs"
                >
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask anything (e.g. Mera DSA weak hai, kya karu?)..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    type="submit"
                    disabled={chatLoading || !chatInput.trim()}
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition disabled:opacity-40"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 10: APPLICATION FEEDBACK                                 */}
          {/* ============================================================ */}
          {activeTab === 'applications' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fade-in">
              <div>
                <h3 className="text-lg font-black text-slate-900">Application Feedback & Tracking</h3>
                <p className="text-xs text-slate-500">
                  Full status progression: Applied → Under Review → Shortlisted → Interview → Selected / Rejected
                </p>
              </div>

              <div className="space-y-4">
                {applications.map(app => {
                  const isRejected = app.status === 'Rejected' || app.currentStage === 'Rejected';
                  const isSelected = app.status.includes('Selected');
                  const isInterview = app.status.includes('Interview');
                  return (
                    <div 
                      key={app.id} 
                      className={`p-5 rounded-2xl border transition ${
                        isRejected ? 'border-rose-200 bg-rose-50/20' : isSelected ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-base text-slate-900">{app.jobTitle}</h4>
                            <span className="text-xs font-bold text-slate-500">@ {app.company}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">Applied on {app.appliedDate}</p>
                        </div>

                        {/* Status pill */}
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          isRejected 
                            ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                            : isSelected 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                            : isInterview 
                            ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                            : 'bg-blue-100 text-blue-700 border border-blue-200'
                        }`}>
                          {app.status}
                        </span>
                      </div>

                      {/* 5-Stage Stepper: Applied -> Under Review -> Shortlisted -> Interview -> Selected / Rejected */}
                      <div className="grid grid-cols-5 gap-1 text-center my-4 text-[10px] font-bold">
                        {['Applied', 'Under Review', 'Shortlisted', 'Interview', isRejected ? 'Rejected' : 'Selected'].map((stage, idx) => {
                          const stagesOrder = ['Applied', 'Under Review', 'Shortlisted', 'Interview', isRejected ? 'Rejected' : 'Selected'];
                          const currentIdx = stagesOrder.indexOf(app.currentStage || 'Applied');
                          const isPassed = idx <= currentIdx;
                          return (
                            <div key={stage} className="space-y-1">
                              <div className={`h-2 rounded-full ${
                                isPassed 
                                  ? isRejected && idx === currentIdx ? 'bg-rose-500' : isSelected && idx === currentIdx ? 'bg-emerald-500' : 'bg-blue-600'
                                  : 'bg-slate-200'
                              }`} />
                              <span className={isPassed ? 'text-slate-900' : 'text-slate-400'}>{stage}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Recruiter feedback notes */}
                      <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-xs text-slate-700">
                        <strong className="text-slate-900">Recruiter Feedback: </strong>
                        <span>{app.recruiterFeedback}</span>
                      </div>

                      {/* Interview slot details if scheduled */}
                      {app.interviewDate && (
                        <div className="mt-2.5 p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs flex items-center justify-between text-purple-900 font-semibold">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-purple-600" />
                            <span>Scheduled: <strong>{app.interviewDate}</strong> ({app.interviewStage})</span>
                          </div>
                          <span className="text-[10px] bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full font-bold">
                            Live Round
                          </span>
                        </div>
                      )}

                      {/* For rejection: EXACT REASON + WHAT TO IMPROVE + RECOMMENDED ROADMAP */}
                      {isRejected && (
                        <div className="mt-3 p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2 text-xs">
                          <div className="flex items-center gap-2 text-rose-800 font-bold">
                            <AlertTriangle className="h-4 w-4 text-rose-600" />
                            <span>Rejection Reason: {app.rejectionReason}</span>
                          </div>

                          {app.improvementSuggestions && (
                            <div className="space-y-1 pt-1">
                              <strong className="text-slate-800 block">What to improve:</strong>
                              <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                                {app.improvementSuggestions.map((sug, sIdx) => (
                                  <li key={sIdx}>{sug}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {app.recommendedRoadmap && (
                            <div className="pt-2 flex items-center justify-between">
                              <span className="text-indigo-700 font-bold">
                                Recommended Action: {app.recommendedRoadmap}
                              </span>
                              <button
                                onClick={() => setActiveTab('roadmap')}
                                className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold text-[11px]"
                              >
                                Open in Roadmap →
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </main>

      </div>

      {/* VERIFY SKILL MODAL */}
      {isVerifyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-scale-in text-xs">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Award className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">Skill Verification Request</h3>
              </div>
              <button onClick={() => setIsVerifyModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSkillVerificationSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Skill to Verify</label>
                <select 
                  value={verifyForm.skillName}
                  onChange={(e) => setVerifyForm({ ...verifyForm, skillName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                >
                  <option value="AWS / Cloud">AWS / Cloud</option>
                  <option value="DSA (Data Structures)">DSA (Data Structures)</option>
                  <option value="Docker">Docker & Containers</option>
                  <option value="Python Basics">Python Basics</option>
                  <option value="React">React.js</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Evidence Type</label>
                <select 
                  value={verifyForm.evidenceType}
                  onChange={(e) => setVerifyForm({ ...verifyForm, evidenceType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                >
                  <option value="Certificate PDF">Certificate Upload / Credential ID</option>
                  <option value="GitHub Repo">Production GitHub Repository</option>
                  <option value="Online Assessment">Proctored Assessment Score (90%+)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Credential URL or Proof Details</label>
                <textarea 
                  rows={3}
                  value={verifyForm.evidenceText}
                  onChange={(e) => setVerifyForm({ ...verifyForm, evidenceText: e.target.value })}
                  placeholder="e.g. AWS Certified Cloud Practitioner credential ID or GitHub URL"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none"
                  required
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsVerifyModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-xs"
                >
                  Submit for Instant Verification
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
