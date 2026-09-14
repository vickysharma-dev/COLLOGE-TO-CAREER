import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PosterMasterView from './components/PosterMasterView';
import StudentPortal from './components/StudentPortal/StudentPortal';
import CollegePortal from './components/CollegePortal/CollegePortal';
import CompanyPortal from './components/CompanyPortal/CompanyPortal';
import EcosystemOverview from './components/EcosystemOverview';
import AiAssistantModal from './components/AiAssistantModal';
import { api } from './services/api';
import { Bot, Sparkles, LayoutGrid, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState('poster'); // 'poster' | 'student' | 'college' | 'company' | 'ecosystem'
  const [student, setStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [collegeData, setCollegeData] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Sync state loader
  const reloadState = async () => {
    try {
      const [std, allStd, col, opps, apps] = await Promise.all([
        api.getStudent('std-001'),
        api.getStudents(),
        api.getCollegeData(),
        api.getOpportunities(),
        api.getApplications()
      ]);
      setStudent(std);
      setStudents(allStd);
      setCollegeData(col);
      setOpportunities(opps);
      setApplications(apps);
    } catch (e) {
      console.error("Data load error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadState();
  }, []);

  // Actions
  const handleApply = async (studentId, jobId) => {
    const newApp = await api.applyToOpportunity(studentId, jobId);
    await reloadState();
    return newApp;
  };

  const handleToggleRoadmap = async (stepId) => {
    const updated = await api.toggleRoadmapStep(stepId);
    setStudent({ ...updated });
  };

  const handleToggleSaveJob = async (jobId) => {
    await api.toggleSaveJob(jobId);
    await reloadState();
  };

  const handleUpdateProfile = async (updates) => {
    const updated = await api.updateStudentProfile(updates);
    setStudent({ ...updated });
    await reloadState();
  };

  const handleRequestSkillVerify = async (skillName, evidence) => {
    await api.requestSkillVerification(skillName, evidence);
    await reloadState();
  };

  const handleProcessStudentVerification = async (requestId, action) => {
    await api.processStudentVerification(requestId, action);
    await reloadState();
  };

  const handleProcessCompanyRequest = async (requestId, action) => {
    await api.processCompanyRequest(requestId, action);
    await reloadState();
  };

  const handleCreateDrive = async (driveData) => {
    await api.createPlacementDrive(driveData);
    await reloadState();
  };

  const handlePostHiring = async (hiringData, type) => {
    await api.createHiring(hiringData, type);
    await reloadState();
  };

  const handleShortlistCandidate = async (appId) => {
    await api.shortlistCandidate(appId);
    await reloadState();
  };

  const handleScheduleInterview = async (appId, date, time, stage, feedback) => {
    await api.scheduleCandidateInterview(appId, date, time, stage, feedback);
    await reloadState();
  };

  const handleRejectCandidate = async (appId, reason, suggestions, roadmap) => {
    await api.rejectCandidate(appId, reason, suggestions, roadmap);
    await reloadState();
  };

  const handleSelectCandidate = async (appId) => {
    await api.selectCandidate(appId);
    await reloadState();
  };

  const handleSendChatQuery = async (msg, stdContext) => {
    return await api.sendChatMessage(msg, stdContext);
  };

  if (loading || !student || !collegeData) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center animate-bounce shadow-xl shadow-blue-500/30 mb-4">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Initializing CareerBridge...</h2>
        <p className="text-slate-400 text-xs mt-1">From Campus to Career, Smarter.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6fb] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Floating Control Bar to easily jump between exact Poster & Full Portals */}
      <div className="bg-slate-900 text-white px-4 py-2.5 text-xs flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-blue-400">CareerBridge Ecosystem:</span>
          <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-xl">
            <button
              onClick={() => setCurrentRole('poster')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                currentRole === 'poster' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              🖼️ Master Blueprint Poster
            </button>
            <button
              onClick={() => setCurrentRole('student')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                currentRole === 'student' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              🎓 Student Portal
            </button>
            <button
              onClick={() => setCurrentRole('college')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                currentRole === 'college' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              🏛️ College Portal (TPO)
            </button>
            <button
              onClick={() => setCurrentRole('company')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                currentRole === 'company' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              🏢 Company Portal (ATS)
            </button>
          </div>
        </div>

        <button 
          onClick={() => setIsChatOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-sm text-white"
        >
          <Bot className="h-3.5 w-3.5" />
          <span>AI Career Coach Chat</span>
        </button>
      </div>

      {/* Main View Router */}
      <div className="flex-1 w-full">
        {currentRole === 'poster' && (
          <PosterMasterView
            student={student}
            collegeData={collegeData}
            opportunities={opportunities}
            applications={applications}
            onOpenPortal={(portalId) => setCurrentRole(portalId)}
            onOpenChat={() => setIsChatOpen(true)}
            onApplyJob={handleApply}
          />
        )}

        {currentRole !== 'poster' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
              <button 
                onClick={() => setCurrentRole('poster')}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>← Back to Master Blueprint Poster</span>
              </button>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Active: {currentRole.toUpperCase()} PORTAL
              </span>
            </div>

            {currentRole === 'student' && (
              <StudentPortal
                student={student}
                opportunities={opportunities}
                applications={applications.filter(a => a.studentId === student.id)}
                onApply={handleApply}
                onToggleRoadmap={handleToggleRoadmap}
                onToggleSaveJob={handleToggleSaveJob}
                onUpdateProfile={handleUpdateProfile}
                onRequestSkillVerify={handleRequestSkillVerify}
                onSendChatQuery={handleSendChatQuery}
              />
            )}

            {currentRole === 'college' && (
              <CollegePortal
                collegeData={collegeData}
                students={students}
                applications={applications}
                onCreateDrive={handleCreateDrive}
                onProcessStudentVerification={handleProcessStudentVerification}
                onProcessCompanyRequest={handleProcessCompanyRequest}
              />
            )}

            {currentRole === 'company' && (
              <CompanyPortal
                students={students}
                opportunities={opportunities}
                applications={applications}
                onPostHiring={handlePostHiring}
                onShortlistCandidate={handleShortlistCandidate}
                onScheduleInterview={handleScheduleInterview}
                onRejectCandidate={handleRejectCandidate}
                onSelectCandidate={handleSelectCandidate}
              />
            )}

            {currentRole === 'ecosystem' && (
              <EcosystemOverview 
                onSelectRole={(role) => setCurrentRole(role)}
                studentData={student}
                collegeData={collegeData}
                opportunities={opportunities}
              />
            )}
          </div>
        )}
      </div>

      {/* Floating AI Assistant Trigger */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-2xl shadow-blue-600/40 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group"
      >
        <div className="relative">
          <Bot className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-blue-600 animate-pulse" />
        </div>
        <span className="text-xs font-bold tracking-wide pr-1">AI Career Coach</span>
      </button>

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        student={student}
        onSendQuery={handleSendChatQuery}
      />

    </div>
  );
}
