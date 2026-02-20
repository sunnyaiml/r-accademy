# R-education - Student-Teacher Management Portal

A comprehensive, role-based academic management platform built with React and TypeScript. R-education provides dedicated dashboards for Students, Teachers, Parents, and Admins — featuring real-time chat, online tests, attendance tracking, assignment management, and more.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
  - [Public Landing Page](#1-public-landing-page)
  - [Authentication](#2-authentication--authorization)
  - [Student Dashboard](#3-student-dashboard)
  - [Online Test Engine](#4-online-test-engine)
  - [Teacher Dashboard](#5-teacher-dashboard)
  - [Parent Dashboard](#6-parent-dashboard)
  - [Super Admin Dashboard](#7-super-admin-dashboard)
  - [Group Chat](#8-group-chat)
  - [Attendance System](#9-attendance-system)
  - [Assignment Submission](#10-assignment-submission)
- [Mock Credentials](#mock-credentials)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [License](#license)

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 18, TypeScript 4.9 |
| **UI Framework** | Material-UI (MUI) v5 |
| **Animations** | Framer Motion |
| **Routing** | React Router v6 |
| **State / Data Fetching** | React Query v3 |
| **Real-time** | Socket.io Client |
| **HTTP Client** | Axios |
| **API Mocking** | MSW (Mock Service Worker) v2 |
| **Video Conferencing** | Jitsi Meet (external) |
| **Build Tool** | React App Rewired |
| **Code Quality** | ESLint, Prettier, Husky, Lint-Staged |

---

## Getting Started

### Prerequisites

- Node.js >= 16
- npm >= 8

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/r-academy.git
cd r-academy

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

> **Note:** The project uses MSW (Mock Service Worker) to mock all API calls in development, so no backend server is required to explore the UI.

---

## Project Structure

```
src/
├── components/
│   ├── Assignment/           # Assignment submission modal with file upload
│   ├── Attendance/           # Attendance marking modal
│   ├── Auth/                 # Auth layout, OTP verification
│   ├── Chat/                 # Real-time group chat (Socket.io)
│   ├── Dashboard/
│   │   ├── StudentDashboard  # Student portal (16+ sections)
│   │   ├── TeacherDashboard  # Teacher portal (4 tabs + dialogs)
│   │   ├── ParentDashboard   # Parent portal (4 tabs + sidebar)
│   │   └── SuperAdminDashboard # Admin panel (5 tabs + analytics)
│   ├── ErrorBoundary/        # Global error handler
│   ├── Footer/               # Site footer with links & newsletter
│   ├── Header/               # Responsive nav with profile menu
│   ├── Home/                 # 7 landing page sections
│   ├── Posts/                # Teacher posts feed with CRUD
│   ├── Test/                 # Online test engine with timer
│   └── common/               # Reusable styled components
├── hooks/                    # useAuth, useApi custom hooks
├── mocks/                    # MSW handlers & browser setup
├── pages/
│   ├── Auth/                 # Student, Teacher, Parent auth pages
│   └── HomePage/             # Landing page orchestrator
├── services/                 # API service modules (Axios)
├── types/                    # TypeScript interfaces
└── utils/                    # API client, Socket.io manager
```

---

## Features

### 1. Public Landing Page

The landing page consists of 8 animated sections:

- **Hero Section** — Full-viewport banner with parallax background, 3 CTAs, and animated statistics (500+ students, 95% success rate, 5+ years)
- **Intro Video** — Embedded YouTube player with academy introduction
- **About Classes** — 3 program cards: High School (8-12), Test Prep (SAT/ACT/AP), Skill Development
- **Teacher Posts** — Searchable, filterable post feed with like, comment, share. Teachers can create/edit/delete posts
- **Parent Reviews** — 3 testimonial cards with star ratings
- **Past Events** — Event gallery with images, dates, type tags
- **Demo Lectures** — Sample lecture cards with video modal player
- **Why Choose Us** — 5 benefit highlights + track record stats

### 2. Authentication & Authorization

- **Multi-role authentication** — Student, Teacher, Parent, Admin with role-specific registration fields
- **Tabbed login/register UI** with smooth animated transitions
- **OTP verification** — 6-digit code verification after registration
- **JWT token management** — localStorage persistence, auto-restore on reload
- **Protected routes** — Role-based access control with auto-redirect
- **Auth layout** — Responsive split-screen design (branded hero + forms)
- **Socket.io initialization** on successful login

### 3. Student Dashboard

| Section | Description |
|---------|-------------|
| **Profile Card** | Avatar, name, grade, section, student ID, GPA |
| **Quick Stats** | Active Subjects, Pending Tasks, Attendance %, Upcoming Tests |
| **Today's Progress** | Attendance status, classes attended, tasks done, star rating, teacher remark |
| **Test Center** | Upcoming tests with "Start Test" button + past results with grades |
| **Meeting Schedule** | Live class / doubt session cards with "Join Now" (opens Jitsi Meet) |
| **Assignment Tracker** | Assignments with status chips, deadlines, submit/feedback actions |
| **Performance** | Subject-wise averages with trend indicators and progress bars |
| **Timetable** | Today's schedule with time slots, subjects, teachers, rooms |
| **My Subjects** | Expandable cards with teacher, next class, materials links |
| **Group Chats** | Chat groups with unread message badges |
| **Notifications** | Real-time notifications via Socket.io with browser notification support |

### 4. Online Test Engine

- **Countdown timer** — Auto-submits on expiry, turns red at < 5 minutes
- **Question palette** — Color-coded sidebar (unanswered/current/answered) with click-to-jump
- **Multiple question types** — MCQ (radio buttons), Short Answer, Long Answer
- **Navigation** — Previous/Next with answered counter
- **Submit confirmation** — Shows answered/unanswered count with warning
- **Browser protection** — Prevents accidental tab close during test

### 5. Teacher Dashboard

| Section | Description |
|---------|-------------|
| **Profile Card** | Avatar, name, specialization, student/class count |
| **Quick Stats** | Active Classes, Tests, Total Students, Assignments |
| **My Classes** | Class cards with View Details, Attendance, Grades, New Assignment actions |
| **Test Manager** | Create tests, manage table with submission progress, grade/view results |
| **Assignments** | Create & manage assignments, review submissions |
| **Student Performance** | Table with avg score, attendance bars, trend indicators |
| **Take Attendance** | Full attendance modal (see Attendance System below) |
| **Schedule Meeting** | Dialog with type, date/time, grade, participants; sends Socket.io notifications |
| **Daily Report** | Class/student selector, homework status, star rating, remarks |
| **Events & Trips** | Create/manage events with type-based color coding |
| **Meetings** | "Start Meeting Now" (opens Jitsi + notifies participants via Socket.io) |

### 6. Parent Dashboard

| Section | Description |
|---------|-------------|
| **Child Overview** | Child's name, grade, section, roll number, GPA, rank |
| **Quick Stats** | Today's Attendance, Pending Tasks, Avg Score, Notifications |
| **Today's Report** | Attendance, homework status, rating, teacher remark |
| **Daily Reports** | Last 5 days of reports with attendance, homework, ratings, remarks |
| **Test Results** | Score table with grades, class average comparison, "Download Report Card" |
| **Attendance Calendar** | Month view with color-coded dots (Present/Absent/Late/Holiday), summary stats |
| **Fee Status** | Term-wise fee table with Paid/Pending status, Receipt/Pay Now actions |
| **Teacher Contact** | Teacher list with chat button and quick message box |
| **Event Calendar** | Upcoming events with permission slip approve/decline for trips |

### 7. Super Admin Dashboard

| Section | Description |
|---------|-------------|
| **System Stats** | Active Teachers, Total Students, Active Classes, Total Parents |
| **Teacher Management** | Appoint teachers, activate/deactivate, edit/view profiles |
| **Student Records** | Enroll students, bulk promotion, attendance/GPA tracking |
| **Class Management** | Create classes (grade, section, teacher, capacity), capacity monitoring |
| **Analytics** | Enrollment trends (4 years), attendance by grade, performance by subject |
| **Audit Log** | Color-coded activity timeline with user, action, timestamp |
| **Broadcast** | Send announcements to all/teachers/students/parents |
| **System Config** | Academic year, grading scale, term structure, promotion criteria |

### 8. Group Chat

- **Real-time messaging** via Socket.io (join/leave room)
- **Message display** with avatar, sender name, timestamp
- **Teacher names** highlighted distinctly
- **Send on Enter**, Shift+Enter for new line
- **File attachment** support (UI ready)
- **Teacher moderation** — delete any message
- **Auto-scroll** to latest message
- **React Query** cache integration for optimistic updates

### 9. Attendance System

- **Class & date selection** with teacher's assigned classes
- **Real-time summary** — Total, Present, Absent, Late counts update live
- **Quick actions** — Mark All Present / Mark All Absent
- **Student search** by name or roll number
- **Per-student toggle** — Present (green) / Late (orange) / Absent (red)
- **Success feedback** with count of students recorded

### 10. Assignment Submission

- **Drag-and-drop** file upload zone
- **File validation** — PDF, DOC, DOCX, JPG, PNG (max 10MB)
- **Upload progress bar** with percentage indicator
- **Optional notes** field
- **Error/success alerts** with auto-close

---

## Mock Credentials

The project uses MSW to mock authentication. Use these credentials in development:

| Role | Email | Password |
|------|-------|----------|
| **Student** | `student@r-education.com` | `password123` |
| **Teacher** | `teacher@r-education.com` | `password123` |
| **Parent** | `parent@r-education.com` | `password123` |
| **Admin** | `admin@r-education.com` | `password123` |

---

## Environment Variables

Create a `.env` file in the root directory (see `.env.example`):

```env
# Backend API base URL
REACT_APP_API_BASE_URL=http://localhost:3001/api

# Socket.io server URL
REACT_APP_SOCKET_URL=http://localhost:3001

# Jitsi Meet domain for video conferencing
REACT_APP_JITSI_DOMAIN=meet.jit.si
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server at [http://localhost:3000](http://localhost:3000) |
| `npm run build` | Build for production to `build/` folder |
| `npm test` | Run tests in watch mode |
| `npm run lint` | Lint TypeScript files with ESLint |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript type checking without emitting |

---

## Shared Components

The project includes a set of reusable styled components in `src/components/common/`:

- **StatBox** — Gradient stat card with icon, number, and label
- **StatusChip** — Color-mapped status badges (completed/pending/overdue/active/draft)
- **ProgressWithLabel** — Horizontal progress bar with percentage
- **DashboardPaper** — Styled paper with hover lift animation
- **GradientCard** — Card with custom gradient background
- **SectionTitle** — Section header with underline accent
- **EmptyState** — Placeholder for empty lists
- **ProtectedRoute** — Route guard with role-based access control

---

## Real-time Architecture

```
┌──────────────┐     Socket.io      ┌──────────────┐
│   Student     │◄──────────────────►│              │
│   Dashboard   │   notifications    │              │
├──────────────┤                     │   Socket.io  │
│   Teacher     │◄──────────────────►│    Server    │
│   Dashboard   │  meeting alerts    │              │
├──────────────┤                     │              │
│   Group Chat  │◄──────────────────►│              │
│               │  messages, delete  └──────────────┘
└──────────────┘
```

- **Notifications** — Students receive real-time alerts with browser notification support
- **Chat** — Messages broadcast to room participants, teacher moderation events
- **Meetings** — Teachers trigger meeting start, participants notified instantly

---

## License

This project is private and not licensed for public distribution.

---

Created with ❤️ by **Sunny Vishwakarma**
