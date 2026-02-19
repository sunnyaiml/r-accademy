import apiClient from '../utils/apiClient';
import type { Question, TestResult } from '../types/student.types';

/**
 * Test Service - API endpoints for test-related operations
 */
export const testService = {
  /**
   * Get all questions for a specific test
   * @param testId - Test ID
   */
  getTestQuestions: (testId: number) =>
    apiClient.get<{ questions: Question[]; duration: number }>(`/tests/${testId}/questions`),

  /**
   * Submit answers for a test
   * @param testId - Test ID
   * @param answers - Map of question IDs to answers
   */
  submitTest: (testId: number, answers: Record<number, any>) =>
    apiClient.post<{ success: boolean; resultId: number }>(`/tests/${testId}/submit`, {
      answers,
    }),

  /**
   * Get result for a submitted test
   * @param testId - Test ID
   */
  getTestResult: (testId: number) => apiClient.get<TestResult>(`/tests/${testId}/result`),
};
