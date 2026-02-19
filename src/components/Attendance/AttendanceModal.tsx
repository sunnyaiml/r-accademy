import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Schedule,
  Close,
  Search,
  Person,
} from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { attendanceService } from '../../services/attendanceService';

interface AttendanceModalProps {
  open: boolean;
  onClose: () => void;
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({ open, onClose }) => {
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split('T')[0];

  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState(today);
  const [searchQuery, setSearchQuery] = useState('');
  const [studentStatuses, setStudentStatuses] = useState<Record<number, 'present' | 'absent' | 'late'>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch teacher's classes
  const { data: classes = [], isLoading: loadingClasses } = useQuery(
    'teacherClasses',
    () => attendanceService.getTeacherClasses().then((r) => r.data),
    { enabled: open }
  );

  // Get selected class data
  const selectedClass = classes.find((c) => c.id === selectedClassId);

  // Filter students based on search
  const filteredStudents = selectedClass?.students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setSelectedClassId(null);
      setSelectedDate(today);
      setSearchQuery('');
      setStudentStatuses({});
      setSuccessMessage('');
      setError('');
    }
  }, [open, today]);

  // Auto-select first class if none selected
  useEffect(() => {
    if (classes.length > 0 && !selectedClassId) {
      setSelectedClassId(classes[0].id);
    }
  }, [classes, selectedClassId]);

  // Initialize all students as present by default
  useEffect(() => {
    if (selectedClass) {
      const defaultStatuses: Record<number, 'present' | 'absent' | 'late'> = {};
      selectedClass.students.forEach((student) => {
        defaultStatuses[student.id] = 'present';
      });
      setStudentStatuses(defaultStatuses);
    }
  }, [selectedClass]);

  // Submit attendance mutation
  const submitMutation = useMutation(
    () => {
      if (!selectedClassId) throw new Error('No class selected');

      const students = Object.entries(studentStatuses).map(([id, status]) => ({
        id: parseInt(id),
        status,
      }));

      return attendanceService.markAttendance({
        classId: selectedClassId,
        date: selectedDate,
        students,
      });
    },
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries('teacherClasses');
        setSuccessMessage(
          `Attendance marked successfully! ${response.data.records.length} students recorded.`
        );
        setTimeout(() => {
          onClose();
        }, 2000);
      },
      onError: (err: any) => {
        setError(err.response?.data?.message || 'Failed to mark attendance');
      },
    }
  );

  const handleStatusChange = (studentId: number, status: 'present' | 'absent' | 'late') => {
    setStudentStatuses((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAll = (status: 'present' | 'absent' | 'late') => {
    const newStatuses: Record<number, 'present' | 'absent' | 'late'> = {};
    selectedClass?.students.forEach((student) => {
      newStatuses[student.id] = status;
    });
    setStudentStatuses(newStatuses);
  };

  const handleSubmit = () => {
    if (!selectedClassId) {
      setError('Please select a class');
      return;
    }
    submitMutation.mutate();
  };

  const getStatusColor = (status: 'present' | 'absent' | 'late') => {
    switch (status) {
      case 'present':
        return 'success';
      case 'absent':
        return 'error';
      case 'late':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: 'present' | 'absent' | 'late') => {
    switch (status) {
      case 'present':
        return <CheckCircle />;
      case 'absent':
        return <Cancel />;
      case 'late':
        return <Schedule />;
      default:
        return undefined;
    }
  };

  // Calculate summary
  const summary = {
    total: selectedClass?.students.length || 0,
    present: Object.values(studentStatuses).filter((s) => s === 'present').length,
    absent: Object.values(studentStatuses).filter((s) => s === 'absent').length,
    late: Object.values(studentStatuses).filter((s) => s === 'late').length,
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Mark Attendance</Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
          {/* Class and Date Selection */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Select Class</InputLabel>
              <Select
                value={selectedClassId || ''}
                onChange={(e) => setSelectedClassId(Number(e.target.value))}
                label="Select Class"
                disabled={loadingClasses || submitMutation.isLoading}
              >
                {classes.map((classItem) => (
                  <MenuItem key={classItem.id} value={classItem.id}>
                    {classItem.grade} - {classItem.name} ({classItem.subject})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              type="date"
              label="Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 200 }}
              disabled={submitMutation.isLoading}
            />
          </Box>

          {loadingClasses ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : selectedClass ? (
            <>
              {/* Summary Stats */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  p: 2,
                  bgcolor: 'background.default',
                  borderRadius: 2,
                }}
              >
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Typography variant="h4" color="text.secondary">
                    {summary.total}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Total Students
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">
                    {summary.present}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Present
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">
                    {summary.absent}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Absent
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main">
                    {summary.late}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Late
                  </Typography>
                </Box>
              </Box>

              {/* Quick Actions */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  startIcon={<CheckCircle />}
                  onClick={() => handleMarkAll('present')}
                  disabled={submitMutation.isLoading}
                >
                  Mark All Present
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<Cancel />}
                  onClick={() => handleMarkAll('absent')}
                  disabled={submitMutation.isLoading}
                >
                  Mark All Absent
                </Button>
              </Box>

              {/* Search */}
              <TextField
                placeholder="Search by name or roll number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                disabled={submitMutation.isLoading}
              />

              {/* Student List */}
              <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                {filteredStudents.map((student) => (
                  <ListItem
                    key={student.id}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      mb: 1,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={student.profilePicture}>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={student.name}
                      secondary={student.rollNumber ? `Roll: ${student.rollNumber}` : undefined}
                    />
                    <ToggleButtonGroup
                      value={studentStatuses[student.id]}
                      exclusive
                      onChange={(_, value) => value && handleStatusChange(student.id, value)}
                      size="small"
                      disabled={submitMutation.isLoading}
                    >
                      <ToggleButton value="present" color="success">
                        <Tooltip title="Present">
                          <CheckCircle fontSize="small" />
                        </Tooltip>
                      </ToggleButton>
                      <ToggleButton value="late" color="warning">
                        <Tooltip title="Late">
                          <Schedule fontSize="small" />
                        </Tooltip>
                      </ToggleButton>
                      <ToggleButton value="absent" color="error">
                        <Tooltip title="Absent">
                          <Cancel fontSize="small" />
                        </Tooltip>
                      </ToggleButton>
                    </ToggleButtonGroup>
                    <Chip
                      label={studentStatuses[student.id] || 'present'}
                      color={getStatusColor(studentStatuses[student.id] || 'present')}
                      size="small"
                      icon={getStatusIcon(studentStatuses[student.id] || 'present')}
                      sx={{ ml: 2, minWidth: 90 }}
                    />
                  </ListItem>
                ))}
              </List>

              {filteredStudents.length === 0 && (
                <Alert severity="info">No students found matching your search.</Alert>
              )}
            </>
          ) : (
            <Alert severity="info">Please select a class to mark attendance.</Alert>
          )}

          {/* Success Message */}
          {successMessage && (
            <Alert severity="success" onClose={() => setSuccessMessage('')}>
              {successMessage}
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert severity="error" onClose={() => setError('')}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={onClose} disabled={submitMutation.isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!selectedClassId || submitMutation.isLoading}
          startIcon={submitMutation.isLoading ? <CircularProgress size={20} /> : <CheckCircle />}
        >
          {submitMutation.isLoading ? 'Submitting...' : 'Submit Attendance'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttendanceModal;
