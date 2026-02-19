# R-Academy - Main Feature Document

> **Version:** 1.0
> **Last Updated:** 2026-02-17
> **Tech Stack:** React 18 + TypeScript + MUI v5 + Framer Motion + React Router v6
> **Backend API:** REST API (expected at `localhost:3001` / configurable via `REACT_APP_API_BASE_URL`)

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [User Roles & Hierarchy](#2-user-roles--hierarchy)
3. [Authentication & Authorization](#3-authentication--authorization)
4. [Dashboards](#4-dashboards)
5. [Class Management & Promotion](#5-class-management--promotion)
6. [Online Test System](#6-online-test-system)
7. [Student Meetings (Video/Audio)](#7-student-meetings-videoaudio)
8. [Group Chat](#8-group-chat)
9. [Daily Progress Report](#9-daily-progress-report)
10. [Teacher Posts & Announcements](#10-teacher-posts--announcements)
11. [Result & Report Card Management](#11-result--report-card-management)
12. [Trip & Event Planning](#12-trip--event-planning)
13. [Attendance System](#13-attendance-system)
14. [Assignment Management](#14-assignment-management)
15. [Public Landing Page](#15-public-landing-page)
16. [Current Implementation Status](#16-current-implementation-status)

---

## 1. System Overview

R-Academy is a class-based academic management system designed to connect **Students**, **Teachers**, **Parents**, and a **Super Admin** on a single platform. The system covers the full academic lifecycle — from enrollment and class assignment through daily learning activities (tests, assignments, attendance) to results, promotions, and progress reporting.

### Core Pillars

| Pillar | Description |
|--------|-------------|
| **Online Testing** | Teachers create and assign tests; students take tests online; results auto-graded or manually graded |
| **Student Meetings** | Scheduled video/audio meetings between teachers and students (live classes, doubt sessions) |
| **Group Chat** | Class-wise and subject-wise real-time chat for students and teachers |
| **Daily Progress Report** | Automated + manual daily summary of each student's activity, visible to students, teachers, and parents |
| **Multi-Role Dashboards** | Role-specific dashboards for Student, Teacher, Parent, and Super Admin |
| **Class-Based Structure** | Grade/section-based classes with yearly promotion, teacher assignment, and student enrollment |

---

## 2. User Roles & Hierarchy

### 2.1 Role Definitions

```
Super Admin (Top Level)
  └── Teacher (Appointed by Super Admin)
        └── Student (Enrolled in classes)
              └── Parent (Linked to student)
```

### 2.2 Super Admin

| Capability | Description |
|------------|-------------|
| **Appoint Teachers** | Create teacher accounts, assign subjects and classes, activate/deactivate teachers |
| **View All Records** | Access total count and details of all teachers, students, and parents in the system |
| **Manage Hierarchy** | Define class structure (grades, sections), assign class teachers, set academic year |
| **Decide Hierarchy** | Configure role permissions, approval workflows, and organizational structure |
| **System Analytics** | View platform-wide stats — total enrollments, active classes, test completion rates, attendance trends |
| **Manage Promotions** | Trigger bulk or individual student promotions to the next grade at year-end |
| **Fee & Enrollment** | Oversee student enrollment approvals and fee status (optional) |

### 2.3 Teacher

| Capability | Description |
|------------|-------------|
| **Assign Tests** | Create, schedule, and assign online tests to specific classes/subjects |
| **Upload Results** | Upload or enter test/exam results; publish report cards |
| **Daily Activities** | Mark attendance, assign homework, share study materials |
| **Trip & Event Planning** | Propose and manage school trips, events, and extra-curricular activities |
| **Post Updates** | Create posts/announcements visible to students and parents |
| **Conduct Meetings** | Schedule and host online class sessions and doubt-clearing meetings |
| **Chat Moderation** | Moderate class group chats, delete inappropriate messages |
| **Progress Reports** | Fill daily/weekly progress notes for individual students |

### 2.4 Student

| Capability | Description |
|------------|-------------|
| **Take Tests** | Attempt assigned online tests within the scheduled time window |
| **View Results** | See test scores, report cards, and performance analytics |
| **Attend Meetings** | Join scheduled online classes and doubt sessions |
| **Group Chat** | Participate in class/subject group chats |
| **View Progress** | See own daily progress report, attendance, and academic summary |
| **Submit Assignments** | Upload completed assignments before deadlines |
| **View Schedule** | See class timetable, upcoming tests, and events |

### 2.5 Parent

| Capability | Description |
|------------|-------------|
| **View Child's Progress** | See daily progress reports, attendance, test scores, and report cards |
| **View Announcements** | Read teacher posts and school announcements |
| **Chat with Teachers** | Direct message capability with assigned teachers |
| **Meeting Access** | Join parent-teacher meetings when scheduled |
| **View Events** | See upcoming trips, events, and school calendar |

---

## 3. Authentication & Authorization

### 3.1 Auth Flow (Currently Implemented)

```
Register → Send OTP → Verify OTP → Login → Dashboard
```

| Feature | Status | Details |
|---------|--------|---------|
| Student Login/Register | Built | Email + password login, name/email/phone/password registration |
| Teacher Login/Register | Built | Same as student + specialization field (not yet wired to API) |
| OTP Verification | Built | 6-digit OTP sent to phone after registration |
| Token-based Auth | Built | JWT token stored in localStorage, restored on app mount |
| Auto-redirect | Built | Logged-in users redirected to role-based dashboard |

### 3.2 Auth Features To Build

| Feature | Priority | Details |
|---------|----------|---------|
| Parent Login/Register | High | Parents register with child's student ID to link accounts |
| Super Admin Login | High | Separate admin login (no public registration — created via seed/CLI) |
| Role-Based Route Guards | High | Protect routes so only authorized roles can access specific pages |
| Password Reset | Medium | Forgot password flow via email/OTP |
| Session Expiry | Medium | Token expiration handling with refresh token support |
| Multi-child Parent | Low | Parents linked to multiple students |

---

## 4. Dashboards

### 4.1 Student Dashboard (Partially Built)

**Currently Built:**
- Profile card (name, grade, ID, GPA)
- Stat boxes: Active Subjects, Pending Tasks, Attendance %
- Subject list with expandable details (teacher, assignments, next class)
- Upcoming Tests panel

**To Build:**

| Section | Description |
|---------|-------------|
| **Daily Progress Summary** | Today's attendance, completed tasks, test scores, teacher remarks |
| **Test Center** | List of upcoming/active tests with "Start Test" button; past test results |
| **Meeting Schedule** | Today's and upcoming meetings with "Join" button |
| **Chat Quick Access** | Unread message count per group; quick jump to active chats |
| **Assignment Tracker** | Pending assignments with deadlines, submission status |
| **Performance Graph** | Line/bar chart showing score trends over time |
| **Timetable Widget** | Today's class schedule with subject, teacher, and time |
| **Notifications Feed** | Recent announcements, test results, assignment reminders |

### 4.2 Teacher Dashboard (Partially Built)

**Currently Built:**
- Profile card (name, subject, student count, class count)
- Stat boxes: Active Classes, Upcoming Tests, Posts Created
- Class list with View Details/Attendance/New Assignment buttons (stubs)
- Upcoming Events panel with create event dialog

**To Build:**

| Section | Description |
|---------|-------------|
| **Test Manager** | Create/edit/delete tests; view submissions and grade them |
| **Result Upload** | Bulk upload results via CSV or enter manually per student |
| **Attendance Manager** | Take daily attendance per class; view attendance history |
| **Meeting Scheduler** | Schedule, start, and manage online meetings |
| **Daily Report Writer** | Fill daily progress notes per student |
| **Trip/Event Planner** | Full CRUD for trips and events with date, description, approvals |
| **Student Performance** | View individual student analytics across subjects |
| **Assignment Manager** | Create assignments, set deadlines, review submissions |

### 4.3 Parent Dashboard (Not Built)

| Section | Description |
|---------|-------------|
| **Child Overview** | Child's profile, grade, attendance summary, current GPA |
| **Daily Report View** | Day-by-day progress with teacher remarks |
| **Test Results** | All test scores with subject breakdown |
| **Report Card** | Term/annual report card download |
| **Attendance Calendar** | Month view showing present/absent/leave days |
| **Announcements** | School and class announcements feed |
| **Teacher Contact** | Direct message to class teacher or subject teacher |
| **Fee Status** | Payment history and pending dues (optional) |
| **Event Calendar** | Upcoming trips, PTMs, events |

### 4.4 Super Admin Dashboard (Not Built)

| Section | Description |
|---------|-------------|
| **System Overview** | Total Students, Total Teachers, Total Parents, Total Classes (stat cards) |
| **Teacher Management** | Add/edit/deactivate teachers; assign classes and subjects |
| **Student Records** | Search, filter, view all student records across all grades |
| **Parent Records** | View all parent accounts and linked students |
| **Class Management** | Create grades/sections, assign class teachers, set capacity |
| **Hierarchy Config** | Define academic year, term structure, grading scale |
| **Promotion Engine** | Promote students to next grade (bulk/individual), handle failures/repeats |
| **Analytics & Reports** | Platform-wide charts: enrollment trends, performance heatmaps, attendance rates |
| **Audit Log** | Track admin actions (teacher appointments, promotions, config changes) |
| **Announcement Broadcast** | Send school-wide announcements to all roles |

---

## 5. Class Management & Promotion

### 5.1 Class Structure

```
Academic Year (e.g., 2026-27)
  └── Grade (e.g., Grade 8, Grade 9, ... Grade 12)
        └── Section (e.g., Section A, Section B)
              ├── Class Teacher (1 teacher assigned)
              ├── Subject Teachers (multiple)
              └── Students (enrolled list)
```

### 5.2 Class Features

| Feature | Owner | Description |
|---------|-------|-------------|
| Create Class | Super Admin | Define grade + section + academic year |
| Assign Class Teacher | Super Admin | Appoint one teacher as class in-charge |
| Assign Subject Teachers | Super Admin | Map teachers to subjects within a class |
| Enroll Students | Super Admin / Teacher | Add students to a class |
| View Class Roster | Teacher / Admin | See all students in a class with basic info |
| Class Timetable | Teacher / Admin | Define weekly schedule of subjects and timings |

### 5.3 Promotion System

| Feature | Description |
|---------|-------------|
| **Year-End Promotion** | Super Admin triggers promotion — eligible students move to next grade |
| **Promotion Criteria** | Configurable: minimum attendance %, minimum aggregate score, no failed subjects |
| **Bulk Promotion** | Select all eligible students in a grade and promote at once |
| **Individual Override** | Manually promote or hold back specific students |
| **Repeat / Detention** | Students not meeting criteria are marked for repeat with reason |
| **Section Reshuffling** | Optionally redistribute students across sections after promotion |
| **Alumni Archive** | Grade 12 promoted students are archived as alumni |

---

## 6. Online Test System

### 6.1 Test Creation (Teacher)

| Field | Description |
|-------|-------------|
| Test Title | Name of the test (e.g., "Chapter 5 - Quadratic Equations") |
| Subject | Subject the test belongs to |
| Class/Grade | Target class(es) for the test |
| Test Type | Quiz / Unit Test / Mid-Term / Final Exam / Practice |
| Duration | Time limit in minutes |
| Start Date & Time | When the test becomes available |
| End Date & Time | Deadline to submit |
| Total Marks | Maximum score |
| Instructions | Test instructions shown to students before starting |

### 6.2 Question Types

| Type | Description |
|------|-------------|
| **MCQ (Single)** | Multiple choice with one correct answer — auto-graded |
| **MCQ (Multiple)** | Multiple choice with multiple correct answers — auto-graded |
| **True/False** | Binary choice — auto-graded |
| **Short Answer** | Text input (1-2 lines) — manually graded |
| **Long Answer** | Text area for descriptive answers — manually graded |
| **Fill in the Blanks** | Auto-graded with accepted answer variations |
| **Image-Based** | Question includes an image; answer can be any type above |

### 6.3 Test Taking (Student)

| Feature | Description |
|---------|-------------|
| Test List | See all assigned tests with status (upcoming/active/completed/missed) |
| Start Test | Begin test — timer starts, no going back after submission |
| Auto-Save | Answers saved periodically to prevent data loss |
| Timer | Countdown visible; auto-submit when time expires |
| Question Navigation | Jump to any question; mark for review |
| Submit | Manual submit before time or auto-submit at deadline |

### 6.4 Results & Grading

| Feature | Description |
|---------|-------------|
| Auto-Grading | MCQ, True/False, Fill-in-the-Blank graded instantly |
| Manual Grading | Teacher grades short/long answers with marks and feedback |
| Score Summary | Total marks, percentage, rank in class |
| Answer Review | Students can view correct answers after test is graded (configurable) |
| Re-test | Teacher can allow re-test for specific students |

---

## 7. Student Meetings (Video/Audio)

### 7.1 Meeting Types

| Type | Description |
|------|-------------|
| **Live Class** | Scheduled class session — teacher presents, students attend |
| **Doubt Session** | Open Q&A session — students can ask questions |
| **Parent-Teacher Meet** | Scheduled one-on-one between teacher and parent |
| **Group Discussion** | Student-led or teacher-led discussion on a topic |

### 7.2 Meeting Features

| Feature | Description |
|---------|-------------|
| Schedule Meeting | Teacher sets date, time, duration, topic, and invitees |
| Join Meeting | One-click join from dashboard for all invited participants |
| Video/Audio Toggle | Participants can turn camera and mic on/off |
| Screen Sharing | Teacher (host) can share screen for presentations |
| Chat in Meeting | Text chat alongside the video/audio call |
| Recording | Teacher can record the session (optional, configurable) |
| Attendance Auto-Mark | Students who join are automatically marked present for the meeting |
| Meeting History | Past meetings listed with recordings (if available) and duration |

### 7.3 Integration Options

| Service | Notes |
|---------|-------|
| Jitsi Meet (Open Source) | Free, self-hosted or cloud, easy iframe embed |
| Zoom SDK | Paid, feature-rich, requires API key |
| Google Meet API | Requires Google Workspace integration |
| WebRTC (Custom) | Full control, complex to build |

---

## 8. Group Chat

### 8.1 Current Implementation

- Class-level group chat with real-time message display
- Sender avatar, name, timestamp, and role-based color coding
- Teacher moderation (delete messages)
- File upload button (UI only — not wired)
- Notification badge in header

### 8.2 Features To Build

| Feature | Description |
|---------|-------------|
| **Class-Wise Groups** | Auto-created group per class (e.g., "Grade 10 - Section A") |
| **Subject Groups** | Optional subject-specific groups within a class |
| **Real-Time Messaging** | WebSocket-based live messages (currently mock data) |
| **File/Image Sharing** | Upload and share documents, images, and study materials |
| **Message Search** | Search past messages by keyword |
| **Pinned Messages** | Teachers can pin important announcements in chat |
| **Reply & Threads** | Reply to specific messages to maintain conversation threads |
| **Read Receipts** | Show message read status |
| **Parent View** | Parents can view (read-only) their child's class chat |
| **Direct Messages** | One-on-one messaging between teacher-student or teacher-parent |

---

## 9. Daily Progress Report

### 9.1 Report Structure

Each student gets a daily report containing:

| Section | Description |
|---------|-------------|
| **Attendance** | Present / Absent / Late — auto-filled from attendance system |
| **Classes Attended** | List of subjects attended today with teacher name |
| **Tests Taken** | Any tests attempted today with score (if graded) |
| **Assignments** | Assignments submitted or pending with deadlines |
| **Homework Status** | Today's homework completion — Done / Partial / Not Done |
| **Teacher Remarks** | Free-text remark by class teacher or subject teacher |
| **Behavior Note** | Optional behavioral observation (positive or needs improvement) |
| **Star/Rating** | Teacher can give a 1-5 star daily rating |

### 9.2 Report Visibility

| Role | Access |
|------|--------|
| Student | View own daily report |
| Teacher | Fill and edit reports for assigned students |
| Parent | View child's daily report (push notification optional) |
| Super Admin | View any student's report for auditing |

### 9.3 Report Analytics

| Feature | Description |
|---------|-------------|
| Weekly Summary | Auto-generated weekly digest of daily reports |
| Monthly Trend | Charts showing attendance, homework completion, and rating trends |
| Flagged Students | Students with 3+ consecutive low ratings or absences flagged for attention |

---

## 10. Teacher Posts & Announcements

### 10.1 Current Implementation

- Post creation with image/video URL, subject tag, caption, and tags
- Post feed with search by caption/tags, subject filter, and sort (newest/popular)
- PostCard with like, comment, share actions
- Edit/Delete for post owners (UI dialogs exist, logic not wired)

### 10.2 Features To Build

| Feature | Description |
|---------|-------------|
| **Rich Text Posts** | Support for formatted text, embedded links, and multiple images |
| **Target Audience** | Post to specific class(es), all students, or parents |
| **Announcement vs Post** | Announcements are pinned/highlighted; posts are regular updates |
| **Comment Backend** | Wire comment add/delete to API |
| **Like/Share Backend** | Wire like toggle and share to API |
| **Push Notifications** | Notify students/parents on new announcements |
| **Post Approval** | Optional: Super Admin approves posts before publishing |

---

## 11. Result & Report Card Management

### 11.1 Result Upload

| Feature | Description |
|---------|-------------|
| **Manual Entry** | Teacher enters marks per student per subject in a table |
| **CSV Upload** | Bulk upload results via CSV file (columns: student ID, subject, marks) |
| **Auto from Tests** | Pull scores directly from online test system |
| **Grade Calculation** | Auto-calculate grade based on configurable grading scale (A+, A, B+, ...) |
| **Publish/Draft** | Results saved as draft until teacher publishes |

### 11.2 Report Card

| Feature | Description |
|---------|-------------|
| **Term Report Card** | Generated per term with all subject scores, grades, rank, remarks |
| **Annual Report Card** | Aggregated across all terms with final grade and promotion status |
| **PDF Download** | Downloadable PDF report card with school branding |
| **Parent Access** | Parents can view and download from their dashboard |
| **Performance Comparison** | Student's score vs class average per subject (chart) |

---

## 12. Trip & Event Planning

### 12.1 Event Types

| Type | Color Code | Description |
|------|-----------|-------------|
| Test/Exam | Red | Scheduled assessments |
| Assignment | Orange | Homework/project deadlines |
| Trip | Green | School outings and field trips |
| Meeting | Blue | Scheduled meetings (PTM, class meeting) |
| Holiday | Grey | School holidays and breaks |
| Cultural Event | Purple | Festivals, sports day, annual day |

### 12.2 Trip Planning Features

| Feature | Description |
|---------|-------------|
| **Create Trip** | Title, date range, destination, description, target class(es), estimated cost |
| **Permission Slips** | Digital permission request sent to parents; parent approves/declines from dashboard |
| **Head Count** | Real-time count of confirmed vs pending vs declined |
| **Itinerary** | Detailed schedule of the trip shared with parents and students |
| **Emergency Contacts** | Collected from parent profiles for the trip |
| **Post-Trip Gallery** | Upload photos/videos from the trip |

### 12.3 School Calendar

| Feature | Description |
|---------|-------------|
| **Calendar View** | Month/week view of all events, tests, trips, holidays |
| **Filters** | Filter by event type, class, subject |
| **Sync** | Export to Google Calendar / iCal |
| **Reminders** | Push/email reminders before events |

---

## 13. Attendance System

### 13.1 Daily Attendance

| Feature | Description |
|---------|-------------|
| **Mark Attendance** | Teacher marks Present / Absent / Late per student per class |
| **Bulk Marking** | "Mark All Present" with individual overrides |
| **Period-Wise** | Optional: attendance per period/subject instead of just daily |
| **Late Entry** | Record late arrivals with time |
| **Leave Request** | Students/parents can submit leave requests; teacher approves/rejects |

### 13.2 Attendance Reporting

| Feature | Description |
|---------|-------------|
| **Student View** | Calendar view with present/absent/late color coding |
| **Parent View** | Same calendar view for their child |
| **Teacher View** | Class-wide attendance sheet; download as CSV |
| **Admin View** | School-wide attendance stats; flag classes with low attendance |
| **Alerts** | Auto-notify parents if child is absent (configurable) |

---

## 14. Assignment Management

### 14.1 Assignment Creation (Teacher)

| Field | Description |
|-------|-------------|
| Title | Assignment name |
| Subject | Subject it belongs to |
| Class | Target class(es) |
| Description | Detailed instructions |
| Attachments | Reference files, worksheets, or links |
| Due Date | Submission deadline |
| Max Marks | Total marks for grading |
| Type | Homework / Project / Lab Work / Classwork |

### 14.2 Student Workflow

| Step | Description |
|------|-------------|
| View | See all pending assignments with deadlines |
| Work | Download attachments, read instructions |
| Submit | Upload completed work (PDF, image, document) before deadline |
| Late Submit | Allowed with penalty (configurable by teacher) |
| Feedback | View teacher's marks and comments after grading |

### 14.3 Teacher Workflow

| Step | Description |
|------|-------------|
| Assign | Create and publish assignment to class |
| Track | View submission status — submitted / pending / late |
| Grade | Open each submission, assign marks, write feedback |
| Return | Publish grades back to students |
| Analytics | View class average, submission rate, common mistakes |

---

## 15. Public Landing Page

### Currently Built (All Sections Complete)

| Section | Description |
|---------|-------------|
| **Hero Section** | Full-viewport banner with headline, 3 CTAs, animated stats (500+ students, 95% success, 5+ years) |
| **Intro Video** | YouTube embed introducing the academy |
| **About Classes** | 3 program cards — High School, Test Prep, Skill Development |
| **Teacher Posts** | Live post feed from teachers (public preview) |
| **Parent Reviews** | 3 testimonial cards with star ratings |
| **Past Events** | 3 event gallery cards with date, location, tags |
| **Demo Lectures** | 3 sample lecture cards with video modal player |
| **Why Choose Us** | 5 benefit cards + track record stats |
| **Footer** | Links, contact info, newsletter signup, social media |

---

## 16. Current Implementation Status

### Built & Functional

| Feature | Files |
|---------|-------|
| Auth Flow (Login/Register/OTP) | `useAuth.tsx`, `StudentAuth.tsx`, `TeacherAuth.tsx`, `OtpVerification.tsx` |
| Routing (React Router v6) | `App.tsx` |
| Student Dashboard (UI) | `StudentDashboard.tsx` |
| Teacher Dashboard (UI) | `TeacherDashboard.tsx` |
| Post Feed + Post Card | `TeacherPosts.tsx`, `PostCard.tsx` |
| Group Chat (UI) | `GroupChat.tsx` |
| Full Landing Page (8 sections) | `Home/*.tsx` |
| Header + Footer | `Header.tsx`, `Footer.tsx` |
| Error Boundary | `ErrorBoundary.tsx` |
| Shared Dashboard Components | `DashboardComponents.tsx` |
| API Hook | `useApi.ts` |

### Needs Backend Wiring

| Feature | Status |
|---------|--------|
| Post create/edit/delete | UI dialogs built, API calls not connected |
| Post comments & likes | UI built, no persistence |
| Event creation | Dialog built, submit handler is a stub |
| Class management | Buttons exist, no logic |
| Attendance marking | Button exists, no logic |
| Assignment creation | Button exists, no logic |
| Chat messages | Mock data, no WebSocket |
| File upload in chat | Button exists, no logic |

### Not Started

| Feature | Priority |
|---------|----------|
| Parent Auth & Dashboard | High |
| Super Admin Auth & Dashboard | High |
| Online Test System | High |
| Daily Progress Reports | High |
| Student Meeting System | Medium |
| Promotion System | Medium |
| Result/Report Card System | Medium |
| Trip Planning | Medium |
| Attendance System | Medium |
| Assignment Backend | Medium |
| Real-time Chat (WebSocket) | Medium |
| Push Notifications | Low |
| Calendar Integration | Low |
| PDF Report Cards | Low |

---

## Entity Relationship Summary

```
Super Admin
  ├── manages → Teachers (CRUD, activate/deactivate)
  ├── manages → Classes (grade, section, academic year)
  ├── manages → Students (enrollment, promotion)
  ├── views   → All Records (teachers, students, parents - totals & details)
  └── decides → Hierarchy (permissions, structure, grading scales)

Teacher
  ├── assigned to → Classes (by Super Admin)
  ├── creates    → Tests, Assignments, Posts, Events, Trips
  ├── uploads    → Results, Study Materials
  ├── fills      → Daily Progress Reports, Attendance
  ├── conducts   → Online Meetings
  └── moderates  → Group Chats

Student
  ├── enrolled in → Class (grade + section)
  ├── takes       → Tests
  ├── submits     → Assignments
  ├── attends     → Meetings
  ├── participates → Group Chat
  └── views       → Results, Progress Reports, Schedule

Parent
  ├── linked to  → Student(s)
  ├── views      → Progress Reports, Results, Attendance, Announcements
  ├── chats with → Teachers (direct messages)
  └── approves   → Trip Permission Slips
```

---

## API Endpoints (Planned)

### Auth
- `POST /api/auth/register` — Register user (student/teacher/parent)
- `POST /api/auth/login` — Login
- `POST /api/auth/send-otp` — Send OTP
- `POST /api/auth/verify-otp` — Verify OTP
- `POST /api/auth/forgot-password` — Password reset

### Users
- `GET /api/admin/teachers` — List all teachers
- `POST /api/admin/teachers` — Create/appoint teacher
- `GET /api/admin/students` — List all students
- `GET /api/admin/parents` — List all parents
- `GET /api/admin/stats` — System-wide stats (totals)

### Classes
- `GET /api/classes` — List classes
- `POST /api/classes` — Create class
- `PUT /api/classes/:id` — Update class
- `POST /api/classes/:id/enroll` — Enroll student
- `POST /api/classes/promote` — Bulk promotion

### Tests
- `POST /api/tests` — Create test
- `GET /api/tests?classId=` — List tests for a class
- `GET /api/tests/:id` — Get test details with questions
- `POST /api/tests/:id/submit` — Submit test answers
- `POST /api/tests/:id/grade` — Grade submissions
- `GET /api/tests/:id/results` — Get results

### Attendance
- `POST /api/attendance` — Mark attendance
- `GET /api/attendance?classId=&date=` — Get attendance for a class/date
- `GET /api/attendance/student/:id` — Student's attendance history

### Assignments
- `POST /api/assignments` — Create assignment
- `GET /api/assignments?classId=` — List assignments
- `POST /api/assignments/:id/submit` — Student submits work
- `POST /api/assignments/:id/grade` — Teacher grades submission

### Progress Reports
- `POST /api/progress-reports` — Create daily report
- `GET /api/progress-reports/student/:id` — Get reports for student
- `GET /api/progress-reports?classId=&date=` — Get reports for a class/date

### Meetings
- `POST /api/meetings` — Schedule meeting
- `GET /api/meetings?classId=` — List meetings
- `POST /api/meetings/:id/join` — Join meeting

### Chat
- `WS /ws/chat/:groupId` — WebSocket for real-time chat
- `GET /api/chat/groups` — List chat groups
- `GET /api/chat/:groupId/messages` — Message history

### Posts
- `POST /api/posts` — Create post
- `GET /api/posts` — List posts
- `PUT /api/posts/:id` — Update post
- `DELETE /api/posts/:id` — Delete post
- `POST /api/posts/:id/like` — Toggle like
- `POST /api/posts/:id/comments` — Add comment

### Events & Trips
- `POST /api/events` — Create event/trip
- `GET /api/events?classId=` — List events
- `POST /api/trips/:id/permission` — Parent responds to permission slip

### Results
- `POST /api/results/upload` — Upload results (CSV or manual)
- `GET /api/results/student/:id` — Student's results
- `GET /api/results/report-card/:studentId/:term` — Generate report card

---

*This document serves as the single source of truth for all planned and existing features of the R-Academy platform. Update this document as features are implemented or requirements change.*
