import express from 'express';
import cors from 'cors';
import { initialData } from './data/mockData.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory persistent state (seeded from initialData)
let database = JSON.parse(JSON.stringify(initialData));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', platform: 'CareerBridge API', timestamp: new Date().toISOString() });
});

// Students API
app.get('/api/students', (req, res) => {
  res.json(database.students);
});

app.get('/api/students/:id', (req, res) => {
  const student = database.students.find(s => s.id === req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
});

app.put('/api/students/:id', (req, res) => {
  const index = database.students.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Student not found' });
  database.students[index] = { ...database.students[index], ...req.body };
  res.json(database.students[index]);
});

// College Portal API
app.get('/api/college', (req, res) => {
  res.json(database.collegeOverview);
});

app.post('/api/college/drives', (req, res) => {
  const newDrive = {
    id: `drv-${Date.now()}`,
    ...req.body,
    status: 'Active'
  };
  database.collegeOverview.upcomingDrives.unshift(newDrive);
  res.status(201).json(newDrive);
});

// Opportunities (Jobs & Internships)
app.get('/api/opportunities', (req, res) => {
  const { category, type } = req.query;
  let results = database.opportunities;
  if (category) {
    results = results.filter(op => op.category.toLowerCase() === category.toLowerCase());
  }
  if (type) {
    results = results.filter(op => op.type.toLowerCase().includes(type.toLowerCase()));
  }
  res.json(results);
});

app.post('/api/opportunities', (req, res) => {
  const newOpp = {
    id: `job-${Date.now()}`,
    ...req.body,
    status: 'Open',
    matchScore: Math.floor(Math.random() * 20) + 75 // dynamically generated match score
  };
  database.opportunities.unshift(newOpp);
  res.status(201).json(newOpp);
});

// Applications API
app.get('/api/applications', (req, res) => {
  const { studentId } = req.query;
  if (studentId) {
    return res.json(database.applications.filter(a => a.studentId === studentId));
  }
  res.json(database.applications);
});

app.post('/api/applications', (req, res) => {
  const { studentId, jobId } = req.body;
  const student = database.students.find(s => s.id === studentId) || database.students[0];
  const job = database.opportunities.find(j => j.id === jobId);

  if (!job) return res.status(404).json({ error: 'Opportunity not found' });

  // Prevent duplicate applications
  const existing = database.applications.find(a => a.studentId === student.id && a.jobId === job.id);
  if (existing) {
    return res.status(400).json({ error: 'Already applied to this opportunity' });
  }

  const newApplication = {
    id: `app-${Date.now()}`,
    studentId: student.id,
    studentName: student.name,
    jobId: job.id,
    jobTitle: job.title,
    company: job.company,
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'Under Review',
    interviewDate: null,
    aiScore: job.matchScore || 85,
    feedback: 'Application submitted. AI matching evaluation completed.'
  };

  database.applications.unshift(newApplication);
  student.activeApplicationsCount = (student.activeApplicationsCount || 0) + 1;
  res.status(201).json(newApplication);
});

app.put('/api/applications/:id/status', (req, res) => {
  const { status, interviewDate, feedback } = req.body;
  const appIndex = database.applications.findIndex(a => a.id === req.params.id);
  if (appIndex === -1) return res.status(404).json({ error: 'Application not found' });

  database.applications[appIndex] = {
    ...database.applications[appIndex],
    status: status || database.applications[appIndex].status,
    interviewDate: interviewDate !== undefined ? interviewDate : database.applications[appIndex].interviewDate,
    feedback: feedback || database.applications[appIndex].feedback
  };

  res.json(database.applications[appIndex]);
});

// AI Career Assistant Chat API
app.post('/api/ai/chat', (req, res) => {
  const { message, studentContext } = req.body;
  const query = (message || '').toLowerCase();
  
  let reply = "";
  let actionSuggestions = [];

  if (query.includes('dsa') || query.includes('algorithm') || query.includes('data structure')) {
    reply = "Aapka DSA currently Beginner level par hai (score 55%). Main recommend karunga ki pehle **Arrays, Strings, Two Pointers** master karein, fir **Trees and Graphs** par move karein. Daily 2 LeetCode easy/medium problems solve karein. Isse aapka AI Readiness Score 78 se 88+ ho jayega!";
    actionSuggestions = [
      "View DSA in Roadmap",
      "Take DSA Assessment",
      "Explore Top 50 LeetCode Questions"
    ];
  } else if (query.includes('internship') || query.includes('kaunsi') || query.includes('best')) {
    reply = "Aapke verified skills **Java, Spring Boot aur SQL** hain. Aapke liye sabse high-match internship **Wipro Java Developer Intern (94% Match)** aur **Accenture Backend Developer (92% Match)** hain. Inme direct PPO opportunity bhi hai!";
    actionSuggestions = [
      "Apply to Wipro (94% Match)",
      "Apply to Accenture (92% Match)",
      "View all matching internships"
    ];
  } else if (query.includes('resume') || query.includes('cv') || query.includes('ats')) {
    reply = "Aapke resume mein **Spring Boot REST APIs** aur **SQL Indexing** projects clearly quantified hone chahiye. For example: *'Engineered high-throughput REST APIs handling 5,000+ requests with sub-100ms latency'*. AWS project add karne se TCS aur Infosys ke liye shortlist probability 30% badh jayegi!";
    actionSuggestions = [
      "Scan Resume with AI ATS",
      "Add Quantifiable Achievements",
      "Download Standard Tech Template"
    ];
  } else if (query.includes('java developer') || query.includes('kaise bane') || query.includes('roadmap')) {
    reply = "Java Developer banne ke liye aapka path 60% complete hai! \n1. **Core Java & OOP** (Done ✅)\n2. **Collections & Streams** (Done ✅)\n3. **SQL & Database** (Done ✅)\n4. **Spring Boot & Microservices** (In Progress - 45% ⏳)\n5. **DSA & System Design basics** (Action needed ⚠️). Next step: Spring Security aur Docker add karein!";
    actionSuggestions = [
      "Open Java Roadmap Step 6",
      "Learn Spring Security",
      "Schedule Mock Interview"
    ];
  } else {
    reply = `Hello! Main aapka **CareerBridge AI Assistant** hoon. Aap mujhse pooch sakte hain:\n• *"Mere skills ke according kaunsi internship best hai?"*\n• *"Mera DSA weak hai, kya karu?"*\n• *"Mera resume kaise improve karein?"*\n• *"Java Developer banne ke liye kya seekhna chahiye?"*`;
    actionSuggestions = [
      "Analyze my skill gaps",
      "How to improve AI Readiness Score?",
      "Upcoming placement drives this week"
    ];
  }

  res.json({
    reply,
    actionSuggestions,
    readinessScore: studentContext?.aiReadinessScore || 78,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
});

app.listen(PORT, () => {
  console.log(`CareerBridge API Server running on port ${PORT}`);
});
