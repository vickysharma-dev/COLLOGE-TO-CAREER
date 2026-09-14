import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Award, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  UserCheck, 
  Send, 
  XCircle, 
  FileCheck, 
  Building2, 
  Check, 
  X, 
  TrendingUp, 
  BarChart3, 
  Star, 
  AlertTriangle, 
  FileText, 
  LogOut, 
  Eye, 
  ShieldCheck, 
  Globe,
  Download,
  ExternalLink,
  GitBranch,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Layers,
  BadgeCheck,
  Code2,
  FolderGit2,
  BookOpen,
  Printer
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import confetti from 'canvas-confetti';

export default function CompanyPortal({ 
  students, 
  opportunities, 
  applications, 
  onPostHiring, 
  onShortlistCandidate, 
  onScheduleInterview, 
  onRejectCandidate, 
  onSelectCandidate 
}) {
  const [activeTab, setActiveTab] = useState('ranking');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    companyName: 'Accenture Technologies',
    email: 'campus.recruiting@accenture.com',
    password: '••••••••••••',
    verification: 'Corporate Recruiter ID: ACC-CR-9821'
  });

  // Selected candidate spotlight
  const [selectedCandidate, setSelectedCandidate] = useState(students[0]);
  const [candidateProfileModal, setCandidateProfileModal] = useState(null);
  const [profileModalTab, setProfileModalTab] = useState('overview'); // 'overview' | 'skills' | 'projects' | 'experience'
  const [activeResumePreview, setActiveResumePreview] = useState(null);

  // Search & Filters for Applications Tab
  const [appSearchTerm, setAppSearchTerm] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState('all');
  const [appMinCgpa, setAppMinCgpa] = useState('all');

  // Helper to ensure 100% complete student profile information is always available
  const resolveStudent = (item) => {
    if (!item) return students[0] || {};
    // Find matching student from directory
    const found = students.find(s => s.id === item.id || s.id === item.studentId || s.name === item.studentName || s.name === item.name);
    const base = found || item;

    // Return deeply enriched student object
    return {
      id: base.id || item.studentId || "std-001",
      name: base.name || item.studentName || "Rahul Sharma",
      enrollmentNo: base.enrollmentNo || "EN2022CS089",
      email: base.email || `${(base.name || 'candidate').toLowerCase().replace(/\s+/g, '.')}@campus.edu`,
      phone: base.phone || "+91 98765 43210",
      college: base.college || "Apex Institute of Technology & Engineering",
      degree: base.degree || "B.Tech Computer Science & Engineering",
      branch: base.branch || "Computer Science & Engineering",
      year: base.year || "4th Year (2022-2026)",
      cgpa: base.cgpa || 8.5,
      backlogs: base.backlogs ?? 0,
      avatar: base.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      collegeVerificationStatus: base.collegeVerificationStatus || "verified",
      aiReadinessScore: base.aiReadinessScore || item.aiScore || 80,
      targetRole: base.targetRole || item.jobTitle || "Software Engineer",
      resume: base.resume || {
        fileName: `${(base.name || 'Candidate').replace(/\s+/g, '_')}_Resume.pdf`,
        lastUpdated: "2026-09-10",
        fileSize: "420 KB",
        atsScore: 85
      },
      skills: base.skills && base.skills.length ? base.skills : [
        { name: "Java", status: "verified", level: "Advanced", score: 90, verifiedReason: "Verified via Oracle SE 17 Credential & Proctored Test" },
        { name: "Spring Boot", status: "verified", level: "Intermediate", score: 82, verifiedReason: "REST API Microservices Project Verified" },
        { name: "SQL & DBMS", status: "verified", level: "Advanced", score: 88, verifiedReason: "HackerRank 5-Star SQL Badge" }
      ],
      projects: base.projects && base.projects.length ? base.projects : [
        {
          id: "p1",
          title: "High-Throughput Banking REST API",
          tech: ["Java", "Spring Boot", "PostgreSQL", "JWT", "Docker"],
          desc: "Engineered scalable banking microservice handling 3,000+ simulated concurrent transactions with sub-80ms response.",
          github: "https://github.com/rahul/banking-api",
          liveDemo: "https://banking-demo.careerbridge.dev",
          verified: true
        }
      ],
      internships: base.internships && base.internships.length ? base.internships : [
        {
          id: "int-1",
          role: "Backend Engineering Intern",
          company: "DevSprint Technologies",
          duration: "3 Months (Jun 2025 - Aug 2025)",
          location: "Bengaluru",
          stipend: "₹20,000 / month",
          desc: "Refactored legacy REST controllers to Spring WebFlux, reducing server latency by 22%. Wrote JUnit 5 unit tests with 85% coverage.",
          completionLetterVerified: true
        }
      ],
      certificates: base.certificates && base.certificates.length ? base.certificates : [
        { id: "c1", title: "Oracle Certified Professional: Java SE 17", issuer: "Oracle University", date: "Jan 2024", credentialId: "OCP-9842109", status: "verified", evidence: "Credly Badge Verified" }
      ],
      matchReasons: base.matchReasons || [
        "Core technical skills verified through coding assessments",
        "Strong academic standing with 0 backlogs",
        "Demonstrated practical project & internship experience"
      ],
      appliedApp: item.appliedDate ? item : applications.find(a => a.studentId === (base.id || item.studentId) || a.studentName === (base.name || item.studentName))
    };
  };

  // Modals
  const [isCreateHiringOpen, setIsCreateHiringOpen] = useState(false);
  const [hiringType, setHiringType] = useState('college'); // 'college' | 'offcampus'

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleTargetApp, setScheduleTargetApp] = useState(null);
  const [scheduleData, setScheduleData] = useState({
    date: '2026-09-24',
    time: '02:30 PM',
    stage: 'Technical Round 1 (Java & Architecture)',
    feedback: 'Please prepare live coding in Java and relational database indexing concepts.'
  });

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectTargetApp, setRejectTargetApp] = useState(null);
  const [rejectForm, setRejectForm] = useState({
    reason: 'Required Skill Missing',
    customNotes: 'Insufficient production experience in cloud deployment.',
    recommendedRoadmap: 'Roadmap Step 7: Docker & AWS ECS Deployment'
  });

  // Create Hiring Form
  const [hiringForm, setHiringForm] = useState({
    role: 'Associate Software Engineer (Backend)',
    company: 'Accenture Technologies',
    salary: '₹8.5 - 14 LPA',
    location: 'Bengaluru / Hyderabad',
    requiredSkills: 'Java, Spring Boot, SQL, REST APIs',
    eligibility: 'B.Tech CS/IT with CGPA >= 7.5 and 0 backlogs',
    minCgpa: 7.5,
    experience: 'Fresher (2026 Batch)',
    deadline: '2026-10-20',
    description: 'Build enterprise microservices and event-driven data pipelines for global enterprise clients.'
  });

  // Action Handlers
  const handleCreateHiringSubmit = async (e) => {
    e.preventDefault();
    const skillsArray = hiringForm.requiredSkills.split(',').map(s => s.trim());
    await onPostHiring({ ...hiringForm, requiredSkills: skillsArray }, hiringType);
    setIsCreateHiringOpen(false);
    confetti({ particleCount: 70, spread: 60 });
    if (hiringType === 'college') {
      alert("College Hiring request submitted! Waiting for College TPO approval. Once approved, it will appear in Student College Placements.");
    } else {
      alert("Off-Campus opening published! It is now directly visible in Student Off-Campus Jobs.");
    }
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    if (!scheduleTargetApp) return;
    await onScheduleInterview(
      scheduleTargetApp.id, 
      scheduleData.date, 
      scheduleData.time, 
      scheduleData.stage, 
      scheduleData.feedback
    );
    setIsScheduleModalOpen(false);
    confetti({ particleCount: 50, spread: 50 });
    alert("Interview scheduled successfully! The student's Application Feedback has been updated.");
  };

  const handleRejectSubmit = async (e) => {
    e.preventDefault();
    if (!rejectTargetApp) return;
    await onRejectCandidate(
      rejectTargetApp.id, 
      `${rejectForm.reason}: ${rejectForm.customNotes}`,
      [
        "Strengthen hands-on implementation of required tech stack.",
        "Add verifiable GitHub demo links to portfolio.",
        "Follow recommended roadmap milestones to improve AI readiness score."
      ],
      rejectForm.recommendedRoadmap
    );
    setIsRejectModalOpen(false);
    alert("Candidate feedback recorded. The student has received the exact rejection reason and recommended roadmap.");
  };

  const handleSelectCandidateAction = async (app) => {
    await onSelectCandidate(app.id);
    confetti({ particleCount: 80, spread: 70 });
    alert(`Candidate ${app.studentName} marked as SELECTED / OFFER ROLLED OUT!`);
  };

  // -------------------------------------------------------------
  // 1. COMPANY LOGIN SCREEN (If logged out)
  // -------------------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-8 space-y-6 animate-scale-in">
          <div className="text-center space-y-2">
            <div className="h-14 w-14 rounded-2xl bg-emerald-600 mx-auto flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <Briefcase className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Recruiter ATS Portal Login</h2>
            <p className="text-xs text-slate-500">Skill-Verified Talent Acquisition Platform</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Company Name</label>
              <input 
                type="text" 
                value={loginForm.companyName}
                onChange={(e) => setLoginForm({ ...loginForm, companyName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Official Recruiter Email</label>
              <input 
                type="email" 
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Password</label>
              <input 
                type="password" 
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                required
              />
            </div>

            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-emerald-950 text-[11px]">Corporate Employer Verification</p>
                <p className="text-[10px] text-slate-500">{loginForm.verification}</p>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                ✓ Verified
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition"
            >
              Sign In to ATS Dashboard →
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN COMPANY PORTAL (ATS)
  // -------------------------------------------------------------
  const analyticsSkillData = [
    { skill: "Java", count: 48 },
    { skill: "Spring Boot", count: 35 },
    { skill: "SQL", count: 52 },
    { skill: "React", count: 38 },
    { skill: "DSA", count: 28 },
    { skill: "AWS", count: 14 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-slate-900">Accenture Campus Talent ATS</h2>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Verified Recruiter
              </span>
            </div>
            <p className="text-xs text-slate-500">
              University Relations & Hiring Desk • Talent Lead: <strong className="text-slate-800">Siddharth Mehra</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsCreateHiringOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>+ Create Hiring</span>
          </button>
          
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="p-2 rounded-xl border border-slate-200 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Grid with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Dark Navy Sidebar */}
        <aside className="lg:col-span-3">
          <div className="bg-[#0b132b] text-slate-300 rounded-3xl p-3.5 sticky top-20 space-y-1 shadow-xl">
            <div className="p-3 bg-white/10 rounded-2xl mb-3 flex items-center gap-2.5">
              <Briefcase className="h-5 w-5 text-emerald-400" />
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">Recruitment ATS</h4>
                <p className="text-[10px] text-slate-400">Skill-Based Hiring</p>
              </div>
            </div>

            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'profile', label: 'Company Profile', icon: Building2 },
              { id: 'create_hiring', label: 'Create Hiring', icon: Plus, highlight: true },
              { id: 'applications', label: 'Applications Pool', icon: Users, count: applications.length },
              { id: 'ranking', label: 'Candidate AI Ranking', icon: Sparkles, count: `${students.length} Ranked` },
              { id: 'interviews', label: 'Interviews Pipeline', icon: Calendar, count: applications.filter(a => a.status.includes('Interview')).length },
              { id: 'results', label: 'Hiring Results', icon: Award, count: applications.filter(a => a.status.includes('Selected')).length },
              { id: 'analytics', label: 'Hiring Analytics', icon: BarChart3 }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'create_hiring') {
                      setIsCreateHiringOpen(true);
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition ${
                    isActive 
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' 
                      : 'hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : item.highlight ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-300'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-9 space-y-6">

          {/* ============================================================ */}
          {/* TAB 1: DASHBOARD (6 KPI Cards + Performance)                 */}
          {/* ============================================================ */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* 6 KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Active Jobs</p>
                  <p className="text-xl font-black text-slate-900 mt-1">{opportunities.length}</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Applications</p>
                  <p className="text-xl font-black text-blue-600 mt-1">{applications.length}</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Shortlisted</p>
                  <p className="text-xl font-black text-indigo-600 mt-1">
                    {applications.filter(a => a.currentStage === 'Shortlisted' || a.status === 'Shortlisted').length + 1}
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Interviews</p>
                  <p className="text-xl font-black text-purple-600 mt-1">
                    {applications.filter(a => a.status.includes('Interview')).length}
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Selected</p>
                  <p className="text-xl font-black text-emerald-600 mt-1">
                    {applications.filter(a => a.status.includes('Selected')).length + 1}
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Hiring Score</p>
                  <p className="text-xl font-black text-teal-600 mt-1">88%</p>
                </div>
              </div>

              {/* Fast Actions Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-700/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black tracking-tight">Need Verified Campus Talent?</h3>
                  <p className="text-xs text-emerald-100 max-w-lg mt-1">
                    Create a College Hiring request or post Off-Campus jobs with automatic AI candidate ranking.
                  </p>
                </div>
                <button
                  onClick={() => setIsCreateHiringOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-white text-emerald-950 font-black text-xs hover:bg-emerald-50 transition shadow-md shrink-0"
                >
                  + Launch New Hiring Drive
                </button>
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: COMPANY PROFILE                                       */}
          {/* ============================================================ */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 animate-fade-in text-xs">
              <h3 className="text-lg font-black text-slate-900">Corporate Recruiter Profile</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <h4 className="font-bold text-sm text-slate-900">Company Information</h4>
                  <p><span className="text-slate-400">Name:</span> <strong>Accenture Technologies</strong></p>
                  <p><span className="text-slate-400">Headquarters:</span> <strong>Dublin / Bengaluru Technology Center</strong></p>
                  <p><span className="text-slate-400">Industry:</span> <strong>IT Services, Cloud & Digital Consulting</strong></p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <h4 className="font-bold text-sm text-slate-900">Campus ATS Coordinator</h4>
                  <p><span className="text-slate-400">Recruiter:</span> <strong>Siddharth Mehra</strong></p>
                  <p><span className="text-slate-400">Official Email:</span> <strong>campus.recruiting@accenture.com</strong></p>
                  <p><span className="text-slate-400">Partner Colleges:</span> <strong>48 Engineering Institutes</strong></p>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 3: CANDIDATE RANKING (The Signature Feature)             */}
          {/* ============================================================ */}
          {activeTab === 'ranking' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-emerald-600" />
                      <h3 className="text-lg font-black text-slate-900">Skill-Based AI Candidate Ranking</h3>
                    </div>
                    <p className="text-xs text-slate-500">Candidates ranked automatically by skill verification and project evidence</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Role: Java Backend Developer
                  </span>
                </div>

                {/* Candidate #1 Rahul Sharma Spotlight */}
                <div className="p-6 rounded-3xl border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-50/20 via-white to-blue-50/20 shadow-md">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <span className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shadow">
                          #1
                        </span>
                        <img src={selectedCandidate.avatar} alt="Candidate" className="h-16 w-16 rounded-full object-cover ring-4 ring-emerald-500/20 shadow-sm" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-lg text-slate-900">{selectedCandidate.name}</h4>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                            <CheckCircle2 className="h-3 w-3" /> College Verified
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{selectedCandidate.college} • CGPA: {selectedCandidate.cgpa}</p>
                        
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {selectedCandidate.skills?.map(sk => (
                            <span key={sk.name} className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.2 rounded-full font-bold">
                              ✓ {sk.name} ({sk.score}%)
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-slate-400 block">AI Readiness</span>
                        <span className="text-2xl font-black text-blue-600">{selectedCandidate.aiReadinessScore}<span className="text-xs text-slate-400">/100</span></span>
                      </div>
                      <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                        92% Match
                      </span>
                    </div>
                  </div>

                  {/* "Why this candidate matches" box */}
                  <div className="mt-5 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-xs space-y-1.5">
                    <h5 className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-emerald-600" />
                      <span>Why this candidate matches</span>
                    </h5>
                    <ul className="text-slate-700 space-y-1">
                      <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Java verified (Oracle SE 17 Credential, 90% score)</li>
                      <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> SQL verified (HackerRank 5-Star badge)</li>
                      <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Relevant project (Banking REST API microservice handling 3,000+ txns)</li>
                      <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Internship experience (3-month backend intern at DevSprint)</li>
                      <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Strong readiness score (78/100, Top 10% in cohort)</li>
                    </ul>
                  </div>

                  {/* Candidate Actions (5 buttons requested) */}
                  <div className="mt-5 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-end gap-2 text-xs font-bold">
                    <button 
                      onClick={() => {
                        setProfileModalTab('overview');
                        setCandidateProfileModal(resolveStudent(selectedCandidate));
                      }}
                      className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 transition flex items-center gap-1.5 shadow-2xs"
                    >
                      <Eye className="h-3.5 w-3.5 text-emerald-600" />
                      <span>View Full Profile & Resume</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        const targetApp = applications.find(a => a.studentId === selectedCandidate.id) || applications[0];
                        onShortlistCandidate(targetApp.id);
                        confetti({ particleCount: 50, spread: 50 });
                        alert(`${selectedCandidate.name} has been Shortlisted!`);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition shadow-2xs"
                    >
                      Shortlist
                    </button>

                    <button 
                      onClick={() => {
                        const targetApp = applications.find(a => a.studentId === selectedCandidate.id) || applications[0];
                        setScheduleTargetApp(targetApp);
                        setIsScheduleModalOpen(true);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition shadow-2xs flex items-center gap-1"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Schedule Interview</span>
                    </button>

                    <button 
                      onClick={() => {
                        const targetApp = applications.find(a => a.studentId === selectedCandidate.id) || applications[0];
                        setRejectTargetApp(targetApp);
                        setIsRejectModalOpen(true);
                      }}
                      className="px-3.5 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 transition"
                    >
                      Reject
                    </button>

                    <button 
                      onClick={() => {
                        const targetApp = applications.find(a => a.studentId === selectedCandidate.id) || applications[0];
                        handleSelectCandidateAction(targetApp);
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-2xs"
                    >
                      Select / Hire
                    </button>
                  </div>

                </div>

                {/* Ranked List #2 Priya, #3 Amit, etc. */}
                <div className="space-y-2.5">
                  <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Other Ranked Candidates in Pool</h4>
                  
                  {students.slice(1).map((std, idx) => {
                    const resolved = resolveStudent(std);
                    return (
                      <div 
                        key={std.id}
                        onClick={() => setSelectedCandidate(std)}
                        className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/20 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-black text-slate-400 w-5">#{idx + 2}</span>
                          <img src={resolved.avatar} alt={resolved.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100" />
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-bold text-sm text-slate-900">{resolved.name}</h5>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                CGPA {resolved.cgpa}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500">{resolved.degree || resolved.branch} • {resolved.college}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {resolved.skills?.slice(0, 3).map(sk => (
                                <span key={sk.name} className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-semibold">
                                  {sk.name} ({sk.score}%)
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 self-end sm:self-center">
                          <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg text-[11px]">
                            Score: {resolved.aiReadinessScore}/100
                          </span>
                          <span className="font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 text-[11px]">
                            {88 - idx * 4}% Match
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setProfileModalTab('overview');
                              setCandidateProfileModal(resolved);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition flex items-center gap-1 text-[11px]"
                            title="View candidate profile and resume"
                          >
                            <Eye className="h-3 w-3" />
                            <span>View Profile</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 4: APPLICATIONS (ATS Recruiter Candidate Pool)           */}
          {/* ============================================================ */}
          {activeTab === 'applications' && (() => {
            const filteredApplications = applications.filter(app => {
              const studentObj = resolveStudent(app);
              const term = appSearchTerm.trim().toLowerCase();
              const matchesSearch = !term || 
                app.studentName.toLowerCase().includes(term) ||
                app.jobTitle.toLowerCase().includes(term) ||
                (studentObj.skills && studentObj.skills.some(s => s.name.toLowerCase().includes(term))) ||
                (studentObj.degree && studentObj.degree.toLowerCase().includes(term));

              const matchesStatus = appStatusFilter === 'all' || 
                (appStatusFilter === 'Shortlisted' && (app.status === 'Shortlisted' || app.currentStage === 'Shortlisted')) ||
                (appStatusFilter === 'Interview' && app.status.includes('Interview')) ||
                (appStatusFilter === 'Selected' && app.status.includes('Selected')) ||
                (appStatusFilter === 'Rejected' && app.status === 'Rejected') ||
                (appStatusFilter === 'Under Review' && (app.status === 'Under Review' || app.status === 'Applied'));

              const matchesCgpa = appMinCgpa === 'all' || studentObj.cgpa >= parseFloat(appMinCgpa);

              return matchesSearch && matchesStatus && matchesCgpa;
            });

            return (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fade-in text-xs">
                {/* Header with KPI Counts */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-emerald-600" />
                      <h3 className="text-lg font-black text-slate-900">Applicant Tracking & Candidate Dossiers</h3>
                    </div>
                    <p className="text-slate-500">
                      Directly inspect applicant CGPA, verified skills, ATS resumes, and academic credentials
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-bold">
                    <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700">
                      Total: <strong>{applications.length}</strong>
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700">
                      Shortlisted: <strong>{applications.filter(a => a.status === 'Shortlisted').length}</strong>
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700">
                      Interviews: <strong>{applications.filter(a => a.status.includes('Interview')).length}</strong>
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700">
                      Offers: <strong>{applications.filter(a => a.status.includes('Selected')).length}</strong>
                    </span>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <div className="relative flex-1">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text"
                      value={appSearchTerm}
                      onChange={(e) => setAppSearchTerm(e.target.value)}
                      placeholder="Search candidate name, role, or verified skill (e.g. Java, React, Rahul)..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                    />
                    {appSearchTerm && (
                      <button 
                        onClick={() => setAppSearchTerm('')} 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5">
                      <Filter className="h-3.5 w-3.5 text-slate-400" />
                      <select 
                        value={appStatusFilter} 
                        onChange={(e) => setAppStatusFilter(e.target.value)}
                        className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer"
                      >
                        <option value="all">All Pipeline Stages</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview Scheduled</option>
                        <option value="Selected">Selected / Offer</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5">
                      <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                      <select 
                        value={appMinCgpa} 
                        onChange={(e) => setAppMinCgpa(e.target.value)}
                        className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer"
                      >
                        <option value="all">Any CGPA</option>
                        <option value="9.0">CGPA ≥ 9.0 (Top Honors)</option>
                        <option value="8.5">CGPA ≥ 8.5 (Distinction)</option>
                        <option value="8.0">CGPA ≥ 8.0</option>
                        <option value="7.5">CGPA ≥ 7.5</option>
                        <option value="7.0">CGPA ≥ 7.0</option>
                      </select>
                    </div>

                    {(appSearchTerm || appStatusFilter !== 'all' || appMinCgpa !== 'all') && (
                      <button 
                        onClick={() => {
                          setAppSearchTerm('');
                          setAppStatusFilter('all');
                          setAppMinCgpa('all');
                        }}
                        className="px-2.5 py-1.5 text-rose-600 hover:bg-rose-50 rounded-xl font-bold transition"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                {/* Candidate Applications Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-4">Applicant Profile</th>
                        <th className="py-3 px-3">CGPA & Standing</th>
                        <th className="py-3 px-3">Verified Skills</th>
                        <th className="py-3 px-3">ATS Resume</th>
                        <th className="py-3 px-3">Applied Role & Match</th>
                        <th className="py-3 px-3">Stage Status</th>
                        <th className="py-3 px-4 text-right">Recruiter Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredApplications.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-10 text-slate-400">
                            No applicants found matching the selected filters.
                          </td>
                        </tr>
                      ) : (
                        filteredApplications.map(app => {
                          const student = resolveStudent(app);
                          const isHighCgpa = student.cgpa >= 8.5;

                          return (
                            <tr key={app.id} className="hover:bg-slate-50/80 transition-colors group">
                              
                              {/* 1. Candidate Avatar, Name, Branch & Verification */}
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="relative cursor-pointer" onClick={() => { setProfileModalTab('overview'); setCandidateProfileModal(student); }}>
                                    <img 
                                      src={student.avatar} 
                                      alt={student.name} 
                                      className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-500/20 group-hover:ring-emerald-500 transition shadow-2xs" 
                                    />
                                    {student.collegeVerificationStatus === 'verified' && (
                                      <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5" title="College ID Verified">
                                        <Check className="h-2.5 w-2.5" />
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <div 
                                      onClick={() => { setProfileModalTab('overview'); setCandidateProfileModal(student); }}
                                      className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 cursor-pointer flex items-center gap-1.5 transition"
                                    >
                                      <span>{student.name}</span>
                                      <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold border border-emerald-200">
                                        Verified ID
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-slate-500">
                                      {student.degree || student.branch}
                                    </p>
                                    <p className="text-[10px] text-slate-400">
                                      {student.college} • {student.year}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              {/* 2. Cumulative CGPA & Academic Standing */}
                              <td className="py-3.5 px-3 whitespace-nowrap">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className={`px-2.5 py-0.5 rounded-md font-black text-xs ${
                                      isHighCgpa ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                      {student.cgpa} CGPA
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-500">
                                    {student.backlogs === 0 ? (
                                      <span className="text-emerald-600 flex items-center gap-0.5">
                                        <CheckCircle2 className="h-3 w-3" /> 0 Backlogs
                                      </span>
                                    ) : (
                                      <span className="text-amber-600 flex items-center gap-0.5">
                                        <AlertTriangle className="h-3 w-3" /> {student.backlogs} Active Backlog
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* 3. Verified Skills & Assessment Scores */}
                              <td className="py-3.5 px-3">
                                <div className="flex flex-wrap gap-1 max-w-xs">
                                  {student.skills?.slice(0, 3).map(sk => (
                                    <span 
                                      key={sk.name}
                                      onClick={() => { setProfileModalTab('skills'); setCandidateProfileModal(student); }}
                                      className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[10px] hover:bg-emerald-100 cursor-pointer transition"
                                      title={sk.verifiedReason || "Verified Skill"}
                                    >
                                      ✓ {sk.name} ({sk.score}%)
                                    </span>
                                  ))}
                                  {(student.skills?.length || 0) > 3 && (
                                    <span 
                                      onClick={() => { setProfileModalTab('skills'); setCandidateProfileModal(student); }}
                                      className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold text-[10px] cursor-pointer hover:bg-slate-200 transition"
                                    >
                                      +{student.skills.length - 3} more
                                    </span>
                                  )}
                                </div>
                              </td>

                              {/* 4. ATS Resume Card & Preview Link */}
                              <td className="py-3.5 px-3 whitespace-nowrap">
                                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 max-w-[190px] space-y-1.5">
                                  <div className="flex items-center gap-1.5">
                                    <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                                    <span className="font-semibold text-slate-800 text-[11px] truncate" title={student.resume?.fileName}>
                                      {student.resume?.fileName || `${student.name.replace(' ', '_')}_Resume.pdf`}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between gap-1 pt-0.5">
                                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-100/60 px-1.5 py-0.2 rounded">
                                      {student.resume?.atsScore || 85}% ATS
                                    </span>
                                    <div className="flex items-center gap-1">
                                      <button
                                        onClick={() => setActiveResumePreview(student)}
                                        className="px-1.5 py-0.5 rounded bg-white hover:bg-slate-200 text-slate-700 font-bold text-[10px] border flex items-center gap-0.5 transition"
                                        title="Preview formatted ATS resume document"
                                      >
                                        <Eye className="h-2.5 w-2.5" /> Preview
                                      </button>
                                      <button
                                        onClick={() => alert(`Downloading official PDF resume: ${student.resume?.fileName}`)}
                                        className="p-0.5 rounded bg-white hover:bg-slate-200 text-slate-600 border transition"
                                        title="Download PDF"
                                      >
                                        <Download className="h-3 w-3" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* 5. Applied Role & AI Match */}
                              <td className="py-3.5 px-3">
                                <div className="space-y-1">
                                  <p className="font-bold text-slate-800 text-xs">{app.jobTitle}</p>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                                      {app.aiScore || 90}% Match
                                    </span>
                                    <span className="font-semibold text-blue-600 text-[10px]">
                                      Readiness: {student.aiReadinessScore}/100
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* 6. Pipeline Status */}
                              <td className="py-3.5 px-3 whitespace-nowrap">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold inline-flex items-center gap-1 ${
                                  app.status.includes('Selected') 
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                                    : app.status === 'Rejected' 
                                    ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                                    : app.status.includes('Interview')
                                    ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                    : app.status === 'Shortlisted'
                                    ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                                }`}>
                                  {app.status.includes('Selected') && <CheckCircle2 className="h-3 w-3 text-emerald-600" />}
                                  {app.status.includes('Interview') && <Calendar className="h-3 w-3 text-purple-600" />}
                                  {app.status}
                                </span>
                              </td>

                              {/* 7. Recruiter Actions */}
                              <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1.5">
                                  
                                  {/* View Profile Button (The requested flagship feature) */}
                                  <button
                                    onClick={() => {
                                      setProfileModalTab('overview');
                                      setCandidateProfileModal(student);
                                    }}
                                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition flex items-center gap-1 shadow-2xs text-[11px]"
                                    title="View student complete profile, CGPA, verified skills, and resume"
                                  >
                                    <Eye className="h-3 w-3 text-emerald-400" />
                                    <span>View Profile</span>
                                  </button>

                                  {/* Quick Actions */}
                                  {app.status !== 'Shortlisted' && !app.status.includes('Selected') && app.status !== 'Rejected' && (
                                    <button
                                      onClick={() => {
                                        onShortlistCandidate(app.id);
                                        confetti({ particleCount: 40, spread: 40 });
                                        alert(`${app.studentName} shortlisted!`);
                                      }}
                                      className="px-2 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px] transition"
                                      title="Shortlist Candidate"
                                    >
                                      Shortlist
                                    </button>
                                  )}

                                  <button
                                    onClick={() => {
                                      setScheduleTargetApp(app);
                                      setIsScheduleModalOpen(true);
                                    }}
                                    className="px-2 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-[11px] transition"
                                    title="Schedule Interview"
                                  >
                                    Schedule
                                  </button>

                                  <button
                                    onClick={() => {
                                      handleSelectCandidateAction(app);
                                    }}
                                    className="px-2 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] transition"
                                    title="Roll Out Offer"
                                  >
                                    Select
                                  </button>

                                  <button
                                    onClick={() => {
                                      setRejectTargetApp(app);
                                      setIsRejectModalOpen(true);
                                    }}
                                    className="px-2 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] transition"
                                    title="Reject with Feedback"
                                  >
                                    Reject
                                  </button>
                                </div>
                              </td>

                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            );
          })()}

          {/* ============================================================ */}
          {/* TAB 5: INTERVIEWS                                            */}
          {/* ============================================================ */}
          {activeTab === 'interviews' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 animate-fade-in text-xs">
              <h3 className="text-lg font-black text-slate-900">Scheduled Interviews Pipeline</h3>
              <div className="space-y-3">
                {applications.filter(a => a.status.includes('Interview')).map(app => (
                  <div key={app.id} className="p-4 rounded-2xl border border-purple-200 bg-purple-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{app.studentName} — {app.jobTitle}</h4>
                        <p className="text-purple-700 font-semibold">{app.interviewDate} ({app.interviewStage})</p>
                        <p className="text-slate-500 mt-1">{app.recruiterFeedback}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleSelectCandidateAction(app)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shrink-0"
                    >
                      Roll Out Offer (Select)
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 6: HIRING RESULTS                                        */}
          {/* ============================================================ */}
          {activeTab === 'results' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 animate-fade-in text-xs">
              <h3 className="text-lg font-black text-slate-900">Hiring Results & Offers</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-2xl border">
                  <span className="text-slate-400 font-bold block text-[10px]">Interviewed</span>
                  <strong className="text-base font-black text-purple-700">18 Candidates</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border">
                  <span className="text-slate-400 font-bold block text-[10px]">Selected / Offers</span>
                  <strong className="text-base font-black text-emerald-600">12 Offers</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border">
                  <span className="text-slate-400 font-bold block text-[10px]">Rejected with Feedback</span>
                  <strong className="text-base font-black text-rose-600">6 Candidates</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border">
                  <span className="text-slate-400 font-bold block text-[10px]">Acceptance Rate</span>
                  <strong className="text-base font-black text-blue-600">91.6%</strong>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 7: ANALYTICS                                             */}
          {/* ============================================================ */}
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fade-in text-xs">
              <h3 className="text-lg font-black text-slate-900">Recruitment Analytics & ATS Performance</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-2xl border">
                  <span className="text-slate-400 font-bold block text-[10px]">Shortlist Rate</span>
                  <strong className="text-base font-black text-indigo-700">28.3%</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border">
                  <span className="text-slate-400 font-bold block text-[10px]">Interview Rate</span>
                  <strong className="text-base font-black text-purple-700">12.1%</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border">
                  <span className="text-slate-400 font-bold block text-[10px]">Selection Rate</span>
                  <strong className="text-base font-black text-emerald-600">8.1%</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border">
                  <span className="text-slate-400 font-bold block text-[10px]">Time-To-Hire</span>
                  <strong className="text-base font-black text-slate-900">14 Days</strong>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-sm text-slate-900 mb-3">Top Demanded Verified Skills Among Applicants</h4>
                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsSkillData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="skill" stroke="#94a3b8" fontSize={10} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#059669" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* CREATE HIRING MODAL (Supports College Hiring & Off-Campus) */}
      {isCreateHiringOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-scale-in text-xs max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b">
              <h3 className="font-black text-sm text-slate-900">Create New Hiring Opportunity</h3>
              <button onClick={() => setIsCreateHiringOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {/* Hiring Type Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl font-bold text-center text-xs">
              <button 
                type="button" 
                onClick={() => setHiringType('college')}
                className={`py-2 rounded-xl transition ${hiringType === 'college' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600'}`}
              >
                1. College Hiring (TPO Approval)
              </button>
              <button 
                type="button" 
                onClick={() => setHiringType('offcampus')}
                className={`py-2 rounded-xl transition ${hiringType === 'offcampus' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'}`}
              >
                2. Off-Campus Direct
              </button>
            </div>

            <p className="text-[11px] text-slate-500">
              {hiringType === 'college' 
                ? "Sends a request to College TPO. Once approved, the job appears in Student College Placements." 
                : "Publishes directly to Student Off-Campus Opportunities."}
            </p>

            <form onSubmit={handleCreateHiringSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Role Title</label>
                <input 
                  type="text" 
                  value={hiringForm.role}
                  onChange={(e) => setHiringForm({ ...hiringForm, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Salary Package</label>
                  <input 
                    type="text" 
                    value={hiringForm.salary}
                    onChange={(e) => setHiringForm({ ...hiringForm, salary: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location</label>
                  <input 
                    type="text" 
                    value={hiringForm.location}
                    onChange={(e) => setHiringForm({ ...hiringForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Required Skills (Comma-separated)</label>
                <input 
                  type="text" 
                  value={hiringForm.requiredSkills}
                  onChange={(e) => setHiringForm({ ...hiringForm, requiredSkills: e.target.value })}
                  placeholder="Java, Spring Boot, SQL"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Eligibility Criteria</label>
                  <input 
                    type="text" 
                    value={hiringForm.eligibility}
                    onChange={(e) => setHiringForm({ ...hiringForm, eligibility: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Application Deadline</label>
                  <input 
                    type="date" 
                    value={hiringForm.deadline}
                    onChange={(e) => setHiringForm({ ...hiringForm, deadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsCreateHiringOpen(false)} className="px-3.5 py-1.5 rounded-xl border font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-xs">
                  {hiringType === 'college' ? 'Submit to College TPO →' : 'Publish Off-Campus Job →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCHEDULE INTERVIEW MODAL */}
      {isScheduleModalOpen && scheduleTargetApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-scale-in text-xs">
            <div className="flex items-center justify-between pb-2 border-b">
              <h3 className="font-bold text-sm text-slate-900">Schedule Interview Round</h3>
              <button onClick={() => setIsScheduleModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <p className="text-slate-600">
              Candidate: <strong>{scheduleTargetApp.studentName}</strong> for <strong>{scheduleTargetApp.jobTitle}</strong>
            </p>

            <form onSubmit={handleScheduleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date</label>
                  <input 
                    type="date" 
                    value={scheduleData.date}
                    onChange={(e) => setScheduleData({ ...scheduleData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Time</label>
                  <input 
                    type="text" 
                    value={scheduleData.time}
                    onChange={(e) => setScheduleData({ ...scheduleData, time: e.target.value })}
                    placeholder="02:30 PM"
                    className="w-full px-3 py-2 rounded-xl border font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Interview Stage</label>
                <select 
                  value={scheduleData.stage}
                  onChange={(e) => setScheduleData({ ...scheduleData, stage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border font-medium"
                >
                  <option value="Technical Round 1 (Java & Architecture)">Technical Round 1 (Java & Architecture)</option>
                  <option value="Technical Round 2 (DSA & Live Problem Solving)">Technical Round 2 (DSA & Live Problem Solving)</option>
                  <option value="Managerial & System Design Round">Managerial & System Design Round</option>
                  <option value="HR / Cultural Fitment Round">HR / Cultural Fitment Round</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Recruiter Preparation Note to Student</label>
                <textarea 
                  rows={3}
                  value={scheduleData.feedback}
                  onChange={(e) => setScheduleData({ ...scheduleData, feedback: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border font-medium outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button type="button" onClick={() => setIsScheduleModalOpen(false)} className="px-3.5 py-1.5 rounded-xl border font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1.5 rounded-xl bg-purple-600 text-white font-bold">
                  Confirm & Notify Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STRUCTURED REJECTION MODAL (Allows Reason + What to improve) */}
      {isRejectModalOpen && rejectTargetApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-scale-in text-xs">
            <div className="flex items-center justify-between pb-2 border-b">
              <h3 className="font-bold text-sm text-slate-900">Record Constructive Rejection Feedback</h3>
              <button onClick={() => setIsRejectModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <p className="text-slate-600">
              Candidate: <strong>{rejectTargetApp.studentName}</strong> • Feedback will be delivered to the student to guide improvement.
            </p>

            <form onSubmit={handleRejectSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Primary Rejection Reason</label>
                <select 
                  value={rejectForm.reason}
                  onChange={(e) => setRejectForm({ ...rejectForm, reason: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border font-medium"
                >
                  <option value="Required Skill Missing">Required Skill Missing</option>
                  <option value="Low Skill Match">Low Skill Match</option>
                  <option value="Eligibility">Eligibility Criteria Not Met</option>
                  <option value="Insufficient Experience">Insufficient Project / Internship Experience</option>
                  <option value="Resume">Resume / Portfolio Unclear</option>
                  <option value="Assessment">Technical Assessment Score Below Cutoff</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Specific Feedback & What to Improve</label>
                <textarea 
                  rows={3}
                  value={rejectForm.customNotes}
                  onChange={(e) => setRejectForm({ ...rejectForm, customNotes: e.target.value })}
                  placeholder="e.g. Needs deeper hands-on implementation in Spring Security and AWS deployment."
                  className="w-full px-3 py-2 rounded-xl border font-medium outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Recommended Learning Roadmap Step</label>
                <input 
                  type="text" 
                  value={rejectForm.recommendedRoadmap}
                  onChange={(e) => setRejectForm({ ...rejectForm, recommendedRoadmap: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border font-medium"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button type="button" onClick={() => setIsRejectModalOpen(false)} className="px-3.5 py-1.5 rounded-xl border font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1.5 rounded-xl bg-rose-600 text-white font-bold">
                  Submit Feedback to Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. COMPREHENSIVE ATS CANDIDATE PROFILE & DOSSIER MODAL        */}
      {/* ============================================================ */}
      {candidateProfileModal && (() => {
        const student = resolveStudent(candidateProfileModal);
        const appliedApp = candidateProfileModal.appliedApp || applications.find(a => a.studentId === student.id || a.studentName === student.name) || applications[0];

        return (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full my-auto overflow-hidden animate-scale-in text-xs flex flex-col max-h-[92vh]">
              
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950 text-white p-6 relative">
                <button 
                  onClick={() => setCandidateProfileModal(null)} 
                  className="absolute top-5 right-5 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition font-bold"
                >
                  ✕
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pr-8">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={student.avatar} 
                        alt={student.name} 
                        className="h-18 w-18 sm:h-20 sm:w-20 rounded-2xl object-cover ring-4 ring-emerald-500/40 shadow-lg" 
                      />
                      {student.collegeVerificationStatus === 'verified' && (
                        <span className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-white rounded-full p-1 shadow" title="College Verified ID">
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">{student.name}</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3" /> College Verified ID: {student.enrollmentNo}
                        </span>
                      </div>
                      
                      <p className="text-xs text-emerald-200 font-semibold">{student.targetRole}</p>
                      <p className="text-xs text-slate-300 flex flex-wrap items-center gap-2">
                        <span>{student.degree || student.branch}</span>
                        <span>•</span>
                        <span>{student.college}</span>
                        <span>•</span>
                        <span>{student.year}</span>
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-300">
                        <span className="flex items-center gap-1"><Mail className="h-3 w-3 text-slate-400" /> {student.email}</span>
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3 text-slate-400" /> {student.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Top Stats Cards */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 shrink-0">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-slate-300 uppercase tracking-wider block font-bold">Academic Standing</span>
                      <div className="flex items-center gap-1.5 sm:justify-end">
                        <span className="text-xl font-black text-emerald-400">{student.cgpa}</span>
                        <span className="text-xs text-slate-300 font-semibold">/ 10.0 CGPA</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-300 block">
                        {student.backlogs === 0 ? "✓ 0 Active Backlogs" : `${student.backlogs} Active Backlog`}
                      </span>
                    </div>

                    <div className="text-right border-l sm:border-l-0 sm:border-t border-white/10 pl-3 sm:pl-0 sm:pt-1.5">
                      <span className="text-[10px] text-slate-300 uppercase tracking-wider block font-bold">AI Readiness Score</span>
                      <span className="text-base font-black text-blue-300">{student.aiReadinessScore}<span className="text-xs font-medium text-slate-400">/100</span></span>
                    </div>
                  </div>
                </div>

                {/* Dossier Tabs Header */}
                <div className="flex items-center gap-2 mt-5 -mb-6 border-b border-white/10 pt-2">
                  {[
                    { id: 'overview', label: 'Resume & Overview', icon: FileText },
                    { id: 'skills', label: `Verified Skills (${student.skills?.length || 0})`, icon: BadgeCheck },
                    { id: 'projects', label: `Projects (${student.projects?.length || 0})`, icon: FolderGit2 },
                    { id: 'experience', label: `Experience & Credentials`, icon: Briefcase }
                  ].map(tab => {
                    const TabIcon = tab.icon;
                    const isActive = profileModalTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setProfileModalTab(tab.id)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 font-bold text-xs rounded-t-xl transition ${
                          isActive 
                            ? 'bg-white text-slate-900 shadow-sm' 
                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <TabIcon className={`h-3.5 w-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dossier Body (Scrollable) */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">

                {/* ---------------- TAB 1: RESUME & OVERVIEW ---------------- */}
                {profileModalTab === 'overview' && (
                  <div className="space-y-6 animate-fade-in">
                    
                    {/* Official ATS Resume Card */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-sm text-slate-900">{student.resume?.fileName || `${student.name.replace(' ', '_')}_Software_Resume.pdf`}</h4>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                                {student.resume?.atsScore || 85}% ATS Match
                              </span>
                            </div>
                            <p className="text-slate-500 text-[11px]">
                              Updated: {student.resume?.lastUpdated || '2026-09-10'} • Size: {student.resume?.fileSize || '420 KB'} • Single-column ATS Optimized
                            </p>
                          </div>
                        </div>

                        {/* Resume Actions */}
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => setActiveResumePreview(student)}
                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition flex items-center gap-1.5 shadow-2xs"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>Preview Full ATS Resume</span>
                          </button>
                          <button
                            onClick={() => alert(`Downloading verified resume file: ${student.resume?.fileName || 'Resume.pdf'}`)}
                            className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold transition flex items-center gap-1.5"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>Download PDF</span>
                          </button>
                        </div>
                      </div>

                      {/* Quick Snapshot inside Resume Card */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-slate-400 font-bold block text-[10px] uppercase">Education Track</span>
                          <p className="font-bold text-slate-800 text-xs mt-0.5">{student.degree}</p>
                          <p className="text-[11px] text-slate-500">{student.college}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-slate-400 font-bold block text-[10px] uppercase">Cumulative CGPA</span>
                          <p className="font-extrabold text-slate-800 text-xs mt-0.5">{student.cgpa} / 10.0 (Honors)</p>
                          <p className="text-[11px] text-emerald-600 font-semibold">0 Active Backlogs (Clean Record)</p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-slate-400 font-bold block text-[10px] uppercase">Target Job Profile</span>
                          <p className="font-bold text-slate-800 text-xs mt-0.5">{student.targetRole}</p>
                          <p className="text-[11px] text-blue-600 font-semibold">AI Readiness: {student.aiReadinessScore}/100</p>
                        </div>
                      </div>
                    </div>

                    {/* AI Assessment & Candidate Match Reasons */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-emerald-600" />
                        <h4 className="font-extrabold text-sm text-slate-900">AI Role Match & Recruiter Evaluation</h4>
                        <span className="ml-auto px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-black border border-emerald-200 text-[10px]">
                          {appliedApp?.aiScore || 92}% Compatibility
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                        <p className="font-bold text-emerald-950">Key Strengths Verified in Candidate Dossier:</p>
                        <ul className="space-y-1.5 text-slate-700">
                          {student.matchReasons?.map((reason, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {appliedApp?.recruiterFeedback && (
                        <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100 text-[11px]">
                          <span className="font-bold text-purple-900 block mb-0.5">Recruiter Notes / Stage Feedback:</span>
                          <p className="text-purple-800">{appliedApp.recruiterFeedback}</p>
                        </div>
                      )}
                    </div>

                    {/* Top Skills Preview */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-sm text-slate-900">Verified Technical Skills Breakdown</h4>
                        <button 
                          onClick={() => setProfileModalTab('skills')}
                          className="text-emerald-700 font-bold hover:underline"
                        >
                          View All ({student.skills?.length || 0}) →
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {student.skills?.map(sk => (
                          <div key={sk.name} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900">{sk.name}</span>
                              <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                                sk.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {sk.status === 'verified' ? `✓ ${sk.score}%` : 'Pending'}
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-emerald-500 h-full rounded-full transition-all"
                                style={{ width: `${sk.score || 70}%` }}
                              />
                            </div>
                            <p className="text-[10px] text-slate-500 truncate" title={sk.verifiedReason}>
                              {sk.verifiedReason || "Verified proficiency"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* ---------------- TAB 2: VERIFIED SKILLS ---------------- */}
                {profileModalTab === 'skills' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-center justify-between">
                      <div>
                        <h4 className="font-black text-sm text-emerald-950">Proctored & Evidence-Verified Skill Matrix</h4>
                        <p className="text-emerald-800 text-[11px]">
                          Each verified skill includes standardized test scores and authentic proof of implementation.
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-black text-xs shadow-xs">
                        {student.skills?.filter(s => s.status === 'verified').length} / {student.skills?.length} Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {student.skills?.map(sk => (
                        <div key={sk.name} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-extrabold text-sm text-slate-900">{sk.name}</h5>
                              <span className="text-[10px] text-slate-400 font-semibold">{sk.level || "Intermediate Level"}</span>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full font-black text-xs flex items-center gap-1 ${
                              sk.status === 'verified' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}>
                              {sk.status === 'verified' ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                              {sk.status === 'verified' ? `Verified (${sk.score}%)` : 'Needs Assessment'}
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-bold text-slate-500">
                              <span>Assessment Percentile</span>
                              <span className="text-emerald-700 font-extrabold">{sk.score || 60}%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                              <div 
                                className="bg-emerald-600 h-full rounded-full transition-all"
                                style={{ width: `${sk.score || 60}%` }}
                              />
                            </div>
                          </div>

                          {/* Verification Evidence */}
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                            <strong className="text-slate-800 block text-[10px] uppercase font-bold mb-0.5">Verification Source:</strong>
                            <p>{sk.verifiedReason || "Verified via automated codebase inspection and timed assessment."}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ---------------- TAB 3: PROJECTS ---------------- */}
                {profileModalTab === 'projects' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-black text-sm text-slate-900">Student Production Projects & Repositories</h4>
                        <p className="text-slate-500 text-[11px]">Demonstrated practical engineering work with live demos and source code</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {student.projects?.map(proj => (
                        <div key={proj.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="font-extrabold text-sm text-slate-900">{proj.title}</h5>
                                {proj.verified && (
                                  <span className="px-2 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px] flex items-center gap-0.5">
                                    <Check className="h-2.5 w-2.5" /> Codebase Verified
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 mt-0.5">Architecture & Implementation</p>
                            </div>

                            <div className="flex items-center gap-2">
                              {proj.github && (
                                <a 
                                  href={proj.github} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold flex items-center gap-1.5 transition text-[11px]"
                                >
                                  <GitBranch className="h-3.5 w-3.5" />
                                  <span>View Code</span>
                                </a>
                              )}
                              {proj.liveDemo && (
                                <a 
                                  href={proj.liveDemo} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1.5 transition text-[11px]"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                  <span>Live Demo</span>
                                </a>
                              )}
                            </div>
                          </div>

                          <p className="text-slate-700 text-xs leading-relaxed">{proj.desc}</p>

                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-slate-400 font-bold text-[10px] mr-1">Stack:</span>
                            {proj.tech?.map(t => (
                              <span key={t} className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-bold text-[10px]">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ---------------- TAB 4: EXPERIENCE & CREDENTIALS ---------------- */}
                {profileModalTab === 'experience' && (
                  <div className="space-y-6 animate-fade-in">
                    
                    {/* Internships */}
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-purple-600" />
                        <span>Internship & Practical Experience</span>
                      </h4>

                      {(!student.internships || student.internships.length === 0) ? (
                        <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-400 text-center">
                          No prior corporate internships recorded. Strong focus on academic & open-source projects.
                        </div>
                      ) : (
                        student.internships.map(intern => (
                          <div key={intern.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-2">
                              <div>
                                <h5 className="font-extrabold text-sm text-slate-900">{intern.role}</h5>
                                <p className="text-slate-600 font-bold text-xs">{intern.company} • {intern.location}</p>
                              </div>
                              <div className="text-left sm:text-right">
                                <span className="font-semibold text-slate-500 text-[11px] block">{intern.duration}</span>
                                {intern.stipend && (
                                  <span className="text-emerald-700 font-bold text-[11px]">Stipend: {intern.stipend}</span>
                                )}
                              </div>
                            </div>
                            <p className="text-slate-700 text-xs leading-relaxed">{intern.desc}</p>
                            {intern.completionLetterVerified && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                <CheckCircle2 className="h-3 w-3" /> Completion Certificate & Letter of Recommendation Verified
                              </span>
                            )}
                          </div>
                        ))
                      )}
                    </div>

                    {/* Certifications */}
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                        <Award className="h-4 w-4 text-amber-500" />
                        <span>Verified Professional Certifications</span>
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {student.certificates?.map(cert => (
                          <div key={cert.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                            <div className="flex items-center justify-between">
                              <h5 className="font-extrabold text-slate-900 text-xs">{cert.title}</h5>
                              <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                                Verified
                              </span>
                            </div>
                            <p className="text-slate-500 text-[11px] font-semibold">{cert.issuer} • {cert.date}</p>
                            <p className="text-[10px] text-slate-400 font-mono">Credential ID: {cert.credentialId}</p>
                            {cert.evidence && (
                              <p className="text-[10px] text-emerald-700 font-medium">✓ {cert.evidence}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

              </div>

              {/* Recruiter Action Footer (Direct Action Trigger from Modal) */}
              <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-[11px] font-bold">Candidate:</span>
                  <strong className="text-slate-900 text-xs">{student.name}</strong>
                  <span className="text-slate-400">•</span>
                  <span className="text-emerald-700 font-black">{student.cgpa} CGPA</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-blue-600 font-bold">{student.aiReadinessScore}/100 Readiness</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCandidateProfileModal(null)}
                    className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold transition"
                  >
                    Close
                  </button>

                  <button
                    onClick={() => {
                      onShortlistCandidate(appliedApp.id);
                      confetti({ particleCount: 50, spread: 50 });
                      alert(`${student.name} has been Shortlisted!`);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition shadow-2xs"
                  >
                    Shortlist
                  </button>

                  <button
                    onClick={() => {
                      setScheduleTargetApp(appliedApp);
                      setIsScheduleModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition shadow-2xs flex items-center gap-1"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Schedule Interview</span>
                  </button>

                  <button
                    onClick={() => {
                      setRejectTargetApp(appliedApp);
                      setIsRejectModalOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold transition"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => {
                      handleSelectCandidateAction(appliedApp);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black transition shadow-md"
                  >
                    Select / Roll Out Offer
                  </button>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

      {/* ============================================================ */}
      {/* 2. ATS INTERACTIVE RESUME VIEWER MODAL                        */}
      {/* ============================================================ */}
      {activeResumePreview && (() => {
        const student = resolveStudent(activeResumePreview);

        return (
          <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full my-auto overflow-hidden animate-scale-in text-xs flex flex-col max-h-[92vh]">
              
              {/* Modal Bar */}
              <div className="bg-slate-900 text-white p-4 px-6 flex items-center justify-between border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <div>
                    <h3 className="font-black text-sm text-white">{student.resume?.fileName || `${student.name.replace(' ', '_')}_Resume.pdf`}</h3>
                    <p className="text-[11px] text-slate-400">Single-Column ATS Verified Layout • {student.resume?.atsScore || 85}% Parser Score</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-1 transition text-[11px]"
                  >
                    <Printer className="h-3 w-3" />
                    <span>Print / Save</span>
                  </button>
                  <button
                    onClick={() => setActiveResumePreview(null)}
                    className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Formatted ATS Resume Document Sheet */}
              <div className="p-8 overflow-y-auto space-y-6 bg-white font-sans text-slate-900">
                
                {/* 1. Resume Header */}
                <div className="text-center border-b border-slate-300 pb-4 space-y-1">
                  <h2 className="text-2xl font-black uppercase tracking-tight text-slate-950">{student.name}</h2>
                  <p className="text-xs font-semibold text-slate-600">{student.targetRole} • 2026 Graduating Cohort</p>
                  <p className="text-[11px] text-slate-500 flex flex-wrap items-center justify-center gap-3 pt-1">
                    <span>{student.email}</span>
                    <span>•</span>
                    <span>{student.phone}</span>
                    <span>•</span>
                    <span>github.com/{student.name.toLowerCase().replace(' ', '')}</span>
                    <span>•</span>
                    <span>Apex Institute Campus, IN</span>
                  </p>
                </div>

                {/* 2. Professional Summary */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1">
                    Professional Summary
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    Proactive engineering student graduating in 2026 with a strong cumulative CGPA of {student.cgpa}/10.0 and 0 active backlogs. 
                    Proficient in {student.skills?.slice(0, 4).map(s => s.name).join(', ')}. Demonstrated hands-on software development experience 
                    through verified enterprise projects, automated unit testing, and production microservice deployments.
                  </p>
                </div>

                {/* 3. Education & Academic Details */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1">
                    Education & Academic Standing
                  </h4>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-extrabold text-xs text-slate-900">{student.degree}</p>
                      <p className="text-[11px] text-slate-600">{student.college}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-xs text-emerald-700">Cumulative CGPA: {student.cgpa} / 10.0</p>
                      <p className="text-[11px] text-slate-500">{student.year} • 0 Backlogs</p>
                    </div>
                  </div>
                </div>

                {/* 4. Technical Skills */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1">
                    Technical Skills & Tools
                  </h4>
                  <div className="space-y-1 text-[11px]">
                    <p><strong className="text-slate-900">Verified Programming & Frameworks:</strong> {student.skills?.map(s => `${s.name} (${s.score}%)`).join(', ')}</p>
                    <p><strong className="text-slate-900">Database & Cloud:</strong> PostgreSQL, MySQL, MongoDB, Docker, Git, REST APIs</p>
                    <p><strong className="text-slate-900">Methodologies:</strong> Agile/Scrum, CI/CD Pipelines, Microservices Architecture, Unit Testing</p>
                  </div>
                </div>

                {/* 5. Experience / Internships */}
                {student.internships && student.internships.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1">
                      Professional Work Experience
                    </h4>
                    {student.internships.map(intern => (
                      <div key={intern.id} className="space-y-1">
                        <div className="flex items-start justify-between">
                          <p className="font-bold text-xs text-slate-900">{intern.role} — <span className="font-semibold text-slate-700">{intern.company}</span></p>
                          <p className="text-[11px] text-slate-500 font-semibold">{intern.duration}</p>
                        </div>
                        <p className="text-slate-700 text-[11px] leading-relaxed pl-2 border-l-2 border-slate-300">
                          {intern.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 6. Technical Projects */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1">
                    Key Technical Projects
                  </h4>
                  {student.projects?.map(proj => (
                    <div key={proj.id} className="space-y-1">
                      <div className="flex items-start justify-between">
                        <p className="font-bold text-xs text-slate-900">
                          {proj.title} <span className="text-[10px] font-normal text-slate-500">[{proj.tech?.join(', ')}]</span>
                        </p>
                        <span className="text-[10px] font-bold text-emerald-700">Verified Repo</span>
                      </div>
                      <p className="text-slate-700 text-[11px] leading-relaxed pl-2 border-l-2 border-slate-300">
                        {proj.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* 7. Certifications */}
                {student.certificates && student.certificates.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1">
                      Certifications & Credentials
                    </h4>
                    <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-1">
                      {student.certificates.map(cert => (
                        <li key={cert.id}>
                          <strong className="text-slate-900">{cert.title}</strong> — {cert.issuer} ({cert.date}) [ID: {cert.credentialId}]
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
                <span className="text-[11px] text-slate-500">
                  CareerBridge Proctored Skill & Resume Verification Engine
                </span>
                <button
                  onClick={() => setActiveResumePreview(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition"
                >
                  Close Resume Preview
                </button>
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
}
