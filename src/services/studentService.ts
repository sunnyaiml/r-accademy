import apiClient from '../utils/apiClient';
import {
  Subject,
  UpcomingTest,
  PastTest,
  MeetingItem,
  AssignmentItem,
  TimetableSlot,
  NotificationItem,
  PerformanceData,
  DailyProgress,
} from '../types/student.types';

/**
 * Student Service - API endpoints for student-specific data
 */
export const studentService = {
  /**
   * Get all subjects for the authenticated student
   */
  getSubjects: () => apiClient.get<Subject[]>('/students/me/subjects'),

  /**
   * Get upcoming tests for the authenticated student
   */
  getUpcomingTests: () =>
    apiClient.get<UpcomingTest[]>('/students/me/tests', {
      params: { status: 'upcoming' },
    }),

  /**
   * Get past test results for the authenticated student
   */
  getPastTests: () =>
    apiClient.get<PastTest[]>('/students/me/tests', {
      params: { status: 'past' },
    }),

  /**
   * Get all meetings (live classes, doubt sessions, etc.)
   */
  getMeetings: () => apiClient.get<MeetingItem[]>('/students/me/meetings'),

  /**
   * Get all assignments for the authenticated student
   */
  getAssignments: () => apiClient.get<AssignmentItem[]>('/students/me/assignments'),

  /**
   * Get timetable for a specific date
   * @param date - Date in YYYY-MM-DD format
   */
  getTimetable: (date: string) =>
    apiClient.get<TimetableSlot[]>('/students/me/timetable', {
      params: { date },
    }),

  /**
   * Get all notifications for the authenticated student
   */
  getNotifications: () => apiClient.get<NotificationItem[]>('/students/me/notifications'),

  /**
   * Mark a notification as read
   * @param id - Notification ID
   */
  markNotificationRead: (id: number) =>
    apiClient.patch(`/students/me/notifications/${id}/read`),

  /**
   * Get performance data (subject-wise averages and trends)
   */
  getPerformance: () => apiClient.get<PerformanceData[]>('/students/me/performance'),

  /**
   * Get daily progress summary for today
   */
  getDailyProgress: () => apiClient.get<DailyProgress>('/students/me/daily-progress'),
};
