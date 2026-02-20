import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Alert,
} from '@mui/material';
import {
  Timer,
  ChevronLeft,
  ChevronRight,
  Check,
  Warning,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { testService } from '../../services/testService';

const TestEngine: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [timeRemaining, setTimeRemaining] = useState(0); // seconds
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [autoSubmitting, setAutoSubmitting] = useState(false);

  // Fetch test questions
  const { data: testData, isLoading } = useQuery(
    ['testQuestions', testId],
    () => testService.getTestQuestions(Number(testId)).then((r) => r.data),
    {
      onSuccess: (data) => {
        setTimeRemaining(data.duration * 60); // Convert minutes to seconds
      },
    }
  );

  const questions = testData?.questions || [];

  // Submit test mutation
  const submitMutation = useMutation(
    () => testService.submitTest(Number(testId), answers),
    {
      onSuccess: () => {
        navigate(`/student/tests/${testId}/result`);
      },
    }
  );

  // Timer countdown
  useEffect(() => {
    if (timeRemaining <= 0) {
      if (!autoSubmitting) {
        setAutoSubmitting(true);
        handleSubmitTest();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining]);

  // Prevent navigation away during test
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (questionId: number, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmitTest = () => {
    submitMutation.mutate();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Loading test...</Typography>
      </Box>
    );
  }

  if (!currentQuestion) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">Test not found or no questions available.</Alert>
      </Container>
    );
  }

  const isTimeCritical = timeRemaining < 300; // Less than 5 minutes

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 2 }}>
      {/* Header with Timer */}
      <Paper
        elevation={3}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          borderRadius: 0,
          bgcolor: isTimeCritical ? 'error.main' : 'primary.main',
          color: 'white',
          py: 1.5,
        }}
      >
        <Container maxWidth="lg">
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h6">Test in Progress</Typography>
              <Typography variant="caption">
                Question {currentQuestionIndex + 1} of {questions.length}
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Timer />
                <Typography variant="h5" fontWeight="bold">
                  {formatTime(timeRemaining)}
                </Typography>
              </Box>
              {isTimeCritical && (
                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Warning fontSize="small" /> Time running out!
                </Typography>
              )}
            </Grid>
          </Grid>
        </Container>
      </Paper>

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          {/* Question Palette */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, position: 'sticky', top: 100 }}>
              <Typography variant="subtitle2" gutterBottom>
                Questions
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {questions.map((q, index) => (
                  <Chip
                    key={q.id}
                    label={index + 1}
                    onClick={() => handleJumpToQuestion(index)}
                    color={
                      index === currentQuestionIndex
                        ? 'primary'
                        : answers[q.id] !== undefined
                          ? 'success'
                          : 'default'
                    }
                    variant={index === currentQuestionIndex ? 'filled' : 'outlined'}
                    sx={{ cursor: 'pointer', width: 40, height: 40 }}
                  />
                ))}
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Answered: {getAnsweredCount()} / {questions.length}
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                color="success"
                startIcon={<Check />}
                onClick={() => setSubmitDialogOpen(true)}
                sx={{ mt: 2 }}
              >
                Submit Test
              </Button>
            </Paper>
          </Grid>

          {/* Question Content */}
          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 4 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="overline" color="text.secondary">
                  Question {currentQuestionIndex + 1}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
                  {currentQuestion.text}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Marks: {currentQuestion.marks}
                </Typography>
              </Box>

              {/* MCQ Options */}
              {currentQuestion.type === 'mcq' && currentQuestion.options && (
                <RadioGroup
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                >
                  {currentQuestion.options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={option}
                      sx={{
                        mb: 1,
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        '&:hover': { bgcolor: 'action.hover' },
                      }}
                    />
                  ))}
                </RadioGroup>
              )}

              {/* Short Answer */}
              {currentQuestion.type === 'short' && (
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Type your answer here..."
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  variant="outlined"
                />
              )}

              {/* Long Answer */}
              {currentQuestion.type === 'long' && (
                <TextField
                  fullWidth
                  multiline
                  rows={8}
                  placeholder="Type your detailed answer here..."
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  variant="outlined"
                />
              )}

              {/* Navigation Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  startIcon={<ChevronLeft />}
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  variant="outlined"
                >
                  Previous
                </Button>
                <Button
                  endIcon={<ChevronRight />}
                  onClick={handleNext}
                  disabled={currentQuestionIndex === questions.length - 1}
                  variant="contained"
                >
                  Next
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Submit Confirmation Dialog */}
      <Dialog open={submitDialogOpen} onClose={() => setSubmitDialogOpen(false)}>
        <DialogTitle>Submit Test?</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            You have answered {getAnsweredCount()} out of {questions.length} questions.
          </Typography>
          <Typography color="text.secondary">
            {getAnsweredCount() < questions.length &&
              `${questions.length - getAnsweredCount()} questions are unanswered.`}
          </Typography>
          <Typography color="error" sx={{ mt: 2 }}>
            Once submitted, you cannot change your answers.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubmitDialogOpen(false)}>Review Answers</Button>
          <Button
            onClick={handleSubmitTest}
            variant="contained"
            color="success"
            disabled={submitMutation.isLoading}
          >
            {submitMutation.isLoading ? 'Submitting...' : 'Submit Test'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestEngine;
