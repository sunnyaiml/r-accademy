
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
  Tab,
  Tabs,
  CircularProgress,
  Alert,
} from '@mui/material';
import Book from '@mui/icons-material/Book';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTime from '@mui/icons-material/AccessTime';
import Assignment from '@mui/icons-material/Assignment';
import VideoCall from '@mui/icons-material/VideoCall';
import Chat from '@mui/icons-material/Chat';
import Notifications from '@mui/icons-material/Notifications';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import CheckCircle from '@mui/icons-material/CheckCircle';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Star from '@mui/icons-material/Star';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Description from '@mui/icons-material/Description';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Calendar,
  GraduationCap,
  Settings,
  PlayCircle,
  Clock,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { studentService } from '../../services/studentService';
import { getSocket } from '../../utils/socket';
import type { MeetingItem, NotificationItem, AssignmentItem } from '../../types/student.types';
import AssignmentSubmissionModal from '../Assignment/AssignmentSubmissionModal';
import DashboardLayout, { NavItem } from '../common/DashboardLayout';
import CalendarWidget from '../common/CalendarWidget';
import ScheduleItemComponent from '../common/ScheduleItem';
import type { ScheduleColor } from '../common/ScheduleItem';
import {
  DashboardPaper,
  StatBox,
  SectionTitle,
  StatusChip,
  ProgressWithLabel,
  containerVariants,
  itemVariants,
} from '../common/DashboardComponents';

const STUDENT_NAV: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: BookOpen, label: 'Courses' },
  { icon: FileText, label: 'Tests' },
  { icon: Calendar, label: 'Assignments' },
  { icon: GraduationCap, label: 'Grades' },
  { icon: Settings, label: 'Settings' },
];

const ProPlanWidget = () => (
  <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
    <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 bg-white opacity-10 rounded-full blur-2xl" />
    <div className="absolute bottom-0 left-0 -ml-4 -mb-4 h-20 w-20 bg-purple-400 opacity-20 rounded-full blur-xl" />
    <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
      <PlayCircle size={20} className="text-white" />
    </div>
    <h3 className="font-bold text-lg mb-1 relative z-10">Go Pro Plan</h3>
    <p className="text-indigo-100 text-xs mb-4 relative z-10">
      Get unlimited access to all courses and features.
    </p>
    <button className="w-full bg-white text-indigo-600 text-sm font-bold py-2.5 rounded-lg shadow-sm hover:bg-indigo-50 transition-colors relative z-10">
      Upgrade Now
    </button>
  </div>
);

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // UI state
  const [expandedSubject, setExpandedSubject] = useState<number | null>(null);
  const [testTab, setTestTab] = useState(0);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentItem | null>(null);

  // Get today's date for timetable
  const today = new Date().toISOString().split('T')[0];

  // Fetch all dashboard data with React Query
  const { data: subjects = [], isLoading: loadingSubjects, error: subjectsError } = useQuery(
    'subjects',
    () => studentService.getSubjects().then((r) => r.data)
  );

  const { data: upcomingTests = [] } = useQuery('upcomingTests', () =>
    studentService.getUpcomingTests().then((r) => r.data)
  );

  const { data: pastTests = [] } = useQuery('pastTests', () =>
    studentService.getPastTests().then((r) => r.data)
  );

  const { data: assignments = [] } = useQuery('assignments', () =>
    studentService.getAssignments().then((r) => r.data)
  );

  const { data: meetings = [] } = useQuery('meetings', () =>
    studentService.getMeetings().then((r) => r.data)
  );

  const { data: todayTimetable = [] } = useQuery(['timetable', today], () =>
    studentService.getTimetable(today).then((r) => r.data)
  );

  const { data: notifications = [] } = useQuery('notifications', () =>
    studentService.getNotifications().then((r) => r.data)
  );

  const { data: performanceData = [] } = useQuery('performance', () =>
    studentService.getPerformance().then((r) => r.data)
  );

  const { data: dailyProgress } = useQuery('dailyProgress', () =>
    studentService.getDailyProgress().then((r) => r.data)
  );

  // Mark notification as read mutation
  const markReadMutation = useMutation(
    (id: number) => studentService.markNotificationRead(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notifications');
      },
    }
  );

  // Handlers
  const handleExpandSubject = (subjectId: number) => {
    setExpandedSubject(expandedSubject === subjectId ? null : subjectId);
  };

  const handleMarkNotificationRead = (notificationId: number, isRead: boolean) => {
    if (!isRead) {
      markReadMutation.mutate(notificationId);
    }
  };

  const handleStartTest = (testId: number) => {
    navigate(`/student/tests/${testId}/take`);
  };

  const handleJoinMeeting = (meeting: MeetingItem) => {
    const jitsiDomain = process.env.REACT_APP_JITSI_DOMAIN || 'meet.jit.si';
    const roomName = `r-academy-${meeting.id}`;
    window.open(`https://${jitsiDomain}/${roomName}`, '_blank');
  };

  // Socket.io listener for real-time notifications
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on('new_notification', (notification: NotificationItem) => {
      queryClient.setQueryData('notifications', (old: NotificationItem[] = []) =>
        [notification, ...old]
      );
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(notification.message);
      }
    });

    return () => {
      socket.off('new_notification');
    };
  }, [queryClient]);

  // Show loading state
  if (loadingSubjects) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#F8F9FC' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Show error state
  if (subjectsError) {
    return (
      <Box sx={{ p: 4, bgcolor: '#F8F9FC', minHeight: '100vh' }}>
        <Alert severity="error">
          Failed to load dashboard data. Please try refreshing the page.
        </Alert>
      </Box>
    );
  }

  // Chat groups placeholder
  const chatGroups = [
    { name: 'Grade 10 - Section A', unread: 5 },
    { name: 'Mathematics Group', unread: 2 },
    { name: 'Physics Group', unread: 0 },
    { name: 'English Group', unread: 8 },
  ];

  const pendingTasks = assignments.filter((a) => a.status === 'pending' || a.status === 'overdue').length;
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  // Map timetable slots to schedule item colors
  const slotColorMap: Record<string, ScheduleColor> = {
    Mathematics: 'blue',
    Science: 'green',
    Physics: 'purple',
    Chemistry: 'orange',
    English: 'indigo',
    'Lunch Break': 'orange',
  };

  return (
    <DashboardLayout
      navItems={STUDENT_NAV}
      greeting={`Welcome back, ${user?.name?.split(' ')[0] || 'Student'}! 👋`}
      subtitle={`You have ${pendingTasks} pending tasks and ${upcomingTests.length} upcoming tests.`}
      bottomWidget={<ProPlanWidget />}
      notificationCount={unreadNotifications}
    >
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatBox
            value={subjects.length || '0'}
            label="Active Subjects"
            icon={<BookOpen size={24} />}
            iconBg="bg-indigo-50"
            iconColor="text-indigo-600"
            extra={
              <div className="h-1.5 w-full bg-indigo-100 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '75%' }} />
              </div>
            }
          />
          <StatBox
            value={pendingTasks}
            label="Pending Tasks"
            icon={<FileText size={24} />}
            iconBg="bg-red-50"
            iconColor="text-red-500"
            extra={
              pendingTasks > 0 ? (
                <div className="flex items-center text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full w-fit mt-2">
                  {pendingTasks} due soon
                </div>
              ) : undefined
            }
          />
          <StatBox
            value={dailyProgress?.attendance || '92%'}
            label="Attendance"
            icon={<GraduationCap size={24} />}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
            extra={
              <div className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full w-fit mt-2">
                On track
              </div>
            }
          />
          <StatBox
            value={upcomingTests.length}
            label="Upcoming Tests"
            icon={<Clock size={24} />}
            iconBg="bg-orange-50"
            iconColor="text-orange-600"
            extra={
              <div className="flex items-center text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full w-fit mt-2">
                This week
              </div>
            }
          />
        </div>

        {/* Main Content + Right Sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Today's Progress */}
            <motion.div variants={itemVariants}>
              <DashboardPaper>
                <SectionTitle variant="h6">Today's Progress</SectionTitle>
                <Grid container spacing={3} sx={{ mt: 0.5 }}>
                  <Grid item xs={6} sm={2.4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Chip
                        label={dailyProgress?.attendance || 'N/A'}
                        color="success"
                        sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 1, borderRadius: '8px' }}
                      />
                      <Typography variant="caption" display="block" color="text.secondary">Attendance</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={2.4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h5" fontWeight="bold" sx={{ color: '#4F46E5' }}>
                        {dailyProgress?.classesAttended ?? 0}/{dailyProgress?.totalClasses ?? 0}
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary">Classes</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={2.4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h5" fontWeight="bold" sx={{ color: '#7C3AED' }}>
                        {dailyProgress?.tasksCompleted ?? 0}/{dailyProgress?.totalTasks ?? 0}
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary">Tasks</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={2.4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.25 }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} sx={{ color: star <= (dailyProgress?.todayRating ?? 0) ? '#FFB400' : '#E0E0E0', fontSize: 22 }} />
                        ))}
                      </Box>
                      <Typography variant="caption" display="block" color="text.secondary">Rating</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={2.4}>
                    <Box sx={{ bgcolor: '#F8F9FC', borderRadius: 3, p: 1.5 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', display: 'block', lineHeight: 1.4 }}>
                        "{dailyProgress?.teacherRemark || 'No remarks for today.'}"
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </DashboardPaper>
            </motion.div>

            {/* Test Center */}
            <motion.div variants={itemVariants}>
              <DashboardPaper>
                <SectionTitle variant="h6">Test Center</SectionTitle>
                <Tabs value={testTab} onChange={(_, v) => setTestTab(v)} sx={{ mb: 2, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 } }}>
                  <Tab label="Upcoming Tests" />
                  <Tab label="Past Results" />
                </Tabs>

                {testTab === 0 && (
                  <Box>
                    {upcomingTests.map((test) => (
                      <Card
                        key={test.id}
                        elevation={0}
                        sx={{
                          mb: 2, border: '1px solid', borderColor: 'rgba(0,0,0,0.06)', borderRadius: 3,
                          transition: '0.2s',
                          '&:hover': { borderColor: '#4F46E5', bgcolor: 'rgba(79, 70, 229, 0.02)' }
                        }}
                      >
                        <CardContent sx={{ pb: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#4F46E5' }}>
                                {test.subject} - {test.type}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 2, mt: 0.5, flexWrap: 'wrap' }}>
                                <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <CalendarMonth sx={{ fontSize: 16 }} /> {test.date}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <AccessTime sx={{ fontSize: 16 }} /> {test.duration}
                                </Typography>
                              </Box>
                            </Box>
                            <StatusChip status={test.status} />
                          </Box>
                          <Box sx={{ mt: 1.5 }}>
                            {test.topics.map((topic) => (
                              <Chip key={topic} label={topic} size="small" sx={{ mr: 0.5, mb: 0.5, borderRadius: '8px', fontSize: '0.75rem' }} />
                            ))}
                          </Box>
                        </CardContent>
                        <CardActions>
                          <Button size="small" sx={{ borderRadius: 2 }}>Study Material</Button>
                          {test.status === 'active' && (
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<PlayArrow />}
                              onClick={() => handleStartTest(test.id)}
                              sx={{ borderRadius: 2, ml: 'auto', bgcolor: '#4F46E5', '&:hover': { bgcolor: '#3730A3' } }}
                            >
                              Start Test
                            </Button>
                          )}
                        </CardActions>
                      </Card>
                    ))}
                  </Box>
                )}

                {testTab === 1 && (
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Subject</strong></TableCell>
                          <TableCell><strong>Date</strong></TableCell>
                          <TableCell><strong>Score</strong></TableCell>
                          <TableCell><strong>Grade</strong></TableCell>
                          <TableCell align="right"><strong>Performance</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {pastTests.map((test) => (
                          <TableRow key={test.id} hover>
                            <TableCell>{test.subject}</TableCell>
                            <TableCell>{test.date}</TableCell>
                            <TableCell>{test.score}</TableCell>
                            <TableCell>
                              <Chip label={test.grade} size="small" color={test.percentage >= 80 ? 'success' : test.percentage >= 60 ? 'warning' : 'error'} sx={{ borderRadius: '8px', fontWeight: 700 }} />
                            </TableCell>
                            <TableCell align="right">
                              <ProgressWithLabel value={test.percentage} color={test.percentage >= 80 ? '#10B981' : test.percentage >= 60 ? '#F59E0B' : '#EF4444'} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </DashboardPaper>
            </motion.div>

            {/* Assignment Tracker */}
            <motion.div variants={itemVariants}>
              <DashboardPaper>
                <SectionTitle variant="h6">Assignment Tracker</SectionTitle>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Assignment</strong></TableCell>
                        <TableCell><strong>Subject</strong></TableCell>
                        <TableCell><strong>Deadline</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell align="right"><strong>Action</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {assignments.map((a) => (
                        <TableRow key={a.id} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight="600">{a.title}</Typography>
                          </TableCell>
                          <TableCell>{a.subject}</TableCell>
                          <TableCell>{a.deadline}</TableCell>
                          <TableCell>
                            <StatusChip status={a.status} />
                            {a.marks && <Typography variant="caption" sx={{ ml: 1 }}>{a.marks}</Typography>}
                          </TableCell>
                          <TableCell align="right">
                            {(a.status === 'pending' || a.status === 'overdue') && (
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                  setSelectedAssignment(a);
                                  setSubmissionModalOpen(true);
                                }}
                                sx={{ borderRadius: 2, textTransform: 'none' }}
                              >
                                Submit
                              </Button>
                            )}
                            {a.status === 'graded' && (
                              <Button size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>
                                View Feedback
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </DashboardPaper>
            </motion.div>

            {/* Performance Overview */}
            <motion.div variants={itemVariants}>
              <DashboardPaper>
                <SectionTitle variant="h6">Performance Overview</SectionTitle>
                {performanceData.map((p) => (
                  <Box key={p.subject} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="body2" fontWeight="600">{p.subject}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="body2" fontWeight="bold">{p.avg}%</Typography>
                        <TrendingUp sx={{ fontSize: 16, color: p.trend === 'up' ? '#10B981' : '#EF4444', transform: p.trend === 'down' ? 'rotate(180deg)' : 'none' }} />
                      </Box>
                    </Box>
                    <ProgressWithLabel
                      value={p.avg}
                      color={p.avg >= 80 ? '#10B981' : p.avg >= 60 ? '#F59E0B' : '#EF4444'}
                    />
                  </Box>
                ))}
              </DashboardPaper>
            </motion.div>

            {/* Subjects List */}
            <motion.div variants={itemVariants}>
              <DashboardPaper>
                <SectionTitle variant="h6">My Subjects</SectionTitle>
                <List>
                  {subjects.map((subject) => (
                    <React.Fragment key={subject.id}>
                      <ListItem sx={{ borderRadius: 3, mb: 1, transition: 'background-color 0.2s', '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' } }}>
                        <ListItemIcon>
                          <Avatar sx={{ bgcolor: '#EEF2FF', color: '#4F46E5' }}>
                            <Book />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={<Typography variant="subtitle1" fontWeight="600">{subject.name}</Typography>}
                          secondary={`Teacher: ${subject.teacher}`}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            size="small"
                            label={`${subject.assignments} assignments`}
                            color={subject.assignments > 0 ? "error" : "success"}
                            variant={subject.assignments > 0 ? "filled" : "outlined"}
                            sx={{ borderRadius: '8px' }}
                          />
                          <IconButton
                            onClick={() => handleExpandSubject(subject.id)}
                            sx={{ transform: expandedSubject === subject.id ? 'rotate(180deg)' : 'none', transition: '0.3s' }}
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </Box>
                      </ListItem>
                      <Collapse in={expandedSubject === subject.id}>
                        <Box sx={{ pl: 9, pr: 2, pb: 2, mt: -1, mb: 2, ml: 2, borderLeft: '2px solid', borderColor: 'divider' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'text.secondary' }}>
                            <AccessTime fontSize="small" />
                            <Typography variant="body2">Next Class: <strong>{subject.nextClass}</strong></Typography>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button variant="outlined" size="small" startIcon={<Description />} sx={{ borderRadius: 2 }}>Materials</Button>
                            <Button variant="outlined" size="small" startIcon={<Assignment />} sx={{ borderRadius: 2 }}>Assignments</Button>
                          </Box>
                        </Box>
                      </Collapse>
                      {subject.id !== subjects.length && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              </DashboardPaper>
            </motion.div>

            {/* Group Chats */}
            <motion.div variants={itemVariants}>
              <DashboardPaper>
                <SectionTitle variant="h6">Group Chats</SectionTitle>
                <List disablePadding>
                  {chatGroups.map((group, i) => (
                    <React.Fragment key={group.name}>
                      <ListItem
                        sx={{ borderRadius: 3, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                        secondaryAction={
                          group.unread > 0 ? (
                            <Badge badgeContent={group.unread} color="error" />
                          ) : (
                            <CheckCircle color="success" sx={{ fontSize: 18 }} />
                          )
                        }
                      >
                        <ListItemIcon>
                          <Avatar sx={{ bgcolor: '#EEF2FF', color: '#4F46E5', width: 36, height: 36 }}>
                            <Chat sx={{ fontSize: 18 }} />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={<Typography variant="body2" fontWeight={group.unread > 0 ? 700 : 400}>{group.name}</Typography>}
                        />
                      </ListItem>
                      {i < chatGroups.length - 1 && <Divider variant="inset" />}
                    </React.Fragment>
                  ))}
                </List>
              </DashboardPaper>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Schedule</h2>
            </div>

            <CalendarWidget />

            {/* Today's Schedule */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Today's Classes</h3>
              </div>
              {todayTimetable.length > 0 ? (
                todayTimetable.map((slot, i) => (
                  <ScheduleItemComponent
                    key={i}
                    title={slot.subject}
                    subtitle={`${slot.teacher} • ${slot.room}`}
                    timeLabel={slot.time?.split('-')[0]?.trim() || slot.time}
                    color={slotColorMap[slot.subject] || 'blue'}
                  />
                ))
              ) : (
                <div className="text-center py-4 text-gray-400 text-sm">
                  No classes scheduled for today
                </div>
              )}
            </div>

            {/* Meetings */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Meetings</h3>
              </div>
              {meetings.map((meeting) => (
                <Card
                  key={meeting.id}
                  elevation={0}
                  sx={{ mb: 2, border: '1px solid rgba(0,0,0,0.06)', borderRadius: 3 }}
                >
                  <CardContent sx={{ pb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Chip label={meeting.type} size="small" variant="outlined" color="info" sx={{ borderRadius: '8px', fontSize: '0.7rem' }} />
                      <StatusChip status={meeting.status} />
                    </Box>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ mt: 1 }}>
                      {meeting.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {meeting.teacher}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                      <AccessTime sx={{ fontSize: 14 }} /> {meeting.time}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      fullWidth
                      variant={meeting.status === 'active' ? 'contained' : 'outlined'}
                      startIcon={<VideoCall />}
                      color={meeting.status === 'active' ? 'success' : 'primary'}
                      onClick={() => meeting.status === 'active' && handleJoinMeeting(meeting)}
                      disabled={meeting.status !== 'active'}
                      sx={{ borderRadius: 2 }}
                    >
                      {meeting.status === 'active' ? 'Join Now' : 'Scheduled'}
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>

            {/* Notifications */}
            <motion.div variants={itemVariants}>
              <DashboardPaper>
                <SectionTitle variant="h6">Notifications</SectionTitle>
                <List disablePadding>
                  {notifications.slice(0, 5).map((notif) => (
                    <ListItem
                      key={notif.id}
                      onClick={() => handleMarkNotificationRead(notif.id, notif.read)}
                      sx={{
                        borderRadius: 3, mb: 1, px: 1.5, py: 1,
                        bgcolor: notif.read ? 'inherit' : 'rgba(79, 70, 229, 0.04)',
                        borderLeft: notif.read ? 'none' : '3px solid',
                        borderColor: '#4F46E5',
                        cursor: notif.read ? 'default' : 'pointer',
                        '&:hover': !notif.read ? { bgcolor: 'rgba(79, 70, 229, 0.08)' } : {},
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Avatar sx={{
                          width: 28, height: 28,
                          bgcolor: notif.type === 'result' ? '#D1FAE5' : notif.type === 'announcement' ? '#DBEAFE' : notif.type === 'reminder' ? '#FEF3C7' : '#FEE2E2',
                        }}>
                          <Notifications sx={{ fontSize: 16, color: notif.type === 'result' ? '#10B981' : notif.type === 'announcement' ? '#3B82F6' : notif.type === 'reminder' ? '#F59E0B' : '#EF4444' }} />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={<Typography variant="body2" fontWeight={notif.read ? 400 : 600} sx={{ fontSize: '0.8rem' }}>{notif.message}</Typography>}
                        secondary={<Typography variant="caption" color="text.secondary">{notif.time}</Typography>}
                      />
                    </ListItem>
                  ))}
                </List>
                <Button fullWidth sx={{ mt: 1, borderRadius: 2 }} endIcon={<ArrowForward />}>
                  View All
                </Button>
              </DashboardPaper>
            </motion.div>

            {/* Study Group CTA */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer">
              <div className="absolute right-0 top-0 h-32 w-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
              <h3 className="font-bold text-lg mb-1 relative z-10">Join Study Group</h3>
              <p className="text-gray-400 text-xs mb-4 max-w-[180px] relative z-10">
                Collaborate with peers on your current subjects.
              </p>
              <div className="h-8 w-8 rounded-full bg-white text-gray-900 flex items-center justify-center relative z-10 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                <ArrowForward sx={{ fontSize: 18 }} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Assignment Submission Modal */}
      {selectedAssignment && (
        <AssignmentSubmissionModal
          open={submissionModalOpen}
          onClose={() => {
            setSubmissionModalOpen(false);
            setSelectedAssignment(null);
          }}
          assignmentId={selectedAssignment.id}
          assignmentTitle={selectedAssignment.title}
        />
      )}
    </DashboardLayout>
  );
};

export default StudentDashboard;
