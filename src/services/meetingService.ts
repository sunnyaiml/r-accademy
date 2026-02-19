import apiClient from '../utils/apiClient';

export interface CreateMeetingPayload {
  title: string;
  type: 'live_class' | 'doubt_session' | 'ptm' | 'group_discussion';
  date: string;
  time: string;
  duration: number;
  grade: string;
  participants: ('students' | 'parents')[];
  subject?: string;
}

export interface Meeting {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  duration: number;
  grade: string;
  participants: string[];
  status: 'scheduled' | 'active' | 'completed';
  meetingUrl?: string;
  teacherId: string;
  teacherName: string;
}

/**
 * Meeting Service - API endpoints for meeting management
 */
export const meetingService = {
  /**
   * Create a new meeting
   * @param meetingData - Meeting details including participants
   */
  createMeeting: (meetingData: CreateMeetingPayload) =>
    apiClient.post<{ success: boolean; meeting: Meeting }>('/meetings', meetingData),

  /**
   * Get all meetings for the authenticated teacher
   */
  getTeacherMeetings: () => apiClient.get<Meeting[]>('/teachers/me/meetings'),

  /**
   * Start a meeting and notify participants
   * @param meetingId - Meeting ID
   */
  startMeeting: (meetingId: number) =>
    apiClient.post<{ success: boolean; meetingUrl: string; notificationsSent: number }>(
      `/meetings/${meetingId}/start`
    ),

  /**
   * Update meeting details
   * @param meetingId - Meeting ID
   * @param updates - Fields to update
   */
  updateMeeting: (meetingId: number, updates: Partial<CreateMeetingPayload>) =>
    apiClient.patch<{ success: boolean; meeting: Meeting }>(`/meetings/${meetingId}`, updates),

  /**
   * Delete/Cancel a meeting
   * @param meetingId - Meeting ID
   */
  deleteMeeting: (meetingId: number) =>
    apiClient.delete<{ success: boolean }>(`/meetings/${meetingId}`),

  /**
   * Get meeting participants list
   * @param meetingId - Meeting ID
   */
  getMeetingParticipants: (meetingId: number) =>
    apiClient.get<{ students: any[]; parents: any[] }>(`/meetings/${meetingId}/participants`),
};
