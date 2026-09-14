# CareerBridge: From Campus to Career, Smarter 🚀

> **Enterprise-grade SaaS platform connecting Students, Colleges, and Companies with skill verification, AI career roadmaps, proctored ATS candidate dossiers, and automated placement management.**

---

## 🌟 Key Platform Highlights

### 1. 🎓 Student Portal (CareerTech Startup UI)
- **Student Login Gateway**: Modern dedicated sign-in with Enrollment Number, College Name, Academic Year, and TPO ID card verification proof.
- **AI Career Readiness Score**: Real-time readiness gauge out of 100 based on verified skills, projects, and assessments (e.g. Rahul Sharma: 78/100).
- **Interactive Career Roadmap (Role Picker & Learning Vault)**:
  - **Target Job Role Selector**: Pre-select or change your target career track across 8 high-demand roles (*Java Backend, MERN Full Stack, React Frontend, AI/ML Engineer, DevOps Cloud, Data Analyst, Android, Cybersecurity*) or type any custom role to generate an AI curriculum on the fly!
  - **Free Learning Resources**: Verified **YouTube Channels & Playlists with Direct Links** (Kunāl Kushwaha, Telusko, take U forward / Striver, Amigoscode, Chai aur Code, CodeWithHarry, Krish Naik, TechWorld with Nana, etc.).
  - **Paid Resources & Certifications**: Curated industry masterclasses from **Udemy**, **Coursera**, and **Educative.io** with pricing and instructor credentials.
  - **Hands-on Capstone Projects**: Practical resume-worthy project prompts for each learning phase.
- **Skill Verification Engine**: Verified proctored skills (Java, Spring Boot, SQL) with credential evidence (Oracle SE 17, HackerRank) and instant assessment submission.
- **College Placements vs Off-Campus vs Internships**:
  - **College Placements**: Exclusively displays placement drives approved by the student's college TPO.
  - **Off-Campus Jobs**: Independent software engineering job openings.
  - **Internships**: Filterable by Paid vs Free/Unpaid, duration, stipends, and match score.
- **AI Career Analyzer**: Comprehensive strength vs skill gap diagnostics with recommendations to reach a 90+ readiness score.
- **AI Career Coach (Chatbot)**: Bilingual conversational assistant answering DSA prep, resume review, and placement queries.
- **Application Tracking & Feedback**: 5-stage pipeline with transparent rejection rationale and recommended roadmap milestones.

---

### 2. 🏛️ College Placement Portal (TPO SaaS ERP)
- **Institutional Login**: Dedicated administrative portal for TPO Coordinators and Deans with AICTE/AISHE security verification.
- **Student Verification Desk & Identity Audit**:
  - Review student profiles with physical College ID cards.
  - High-resolution **Lightbox Zoom** to verify authorized signatures, enrollment stamps, and expiry dates.
  - ERP pre-flight checklist and 1-click `[Accept & Verify]` or `[Reject]`.
- **Company Drive Proposal Inspector**:
  - Review corporate campus drive proposals submitted by recruiters.
  - Inspect company background, recruiter credentials, CTC package breakdown, and selection rounds.
  - 1-click `[Approve & Publish to College Placements]` (automatically publishes to students) or `[Reject]`.
- **Enrolled Students Directory**: Searchable candidate roster with branch, CGPA, backlogs, and verification badges.
- **Automated Placement Eligibility Simulator**: Test any student against drive criteria (CGPA, backlogs, branch) with instant pass/fail reasons.
- **Placement Analytics & Cohort Insights**: Real-time branch-wise stats, package breakdown (Highest, Average, Median), and AI cohort gap alerts.

---

### 3. 🏢 Corporate Recruiter Portal (Enterprise ATS)
- **Enterprise Recruiter Login**: Official work email sign-in with company domain SSO and AICTE corporate recruitment clearance.
- **ATS Candidate Dossier & Profile Inspector**:
  - Inspect candidate portfolios with Cumulative CGPA, active backlogs, and proctored assessment scores.
  - **ATS Interactive Resume Viewer**: Formatted single-column resume with contact details, education, experience, and projects.
  - Project architecture summaries with verified GitHub and live demo links.
  - Direct actions: `[Shortlist]`, `[Schedule Interview]`, `[Select / Roll Out Offer]`, and `[Reject with Structured Feedback]`.
- **Candidate Ranking & AI Match Scoring**: Instant ranking of applicants based on skill compatibility and proctored tests.
- **Direct Drive Creation**: Post corporate campus drives with custom eligibility criteria and interview timelines.

---

### 4. 🖼️ Master Blueprint Poster & Animated Login Gateways
- **Unified Master Poster**: Ecosystem blueprint displaying the complete interaction loop between Students, Colleges, and Corporates.
- **3 Animated Portal Login Gateways**:
  - **🎓 Student Login Gateway Poster**: With floating AI readiness pills, verified ID proof, and simulated form controls.
  - **🏛️ College & TPO ERP Login Poster**: With institutional accreditation badge, placement rate trends, and TPO credentials.
  - **🏢 Corporate Recruiter Login Poster**: With talent match scores, enterprise SSO, and ATS access controls.
  - 1-click direct portal launch buttons on each poster!

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS, Lucide React icons |
| **Data Visualization** | Recharts (Line Charts & Bar Charts), Canvas Confetti |
| **Backend API** | Node.js, Express.js REST API |
| **Storage & Sync** | Multi-portal state persistence via REST API & localStorage cache |
| **Version Control** | Git (`main` branch) with comprehensive `.gitignore` |

---

## ⚡ Quick Start Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 1. Run Frontend Client
```bash
cd client
npm install
npm run dev
```
The application will be live at: **`http://localhost:5173`**

### 2. Run Backend API Server
```bash
cd server
npm install
node server.js
```
The REST API runs at: **`http://localhost:5000`**

### 3. Production Build
```bash
cd client
npm run build
```

---

## 📁 Repository Structure

```
COLLOGE-TO-CAREER/
├── .gitignore                   # Root Git ignore (excludes node_modules, dist, .env, logs)
├── README.md                    # Project documentation
├── package.json                 # Workspace dependencies
├── client/                      # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentPortal/   # Full Student Experience & Career Roadmap
│   │   │   ├── CollegePortal/   # TPO Management ERP & Verification Modals
│   │   │   ├── CompanyPortal/   # Recruiter ATS & Candidate Dossier
│   │   │   ├── PosterMasterView/# Blueprint Poster & Animated Login Gateways
│   │   │   └── EcosystemOverview/
│   │   ├── data/
│   │   │   ├── careerRoadmapsData.js # 8 Curated Tracks, Free YouTube Links & Paid Courses
│   │   │   └── mockData.js      # Student portfolios, drives, applications & analytics
│   │   └── services/
│   │       └── api.js           # REST API client & local persistence sync
├── server/                      # Node.js + Express Backend
│   ├── server.js                # Express API endpoints
│   └── data/
│       └── mockData.js          # Server mock data
```

---

## 📄 License
This project is proprietary and built for next-generation smart campus placements and career enablement.

