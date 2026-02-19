// Subject-related types
export interface Subject {
  id: number;
  name: string;
  teacher: string;
  nextClass: string;
  assignments: number;
}

// Test-related types
export interface UpcomingTest {
  id: number;
  subject: string;
  date: string;
  duration: string;
  topics: string[];
  type: string;
  status: 'upcoming' | 'active';
}

export interface PastTest {
  id: number;
  subject: string;
  date: string;
  score: string;
  percentage: number;
  grade: string;
}

export interface Question {
  id: number;
  text: string;
  type: 'mcq' | 'short' | 'long';
  options?: string[];
  marks: number;
  correctAnswer?: any; // Only for results view
}

export interface TestSubmission {
  answers: Record<number, any>;
}

export interface TestResult {
  id: number;
  testId: number;
  score: string;
  percentage: number;
  grade: string;
  correctAnswers: Record<number, any>;
  feedback?: string;
}

// Meeting-related types
export interface MeetingItem {
  id: number;
  title: string;
  teacher: string;
  time: string;
  type: 'Live Class' | 'Doubt Session' | 'Group Discussion';
  status: 'upcoming' | 'active';
  meetingUrl?: string; // Optional: if backend provides the URL
}

// Assignment-related types
export interface AssignmentItem {
  id: number;
  title: string;
  subject: string;
  deadline: string;
  status: 'pending' | 'submitted' | 'overdue' | 'graded';
  marks?: string;
}

export interface AssignmentSubmission {
  id: number;
  assignmentId: number;
  studentId: string;
  fileName: string;
  fileUrl: string;
  notes?: string;
  submittedAt: string;
}

// Timetable-related types
export interface TimetableSlot {
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

// Notification-related types
export interface NotificationItem {
  id: number;
  message: string;
  time: string;
  type: 'result' | 'announcement' | 'reminder' | 'assignment';
  read: boolean;
}

// Performance-related types
export interface PerformanceData {
  subject: string;
  avg: number;
  trend: 'up' | 'down';
}

export interface DailyProgress {
  attendance: string;
  classesAttended: number;
  totalClasses: number;
  tasksCompleted: number;
  totalTasks: number;
  todayRating: number;
  teacherRemark: string;
  behaviorNote?: string;
}

// Chat-related types
export interface ChatGroup {
  id?: number;
  name: string;
  unread: number;
}

export interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  role: 'student' | 'teacher';
}
