import apiClient from '../utils/apiClient';
import type {
  AttendanceRecord,
  MarkAttendancePayload,
  ClassAttendanceResponse,
  StudentAttendanceStats,
  ClassWithStudents,
} from '../types/attendance.types';

/**
 * Attendance Service - API endpoints for attendance tracking
 */
export const attendanceService = {
  /**
   * Mark attendance for a class
   * @param attendanceData - Class ID, date, and student statuses
   */
  markAttendance: (attendanceData: MarkAttendancePayload) =>
    apiClient.post<{ success: boolean; message: string; records: AttendanceRecord[] }>(
      '/attendance',
      attendanceData
    ),

  /**
   * Get attendance for a specific class on a date range
   * @param classId - Class ID
   * @param startDate - Start date (YYYY-MM-DD)
   * @param endDate - End date (YYYY-MM-DD)
   */
  getClassAttendance: (classId: number, startDate: string, endDate: string) =>
    apiClient.get<ClassAttendanceResponse[]>(
      `/attendance/class/${classId}?start=${startDate}&end=${endDate}`
    ),

  /**
   * Get attendance for today's class
   * @param classId - Class ID
   */
  getTodayAttendance: (classId: number) =>
    apiClient.get<ClassAttendanceResponse>(`/attendance/class/${classId}/today`),

  /**
   * Get student attendance history
   * @param studentId - Student ID
   * @param startDate - Optional start date
   * @param endDate - Optional end date
   */
  getStudentAttendance: (studentId: number, startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('start', startDate);
    if (endDate) params.append('end', endDate);
    return apiClient.get<StudentAttendanceStats>(
      `/attendance/student/${studentId}?${params.toString()}`
    );
  },

  /**
   * Get all classes assigned to the teacher with student lists
   */
  getTeacherClasses: () => apiClient.get<ClassWithStudents[]>('/teachers/me/classes'),

  /**
   * Get attendance statistics for all students in a class
   * @param classId - Class ID
   */
  getClassAttendanceStats: (classId: number) =>
    apiClient.get<StudentAttendanceStats[]>(`/attendance/class/${classId}/stats`),

  /**
   * Update attendance record
   * @param recordId - Attendance record ID
   * @param status - New status
   */
  updateAttendance: (recordId: number, status: 'present' | 'absent' | 'late') =>
    apiClient.patch<{ success: boolean; record: AttendanceRecord }>(
      `/attendance/${recordId}`,
      { status }
    ),

  /**
   * Delete attendance record
   * @param recordId - Attendance record ID
   */
  deleteAttendance: (recordId: number) =>
    apiClient.delete<{ success: boolean }>(`/attendance/${recordId}`),
};
