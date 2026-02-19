import apiClient from '../utils/apiClient';
import { AssignmentSubmission } from '../types/student.types';

/**
 * Assignment Service - API endpoints for assignment-related operations
 */
export const assignmentService = {
  /**
   * Submit an assignment with file upload
   * @param assignmentId - Assignment ID
   * @param file - File to upload (PDF, DOC, DOCX, etc.)
   * @param notes - Optional notes from student
   */
  submitAssignment: (assignmentId: number, file: File, notes?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    if (notes) {
      formData.append('notes', notes);
    }

    return apiClient.post<{ success: boolean; submission: AssignmentSubmission }>(
      `/assignments/${assignmentId}/submit`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },

  /**
   * Get submission details for a specific assignment
   * @param assignmentId - Assignment ID
   */
  getSubmission: (assignmentId: number) =>
    apiClient.get<AssignmentSubmission>(`/assignments/${assignmentId}/submission`),
};
